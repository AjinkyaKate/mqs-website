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

/* GA returns dates as 20261023. */
export function gaDate(d: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }): string {
  const date = new Date(Number(d.slice(0, 4)), Number(d.slice(4, 6)) - 1, Number(d.slice(6, 8)));
  return date.toLocaleDateString("en-IN", opts);
}
