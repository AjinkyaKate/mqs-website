"use client";

import Image from "next/image";
import { useState } from "react";

const callouts = [
  ["1", "Engine & cylinder head", "OptimaXis / drIS", 29, 62],
  ["2", "Alloy wheels", "MQWR 160U", 12, 78],
  ["3", "Brake components", "MQS.PRISM / MQX.drIS", 16, 69],
  ["4", "Chassis & frame welds", "MQX.drIS", 48, 58],
  ["5", "Suspension & knuckles", "MQS.PRISM / MQX.drIS", 20, 52],
  ["6", "ECU / electrical parts", "MQX.tracE / OptimaXis", 35, 40],
] as const;

export default function TwoWheelerComponentGuide() {
  const [active, setActive] = useState(0);

  return (
    <figure className="m-0 mt-12 lg:mt-16">
      <div className="relative aspect-[3/2] overflow-hidden bg-[#303940]">
        <Image
          src="/assets/industries/automotive/two-wheeler-studio.jpg"
          alt="Two-wheeler with labelled inspection areas linked to MQS X-ray and CT systems"
          fill
          quality={90}
          sizes="(min-width:1440px) 1220px, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071C28]/35 via-transparent to-transparent" />

        {callouts.map(([number, label, , x, y], index) => {
          const selected = active === index;
          return (
            <button
              key={number}
              type="button"
              aria-label={`${number}: ${label}`}
              aria-pressed={selected}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className="absolute z-[3] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center border p-0 text-xs font-semibold shadow-[0_4px_16px_rgba(8,40,58,.25)] transition-colors md:h-9 md:w-9"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                borderColor: selected ? "#16C1F3" : "#0B2A3A",
                background: selected ? "#16C1F3" : "rgba(255,255,255,.94)",
                color: "#08283A",
              }}
            >
              {number}
            </button>
          );
        })}

        <figcaption className="absolute bottom-0 left-0 z-[2] flex items-center gap-3 bg-[#0B2A3A]/95 px-5 py-4 text-white">
          <span className="grid h-7 w-7 shrink-0 place-items-center bg-[#16C1F3] text-xs font-semibold text-[#08283A]">{callouts[active][0]}</span>
          <span>
            <span className="t-caption block text-white">{callouts[active][1]}</span>
            <span className="mt-1 block text-xs text-white/60">MQS solution: {callouts[active][2]}</span>
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
