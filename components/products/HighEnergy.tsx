"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   High-Energy X-ray Solutions — product page.
   Built on the MQXC product-page pattern (dark hero, sticky sub-nav,
   navy stat strip, spec tables) + three new pieces from the doc:
   an animated penetration bar chart, application pill tags and an
   installed-base name grid. Content verbatim from the source doc.
   Palette 2B + site font.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const CYAN = "#16C1F3", CYAN_ON_LIGHT = "#0A6A88", CYAN_ON_DARK = "#5AD1F7";
const HAIR = "#D3DFE7", HAIR_DARK = "rgba(255,255,255,.14)";
const PAGE = "#F4F8FA", NAVY = "#0E3A52";
const SANS = "var(--font-sans)";

const NAV_ITEMS: [string, string][] = [["Overview", "#overview"], ["Energy range", "#range"], ["Systems", "#systems"], ["Applications", "#applications"], ["Specs", "#specs"], ["Installed base", "#clients"]];

const STATS: [string, string, string][] = [
  ["0.9 – 15 MeV", "X-ray energy range", "M13 2 3 14h7l-1 8 11-12h-7z"],
  ["0.25 – 120 Gy/min", "Dose rate range", "M12 3a9 9 0 1 0 9 9M12 3v9l7 4"],
  ["30 – 500 mm", "Thickness range in steel", "M3 5h18v14H3zM8 5v14M16 5v14M3 12h18"],
];

const COMPONENTS: [string, string, string][] = [
  ["Source", "Varex Linear Accelerators", "Linatron models from 0.95 to 15 MeV, single and dual energy, selected against the thickness and density you actually inspect."],
  ["Imaging", "Detectors & Software", "Digital flat panel detectors rated to 16 MeV with optional line detectors, driven by MQS Imaging Suite and VG Studio Max."],
  ["Handling", "Manipulators & Enclosures", "Multi-axial manipulators for the accelerator head, detector and object, plus shielded enclosures and remote control stations."],
];

const HIGHLIGHTS: [string, string][] = [
  ["CT-Ready Framework", "Upgradeable for 3D computed tomography, extending usefulness and future-proofing the investment."],
  ["Dual Energy Linatron", "Deep penetration through high-density steel and propellant, with energy selection for different tasks."],
  ["Custom Multi-Axis Manipulator", "Adapts to complex shapes and orientations — less repositioning, better coverage."],
  ["Digital Flat Panel Detector", "High-resolution images at fast frame rates for real-time flaw detection with excellent clarity."],
  ["Real-Time ADR Software", "Instantly identifies cracks, voids and porosity — faster inspection, less operator subjectivity."],
];

type Model = { name: string; energy: string; min: number; max: number; dose: string };
const MODELS: Model[] = [
  { name: "M1", energy: "0.95 MeV", min: 30, max: 105, dose: "0.25 Gy/min" },
  { name: "M3A", energy: "1 / 2 / 3 MeV", min: 30, max: 210, dose: "3 Gy/min" },
  { name: "M6A", energy: "3.5 / 5 / 6 MeV", min: 35, max: 270, dose: "8 Gy/min" },
  { name: "M9A", energy: "5 / 6 / 9 MeV", min: 40, max: 380, dose: "30 Gy/min" },
  { name: "K15", energy: "9 / 15 MeV", min: 70, max: 500, dose: "120 Gy/min" },
];
const SCALE_MAX = 500;

