import type { Traffic } from "@/lib/umami";
import { HREF_MAP } from "@/components/nav/nav-links";
import StatTile from "./StatTile";
import BarList from "./BarList";
import TrendChart from "./TrendChart";
import { compact, duration, timeLabel } from "./format";

/* Product page addresses back to the names used in the menu. */
const PRODUCT_NAMES = Object.fromEntries(
  Object.entries(HREF_MAP)
    .filter(([, href]) => href.startsWith("/products/"))
    .map(([name, href]) => [href, name])
);

/* Umami's channel keys, in words. */
const CHANNELS: Record<string, string> = {
  direct: "Direct",
  organicSearch: "Google and other search",
  paidSearch: "Paid search",
  organicSocial: "Social media",
  paidSocial: "Paid social",
  referral: "Other websites",
  email: "Email",
  sms: "SMS",
  organicShopping: "Shopping",
  paidShopping: "Paid shopping",
  organicVideo: "Video",
  paidVideo: "Paid video",
  paidAds: "Ads",
};

const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : "–");

export default function TrafficSection({ traffic }: { traffic: Traffic }) {
  const { current: c, previous: p } = traffic;
  const avg = (t: typeof c) => (t.visits ? t.totaltime / t.visits : 0);
  const bounce = (t: typeof c) => (t.visits ? (t.bounces / t.visits) * 100 : 0);

  const products = traffic.pages
    .filter((r) => PRODUCT_NAMES[r.name.replace(/\/$/, "")])
    .map((r) => ({ label: PRODUCT_NAMES[r.name.replace(/\/$/, "")], value: r.value }));

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-1">
          <StatTile hero label="Visitors" value={compact(c.visitors)} current={c.visitors} previous={p.visitors} />
        </div>
        <StatTile label="Visits" value={compact(c.visits)} current={c.visits} previous={p.visits} />
        <StatTile label="Page views" value={compact(c.pageviews)} current={c.pageviews} previous={p.pageviews} />
        <StatTile label="Avg. visit length" value={duration(avg(c))} current={avg(c)} previous={avg(p)} />
        <StatTile label="Left after one page" value={pct(c.bounces, c.visits)} current={bounce(c)} previous={bounce(p)} lowerIsBetter />
      </div>

      <section className="mt-4 rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-[#0B2A3A]">Visitors {traffic.unit === "hour" ? "per hour" : "per day"}</h3>
        <div className="mt-3">
          <TrendChart points={traffic.series.map((s) => ({ ...timeLabel(s.at, traffic.unit), value: s.value }))} />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarList title="Product interest" unit="Visitors" rows={products.slice(0, 10)} empty="No product pages viewed in this period." />
        <BarList title="Most viewed pages" unit="Visitors" rows={traffic.titles.map((r) => ({ label: r.name.replace(/\s*\|\s*MQS Technologies$/, ""), value: r.value }))} />
        <BarList title="How visitors found the site" unit="Visitors" rows={traffic.channels.map((r) => ({ label: CHANNELS[r.name] ?? r.name, value: r.value }))} />
        <BarList title="Websites sending visitors" unit="Visitors" rows={traffic.referrers.filter((r) => r.name !== "(none)").map((r) => ({ label: r.name, value: r.value }))} empty="No visits from other websites in this period." />
        <BarList title="Cities" unit="Visitors" rows={traffic.cities.map((r) => ({ label: r.name, value: r.value }))} />
        <BarList title="Countries" unit="Visitors" rows={traffic.countries.map((r) => ({ label: countryName(r.name), value: r.value }))} />
        <BarList title="Devices" unit="Visitors" rows={traffic.devices.map((r) => ({ label: r.name.charAt(0).toUpperCase() + r.name.slice(1), value: r.value }))} />
      </div>
    </>
  );
}

/* Umami reports ISO country codes (IN, US). */
function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}
