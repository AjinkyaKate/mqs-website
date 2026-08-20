"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   MQCT Series product page — /products/mqct-series/
   Built from the client's "MQCT SERIES — Webpage Build Reference" brief,
   following the product-page pattern established by MqxcSeries.tsx and
   HighEnergy.tsx: full-bleed dark hero, sticky section sub-nav, data-driven
   sections, spec tables that become accordions below 1024. Site header,
   footer and ContactSection are supplied by the route wrapper.

   ONE DELIBERATE DEPARTURE. The brief asks for red / amber / green status
   dots in the 2D-versus-CT matrix. The MQS design system has no semantic
   red, amber or green and states that a status colour must not be invented,
   so the three states are encoded by fill level in the existing palette
   instead: a solid cyan dot for a direct answer, a half-filled dot for an
   inferred one, an empty ring for not available. Same three-way reading, no
   new hues, and it suits a B2B comparison better than traffic lights.

   PENDING MQS SIGN-OFF, all raised by the brief itself:
   · NAMING. The hero system is labelled "MQCT 225AB" while the line-up uses
     MQCT-M / X / H / D. A buyer cannot tell whether those are the same
     product. Management decision, not a copy fix.
   · MQCT-H overlaps the MQHCT series on the High Energy X-Ray page. Both are
     LINAC-based high-energy CT. Decide which page owns it and cross-link.
   · Energy range disagrees between pages: 0.95 to 15 MeV here, 0.9 to 15 MeV
     on the High Energy page.
   · Volume Graphics licensing: included, sold separately, or customer
     supplied? Four modules are named, which implies a cost to clarify.
   · BATTERY DATA. The cylindrical cell and anode overhang scans are
     commercially sensitive and a cell manufacturer would recognise its own
     product. The "VG Partner Demo License" banner has now been cropped from
     both, but the brief is explicit that removing the banner does not address
     the confidentiality question. Still needs written confirmation before
     go-live; the section is self-contained and can be removed by deleting
     RESULTS below.
   · Confirm the hero's reference to rocket motors can be stated publicly.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const CYAN = "#16C1F3", CYAN_ON_LIGHT = "#0A6A88";
const HAIR = "#D3DFE7";
const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const SANS = "var(--font-sans)";

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Why CT", "#why-ct"], ["Benefits", "#benefits"],
  ["Highlights", "#highlights"], ["Models", "#models"], ["Metrology", "#metrology"],
  ["Specs", "#specs"],
];

const STATS: [string, string][] = [
  ["300 kV", "Microfocus"],
  ["450 kV", "Minifocus"],
  ["15 MeV", "LINAC high energy"],
  ["427 mm", "Max detector size"],
];

/* answer: 2 = measured directly, 1 = inferred or estimated, 0 = not available */
const MATRIX: [string, string, 0 | 1 | 2, string, 0 | 1 | 2][] = [
  ["Is there a defect?", "Yes", 2, "Yes", 2],
  ["Where is it, in three dimensions?", "Inferred from angles", 1, "Measured directly", 2],
  ["How large is it, by volume?", "Estimated", 1, "Quantified in mm³", 2],
  ["Does it fail the porosity spec?", "Operator judgement", 1, "Classified automatically", 2],
  ["What is the wall thickness here?", "Not available", 0, "Mapped across the part", 2],
  ["Does it match the CAD model?", "Not available", 0, "Full deviation comparison", 2],
  ["Can I measure internal features?", "Not reliably", 0, "Metrology on internal geometry", 2],
];

const BENEFITS: [string, string, string][] = [
  ["01", "High-resolution 2D and 3D visibility", "Inspect internal and external structure as a full 3D volume, with no re-shooting the part at another angle to confirm what you saw."],
  ["02", "Flexible energy configurations", "Microfocus to 300 kV, minifocus to 450 kV, LINAC from 0.95 to 15 MeV, including dual and multi-tube builds."],
  ["03", "Built for production and R&D", "Cabinet-based CT designed for repeatable cycle times, without giving up the flexibility R&D needs."],
  ["04", "Metrology and inspection together", "Run dimensional measurement alongside defect analysis on the same scan. One setup answers the quality question and the process question."],
  ["05", "Powerful analysis ecosystem", "MQS Imaging Suite for acquisition and control, Volume Graphics for reconstruction, visualisation and analysis."],
  ["06", "Safe by design", "AERB-compliant cabinet with leakage below 1 µSv, motorized doors, light curtains and CCTV recording of every inspection."],
];

