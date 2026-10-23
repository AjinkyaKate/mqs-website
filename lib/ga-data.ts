import { importPKCS8, SignJWT } from "jose";
import { unstable_cache } from "next/cache";

/* Reads site traffic from the Google Analytics Data API for the admin's
   Analytics tab. Authenticates as a Google Cloud service account whose JSON key
   is the GA_SERVICE_ACCOUNT_JSON env var; that account's email must be added as
   a Viewer on the GA4 property. Plain REST plus jose (already a dependency)
   rather than the googleapis SDK, which would pull in gRPC for five calls. */

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://analyticsdata.googleapis.com/v1beta";

export const LEAD_EVENTS = { generate_lead: "Enquiries", job_application: "Job applications" } as const;

type ServiceAccount = { client_email: string; private_key: string };

export type KeyStatus = "ok" | "missing" | "invalid-json" | "missing-fields";

/* Parses the key, forgiving the ways a pasted value usually goes wrong:
   surrounding quotes, curly quotes from a text editor, or the file supplied as
   base64. Never logs or returns the key itself, only what was wrong with it. */
function parseServiceAccount(): { status: KeyStatus; sa?: ServiceAccount } {
  let raw = process.env.GA_SERVICE_ACCOUNT_JSON?.trim();
  if (!raw) return { status: "missing" };
  if (raw.startsWith("'") && raw.endsWith("'")) raw = raw.slice(1, -1);
  if (!raw.startsWith("{") && !raw.startsWith('"')) {
    try {
      raw = Buffer.from(raw, "base64").toString("utf8").trim();
    } catch {
      return { status: "invalid-json" };
    }
  }
  raw = raw.replace(/[\u201C\u201D]/g, '"');

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
    // A value pasted with escaped quotes parses to a string holding the JSON.
    if (typeof parsed === "string") parsed = JSON.parse(parsed);
  } catch {
    return { status: "invalid-json" };
  }
  const sa = parsed as Partial<ServiceAccount>;
  if (!sa.client_email || !sa.private_key) return { status: "missing-fields" };
  return { status: "ok", sa: { client_email: sa.client_email, private_key: sa.private_key.replace(/\\n/g, "\n") } };
}

function readServiceAccount(): ServiceAccount | null {
  return parseServiceAccount().sa ?? null;
}

export function serviceAccountKeyStatus(): KeyStatus {
  return parseServiceAccount().status;
}

/* Shape of the stored value for troubleshooting a bad paste: its length and
   first four characters, which for a key file are "{" and whitespace (or
   "ewog" when base64). Nothing from the key itself. */
export function serviceAccountKeyShape(): string {
  const raw = process.env.GA_SERVICE_ACCOUNT_JSON ?? "";
  return `${raw.length} characters, starting ${JSON.stringify(raw.slice(0, 4))}`;
}

/* The email is shown on the Settings page so the client knows which address to
   grant access to. It is an identifier, not a secret. */
export function serviceAccountEmail(): string | null {
  return readServiceAccount()?.client_email ?? null;
}

export class GaError extends Error {
  constructor(public kind: "not-configured" | "key-rejected" | "no-access" | "api-disabled" | "bad-property" | "other", message: string) {
    super(message);
  }
}

async function accessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const assertion = await new SignJWT({ scope: SCOPE })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(sa.client_email)
    .setAudience(TOKEN_URL)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(await importPKCS8(sa.private_key, "RS256"));

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string; error_description?: string };
    throw new GaError("key-rejected", `Google rejected the service account key (${body.error ?? res.status}${body.error_description ? `: ${body.error_description}` : ""}).`);
  }
  return ((await res.json()) as { access_token: string }).access_token;
}

async function call<T>(token: string, path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API}/${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (res.ok) return (await res.json()) as T;

  const err = (await res.json().catch(() => ({}))) as { error?: { message?: string; status?: string } };
  const msg = err.error?.message ?? `Google Analytics returned ${res.status}`;
  if (/has not been used|is disabled|SERVICE_DISABLED/i.test(msg)) throw new GaError("api-disabled", msg);
  if (res.status === 403) throw new GaError("no-access", msg);
  if (res.status === 400 || res.status === 404) throw new GaError("bad-property", msg);
  throw new GaError("other", msg);
}

type Row = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] };
type Report = { rows?: Row[] };

const dim = (r: Row, i = 0) => r.dimensionValues?.[i]?.value ?? "";
const num = (r: Row, i = 0) => Number(r.metricValues?.[i]?.value ?? 0);

export type Totals = { users: number; newUsers: number; sessions: number; views: number; engagementSec: number };
export type Dashboard = {
  days: number;
  current: Totals;
  previous: Totals;
  daily: { date: string; users: number }[];
  pages: { path: string; title: string; views: number }[];
  channels: { name: string; sessions: number }[];
  countries: { name: string; users: number }[];
  cities: { name: string; users: number }[];
  devices: { name: string; users: number }[];
  leads: { event: keyof typeof LEAD_EVENTS; current: number; previous: number }[];
  fetchedAt: string;
};

