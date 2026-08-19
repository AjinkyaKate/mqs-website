"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   MQXC Series product detail page — ported from
   `MQS Product Page A.dc.html` (variant A: full-bleed dark hero).
   Reusable product-page pattern populated with real MQXC content +
   assets. Site header/footer are rendered by the page wrapper.

   Interactivity: cutaway callouts, model blocks↔tabs, spec tables
   open↔accordion (below 1024), video poster→embed, sticky sub-nav +
   persistent action bar. Palette 2B + type scale.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const CYAN = "#16C1F3", CYAN_ON_LIGHT = "#0A6A88", CYAN_ON_DARK = "#5AD1F7";
const HAIR = "#D3DFE7", HAIR_DARK = "rgba(255,255,255,.14)";
const PAGE = "#F4F8FA", NAVY = "#0E3A52";
const VIDEO_ID = "SMu4sIfzggg";

const BENEFITS: [string, string][] = [
  ["Operator-safe, audit-ready", "AERB-compliant shielding, interlocked doors and a logged image trail let inspection run beside the line without a controlled area."],
  ["Fits your part", "Cabinet volume, manipulator travel and load rating are specified against your real geometry, up to 100 kg."],
  ["High-resolution imaging", "Digital flat-panel detectors down to 150 µm pixel pitch resolve porosity, cracks and voids at production speed."],
  ["More coverage, less handling", "Multi-axis manipulation with 360° rotation captures every orientation in one load."],
  ["One platform, many uses", "2D radiography and CT reconstruction share a single cabinet, procedure and operator skill set."],
];

const STATS: [string, string, string][] = [
  ["Voltage range", "160 – 450 kV", "M12 2v20M4 7l8-5 8 5v10l-8 5-8-5z"],
  ["Modality", "2D DR + CT", "M12 3a9 9 0 1 0 9 9M12 3v9l7 4"],
  ["Detector", "Down to 150 µm", "M3 5h18v14H3zM8 5v14M16 5v14M3 12h18"],
  ["Load capacity", "≤ 100 kg", "M4 20h16M6 20V9l6-5 6 5v11M9 20v-6h6v6"],
];

const GALLERY: [string, string, string][] = [
  ["/assets/mqxc-app-wheel.jpg", "Alloy wheel — porosity mapping", "Sample result — MQXC 225"],
  ["/assets/mqxc-app-bracket.jpg", "Cast bracket — shrinkage voids", "Sample result — MQXC 320"],
];

const CALLOUTS: [string, string, string, number, number][] = [
  ["A", "Shielded cabinet", "Lead-lined steel enclosure certified below 1 µSv/h at 100 mm, floor-mounted with a forklift-ready base frame.", 22, 30],
  ["B", "Motorised doors + interlocks", "Powered doors with dual-channel safety interlocks, leaded viewing window and emergency stops on both faces.", 63, 24],
  ["C", "DFPD detector", "Digital flat-panel detector on a motorised stand-off axis, selectable pixel pitch and scintillator.", 74, 56],
  ["D", "Multi-axis manipulator", "Y, Z and X travel with ±45° tilt and continuous 360° rotation, rated to 100 kg.", 44, 68],
  ["E", "MQS Imaging Suite", "Acquisition, defect analysis, CT reconstruction and report generation from one operator console.", 18, 78],
];

