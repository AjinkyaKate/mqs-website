"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, MUTED, CYAN, CYAN_ON_LIGHT, CYAN_ON_DARK, HAIR, HAIR_DARK, PAGE, INSET, WHITE, SANS, SHELL,
  eyebrow, label, h3, body, lead,
  useInViewOnce, useReducedMotion, useViewport,
  Section, SectionHead, SubNav, Badges, HeroActions, BenefitGrid, HotspotFigure, TagList, IndustryCards,
  SpecTable, DownloadsAndRelated, Lightbox, ZoomIcon,
  type Hotspot, type Zoomable,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   MQWR 160U Inline Wheel Inspection — /products/mqwr-160u/
   Copy is the client's "MQWR 160U Inline Wheel Inspection System.docx"
   brief (Downloads/Solutions/Wheel Inspection system) and nothing else:
   section headings are the brief's own, and no explanatory copy has been
   added. Page pattern via solution-kit.tsx.

   Interactive pieces, each carrying the brief's words:
   · INLINE FLOW steps through four of the brief's highlights in line order
     (conveyor → holding/alignment → C-arm → ADR).
   · WHEEL RANGE illustrates the "Wide Wheel Coverage (10"–26")" benefit by
     drawing the chosen wheel to scale against the 26″ envelope.
   · DEFECT IMAGE shows the supplied hub radiograph; the three level labels
     are the ones printed on the image itself.

   PENDING MQS SIGN-OFF:
   · The brief repeats its five highlights twice; they are used once.
   · "India's first indigenously developed inline X-ray inspection system"
     is a strong claim; confirm it can be substantiated.
   · The brief has no downloads section; the brochure is the PDF supplied in
     the same folder.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"],
  ["Applications", "#applications"], ["Technical Information", "#specs"],
];

const BADGES = ["India's first indigenous inline system", "10″ – 26″ wheels", "ADR · ASTM E2422-22", "AERB Type Approved"];

/* [diagram label, brief highlight title, brief highlight copy] */
const STAGES: [string, string, string][] = [
  ["Conveyor", "Inline Automation Built for Production Lines", "Conveyor-integrated workflow designed for continuous movement, minimal manual handling, and consistent output."],
  ["Alignment", "Customized Wheel Holding & Integrated Alignment", "Adapts to multiple wheel sizes and ensures optimum positioning to improve scan repeatability and reduce rejects/re-scans."],
  ["C-Arm", "Stand-alone C-Arm Manipulator", "Stable source-detector motion control to achieve consistent radiographic results across wheel geometries."],
  ["ADR", "ADR (Automatic Defect Recognition) – ASTM Compliant", "Real-time defect detection and classification to reduce human subjectivity and support audit-ready reporting."],
];

const BENEFITS: [string, string, string][] = [
  ["01", "True Inline, High-Throughput Inspection", "Continuous production QC without slowing the line."],
  ["02", "Automatic Wheel Alignment for Consistent Results", "Reliable scan accuracy across different wheel sizes."],
  ["03", "Built-in ADR for Real-Time Defect Detection", "Detect cracks, porosity, shrinkage, and casting defects automatically."],
  ["04", "Wide Wheel Coverage (10”–26”) with Minimal Changeover", "Flexible holding mechanism supports multiple diameters."],
  ["05", "Traceable, Standards-Aligned Inspection", "ASTM E2422-22 defect categorization with digital records and program recall."],
];

const HIGHLIGHTS: Hotspot[] = [
  { id: "1", title: STAGES[0][1], desc: STAGES[0][2], at: [18, 56] },
  { id: "2", title: STAGES[1][1], desc: STAGES[1][2], at: [41.5, 49] },
  { id: "3", title: STAGES[3][1], desc: STAGES[3][2], at: [88, 46] },
  { id: "4", title: STAGES[2][1], desc: STAGES[2][2], at: [46, 28] },
  { id: "5", title: "MQS Indigenous Imaging Suite", desc: "Macro-based inspection routines, IQI support, periodic calibration, and digital record-keeping for high-confidence QC.", at: [67, 31] },
];

