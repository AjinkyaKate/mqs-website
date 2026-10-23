"use client";

import { useEffect, useRef, useState } from "react";
import { compact, gaDate } from "./format";
import { MARK } from "./BarList";

const H = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 40 };

/* A clean axis step (1, 2 or 5 times a power of ten) giving about four
   gridlines, so ticks read 0 / 5 / 10 rather than 0 / 4.3 / 8.6. */
function niceStep(max: number): number {
  if (max <= 4) return 1;
  const raw = max / 4;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}

/* Visitors per day: one series, so no legend; the section title names it.
   2px line, 10% area wash, hairline grid, crosshair + tooltip on hover. */
export default function TrendChart({ points }: { points: { date: string; users: number }[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (points.length === 0) {
    return <p className="py-16 text-center text-sm text-gray-400">No visits recorded in this period yet.</p>;
  }

  const max = Math.max(...points.map((p) => p.users));
  const step = niceStep(max);
  const top = Math.max(step * 4, Math.ceil(max / step) * step);
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);

  const w = Math.max(width, 280);
  const innerW = w - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const y = (v: number) => PAD.top + innerH - (v / top) * innerH;

  const line = points.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.users).toFixed(1)}`).join("");
  const area = `${line}L${x(points.length - 1).toFixed(1)},${y(0)}L${x(0).toFixed(1)},${y(0)}Z`;
  const labelEvery = Math.ceil(points.length / Math.max(2, Math.floor(innerW / 70)));
  const last = points.length - 1;

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    setHover(Math.min(last, Math.max(0, Math.round(rel * last))));
  }

  const h = hover !== null ? points[hover] : null;

  return (
    <div ref={wrap} className="relative">
      {width > 0 && (
        <svg width={w} height={H} role="img" aria-label={`Visitors per day, peak ${max}`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={w - PAD.right} y1={y(t)} y2={y(t)} stroke="#E8EEF2" strokeWidth={1} />
              <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={11} fill="#8A9BA8" style={{ fontVariantNumeric: "tabular-nums" }}>
                {compact(t)}
              </text>
            </g>
          ))}
          {points.map((p, i) =>
            // Every nth date plus the last one, skipping an nth that would crowd it.
            i === last || (i % labelEvery === 0 && last - i >= labelEvery) ? (
              <text key={p.date} x={x(i)} y={H - 8} textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"} fontSize={11} fill="#8A9BA8">
                {gaDate(p.date)}
              </text>
            ) : null
          )}
          <path d={area} fill={MARK} fillOpacity={0.1} />
          <path d={line} fill="none" stroke={MARK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {/* End marker with a surface ring, so today's value is findable. */}
          <circle cx={x(last)} cy={y(points[last].users)} r={4} fill={MARK} stroke="#fff" strokeWidth={2} />
          {h && hover !== null && (
            <>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={y(0)} stroke="#B9C7D0" strokeWidth={1} />
              <circle cx={x(hover)} cy={y(h.users)} r={5} fill={MARK} stroke="#fff" strokeWidth={2} />
            </>
          )}
          <rect
            x={PAD.left}
            y={PAD.top}
            width={innerW}
            height={innerH}
            fill="transparent"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          />
        </svg>
      )}
      {h && hover !== null && (
        <div
          className="pointer-events-none absolute rounded-md border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
          style={{
            left: Math.min(Math.max(x(hover) - 60, 0), w - 120),
            top: Math.max(0, y(h.users) - 62),
            width: 120,
          }}
        >
          <p className="text-gray-500">{gaDate(h.date, { weekday: "short", day: "numeric", month: "short" })}</p>
          <p className="mt-0.5 font-semibold text-[#0B2A3A]">
            {h.users.toLocaleString("en-IN")} visitor{h.users === 1 ? "" : "s"}
          </p>
        </div>
      )}
    </div>
  );
}