type Config = { no: string; sector: string; title: string; desc: string; specs: [string, string][]; image: string };
const CONFIGS: Config[] = [
  {
    no: "01", sector: "Aerospace & heavy engineering", title: "K15 Dual Energy LINAC System",
    desc: "Built around the K15 dual energy accelerator for rocket motors, solid propellants, castings and heavy engineering products — detecting cracks, porosity, inhomogeneities, inclusions and foreign bodies. An EOT crane-mounted head manipulator carries the accelerator, so large objects can be inspected from multiple angles without being repositioned.",
    specs: [["Energy", "9 / 15 MeV"], ["Penetration in steel", "Up to 500 mm at 15 MeV · up to 380 mm at 9 MeV"], ["Focal spot", "Less than 2 mm"], ["Dose rate", "15 MeV: 40–120 Gy/min-m · 9 MeV: 12–40 Gy/min-m"], ["Beam symmetry", "Within ±5%"], ["Solid propellant", "Up to 2500 mm thickness"]],
    image: "/assets/he-k15.jpg",
  },
  {
    no: "02", sector: "Real-time inspection", title: "Digital Radiography with Linear Accelerators",
    desc: "Accelerators combined with multi-axis manipulators for real-time NDT inspection, used for defect analysis in viscoelastic materials, metals and composites where volumes are large and geometries complex. The complete system is the accelerator, flat panel detector, manipulator and a control unit operated remotely from outside the inspection room.",
    specs: [["Manipulator", "Seven axis for real-time inspection of solid propellants, plus a rotary table for small cylindrical objects"], ["Object envelope", "Cylindrical up to 500 mm diameter, 3500 mm length, 500 kg (customisable)"], ["Radiography quality", "1–2T or better for 50–250 mm steel (ASTM E-94)"], ["Defect analysis", "Voids, porosity with measurement, foreign-body identification"]],
    image: "/assets/he-seven-axis.jpg",
  },
  {
    no: "03", sector: "Space-constrained sites", title: "Wall Mount Manipulator Systems",
    desc: "Where floor space is the constraint, a wall-mounted mainframe holds an X-ray head up to 15 MeV. Widely used in casting and foundry work, and compatible with both film and digital radiography systems.",
    specs: [["Axes", "Long travel, hoist, magnification, tilt and rotation"], ["Object size", "3 m height × 5 m diameter"], ["Tilt & rotation", "±60° at 0.1° stepper accuracy"]],
    image: "/assets/he-wallmount.jpg",
  },
  {
    no: "04", sector: "Volumetric analysis", title: "MQHCT Series — High Energy Computed Tomography",
    desc: "High-energy CT for large, intricate parts — producing a measurable 3D volume rather than a projection, so porosity can be sized and located rather than estimated. Energy is chosen against the application, and the cell is configured around multi-axial manipulators, accelerators, detectors and imaging software.",
    specs: [["X-ray source", "Dual energy Linatron, with optional dual-focus 450 kV industrial X-ray"], ["Imaging system", "Digital flat panel detector to 16 MeV, with optional line detector"], ["Handling", "Custom multi-axial manipulators for tube, flat panel and object"], ["Imaging software", "MQS Imaging Suite, VG Studio Max, Varex CBCT tools"], ["Control station", "Control unit, operator workstation and image visualisation workstation"]],
    image: "/assets/he-hero.jpg",
  },
];

const APP_TAGS = ["Castings", "Solid propellants", "Rocket motor bodies", "Weldments", "Pressure vessels", "Valves", "Engine blocks", "Aircraft body structures", "Ship body sections", "Composites", "Cargo"];
const APP_CALLOUTS: [string, string, string][] = [
  ["Aerospace", "Rocket Motors & Propellants", "Cracks, voids and debonds in grain and casing, at thicknesses no tube-based system can reach."],
  ["Heavy engineering", "Castings & Pressure Parts", "Porosity, shrinkage and inclusions in thick-section castings, valve bodies and pressure vessels."],
  ["Energy", "Weldments & Components", "Weld integrity in heavy fabricated structures where radiographic quality must meet ASTM E-94."],
];