type Model = { id: string; name: string; voltage: string; best: string; materials: string; img: string; shot: string; desc: string; tech: string[]; bestFor: string };
const MODELS: Model[] = [
  { id: "160", name: "MQXC 160", voltage: "160 kV", best: "Electronics, light alloys, small castings", materials: "PCBs, aluminium, plastics, composites", img: "/assets/mqxc-160.jpg", shot: "Aluminium die-cast housing — wall & fill", desc: "The compact bench-class cabinet. A microfocus source and short source-to-object distance give the geometric magnification needed for solder joints, wire bonds and thin-wall alloy parts.", tech: ["Microfocus source", "150 µm DFPD", "2D DR", "Geometric magnification"], bestFor: "PCB and BGA void analysis, connector verification, small aluminium and magnesium castings, plastic and composite mouldings." },
  { id: "225", name: "MQXC 225", voltage: "225 kV", best: "Automotive castings, sub-assemblies", materials: "Aluminium, magnesium, thin steel", img: "/assets/mqxc-225.jpg", shot: "Welded pipe joint — root penetration (ASTM IQI)", desc: "The volume workhorse. Enough energy for production aluminium castings with a manipulator envelope sized for wheels, housings and manifolds, and CT reconstruction on the same platform.", tech: ["Mini-focus source", "2D DR + CT", "100 µm DFPD option", "360° manipulator"], bestFor: "Wheels, knuckles, housings and manifolds; pressure-tight castings requiring porosity classification to ASTM E505." },
  { id: "320", name: "MQXC 320", voltage: "320 kV", best: "Thick steel castings, valve bodies", materials: "Steel, ductile iron, bronze", img: "/assets/mqxc-320.jpg", shot: "Thick-walled cylindrical assembly (ASTM IQI)", desc: "Raised penetration for ferrous work. Suited to valve bodies, pump housings and pressure components where wall thickness defeats a 225 kV source.", tech: ["320 kV / 1800 W", "2D DR + CT", "Extended stand-off", "Heavy-load stage"], bestFor: "Valve and pump bodies, ductile-iron castings, thick-wall steel components and pressure-retaining parts." },
  { id: "450", name: "MQXC 450", voltage: "450 kV", best: "Heavy castings, thick welds, turbine parts", materials: "Heavy steel, superalloys, forgings", img: "/assets/mqxc-450.jpg", shot: "High-density component with central bore", desc: "The high-energy platform. A 4500 W source with a reinforced cabinet and stage for the heaviest parts that still belong in a cabinet rather than a vault.", tech: ["450 kV / 4500 W", "5.5 mm focal spot", "CT reconstruction", "100 kg stage"], bestFor: "Turbine and superalloy components, heavy steel castings, thick weld sections and forged assemblies up to 100 kg." },
];

const INDUSTRIES = ["Aerospace & defence", "Automotive & EV", "Electronics & semiconductor", "Energy & power generation", "Foundry & castings", "Oil, gas & pipelines"];
const APPLICATIONS = ["Porosity & void detection", "Weld and braze inspection", "Solder-joint & BGA voiding", "Composite delamination", "Assembly & fill verification", "Dimensional CT metrology"];

const CABINET = [
  "AERB-compliant lead shielding, below 1 µSv/h at 100 mm from any surface",
  "Motorised doors with dual-channel safety interlocks",
  "Leaded viewing window and internal cabinet lighting",
  "Emergency stops on both operator faces",
  "Radiation warning beacons and door-state indicators",
  "Forklift-ready base frame, floor-level part loading",
];

type SpecTable = { title: string; colA: string; colB: string; rows: [string, string][] };
const SPEC_TABLES: SpecTable[] = [
  { title: "Manipulator", colA: "Axis", colB: "Specification", rows: [["Y travel", "≈ 1100 mm"], ["Z travel", "≈ 1500 mm"], ["X axis", "Linear travel with ±45° tilt"], ["Rotation", "360° continuous"], ["Maximum load", "≤ 100 kg"]] },
  { title: "Detector — DFPD options", colA: "Parameter", colB: "Range", rows: [["Pixel pitch", "150 µm / 100 µm / 75 µm"], ["Active area", "430 × 430 mm or 300 × 250 mm"], ["Frame rate", "Up to 30 fps"], ["Scintillator", "CsI or GOS"]] },
  { title: "X-ray source range", colA: "Parameter", colB: "Range", rows: [["Tube voltage", "160 – 450 kV"], ["Tube power", "640 – 4500 W"], ["Source type", "Mini-focus / microfocus"], ["Focal spot", "0.4 – 5.5 mm"], ["Modality", "2D DR / CT"]] },
];

