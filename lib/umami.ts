import { unstable_cache } from "next/cache";

/* Reads website traffic from Umami for the admin's Analytics tab. Umami
   records every page view as it happens, so unlike Google Analytics there is
   no processing delay: every number here is live.

   Works with Umami Cloud (UMAMI_API_KEY, default base URL) or a self-hosted
   Umami (UMAMI_API_URL plus UMAMI_USERNAME / UMAMI_PASSWORD). The website ID
   is not a secret and lives in Admin > Settings, so stage and production can
   each point at their own Umami website. */

const CLOUD_API = "https://api.umami.is/v1";
export const TIMEZONE = "Asia/Kolkata";

export class UmamiError extends Error {
  constructor(public kind: "not-configured" | "auth" | "bad-website" | "other", message: string) {
    super(message);
  }
}

export function umamiConfigured(): boolean {
  return !!(process.env.UMAMI_API_KEY || (process.env.UMAMI_USERNAME && process.env.UMAMI_PASSWORD));
}

async function authHeader(base: string): Promise<string> {
  if (process.env.UMAMI_API_KEY) return `Bearer ${process.env.UMAMI_API_KEY}`;
  if (process.env.UMAMI_USERNAME && process.env.UMAMI_PASSWORD) {
    const res = await fetch(`${base}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: process.env.UMAMI_USERNAME, password: process.env.UMAMI_PASSWORD }),
      cache: "no-store",
    });
    if (!res.ok) throw new UmamiError("auth", `Umami login failed (${res.status}).`);
    return `Bearer ${((await res.json()) as { token: string }).token}`;
  }
  throw new UmamiError("not-configured", "UMAMI_API_KEY is not set.");
}

type Client = <T>(path: string, params?: Record<string, string | number>) => Promise<T>;

async function client(websiteId: string): Promise<Client> {
  const base = (process.env.UMAMI_API_URL || CLOUD_API).replace(/\/$/, "");
  const auth = await authHeader(base);
  return async <T,>(path: string, params: Record<string, string | number> = {}) => {
    const qs = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]));
    const res = await fetch(`${base}/websites/${websiteId}${path}?${qs}`, {
      headers: { Authorization: auth, Accept: "application/json" },
      cache: "no-store",
    });
    if (res.ok) return (await res.json()) as T;
    if (res.status === 401 || res.status === 403) throw new UmamiError("auth", `Umami refused access (${res.status}). Check the API key and that it belongs to the account that owns this website.`);
    if (res.status === 404 || res.status === 400) throw new UmamiError("bad-website", `Umami did not recognise the website ID (${res.status}).`);
    throw new UmamiError("other", `Umami returned ${res.status}.`);
  };
}

type XY = { x: string; y: number | string };
/* Stats values arrive as numbers, numeric strings or, on older Umami
   versions, { value, prev } objects. */
const n = (v: unknown): number =>
  typeof v === "object" && v !== null && "value" in v ? Number((v as { value: unknown }).value) || 0 : Number(v) || 0;
const xy = (rows: XY[] | undefined) => (rows ?? []).map((r) => ({ name: r.x || "(none)", value: n(r.y) }));

export type Range = "today" | "7" | "30" | "90";
export type Totals = { visitors: number; visits: number; pageviews: number; bounces: number; totaltime: number };
export type Traffic = {
  current: Totals;
  previous: Totals;
  series: { at: string; value: number }[];
  unit: "hour" | "day";
  pages: { name: string; value: number }[];
  titles: { name: string; value: number }[];
  channels: { name: string; value: number }[];
  referrers: { name: string; value: number }[];
  countries: { name: string; value: number }[];
  cities: { name: string; value: number }[];
  devices: { name: string; value: number }[];
};

/* Start and end of the selected range, as epoch ms. "Today" starts at
   midnight India time; the day ranges include today. */
export function rangeBounds(range: Range, now = new Date()): { startAt: number; endAt: number } {
  const ist = new Date(now.toLocaleString("en-US", { timeZone: TIMEZONE }));
  const offset = ist.getTime() - now.getTime();
  const midnight = new Date(ist);
  midnight.setHours(0, 0, 0, 0);
  const days = range === "today" ? 1 : Number(range);
  midnight.setDate(midnight.getDate() - (days - 1));
  return { startAt: midnight.getTime() - offset, endAt: now.getTime() };
}

const totals = (s: Record<string, unknown> | undefined): Totals => ({
  visitors: n(s?.visitors),
  visits: n(s?.visits),
  pageviews: n(s?.pageviews),
  bounces: n(s?.bounces),
  totaltime: n(s?.totaltime),
});

async function fetchTraffic(websiteId: string, range: Range, startAt: number, endAt: number): Promise<Traffic> {
  const api = await client(websiteId);
  const unit = range === "today" ? "hour" : "day";
  const span = { startAt, endAt };
  const metric = (type: string, limit = 10) => api<XY[]>("/metrics", { ...span, type, limit });

  const [stats, views, pages, titles, channels, referrers, countries, cities, devices] = await Promise.all([
    api<Record<string, unknown> & { comparison?: Record<string, unknown> }>("/stats", span),
    api<{ pageviews: XY[]; sessions: XY[] }>("/pageviews", { ...span, unit, timezone: TIMEZONE }),
    metric("path", 50),
    metric("title", 10),
    metric("channel", 8),
    metric("referrer", 8),
    metric("country", 8),
    metric("city", 8),
    metric("device", 5),
  ]);

  return {
    current: totals(stats),
    previous: totals(stats.comparison),
    series: (views.sessions ?? []).map((r) => ({ at: r.x, value: n(r.y) })),
    unit,
    pages: xy(pages),
    titles: xy(titles),
    channels: xy(channels),
    referrers: xy(referrers),
    countries: xy(countries),
    cities: xy(cities),
    devices: xy(devices),
  };
}

/* Short cache: the tab refreshes itself every minute, and this stops several
   open admin tabs multiplying API calls. Umami Cloud allows 50 calls per 15s. */
const cachedTraffic = unstable_cache(fetchTraffic, ["umami-traffic"], { revalidate: 30 });

export function getTraffic(websiteId: string, range: Range) {
  const { startAt, endAt } = rangeBounds(range);
  // Round the end to the minute so the cache key repeats within a minute.
  return cachedTraffic(websiteId, range, startAt, Math.floor(endAt / 60000) * 60000);
}

export type Live = {
  visitors: number;
  perMinute: number[];
  pages: { name: string; value: number }[];
};

async function fetchLive(websiteId: string, minute: number): Promise<Live> {
  const api = await client(websiteId);
  const span = { startAt: minute - 29 * 60000, endAt: minute + 60000 };
  const [active, views, pages] = await Promise.all([
    api<{ visitors?: number; x?: number }>("/active"),
    api<{ pageviews: XY[] }>("/pageviews", { ...span, unit: "minute", timezone: TIMEZONE }),
    api<XY[]>("/metrics", { ...span, type: "title", limit: 8 }),
  ]);

  // Place each minute's views in a 30-slot array, oldest first.
  const perMinute = Array<number>(30).fill(0);
  for (const r of views.pageviews ?? []) {
    const t = new Date(r.x.replace(" ", "T") + "+05:30").getTime();
    const slot = 29 - Math.round((minute - t) / 60000);
    if (slot >= 0 && slot < 30) perMinute[slot] += n(r.y);
  }

  return { visitors: n(active.visitors ?? active.x), perMinute, pages: xy(pages) };
}

const cachedLive = unstable_cache(fetchLive, ["umami-live"], { revalidate: 20 });

export function getLive(websiteId: string) {
  return cachedLive(websiteId, Math.floor(Date.now() / 60000) * 60000);
}
