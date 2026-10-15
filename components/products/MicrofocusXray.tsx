"use client";

import { useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, MUTED, CYAN, CYAN_ON_LIGHT, CYAN_ON_DARK, HAIR, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, h3, body, lead,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid, HotspotFigure, TagList, IndustryCards,
  DownloadsAndRelated,
  type Hotspot,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   Microfocus X-Ray Systems — /products/microfocus-xray/
   Copy is the client's "Microfocus X-Ray system.docx" brief; where the brief
   is silent (technical data, applications) it is the MQMF brochure
   (Microfocus X-Ray System-2023-1112, served as /brochures/microfocus-xray.pdf).
   No explanatory copy has been added. Page pattern via solution-kit.tsx.

   The brief supplies no spec table and points at the Zeiss Bosello OMNIA
   page for reference. That page's technical data is a configurator, and so
   is this one: the brochure's nine tube product lines sit behind a
   tube-type → product-line → kV selector, so a visitor reads one column of
   real numbers instead of nine stacked tables. Every value is the
   brochure's; nothing is interpolated.

   PENDING MQS SIGN-OFF:
   · NAMING. The brief says "Microfocus X-Ray Systems", the brochure cover
     "MQMF", and the render's side panel "MQXM". The page leads with the
     brief's name and shows MQMF only as the brochure's series name.
   · RESOLUTION. Brief and brochure cover both say "down to 0.5 µm", but the
     best JIMA figure in any brochure table is 0.9 µm (XC, transmission head).
     The 0.5 µm headline is kept as supplied; confirm which tube achieves it.
   · ROD ANODE LENGTH. The bullet says "up to 1.5 m"; the longest tabled rod
     is 1000 mm (RAC). The bullet is quoted, the table is shown as printed.
   · RAC SUPERFOCUS rod diameter prints as "10-Mar" in the brochure, a
     spreadsheet auto-format of what was probably "3–10". Shown as
     "See brochure" until MQS confirms.
   · Two transmission tables are both headed "THE". They differ by target
     (High Brightness vs High Energy) and are named that way here.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"], ["Technical Data", "#specs"],
  ["Inspection Modes", "#modes"], ["Applications", "#applications"], ["Downloads", "#downloads"],
];

const BADGES = ["JIMA resolution up to 0.5 µm", "160 kV – 300 kV", "CT · DR · Panoramic"];

const STATS: [string, string][] = [
  ["0.5 µm", "JIMA resolution capability"],
  ["160 – 300 kV", "Nominal tube voltage"],
  ["4", "Tube types"],
  ["Up to 20 years", "System lifetime"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "Ultra-High Resolution Imaging", "Detect micro-cracks, porosities, inclusions, and bonding issues—down to 0.5 μm capability for precision-critical components."],
  ["02", "One Platform for Mixed Materials", "Wide operating range (160–300 kV) supports inspection from thin PCBs to dense aerospace alloys without switching platforms."],
  ["03", "Faster Scans, Higher Throughput", "High-power tube options and efficient cooling reduce scan time while preserving image quality—ideal for production and QC labs."],
  ["04", "Flexible Inspection Modes", "Support CT, DR, and panoramic imaging to handle different part geometries and failure modes without additional machines."],
  ["05", "Future-Ready Analytics", "Designed for integration with advanced analysis tools (e.g., VGStudio MAX, CT reconstruction, and AI-ready defect workflows) for smarter decisions."],
];

const HIGHLIGHTS: Hotspot[] = [
  { id: "1", title: "Modular, Serviceable Architecture", desc: "Long equipment life and easier maintenance - supports upgrades and evolving inspection needs.", at: [11.5, 54] },
  { id: "2", title: "Precision Manipulator / Motion Control", desc: "Accurate positioning improves repeatability, reduces re-scans, and supports multi-angle and CT acquisition.", at: [58, 66] },
  { id: "3", title: "Imaging & Analysis Software", desc: "Faster inspection cycles, structured reporting, and smoother transition from 2D checks to 3D CT." },
  { id: "4", title: "High-Resolution Digital Detector", desc: "Clear, low-noise imaging enables reliable detection of micro-defects and improves decision confidence.", at: [71.5, 44] },
  { id: "5", title: "Microfocus X-ray Tube (Configurable Types)", desc: "Choose the right physics for the job by optimizing for resolution, power, or part geometry.", at: [30, 36] },
];

