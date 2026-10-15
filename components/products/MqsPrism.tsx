"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, CYAN, CYAN_ON_LIGHT, CYAN_ON_DARK, HAIR, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, body, lead,
  useInViewOnce, useReducedMotion,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid, HotspotFigure, TagList, IndustryCards,
  SpecTable, DownloadsAndRelated, Lightbox, ZoomIcon,
  type Hotspot, type Zoomable,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   MQS.PRISM product page — /products/prism/
   Copy is the client's "PRISM.docx" brief (Downloads/Solutions/PRISM) and
   nothing else: section headings are the brief's own section names, and no
   explanatory copy has been added. Page pattern via solution-kit.tsx.

   Two interactive pieces carry the brief's own words:
   · SWIVEL CYCLE animates highlight A ("Parallel scanning + loading reduces
     cycle time and increases throughput"). Its labels are diagram labels only.
   · ADR VIEWER steps through the three supplied images (raw image, then the
     two "Application Image" ADR results) under highlight C's copy.

   PENDING MQS SIGN-OFF:
   · Naming. The brief writes "MQS-PRISM"; the catalogue, industry pages and
     brochure filename use "MQS.PRISM". The site convention is used here.
   · The A–F highlight letters sat on a diagram that did not survive export,
     so the pins are placed on the studio photograph.
   · "ASTM E2422 Compliance Guide" is listed in the brief but no file was
     supplied, so it is shown without a link.
   · Section 8 (Request a Demo) is served by the hero button and the contact
     form below the page; a separate CTA band was removed site-wide at the
     client's request (see HighEnergy.tsx).
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"], ["ADR", "#adr"],
  ["Applications", "#applications"], ["Specifications", "#specs"], ["Downloads", "#downloads"],
];

const BADGES = ["Made in India", "AI-enabled ADR · ASTM E2422", "AERB-compliant", "24/7 operation"];

const STATS: [string, string][] = [
  ["1 million+", "Parts per year"],
  ["24/7", "Continuous operation"],
  ["0° – 90°", "Multi-angle views"],
  ["±1 mm / ±1°", "CNC manipulator"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "Maximized Uptime", "Built for continuous 24/7 operation without slowing the production line."],
  ["02", "Zero-Compromise Quality", "100% inspection with reduced subjectivity and minimal false negatives."],
  ["03", "Faster ROI", "Lower cost of quality and reduced inspection cycle time."],
  ["04", "Scalable & Flexible", "Minimal hardware change to handle multiple component types."],
  ["05", "Traceable & Audit-Ready", "Barcode + cloud-ready reporting for batch traceability and compliance."],
];

const HIGHLIGHTS: Hotspot[] = [
  { id: "A", title: "Swivel-Based Design", desc: "Parallel scanning + loading reduces cycle time and increases throughput.", at: [63.5, 60] },
  { id: "B", title: "Multi-Angle Inspection (0°–90° Views)", desc: "Better defect coverage for complex castings and assemblies.", at: [64, 27] },
  { id: "C", title: "AI-Enabled ADR (ASTM E2422 Compliant)", desc: "Consistent, objective defect recognition—reduces operator dependency.", at: [19, 46] },
  { id: "D", title: "Precision CNC Manipulator (±1 mm / ±1°)", desc: "Repeatable scan patterns and stable inspection quality across batches.", at: [63.5, 43] },
  { id: "E", title: "Barcode & Cloud Integration", desc: "Smart factory readiness with traceable inspection history and reports.", at: [26, 58] },
  { id: "F", title: "AERB-Compliant Safety", desc: "Fully shielded, factory-safe operation for production environments.", at: [45, 80] },
];

/* Step names are image labels only. Alt text describes what is visible. */
const ADR_STEPS: (Zoomable & { step: string })[] = [
  { step: "Raw image", src: "/assets/prod-prism-raw.jpg", w: 1000, h: 1000, label: "Raw image", alt: "Raw X-ray radiograph of two cast components side by side" },
  { step: "ADR result", src: "/assets/prod-prism-adr-caliper.jpg", w: 892, h: 858, label: "ADR result", alt: "Radiograph of a cast component with a red box around detected porosity" },
  { step: "ADR result", src: "/assets/prod-prism-adr-bracket.jpg", w: 1000, h: 534, label: "ADR result", alt: "Radiograph of a cast component with detected indications highlighted in red inside a box" },
];

