"use client";

import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";

/* Filterable product catalog — chip bar filters the NDT + ATE grids. */

const INK = "#0B2A3A";
const BODY = "#41586A";
const ACCENT = "#0A6A88";
const HAIRLINE = "#D3DFE7";

type Item = Product & { cat: string };

const CHIPS = ["All", "Digital Radiography", "Industrial CT", "Microfocus", "High-Energy", "PCB X-ray", "Wheel / Shell", "ATE"];

const NDT: Item[] = [
  { cat: "Digital Radiography", spec: "160–450 kV · DR & CT", name: "MQXC Series", subtitle: "Cabinet-Based Digital Radiography", desc: "Cabinet-based digital radiography and CT for castings, welds and assemblies up to 450 kV.", image: "/assets/prod-mqxc.jpg", href: "/products/mqxc-series", brochure: "mqxc-cabinet-dr.pdf" },
  { cat: "Industrial CT", spec: "3D CT · Metrology", name: "MQCT Series", subtitle: "Industrial Computed Tomography", desc: "Volumetric CT for dimensional metrology, porosity analysis and internal defect mapping.", image: "/assets/prod-mqct.jpg", href: "/products/mqct-series", brochure: "mqct-industrial-ct.pdf" },
  { cat: "High-Energy", spec: "0.9–15 MeV · 500 mm steel", name: "High-Energy X-Ray", subtitle: "Linac Radiography Cell", desc: "Linac-based inspection from 0.9 to 15 MeV for steel sections up to 500 mm thick.", image: "/assets/prod-highenergy.jpg", href: "/products/high-energy-xray", brochure: "high-energy-xray.pdf" },
  { cat: "Wheel / Shell", spec: "Multi-calibre · Dual station", name: "Shell / Ammunition System", subtitle: "Ordnance Radiography Line", desc: "Dual-station multi-calibre radiography for filled shells, rockets and pyrotechnic assemblies.", image: "/assets/prod-shell.jpg", brochure: "shell-ammunition-inspection.pdf" },
  { cat: "Wheel / Shell", spec: "10″–26″ · AERB approved", name: "MQWR 160U", subtitle: "Inline Wheel Radiography", desc: "Inline radiography for 10-inch to 26-inch alloy and steel wheels at production cadence.", image: "/assets/prod-wheel.jpg", brochure: "mqwr-160u-wheel-inspection.pdf" },
  { cat: "Digital Radiography", spec: "AI ADR · Production DR", name: "MQS-PRISM", subtitle: "Automatic Defect Recognition", desc: "Production digital radiography with AI-assisted defect recognition and pass/fail calling.", image: "/assets/prod-prism.jpg", brochure: "digital-radiography.pdf" },
  { cat: "Digital Radiography", spec: "Entry-level · Compact", name: "MQX.OptimaXis", subtitle: "Compact X-Ray Inspection", desc: "Entry-level compact inspection for small-batch electronics and precision machined parts.", brochure: "mqx-optimaxis.pdf" },
  { cat: "PCB X-ray", spec: "≤0.75 µm · 2.5D", name: "MQX.tracE", subtitle: "PCB X-Ray Inspection", desc: "2.5D board X-ray with 0.75 µm feature recognition for BGA, QFN and solder-joint analysis.", image: "/assets/prod-trace.jpg", href: "/products/mqx-trace" },
  { cat: "PCB X-ray", spec: "Volumetric 3D", name: "MQX.tracE CT", subtitle: "PCB Computed Tomography", desc: "Volumetric reconstruction of populated boards for buried-via and interconnect failure analysis.", href: "/products/mqx-trace" },
  { cat: "PCB X-ray", spec: "AI counter · 99%", name: "MQX.gINti", subtitle: "Component Counting System", desc: "AI component counting across reels, trays and tubes at 99% accuracy in under a minute.", brochure: "mqx-ginti.pdf" },
  { cat: "Microfocus", spec: "0.5 µm · 160–300 kV", name: "Microfocus X-Ray", subtitle: "Microfocus Inspection System", desc: "Half-micron focal spot for micro-castings, connectors and additive-manufactured parts.", image: "/assets/prod-microfocus.jpg", brochure: "microfocus-xray.pdf" },
  { cat: "Digital Radiography", spec: "160–450 kV · 100% duty", name: "Pipe DR", subtitle: "Pipeline Digital Radiography", desc: "Digital radiography for pipeline welds and corrosion mapping at 100% duty cycle.", brochure: "pipe-inspection-dr.pdf" },
];

