import Link from "next/link";
import { prisma } from "@/lib/db";
import { getTrackingIdsFresh } from "@/lib/site-settings";
import { getLive, getTraffic, rangeBounds, umamiConfigured, UmamiError, type Live, type Range, type Traffic } from "@/lib/umami";
import { getLeads } from "@/lib/leads";
import AutoRefresh from "@/components/admin/analytics/AutoRefresh";
import RealtimePanel from "@/components/admin/analytics/RealtimePanel";
import LeadsSection from "@/components/admin/analytics/LeadsSection";
import TrafficSection from "@/components/admin/analytics/TrafficSection";

const RANGES: { key: Range; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "7", label: "7 days" },
  { key: "30", label: "30 days" },
  { key: "90", label: "90 days" },
];

type SearchParams = Promise<{ range?: string }>;

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="text-base font-semibold text-[#0B2A3A]">{title}</h3>
      <div className="mt-2 space-y-2 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function TrafficNotice({ hasId, error }: { hasId: boolean; error: UmamiError | null }) {
  if (!hasId) {
    return (
      <Notice title="Visitor tracking is not connected">
        <p>Add the Umami Website ID on the Settings page to start counting visitors.</p>
        <p>
          <Link href="/admin/settings" className="font-medium text-[#0A6A88] underline">
            Go to Settings
          </Link>
        </p>
      </Notice>
    );
  }
  if (!umamiConfigured() || error?.kind === "not-configured") {
    return (
      <Notice title="Visitors are being tracked, but this admin can't read them yet">
        <p>The server needs the Umami API key (UMAMI_API_KEY). This is a one-time step for the website developer.</p>
      </Notice>
    );
  }
  return (
    <Notice title="Could not load visitor numbers right now">
      <p>{error?.message ?? "Umami returned an error. Try again in a minute."}</p>
    </Notice>
  );
}

export default async function AnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
  const { range: raw } = await searchParams;
  const range: Range = RANGES.find((r) => r.key === raw)?.key ?? "7";
  const { startAt, endAt } = rangeBounds(range);
  const unit = range === "today" ? "hour" : "day";
  const { umamiId } = await getTrackingIdsFresh();

  let traffic: Traffic | null = null;
  let live: Live | null = null;
  let error: UmamiError | null = null;
  if (umamiId && umamiConfigured()) {
    try {
      [traffic, live] = await Promise.all([getTraffic(umamiId, range), getLive(umamiId)]);
    } catch (e) {
      error = e instanceof UmamiError ? e : new UmamiError("other", e instanceof Error ? e.message : "Unknown error");
    }
  }

  const today = rangeBounds("today");
  const [leads, enquiriesToday] = await Promise.all([
    getLeads(startAt, endAt, unit),
    prisma.enquiry.count({ where: { createdAt: { gte: new Date(today.startAt) } } }),
  ]);

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-archivo)] text-2xl font-bold text-[#0B2A3A]">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Live: every number here is current. <AutoRefresh updatedAt={new Date().toISOString()} />
          </p>
        </div>
        <nav className="flex rounded-md border border-gray-200 bg-white p-0.5 text-xs" aria-label="Period">
          {RANGES.map((r) => (
            <Link
              key={r.key}
              href={`/admin/analytics?range=${r.key}`}
              aria-current={r.key === range ? "page" : undefined}
              className={`rounded px-3 py-1.5 font-medium ${r.key === range ? "bg-[#0B2A3A] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {r.label}
            </Link>
          ))}
        </nav>
      </div>

      <h2 className="mt-8 text-sm font-semibold text-[#0B2A3A]">Right now</h2>
      <div className="mt-3">
        {live ? <RealtimePanel live={live} newToday={enquiriesToday} /> : <TrafficNotice hasId={!!umamiId} error={error} />}
      </div>

      <h2 className="mt-10 text-sm font-semibold text-[#0B2A3A]">
        Leads <span className="font-normal text-gray-400">from the website forms</span>
      </h2>
      <div className="mt-3">
        <LeadsSection leads={leads} visitors={traffic?.current.visitors ?? 0} unit={unit} />
      </div>

      <h2 className="mt-10 text-sm font-semibold text-[#0B2A3A]">
        Visitors <span className="font-normal text-gray-400">who came, from where, and what they looked at</span>
      </h2>
      <div className="mt-3">{traffic ? <TrafficSection traffic={traffic} /> : <TrafficNotice hasId={!!umamiId} error={error} />}</div>
    </div>
  );
}
