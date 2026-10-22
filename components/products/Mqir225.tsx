"use client";

import { useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, CYAN, CYAN_ON_DARK, HAIR, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, body, lead, btnPrimary,
  useInViewOnce, useReducedMotion,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid, HotspotFigure,
  SpecTable, DownloadsAndRelated,
  type Hotspot,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   MQIR 225 X-Ray Irradiator — /products/mqir-225/
   Copy is the client's "MQIR 225 Irradiator.docx" brief
   (Downloads/Solutions 2/Irradiator) and nothing else: section headings are
   the brief's own, and no explanatory copy has been added. Page pattern via
   solution-kit.tsx.

   One interactive piece carries the brief's own figures:
   · DOSE OUTPUT toggles between the two "Dose Output (225kV, SSD 30cm)"
     values in the spec table (unfiltered / filtered). Nothing is
     extrapolated to other energies or distances.

   PENDING MQS SIGN-OFF:
   · The only image in the brief is the cabinet render, a lower-resolution
     copy of the catalogue image, so the catalogue file is reused.
   · The A–E highlight letters sat on that render in the brief. Only A (touch
     screen) and E (shielded cabinet) are visible from outside; B, C and D
     are inside the chamber, so they are listed without a pin.
   · Highlight C says "Programmable Motorized Sample Shelf", the overview says
     "adjustable sample shelf" and Accessories lists a "Programmable motorized
     rotator shelf" as an option. Confirm which is standard.
   · Section 7 (Request a Demo) is served by the hero button and the contact
     form below the page (no separate CTA band, as on the other product
     pages); its "other energies / custom chambers" line sits under
     Accessories & Options.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"], ["Dose Output", "#dose"],
  ["Technical Information", "#specs"], ["Accessories & Options", "#accessories"], ["Downloads", "#downloads"],
];

const BADGES = ["Up to 225 kV", "Up to 4500 W", "AERB-guideline shielding", "Stainless-steel chamber"];

const STATS: [string, string][] = [
  ["Up to 225 kV", "Nominal energy"],
  ["Up to 4500 W", "Maximum power"],
  ["≥ 12 Gy/min", "Dose output, unfiltered (225 kV, SSD 30 cm)"],
  ["≤ 0.1 mR/hr", "Certified low leakage"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "High Energy & Power for Reliable Dose Delivery", "Up to 225 kV energy and 4500 W maximum power for lab irradiation workflows."],
  ["02", "Precise Dose Control", "Optional internal dosimeter supports exact dose measurement and control."],
  ["03", "Configurable Beam Shaping", "Interchangeable beam conditioning filters along with adjustable beam collimator for controlled exposure field."],
  ["04", "User-Friendly Operation & Repeatability", "GUI-based touch screen, warm-up automation, and unlimited preset memories for multi-user labs."],
  ["05", "Safety-First, AERB-Ready Shielding", "Designed per AERB guidelines with certified low leakage ≤ 0.1 mR/hr and steel/lead/steel sandwich construction."],
];

/* The render is 1081 × 1455, shown contained in a square frame, so it spans
   x 12.85% → 87.15% of the frame. Pin x = 12.85 + 0.743 × image x. */
const HIGHLIGHTS: Hotspot[] = [
  { id: "A", title: "GUI Touchscreen Control Panel", desc: "Simple setup for kV, mA and time; faster operation with fewer errors.", at: [55, 42] },
  { id: "B", title: "Optional Internal Dosimeter", desc: "Enables accurate dose measurement and tighter control of irradiation protocols." },
  { id: "C", title: "Programmable Motorized Sample Shelf (SSD Control)", desc: "Adjustable shelf position helps optimize SSD and repeatability across experiments." },
  { id: "D", title: "Beam Conditioning Filters & Adjustable Collimator", desc: "Shape and control irradiation field (square/rectangular) with coincident light field for precise placement." },
  { id: "E", title: "Shielded Cabinet & Safety Features", desc: "Safe operation via warning lamp, X-ray ON alarm, key-activated door lock, and certified low leakage.", at: [31, 54] },
];