const TOTAL_METRICS = ["activeUsers", "newUsers", "sessions", "screenPageViews", "userEngagementDuration"];

function totalsFrom(rows: Row[] | undefined, range: string): Totals {
  const r = rows?.find((x) => dim(x) === range);
  if (!r) return { users: 0, newUsers: 0, sessions: 0, views: 0, engagementSec: 0 };
  const users = num(r, 0);
  return {
    users,
    newUsers: num(r, 1),
    sessions: num(r, 2),
    views: num(r, 3),
    // Average engagement time per active user, which is what GA's own overview shows.
    engagementSec: users ? num(r, 4) / users : 0,
  };
}

async function fetchDashboard(propertyId: string, days: number): Promise<Dashboard> {
  const sa = readServiceAccount();
  if (!sa) throw new GaError("not-configured", "GA_SERVICE_ACCOUNT_JSON is not set.");
  const token = await accessToken(sa);

  const current = { startDate: `${days - 1}daysAgo`, endDate: "today", name: "current" };
  const previous = { startDate: `${days * 2 - 1}daysAgo`, endDate: `${days}daysAgo`, name: "previous" };
  const range = { dateRanges: [{ startDate: current.startDate, endDate: current.endDate }] };
  const m = (name: string) => ({ name });

  // batchRunReports takes at most five reports, so this is two round trips.
  const [a, b] = await Promise.all([
    call<{ reports: Report[] }>(token, `properties/${propertyId}:batchRunReports`, {
      requests: [
        { dateRanges: [current, previous], metrics: TOTAL_METRICS.map(m) },
        { ...range, dimensions: [m("date")], metrics: [m("activeUsers")], orderBys: [{ dimension: { dimensionName: "date" } }], keepEmptyRows: true },
        { ...range, dimensions: [m("pagePath"), m("pageTitle")], metrics: [m("screenPageViews")], orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: 10 },
        { ...range, dimensions: [m("sessionDefaultChannelGroup")], metrics: [m("sessions")], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: 8 },
        {
          dateRanges: [current, previous],
          dimensions: [m("eventName")],
          metrics: [m("eventCount")],
          dimensionFilter: { filter: { fieldName: "eventName", inListFilter: { values: Object.keys(LEAD_EVENTS) } } },
        },
      ],
    }),
    call<{ reports: Report[] }>(token, `properties/${propertyId}:batchRunReports`, {
      requests: [
        { ...range, dimensions: [m("country")], metrics: [m("activeUsers")], orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: 8 },
        { ...range, dimensions: [m("city")], metrics: [m("activeUsers")], orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: 9 },
        { ...range, dimensions: [m("deviceCategory")], metrics: [m("activeUsers")], orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }] },
      ],
    }),
  ]);

  const [totals, daily, pages, channels, leads] = a.reports;
  const [countries, cities, devices] = b.reports;

  // With two named date ranges GA appends a dateRange dimension as the last one.
  const leadCount = (event: string, rangeName: string) =>
    num(leads.rows?.find((r) => dim(r, 0) === event && dim(r, 1) === rangeName) ?? {});

  return {
    days,
    current: totalsFrom(totals.rows, "current"),
    previous: totalsFrom(totals.rows, "previous"),
    daily: (daily.rows ?? []).map((r) => ({ date: dim(r), users: num(r) })),
    pages: (pages.rows ?? []).map((r) => ({ path: dim(r, 0), title: dim(r, 1), views: num(r) })),
    channels: (channels.rows ?? []).map((r) => ({ name: dim(r), sessions: num(r) })),
    countries: (countries.rows ?? []).map((r) => ({ name: dim(r), users: num(r) })),
    // "(not set)" is GA's bucket for visits it could not place; it is noise on a city list.
    cities: (cities.rows ?? []).filter((r) => dim(r) !== "(not set)").slice(0, 8).map((r) => ({ name: dim(r), users: num(r) })),
    devices: (devices.rows ?? []).map((r) => ({ name: dim(r), users: num(r) })),
    leads: (Object.keys(LEAD_EVENTS) as (keyof typeof LEAD_EVENTS)[]).map((event) => ({
      event,
      current: leadCount(event, "current"),
      previous: leadCount(event, "previous"),
    })),
    fetchedAt: new Date().toISOString(),
  };
}

/* GA's standard reports lag by hours anyway, so an hour's cache costs nothing
   in freshness and keeps the tab fast and well inside the API quota. */
export const getDashboard = unstable_cache(fetchDashboard, ["ga-dashboard"], { revalidate: 3600 });

async function fetchRealtimeUsers(propertyId: string): Promise<number> {
  const sa = readServiceAccount();
  if (!sa) throw new GaError("not-configured", "GA_SERVICE_ACCOUNT_JSON is not set.");
  const token = await accessToken(sa);
  const res = await call<Report>(token, `properties/${propertyId}:runRealtimeReport`, { metrics: [{ name: "activeUsers" }] });
  return num(res.rows?.[0] ?? {});
}

export const getRealtimeUsers = unstable_cache(fetchRealtimeUsers, ["ga-realtime"], { revalidate: 60 });
