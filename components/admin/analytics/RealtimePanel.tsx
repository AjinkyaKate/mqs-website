import Link from "next/link";
import type { Live } from "@/lib/umami";
import BarList from "./BarList";
import MinuteBars from "./MinuteBars";

/* Who is on the site at this moment and what they looked at in the last 30
   minutes. "On the site now" is Umami's active visitors (last 5 minutes). */
export default function RealtimePanel({ live, newToday }: { live: Live; newToday: number }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-200 bg-white p-5 lg:col-span-2">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-[13px] text-gray-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              On the site now
            </p>
            <p className="mt-1 text-[40px] font-semibold leading-tight text-[#0B2A3A]">{live.visitors}</p>
          </div>
          <Link href="/admin/enquiries?status=new" className="text-right">
            <p className="text-[13px] text-gray-500">Enquiries today</p>
            <p className="mt-1 text-[26px] font-semibold leading-snug text-[#0B2A3A] underline-offset-4 hover:underline">{newToday}</p>
          </Link>
        </div>
        <p className="mt-5 text-xs text-gray-500">Page views per minute</p>
        <div className="mt-2">
          <MinuteBars perMinute={live.perMinute} />
        </div>
      </div>
      <BarList
        title="Pages viewed, last 30 min"
        unit="Visitors"
        rows={live.pages.map((p) => ({ label: p.name.replace(/\s*\|\s*MQS Technologies$/, ""), value: p.value }))}
        empty="No one on the site in the last 30 minutes."
      />
    </div>
  );
}
