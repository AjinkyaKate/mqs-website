"use client";

import Image from "next/image";
import { useState } from "react";

const platforms = [
  {
    id: "fixed-wing", label: "Fixed-wing aircraft", left: "0%", top: "0%",
    points: [
      ["Engine & Propulsion Components", "MQX.NeVa: X-ray / CT"],
      ["Wing Structure (Spars, Ribs & Stringers)", "MQX.NeVa / MQX.drIS"],
      ["Fuselage Frames & Structural Rings", "MQX.NeVa"],
      ["Landing Gear & Mounting Brackets", "MQX.drIS: X-ray, MQX.NeVa"],
      ["Control Surface Assemblies (Flaps / Ailerons / Hinges)", "MQX.drIS: X-ray, Microfocus X-ray"],
      ["Tail Section (Empennage Frames)", "MQX.NeVa / MQX.drIS"],
    ],
  },
  {
    id: "fighter", label: "Fighter aircraft", left: "-100%", top: "0%",
    points: [
      ["Nose Cone / Radome Section", "Microfocus X-ray / CT"],
      ["Cockpit / Avionics Subsystems", "Microfocus X-ray / CT, MQX.NeVa"],
      ["Wing Root / Structural Assemblies", "MQX.NeVa / MQX.drIS"],
      ["Engine / Propulsion Components", "High-Energy X-ray, MQX.NeVa"],
      ["Mounted Assemblies", "High-Energy X-ray"],
      ["Rear Structural Assemblies", "MQX.NeVa / MQX.drIS"],
    ],
  },
  {
    id: "rotorcraft", label: "Rotor wing aircraft", left: "0%", top: "-100%",
    points: [
      ["Avionics Assemblies", "Microfocus X-ray / CT"],
      ["Main Rotor Hub", "High-Energy X-ray"],
      ["Gearbox Housing", "MQX.NeVa"],
      ["Engine / Powertrain Section", "High-Energy X-ray, MQX.NeVa"],
      ["Side-Mounted Structural Assemblies", "MQX.NeVa: X-ray, MQX.drIS"],
      ["Tail Boom / Tail Rotor Assemblies", "MQX.drIS: X-ray, MQX.NeVa"],
    ],
  },
  {
    id: "launch-vehicle", label: "Rocket & space launch vehicle", left: "-100%", top: "-100%",
    points: [
      ["Payload Section", "Microfocus X-ray / CT, MQX.NeVa"],
      ["Structural Stages", "High-Energy X-ray, MQX.NeVa"],
      ["Engine / Propulsion Components", "High-Energy X-ray, MQX.NeVa"],
    ],
  },
] as const;

export default function AerospacePlatformGuide() {
  const [active, setActive] = useState(0);
  const platform = platforms[active];

  function handleTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % platforms.length
      : event.key === "ArrowLeft" ? (index + platforms.length - 1) % platforms.length
      : event.key === "Home" ? 0 : event.key === "End" ? platforms.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`aerospace-tab-${next}`)?.focus();
  }

  return (
    <div className="mt-12 overflow-hidden bg-[#0B2A3A] lg:mt-16">
      <div className="grid border-b border-white/15 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Aerospace platforms">
        {platforms.map((item, index) => (
          <button key={item.id} id={`aerospace-tab-${index}`} type="button" role="tab"
            aria-selected={active === index} aria-controls={`aerospace-panel-${index}`}
            tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}
            onKeyDown={(event) => handleTabKey(event, index)}
            className={`flex min-h-[68px] items-center gap-4 border-b border-white/15 px-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:-outline-offset-4 lg:border-l lg:first:border-l-0 ${active === index ? "bg-[#16C1F3] text-[#08283A]" : "text-white/70 hover:bg-white/[.06] hover:text-white"}`}>
            <span className="t-caption opacity-65">0{index + 1}</span>
            <span className="t-body-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
      <div id={`aerospace-panel-${active}`} role="tabpanel" aria-labelledby={`aerospace-tab-${active}`} tabIndex={0}>
        <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(300px,4fr)]">
          <figure className="m-0 self-start">
            <div className="relative aspect-[3/2] overflow-hidden bg-[#071C28]">
              <Image src="/assets/industries/aerospace/client-labelled-inspection-map.png"
                alt={`${platform.label}: numbered component inspection map with recommended MQS solutions, transcribed alongside`}
                width={1536} height={1024} unoptimized
                className="absolute h-[200%] w-[200%] max-w-none"
                style={{ left: platform.left, top: platform.top, width: "200%", height: "200%", maxWidth: "none" }} />
            </div>
            <figcaption className="px-5 py-4">
              <a href="/assets/industries/aerospace/client-labelled-inspection-map.png" target="_blank" rel="noopener noreferrer"
                className="t-caption text-[#5AD1F7] underline underline-offset-4">View full-size labelled inspection map ↗</a>
            </figcaption>
          </figure>
          <div className="p-6 sm:p-8">
            <p className="t-eyebrow m-0 text-[#5AD1F7]">Component → recommended solution</p>
            <h3 className="t-h3 mb-0 mt-4 text-white">{platform.label}</h3>
            <ol className="m-0 mt-6 list-none p-0">
              {platform.points.map(([name, solution], index) => (
                <li key={name} className="flex gap-4 border-t border-white/15 py-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center border border-[#5AD1F7] text-xs font-semibold text-[#5AD1F7]">{index + 1}</span>
                  <div>
                    <h4 className="m-0 text-sm font-semibold leading-snug text-white">{name}</h4>
                    <p className="mb-0 mt-2 text-sm leading-relaxed text-white/70"><span className="text-[#5AD1F7]">MQS solution: </span>{solution}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