/* Every card here routes to the single ATE page. Before it existed these were
   dead tiles: a name, a spec and a brochure, with nothing to click through to.

   NOTE FOR MQS. Two of these names, "Missile Launcher Tester" and "Torpedo
   Tester", are more disclosive than the ATE page's own policy allows. That page
   describes every system by test function precisely so the site does not
   publish which weapons programmes MQS supports, and the build reference lists
   platform names as held back. "Launcher test panel suite" and a function-led
   name for the torpedo rig would bring this grid in line with it. Left as found
   rather than rewritten unasked, because it is client copy. */
const ATE: Item[] = [
  { cat: "ATE", spec: "Functional · Continuity", name: "Missile Launcher Tester", subtitle: "Launcher Electronics ATE", desc: "Automated functional and continuity testing of launcher electronics before field release.", brochure: "automated-test-equipment.pdf", href: "/products/automated-test-equipment" },
  { cat: "ATE", spec: "Balance · Endurance", name: "Spin Test Equipment", subtitle: "Rotating Assembly Rig", desc: "Controlled-spin fixtures for balance, vibration and endurance testing of rotating assemblies.", brochure: "automated-test-equipment.pdf", href: "/products/automated-test-equipment" },
  { cat: "ATE", spec: "High-channel · Hipot", name: "Wire Harness Tester", subtitle: "Harness Continuity ATE", desc: "Continuity, insulation and hipot testing for aerospace and defence wiring harnesses.", brochure: "automated-test-equipment.pdf", href: "/products/automated-test-equipment" },
  { cat: "ATE", spec: "Sub-system · Telemetry", name: "Torpedo Tester", subtitle: "Underwater Weapon ATE", desc: "Integrated rack for torpedo sub-system, telemetry and power-train verification.", brochure: "automated-test-equipment.pdf", href: "/products/automated-test-equipment" },
  { cat: "ATE", spec: "Rate table · Drift", name: "Gyro Test Rack", subtitle: "Inertial Sensor Qualification", desc: "Rate-table and drift measurement rack for gyroscope and IMU qualification.", brochure: "automated-test-equipment.pdf", href: "/products/automated-test-equipment" },
  { cat: "ATE", spec: "Tension-controlled", name: "Wire Spool Unwinding Test", subtitle: "Spool Qualification Rig", desc: "Tension-controlled unwinding rig for fibre-optic and data-link spool qualification.", brochure: "automated-test-equipment.pdf", href: "/products/automated-test-equipment" },
];

function SectionHead({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b pb-4 md:pb-[18px] lg:pb-[22px]" style={{ borderColor: HAIRLINE }}>
      <h2
        className="t-h2 m-0"
        style={{ color: INK }}
      >
        {title}
      </h2>
      <div className="t-caption" style={{ color: ACCENT }}>
        {tag}
      </div>
    </div>
  );
}

export default function ProductsCatalog() {
  const [sel, setSel] = useState("All");
  const ndt = sel === "All" ? NDT : NDT.filter((p) => p.cat === sel);
  const ate = sel === "All" || sel === "ATE" ? ATE : [];

  return (
    <>
      {/* filter chips */}
      <div className="flex gap-2 overflow-x-auto border-b bg-white px-6 py-4 md:flex-wrap md:px-10 md:py-5 lg:px-[55px]" style={{ borderColor: HAIRLINE }}>
        {CHIPS.map((c) => {
          const on = c === sel;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setSel(c)}
              className={`t-caption flex h-10 flex-none items-center whitespace-nowrap border px-4 transition-colors duration-200 ${on ? "" : "hover:!border-[#16C1F3] hover:!text-[#0A6A88]"}`}
              style={
                on
                  ? { background: "#16C1F3", borderColor: "#16C1F3", color: "#08283A", cursor: "pointer" }
                  : { background: "#fff", borderColor: HAIRLINE, color: BODY, cursor: "pointer" }
              }
            >
              {c}
            </button>
          );
        })}
      </div>

      {ndt.length > 0 && (
        <section className="px-6 pt-16 md:px-10 md:pt-[72px] lg:px-[55px] lg:pt-24">
          <SectionHead title="Non-Destructive Testing" tag={`${ndt.length} Product${ndt.length === 1 ? "" : "s"}`} />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 lg:gap-8">
            {ndt.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </section>
      )}

      {ate.length > 0 && (
        <section className="px-6 pt-14 pb-16 md:px-10 md:pt-20 md:pb-[72px] lg:px-[55px] lg:pt-[104px] lg:pb-24">
          <SectionHead title="Automated Test Equipment" tag="Custom" />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:mt-10 lg:grid-cols-3 lg:gap-8">
            {ate.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
