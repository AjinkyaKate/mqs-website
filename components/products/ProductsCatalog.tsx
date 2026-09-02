"use client";

import { useState } from "react";
import Image from "next/image";
import ProductCard, { type Product } from "./ProductCard";

/* Filterable product catalog — chip bar filters the NDT + ATE grids. */

const INK = "#0B2A3A";
const BODY = "#41586A";
const ACCENT = "#0A6A88";
const HAIRLINE = "#D3DFE7";

type Item = Product & { cat: string };

const CHIPS = ["All", "Digital Radiography", "Industrial CT", "Microfocus", "High-Energy", "PCB X-ray", "Wheel / Shell", "Specialised Systems", "ATE"];

const NDT: Item[] = [
  { cat: "Digital Radiography", spec: "160–450 kV · DR & CT", name: "MQXC Series", subtitle: "Cabinet-Based Digital Radiography", desc: "Self-contained 2D inspection for small and mid-sized components, with multi-axis part handling built in.", image: "/assets/product-mqxc.jpg", href: "/products/mqxc-series", brochure: "mqxc-cabinet-dr.pdf" },
  { cat: "Industrial CT", spec: "3D CT · Metrology", name: "MQCT Series", subtitle: "Industrial Computed Tomography", desc: "Measurable 3D volumes for porosity classification, wall-thickness mapping and internal metrology.", image: "/assets/product-mqct.jpg", href: "/products/mqct-series", brochure: "mqct-industrial-ct.pdf" },
  { cat: "High-Energy", spec: "0.9–15 MeV · 500 mm steel", name: "High-Energy X-Ray Solutions", subtitle: "LINAC-Based Deep Penetration", desc: "Linear accelerator systems for castings, weldments and heavy engineering components.", image: "/assets/product-high-energy.png", href: "/products/high-energy-xray", brochure: "high-energy-xray.pdf" },
  { cat: "Wheel / Shell", spec: "Multi-calibre · Dual station", name: "Shell / Ammunition Inspection Solutions", subtitle: "Automated Ordnance Radiography", desc: "Dual-station multi-calibre radiography for filled shells, rockets and pyrotechnic assemblies.", image: "/assets/product-shell.png", brochure: "shell-ammunition-inspection.pdf" },
  { cat: "Wheel / Shell", spec: "10″–26″ · Inline", name: "MQWR 160U Inline Wheel Inspection Solution", subtitle: "Production Wheel Radiography", desc: "Inline radiography for alloy and steel wheels with automated defect recognition at line speed.", image: "/assets/product-wheel.png", brochure: "mqwr-160u-wheel-inspection.pdf" },
  { cat: "Digital Radiography", spec: "AI ADR · Production DR", name: "MQS.PRISM", subtitle: "Production Radiography", desc: "Production digital radiography with AI-assisted defect recognition and pass/fail calling.", image: "/assets/product-prism.png", brochure: "digital-radiography.pdf" },
  { cat: "Digital Radiography", spec: "Entry-level · Compact", name: "MQX.OptimaXis", subtitle: "Affordable In-House X-Ray", desc: "Compact inspection for small-batch electronics and precision machined parts.", image: "/assets/product-optimaxis.jpg", brochure: "mqx-optimaxis.pdf" },
  { cat: "PCB X-ray", spec: "≤0.75 µm · 2.5D", name: "MQX.tracE", subtitle: "2.5D PCB X-Ray Inspection", desc: "India’s first indigenous 2.5D PCB X-ray system for solder voids, bridging and PTH fill.", image: "/assets/product-trace.png", href: "/products/mqx-trace" },
  { cat: "PCB X-ray", spec: "Volumetric 3D", name: "MQX.tracE CT", subtitle: "3D CT PCB Inspection", desc: "Layer-by-layer analysis of populated boards for buried-via and interconnect failure analysis.", image: "/assets/product-trace.png", href: "/products/mqx-trace" },
  { cat: "PCB X-ray", spec: "AI counter · 99%", name: "MQX.gINti", subtitle: "Component Reel Counting", desc: "Fast, accurate X-ray inventory verification of SMT component reels without unspooling.", image: "/assets/product-ginti.jpg", brochure: "mqx-ginti.pdf" },
  { cat: "Microfocus", spec: "0.5 µm · 160–300 kV", name: "Microfocus X-Ray Solutions", subtitle: "Sub-Micron Imaging Systems", desc: "Half-micron focal spot inspection for micro-castings, connectors and additive-manufactured parts.", image: "/assets/product-microfocus.png", brochure: "microfocus-xray.pdf" },
  { cat: "Digital Radiography", spec: "160–450 kV · 100% duty", name: "Digital Radiography Solutions for Pipe Inspection", subtitle: "Pipe and Weld Inspection", desc: "Digital radiography for pipeline weld integrity and corrosion mapping at 100% duty cycle.", image: "/assets/product-pipe.png", brochure: "pipe-inspection-dr.pdf" },
  { cat: "Specialised Systems", spec: "Custom-built · Automated", name: "Fuze Inspection Solution", subtitle: "Digital Radiography for Fuzes", desc: "Custom-built digital radiography with an optional swivel mechanism for faster automated fuze inspection.", image: "/assets/product-fuze.png", href: "/contact" },
  { cat: "Specialised Systems", spec: "Controlled energy · Dose", name: "MQIR 225 — X-Ray Irradiator", subtitle: "Laboratory Irradiation System", desc: "Stable, accurate laboratory irradiation in a shielded stainless-steel chamber with adjustable sample distance.", image: "/assets/product-irradiator.png", href: "/contact" },
];

