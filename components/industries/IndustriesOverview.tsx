"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Industries — hub / routing page (`Industries Overview_Trivexa`).
   A routing page, not a content page: get the visitor to the right
   industry detail page in one click. Whole cards are clickable.
   Aerospace shows the SYSTEM (never a radiograph — customer
   confidentiality). Routing matrix is a live filterable table.
   Copy is verbatim from the source document. Palette 2B + site font.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", PAGE = "#F4F8FA", NAVY = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const SANS = "var(--font-sans)";

const eyebrow = (color: string) => ({ font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const h2 = (color: string) => ({ margin: 0, font: `600 clamp(28px,3.8vw,46px)/1.08 ${SANS}`, letterSpacing: "-.025em", color });

type Card = { name: string; tagline: string; desc: string; systems: string; href: string; cta: string; image?: string; confidential?: string };
const PRIMARY: Card[] = [
  {
    name: "Aerospace & Defence",
    tagline: "Inspect with confidence, because failure is not an option.",
    desc: "Turbine parts, rotor blades, structural assemblies, nozzles and composite layups — where a micro-crack, an inclusion or a bond failure has consequences that reach far beyond the factory.",
    systems: "High-Energy X-ray · MQCT · Microfocus CT · MQXC Cabinet DR · Rotor Blade DR",
    href: "/industries/aerospace-defence",
    cta: "Explore Aerospace & Defence",
    confidential: "We don't publish aerospace scan results. Our customers' programmes stay their own — which is usually why they chose us.",
  },
  {
    name: "Automotive & EV",
    tagline: "Inspect faster. Reduce scrap. Deliver safer vehicles.",
    desc: "Cast housings, brake components, powertrain parts and battery assemblies — inspected at production speed, because a zero-defect target means checking parts, not samples.",
    systems: "MQS-PRISM · MQXC Cabinet DR · MQCT · MQWR 160U",
    href: "/industries/automotive",
    cta: "Explore Automotive",
    image: "/assets/mqxc-app-wheel.jpg",
  },
  {
    name: "Electronics & Semiconductors",
    tagline: "Inspect what the eye cannot see.",
    desc: "BGA voids, head-in-pillow, bridging and PTH fill issues — defects that pass visual inspection, survive functional test, and come back as field returns.",
    systems: "MQX.tracE · MQX.tracE CT · MQX.gINti · Microfocus CT",
    href: "/industries/electronics",
    cta: "Explore Electronics",
    image: "/assets/ind-electronics.jpg",
  },
];

const ALSO_SERVED: [string, string][] = [
  ["Energy & Power", "Weld integrity and thick-section castings in pressure-retaining components."],
  ["Foundry & Castings", "Porosity, shrinkage and inclusion classification against customer specification."],
  ["Additive Manufacturing", "Layer integrity, internal lattice validation and CT metrology on printed parts."],
  ["Research & Scientific", "Material characterisation and one-off investigation across mixed sample types."],
];

const MATRIX: [string, string, string][] = [
  ["Turbine and engine components", "Micro-defects in high-value parts", "Microfocus CT · MQCT"],
  ["Thick castings and dense assemblies", "Penetration through the section", "High-Energy X-ray"],
  ["Aluminium castings at volume", "Throughput without missing porosity", "MQS-PRISM · MQXC"],
  ["Brake, steering and safety parts", "100% inspection with traceability", "MQXC Cabinet DR · MQCT"],
  ["EV battery cells and modules", "Electrode alignment and internal defects", "MQCT · Microfocus CT"],
  ["PCBs and solder joints", "Hidden voids under packages", "MQX.tracE · MQX.tracE CT"],
  ["SMT component reels", "Inventory count accuracy", "MQX.gINti"],
  ["Welds and pressure components", "Root penetration and weld integrity", "MQXC 320/450 · High-Energy"],
];

const COMPLIANCE = [
  "AERB-compliant and type-approved systems for radiation safety",
  "ASTM-aligned inspection workflows, including ASTM E2422 where AI-driven software is used",
  "Traceable inspection records and reporting support for customer audits",
  "Digital image archives with repeatable, recallable inspection programs",
];

const th = { textAlign: "left" as const, padding: "16px 20px", background: "#EAF1F5", borderBottom: `1px solid ${HAIR}`, font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color: MUTED, whiteSpace: "nowrap" as const };
const td = { padding: "16px 20px", borderBottom: `1px solid ${HAIR}`, font: `400 15px/1.5 ${SANS}`, color: BODY, verticalAlign: "top" as const };

export default function IndustriesOverview() {
  const [q, setQ] = useState("");
  const rows = MATRIX.filter((r) => (r[0] + " " + r[1] + " " + r[2]).toLowerCase().includes(q.trim().toLowerCase()));

  const btn = (bg: string, color: string, border?: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: bg, color,
    border: border ?? "0", font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase",
    transition: `background 200ms ${EASE},color 200ms ${EASE}`,
  });

  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: NAVY, minHeight: "clamp(460px,52vw,600px)", display: "flex", alignItems: "flex-end" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/mqxc-app-bracket.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "grayscale(1)", opacity: 0.22 }} />
        <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.92) 0%,rgba(11,42,58,.78) 46%,rgba(11,42,58,.5) 100%)" }} />
        <div className="relative mx-auto w-full" style={{ maxWidth: 1330, padding: "clamp(96px,10vw,150px) clamp(24px,4vw,55px) clamp(44px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ maxWidth: 820, gap: "clamp(16px,2vw,22px)" }}>
            <div style={eyebrow(CYAN_D)}>Industries we serve</div>
            <h1 style={{ margin: 0, font: `600 clamp(32px,4.8vw,56px)/1.05 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>Every Sector Fails Differently.<br />So Does Every Inspection.</h1>
            <p style={{ margin: 0, maxWidth: 680, font: `400 clamp(16px,1.5vw,19px)/1.55 ${SANS}`, color: "rgba(255,255,255,.82)", textWrap: "pretty" }}>A turbine blade, a brake caliper and a BGA solder joint all hide their defects — but not in the same way, at the same scale, or at the same production speed. MQS configures inspection around the part, the defect and the line it comes off.</p>
            <div className="flex flex-wrap" style={{ gap: 12, marginTop: 8 }}>
              <a href="#cards" style={btn(CYAN, "#08283A")} className="hover:!bg-white hover:!text-[#0B2A3A]">Find Your Industry</a>
              <a href="#contact" style={btn("transparent", "#fff", "1px solid rgba(255,255,255,.42)")} className="hover:!bg-white/10">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,120px) clamp(24px,4vw,55px)", gap: "clamp(22px,2.6vw,32px)" }}>
          <div style={eyebrow(CYAN_L)}>Why it matters</div>
          <h2 style={{ margin: 0, font: `600 clamp(28px,4vw,48px)/1.07 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>The Defect You Cannot See Is the One That Ships.</h2>
          <p style={{ margin: 0, maxWidth: 760, font: `400 clamp(16px,1.4vw,18px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>External inspection catches what is on the surface. Porosity in a casting, a void in a solder joint, a debond inside a composite layup — these pass visual checks and fail in service, usually at the customer.</p>
          <p style={{ margin: 0, maxWidth: 760, font: `400 clamp(16px,1.4vw,18px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>Industrial X-ray and CT let you look inside without cutting the part open, which changes what inspection can do: instead of destroying a sample to judge a batch, you inspect the part you are about to ship, and keep the record.</p>
        </div>
      </section>

      {/* INDUSTRY CARDS */}
      <section id="cards" style={{ background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(28px,3vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_L)}>Industry cards</div>
            <h2 style={h2(INK)}>Where MQS Systems Work.</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: "clamp(20px,2vw,28px)" }}>
            {PRIMARY.map((c) => (
              <a key={c.name} href={c.href} className="group flex flex-col hover:!shadow-[inset_0_0_0_1px_#16C1F3]" style={{ background: "#fff", border: `1px solid ${HAIR}`, color: INK, transition: `box-shadow 200ms ${EASE}` }}>
                {/* image / system panel */}
                {c.image ? (
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#111417", borderBottom: `1px solid ${HAIR}` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt={`${c.name} inspection radiograph`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                ) : (
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: NAVY, borderBottom: `1px solid ${HAIR}` }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: 14, color: CYAN_D }}>
                      <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"><path d="M3 4h18M3 20h18M6 4v16M18 4v16M9 9h6v6H9z" /><path d="M12 4v5M12 15v5" /></svg>
                      <span style={{ font: `500 10px/1.4 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.62)" }}>Inspection system</span>
                    </div>
                  </div>
                )}
                {c.confidential && (
                  <div style={{ padding: "12px clamp(20px,2vw,26px) 0", font: `italic 400 13px/1.5 ${SANS}`, color: MUTED }}>{c.confidential}</div>
                )}
                <div className="flex flex-1 flex-col" style={{ gap: 12, padding: "clamp(18px,2vw,26px)" }}>
                  <div style={eyebrow(CYAN_L)}>Primary industry</div>
                  <h3 className="transition-colors duration-200 group-hover:!text-[#0A6A88]" style={{ margin: 0, font: `600 clamp(20px,2vw,24px)/1.2 ${SANS}`, letterSpacing: "-.025em", color: INK }}>{c.name}</h3>
                  <div style={{ font: `500 15px/1.4 ${SANS}`, color: INK }}>{c.tagline}</div>
                  <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{c.desc}</p>
                  <div style={{ marginTop: "auto", paddingTop: 8 }}>
                    <div style={{ font: `500 11px/1.5 ${SANS}`, letterSpacing: ".04em", textTransform: "uppercase", color: MUTED }}>Systems used</div>
                    <div style={{ marginTop: 4, font: `400 13px/1.5 ${SANS}`, color: BODY }}>{c.systems}</div>
                  </div>
                  <span className="transition-colors duration-200 group-hover:!text-[#16C1F3]" style={{ marginTop: 6, font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_L }}>{c.cta} →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ALSO SERVED */}
      <section style={{ background: "#fff", borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(48px,6vw,88px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,36px)" }}>
          <div style={eyebrow(CYAN_L)}>Also served</div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(250px,100%),1fr))", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
            {ALSO_SERVED.map(([name, need]) => (
              <a key={name} href="#contact" className="group flex flex-col hover:!bg-[#EAF6FB]" style={{ background: "#fff", gap: 10, padding: "clamp(22px,2.4vw,30px)", color: INK, transition: `background 200ms ${EASE}` }}>
                <div className="transition-colors duration-200 group-hover:!text-[#0A6A88]" style={{ font: `600 18px/1.25 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{name}</div>
                <p style={{ margin: 0, font: `400 14px/1.55 ${SANS}`, color: BODY, textWrap: "pretty" }}>{need}</p>
                <span style={{ marginTop: 4, font: `500 11px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: CYAN_L }}>Contact us →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTING MATRIX */}
      <section id="matrix" style={{ background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,36px)" }}>
          <div className="flex flex-col" style={{ gap: 18, maxWidth: 720 }}>
            <div style={eyebrow(CYAN_L)}>Routing matrix</div>
            <h2 style={h2(INK)}>Find the System by What You Make.</h2>
            <p style={{ margin: 0, font: `400 clamp(15px,1.3vw,17px)/1.6 ${SANS}`, color: BODY }}>Type your part or problem — the table narrows to the systems to start with.</p>
          </div>
          <input
            type="text" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. battery, welds, PCB, castings…"
            style={{ maxWidth: 460, height: 48, padding: "0 16px", border: `1px solid ${HAIR}`, background: "#fff", outline: "none", font: `400 15px/1.4 ${SANS}`, color: INK }}
            className="focus:!border-[#16C1F3]"
          />
          <div className="overflow-x-auto" style={{ background: "#fff", border: `1px solid ${HAIR}` }}>
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 720 }}>
              <thead><tr><th style={th}>If you inspect…</th><th style={th}>The core problem is…</th><th style={th}>Start with</th></tr></thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r[0]} style={{ background: i % 2 ? "#F7FAFC" : "#fff" }}>
                    <td style={{ ...td, font: `600 15px/1.4 ${SANS}`, color: INK }}>{r[0]}</td>
                    <td style={td}>{r[1]}</td>
                    <td style={{ ...td, color: CYAN_L, fontWeight: 500 }}>{r[2]}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td style={{ ...td, textAlign: "center", color: MUTED }} colSpan={3}>No match — tell us the part directly and we&apos;ll recommend a system.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section style={{ background: NAVY, color: "#fff" }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1000, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,36px)" }}>
          <div style={eyebrow(CYAN_D)}>Compliance &amp; standards</div>
          <h2 style={h2("#fff")}>Built to Pass the Audit, Not Just the Inspection.</h2>
          <ul className="m-0 list-none p-0" style={{ borderTop: "1px solid rgba(255,255,255,.14)" }}>
            {COMPLIANCE.map((c) => (
              <li key={c} className="flex items-baseline" style={{ gap: 14, padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,.14)", font: `400 clamp(15px,1.4vw,17px)/1.55 ${SANS}`, color: "#fff" }}>
                <span className="flex-none" style={{ width: 7, height: 7, background: CYAN }} />{c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "#fff" }}>
        <div className="mx-auto" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,110px) clamp(24px,4vw,55px)" }}>
          <div className="flex flex-wrap items-center justify-between" style={{ background: "#0B2A3A", padding: "clamp(36px,4vw,60px) clamp(28px,4vw,56px)", gap: 32 }}>
            <div style={{ maxWidth: 640 }}>
              <h2 style={{ margin: 0, font: `600 clamp(24px,2.6vw,34px)/1.15 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>Not Sure Which Applies to You?</h2>
              <p style={{ margin: "14px 0 0", font: `400 16px/1.6 ${SANS}`, color: "rgba(255,255,255,.78)", textWrap: "pretty" }}>Share the part size, material, thickness and what you are trying to find. Our application engineers will recommend the right configuration — and will say so if a simpler system would do the job.</p>
            </div>
            <div className="flex flex-wrap" style={{ gap: 12 }}>
              <a href="#contact" style={btn(CYAN, "#08283A")} className="hover:!bg-white hover:!text-[#0B2A3A]">Talk to an Expert</a>
              <a href="#contact" style={btn("transparent", "#fff", "1px solid rgba(255,255,255,.42)")} className="hover:!bg-white/10">Request a Demo</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
