export function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 100_000) return `${Math.round(n / 1000)}K`;
  if (n >= 10_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  // Below 10,000 the full figure fits and is what people expect to see.
  return Math.round(n).toLocaleString("en-IN");
}

export function duration(sec: number): string {
  const s = Math.round(sec);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

/* Umami returns times as "2026-10-25 14:00:00" in the requested time zone
   (India), and leads use "2026-10-25" or "2026-10-25 14". Both give an axis
   label and a tooltip heading. */
export function timeLabel(at: string, unit: "hour" | "day"): { label: string; tip: string } {
  const [date, time = "00"] = at.split(" ");
  const [y, m, d] = date.split("-").map(Number);
  const hour = Number(time.slice(0, 2));
  const when = new Date(y, m - 1, d, hour);
  if (unit === "hour") {
    const h = when.toLocaleTimeString("en-IN", { hour: "numeric", hour12: true });
    return { label: h, tip: `${h} to ${new Date(y, m - 1, d, hour + 1).toLocaleTimeString("en-IN", { hour: "numeric", hour12: true })}` };
  }
  return {
    label: when.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    tip: when.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
  };
}
