/* One headline number with its change against the previous period of the same
   length. Up is green unless `lowerIsBetter` (bounce rate). */
export default function StatTile({
  label,
  value,
  current,
  previous,
  hero = false,
  lowerIsBetter = false,
  hint,
}: {
  label: string;
  value: string;
  current: number;
  previous: number;
  hero?: boolean;
  lowerIsBetter?: boolean;
  hint?: React.ReactNode;
}) {
  let delta: { text: string; tone: string } | null = null;
  if (previous > 0) {
    const pct = ((current - previous) / previous) * 100;
    const rounded = Math.abs(pct) < 10 ? pct.toFixed(1) : Math.round(pct).toString();
    delta =
      Math.abs(pct) < 0.05
        ? { text: "No change", tone: "text-gray-500" }
        : { text: `${pct > 0 ? "▲" : "▼"} ${rounded.replace("-", "")}%`, tone: pct > 0 !== lowerIsBetter ? "text-green-700" : "text-red-600" };
  } else if (current > 0) {
    delta = { text: "New", tone: "text-gray-500" };
  }

  return (
    <div className="h-full rounded-lg border border-gray-200 bg-white p-5">
      <p className="text-[13px] text-gray-500">{label}</p>
      <p className={`mt-1 font-semibold text-[#0B2A3A] ${hero ? "text-[40px] leading-tight" : "text-[26px] leading-snug"}`}>{value}</p>
      {delta && (
        <p className="mt-1 text-xs">
          <span className={`font-medium ${delta.tone}`}>{delta.text}</span>
          <span className="text-gray-400"> vs previous period</span>
        </p>
      )}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}
