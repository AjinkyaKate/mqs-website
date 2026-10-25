import type { Dashboard } from "@/lib/ga-data";
import { LEAD_EVENTS } from "@/lib/ga-data";
import StatTile from "./StatTile";
import BarList from "./BarList";
import TrendChart from "./TrendChart";
import { compact, duration } from "./format";

/* The report body of the Analytics tab, kept apart from the page so the page
   only decides between this and a setup notice. */
export default function AnalyticsDashboard({ data, days, propertyId }: { data: Dashboard; days: number; propertyId: string }) {
  return (
    <>
      <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-1 lg:row-span-2">
          <StatTile hero label="Visitors" value={compact(data.current.users)} current={data.current.users} previous={data.previous.users} />
        </div>
        <StatTile label="New visitors" value={compact(data.current.newUsers)} current={data.current.newUsers} previous={data.previous.newUsers} />
        <StatTile label="Page views" value={compact(data.current.views)} current={data.current.views} previous={data.previous.views} />
        <StatTile label="Avg. time on site" value={duration(data.current.engagementSec)} current={data.current.engagementSec} previous={data.previous.engagementSec} />
        {data.leads.map((l) => (
          <StatTile key={l.event} label={`${LEAD_EVENTS[l.event]} from the website`} value={compact(l.current)} current={l.current} previous={l.previous} />
        ))}
        <StatTile label="Visits" value={compact(data.current.sessions)} current={data.current.sessions} previous={data.previous.sessions} />
      </div>

      <section className="mt-4 rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-[#0B2A3A]">Visitors per day</h2>
          <span className="text-xs text-gray-400">Last {days} days</span>
        </div>
        <div className="mt-3">
          <TrendChart points={data.daily} />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarList title="Most viewed pages" unit="Views" rows={data.pages.map((p) => ({ label: p.path, sub: p.title.replace(/\s*\|\s*MQS Technologies$/, ""), value: p.views }))} />
        <BarList title="Where visitors come from" unit="Visits" rows={data.channels.map((c) => ({ label: c.name, value: c.sessions }))} />
        <BarList title="Countries" unit="Visitors" rows={data.countries.map((c) => ({ label: c.name, value: c.users }))} />
        <BarList title="Cities" unit="Visitors" rows={data.cities.map((c) => ({ label: c.name, value: c.users }))} />
        <BarList title="Devices" unit="Visitors" rows={data.devices.map((d) => ({ label: d.name.charAt(0).toUpperCase() + d.name.slice(1), value: d.users }))} />
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Updated hourly. Google Analytics takes up to a day to finish processing, so today&apos;s figures can still rise. Changes compare
        against the {days} days before.{" "}
        <a href={`https://analytics.google.com/analytics/web/#/p${propertyId}/reports/intelligenthome`} target="_blank" rel="noreferrer" className="underline">
          Open full reports in Google Analytics
        </a>
      </p>
    </>
  );
}