const APPLICATIONS = [
  "Inline inspection of die-cast components",
  "Automotive cylinder heads, knuckles, engine blocks",
  "Aerospace structural parts",
  "Defence components requiring 100% QA",
  "High-volume inspection in zero-defect environments",
];

const INDUSTRIES = [
  { name: "Automotive", href: "/industries/automotive" },
  { name: "Aerospace & Defence", href: "/industries/aerospace" },
  { name: "Foundry & Casting" },
  { name: "Precision Manufacturing" },
];

const SPECS: string[][] = [
  ["X-Ray Source", "160 kV / 225 kV"],
  ["Focal Spot", "0.4 / 1.0 mm"],
  ["Detector", "Flat Panel DFPD"],
  ["Pixel Pitch", "200 µm"],
  ["Active Area", "Up to 307 × 307 mm"],
  ["Frame Rate", "25 fps"],
  ["Motion System", "CNC with ±1 mm / ±1° accuracy"],
  ["Safety", "AERB-compliant full shielding"],
  ["Software", "MQS ADR + Image Processing + Batch Reporting (ASTM E2422 aligned)"],
];

const WHY = [
  "Made in India, Globally Competitive",
  "Integrated ADR Software (ASTM E2422)",
  "Rapid Part Changeover with pre-loaded inspection macros",
  "Minimal Hardware Change across component families",
  "Cloud-Based Reporting & Analytics Ready",
  "Complete Lifecycle Support – installation, training, service, spares",
];

/* ── swivel cycle ──
   Ticks alternate WORK (scan one fixture, load the other) and SWIVEL (the
   table turns 180°). The angle only ever increases, so the turn always runs
   the same way instead of unwinding. */

const TICK_MS = 1700;