const HIGHLIGHTS: [string, string, string, string][] = [
  ["A", "Source", "Configurable X-ray sources", "Micro, mini focus or LINAC. Select penetration and resolution for your component rather than compromising on one fixed source."],
  ["B", "Detector", "Flat panel and optional line detectors", "Real-time imaging to 30 fps at 16-bit contrast, with scalable line detectors up to 4.1 m for high-energy work."],
  ["C", "Motion", "High-precision manipulators", "Multi-axis control for accurate, repeatable CT acquisition, with presets that make a recurring scan a recall rather than a re-setup."],
  ["D", "Safety", "Shielded X-ray cabinet", "Steel, lead and steel construction with leakage below 1 µSv, motorized sliding doors, light curtains, door limit switches and CCTV monitoring."],
  ["E", "Software", "MQS Imaging Suite", "2D acquisition modes, automated CT projection capture for 3D reconstruction, plus macros and processing tools for repeatable inspection."],
];

type Model = { id: string; name: string; source: string; energy: string; best: string; title: string; desc: string; img?: string; alt?: string };
const MODELS: Model[] = [
  {
    id: "MQCT-M", name: "Microfocus", source: "Microfocus to 300 kV", energy: "Up to 300 kV",
    best: "PCBs, connectors, small castings", title: "High detail on small parts",
    desc: "Short source-to-object distance gives the geometric magnification needed to resolve features measured in tens of microns.",
    img: "/assets/prod-mqct-microfocus.jpg", alt: "Microfocus computed tomography system with open frame, rotary stage and large-area flat panel detector",
  },
  {
    id: "MQCT-X", name: "Minifocus", source: "Minifocus to 450 kV", energy: "Up to 450 kV",
    best: "Automotive castings, welds, composites", title: "The mixed-portfolio workhorse",
    desc: "Balanced penetration and resolution for industrial QA and production R&D, where one system has to cover many part types.",
    img: "/assets/prod-mqct-pcb.jpg", alt: "CT scan of a populated printed circuit board showing internal traces, vias and solder joints",
  },
  {
    id: "MQCT-H", name: "LINAC", source: "LINAC 0.95 to 15 MeV", energy: "0.95 – 15 MeV",
    best: "Large castings, thick steel, rocket hardware", title: "Deep penetration CT",
    desc: "For parts where a 450 kV source will not pass through the section: heavy engineering, defence and aerospace.",
    img: "/assets/prod-mqct-linac.jpg", alt: "LINAC-based high energy CT system with travelling source and detector towers on rail-mounted stages",
  },
  {
    id: "MQCT-D", name: "Dual detector", source: "Configurable, dual or multi-tube", energy: "Configurable",
    best: "Larger components, production lines", title: "Speed and coverage",
    desc: "Flat panel combined with line detector arrays for optimised scanning and large-field imaging, when throughput is the constraint.",
    /* The brief asks for text-only cards where no publishable scan exists,
       rather than substituting a result from a different energy. */
  },
];

/* Dimensions travel with each image because the analysis renders carry their
   measurement legend at the frame edge. A fixed-aspect cover box was cutting
   21.8% of the wall thickness map's width, which removed the entire
   "Wall thickness [mm] 2.72 to 13.59" key, and 15.5% of the indication map's,
   which removed its "Volume [mm³]" key. The caption promised a thickness map
   and the page showed a green part with no key to what green meant. */
type Analysis = { title: string; copy: string; src: string; w: number; h: number; alt: string };
const METROLOGY: Analysis[] = [
  { title: "Wall thickness mapping", copy: "Thickness colour-mapped across the whole part, flagging thin sections before they become leak paths.", src: "/assets/prod-mqct-wallthickness.jpg", w: 1363, h: 666, alt: "CT wall thickness analysis of an aluminium casting showing colour-mapped thickness distribution with a 2.72 to 13.59 mm scale" },
  { title: "Porosity analysis", copy: "Every pore segmented, sized and located in 3D, then classified by sphericity and volume against your specification.", src: "/assets/prod-mqct-porosity.jpg", w: 1363, h: 818, alt: "CT porosity analysis of an aluminium casting with pores colour-coded by volume" },
  { title: "Indication detection", copy: "Automatic flagging of internal defects with position, volume, probability and diameter, across the full volume.", src: "/assets/prod-mqct-indications.jpg", w: 1600, h: 845, alt: "CT defect volume analysis of a cast structural bracket with indications colour-coded by volume in cubic millimetres" },
];

