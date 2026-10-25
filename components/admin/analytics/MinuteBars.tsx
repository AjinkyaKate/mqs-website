"use client";

import { useState } from "react";
import { MARK } from "./BarList";

/* Active users for each of the last 30 minutes, oldest on the left. Columns
   grow from one baseline; hover shows the minute and its count. */
export default function MinuteBars({ perMinute }: { perMinute: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...perMinute);
  const last = perMinute.length - 1;
  const label = (i: number) => (i === last ? "This minute" : `${last - i} min ago`);

  return (
    <div>
      <div className="relative flex h-24 items-end gap-[2px]" onPointerLeave={() => setHover(null)}>
        {perMinute.map((v, i) => (
          <div key={i} className="flex h-full flex-1 items-end" onPointerEnter={() => setHover(i)} aria-label={`${label(i)}: ${v}`}>
            <div
              className="w-full rounded-t-[3px]"
              style={{
                height: v ? `${Math.max(6, (v / max) * 100)}%` : "2px",
                background: v ? MARK : "#E3EAEF",
                opacity: hover === null || hover === i ? 1 : 0.45,
              }}
            />
          </div>
        ))}
        {hover !== null && (
          <div
            className="pointer-events-none absolute -top-9 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs whitespace-nowrap shadow-md"
            style={{ left: `${(hover / perMinute.length) * 100}%`, transform: hover > 20 ? "translateX(-80%)" : undefined }}
          >
            <span className="text-gray-500">{label(hover)}: </span>
            <span className="font-semibold text-[#0B2A3A]">{perMinute[hover]}</span>
          </div>
        )}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-[#8A9BA8]">
        <span>30 min ago</span>
        <span>Now</span>
      </div>
    </div>
  );
}
