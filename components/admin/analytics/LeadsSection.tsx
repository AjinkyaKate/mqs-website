import Link from "next/link";
import type { Leads } from "@/lib/leads";
import StatTile from "./StatTile";
import BarList from "./BarList";
import TrendChart from "./TrendChart";
import { timeLabel } from "./format";

/* The numbers the business acts on, from the enquiry and application tables:
   exact, and current to the second. */
export default function LeadsSection({ leads, visitors, unit }: { leads: Leads; visitors: number; unit: "hour" | "day" }) {
  const conversion = visitors ? (leads.enquiries / visitors) * 100 : 0;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Enquiries" value={String(leads.enquiries)} current={leads.enquiries} previous={leads.enquiriesPrev} />
        <StatTile
          label="Visitors who enquired"
          value={visitors ? `${conversion < 10 ? conversion.toFixed(1) : Math.round(conversion)}%` : "–"}
          current={0}
          previous={0}
          hint={visitors ? `${leads.enquiries} of ${visitors.toLocaleString("en-IN")} visitors` : "No visitors yet"}
        />
        <Link href="/admin/enquiries?status=new" className="block">
          <StatTile
            label="Awaiting reply"
            value={String(leads.awaitingReply)}
            current={0}
            previous={0}
            hint={<span className="text-[#0A6A88] underline underline-offset-2">Open enquiries</span>}
          />
        </Link>
        <StatTile label="Job applications" value={String(leads.applications)} current={leads.applications} previous={leads.applicationsPrev} />
      </div>

      <section className="mt-4 rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-[#0B2A3A]">Enquiries {unit === "hour" ? "per hour" : "per day"}</h3>
        <div className="mt-3">
          <TrendChart
            noun={["enquiry", "enquiries"]}
            points={leads.perDay.map((d) => ({ ...timeLabel(d.day, unit), value: d.value }))}
          />
        </div>
      </section>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <BarList title="Enquiries by industry" unit="Enquiries" rows={leads.byIndustry.map((r) => ({ label: r.name, value: r.value }))} empty="No enquiries in this period." />
        <BarList title="What they need" unit="Enquiries" rows={leads.byRequirement.map((r) => ({ label: r.name, value: r.value }))} empty="No enquiries in this period." />
        <BarList title="Where they enquired" unit="Enquiries" rows={leads.byPage.map((r) => ({ label: r.name, value: r.value }))} empty="No enquiries in this period." />
      </div>
    </>
  );
}