type SpecTable = { title: string; rows: [string, string][] };
const SPEC_TABLES: SpecTable[] = [
  { title: "Digital Flat Panel Detector", rows: [["Operational energy range", "40 kV – 16 MeV"], ["Active pixel area", "42.7 × 42.7 cm"], ["Pixel pitch", "139 µm"], ["Frame rate", "4 fps (1×1) · 15 fps (2×2)"]] },
  { title: "Beam Characteristics", rows: [["Focal spot size", "Does not exceed 2.0 mm, measured by Full Width Half Max"], ["Small focal spot", "1.0–1.5 mm on Mi-9 only, at reduced maximum dose rate"], ["Field flatness", "Measured at 1 m from target, ±7.5° off the central axis"], ["Field symmetry", "Beam asymmetry does not exceed 5% at 1 m from target"], ["Shielding", "Low leakage 1.0 × 10⁻³ (fraction)"], ["Alignment laser", "533 nm Class II, 0.5 mW — not with the ULLP leakage option"]] },
];

type Client = { name: string; src?: string; width?: number; height?: number };
const CLIENTS: Client[] = [
  { name: "ISRO", src: "/assets/logos/isro.png", width: 123, height: 118 },
  { name: "BHEL", src: "/assets/logos/bhel.png", width: 124, height: 97 },
  { name: "Bharat Dynamics", src: "/assets/logos/bdl.png", width: 143, height: 71 },
  { name: "Bharat Electronics", src: "/assets/logos/bel.png", width: 163, height: 52 },
  { name: "HAL", src: "/assets/logos/hal.png", width: 482, height: 190 },
  { name: "IGCAR", src: "/assets/logos/igcar.png", width: 200, height: 200 },
  { name: "NFC" },
  { name: "BrahMos Aerospace", src: "/assets/logos/brahmos.png", width: 202, height: 200 },
  { name: "Ratnamani Metals", src: "/assets/logos/ratnamani.png", width: 253, height: 100 },
  { name: "Gulf", src: "/assets/logos/gulf.png", width: 112, height: 102 },
  { name: "Indian Air Force", src: "/assets/logos/indian-air-force.png", width: 98, height: 111 },
  { name: "Ordnance Factories", src: "/assets/logos/ordnance-factory-board.png", width: 136, height: 200 },
];