/* Labels as printed on the supplied radiograph. */
const LEVELS: [string, string, number][] = [
  ["Level I", "Gas Holes", 1],
  ["Level II", "Porosity", 2],
  ["Level III", "Shrinkage", 3],
];

const DEFECT_SHOT: Zoomable = {
  src: "/assets/prod-mqwr-defects.jpg", w: 951, h: 670,
  label: "Level I Gas Holes · Level II Porosity · Level III Shrinkage",
  alt: "X-ray of an alloy wheel hub with circled defects labelled Level I gas holes, Level II porosity and Level III shrinkage",
};

const APPLICATIONS = [
  "X-ray inspection of alloy wheels in production lines",
  "Detection of shrinkage, porosity, and cracks",
  "Automated defect grading and rejection",
  "Real-time quality control with digital records",
];

const INDUSTRIES = [
  { name: "Automotive OEMs", href: "/industries/automotive" },
  { name: "Alloy wheel manufacturing" },
  { name: "Foundries and casting plants" },
];

const SOURCE_ROWS: string[][] = [
  ["Focal Spot", "0.4 – 1.0 mm", "0.4 – 1.0 mm"],
  ["Analysis Mode", "2D", "2D"],
  ["Duty Cycle", "100%", "100%"],
];
const DETECTOR_ROWS: string[][] = [
  ["Pixel Pitch", "200 µm", "100 µm"],
  ["Active Area", "205 × 205 mm", "307 × 307 mm"],
  ["Pixel Matrix", "1024 × 1024", "3072 × 3072"],
  ["Frame Rate", "25 fps", "25 fps"],
  ["ADC", "16-bit", "16-bit"],
];

/* ── inline flow ── */

const STAGE_MS = 2400;

