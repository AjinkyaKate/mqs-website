"use client";

import Image from "next/image";
import { useState } from "react";

const callouts = [
  ["A", "Engine assemblies", 24, 48],
  ["B", "Crankshafts", 31, 54],
  ["C", "Pistons", 38, 46],
  ["D", "Valves", 45, 40],
  ["E", "Brake calipers", 24, 71],
  ["F", "Steering knuckles", 31, 65],
  ["G", "Alloy wheels", 84, 57],
  ["H", "Under brackets", 58, 74],
] as const;

export default function AutomotiveComponentGuide() {
  const [active, setActive] = useState(0);

  return (
    <figure className="m-0 mt-12 lg:mt-16">
      <div className="relative aspect-[3/2] overflow-hidden bg-[#303940]">
        <Image
          src="/assets/industries/automotive/exploded-car.png"
          alt="Automotive structure with labelled inspection areas linked to MQS X-ray and CT systems"
          fill
          quality={90}
          sizes="(min-width:1440px) 1220px, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071C28]/35 via-transparent to-transparent" />

        {callouts.map(([letter, label, x, y], index) => {
          const selected = active === index;
          return (
            <button
              key={letter}
              type="button"
              aria-label={`${letter}: ${label}`}
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
              {letter}
            </button>
          );
        })}

        <figcaption className="absolute bottom-0 left-0 z-[2] flex items-center gap-3 bg-[#0B2A3A]/95 px-5 py-4 text-white">
          <span className="grid h-7 w-7 place-items-center bg-[#16C1F3] text-xs font-semibold text-[#08283A]">{callouts[active][0]}</span>
          <span className="t-caption text-white">{callouts[active][1]}</span>
        </figcaption>
      </div>
    </figure>
  );
}