function SwivelCycle() {
  const reduced = useReducedMotion();
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.35);
  const [playing, setPlaying] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!seen || !playing || reduced) return;
    const t = setInterval(() => setTick((n) => n + 1), TICK_MS);
    return () => clearInterval(t);
  }, [seen, playing, reduced]);

  const swivelling = tick % 2 === 1;
  const angle = Math.ceil(tick / 2) * 180;
  const transition = reduced ? "none" : `transform ${TICK_MS - 250}ms ${EASE}`;

  return (
    <div ref={ref} className="mx-auto mt-9 max-w-[760px]" style={{ background: INK, border: `1px solid ${HAIR}` }}>
      <svg viewBox="0 0 520 380" className="block h-auto w-full" role="img" aria-label="Top-down schematic of the PRISM swivel table: one fixture in the scan zone while the other is loaded">
        <rect x="20" y="40" width="230" height="300" fill="rgba(22,193,243,.07)" stroke="rgba(22,193,243,.45)" strokeDasharray="4 5" />
        <text x="34" y="66" fill={CYAN_ON_DARK} style={{ font: `500 11px ${SANS}`, letterSpacing: ".09em" }}>SCAN</text>
        <path d="M60 190 L 165 140 L 165 240 Z" fill={CYAN} style={{ opacity: swivelling ? 0 : 0.22, transition: `opacity 300ms ${EASE}` }} />
        <rect x="44" y="176" width="16" height="28" fill="#fff" opacity=".9" />
        <rect x="300" y="40" width="200" height="300" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.22)" />
        <text x="314" y="66" fill="rgba(255,255,255,.7)" style={{ font: `500 11px ${SANS}`, letterSpacing: ".09em" }}>LOADING</text>
        <rect x="268" y="40" width="10" height="110" fill="rgba(255,255,255,.28)" />
        <rect x="268" y="230" width="10" height="110" fill="rgba(255,255,255,.28)" />
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "273px 190px", transition }}>
          <circle cx="273" cy="190" r="128" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
          <rect x="263" y="70" width="20" height="240" fill="rgba(255,255,255,.12)" />
          {([["1", 175], ["2", 371]] as const).map(([id, cx]) => (
            <g key={id}>
              <rect x={cx - 32} y="158" width="64" height="64" fill={id === "1" ? CYAN : "#fff"} opacity=".92" />
              <text x={cx} y="196" textAnchor="middle" fill={INK}
                style={{ font: `600 18px ${SANS}`, transform: `rotate(${-angle}deg)`, transformOrigin: `${cx}px 190px`, transformBox: "view-box", transition }}>{id}</text>
            </g>
          ))}
          <circle cx="273" cy="190" r="9" fill={CYAN} />
        </g>
      </svg>
      {!reduced && (
        <div className="flex justify-end px-5 py-4" style={{ borderTop: `1px solid ${HAIR_DARK}` }}>
          <button type="button" onClick={() => setPlaying((p) => !p)} className="cursor-pointer px-3 py-2"
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,.35)", ...label("#fff") }}>
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── raw → ADR viewer ── */

function AdrViewer() {
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState<Zoomable | null>(null);
  const close = useCallback(() => setZoom(null), []);
  const s = ADR_STEPS[step];
  return (
    <>
      <div role="tablist" aria-label="ADR images" className="mt-9 flex flex-wrap gap-2">
        {ADR_STEPS.map((a, i) => {
          const on = i === step;
          return (
            <button key={a.src} role="tab" aria-selected={on} type="button" onClick={() => setStep(i)} className="cursor-pointer px-4 py-3"
              style={{ background: on ? CYAN : "transparent", color: on ? INK : "#fff", border: `1px solid ${on ? CYAN : "rgba(255,255,255,.35)"}`, transition: `all 200ms ${EASE}` }}>
              <span style={{ font: `600 13px/1 ${SANS}`, letterSpacing: ".06em" }}>0{i + 1}</span>
              <span className="ml-2.5" style={{ font: `500 14px/1 ${SANS}` }}>{a.step}</span>
            </button>
          );
        })}
      </div>
      <button type="button" onClick={() => setZoom(s)} aria-label={`Open at full resolution: ${s.label}`}
        className="relative mt-5 block w-full cursor-zoom-in border-0 p-0" style={{ background: WHITE, aspectRatio: "16 / 9" }}>
        {ADR_STEPS.map((a, i) => (
          <Image key={a.src} src={a.src} alt={a.alt} fill quality={92} sizes="(min-width:1330px) 1220px, 100vw"
            className="object-contain p-4 md:p-6" style={{ opacity: i === step ? 1 : 0, transition: `opacity 350ms ${EASE}` }} />
        ))}
        <ZoomIcon />
      </button>
      <Lightbox shot={zoom} onClose={close} />
    </>
  );
}

export default function MqsPrism() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── the studio photo is already on black, so it carries the
          dark hero without the duotone treatment MQX.tracE needs. */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: "#0A0F12" }}>
        <Image src="/assets/prod-prism-hero.jpg" alt="MQS.PRISM production radiography system with operator console, safety fencing and cast parts ready for inspection"
          fill priority quality={88} sizes="100vw" className="object-cover object-[70%_center]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.96) 0%,rgba(11,42,58,.84) 38%,rgba(11,42,58,.25) 75%,rgba(11,42,58,.10) 100%)" }} />
        <div className={`relative flex flex-col justify-end ${SHELL}`} style={{ zIndex: 3, minHeight: "clamp(560px,72vh,700px)", gap: 18, paddingTop: 120, paddingBottom: "clamp(48px,6vw,72px)" }}>
          <p style={eyebrow(CYAN)}>MQS.PRISM · Production Radiography Imaging System</p>
          <h1 className="max-w-[720px]" style={{ margin: 0, font: `600 clamp(30px,4.2vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
            Indigenous. High-Throughput. Zero-Defect Assurance.
          </h1>
          <p className="max-w-[600px]" style={lead("rgba(255,255,255,.84)")}>
            Built for manufacturers who demand speed, precision, and uncompromised quality.
          </p>
          <Badges items={BADGES} />
          <HeroActions />
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── overview (brief §1) + key benefits (§2) ── */}
      <Section id="benefits" tone="white">
        <div className="flex max-w-[78ch] flex-col gap-4">
          <p style={lead(BODY)}>
            MQS.PRISM is a fully automated, high-throughput 2D digital X-ray inspection system designed for continuous
            industrial use. Engineered for 24/7 production environments, PRISM can inspect over 1 million parts per year
            with high repeatability. Its swivel-based motion control, AI-enabled Automated Defect Recognition (ADR), and
            high-resolution imaging software deliver consistent, traceable, operator-independent inspections, compliant
            with ASTM E2422 standards.
          </p>
          <p style={body(BODY)}>
            Whether you&apos;re inspecting automotive castings or precision assemblies, PRISM delivers quality without
            compromise — backed by MQS&apos;s complete support ecosystem.
          </p>
        </div>
        <h2 className="mt-14" style={h2(INK)}>Key Benefits</h2>
        <BenefitGrid items={BENEFITS} />
      </Section>

      {/* ── highlights (§3), with highlight A animated ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/prod-prism-hero.jpg" aspect="2046 / 1151" items={HIGHLIGHTS}
          alt="MQS.PRISM inspection cabinet, operator console and safety fencing with lettered feature callouts" />
        <div className="mt-16">
          <SectionHead kicker="A" title="Swivel-Based Design" intro="Parallel scanning + loading reduces cycle time and increases throughput." />
          <SwivelCycle />
        </div>
      </Section>

      {/* ── highlight C, shown on the supplied images ── */}
      <Section id="adr" tone="ink">
        <SectionHead dark kicker="C" title="AI-Enabled ADR (ASTM E2422 Compliant)" intro="Consistent, objective defect recognition—reduces operator dependency." />
        <AdrViewer />
      </Section>

      {/* ── applications & industries (§4) ── */}
      <Section id="applications" tone="white">
        <SectionHead title="Applications & Industries" />
        <p className="mt-8" style={label(CYAN_ON_LIGHT)}>Typical Applications</p>
        <div className="mt-4"><TagList items={APPLICATIONS} /></div>
        <p className="mt-10" style={label(CYAN_ON_LIGHT)}>Industries Served</p>
        <div className="mt-4"><IndustryCards items={INDUSTRIES} /></div>
      </Section>

      {/* ── specs (§5) + why (§6) ── */}
      <Section id="specs" tone="page" ruled>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <SectionHead title="System Specifications" />
            <div className="mt-8"><SpecTable head={["Specification", "Value"]} rows={SPECS} /></div>
          </div>
          <div>
            <SectionHead title="Why Choose MQS.PRISM?" />
            <ul className="m-0 mt-8 list-none p-0" style={{ borderTop: `1px solid ${INK}` }}>
              {WHY.map((t) => (
                <li key={t} className="grid grid-cols-[28px_1fr] items-center gap-3 py-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
                  <span aria-hidden className="grid h-[22px] w-[22px] place-items-center" style={{ background: CYAN, color: INK }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><path d="M4 12l5 5L20 6" /></svg>
                  </span>
                  <span style={{ font: `500 16px/1.4 ${SANS}`, color: INK }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── downloadable materials (§7) + helpful links (§9) ── */}
      <Section id="downloads" tone="white">
        <DownloadsAndRelated
          downloadsTitle="Downloadable Materials"
          relatedTitle="Other MQS Solutions"
          downloads={[
            { name: "PRISM Brochure (PDF)", href: "/brochures/mqs-prism.pdf" },
            { name: "PRISM Demo Video", status: "Coming Soon" },
            { name: "ASTM E2422 Compliance Guide" },
          ]}
          related={[
            { name: "High Energy X-ray", href: "/products/high-energy-xray" },
            { name: "Inline Wheel Inspection", href: "/products/mqwr-160u" },
            { name: "CT System", href: "/products/mqx-neva" },
          ]}
        />
      </Section>
    </main>
  );
}
