import type { Realtime } from "@/lib/ga-data";
import { LEAD_EVENTS } from "@/lib/ga-data";
import BarList from "./BarList";
import MinuteBars from "./MinuteBars";
import AutoRefresh from "./AutoRefresh";

/* The last 30 minutes, straight from the Realtime API: unlike the reports
   below it, there is no processing delay, so a form submitted a minute ago
   shows here. */
export default function RealtimePanel({ data, updatedAt }: { data: Realtime; updatedAt: string }) {
  const empty = "No one on the site in the last 30 minutes.";

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0B2A3A]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Right now
          <span className="font-normal text-gray-400">Last 30 minutes</span>
        </h2>
        <AutoRefresh updatedAt={updatedAt} />
      </div>

      <div className="mt-3 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5 lg:col-span-2">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[13px] text-gray-500">People on the site</p>
              <p className="mt-1 text-[40px] font-semibold leading-tight text-[#0B2A3A]">{data.activeUsers}</p>
            </div>
            <div className="flex gap-8">
              {data.leads.map((l) => (
                <div key={l.event}>
                  <p className="text-[13px] text-gray-500">{LEAD_EVENTS[l.event]} submitted</p>
                  <p className="mt-1 text-[26px] font-semibold leading-snug text-[#0B2A3A]">{l.count}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <MinuteBars perMinute={data.perMinute} />
          </div>
        </div>
        <BarList title="Pages being viewed" unit="People" rows={data.pages.map((p) => ({ label: p.name.replace(/\s*\|\s*MQS Technologies$/, ""), value: p.users }))} empty={empty} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BarList title="Cities" unit="People" rows={data.cities.map((c) => ({ label: c.name, value: c.users }))} empty={empty} />
        <BarList title="Devices" unit="People" rows={data.devices.map((d) => ({ label: d.name.charAt(0).toUpperCase() + d.name.slice(1), value: d.users }))} empty={empty} />
      </div>
    </section>
  );
}
