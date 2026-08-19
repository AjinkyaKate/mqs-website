"use client";

import { useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Industries — hub / routing page.
   Layout ported from `MQS Industries A - Editorial.dc.html`
   (2-col why, systems-used chips, filterable routing matrix with
   category chips + search + no-match state, navy compliance).
   Content is reconciled to the source document — real MQS product
   names in the chips/matrix, and conservative compliance claims
   (the mock's AS9100/IATF/extra ASTM+ISO standards need MQS sign-off
   before they can be claimed). Aerospace shows a SYSTEM panel, never
   a radiograph. Palette 2B + site font.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", PAGE = "#F4F8FA", NAVY = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const SANS = "var(--font-sans)";

const eyebrow = (color: string) => ({ font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const h2 = (color: string) => ({ margin: 0, font: `600 clamp(26px,3.4vw,42px)/1.08 ${SANS}`, letterSpacing: "-.025em", color });

type Card = { id: string; name: string; tagline: string; desc: string; systems: string[]; image?: string; alt?: string; confidential?: string };
const PRIMARY: Card[] = [
  {
    id: "aerospace-defence",
    name: "Aerospace & Defence",
    tagline: "Inspect with confidence, because failure is not an option.",
    desc: "Turbine parts, rotor blades, structural assemblies, nozzles and composite layups — where a micro-crack, an inclusion or a bond failure has consequences that reach far beyond the factory.",
    systems: ["High-Energy X-ray", "MQCT", "Microfocus CT", "MQXC Cabinet DR", "Rotor Blade DR"],
    /* IMG-02, the brief's specified subject: the rotor blade DR system. This
       supersedes the K15 LINAC frame, which the brief named only as a fallback
       for if this one proved unusable. */
    image: "/assets/ind-aero-rotor-dr.jpg",
    alt: "MQS rotor blade digital radiography system with long-format gantry, travelling X-ray source and flat panel detector",
    confidential: "We don't publish aerospace scan results. Our customers' programmes stay their own — which is usually why they chose us.",
  },
  {
    id: "automotive",
    name: "Automotive & EV",
    tagline: "Inspect faster. Reduce scrap. Deliver safer vehicles.",
    desc: "Cast housings, brake components, powertrain parts and battery assemblies — inspected at production speed, because a zero-defect target means checking parts, not samples.",
    systems: ["MQS-PRISM", "MQXC Cabinet DR", "MQCT", "MQWR 160U"],
    /* IMG-03, from the supplied 16-bit wheel hub radiograph. */
    image: "/assets/ind-auto-wheel-hub.jpg",
    alt: "Radiograph of an alloy wheel hub showing internal casting structure",
  },
  {
    id: "electronics",
    name: "Electronics & Semiconductors",
    tagline: "Inspect what the eye cannot see.",
    desc: "BGA voids, head-in-pillow, bridging and PTH fill issues — defects that pass visual inspection, survive functional test, and come back as field returns.",
    systems: ["MQX.tracE", "MQX.tracE CT", "MQX.gINti", "Microfocus CT"],
    /* IMG-04. Replaces a frame that showed shells rather than electronics. */
    image: "/assets/ind-elec-bga.jpg",
    alt: "Radiograph of a BGA solder ball array on a multilayer board",
  },
];

const ALSO_SERVED: [string, string][] = [
  ["Energy & Power", "Weld integrity and thick-section castings in pressure-retaining components."],
  ["Foundry & Castings", "Porosity, shrinkage and inclusion classification against customer specification."],
  ["Additive Manufacturing", "Layer integrity, internal lattice validation and CT metrology on printed parts."],
  ["Research & Scientific", "Material characterisation and one-off investigation across mixed sample types."],
];

type Row = { cat: string; make: string; problem: string; system: string };
const ROWS: Row[] = [
  { cat: "Aerospace", make: "Turbine and engine components", problem: "Micro-defects in high-value parts", system: "Microfocus CT · MQCT" },
  { cat: "Castings", make: "Thick castings and dense assemblies", problem: "Penetration through the section", system: "High-Energy X-ray" },
  { cat: "Castings", make: "Aluminium castings at volume", problem: "Throughput without missing porosity", system: "MQS-PRISM · MQXC" },
  { cat: "Automotive", make: "Brake, steering and safety parts", problem: "100% inspection with traceability", system: "MQXC Cabinet DR · MQCT" },
  { cat: "Battery", make: "EV battery cells and modules", problem: "Electrode alignment and internal defects", system: "MQCT · Microfocus CT" },
  { cat: "Electronics", make: "PCBs and solder joints", problem: "Hidden voids under packages", system: "MQX.tracE · MQX.tracE CT" },
  { cat: "Electronics", make: "SMT component reels", problem: "Inventory count accuracy", system: "MQX.gINti" },
  { cat: "Welds", make: "Welds and pressure components", problem: "Root penetration and weld integrity", system: "MQXC 320/450 · High-Energy" },
];
const CATS = ["All", "Aerospace", "Castings", "Automotive", "Battery", "Electronics", "Welds"];

const COMPLIANCE = [
  "AERB-compliant and type-approved systems for radiation safety",
  "ASTM-aligned inspection workflows, including ASTM E2422 where AI-driven software is used",
  "Traceable inspection records and reporting support for customer audits",
  "Digital image archives with repeatable, recallable inspection programs",
];

const th = { textAlign: "left" as const, padding: "14px clamp(16px,2vw,24px)", background: NAVY, font: `500 11px/1.2 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color: "rgba(255,255,255,.82)" };
const chip = { padding: "6px 10px", background: PAGE, border: `1px solid ${HAIR}`, font: `500 11px/1.2 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase" as const, color: INK };

export default function IndustriesOverview() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const rows = ROWS.filter((r) => {
    const s = q.trim().toLowerCase();
    return (cat === "All" || r.cat === cat) && (!s || (r.make + " " + r.problem + " " + r.system + " " + r.cat).toLowerCase().includes(s));
  });

  const btn = (bg: string, color: string, border?: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: bg, color, border: border ?? "0",
    font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", transition: `background 200ms ${EASE},color 200ms ${EASE}`,
  });

  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: NAVY, minHeight: "clamp(460px,52vw,600px)", display: "flex", alignItems: "flex-end" }}>
        <Image src="/assets/ind-hero-bracket.jpg" alt="" fill priority sizes="100vw" className="object-cover" style={{ filter: "grayscale(1)", opacity: 0.22 }} />
        <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.92) 0%,rgba(11,42,58,.78) 46%,rgba(11,42,58,.5) 100%)" }} />
        <div className="relative mx-auto w-full" style={{ maxWidth: 1330, padding: "clamp(96px,10vw,150px) clamp(24px,4vw,55px) clamp(44px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ maxWidth: 820, gap: "clamp(16px,2vw,22px)" }}>
            <div style={eyebrow(CYAN_D)}>Industries we serve</div>
            <h1 style={{ margin: 0, font: `600 clamp(32px,4.8vw,56px)/1.05 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>Every Sector Fails Differently.<br />So Does Every Inspection.</h1>
            <p style={{ margin: 0, maxWidth: 680, font: `400 clamp(16px,1.5vw,19px)/1.55 ${SANS}`, color: "rgba(255,255,255,.82)", textWrap: "pretty" }}>A turbine blade, a brake caliper and a BGA solder joint all hide their defects — but not in the same way, at the same scale, or at the same production speed. MQS configures inspection around the part, the defect and the line it comes off.</p>
            <div className="flex flex-wrap" style={{ gap: 12, marginTop: 8 }}>
              <a href="#industries" style={btn(CYAN, "#08283A")} className="hover:!bg-white hover:!text-[#0B2A3A]">Find Your Industry</a>
              <a href="#contact" style={btn("rgba(255,255,255,.1)", "#fff", "1px solid rgba(255,255,255,.28)")} className="hover:!bg-white/20">Talk to an Expert</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS (2-col) */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto grid items-start" style={{ maxWidth: 1330, padding: "clamp(64px,8vw,132px) clamp(24px,4vw,55px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(420px,100%),1fr))", gap: "clamp(32px,5vw,80px)" }}>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <div style={eyebrow(CYAN_L)}>Why it matters</div>
            <h2 style={{ margin: 0, font: `600 clamp(28px,3.9vw,48px)/1.07 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>The Defect You Cannot See Is the One That Ships.</h2>
          </div>
          <div className="flex flex-col" style={{ gap: 20, maxWidth: 620 }}>
            <p style={{ margin: 0, font: `400 clamp(16px,1.5vw,19px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>External inspection catches what is on the surface. Porosity in a casting, a void in a solder joint, a debond inside a composite layup — these pass visual checks and fail in service, usually at the customer.</p>
            <p style={{ margin: 0, font: `400 clamp(16px,1.5vw,19px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>Industrial X-ray and CT let you look inside without cutting the part open, which changes what inspection can do: instead of destroying a sample to judge a batch, you inspect the part you are about to ship, and keep the record.</p>
          </div>
        </div>
      </section>

      {/* PRIMARY INDUSTRY CARDS */}
      <section id="industries" style={{ background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,120px) clamp(24px,4vw,55px)", gap: "clamp(28px,3.5vw,48px)" }}>
          <div className="flex flex-wrap items-end justify-between" style={{ gap: 20 }}>
            <div className="flex flex-col" style={{ gap: 16 }}>
              <div style={eyebrow(CYAN_L)}>Primary industries</div>
              <h2 style={h2(INK)}>Where MQS Systems Work.</h2>
            </div>
            <p style={{ margin: 0, maxWidth: 360, font: `400 15px/1.6 ${SANS}`, color: MUTED }}>Three sectors with dedicated system configurations, acceptance criteria and application support.</p>
          </div>

          {/* Each industry is a full-width band rather than a card. Phase 1 is a
              single /industries/ page, so these sections are the destination
              rather than a router into a detail page, and they need the room.
              They are no longer links, and the "Explore ..." CTAs are gone,
              because there is nowhere for them to go. Copy is the client
              brief's, verbatim. The image side alternates to give the three
              bands rhythm down the page. */}
          <div className="flex flex-col" style={{ gap: "clamp(24px,3vw,44px)" }}>
            {PRIMARY.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={c.name} id={c.id} className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10 scroll-mt-[80px] md:scroll-mt-[92px] lg:scroll-mt-[96px]"
                  style={{ background: "#fff", border: `1px solid ${HAIR}`, padding: "clamp(18px,2vw,26px)" }}>
                  <div className={flip ? "md:order-2" : ""}>
                    {c.image ? (
                      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#111417" }}>
                        <Image src={c.image} alt={c.alt ?? `${c.name} inspection radiograph`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                      </div>
                    ) : (
                      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: NAVY }}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: 14, color: CYAN_D }}>
                          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"><path d="M3 4h18M3 20h18M6 4v16M18 4v16M9 9h6v6H9z" /><path d="M12 4v5M12 15v5" /></svg>
                          <span style={{ font: `500 10px/1.4 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(255,255,255,.62)" }}>Inspection system</span>
                        </div>
                      </div>
                    )}
                    {/* The brief asks for this line directly under the image, set
                        muted rather than as body copy: it explains why the card
                        shows a system instead of a radiograph. */}
                    {c.confidential && (
                      <p style={{ margin: 0, paddingTop: 14, font: `italic 400 13px/1.55 ${SANS}`, color: MUTED, textWrap: "pretty" }}>{c.confidential}</p>
                    )}
                  </div>

                  <div className={`flex flex-col ${flip ? "md:order-1" : ""}`} style={{ gap: 16, padding: "clamp(4px,1vw,14px)" }}>
                    <div style={eyebrow(CYAN_L)}>Primary industry</div>
                    <div className="flex flex-col" style={{ gap: 10 }}>
                      <h3 style={{ margin: 0, font: `600 clamp(24px,2.6vw,34px)/1.14 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>{c.name}</h3>
                      <p style={{ margin: 0, font: `500 clamp(15px,1.5vw,17px)/1.45 ${SANS}`, color: CYAN_L }}>{c.tagline}</p>
                    </div>
                    <p style={{ margin: 0, font: `400 clamp(15px,1.4vw,17px)/1.65 ${SANS}`, color: BODY, textWrap: "pretty" }}>{c.desc}</p>
                    <div className="flex flex-col" style={{ gap: 10, marginTop: 4, paddingTop: 18, borderTop: `1px solid ${HAIR}` }}>
                      <div style={eyebrow(MUTED)}>Systems used</div>
                      <div className="flex flex-wrap" style={{ gap: 6 }}>
                        {c.systems.map((sys) => <span key={sys} style={chip}>{sys}</span>)}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ALSO SERVED */}
      <section style={{ background: "#fff", borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(52px,6vw,100px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,36px)" }}>
          <div className="flex flex-wrap items-baseline justify-between" style={{ gap: 16 }}>
            <h2 style={{ margin: 0, font: `600 clamp(22px,2.5vw,32px)/1.12 ${SANS}`, letterSpacing: "-.025em", color: INK }}>Also Served.</h2>
            <p style={{ margin: 0, font: `400 14px/1.6 ${SANS}`, color: MUTED }}>Handled case by case with our applications team — start with a conversation.</p>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
            {ALSO_SERVED.map(([name, need]) => (
              <a key={name} href="#contact" className="hover:!bg-[#F4F8FA]" style={{ background: "#fff", padding: "clamp(20px,2vw,26px)", minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16, color: INK, transition: `background 200ms ${EASE}` }}>
                <h3 style={{ margin: 0, font: `600 18px/1.25 ${SANS}`, letterSpacing: "-.025em", color: INK }}>{name}</h3>
                <div className="flex flex-col" style={{ gap: 12 }}>
                  <p style={{ margin: 0, font: `400 14px/1.55 ${SANS}`, color: BODY, textWrap: "pretty" }}>{need}</p>
                  <span style={{ ...eyebrow(CYAN_L) }}>Enquire →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ROUTING MATRIX */}
      <section id="matrix" style={{ background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,120px) clamp(24px,4vw,55px)", gap: "clamp(24px,3vw,40px)" }}>
          <div className="flex flex-col" style={{ gap: 18, maxWidth: 760 }}>
            <div style={eyebrow(CYAN_L)}>Routing matrix</div>
            <h2 style={{ margin: 0, font: `600 clamp(26px,3.6vw,44px)/1.07 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>Find the System by What You Make.</h2>
            <p style={{ margin: 0, font: `400 clamp(15px,1.4vw,18px)/1.6 ${SANS}`, color: BODY }}>Filter by part family, or search a material, defect or method.</p>
          </div>

          <div className="flex flex-wrap items-center" style={{ gap: 12 }}>
            <input
              type="search" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search: porosity, weld, BGA, composite…"
              aria-label="Search the routing matrix"
              style={{ height: 48, minWidth: "min(320px,100%)", flex: "1 1 280px", padding: "0 16px", background: "#fff", border: `1px solid ${HAIR}`, font: `400 15px/1 ${SANS}`, color: INK, outline: "none" }}
              className="focus:!border-[#16C1F3]"
            />
            <div role="group" aria-label="Filter by part family" className="flex flex-wrap" style={{ gap: 8 }}>
              {CATS.map((label) => {
                const on = label === cat;
                return (
                  <button key={label} type="button" onClick={() => setCat(label)} aria-pressed={on}
                    style={{ height: 40, padding: "0 16px", cursor: "pointer", background: on ? INK : "#fff", color: on ? "#fff" : INK, border: `1px solid ${on ? INK : HAIR}`, font: `500 11px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", transition: `background 200ms ${EASE},color 200ms ${EASE}` }}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ border: `1px solid ${HAIR}`, background: "#fff" }}>
            <div data-matrix-head className="grid" style={{ gridTemplateColumns: "1.05fr 1.15fr .95fr", gap: "clamp(12px,2vw,28px)" }}>
              <div style={th}>If you inspect…</div><div style={th}>The problem is…</div><div style={th}>Start with</div>
            </div>
            {rows.map((r, i) => (
              <div key={r.make} data-matrix-row className="grid" style={{ gridTemplateColumns: "1.05fr 1.15fr .95fr", gap: "clamp(12px,2vw,28px)", padding: "clamp(16px,1.8vw,22px) clamp(16px,2vw,24px)", borderBottom: `1px solid ${HAIR}`, background: i % 2 ? "#F7FAFC" : "#fff" }}>
                <div style={{ font: `600 16px/1.35 ${SANS}`, letterSpacing: "-.025em", color: INK }}>{r.make}</div>
                <div style={{ font: `400 15px/1.55 ${SANS}`, color: BODY }}>{r.problem}</div>
                <div style={{ font: `500 14px/1.4 ${SANS}`, color: CYAN_L }}>{r.system}</div>
              </div>
            ))}
            {rows.length === 0 && (
              <div className="flex flex-col items-start" style={{ gap: 14, padding: "clamp(28px,4vw,52px) clamp(16px,2vw,24px)" }}>
                <div style={{ font: `600 20px/1.25 ${SANS}`, letterSpacing: "-.025em", color: INK }}>No route matches that yet.</div>
                <p style={{ margin: 0, maxWidth: 520, font: `400 15px/1.6 ${SANS}`, color: BODY }}>That does not mean we cannot inspect it. Send a drawing or a sample description and an applications engineer will specify a method.</p>
                <div className="flex flex-wrap" style={{ gap: 12, marginTop: 4 }}>
                  <a href="#contact" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 22px", background: CYAN, color: "#08283A", font: `500 12px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase" }} className="hover:!bg-[#0B2A3A] hover:!text-white">Ask an application engineer</a>
                  <button type="button" onClick={() => { setQ(""); setCat("All"); }} style={{ height: 44, padding: "0 22px", background: "transparent", border: `1px solid ${INK}`, color: INK, font: `500 12px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", cursor: "pointer" }} className="hover:!bg-[#0B2A3A] hover:!text-white">Clear filters</button>
                </div>
              </div>
            )}
            <div aria-live="polite" style={{ padding: "12px clamp(16px,2vw,24px)", background: PAGE, ...eyebrow(MUTED) }}>
              {rows.length === 0 ? "No routes shown" : `${rows.length} of ${ROWS.length} routes shown`}
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE (navy, 2-col) */}
      <section style={{ background: NAVY, color: "#fff" }}>
        <div className="mx-auto grid items-start" style={{ maxWidth: 1330, padding: "clamp(56px,7vw,112px) clamp(24px,4vw,55px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))", gap: "clamp(32px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div style={eyebrow(CYAN_D)}>Compliance &amp; standards</div>
            <h2 style={{ margin: 0, font: `600 clamp(26px,3.2vw,40px)/1.08 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>Built to Pass the Audit, Not Just the Inspection.</h2>
          </div>
          <ul className="m-0 list-none p-0 flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,.14)" }}>
            {COMPLIANCE.map((c) => (
              <li key={c} className="grid" style={{ gridTemplateColumns: "auto 1fr", gap: 16, padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,.14)" }}>
                <span style={{ width: 6, height: 6, marginTop: 9, background: CYAN }} />
                <span style={{ font: `400 clamp(15px,1.4vw,17px)/1.6 ${SANS}`, color: "rgba(255,255,255,.86)" }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA (centered) */}
      <section style={{ background: "#fff", borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col items-center text-center" style={{ maxWidth: 1000, padding: "clamp(64px,8vw,132px) clamp(24px,4vw,55px)", gap: 22 }}>
          <h2 style={{ margin: 0, maxWidth: 720, font: `600 clamp(28px,3.9vw,48px)/1.07 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>Not Sure Which Applies to You?</h2>
          <p style={{ margin: 0, maxWidth: 620, font: `400 clamp(16px,1.5vw,19px)/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>Share the part size, material, thickness and what you are trying to find. Our application engineers will recommend the right configuration — and will say so if a simpler system would do the job.</p>
          <div className="flex flex-wrap justify-center" style={{ gap: 14, marginTop: 6 }}>
            <a href="#contact" style={btn(CYAN, "#08283A")} className="hover:!bg-[#0B2A3A] hover:!text-white">Talk to an Expert</a>
            <a href="#contact" style={btn("transparent", INK, `1px solid ${INK}`)} className="hover:!bg-[#0B2A3A] hover:!text-white">Request a Demo</a>
          </div>
        </div>
      </section>
    </main>
  );
}