const SPECS: string[][] = [
  ["Nominal Energy", "Up to 225 kV"],
  ["Maximum Power", "Up to 4500 W"],
  ["Focal Spot (EN 12543)", "Small 1.2 mm, Large 5.5 mm"],
  ["Inherent Filtration", "2.0 mm Be"],
  ["Radiation Coverage", "40°"],
  ["Irradiation Chamber", "60 (H) × 42 (W) × 43 (D) cm, stainless steel"],
  ["Dose Output (225 kV, SSD 30 cm)", "≥ 12 Gy/min (unfiltered), ≥ 6 Gy/min (filtered)"],
  ["Exposure Settings", "5–225 kV, 0.1–30 mA, 1–99999 sec"],
  ["Power Requirement", "220 VAC ±10%, 50/60 Hz, single phase"],
  ["Safety/Shielding", "AERB-guideline design; low leakage ≤ 0.1 mR/hr; steel/lead/steel"],
];

const ACCESSORIES = [
  "Inbuilt CCTV for monitoring the specimen",
  "Programmable motorized rotator shelf",
  "Automatic adjustable collimator + additional circular collimators",
  "Restrainers/shielders for tumor targeting, autoclavable mouse disk, mouse pie cage",
  "Digital imaging system (optional)",
];

/* ── dose output ──
   The two values are the brief's minimums at 225 kV and SSD 30 cm. Bars are
   scaled to the unfiltered figure; no other values are implied. */

const DOSE: { key: string; name: string; gy: number }[] = [
  { key: "unfiltered", name: "Unfiltered", gy: 12 },
  { key: "filtered", name: "Filtered", gy: 6 },
];