function InlineFlow() {
  const reduced = useReducedMotion();
  const { mobile } = useViewport();
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.35);
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!seen || !auto || reduced) return;
    const t = setInterval(() => setStage((s) => (s + 1) % STAGES.length), STAGE_MS);
    return () => clearInterval(t);
  }, [seen, auto, reduced]);

  const pick = (i: number) => { setAuto(false); setStage(i); };
  const pct = (stage / (STAGES.length - 1)) * 100;
  const [, title, desc] = STAGES[stage];

  return (
    <div ref={ref} className="mt-10">
      <div className="relative" style={{ padding: mobile ? "0 4px" : "0 24px" }}>
        <div className="absolute left-0 right-0 top-[27px] h-[2px]" style={{ background: HAIR_DARK, margin: mobile ? "0 22px" : "0 52px" }} />
        <div className="absolute left-0 top-[27px] h-[2px]" style={{
          background: CYAN, marginLeft: mobile ? 22 : 52,
          width: `calc((100% - ${mobile ? 44 : 104}px) * ${pct / 100})`,
          transition: reduced ? "none" : `width 600ms ${EASE}`,
        }} />
        <ol className="relative m-0 flex list-none justify-between p-0">
          {STAGES.map(([name], i) => {
            const done = i < stage, on = i === stage;
            return (
              <li key={name} className="flex flex-col items-center" style={{ width: mobile ? 44 : 56 }}>
                <button type="button" onClick={() => pick(i)} aria-pressed={on} aria-label={`${i + 1}: ${STAGES[i][1]}`}
                  className="grid h-[56px] w-[56px] cursor-pointer place-items-center rounded-full p-0 max-md:h-[44px] max-md:w-[44px]"
                  style={{
                    background: on ? CYAN : done ? "rgba(22,193,243,.22)" : INK,
                    border: `2px solid ${on || done ? CYAN : "rgba(255,255,255,.28)"}`,
                    color: on ? INK : "#fff",
                    boxShadow: on ? "0 0 0 8px rgba(22,193,243,.18)" : "none",
                    transition: `all 300ms ${EASE}`,
                  }}>
                  {on ? <WheelGlyph spin={!reduced} /> : <span style={{ font: `600 14px/1 ${SANS}` }}>{i + 1}</span>}
                </button>
                <span className="mt-3 whitespace-nowrap text-center" style={label(on ? CYAN_ON_DARK : "rgba(255,255,255,.62)")}>{name}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 p-6 md:grid-cols-[120px_1fr] md:gap-8 md:p-8" style={{ border: `1px solid ${HAIR_DARK}`, background: "rgba(255,255,255,.04)" }}>
        <div style={{ font: `600 clamp(36px,4vw,52px)/1 ${SANS}`, letterSpacing: "-.03em", color: CYAN }}>0{stage + 1}</div>
        <div aria-live="polite">
          <h3 style={{ ...h3("#fff"), fontSize: 22 }}>{title}</h3>
          <p className="mt-2.5 max-w-[68ch]" style={body("rgba(255,255,255,.78)")}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

function WheelGlyph({ spin }: { spin: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden style={{ animation: spin ? "mqwr-spin 2.2s linear infinite" : undefined, transformOrigin: "center" }}>
      <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="14" cy="14" r="3" fill="currentColor" />
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1="14" y1="14" x2={14 + 10 * Math.cos((a * Math.PI) / 180)} y2={14 + 10 * Math.sin((a * Math.PI) / 180)} stroke="currentColor" strokeWidth="2" />
      ))}
      <style>{"@keyframes mqwr-spin{to{transform:rotate(360deg)}}"}</style>
    </svg>
  );
}

/* ── wheel range ── */

const MIN_IN = 10, MAX_IN = 26;

function WheelRange() {
  const [inches, setInches] = useState(17);
  const R = 150; // 26″ envelope radius in SVG units
  const r = (inches / MAX_IN) * R;
  const spokes = inches < 15 ? 3 : inches < 20 ? 5 : 6;
  return (
    <div className="mt-9 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div className="mx-auto w-full max-w-[420px]" style={{ background: INSET, border: `1px solid ${HAIR}` }}>
        <svg viewBox="0 0 340 340" className="block h-auto w-full" role="img" aria-label={`A ${inches} inch wheel drawn to scale inside the 26 inch maximum`}>
          <circle cx="170" cy="170" r={R} fill="none" stroke={CYAN_ON_LIGHT} strokeWidth="1.2" strokeDasharray="5 6" />
          <circle cx="170" cy="170" r={(MIN_IN / MAX_IN) * R} fill="none" stroke={HAIR} strokeWidth="1.2" strokeDasharray="3 5" />
          <text x="170" y={170 - R - 6} textAnchor="middle" fill={CYAN_ON_LIGHT} style={{ font: `500 10px ${SANS}`, letterSpacing: ".08em" }}>26″</text>
          <circle cx="170" cy="170" r={r} fill={INK} style={{ transition: `r 260ms ${EASE}` }} />
          <circle cx="170" cy="170" r={r * 0.82} fill="#2A4D60" style={{ transition: `r 260ms ${EASE}` }} />
          {Array.from({ length: spokes }).map((_, i) => {
            const a = (i / spokes) * Math.PI * 2 - Math.PI / 2;
            return <line key={`${spokes}-${i}`} x1="170" y1="170" x2={170 + r * 0.8 * Math.cos(a)} y2={170 + r * 0.8 * Math.sin(a)} stroke={WHITE} strokeOpacity=".85" strokeWidth={Math.max(4, r * 0.09)} strokeLinecap="round" />;
          })}
          <circle cx="170" cy="170" r={Math.max(8, r * 0.16)} fill={CYAN} />
        </svg>
      </div>
      <div>
        <div className="flex items-end gap-4">
          <span style={{ font: `600 clamp(52px,6vw,80px)/0.9 ${SANS}`, letterSpacing: "-.04em", color: INK }}>{inches}″</span>
          <span className="pb-1.5" style={label(MUTED)}>{Math.round(inches * 25.4)} mm</span>
        </div>
        <label htmlFor="mqwr-range" className="sr-only">Wheel diameter in inches</label>
        <input id="mqwr-range" type="range" min={MIN_IN} max={MAX_IN} step={1} value={inches} onChange={(e) => setInches(Number(e.target.value))}
          className="mt-7 w-full cursor-pointer" style={{ accentColor: CYAN }} />
        <div className="mt-2 flex justify-between" style={label(MUTED)}><span>10″</span><span>26″</span></div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[10, 14, 17, 20, 24, 26].map((v) => (
            <button key={v} type="button" onClick={() => setInches(v)} aria-pressed={inches === v} className="cursor-pointer px-3.5 py-2"
              style={{ background: inches === v ? INK : WHITE, color: inches === v ? "#fff" : INK, border: `1px solid ${inches === v ? INK : HAIR}`, font: `500 13px/1 ${SANS}`, transition: `all 200ms ${EASE}` }}>{v}″</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── defect image ── */

function DefectImage() {
  const [zoom, setZoom] = useState<Zoomable | null>(null);
  const close = useCallback(() => setZoom(null), []);
  return (
    <>
      <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-12">
        <button type="button" onClick={() => setZoom(DEFECT_SHOT)} aria-label={`Open at full resolution: ${DEFECT_SHOT.label}`}
          className="relative block w-full cursor-zoom-in border-0 p-0" style={{ background: WHITE, aspectRatio: "951 / 670" }}>
          <Image src={DEFECT_SHOT.src} alt={DEFECT_SHOT.alt} fill quality={92} sizes="(min-width:1024px) 60vw, 100vw" className="object-contain" />
          <ZoomIcon />
        </button>
        <div className="flex flex-col self-center" style={{ borderTop: `1px solid ${HAIR_DARK}` }}>
          {LEVELS.map(([lvl, name, sev]) => (
            <div key={lvl} className="flex items-center justify-between gap-4 py-5" style={{ borderBottom: `1px solid ${HAIR_DARK}` }}>
              <span>
                <span className="block" style={label(CYAN_ON_DARK)}>{lvl}</span>
                <span className="mt-2 block" style={{ ...h3("#fff"), fontSize: 19 }}>{name}</span>
              </span>
              <span aria-label={lvl} className="flex gap-1">
                {[1, 2, 3].map((n) => <span key={n} className="h-2 w-6" style={{ background: n <= sev ? CYAN : "rgba(255,255,255,.16)" }} />)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Lightbox shot={zoom} onClose={close} />
    </>
  );
}

/* ── specs with a compare toggle ── */

function Toggle({ value, set, options }: { value: 1 | 2; set: (v: 1 | 2) => void; options: [string, string] }) {
  return (
    <div className="inline-flex" role="group" style={{ border: `1px solid ${HAIR}` }}>
      {options.map((o, i) => {
        const v = (i + 1) as 1 | 2;
        return (
          <button key={o} type="button" aria-pressed={value === v} onClick={() => set(v)} className="cursor-pointer border-0 px-4 py-2.5"
            style={{ background: value === v ? INK : WHITE, color: value === v ? "#fff" : INK, font: `500 13px/1 ${SANS}`, transition: `all 200ms ${EASE}` }}>{o}</button>
        );
      })}
    </div>
  );
}

function Specs() {
  const [src, setSrc] = useState<1 | 2>(1);
  const [det, setDet] = useState<1 | 2>(2);
  return (
    <div className="mt-9 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-10">
      <div>
        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
          <h3 style={{ ...h3(INK), fontSize: 20 }}>X-ray Source Options</h3>
          <Toggle value={src} set={setSrc} options={["160 kV", "225 kV"]} />
        </div>
        <SpecTable head={["Feature", "160 kV", "225 kV"]} rows={SOURCE_ROWS} highlightCol={src} />
      </div>
      <div>
        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
          <h3 style={{ ...h3(INK), fontSize: 20 }}>Detector Options</h3>
          <Toggle value={det} set={setDet} options={["XRD 0822", "XRD 3131N"]} />
        </div>
        <SpecTable head={["Feature", "XRD 0822", "XRD 3131N"]} rows={DETECTOR_ROWS} highlightCol={det} />
      </div>
    </div>
  );
}

export default function Mqwr160u() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── the dark render is used as-is; it is already lit on black */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: "#121416" }}>
        <Image src="/assets/prod-mqwr-hero.jpg" alt="MQWR 160U inline wheel inspection system with infeed and outfeed roller conveyors"
          fill priority quality={88} sizes="100vw" className="object-cover object-[68%_center] max-md:object-[75%_center]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.97) 0%,rgba(11,42,58,.86) 36%,rgba(11,42,58,.30) 72%,rgba(11,42,58,.05) 100%)" }} />
        <div className={`relative flex flex-col justify-end ${SHELL}`} style={{ zIndex: 3, minHeight: "clamp(560px,72vh,700px)", gap: 18, paddingTop: 120, paddingBottom: "clamp(48px,6vw,72px)" }}>
          <p style={eyebrow(CYAN)}>MQWR 160U Inline Wheel Inspection System</p>
          <h1 className="max-w-[720px]" style={{ margin: 0, font: `600 clamp(30px,4.2vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
            Inline X-ray Inspection. Real-Time Defect Detection.
          </h1>
          <p className="max-w-[600px]" style={lead("rgba(255,255,255,.84)")}>
            MQWR 160U is India&apos;s first indigenously developed inline X-ray inspection system designed specifically for
            2-wheeler and 4-wheeler alloy wheels.
          </p>
          <Badges items={BADGES} />
          <HeroActions />
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />

      {/* ── overview, with the line shown as the brief's highlights ── */}
      <Section tone="ink">
        <p className="max-w-[78ch]" style={lead("rgba(255,255,255,.84)")}>
          Built for high-volume production environments, it inspects wheels from 10” to 26” using a fully automated
          workflow, a customized wheel-holding + alignment mechanism, and integrated ADR (Automatic Defect Recognition)
          software compliant with ASTM E2422-22. The system is AERB Type Approved, enabling fast, safe, and consistent
          quality control directly on the manufacturing line.
        </p>
        <InlineFlow />
      </Section>

      {/* ── key benefits, with benefit 04 illustrated ── */}
      <Section id="benefits" tone="white">
        <SectionHead title="Key Benefits" />
        <BenefitGrid items={BENEFITS} />
        <div className="mt-16">
          <SectionHead kicker="04" title={BENEFITS[3][1]} intro={BENEFITS[3][2]} />
          <WheelRange />
        </div>
      </Section>

      {/* ── highlights ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/prod-mqwr-system.jpg" aspect="1640 / 720" fit="contain" ground={WHITE} items={HIGHLIGHTS}
          alt="MQWR 160U shielded inspection cabinet with roller conveyors on the infeed and outfeed sides, with numbered feature callouts" />
      </Section>

      {/* ── benefit 03, shown on the supplied radiograph ── */}
      <Section tone="ink">
        <SectionHead dark kicker="03" title={BENEFITS[2][1]} intro={BENEFITS[2][2]} />
        <DefectImage />
      </Section>

      {/* ── applications & industries ── */}
      <Section id="applications" tone="white">
        <SectionHead title="Applications & Industries" />
        <p className="mt-8" style={label(CYAN_ON_LIGHT)}>Industries</p>
        <div className="mt-4"><IndustryCards items={INDUSTRIES} /></div>
        <p className="mt-10" style={label(CYAN_ON_LIGHT)}>Applications</p>
        <div className="mt-4"><TagList items={APPLICATIONS} /></div>
      </Section>

      {/* ── technical information ── */}
      <Section id="specs" tone="page" ruled>
        <SectionHead title="Technical Information" />
        <Specs />
      </Section>

      {/* ── brochure ── */}
      <Section id="downloads" tone="white">
        <DownloadsAndRelated downloadsTitle="Download Brochure"
          downloads={[{ name: "MQWR 160U Inline Wheel Inspection System (PDF)", href: "/brochures/mqwr-160u-wheel-inspection.pdf" }]} />
      </Section>
    </main>
  );
}