const ATE_CATEGORIES = [
  { letter: "A", title: "Manual / analog", text: "Operator-led test panels for depot and field use, preserving continuity with established equipment and training." },
  { letter: "B", title: "Microcontroller-based", text: "Cost-effective embedded testing with guided prompts, automated evaluation and clear pass/fail results." },
  { letter: "C", title: "PC-based (LabVIEW)", text: "High-speed automated sequences, real-time visualisation, complex data capture and report generation." },
];

function SectionHead({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b pb-4 md:pb-[18px] lg:pb-[22px]" style={{ borderColor: HAIRLINE }}>
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
  const showAte = sel === "All" || sel === "ATE";

  return (
    <>
      {/* filter chips */}
      <div id="catalog" className="flex scroll-mt-24 gap-2 overflow-x-auto border-b bg-white px-6 py-4 md:flex-wrap md:px-10 md:py-5 lg:px-[55px]" style={{ borderColor: HAIRLINE }}>
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

      {showAte && (
        <section className="px-6 pt-14 pb-16 md:px-10 md:pt-20 md:pb-[72px] lg:px-[55px] lg:pt-[104px] lg:pb-24">
          <SectionHead title="Automated Test Equipment" tag="3 Categories · Custom Solutions" />
          <article className="group mt-8 grid overflow-hidden border bg-white transition-shadow duration-300 hover:shadow-[0_18px_48px_rgba(11,42,58,.10)] lg:mt-10 lg:grid-cols-[minmax(320px,.85fr)_minmax(0,1.15fr)]" style={{ borderColor: HAIRLINE }}>
            <div className="relative min-h-[320px] overflow-hidden border-b lg:min-h-[540px] lg:border-b-0 lg:border-r" style={{ borderColor: HAIRLINE, background: "linear-gradient(145deg,#E9F2F6 0%,#F8FBFC 72%)" }}>
              <div className="absolute left-5 top-5 z-[1] border bg-white/90 px-3 py-2 backdrop-blur-sm" style={{ borderColor: HAIRLINE }}>
                <span className="t-caption" style={{ color: ACCENT }}>Custom-built systems</span>
              </div>
              <div aria-hidden="true" className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[48px] opacity-40" style={{ borderColor: "#BCECF9" }} />
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.025]">
                <ProductImage />
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-11 lg:px-12 lg:py-14">
              <div className="t-eyebrow" style={{ color: ACCENT }}>Automated Test Equipment</div>
              <h3 className="t-h3 m-0 mt-3 max-w-[650px]" style={{ color: INK }}>Purpose-built testing, matched to your workflow.</h3>
              <p className="t-body m-0 mt-4 max-w-[680px]" style={{ color: BODY }}>MQS builds test systems for assemblies that catalogue instruments cannot verify. Each solution is configured around the operator, test speed and data complexity—without exposing sensitive programme details.</p>

              <div className="mt-7 border-t" style={{ borderColor: HAIRLINE }}>
                {ATE_CATEGORIES.map((item) => (
                  <div key={item.letter} className="grid gap-3 border-b py-4 sm:grid-cols-[42px_180px_1fr] sm:items-start" style={{ borderColor: HAIRLINE }}>
                    <span className="t-caption inline-flex h-8 w-8 items-center justify-center" style={{ background: "#16C1F3", color: "#08283A" }}>{item.letter}</span>
                    <h4 className="t-body m-0 font-semibold" style={{ color: INK }}>{item.title}</h4>
                    <p className="t-body-sm m-0" style={{ color: BODY }}>{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/products/automated-test-equipment" className="t-button inline-flex h-12 items-center bg-[#16C1F3] px-6 no-underline transition-colors hover:!bg-[#0E3A52] hover:!text-white" style={{ color: "#08283A" }}>View ATE solutions <span aria-hidden="true" className="ml-3">→</span></a>
                <a href="/contact" className="t-button inline-flex h-12 items-center border px-6 no-underline transition-colors hover:!border-[#0E3A52] hover:!bg-[#0E3A52] hover:!text-white" style={{ color: INK, borderColor: INK }}>Discuss your test need <span aria-hidden="true" className="ml-3">→</span></a>
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
}

function ProductImage() {
  return (
    <Image
      src="/assets/product-ate.png"
      alt="Automated test equipment racks designed and built by MQS"
      fill
      sizes="(max-width: 1024px) 100vw, 40vw"
      className="absolute inset-0 h-full w-full object-contain p-8 lg:p-12"
    />
  );
}