/* ── tube data, from the MQMF brochure ──
   A row value is either one string (same for every kV) or an array aligned
   to the line's kV list. */

type Val = string | string[];
type Line = { name: string; tag: string; kv: number[]; rows: [string, Val][] };
type Tube = { id: string; name: string; points: string[]; lines: Line[] };

const W = (...a: (number | string)[]) => a.map(String);

const TUBES: Tube[] = [
  {
    id: "transmission", name: "Transmission",
    points: [
      "High resolution applications in electronic, automotive, aviation semiconductor industry, material science and space industries",
      "Down to 1 micron detail detectability and down to 0.2 micron high resolution target for computed tomography (CT) applications",
      "Single or double stage electron optics with condenser, centering and focusing coils",
      "Unsurpassed target power with target cooling and High Energy Target to reduce scanning time for computed tomography (CT) or Computed Laminography (CL) applications",
    ],
    lines: [
      { name: "THE", tag: "High Brightness", kv: [160, 190, 225, 240], rows: [
        ["Min. voltage", "20 kV"], ["Current", "0.05 – 1 mA"], ["Max. power, target", "10 W"], ["Max. power, emission", "80 W"],
        ["JIMA resolution", "2 µm"], ["Target material", "Beryllium / Tungsten"], ["Min. FOD", "0.25 mm"], ["Opening angle", "≈160°"],
        ["Tube weight", W("≈30 kg", "≈30 kg", "≈51 kg", "≈51 kg")],
      ] },
      { name: "THE", tag: "High Energy", kv: [160, 190, 225, 240], rows: [
        ["Min. voltage", "20 kV"], ["Current", "0.05 – 1 mA"], ["Max. power, target", "25 W"], ["Max. power, emission", "80 W"],
        ["JIMA resolution", "2 µm"], ["Target material", "Diamond / Tungsten"], ["Min. FOD", "0.3 mm"], ["Opening angle", "≈160°"],
        ["Tube weight", W("≈30 kg", "≈30 kg", "≈51 kg", "≈51 kg")],
      ] },
      { name: "THE Plus", tag: "High Brightness", kv: [160, 190, 225, 240, 300], rows: [
        ["Min. voltage", W("20 kV", "20 kV", "20 kV", "20 kV", "50 kV")], ["Current", "0.05 – 1 mA"], ["Max. power, target", "50 W"], ["Max. power, emission", "80 W"],
        ["JIMA resolution", W("2 µm", "2 µm", "2 µm", "2 µm", "3 µm")], ["Target material", "Beryllium / Tungsten"], ["Min. FOD", "0.3 mm"], ["Opening angle", "≈160°"],
        ["Tube weight", W("≈31 kg", "≈31 kg", "≈52 kg", "≈52 kg", "≈71 kg")],
      ] },
      { name: "TCNF", tag: "High Resolution Diamond", kv: [160, 190, 225], rows: [
        ["Min. voltage", "20 kV"], ["Current", "0.05 – 1 mA"], ["Max. power, target", "25 W"], ["Max. power, emission", "80 W"],
        ["JIMA resolution", "2 µm"], ["Target material", "Diamond / Tungsten"], ["Min. FOD", "0.3 mm"], ["Opening angle", "≈160°"],
        ["Tube weight", W("≈30 kg", "≈30 kg", "≈51 kg")],
      ] },
    ],
  },
  {
    id: "reflection", name: "Reflection",
    points: [
      "High power Computed Tomography (CT) and Digital Radiography (DR) applications in automotive, energy, aviation, and space industries",
      "Down to 1 µm detail detectability",
      "Paramount target power and acceleration voltage",
      "Long term stability guaranteed by optimized cooling of tube head and target",
      "Flexibility by exchangeable tube heads and rod anodes",
    ],
    lines: [
      { name: "THE Plus", tag: "High Power", kv: [160, 190, 225, 240, 300], rows: [
        ["Min. voltage", W("20 kV", "20 kV", "20 kV", "20 kV", "50 kV")], ["Current", W("0.05 – 3 mA", "0.05 – 3 mA", "0.05 – 3 mA", "0.05 – 3 mA", "0.05 – 2 mA")],
        ["Max. power, target", "300 W"], ["Max. power, emission", "350 W"], ["JIMA resolution", W("2 µm", "2 µm", "2 µm", "2 µm", "3 µm")],
        ["Target material", "Tungsten"], ["Min. FOD", "4 mm"], ["Opening angle", "≈30°"], ["Tube weight", W("≈36 kg", "≈36 kg", "≈50 kg", "≈50 kg", "≈66 kg")],
      ] },
      { name: "CT", tag: "High Power", kv: [160, 190, 225, 240, 300], rows: [
        ["Min. voltage", W("20 kV", "20 kV", "20 kV", "20 kV", "50 kV")], ["Current", W("0.05 – 3 mA", "0.05 – 3 mA", "0.05 – 3 mA", "0.05 – 3 mA", "0.05 – 2 mA")],
        ["Max. power, target", "300 W"], ["Max. power, emission", "350 W"], ["JIMA resolution", W("2 µm", "2 µm", "2 µm", "2 µm", "3 µm")],
        ["Target material", "Tungsten"], ["Min. FOD", "4 mm"], ["Opening angle", "≈30°"], ["Tube weight", W("≈36 kg", "≈36 kg", "≈50 kg", "≈50 kg", "≈69 kg")],
      ] },
    ],
  },
  {
    id: "rod", name: "Rod Anode",
    points: [
      "High resolution Digital Radiography (DR) applications in automotive, energy, aviation, and space industries",
      "Flexible rod anode solutions with up to 1.5 m length",
      "Exchangeable tube heads with panoramic, reflection, or transmission target",
    ],
    lines: [
      { name: "RA", tag: "Reflection / Transmission", kv: [160, 190, 225, 240], rows: [
        ["Min. voltage", "20 kV"], ["Current", "0.05 – 1 mA"], ["Max. power, emission", "20 W"],
        ["Rod anode length", "10 – 250 mm"], ["Rod anode diameter", "8 – 20 mm"], ["Tube weight", W("≈30 kg", "≈30 kg", "≈51 kg", "≈51 kg")],
      ] },
      { name: "RAC", tag: "Panoramic / Reflection", kv: [160, 190, 225, 240], rows: [
        ["Min. voltage", "20 kV"], ["Current", "0.05 – 3 mA"], ["Max. power, emission", "320 W"],
        ["Rod anode length", "60 – 1000 mm"], ["Rod anode diameter", "12 / 15 / 25 / 45 mm"], ["Tube weight", W("≈40 kg", "≈40 kg", "≈50 kg", "≈50 kg")],
      ] },
      { name: "RAC Superfocus", tag: "Panoramic / Reflection", kv: [160, 190, 225, 240], rows: [
        ["Min. voltage", "20 kV"], ["Current", "0.05 – 3 mA"], ["Max. power, emission", "320 W"],
        ["Rod anode length", "580 / 730 / 960 mm"], ["Rod anode diameter", "See brochure"], ["Tube weight", W("≈45 kg", "≈45 kg", "≈66 kg", "≈66 kg")],
      ] },
    ],
  },
  {
    id: "dual", name: "Dual Head",
    points: [
      "Product line XC - microfocus tubes with exchangeable tube heads",
      "Product line XC is recommended for computed tomography (CT) and high resolution applications in science and research",
      "Exchangeable tube heads with automatic recognition",
      "Different target materials (Cu, Ag, Mo, Cr) available",
    ],
    lines: [
      { name: "XC", tag: "Reflection (R) / Transmission (T)", kv: [160, 190, 225, 240], rows: [
        ["Min. voltage", "20 kV"], ["Max. current", "3.0 mA (R) / 1.0 mA (T)"], ["Max. power, target", "300 W (R) / 10 W (T)"],
        ["Max. power, emission", "350 W (R) / 80 W (T)"], ["JIMA resolution", "2.0 µm (R) / 0.9 µm (T)"], ["Target material", "Beryllium / Tungsten"],
        ["Min. FOD", "4.0 mm (R) / 0.25 mm (T)"], ["Opening angle", "≈30° (R) / ≈160° (T)"], ["Tube weight", "≈53 kg (R) / ≈78 kg (T)"],
        ["Microfocus mode", "1 – 10 W target power · 1.5 – 3.0 µm"], ["High-power mode", "10 – 25 W target power · 3.0 – 15.0 µm"],
      ] },
    ],
  },
];