function DoseOutput() {
  const reduced = useReducedMotion();
  const [ref, seen] = useInViewOnce<HTMLDivElement>(0.35);
  const [pick, setPick] = useState(0);
  const max = DOSE[0].gy;
  const cur = DOSE[pick];
  return (
    <div ref={ref} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
      <div>
        <div role="tablist" aria-label="Beam condition" className="inline-flex" style={{ border: `1px solid ${HAIR_DARK}` }}>
          {DOSE.map((d, i) => {
            const on = i === pick;
            return (
              <button key={d.key} role="tab" aria-selected={on} type="button" onClick={() => setPick(i)} className="cursor-pointer border-0 px-5 py-3"
                style={{ background: on ? CYAN : "transparent", color: on ? INK : "#fff", font: `500 14px/1 ${SANS}`, transition: `all 200ms ${EASE}` }}>
                {d.name}
              </button>
            );
          })}
        </div>
        <div className="mt-8" aria-live="polite">
          <div className="flex items-end gap-3">
            <span style={{ font: `600 clamp(52px,6vw,80px)/0.9 ${SANS}`, letterSpacing: "-.04em", color: "#fff" }}>≥ {cur.gy}</span>
            <span className="pb-1.5" style={label(CYAN_ON_DARK)}>Gy/min</span>
          </div>
          <p className="mt-4" style={body("rgba(255,255,255,.72)")}>{cur.name}, at 225 kV and SSD 30 cm.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center" style={{ borderTop: `1px solid ${HAIR_DARK}` }}>
        {DOSE.map((d, i) => {
          const on = i === pick;
          const w = seen || reduced ? (d.gy / max) * 100 : 0;
          return (
            <button key={d.key} type="button" onClick={() => setPick(i)} aria-pressed={on} className="block w-full cursor-pointer border-0 bg-transparent px-0 py-6 text-left"
              style={{ borderBottom: `1px solid ${HAIR_DARK}` }}>
              <span className="flex items-baseline justify-between gap-4">
                <span style={label(on ? CYAN_ON_DARK : "rgba(255,255,255,.62)")}>{d.name}</span>
                <span style={{ font: `600 18px/1 ${SANS}`, color: on ? "#fff" : "rgba(255,255,255,.62)" }}>≥ {d.gy} Gy/min</span>
              </span>
              <span className="mt-4 block h-3 w-full" style={{ background: "rgba(255,255,255,.08)" }}>
                <span className="block h-full" style={{
                  width: `${w}%`, background: on ? CYAN : "rgba(255,255,255,.32)",
                  transition: reduced ? "none" : `width 700ms ${EASE}, background 200ms ${EASE}`,
                }} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Mqir225() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── the render is on a light studio ground, so it sits in its
          own panel beside the copy (the MicrofocusXray split hero). */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <div className={`${SHELL} grid grid-cols-1 items-center gap-10 pb-12 pt-[120px] md:pb-16 md:pt-[132px] lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] lg:gap-14 lg:pb-[88px] lg:pt-[150px]`}>
          <div className="flex max-w-[640px] flex-col" style={{ gap: 18 }}>
            <p style={eyebrow(CYAN)}>MQIR 225 X-Ray Irradiator</p>
            <h1 style={{ margin: 0, font: `600 clamp(30px,4.2vw,56px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
              Lab-Grade X-ray Irradiation. Precise Dose Control. Built for Safety &amp; Speed.
            </h1>
            <p style={lead("rgba(255,255,255,.82)")}>
              MQIR Series X-ray Irradiators are designed to irradiate samples to the desired energy and dose in a standard
              laboratory environment.
            </p>
            <Badges items={BADGES} />
            <HeroActions />
          </div>
          <div className="relative mx-auto w-full max-w-[520px]" style={{ aspectRatio: "1081 / 1455", background: WHITE, border: `1px solid ${HAIR_DARK}` }}>
            <Image src="/assets/product-irradiator.png" alt="MQIR 225 X-ray irradiator cabinet with stack light, control screens, warning label and blue base on castors"
              fill priority quality={90} sizes="(min-width:1024px) 520px, 100vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── short description (brief §1) + key benefits (§2) ── */}
      <Section id="benefits" tone="white">
        <p className="max-w-[78ch]" style={lead(BODY)}>
          MQIR 225 combines a high-power X-ray generator and tube to deliver consistent dose output at a set energy with
          stability and accuracy comparable to industry-leading irradiators. The system is housed in a shielded cabinet
          meeting AERB safety standards, with adequate cooling to operate continuously for long duration. The
          stainless-steel irradiation chamber measures 60 cm (H) × 42 cm (W) × 43 cm (D) and includes an adjustable
          sample shelf to vary SSD.
        </p>
        <h2 className="mt-14" style={h2(INK)}>Key Benefits</h2>
        <BenefitGrid items={BENEFITS} />
      </Section>

      {/* ── product highlights (§3) ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/product-irradiator.png" aspect="1 / 1" fit="contain" ground={WHITE} items={HIGHLIGHTS}
          alt="MQIR 225 X-ray irradiator cabinet with lettered callouts on the touchscreen control panel and the shielded cabinet" />
      </Section>

      {/* ── dose output, the spec table's two values ── */}
      <Section id="dose" tone="ink">
        <SectionHead dark title="Dose Output" intro="At 225 kV and SSD 30 cm." />
        <DoseOutput />
      </Section>

      {/* ── technical information (§4) ── */}
      <Section id="specs" tone="page" ruled>
        <SectionHead title="Technical Information" />
        <div className="mt-8 max-w-[900px]"><SpecTable title="System Specifications" head={["Parameter", "Specification"]} rows={SPECS} /></div>
      </Section>

      {/* ── accessories & options (§5) + the §7 question ── */}
      <Section id="accessories" tone="white">
        <SectionHead title="Accessories & Options" />
        <ul className="m-0 mt-8 max-w-[900px] list-none p-0" style={{ borderTop: `1px solid ${INK}` }}>
          {ACCESSORIES.map((t) => (
            <li key={t} className="grid grid-cols-[28px_1fr] items-center gap-3 py-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <span aria-hidden className="grid h-[22px] w-[22px] place-items-center" style={{ background: CYAN, color: INK }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><path d="M4 12l5 5L20 6" /></svg>
              </span>
              <span style={{ font: `500 16px/1.4 ${SANS}`, color: INK }}>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex max-w-[900px] flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8" style={{ background: PAGE, border: `1px solid ${HAIR}` }}>
          <p style={{ ...body(INK), fontWeight: 500 }}>Need irradiators of other energies (20–450 kV) or chambers of custom sizes?</p>
          <a href="#contact" style={btnPrimary} className="shrink-0 hover:!bg-[#0B2A3A] hover:!text-white">Talk to an Expert</a>
        </div>
      </Section>

      {/* ── downloadable resources (§6) ── */}
      <Section id="downloads" tone="page" ruled>
        <DownloadsAndRelated downloadsTitle="Downloadable Resources"
          downloads={[{ name: "MQIR 225 Irradiator Datasheet (PDF)", href: "/brochures/mqir-225-irradiator.pdf" }]} />
      </Section>
    </main>
  );
}