/* Self-contained: delete this array and the Results section to pull the
   battery datasets pending MQS confirmation. */
const RESULTS: Analysis[] = [
  { title: "Cylindrical cell", copy: "Every winding layer resolved, so spacing, centring and deformation can be checked without opening the cell.", src: "/assets/prod-mqct-cell.jpg", w: 1600, h: 854, alt: "CT cross-section of a cylindrical lithium-ion battery cell showing internal winding layers" },
  { title: "Electrode overhang", copy: "Anode overhang measured layer by layer and colour-mapped in millimetres, a safety-critical check in cell manufacturing.", src: "/assets/prod-mqct-overhang.jpg", w: 1001, h: 547, alt: "CT measurement of anode overhang and electrode alignment in a prismatic battery cell, colour-mapped in millimetres" },
];

type SpecTable = { title: string; colA: string; colB: string; rows: [string, string][]; note?: string };
const SPEC_TABLES: SpecTable[] = [
  { title: "Energy options", colA: "Source type", colB: "Capability", rows: [
    ["Microfocus tubes", "Up to 300 kV"], ["Minifocus tubes", "Up to 450 kV"],
    ["Linear accelerators (LINAC)", "0.95 MeV – 15 MeV"], ["Dual / multi tube", "Configurable"],
  ]},
  { title: "Detector options", colA: "Parameter", colB: "Value", rows: [
    ["Detector size", "Up to 427 × 427 mm (model dependent)"], ["Pixel size", "100 – 200 µm (detector pixel pitch)"],
    ["Contrast / ADC", "16-bit"], ["Real-time imaging", "Up to 30 fps"],
    ["Optional", "Dual detectors, flat panel plus line detectors"],
  ], note: "Pixel size refers to detector pixel pitch, not achievable feature resolution." },
  { title: "Cabinet and safety", colA: "Parameter", colB: "Value", rows: [
    ["Construction", "Steel / lead / steel"], ["Leakage", "Below 1 µSv"],
    ["Access", "Motorized sliding doors"], ["Interlocks", "Light curtains and door limit switches"],
    ["Monitoring", "CCTV recording of inspection"],
  ]},
  { title: "Analysis modules available", colA: "Category", colB: "Module", rows: [
    ["Metrology", "Coordinate measurement, nominal-actual comparison"], ["Structure", "Wall thickness analysis"],
    ["Defects", "Porosity and inclusion analysis"], ["Composites", "Fibre material analysis"],
    ["Export", "Volume meshing, CAD import for PMI"],
  ]},
];

const APPLICATIONS = [
  "Aluminium, steel and composite components", "Additive manufacturing parts", "Aerospace components",
  "Li-ion battery inspection", "Injection moulded components", "Weld sections",
  "Electronics and PCBs", "Industrial and scientific research",
];

/* ── shared bits ── */

