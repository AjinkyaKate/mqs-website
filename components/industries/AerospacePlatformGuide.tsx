"use client";

import Image from "next/image";
import { useState } from "react";

type InspectionPoint = {
  id: string;
  label: string;
  title: string;
  copy: string;
  position: string;
};

type Platform = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  points: InspectionPoint[];
};

const platforms: Platform[] = [
  {
    id: "fixed-wing",
    label: "Fixed-wing",
    image: "/assets/inset-aircraft.jpg",
    imageAlt: "Fixed-wing passenger aircraft showing propulsion, wing, fuselage and landing systems",
    points: [
      { id: "A", label: "Propulsion", title: "Engine and propulsion components", copy: "Turbine parts, housings and dense propulsion assemblies inspected for cracks, porosity, inclusions and internal geometry.", position: "left-[18%] top-[55%]" },
      { id: "B", label: "Wing structure", title: "Wing structures and critical joints", copy: "Spars, ribs, bonded interfaces and structural joints validated without destructive sectioning.", position: "left-[73%] top-[39%]" },
      { id: "C", label: "Fuselage", title: "Fuselage frames and assemblies", copy: "Internal structure, joints and hidden interfaces examined for continuity, alignment and manufacturing defects.", position: "left-[50%] top-[25%]" },
      { id: "D", label: "Landing systems", title: "Landing gear and mounting brackets", copy: "Repeatable 2D inspection with 3D validation for safety-critical brackets, housings and attachment points.", position: "left-[50%] top-[72%]" },
      { id: "E", label: "Control systems", title: "Control-surface assemblies", copy: "Structural analysis for cracks, bond integrity and internal misalignment across flight-control components.", position: "left-[89%] top-[47%]" },
    ],
  },
  {
    id: "fighter",
    label: "Fighter aircraft",
    image: "/assets/industries/aerospace/fighter-aircraft-profile-v2.jpg",
    imageAlt: "Fighter aircraft in side profile with labelled inspection areas",
    imagePosition: "center",
    points: [
      { id: "A", label: "Radome", title: "Nose cone and radome", copy: "Composite structures and bonded interfaces assessed for inclusions, delamination and assembly integrity.", position: "left-[86%] top-[62%]" },
      { id: "B", label: "Avionics", title: "Cockpit and avionics systems", copy: "Microfocus X-ray and CT reveal joints, connectors, compact electronics and hidden assembly defects.", position: "left-[69%] top-[57%]" },
      { id: "C", label: "Wing root", title: "Wing-root structures", copy: "Critical load-transfer regions inspected for cracks, porosity and internal discontinuities.", position: "left-[49%] top-[68%]" },
      { id: "D", label: "Propulsion", title: "Dense propulsion components", copy: "Deep-penetration inspection for turbine, exhaust and powerplant assemblies where conventional energy is insufficient.", position: "left-[19%] top-[65%]" },
      { id: "E", label: "Rear structure", title: "Rear structural assemblies", copy: "Tail attachment points and rear structures checked for geometry, joints and hidden damage.", position: "left-[27%] top-[48%]" },
    ],
  },
  {
    id: "rotorcraft",
    label: "Rotorcraft",
    image: "/assets/industries/aerospace/rotorcraft.jpg",
    imageAlt: "Military rotorcraft in side profile with labelled inspection areas",
    imagePosition: "center 48%",
    points: [
      { id: "A", label: "Rotor system", title: "Main rotor and drive system", copy: "Dense rotating assemblies inspected for cracks, internal discontinuities and hidden wear-critical features.", position: "left-[64%] top-[32%]" },
      { id: "B", label: "Gearbox", title: "Gearbox housings", copy: "CT validates internal geometry and detects porosity in complex transmission housings.", position: "left-[58%] top-[47%]" },
      { id: "C", label: "Powertrain", title: "Engine and powertrain", copy: "High-energy inspection supports dense castings and turboshaft components requiring deeper penetration.", position: "left-[48%] top-[54%]" },
      { id: "D", label: "Avionics", title: "Avionics assemblies", copy: "Fine-detail imaging detects joint, connector and void-related defects in compact electronic systems.", position: "left-[72%] top-[56%]" },
      { id: "E", label: "Tail section", title: "Tail and rear assemblies", copy: "Joints, brackets and internal structures examined for cracks, alignment and assembly integrity.", position: "left-[22%] top-[47%]" },
    ],
  },
  {
    id: "launch-vehicle",
    label: "Rockets",
    image: "/assets/industries/aerospace/launch-vehicle.jpg",
    imageAlt: "Launch vehicle on its mobile launcher with labelled inspection areas",
    imagePosition: "38% center",
    points: [
      { id: "A", label: "Payload", title: "Payload fairings", copy: "Composite fairings and bonded interfaces inspected for delamination, inclusions and structural uniformity.", position: "left-[40%] top-[25%]" },
      { id: "B", label: "Interstage", title: "Interstage joints", copy: "Critical joints and interfaces validated for alignment, continuity and hidden manufacturing defects.", position: "left-[40%] top-[41%]" },
      { id: "C", label: "Motor casing", title: "Motor casings", copy: "High-energy X-ray and CT inspect dense casings for cracks, inclusions and internal discontinuities.", position: "left-[40%] top-[58%]" },
      { id: "D", label: "Propellant", title: "Propellant sections", copy: "Internal regions assessed for voids, debonding and density variation without cutting the assembly.", position: "left-[40%] top-[70%]" },
      { id: "E", label: "Nozzle", title: "Propulsion nozzles", copy: "Dense nozzle assemblies inspected for internal geometry, inclusions and defect indications.", position: "left-[40%] top-[84%]" },
    ],
  },
];