const eyebrow = (color: string) => ({ font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const h2 = { margin: "14px 0 0", font: `600 clamp(28px,3.2vw,40px)/1.1 ${SANS}`, letterSpacing: "-.025em", color: INK, textWrap: "pretty" as const };
const th = { textAlign: "left" as const, padding: "16px 20px", background: "#EAF1F5", borderBottom: `1px solid ${HAIR}`, font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color: MUTED };
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: CYAN, color: "#08283A", font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", transition: `background 200ms ${EASE},color 200ms ${EASE}` };

export default function HighEnergy() {
  const [w, setW] = useState(1440);
  const [openSpec, setOpenSpec] = useState(0);
  const [barsIn, setBarsIn] = useState(false);
  const [reduced, setReduced] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    const initialFrame = requestAnimationFrame(onResize);
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionFrame = requestAnimationFrame(() => setReduced(mq.matches));
    return () => {
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(motionFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const el = barsRef.current;
    if (!el) return;
    if (reduced) {
      const frame = requestAnimationFrame(() => setBarsIn(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setBarsIn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const mobile = w <= 640, desktop = w > 1024, compact = !desktop;

  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      {/* HERO */}
      <section id="overview" style={{ position: "relative", overflow: "hidden", background: "#0B2A3A" }}>
        <div className="mx-auto grid items-center" style={{ maxWidth: 1330, gridTemplateColumns: desktop ? "1fr 0.92fr" : "1fr", gap: "clamp(28px,4vw,56px)", padding: mobile ? "120px 24px 48px" : desktop ? "150px 55px 88px" : "132px 40px 64px" }}>
          <div className="flex flex-col" style={{ gap: 20, maxWidth: 620 }}>
            <div style={eyebrow(CYAN_ON_DARK)}>High energy radiography &amp; CT · 0.9–15 MeV</div>
            <h1 style={{ margin: 0, font: `600 clamp(32px,4.4vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>See Through <span style={{ color: CYAN_ON_DARK }}>500 mm</span> of Steel.</h1>
            <p style={{ margin: 0, font: `400 clamp(15px,1.3vw,18px)/1.6 ${SANS}`, color: "rgba(255,255,255,.80)", textWrap: "pretty" }}>When a part is too dense for an X-ray tube, a linear accelerator is the only way in. MQS builds turnkey high-energy inspection systems for rocket motors, solid propellants, heavy castings and pressure vessels — installed, shielded and supported in India.</p>
            <div className="flex flex-wrap" style={{ gap: 12, marginTop: 6 }}>
              <a href="#contact" style={btnPrimary} className="hover:!bg-white hover:!text-[#0B2A3A]">Talk to an Engineer</a>
              <a href="#specs" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: "transparent", border: "1px solid rgba(255,255,255,.42)", color: "#fff", font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase" }} className="hover:!bg-white/10">See Specifications</a>
            </div>
          </div>
          <div style={{ position: "relative", border: `1px solid ${HAIR_DARK}`, background: "#0A1016", aspectRatio: "16/11", overflow: "hidden" }}>
            <Image src="/assets/he-hero.jpg" alt="High-energy dual-head multi-energy CT system with linear accelerator, object manipulator and flat panel detector" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAV */}
      <div className="sticky z-40" style={{ top: 0, background: "#fff", borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex items-center overflow-x-auto" style={{ maxWidth: 1440, padding: "0 clamp(24px,4vw,55px)", scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href} className="flex-none border-b-2 border-transparent hover:!text-[#0B2A3A] hover:!border-b-[#16C1F3]" style={{ padding: "16px 18px", font: `500 11px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase", color: MUTED, transition: `color 200ms ${EASE},border-color 200ms ${EASE}` }}>{label}</a>
          ))}
        </div>
      </div>

      {/* STATS STRIP */}
      <section style={{ background: NAVY, padding: "clamp(40px,5vw,64px) clamp(24px,4vw,55px)" }}>
        <div className="mx-auto grid" style={{ maxWidth: 1330, gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", borderTop: `1px solid ${HAIR_DARK}`, borderLeft: mobile ? "none" : `1px solid ${HAIR_DARK}` }}>
          {STATS.map(([figure, label, icon]) => (
            <div key={label} className="flex flex-col" style={{ gap: 14, padding: "26px 24px 30px", borderRight: mobile ? "none" : `1px solid ${HAIR_DARK}`, borderBottom: `1px solid ${HAIR_DARK}` }}>
              <div style={{ color: CYAN_ON_DARK }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"><path d={icon} /></svg></div>
              <div style={{ font: `600 clamp(22px,2.4vw,30px)/1.1 ${SANS}`, letterSpacing: "-.02em", color: "#fff" }}>{figure}</div>
              <div style={eyebrow("rgba(255,255,255,.60)")}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, gap: "clamp(32px,4vw,52px)" }}>
          <div className="grid items-start" style={{ gridTemplateColumns: desktop ? "0.9fr 1.1fr" : "1fr", gap: "clamp(24px,4vw,64px)" }}>
            <div>
              <div style={eyebrow(CYAN_ON_LIGHT)}>Overview</div>
              <h2 style={{ ...h2, font: `600 clamp(28px,3.2vw,42px)/1.08 ${SANS}` }}>Density Is the Limit. Energy Is the Answer.</h2>
            </div>
            <div className="flex flex-col" style={{ gap: 18 }}>
              <p style={{ margin: 0, font: `400 clamp(16px,1.2vw,18px)/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>A 450 kV tube stops at roughly 80 mm of steel. Beyond that the beam is absorbed before it reaches the detector and the image goes dark — not because the defect is invisible, but because nothing got through.</p>
              <p style={{ margin: 0, font: `400 16px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>Linear accelerators produce photons energetic enough to pass through half a metre of steel, or two and a half metres of solid propellant. For more than a decade MQS has delivered off-the-shelf and fully customised turnkey systems built on this principle, for some of the country&apos;s most demanding aerospace, defence, energy and heavy-engineering programmes.</p>
            </div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
            {COMPONENTS.map(([tag, title, desc]) => (
              <div key={title} className="flex flex-col" style={{ background: "#fff", gap: 10, padding: "clamp(22px,2.4vw,30px)" }}>
                <div style={eyebrow(CYAN_ON_LIGHT)}>{tag}</div>
                <h3 style={{ margin: 0, font: `600 19px/1.25 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{title}</h3>
                <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT HIGHLIGHTS */}
      <section style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: "#fff", borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Product highlights</div>
          <h2 style={{ ...h2, marginBottom: 40 }}>What sets the platform apart.</h2>
          <div className="grid" style={{ gridTemplateColumns: mobile ? "1fr" : desktop ? "repeat(3,1fr)" : "1fr 1fr", gap: "clamp(16px,1.6vw,24px)" }}>
            {HIGHLIGHTS.map(([title, desc]) => (
              <div key={title} className="flex flex-col" style={{ background: PAGE, border: `1px solid ${HAIR}`, borderTop: `2px solid ${CYAN}`, padding: "clamp(20px,2vw,26px)", gap: 10 }}>
                <h3 style={{ margin: 0, font: `600 18px/1.25 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{title}</h3>
                <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENERGY RANGE — penetration bar chart */}
      <section id="range" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE, borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Energy range</div>
          <h2 style={h2}>Choose by What You Need to See Through.</h2>
          <p style={{ margin: "16px 0 40px", maxWidth: 640, font: `400 clamp(15px,1.3vw,17px)/1.6 ${SANS}`, color: BODY }}>Every model is defined by one number that matters more than the rest: how much steel it can penetrate. Bars show each model&apos;s usable window against a 500 mm scale.</p>
          <div ref={barsRef} className="flex flex-col" style={{ background: "#fff", border: `1px solid ${HAIR}` }}>
            {MODELS.map((m, i) => {
              const leftPct = (m.min / SCALE_MAX) * 100;
              const widthPct = ((m.max - m.min) / SCALE_MAX) * 100;
              return (
                <div key={m.name} className="grid items-center" style={{ gridTemplateColumns: mobile ? "1fr" : "150px 1fr 120px", gap: mobile ? 10 : "clamp(16px,2vw,28px)", padding: "clamp(18px,2vw,24px) clamp(18px,2vw,26px)", borderBottom: i < MODELS.length - 1 ? `1px solid ${HAIR}` : "none" }}>
                  <div className="flex flex-col" style={{ gap: 3 }}>
                    <span style={{ font: `600 17px/1.2 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{m.name}</span>
                    <span style={{ font: `400 12px/1.3 ${SANS}`, color: MUTED }}>{m.energy}</span>
                  </div>
                  <div style={{ position: "relative", height: 30, background: "#EAF1F5", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, bottom: 0, left: `${leftPct}%`, width: barsIn ? `${widthPct}%` : 0, background: `linear-gradient(90deg,${CYAN_ON_LIGHT},${CYAN})`, transition: `width 900ms ${EASE}`, transitionDelay: `${i * 90}ms` }}>
                      <span className="flex h-full items-center justify-end" style={{ padding: "0 10px", font: `600 12px/1 ${SANS}`, color: "#08283A", whiteSpace: "nowrap" }}>{m.max} mm</span>
                    </div>
                  </div>
                  <div style={{ font: `400 13px/1.4 ${SANS}`, color: BODY, textAlign: mobile ? "left" : "right" }}>{m.min}–{m.max} mm · {m.dose}</div>
                </div>
              );
            })}
          </div>
          <p style={{ margin: "16px 0 0", font: `400 13px/1.6 ${SANS}`, color: MUTED }}>Thickness figures are nominal. Solid propellants can be inspected up to 2500 mm thickness.</p>
        </div>
      </section>

      {/* SYSTEM CONFIGURATIONS */}
      <section id="systems" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: "#fff", borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>System configurations</div>
          <h2 style={{ ...h2, marginBottom: 12 }}>Four Ways to Build a High Energy Cell.</h2>
          <p style={{ margin: "0 0 40px", maxWidth: 640, font: `400 clamp(15px,1.3vw,17px)/1.6 ${SANS}`, color: BODY }}>The accelerator is one component. What changes between installations is how the beam, the detector and the part are moved relative to each other.</p>
          <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
            {CONFIGS.map((c, i) => {
              const imgFirst = desktop && i % 2 === 0;
              const media = (
                <div style={{ position: "relative", background: "#0A1016", border: `1px solid ${HAIR}`, aspectRatio: "4/3", overflow: "hidden" }}>
                  <Image src={c.image} alt={c.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />
                </div>
              );
              const body = (
                <div className="flex flex-col" style={{ gap: 16 }}>
                  <div className="flex items-baseline" style={{ gap: 12 }}>
                    <span style={{ font: `600 clamp(24px,2.4vw,32px)/1 ${SANS}`, letterSpacing: "-.02em", color: CYAN_ON_LIGHT }}>{c.no}</span>
                    <span style={eyebrow(MUTED)}>{c.sector}</span>
                  </div>
                  <h3 style={{ margin: 0, font: `600 clamp(20px,1.8vw,24px)/1.2 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{c.title}</h3>
                  <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{c.desc}</p>
                  <ul className="m-0 flex list-none flex-col p-0" style={{ borderTop: `1px solid ${HAIR}` }}>
                    {c.specs.map(([k, v]) => (
                      <li key={k} className="grid" style={{ gridTemplateColumns: mobile ? "1fr" : "170px 1fr", gap: mobile ? 2 : 16, padding: "12px 0", borderBottom: `1px solid ${HAIR}` }}>
                        <span style={{ font: `500 13px/1.4 ${SANS}`, color: MUTED }}>{k}</span>
                        <span style={{ font: `400 14px/1.5 ${SANS}`, color: INK, textWrap: "pretty" }}>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
              return (
                <div key={c.no} className="grid items-start" style={{ gridTemplateColumns: desktop ? "1fr 1fr" : "1fr", gap: "clamp(24px,3vw,48px)", padding: "clamp(32px,4vw,48px) 0", borderBottom: `1px solid ${HAIR}` }}>
                  {imgFirst ? (<>{media}{body}</>) : compact ? (<>{media}{body}</>) : (<>{body}{media}</>)}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section id="applications" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE, borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto flex flex-col" style={{ maxWidth: 1330, gap: "clamp(28px,3vw,44px)" }}>
          <div>
            <div style={eyebrow(CYAN_ON_LIGHT)}>Applications</div>
            <h2 style={h2}>What Gets Inspected at These Energies.</h2>
            <p style={{ margin: "16px 0 0", maxWidth: 640, font: `400 clamp(15px,1.3vw,17px)/1.6 ${SANS}`, color: BODY }}>Parts that are too thick, too dense, or too critical to be released on a sample check.</p>
          </div>
          <div className="flex flex-wrap" style={{ gap: 10 }}>
            {APP_TAGS.map((t) => (
              <span key={t} style={{ padding: "9px 16px", background: "#fff", border: `1px solid ${HAIR}`, font: `500 13px/1.2 ${SANS}`, color: INK }}>{t}</span>
            ))}
          </div>
          <div className="grid" style={{ gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: "clamp(16px,1.6vw,24px)" }}>
            {APP_CALLOUTS.map(([tag, title, desc]) => (
              <div key={title} className="flex flex-col" style={{ background: "#fff", border: `1px solid ${HAIR}`, padding: "clamp(20px,2vw,26px)", gap: 10 }}>
                <div style={eyebrow(CYAN_ON_LIGHT)}>{tag}</div>
                <h3 style={{ margin: 0, font: `600 18px/1.25 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{title}</h3>
                <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL DATA */}
      <section id="specs" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: "#fff", borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Technical data</div>
          <h2 style={{ ...h2, marginBottom: 44 }}>Specifications.</h2>
          <div className="flex flex-col" style={{ gap: 44 }}>
            {SPEC_TABLES.map((t, ti) => {
              const open = compact ? openSpec === ti : true;
              return (
                <div key={t.title}>
                  {!compact && <h3 style={{ margin: "0 0 18px", font: `600 20px/1.25 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{t.title}</h3>}
                  {compact && (
                    <button type="button" onClick={() => setOpenSpec(openSpec === ti ? -1 : ti)} aria-expanded={open} className="flex w-full items-center justify-between hover:!bg-[#EAF6FB]" style={{ gap: 16, padding: "16px 18px", cursor: "pointer", background: "#fff", border: `1px solid ${HAIR}`, textAlign: "left", font: `600 16px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>
                      <span>{t.title}</span>
                      <span className="flex flex-none items-center justify-center" style={{ width: 26, height: 26, background: open ? CYAN : "#EAF1F5", color: INK, font: `600 14px/1 ${SANS}` }}>{open ? "–" : "+"}</span>
                    </button>
                  )}
                  {open && (
                    <div className="overflow-x-auto" style={{ border: `1px solid ${HAIR}` }}>
                      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560 }}>
                        <thead><tr><th style={th}>Parameter</th><th style={th}>Value</th></tr></thead>
                        <tbody>
                          {t.rows.map(([k, v], i) => (
                            <tr key={k} style={{ background: i % 2 ? "#F7FAFC" : "#fff" }}>
                              <td style={{ padding: "14px 20px", borderBottom: `1px solid ${HAIR}`, font: `500 15px/1.5 ${SANS}`, color: INK }}>{k}</td>
                              <td style={{ padding: "14px 20px", borderBottom: `1px solid ${HAIR}`, font: `400 15px/1.5 ${SANS}`, color: BODY }}>{v}</td>
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
          <p style={{ margin: "28px 0 0", maxWidth: 760, font: `400 13px/1.6 ${SANS}`, color: MUTED }}>All Linatron models from Varex Imaging Corporation are designed and manufactured in accordance with EMC Directive 89/336/EEC and Low Voltage Directive 73/23/EEC.</p>
        </div>
      </section>

      {/* INSTALLED BASE */}
      <section id="clients" style={{ padding: "clamp(56px,7vw,104px) clamp(24px,4vw,55px)", background: PAGE, color: INK, borderTop: `1px solid ${HAIR}` }}>
        <div className="mx-auto" style={{ maxWidth: 1330 }}>
          <div style={eyebrow(CYAN_ON_LIGHT)}>Installed base</div>
          <h2 style={h2}>Trusted Where Failure Is Not an Option.</h2>
          <p style={{ margin: "16px 0 40px", maxWidth: 640, font: `400 clamp(15px,1.3vw,17px)/1.6 ${SANS}`, color: BODY }}>High-energy systems delivered to India&apos;s aerospace, defence, nuclear and heavy-engineering programmes.</p>
          <div className="grid" style={{ gridTemplateColumns: mobile ? "1fr 1fr" : desktop ? "repeat(4,1fr)" : "repeat(3,1fr)", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center text-center"
                style={{ background: "#fff", minHeight: mobile ? 104 : 126, padding: mobile ? "18px 14px" : "22px 24px" }}
              >
                {client.src && client.width && client.height ? (
                  <Image
                    src={client.src}
                    alt={`${client.name} logo`}
                    width={client.width}
                    height={client.height}
                    style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: mobile ? 58 : 72, objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ font: `700 24px/1 ${SANS}`, letterSpacing: ".08em", color: NAVY }}>{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The closing CTA band is removed at the client's request, matching what
          was done on the MQCT and MQX.tracE pages. ContactSection follows this
          page and is the enquiry form itself, so the band sat directly above the
          form it pointed at. Copy retained so it stays traceable:
            "Tell Us What You Need to See Inside. / Share the part, the material
             and the section thickness. Our engineers will size the accelerator,
             the manipulator and the enclosure around it, and tell you honestly
             if a lower-energy system would do the job." plus Request a
            Consultation and +91 40 2381 1122. The number is still in the footer
            and on /contact. */}
    </main>
  );
}
