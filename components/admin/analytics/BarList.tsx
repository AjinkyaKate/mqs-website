import { compact } from "./format";

export const MARK = "#0A6A88";

/* A ranked list with an inline bar per row: magnitude in one hue, the label
   and value in text colours. Used for pages, sources, places and devices. */
export default function BarList({
  title,
  unit,
  rows,
  empty = "No data for this period yet.",
}: {
  title: string;
  unit: string;
  rows: { label: string; sub?: string; value: number }[];
  empty?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const total = rows.reduce((s, r) => s + r.value, 0);

  return (
    <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold text-[#0B2A3A]">{title}</h2>
        <span className="text-xs text-gray-400">{unit}</span>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6 text-sm text-gray-400">{empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((r) => (
            <li key={r.label + (r.sub ?? "")} title={`${r.label}: ${r.value.toLocaleString("en-IN")} ${unit.toLowerCase()} (${total ? Math.round((r.value / total) * 100) : 0}%)`}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-gray-800">
                  {r.label}
                  {r.sub && <span className="ml-2 text-xs text-gray-400">{r.sub}</span>}
                </span>
                <span className="flex-none tabular-nums text-gray-600">{compact(r.value)}</span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-[#EEF3F6]">
                <div className="h-1.5 rounded-full" style={{ width: `${Math.max(2, (r.value / max) * 100)}%`, background: MARK }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