export default function AerospacePlatformGuide() {
  const [platformId, setPlatformId] = useState(platforms[0].id);
  const [pointId, setPointId] = useState(platforms[0].points[0].id);
  const platform = platforms.find((item) => item.id === platformId) ?? platforms[0];
  const selected = platform.points.find((point) => point.id === pointId) ?? platform.points[0];

  const selectPlatform = (id: string) => {
    const next = platforms.find((item) => item.id === id) ?? platforms[0];
    setPlatformId(next.id);
    setPointId(next.points[0].id);
  };

  return (
    <div className="mt-12 overflow-hidden bg-[#0B2A3A] lg:mt-16">
      <div className="grid border-b border-white/15 sm:grid-cols-2 lg:grid-cols-4" role="tablist" aria-label="Aerospace platforms">
        {platforms.map((item, index) => {
          const active = item.id === platform.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectPlatform(item.id)}
              className={`flex min-h-[68px] items-center gap-4 border-b border-white/15 px-6 text-left transition-colors sm:border-b-0 sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0 ${active ? "bg-[#16C1F3] text-[#08283A]" : "text-white/70 hover:bg-white/[.06] hover:text-white"}`}
            >
              <span className="t-caption opacity-65">0{index + 1}</span>
              <span className="t-body-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(320px,4fr)]">
        <figure className="relative m-0 min-h-[390px] overflow-hidden sm:min-h-[520px] lg:min-h-[650px]">
          <Image
            key={platform.image}
            src={platform.image}
            alt={platform.imageAlt}
            fill
            quality={90}
            sizes="(min-width:1024px) 64vw, 100vw"
            className="object-cover grayscale contrast-[1.08] brightness-[.70]"
            style={{ objectPosition: platform.imagePosition ?? "center" }}
          />
          <div className="absolute inset-0 bg-[#0B5470]/35 mix-blend-color" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,40,.18),rgba(7,28,40,.02)_55%,rgba(7,28,40,.30))]" />

          {platform.points.map((point) => {
            const isActive = point.id === selected.id;
            return (
              <button
                key={point.id}
                type="button"
                aria-label={`${point.id}: ${point.label}`}
                aria-pressed={isActive}
                onClick={() => setPointId(point.id)}
                className={`absolute ${point.position} z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-xs font-bold shadow-[0_8px_24px_rgba(0,0,0,.28)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:h-9 md:w-9 ${
                  isActive
                    ? "scale-110 border-white bg-[#16C1F3] text-[#08283A]"
                    : "border-white/70 bg-[#0B2A3A]/85 text-white hover:border-white hover:bg-[#16C1F3] hover:text-[#08283A]"
                }`}
              >
                {point.id}
              </button>
            );
          })}

          <figcaption className="t-caption absolute bottom-0 left-0 bg-[#071C28]/90 px-5 py-4 text-white/75">
            Select a marker to explore the inspection area
          </figcaption>
        </figure>

        <div className="flex min-h-[390px] flex-col justify-between p-7 sm:p-10 lg:min-h-[650px] lg:p-12">
          <div>
            <p className="t-eyebrow m-0 text-[#5AD1F7]">{selected.id} · {selected.label}</p>
            <h3 className="t-h3 mb-0 mt-5 text-white">{selected.title}</h3>
            <p className="t-body mb-0 mt-5 text-white/68">{selected.copy}</p>
          </div>

          <div className="mt-10 border-t border-white/15">
            {platform.points.map((point) => (
              <button
                key={point.id}
                type="button"
                onClick={() => setPointId(point.id)}
                className={`flex w-full items-center gap-4 border-b border-white/15 py-4 text-left transition-colors ${
                  point.id === selected.id ? "text-[#5AD1F7]" : "text-white/62 hover:text-white"
                }`}
              >
                <span className="t-caption w-5 shrink-0">{point.id}</span>
                <span className="t-body-sm">{point.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