const eyebrow = (color: string) => ({ margin: 0, font: `500 12px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
const label = (color: string) => ({ margin: 0, font: `500 11px/1.3 ${SANS}`, letterSpacing: ".08em", textTransform: "uppercase" as const, color });
const h2 = (color: string) => ({ margin: 0, font: `600 clamp(26px,3.2vw,42px)/1.08 ${SANS}`, letterSpacing: "-.025em", color, textWrap: "pretty" as const });
const h3 = (color: string) => ({ margin: 0, font: `600 clamp(19px,1.9vw,24px)/1.2 ${SANS}`, letterSpacing: "-.018em", color, textWrap: "pretty" as const });
const body = (color: string) => ({ margin: 0, font: `400 16px/1.6 ${SANS}`, color, textWrap: "pretty" as const });
const lead = (color: string) => ({ margin: 0, font: `400 clamp(16px,1.5vw,19px)/1.6 ${SANS}`, color, textWrap: "pretty" as const });

const btnPrimary = {
  display: "inline-flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
  height: 48, padding: "0 26px", background: CYAN, color: INK, textDecoration: "none" as const,
  font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase" as const,
  transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
};
const btnGhostDark = {
  display: "inline-flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
  height: 48, padding: "0 26px", background: "transparent", border: "1px solid rgba(255,255,255,.42)",
  color: "#fff", textDecoration: "none" as const, font: `500 13px/1 ${SANS}`,
  letterSpacing: ".045em", textTransform: "uppercase" as const,
};

const SHELL = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

/* The justified rows use the house 1px hairline rather than the 10px dark gap
   the tracE gallery wants, on both axes so the stacked view keeps the grid. */
const JROW_HAIRLINE = { "--jrow-gap": "1px", "--jrow-row-gap": "1px" } as CSSProperties;

/* Three-state dot in the existing palette: solid, half, ring. */
function Dot({ state }: { state: 0 | 1 | 2 }) {
  const common = { width: 10, height: 10, borderRadius: 999, flex: "0 0 auto" as const, display: "block" as const };
  if (state === 2) return <span aria-hidden style={{ ...common, background: CYAN_ON_LIGHT }} />;
  if (state === 1) return <span aria-hidden style={{ ...common, background: `linear-gradient(90deg,${CYAN_ON_LIGHT} 50%, transparent 50%)`, boxShadow: `inset 0 0 0 1px ${CYAN_ON_LIGHT}` }} />;
  return <span aria-hidden style={{ ...common, background: "transparent", boxShadow: `inset 0 0 0 1px ${HAIR}` }} />;
}
const STATE_TEXT = ["not available", "partial", "direct"] as const;

function Section({ id, tone = "page", children, className }: { id?: string; tone?: "page" | "white" | "inset" | "navy"; children: React.ReactNode; className?: string }) {
  const bg = { page: PAGE, white: WHITE, inset: INSET, navy: INK }[tone];
  return (
    <section id={id} style={{ background: bg }} className="scroll-mt-[76px]">
      <div className={`${SHELL} py-14 md:py-20 lg:py-24 ${className ?? ""}`}>{children}</div>
    </section>
  );
}

export default function MqctSeries() {
  const [w, setW] = useState(1440);
  const [open, setOpen] = useState<string | null>(SPEC_TABLES[0].title);
  useEffect(() => {
    const read = () => setW(window.innerWidth);
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);
  const mobile = w < 768;
  const tablet = w >= 768 && w < 1024;
  const accordion = w < 1024;

  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <Image
          src="/assets/prod-mqct-hero.jpg"
          alt="MQCT microfocus computed tomography system with open frame, rotary stage and flat panel detector"
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(1)" }}
        />
        <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.94) 0%,rgba(11,42,58,.78) 46%,rgba(11,42,58,.34) 100%)" }} />
        <div
          className={`relative flex flex-col justify-end ${SHELL}`}
          style={{ zIndex: 3, minHeight: mobile ? 520 : tablet ? 560 : 640, gap: 18, paddingTop: 120, paddingBottom: mobile ? 48 : 72 }}
        >
          <p style={{ ...eyebrow(CYAN), maxWidth: 760 }}>MQCT Series · Computed tomography solutions</p>
          <h1 className="max-w-[760px]" style={{ margin: 0, font: `600 clamp(30px,4.2vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
            See inside in 3D. Measure with <span style={{ color: CYAN }}>confidence</span>.
          </h1>
          <p className="max-w-[600px]" style={lead("rgba(255,255,255,.80)")}>
            Fully customized CT systems that uncover defects in places a 2D image cannot reach, from PCBs and battery cells
            to thick steel castings, with defect analysis that feeds back into defect-free production.
          </p>
          <div className="flex flex-wrap" style={{ gap: 12, marginTop: 8 }}>
            <a href="#contact" style={btnPrimary} className="hover:!bg-white">Request a demo</a>
            <a href="#specs" style={btnGhostDark} className="hover:!bg-white/10">See specifications</a>
          </div>
        </div>
      </section>

      {/* ── sticky section nav ── */}
      <div className="sticky top-0 z-40" style={{ background: WHITE, borderBottom: `1px solid ${HAIR}` }}>
        <div className={`${SHELL} flex gap-6 overflow-x-auto`} style={{ scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(([text, href]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 whitespace-nowrap no-underline transition-colors duration-200 hover:!text-[#0B2A3A]"
              style={{ ...label(MUTED), display: "flex", alignItems: "center", height: 52 }}
            >
              {text}
            </a>
          ))}
        </div>
      </div>

      {/* ── stats strip ── */}
      <section style={{ background: WHITE, borderBottom: `1px solid ${HAIR}` }}>
        <div className={`${SHELL} grid grid-cols-2 lg:grid-cols-4`} style={{ gap: 1, background: HAIR }}>
          {STATS.map(([fig, lab]) => (
            <div key={lab} className="py-7" style={{ background: WHITE, paddingLeft: 0 }}>
              <div style={{ font: `600 clamp(24px,2.6vw,34px)/1 ${SANS}`, letterSpacing: "-.03em", color: INK }}>{fig}</div>
              <div className="mt-2" style={label(MUTED)}>{lab}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── why CT: the answer matrix ── */}
      <Section id="why-ct" tone="page">
        <p style={eyebrow(CYAN_ON_LIGHT)}>Why CT</p>
        <h2 className="mt-4" style={h2(INK)}>Same part. Seven questions. Two very different answers.</h2>
        <p className="mt-4 max-w-[62ch]" style={lead(BODY)}>
          If you already run digital radiography, this is the comparison that matters. Both technologies find defects. Only
          one measures them.
        </p>

        <div className="mt-10" style={{ borderTop: `1px solid ${INK}` }}>
          <div className="hidden md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,4fr)] md:gap-6 md:py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <span style={label(INK)}>What you need to know</span>
            <span style={label(INK)}>2D radiography</span>
            <span style={label(CYAN_ON_LIGHT)}>Computed tomography</span>
          </div>
          {MATRIX.map(([q, a2d, s2d, act, sct]) => (
            <div key={q} className="grid grid-cols-1 gap-1.5 py-4 md:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,4fr)] md:items-center md:gap-6" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <span style={{ font: `500 16px/1.4 ${SANS}`, color: INK, textWrap: "pretty" }}>{q}</span>
              <span className="flex items-center gap-2.5">
                <Dot state={s2d} />
                <span style={body(MUTED)}>{a2d}</span>
                <span className="sr-only">({STATE_TEXT[s2d]})</span>
              </span>
              <span className="flex items-center gap-2.5">
                <Dot state={sct} />
                <span style={{ ...body(INK), fontWeight: 500 }}>{act}</span>
                <span className="sr-only">({STATE_TEXT[sct]})</span>
              </span>
            </div>
          ))}
        </div>

        <blockquote className="mt-9 p-6 md:p-8" style={{ margin: 0, background: INSET, borderLeft: `2px solid ${CYAN}` }}>
          <p style={{ ...lead(INK), fontWeight: 500 }}>
            2D tells you to scrap the part. CT tells you why the process produced it, which is what stops the next one.
          </p>
        </blockquote>
      </Section>

      {/* ── benefits ── */}
      <Section id="benefits" tone="white">
        <h2 style={h2(INK)}>Why choose the MQCT Series.</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, background: HAIR }}>
          {BENEFITS.map(([n, t, d]) => (
            <div key={n} className="p-6 lg:p-7" style={{ background: WHITE }}>
              <div style={{ font: `600 13px/1 ${SANS}`, letterSpacing: ".08em", color: CYAN_ON_LIGHT }}>{n}</div>
              <h3 className="mt-4" style={h3(INK)}>{t}</h3>
              <p className="mt-3" style={body(BODY)}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── product highlights ── */}
      <Section id="highlights" tone="page">
        <h2 style={h2(INK)}>What makes up an MQCT system.</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <div className="relative aspect-[805/502]" style={{ background: INSET }}>
            <Image
              src="/assets/home-solutions-ct-cabinet.jpg"
              alt="MQCT industrial CT cabinet with motorized doors open, showing the internal tube, detector and object manipulators"
              fill
              quality={90}
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div style={{ borderTop: `1px solid ${HAIR}` }}>
            {HIGHLIGHTS.map(([k, area, t, d]) => (
              <div key={k} className="grid grid-cols-[28px_1fr] gap-4 py-5" style={{ borderBottom: `1px solid ${HAIR}` }}>
                <span style={{ font: `600 15px/1.2 ${SANS}`, color: CYAN_ON_LIGHT }}>{k}</span>
                <div>
                  <div style={label(MUTED)}>{area}</div>
                  <h3 className="mt-2" style={{ ...h3(INK), fontSize: 18 }}>{t}</h3>
                  <p className="mt-2" style={{ ...body(BODY), fontSize: 15 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* The brief lists callout markers A–E overlaid on this photograph as
            still to be produced; until then the letters key the list only. */}
      </Section>

      {/* ── model line-up ── */}
      <Section id="models" tone="white">
        <h2 style={h2(INK)}>A model for every inspection need.</h2>
        <p className="mt-4 max-w-[62ch]" style={lead(BODY)}>
          Choose by the density and size of what you inspect. Every model shares the same imaging suite, safety architecture
          and analysis workflow.
        </p>

        <div className="mt-10" style={{ borderTop: `1px solid ${INK}` }}>
          <div className="hidden md:grid md:grid-cols-4 md:gap-6 md:py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <span style={label(INK)}>Model</span><span style={label(INK)}>Source</span>
            <span style={label(INK)}>Energy</span><span style={label(INK)}>Best for</span>
          </div>
          {MODELS.map((m) => (
            <div key={m.id} className="grid grid-cols-1 gap-1 py-4 md:grid-cols-4 md:items-center md:gap-6" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <span style={{ font: `600 16px/1.3 ${SANS}`, color: INK }}>{m.id}</span>
              <span style={body(MUTED)}>{m.name}</span>
              <span style={body(MUTED)}>{m.energy}</span>
              <span style={body(MUTED)}>{m.best}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-10 lg:gap-14">
          {MODELS.map((m, i) => (
            <div key={m.id} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                {m.img ? (
                  <div className="relative aspect-[16/9]" style={{ background: INSET }}>
                    <Image src={m.img} alt={m.alt ?? ""} fill quality={90} sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center p-6 text-center" style={{ background: INSET }}>
                    <p style={{ ...label(MUTED), maxWidth: "34ch" }}>
                      Sample result for this configuration not yet available for publication
                    </p>
                  </div>
                )}
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div style={label(CYAN_ON_LIGHT)}>{m.id} · {m.name}</div>
                <h3 className="mt-3" style={h3(INK)}>{m.title}</h3>
                <p className="mt-3 max-w-[52ch]" style={body(BODY)}>{m.desc}</p>
                <dl className="mt-5" style={{ borderTop: `1px solid ${HAIR}` }}>
                  <div className="flex justify-between gap-4 py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
                    <dt style={label(MUTED)}>Source</dt><dd style={{ ...body(INK), margin: 0, fontSize: 15 }}>{m.source}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
                    <dt style={label(MUTED)}>Best for</dt><dd style={{ ...body(INK), margin: 0, fontSize: 15 }}>{m.best}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── reconstruction and metrology ── */}
      <Section id="metrology" tone="page">
        <p style={eyebrow(CYAN_ON_LIGHT)}>Reconstruction and metrology</p>
        <h2 className="mt-4" style={h2(INK)}>From scan to actionable defect data.</h2>
        <p className="mt-4 max-w-[70ch]" style={lead(BODY)}>
          MQCT systems pair with the MQS Imaging Suite and the Volume Graphics toolchain to run structural, porosity and
          metrology analyses directly on CT data, with automatic indication reporting for every defect found.
        </p>
        <div className="mqs-jrow mt-10" style={{ background: HAIR, ...JROW_HAIRLINE }}>
          {METROLOGY.map((m) => (
            <figure key={m.title} className="m-0 flex flex-col" style={{ background: WHITE, flex: `${(m.w / m.h).toFixed(4)} 1 0px` }}>
              <div className="relative" style={{ aspectRatio: `${m.w} / ${m.h}`, background: "#000" }}>
                <Image src={m.src} alt={m.alt} fill quality={90} sizes="(min-width:1330px) 460px, (min-width:700px) 40vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="p-5">
                <h3 style={{ ...h3(INK), fontSize: 18 }}>{m.title}</h3>
                <p className="mt-2" style={{ ...body(BODY), fontSize: 15 }}>{m.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ── real-world results ── */}
      <Section id="gallery" tone="white">
        <h2 style={h2(INK)}>Imaging software in action.</h2>
        <p className="mt-4 max-w-[62ch]" style={lead(BODY)}>
          A sample of components inspected with the MQS Imaging Suite, spanning automotive, electronics and energy
          applications.
        </p>
        <div className="mqs-jrow mt-10" style={{ background: HAIR, ...JROW_HAIRLINE }}>
          {RESULTS.map((r) => (
            <figure key={r.title} className="m-0 flex flex-col" style={{ background: WHITE, flex: `${(r.w / r.h).toFixed(4)} 1 0px` }}>
              <div className="relative" style={{ aspectRatio: `${r.w} / ${r.h}`, background: "#000" }}>
                <Image src={r.src} alt={r.alt} fill quality={90} sizes="(min-width:1330px) 620px, (min-width:700px) 50vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="p-5 md:p-6">
                <h3 style={{ ...h3(INK), fontSize: 19 }}>{r.title}</h3>
                <p className="mt-2" style={{ ...body(BODY), fontSize: 15 }}>{r.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ── technical data ── */}
      <Section id="specs" tone="page">
        <h2 style={h2(INK)}>Specifications.</h2>
        <div className="mt-10 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
          {SPEC_TABLES.map((t) => {
            const isOpen = !accordion || open === t.title;
            return (
              <div key={t.title} style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
                {accordion ? (
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : t.title)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 border-0 bg-transparent p-5 text-left"
                    style={{ cursor: "pointer", minHeight: 56 }}
                  >
                    <span style={{ ...h3(INK), fontSize: 17 }}>{t.title}</span>
                    <span aria-hidden style={{ color: CYAN_ON_LIGHT, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"><path d="M5 9l7 7 7-7" /></svg>
                    </span>
                  </button>
                ) : (
                  <div className="p-5 pb-0"><h3 style={{ ...h3(INK), fontSize: 17 }}>{t.title}</h3></div>
                )}
                {isOpen && (
                  <div className="px-5 pb-5">
                    <dl className="m-0" style={{ borderTop: `1px solid ${HAIR}` }}>
                      {t.rows.map(([k, v]) => (
                        <div key={k} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:gap-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
                          <dt style={label(MUTED)}>{k}</dt>
                          <dd className="m-0" style={{ ...body(INK), fontSize: 15 }}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                    {t.note && <p className="mt-3" style={{ ...body(MUTED), fontSize: 13 }}>{t.note}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── applications ── */}
      <Section id="applications" tone="white">
        <h2 style={h2(INK)}>Where MQCT delivers value.</h2>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {APPLICATIONS.map((a) => (
            <span key={a} className="px-3.5 py-2.5" style={{ background: INSET, font: `500 14px/1.2 ${SANS}`, color: INK }}>{a}</span>
          ))}
        </div>
      </Section>

      {/* ── services cross-link ── */}
      <Section tone="inset">
        <div className="grid grid-cols-1 items-end gap-7 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h2 style={h2(INK)}>Send us the part instead.</h2>
            <p className="mt-4 max-w-[58ch]" style={lead(BODY)}>
              If you need CT results before you need a CT system, MQS runs scanning as a service: defect analysis, metrology,
              CAD comparison and reverse engineering on your components, delivered as measured reports. It is also how most
              CT purchases begin, by scanning the parts that are failing and sizing the system against real data.
            </p>
          </div>
          <div>
            <a href="/services#inspection-services" style={{ ...btnPrimary, background: INK, color: "#fff" }} className="hover:!bg-[#12496A]">
              Explore CT inspection services
            </a>
          </div>
        </div>
      </Section>

      {/* The closing CTA band is removed at the client's request. ContactSection
          follows immediately and is the enquiry form itself, with a real server
          action behind it, so the band sat directly above the form it pointed
          at. Same reasoning already applied to /services and three other pages.
          Copy retained here so it stays traceable:
            "Next step / Want to see MQCT run on your components? / Tell us the
             component, the material and the throughput you need. Our
             application engineers will recommend a configuration, and will scan
             a sample first where that helps." plus Request a demo and
            +91 40 2381 1122. The number is still in the footer and on /contact. */}
    </main>
  );
}