const NAV_ITEMS: [string, string][] = [["Overview", "#overview"], ["Highlights", "#highlights"], ["Models", "#models"], ["Applications", "#applications"], ["Specs", "#specs"], ["Video", "#video"], ["Demo", "#demo"]];
/* Real files in /public/brochures, with their real sizes. The former
   "AERB compliance certificate · PDF · 0.8 MB" row is gone: no such document was
   supplied, and both rows pointed at #contact while showing a download icon. */
const DOWNLOADS: { title: string; meta: string; file: string }[] = [
  { title: "MQXC Series brochure", meta: "PDF · 1.2 MB · Cabinet-based DR solutions", file: "mqxc-cabinet-dr.pdf" },
  { title: "Digital radiography systems", meta: "PDF · 1.3 MB · Range overview", file: "digital-radiography.pdf" },
];

const eyebrow = (color: string) => ({ font: "500 11px/1 var(--font-sans)", letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const h2 = { margin: "14px 0 0", font: "600 clamp(28px,3.2vw,40px)/1.1 var(--font-sans)", letterSpacing: "-.025em", color: INK, textWrap: "pretty" as const };
const btnPrimary = { display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: CYAN, color: "#08283A", font: "500 13px/1 var(--font-sans)", letterSpacing: ".045em", textTransform: "uppercase" as const, transition: `background 200ms ${EASE},color 200ms ${EASE}` };
const th = { textAlign: "left" as const, padding: "16px 20px", background: "#EAF1F5", borderBottom: `1px solid ${HAIR}`, font: "500 11px/1 var(--font-sans)", letterSpacing: ".09em", textTransform: "uppercase" as const, color: MUTED, whiteSpace: "nowrap" as const };

export default function MqxcSeries() {
  const [w, setW] = useState(1440);
  const [activeCallout, setActiveCallout] = useState(0);
  const [activeModel, setActiveModel] = useState(0);
  const [openSpec, setOpenSpec] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); };
  }, []);

  const mobile = w <= 640, tablet = w > 640 && w <= 1024, desktop = w > 1024, compact = !desktop;
  const heroPad = mobile ? "120px 24px 48px" : tablet ? "132px 40px 64px" : "150px 55px 80px";
  const am = MODELS[activeModel];

  return (
    <main style={{ background: PAGE, color: INK, fontFamily: "var(--font-sans)" }}>
      {/* HERO — full-bleed dark, header overlays it */}
      <section id="overview" style={{ position: "relative", background: "#0B2A3A", overflow: "hidden" }}>
        <Image src="/assets/mqxc-hero-bg.jpg" alt="Production floor lined with inspection and manufacturing machinery" fill sizes="100vw" className="object-cover" style={{ filter: "grayscale(1)" }} />
        {/* steel-navy duotone (matches Industries / home hero) */}
        <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.94) 0%,rgba(11,42,58,.78) 46%,rgba(11,42,58,.34) 100%)" }} />
        <div className="relative flex flex-col justify-end" style={{ zIndex: 3, minHeight: mobile ? 520 : tablet ? 560 : 640, maxWidth: 760, gap: 18, padding: heroPad }}>
          <h1 style={{ margin: 0, font: "600 clamp(30px,4.2vw,58px)/1.04 var(--font-sans)", letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>See inside every part. Safely. Repeatably. On your floor.</h1>
          <p style={{ margin: 0, font: "400 clamp(15px,1.3vw,19px)/1.55 var(--font-sans)", color: "rgba(255,255,255,.80)", maxWidth: 600, textWrap: "pretty" }}>Self-contained DR &amp; CT-ready platforms with AERB-compliant shielding, high-resolution detectors and multi-axis part handling — installed on your production floor, not in a bunker.</p>
          <div className="flex flex-wrap" style={{ gap: 12, marginTop: 8 }}>
            <a href="#contact" style={btnPrimary} className="hover:!bg-[#0B2A3A] hover:!text-white">Request a demo</a>
            <a href="/brochures/mqxc-cabinet-dr.pdf" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: "transparent", border: "1px solid rgba(255,255,255,.42)", color: "#fff", font: "500 13px/1 var(--font-sans)", letterSpacing: ".045em", textTransform: "uppercase" }} className="hover:!bg-white/10">Download brochure (PDF)</a>
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAV */}
      <div className="sticky z-40" style={{ top: 0, background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex items-center overflow-x-auto" style={{ maxWidth: 1440, padding: "0 clamp(24px,4vw,55px)", scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href} className="flex-none border-b-2 border-transparent hover:!text-[#0B2A3A] hover:!border-b-[#16C1F3]" style={{ padding: "16px 18px", font: "500 11px/1 var(--font-sans)", letterSpacing: ".09em", textTransform: "uppercase", color: MUTED, transition: `color 200ms ${EASE},border-color 200ms ${EASE}` }}>{label}</a>
          ))}
        </div>
      </div>

      {/* PRODUCT OVERVIEW */}
      <section style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE }}>
        <div className="mx-auto grid items-start" style={{ maxWidth: 1330, gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: "clamp(32px,4vw,64px)" }}>
          <div className="flex flex-col" style={{ gap: 28 }}>
            <div>
              <div style={eyebrow(CYAN_ON_LIGHT)}>Product overview</div>
              <h2 style={{ margin: "14px 0 0", font: "600 clamp(28px,3.2vw,42px)/1.08 var(--font-sans)", letterSpacing: "-.025em", color: INK, textWrap: "pretty" }}>Built for the part you actually inspect.</h2>
            </div>
            <div style={{ border: `1px solid ${HAIR}`, aspectRatio: compact ? "16/9" : "4/3", overflow: "hidden", background: "#fff" }}>
              <Image src="/assets/mqxc-hero.jpg" alt="MQXC cabinet X-ray system" width={800} height={600} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col" style={{ gap: 20 }}>
            <p style={{ margin: 0, font: "400 clamp(16px,1.2vw,19px)/1.55 var(--font-sans)", color: BODY, textWrap: "pretty" }}>Castings, welds, electronics, composites and assemblies rarely share a geometry. The MQXC series is built around the part — cabinet volume, manipulator travel and source energy are specified together so the system matches what leaves your line, not a catalogue average.</p>
            <p style={{ margin: 0, font: "400 16px/1.6 var(--font-sans)", color: BODY, textWrap: "pretty" }}>Every model shares one architecture: an AERB-compliant shielded cabinet, interlocked motorised doors, a digital flat-panel detector and the MQS Imaging Suite. You choose the energy and handling envelope; the operating procedure, training and audit trail stay the same across the fleet.</p>
            <h3 style={{ margin: "12px 0 0", font: "600 20px/1.25 var(--font-sans)", letterSpacing: "-.02em", color: INK }}>Key features</h3>
            <ul className="m-0 flex list-none flex-col p-0" style={{ borderTop: `1px solid ${HAIR}` }}>
              {BENEFITS.map(([t, x]) => (
                <li key={t} className="flex" style={{ gap: 14, padding: "14px 0", borderBottom: `1px solid ${HAIR}` }}>
                  <span className="flex-none" style={{ width: 8, height: 8, marginTop: 8, background: CYAN }} />
                  <span style={{ font: "400 15px/1.55 var(--font-sans)", color: BODY, textWrap: "pretty" }}><strong style={{ fontWeight: 600, color: INK }}>{t}</strong> — {x}</span>
                </li>
              ))}
            </ul>
            <div><a href="#contact" style={{ ...btnPrimary, marginTop: 8 }} className="hover:!bg-[#0B2A3A] hover:!text-white">Request a demo</a></div>
          </div>
        </div>
      </section>

      {/* SPEC HIGHLIGHTS STRIP (navy) */}
      <section style={{ background: NAVY, padding: "clamp(40px,5vw,64px) clamp(24px,4vw,55px)" }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div className="grid" style={{ gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(4,1fr)", borderTop: `1px solid ${HAIR_DARK}`, borderLeft: mobile ? "none" : `1px solid ${HAIR_DARK}` }}>
            {STATS.map(([label, value, icon]) => (
              <div key={label} className="flex flex-col" style={{ gap: 14, padding: "26px 24px 30px", borderRight: mobile ? "none" : `1px solid ${HAIR_DARK}`, borderBottom: `1px solid ${HAIR_DARK}` }}>
                <div className="flex" style={{ color: CYAN_ON_DARK }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"><path d={icon} /></svg></div>
                <div style={eyebrow("rgba(255,255,255,.60)")}>{label}</div>
                <div style={{ font: "600 clamp(20px,2vw,26px)/1.15 var(--font-sans)", letterSpacing: "-.02em", color: "#fff" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION GALLERY */}
      <section style={{ background: "#fff", padding: `${mobile ? "40px" : "clamp(48px,6vw,80px)"} 0` }}>
        <div className="grid" style={{ gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 1, background: HAIR, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          {GALLERY.map(([src, note, caption]) => (
            <figure key={src} className="m-0" style={{ background: "#fff", padding: 16 }}>
              <div style={{ position: "relative", aspectRatio: "4/3", background: "#111417", border: `1px solid ${HAIR}`, overflow: "hidden" }}>
                <Image src={src} alt={note} width={800} height={600} className="h-full w-full object-cover" />
              </div>
              <figcaption style={{ marginTop: 10, font: "500 11px/1.4 var(--font-sans)", letterSpacing: ".045em", textTransform: "uppercase", color: MUTED }}>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRODUCT HIGHLIGHTS / CUTAWAY */}
      <section id="highlights" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: "#fff", borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Product highlights</div>
          <h2 style={{ ...h2, marginBottom: 40 }}>What makes up an MQXC system.</h2>
          <div className="grid items-start" style={{ gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: "clamp(32px,4vw,56px)" }}>
            <div style={{ position: "relative", border: `1px solid ${HAIR}`, aspectRatio: compact ? "16/9" : "4/3", minHeight: compact ? undefined : 320, overflow: "hidden", background: PAGE }}>
              <Image src="/assets/mqxc-cutaway.jpg" alt="Cabinet cutaway showing shielding, door, detector, manipulator and control station" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              {CALLOUTS.map(([letter, label, , x, y], i) => {
                const on = activeCallout === i;
                return (
                  <button key={letter} type="button" onMouseEnter={() => setActiveCallout(i)} onClick={() => setActiveCallout(i)} aria-label={label}
                    style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", zIndex: 4, width: 30, height: 30, padding: 0, cursor: "pointer", border: `1px solid ${on ? CYAN : "#0B2A3A"}`, background: on ? CYAN : "rgba(255,255,255,.92)", color: on ? "#08283A" : INK, font: "600 12px/1 var(--font-sans)", transition: `background 200ms ${EASE},border-color 200ms ${EASE},color 200ms ${EASE}` }}>{letter}</button>
                );
              })}
            </div>
            <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
              {CALLOUTS.map(([letter, label, text], i) => {
                const on = activeCallout === i;
                return (
                  <div key={letter} onMouseEnter={() => setActiveCallout(i)} onClick={() => setActiveCallout(i)} style={{ display: "flex", gap: 16, padding: compact ? "14px 16px" : "20px 18px", borderBottom: `1px solid ${HAIR}`, background: on ? "#EAF6FB" : "transparent", cursor: compact ? "pointer" : "default", transition: `background 200ms ${EASE}` }}>
                    <div className="flex flex-none items-center justify-center" style={{ width: 30, height: 30, border: `1px solid ${on ? CYAN : HAIR}`, background: on ? CYAN : "transparent", color: on ? "#08283A" : MUTED, font: "600 12px/1 var(--font-sans)", transition: `background 200ms ${EASE},border-color 200ms ${EASE},color 200ms ${EASE}` }}>{letter}</div>
                    <div className="flex flex-col" style={{ gap: 6 }}>
                      <div style={{ font: "600 17px/1.3 var(--font-sans)", letterSpacing: "-.01em", color: INK }}>{label}</div>
                      {(!compact || on) && <div style={{ font: "400 14px/1.6 var(--font-sans)", color: BODY, textWrap: "pretty" }}>{text}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MODEL LINEUP */}
      <section id="models" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE, borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Model lineup</div>
          <h2 style={{ ...h2, marginBottom: 40 }}>Four models. One architecture.</h2>
          <div className="overflow-x-auto" style={{ background: "#fff", border: `1px solid ${HAIR}` }}>
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 720 }}>
              <thead><tr><th style={th}>Model</th><th style={th}>Voltage</th><th style={th}>Best for</th><th style={th}>Materials</th></tr></thead>
              <tbody>
                {MODELS.map((m, i) => (
                  <tr key={m.id} style={{ background: i % 2 ? "#F7FAFC" : "#fff" }}>
                    <td style={{ padding: "16px 20px", borderBottom: `1px solid ${HAIR}`, font: "600 15px/1.4 var(--font-sans)", color: INK, whiteSpace: "nowrap" }}>{m.name}</td>
                    <td style={{ padding: "16px 20px", borderBottom: `1px solid ${HAIR}`, font: "400 15px/1.5 var(--font-sans)", color: BODY }}>{m.voltage}</td>
                    <td style={{ padding: "16px 20px", borderBottom: `1px solid ${HAIR}`, font: "400 15px/1.5 var(--font-sans)", color: BODY }}>{m.best}</td>
                    <td style={{ padding: "16px 20px", borderBottom: `1px solid ${HAIR}`, font: "400 15px/1.5 var(--font-sans)", color: BODY }}>{m.materials}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ margin: "16px 0 0", font: "400 13px/1.6 var(--font-sans)", color: MUTED, textWrap: "pretty", maxWidth: 720 }}>
            The <strong style={{ fontWeight: 600, color: INK }}>MQXC 102</strong> featured above is a customer-specific custom build. The four models below make up the standard MQXC lineup — all share the same cabinet architecture, imaging suite and safety design, differing only in penetration.
          </p>

          {compact ? (
            <div style={{ marginTop: 48 }}>
              <div role="tablist" className="flex flex-wrap" style={{ borderBottom: `1px solid ${HAIR}` }}>
                {MODELS.map((m, i) => {
                  const on = activeModel === i;
                  return <button key={m.id} type="button" role="tab" aria-selected={on} onClick={() => setActiveModel(i)} style={{ padding: "14px 22px", marginBottom: -1, cursor: "pointer", background: "transparent", border: "none", borderBottom: `2px solid ${on ? CYAN : "transparent"}`, font: "500 12px/1 var(--font-sans)", letterSpacing: ".045em", textTransform: "uppercase", color: on ? INK : MUTED, transition: `color 200ms ${EASE},border-color 200ms ${EASE}` }}>{m.name}</button>;
                })}
              </div>
              <div className="grid items-start" style={{ gridTemplateColumns: "1fr", gap: "clamp(24px,3vw,48px)", padding: "clamp(32px,4vw,44px) 0" }}>
                <ModelMedia m={am} />
                <ModelBody m={am} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col" style={{ marginTop: 48, borderTop: `1px solid ${HAIR}` }}>
              {MODELS.map((m) => (
                <div key={m.id} className="grid items-start" style={{ gridTemplateColumns: "440px 1fr", gap: "clamp(24px,3vw,48px)", padding: "clamp(32px,4vw,48px) 0", borderBottom: `1px solid ${HAIR}` }}>
                  <ModelMedia m={m} />
                  <ModelBody m={m} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INDUSTRIES & APPLICATIONS (navy) */}
      <section id="applications" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: NAVY, color: "#fff" }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_DARK)}>Industries &amp; applications</div>
          <h2 style={{ margin: "14px 0 44px", font: "600 clamp(28px,3.2vw,40px)/1.1 var(--font-sans)", letterSpacing: "-.025em", color: "#fff" }}>Where MQXC is used.</h2>
          <div className="grid" style={{ gridTemplateColumns: compact ? "1fr" : "1fr 1fr", gap: "clamp(32px,4vw,64px)" }}>
            {[["Industries served", INDUSTRIES], ["Typical applications", APPLICATIONS]].map(([heading, items]) => (
              <div key={heading as string}>
                <div style={{ ...eyebrow("rgba(255,255,255,.60)"), paddingBottom: 16, borderBottom: `1px solid ${HAIR_DARK}` }}>{heading as string}</div>
                <ul className="m-0 list-none p-0">
                  {(items as string[]).map((t) => (
                    <li key={t} className="flex items-baseline" style={{ gap: 14, padding: "16px 0", borderBottom: `1px solid ${HAIR_DARK}`, font: "400 16px/1.5 var(--font-sans)", color: "#fff" }}>
                      <span className="flex-none" style={{ width: 6, height: 6, background: CYAN }} />{t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL DATA */}
      <section id="specs" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: "#fff" }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Technical data</div>
          <h2 style={{ ...h2, marginBottom: 44 }}>Specifications.</h2>
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ margin: "0 0 18px", font: "600 20px/1.25 var(--font-sans)", letterSpacing: "-.02em", color: INK }}>Cabinet design</h3>
            <ul className="m-0 grid list-none p-0" style={{ gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: "0 40px", borderTop: `1px solid ${HAIR}` }}>
              {CABINET.map((c) => (
                <li key={c} className="flex" style={{ gap: 14, padding: "14px 0", borderBottom: `1px solid ${HAIR}`, font: "400 15px/1.55 var(--font-sans)", color: BODY }}>
                  <span className="flex-none" style={{ width: 8, height: 8, marginTop: 7, background: CYAN }} />{c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col" style={{ gap: 44 }}>
            {SPEC_TABLES.map((t, ti) => {
              const open = compact ? openSpec === ti : true;
              return (
                <div key={t.title}>
                  {!compact && <h3 style={{ margin: "0 0 18px", font: "600 20px/1.25 var(--font-sans)", letterSpacing: "-.02em", color: INK }}>{t.title}</h3>}
                  {compact && (
                    <button type="button" onClick={() => setOpenSpec(openSpec === ti ? -1 : ti)} aria-expanded={open} className="flex w-full items-center justify-between hover:!bg-[#EAF6FB]" style={{ gap: 16, padding: "16px 18px", cursor: "pointer", background: "#fff", border: `1px solid ${HAIR}`, textAlign: "left", font: "600 16px/1.3 var(--font-sans)", letterSpacing: "-.01em", color: INK, transition: `background 200ms ${EASE}` }}>
                      <span>{t.title}</span>
                      <span className="flex flex-none items-center justify-center" style={{ width: 26, height: 26, background: open ? CYAN : "#EAF1F5", color: INK, font: "600 14px/1 var(--font-sans)" }}>{open ? "–" : "+"}</span>
                    </button>
                  )}
                  {open && (
                    <div className="overflow-x-auto" style={{ border: `1px solid ${HAIR}` }}>
                      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560 }}>
                        <thead><tr><th style={th}>{t.colA}</th><th style={th}>{t.colB}</th></tr></thead>
                        <tbody>
                          {t.rows.map(([k, v], i) => (
                            <tr key={k} style={{ background: i % 2 ? "#F7FAFC" : "#fff" }}>
                              <td style={{ padding: "14px 20px", borderBottom: `1px solid ${HAIR}`, font: "500 15px/1.5 var(--font-sans)", color: INK, whiteSpace: "nowrap" }}>{k}</td>
                              <td style={{ padding: "14px 20px", borderBottom: `1px solid ${HAIR}`, font: "400 15px/1.5 var(--font-sans)", color: BODY }}>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCT VIDEO */}
      <section id="video" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE, borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Product video</div>
          <h2 style={{ ...h2, marginBottom: 40 }}>See the system in operation.</h2>
          <div style={{ position: "relative", aspectRatio: "16/9", background: "#111417", border: `1px solid ${HAIR}`, overflow: "hidden" }}>
            {playing ? (
              <iframe title="MQXC product video" className="absolute inset-0 h-full w-full" style={{ border: 0 }} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`} />
            ) : (
              <>
                <Image src="/assets/mqxc-hero.jpg" alt="MQXC in operation" fill sizes="100vw" className="object-cover" style={{ opacity: 0.5 }} />
                <button type="button" onClick={() => setPlaying(true)} aria-label="Play product video" className="absolute inset-0 flex items-center justify-center hover:!bg-black/20" style={{ background: "transparent" }}>
                  <span className="flex items-center justify-center hover:!bg-[#16C1F3] hover:!border-[#16C1F3]" style={{ width: 68, height: 68, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.42)", color: "#fff", transition: `background 200ms ${EASE},border-color 200ms ${EASE}` }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* DOWNLOADS & DEMO */}
      <section id="demo" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE }}>
        <div id="downloads" className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Downloads &amp; demo</div>
          <h2 style={{ ...h2, marginBottom: 40 }}>Take the next step.</h2>
          <div className="grid" style={{ gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
            {DOWNLOADS.map(({ title, meta, file }) => (
              <a key={title} href={`/brochures/${file}`} target="_blank" rel="noopener" className="flex items-center justify-between hover:!bg-[#EAF6FB]" style={{ gap: 24, padding: "28px 26px", background: "#fff", transition: `background 200ms ${EASE}` }}>
                <span className="flex flex-col" style={{ gap: 6 }}>
                  <span style={{ font: "600 17px/1.3 var(--font-sans)", letterSpacing: "-.01em", color: INK }}>{title}</span>
                  <span style={eyebrow(MUTED)}>{meta}</span>
                </span>
                <span className="flex flex-none items-center justify-center" style={{ width: 42, height: 42, background: CYAN, color: "#08283A" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"><path d="M12 3v13M6 11l6 6 6-6M4 21h16" /></svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ModelMedia({ m }: { m: Model }) {
  return (
    <figure className="m-0">
      <div style={{ position: "relative", background: "#111417", border: `1px solid ${HAIR}`, aspectRatio: "4/3", overflow: "hidden" }}>
        <Image src={m.img} alt={`Radiograph — ${m.shot}`} width={800} height={600} className="h-full w-full object-cover" />
      </div>
      <figcaption style={{ marginTop: 10, font: "500 11px/1.4 var(--font-sans)", letterSpacing: ".045em", textTransform: "uppercase", color: MUTED }}>Sample result — {m.name}</figcaption>
    </figure>
  );
}

function ModelBody({ m }: { m: Model }) {
  return (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <h3 style={{ margin: 0, font: "600 24px/1.2 var(--font-sans)", letterSpacing: "-.02em", color: INK }}>{m.name}</h3>
      <p style={{ margin: 0, font: "400 16px/1.6 var(--font-sans)", color: BODY, textWrap: "pretty" }}>{m.desc}</p>
      <div>
        <div style={{ ...eyebrow(CYAN_ON_LIGHT), marginBottom: 12 }}>Key technologies</div>
        <ul className="m-0 flex list-none flex-wrap p-0" style={{ gap: 8 }}>
          {m.tech.map((t) => <li key={t} style={{ padding: "8px 14px", background: "#fff", border: `1px solid ${HAIR}`, font: "400 13px/1.2 var(--font-sans)", color: BODY }}>{t}</li>)}
        </ul>
      </div>
      <div>
        <div style={{ ...eyebrow(CYAN_ON_LIGHT), marginBottom: 8 }}>Best for</div>
        <div style={{ font: "400 15px/1.6 var(--font-sans)", color: BODY, textWrap: "pretty" }}>{m.bestFor}</div>
      </div>
    </div>
  );
}