const ALL_KV = [160, 190, 225, 240, 300];

function TubeSelector() {
  const [t, setT] = useState(0);
  const [l, setL] = useState(0);
  const [kv, setKv] = useState(225);
  const tube = TUBES[t];
  const line = tube.lines[Math.min(l, tube.lines.length - 1)];
  const kvIdx = line.kv.includes(kv) ? line.kv.indexOf(kv) : line.kv.length - 1;
  const kvShown = line.kv[kvIdx];

  const chooseTube = (i: number) => { setT(i); setL(0); };

  return (
    <div className="mt-9" style={{ border: `1px solid ${HAIR}`, background: WHITE }}>
      {/* step 1 — tube type */}
      <div role="tablist" aria-label="Tube type" className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
        {TUBES.map((x, i) => {
          const on = i === t;
          return (
            <button key={x.id} role="tab" aria-selected={on} type="button" onClick={() => chooseTube(i)}
              className="cursor-pointer border-0 px-5 py-5 text-left"
              style={{
                background: on ? INK : WHITE, color: on ? "#fff" : INK,
                borderRight: `1px solid ${HAIR}`, boxShadow: on ? `inset 0 -3px 0 ${CYAN}` : "none",
                transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
              }}>
              <span className="block" style={label(on ? CYAN_ON_DARK : MUTED)}>Tube type</span>
              <span className="mt-1.5 block" style={{ font: `600 18px/1.2 ${SANS}`, letterSpacing: "-.01em" }}>{x.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* about this tube */}
        <div className="p-6 md:p-8" style={{ background: PAGE }}>
          <TubeGlyph id={tube.id} />
          <h3 className="mt-5" style={{ ...h3(INK), fontSize: 22 }}>{tube.name} Tube</h3>
          <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
            {tube.points.map((p) => (
              <li key={p} className="grid grid-cols-[14px_1fr] gap-2.5" style={{ ...body(BODY), fontSize: 14 }}>
                <span aria-hidden className="mt-[9px] h-[6px] w-[6px]" style={{ background: CYAN_ON_LIGHT }} />{p}
              </li>
            ))}
          </ul>
        </div>

        {/* step 2 + 3 — line and kV, then the numbers */}
        <div className="p-6 md:p-8">
          <p style={label(MUTED)}>Product line</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tube.lines.map((x, i) => {
              const on = x === line;
              return (
                <button key={`${x.name}-${x.tag}`} type="button" aria-pressed={on} onClick={() => setL(i)} className="cursor-pointer px-3.5 py-2.5 text-left"
                  style={{ background: on ? INK : WHITE, color: on ? "#fff" : INK, border: `1px solid ${on ? INK : HAIR}`, transition: `all 200ms ${EASE}` }}>
                  <span className="block" style={{ font: `600 14px/1.2 ${SANS}` }}>{x.name}</span>
                  <span className="mt-1 block" style={{ font: `400 12px/1.2 ${SANS}`, color: on ? "rgba(255,255,255,.7)" : MUTED }}>{x.tag}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-6" style={label(MUTED)}>Max. voltage</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_KV.map((v) => {
              const has = line.kv.includes(v);
              const on = has && v === kvShown;
              return (
                <button key={v} type="button" disabled={!has} aria-pressed={on} onClick={() => setKv(v)}
                  className="min-w-[72px] px-3 py-2.5"
                  style={{
                    cursor: has ? "pointer" : "not-allowed",
                    background: on ? CYAN : WHITE, color: has ? INK : "#A9B8C3",
                    border: `1px solid ${on ? CYAN : HAIR}`, textDecoration: has ? "none" : "line-through",
                    font: `600 14px/1 ${SANS}`, transition: `all 200ms ${EASE}`,
                  }}>{v} kV</button>
              );
            })}
          </div>

          <dl className="m-0 mt-7" style={{ borderTop: `1px solid ${INK}` }} aria-live="polite">
            <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-4 py-3" style={{ borderBottom: `1px solid ${HAIR}`, background: "rgba(22,193,243,.08)" }}>
              <dt className="pl-3" style={label(INK)}>Configuration</dt>
              <dd className="m-0 pr-3" style={{ font: `600 15px/1.4 ${SANS}`, color: INK }}>{tube.name} · {line.name} · {kvShown} kV</dd>
            </div>
            {line.rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-4 py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
                <dt className="pl-3" style={label(MUTED)}>{k}</dt>
                <dd className="m-0 pr-3" style={{ ...body(INK), fontSize: 15 }}>{Array.isArray(v) ? v[kvIdx] : v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4" style={{ ...body(MUTED), fontSize: 13 }}>
            Values from the MQMF brochure.
          </p>
        </div>
      </div>
    </div>
  );
}

/* Small schematic per tube type, drawn in the page's line idiom. */
function TubeGlyph({ id }: { id: string }) {
  const stroke = INK;
  return (
    <svg width="132" height="64" viewBox="0 0 132 64" aria-hidden>
      <rect x="2" y="20" width="58" height="24" fill="none" stroke={stroke} strokeWidth="1.6" />
      <rect x="8" y="27" width="14" height="10" fill={CYAN} />
      {id === "transmission" && <><rect x="60" y="28" width="4" height="8" fill={stroke} /><path d="M64 32 L128 8 L128 56 Z" fill={CYAN} opacity=".28" /></>}
      {id === "reflection" && <><path d="M60 22 L68 30 L60 38" fill="none" stroke={stroke} strokeWidth="1.6" /><path d="M64 30 L104 2 L124 22 Z" fill={CYAN} opacity=".28" /></>}
      {id === "rod" && <><rect x="60" y="29" width="54" height="6" fill={stroke} /><circle cx="118" cy="32" r="5" fill={CYAN} /><circle cx="118" cy="32" r="13" fill="none" stroke={CYAN} strokeDasharray="2 3" /></>}
      {id === "dual" && <><path d="M64 32 L128 16 L128 48 Z" fill={CYAN} opacity=".22" /><path d="M64 26 L100 2 L120 12 Z" fill={CYAN} opacity=".4" /></>}
    </svg>
  );
}

/* ── inspection modes ── */

const MODES: { name: string; tag: string; svg: React.ReactNode }[] = [
  {
    name: "DR", tag: "Digital Radiography",
    svg: (
      <>
        <circle cx="26" cy="60" r="7" fill={CYAN} />
        <path d="M33 60 L150 24 L150 96 Z" fill={CYAN} opacity=".16" />
        <rect x="80" y="46" width="26" height="28" fill="none" stroke="#fff" strokeWidth="1.6" />
        <rect x="150" y="20" width="8" height="80" fill="#fff" opacity=".85" />
      </>
    ),
  },
  {
    name: "CT", tag: "Computed Tomography",
    svg: (
      <>
        <circle cx="26" cy="60" r="7" fill={CYAN} />
        <path d="M33 60 L150 24 L150 96 Z" fill={CYAN} opacity=".16" />
        <rect x="80" y="46" width="26" height="28" fill="none" stroke="#fff" strokeWidth="1.6" />
        <ellipse cx="93" cy="88" rx="22" ry="6" fill="none" stroke={CYAN} strokeWidth="1.6" />
        <path d="M112 84 l5 4 -6 2" fill="none" stroke={CYAN} strokeWidth="1.6" />
        <rect x="150" y="20" width="8" height="80" fill="#fff" opacity=".85" />
      </>
    ),
  },
  {
    name: "Panoramic", tag: "Rod Anode Tube",
    svg: (
      <>
        <rect x="22" y="34" width="136" height="52" fill="none" stroke="#fff" strokeWidth="1.6" />
        <rect x="6" y="57" width="98" height="6" fill="#fff" opacity=".85" />
        <circle cx="106" cy="60" r="5" fill={CYAN} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line key={a} x1="106" y1="60" x2={106 + 22 * Math.cos((a * Math.PI) / 180)} y2={60 + 22 * Math.sin((a * Math.PI) / 180)} stroke={CYAN} strokeWidth="1.4" opacity=".7" />
        ))}
        <line x1="106" y1="30" x2="106" y2="90" stroke={CYAN_ON_DARK} strokeDasharray="3 3" />
      </>
    ),
  },
];

/* The brief's examples and defect types, then the brochure's application list. */
const APPLICATIONS = ["PCB solder joints", "Aerospace composites", "Micro-cracks", "Porosities", "Inclusions", "Bonding issues"];

const INDUSTRIES = [
  { name: "Automotive Industry", href: "/industries/automotive" },
  { name: "Aerospace Industry", href: "/industries/aerospace" },
  { name: "Electronics Industry", href: "/industries/electronics" },
  { name: "Energy Industry" },
];

export default function MicrofocusXray() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── split, HighEnergy-style: the render is a framed object
          rather than a backdrop, because the system is open-frame and the
          detail is the point. */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <div className={`${SHELL} grid grid-cols-1 items-center gap-10 pb-12 pt-[120px] md:pb-16 md:pt-[132px] lg:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] lg:gap-14 lg:pb-[88px] lg:pt-[150px]`}>
          <div className="flex max-w-[620px] flex-col" style={{ gap: 18 }}>
            <p style={eyebrow(CYAN)}>Microfocus X-Ray Systems</p>
            <h1 style={{ margin: 0, font: `600 clamp(30px,4.2vw,56px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
              Built for Fine Detail. Designed to Catch What Others Miss.
            </h1>
            <p style={lead("rgba(255,255,255,.82)")}>
              MQS Microfocus X-ray systems are purpose-built for inspecting small, complex, and high-precision components
              where even the tiniest defect can lead to major failure.
            </p>
            <Badges items={BADGES} />
            <HeroActions />
          </div>
          <div className="relative" style={{ aspectRatio: "1082 / 876", border: `1px solid ${HAIR_DARK}`, background: "#1A1D20" }}>
            <Image src="/assets/prod-mf-hero.jpg" alt="MQS microfocus X-ray system with open frame, microfocus tube, rotary manipulator and flat panel detector"
              fill priority quality={90} sizes="(min-width:1024px) 48vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── overview + key benefits ── */}
      <Section id="benefits" tone="white">
        <p className="max-w-[78ch]" style={lead(BODY)}>
          From PCB solder joints to aerospace composites, our systems deliver micron-scale imaging clarity with
          configurable tube technologies and modular architecture tailored to your application—supporting DR, CT, and
          panoramic inspection workflows.
        </p>
        <h2 className="mt-14" style={h2(INK)}>Key Benefits</h2>
        <BenefitGrid items={BENEFITS} />
      </Section>

      {/* ── highlights ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/prod-mf-system.jpg" aspect="2000 / 1656" fit="contain" ground={WHITE} items={HIGHLIGHTS}
          alt="Open-frame MQS microfocus X-ray system with numbered callouts on the tube, manipulator, detector and frame" />
      </Section>

      {/* ── tube selector ── */}
      <Section id="specs" tone="white">
        <SectionHead title="Technical Data" />
        <TubeSelector />
      </Section>

      {/* ── inspection modes ── */}
      <Section id="modes" tone="ink">
        <SectionHead dark kicker="04" title={BENEFITS[3][1]} intro={BENEFITS[3][2]} />
        <div className="mt-9 grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: HAIR_DARK, border: `1px solid ${HAIR_DARK}` }}>
          {MODES.map((m) => (
            <div key={m.name} className="flex flex-col p-6 md:p-7" style={{ background: INK }}>
              <svg viewBox="0 0 180 120" className="block h-auto w-full max-w-[260px]" aria-hidden>{m.svg}</svg>
              <p className="mt-6" style={label(CYAN_ON_DARK)}>{m.tag}</p>
              <h3 className="mt-2" style={{ ...h3("#fff"), fontSize: 22 }}>{m.name}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* ── applications ── */}
      <Section id="applications" tone="page">
        <SectionHead title="Applications" />
        <div className="mt-8"><TagList items={APPLICATIONS} /></div>
        <div className="mt-8"><IndustryCards items={INDUSTRIES} /></div>
      </Section>

      {/* ── downloads + related ── */}
      <Section id="downloads" tone="white" ruled>
        <DownloadsAndRelated downloadsTitle="Download Brochure"
          downloads={[{ name: "Microfocus X-Ray Systems (PDF)", href: "/brochures/microfocus-xray.pdf" }]} />
        <a href="#contact" className="mt-8 hover:!bg-[#0B2A3A] hover:!text-white" style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: CYAN, color: INK, font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase" }}>Request a Demo</a>
      </Section>
    </main>
  );
}
