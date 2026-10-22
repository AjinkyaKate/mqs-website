"use client";

import { useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, MUTED, CYAN, CYAN_ON_LIGHT, CYAN_ON_DARK, HAIR, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, h3, body, lead, btnPrimary,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid, HotspotFigure, TagList,
  SpecTable, DownloadsAndRelated,
  type Hotspot,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   Fuze Inspection Systems — /products/fuze-inspection/
   Copy is the client's "Fuze Inspection Systems.docx" brief
   (Downloads/Solutions 2/Fuze Inspection) and nothing else. Section
   headings are the brief's own; no explanatory copy has been added.
   Page pattern via solution-kit.tsx.

   One interactive piece: IMAGING CHAIN lets a visitor pick one X-ray
   source and one detector from the brief's two tables (highlight D,
   "Configurable Imaging Chain"). It only reads rows from SOURCES and
   DETECTORS; it does not claim any pairing is or is not compatible.

   PENDING MQS SIGN-OFF:
   · NAMING. The brief says "Fuze Inspection Systems"; the catalogue card
     says "Fuze Inspection Solutions". The page leads with the brief's name.
   · HIGHLIGHTS. The brief lists A, B, D and E headings; the C heading is
     missing, and A and B carry no "Advantage" line. The orphan advantage
     ("Preset workflows support automated inspections...") is shown as C,
     titled with Key Benefit 03's wording. A and B reuse the brief's own
     short-description sentences.
   · The A–E letters sat on the brief's photo (MEDEQUIP-branded), as
     floating labels whose positions did not survive export, so no pins
     are placed on the photograph; the list carries the highlights.
   · DETECTOR NAMES. "MQXRD 0822 XX" is listed with a 200 × 200 mm active
     area and "MQXRD 1621 XX" with 400 × 400 mm; the model numbers suggest
     other sizes. Shown as supplied.
   · "Multi-model hand grenades" is quoted as written (possibly
     "multi-mode").
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"],
  ["Imaging Chain", "#imaging-chain"], ["Technical Information", "#specs"], ["Applications", "#applications"],
  ["Downloads", "#downloads"],
];

const BADGES = ["Indigenous", "Electronic + mechanical fuzes", "Optional swivel mechanism", "AERB-aligned"];

const STATS: [string, string][] = [
  ["Over a decade", "Oldest system still in operation"],
  ["160 – 450 kV", "X-ray source options"],
  ["100%", "Source duty cycle"],
  ["4", "Flat panel detector options"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "Higher throughput with swivel-based automation", "Faster cycle time for large-volume inspection."],
  ["02", "Supports electronic + mechanical fuze inspection", "One platform designed for diverse fuze types."],
  ["03", "Repeatable inspection with preset programs", "Automation-friendly setups reduce operator dependency."],
  ["04", "Flexible source + detector configurations", "Choose the right kV and detector based on fuze geometry and density."],
  ["05", "Built for defence environments & long-life performance", "Proven track record with systems running successfully for years."],
];

const HIGHLIGHTS: Hotspot[] = [
  { id: "A", title: "Custom-built Fuze Inspection Platform", desc: "Custom-built indigenous fuze inspection systems designed to perform digital radiography of electronic and mechanical fuzes." },
  { id: "B", title: "Swivel Mechanism (optional configuration)", desc: "A highly reliable swivel mechanism that significantly improves cycle time and productivity." },
  { id: "C", title: "Repeatable inspection with preset programs", desc: "Preset workflows support automated inspections and repeatable outcomes." },
  { id: "D", title: "Configurable Imaging Chain (Source + Detector options)", desc: "Match penetration and image clarity to your fuze type and inspection requirement." },
  { id: "E", title: "Compliance-Ready Safety & Shielding (AERB-aligned)", desc: "Safer operation with controlled leakage and interlock logic, supporting audits and regulated environments." },
];

/* ── technical information (brief §4), verbatim apart from unit spacing ── */

const SOURCE_HEAD = ["X-ray Source", "Focal Spot", "Tube Type", "Power", "Analysis", "Duty Cycle"];
const SOURCES: string[][] = [
  ["MQXR 160", "0.4 mm & 1 mm", "Mini focus", "800 W / 1800 W", "2D/CT", "100%"],
  ["MQXR 225", "1 mm & 5.5 mm", "Mini focus", "640 W / 3000 W", "2D/CT", "100%"],
  ["MQXR 320", "0.4 mm & 1 mm / 3 mm & 5.5 mm", "Mini focus", "800 W / 1800 W / 1500 W / 4200 W", "2D/CT", "100%"],
  ["MQXR 450", "0.4 mm & 1 mm / 2.5 mm & 5.5 mm", "Mini focus", "800 W / 1800 W / 900 W / 4500 W", "2D/CT", "100%"],
];

const DETECTOR_HEAD = ["Detector", "X-ray Range", "Pixel Size", "Active Area", "Frame Rate"];
const DETECTORS: string[][] = [
  ["MQXRD 0822 XX", "0–16 MeV", "200 µm", "200 × 200 mm", "25 fps (1×1), 50 fps (2×2)"],
  ["MQXRD 3025 XX", "0–450 kV", "139 µm", "250 × 300 mm", "5.5 fps (1×1), 11 fps (2×2)"],
  ["MQXRD 1621 XX", "0–16 MeV", "200 µm", "400 × 400 mm", "15 fps (1×1), 30 fps (2×2)"],
  ["MQXRD 4343N XX", "0–450 kV", "150 µm", "432 × 432 mm", "15 fps (1×1), 30 fps (2×2)"],
];

const APPLICATIONS = ["Artillery fuzes", "Multi-model hand grenades"];

/* ── imaging chain picker (highlight D) ── */

function Picker({ title, head, rows, active, onPick }: {
  title: string; head: string[]; rows: string[][]; active: number; onPick: (i: number) => void;
}) {
  const row = rows[active];
  return (
    <div className="flex flex-col" style={{ background: INK }}>
      <div className="px-6 pt-6 md:px-7 md:pt-7">
        <p style={label(CYAN_ON_DARK)}>{title}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {rows.map((r, i) => {
            const on = i === active;
            return (
              <button key={r[0]} type="button" aria-pressed={on} onClick={() => onPick(i)}
                className="cursor-pointer px-3.5 py-3 text-left"
                style={{
                  background: on ? CYAN : "transparent", color: on ? INK : "#fff",
                  border: `1px solid ${on ? CYAN : "rgba(255,255,255,.30)"}`,
                  font: `600 14px/1.2 ${SANS}`, transition: `all 200ms ${EASE}`,
                }}>
                {r[0]}
              </button>
            );
          })}
        </div>
      </div>
      <dl className="m-0 mt-6 px-6 pb-6 md:px-7 md:pb-7" aria-live="polite">
        {head.slice(1).map((k, i) => (
          <div key={k} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3" style={{ borderTop: `1px solid ${HAIR_DARK}` }}>
            <dt style={label("rgba(255,255,255,.62)")}>{k}</dt>
            <dd className="m-0" style={{ ...body("#fff"), fontSize: 15 }}>{row[i + 1]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ImagingChain() {
  const [src, setSrc] = useState(0);
  const [det, setDet] = useState(0);
  return (
    <div className="mt-9">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4" style={{ border: `1px solid ${HAIR_DARK}`, borderBottom: 0 }}>
        <span style={label("rgba(255,255,255,.62)")}>Your configuration</span>
        <span style={{ font: `600 16px/1.3 ${SANS}`, color: "#fff" }}>
          {SOURCES[src][0]} <span aria-hidden style={{ color: CYAN_ON_DARK }}>+</span> {DETECTORS[det][0]}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 1, background: HAIR_DARK, border: `1px solid ${HAIR_DARK}` }}>
        <Picker title="X-ray source" head={SOURCE_HEAD} rows={SOURCES} active={src} onPick={setSrc} />
        <Picker title="Flat panel detector (DFPD)" head={DETECTOR_HEAD} rows={DETECTORS} active={det} onPick={setDet} />
      </div>
      <p className="mt-4" style={{ ...body("rgba(255,255,255,.62)"), fontSize: 13 }}>
        Cabinet &amp; manipulator customizable as per user requirement.
      </p>
    </div>
  );
}

export default function FuzeInspection() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── split layout: the studio photo is on a light ground, so it
          sits as a framed object beside the copy rather than as a backdrop. */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <div className={`${SHELL} grid grid-cols-1 items-center gap-10 pb-12 pt-[120px] md:pb-16 md:pt-[132px] lg:grid-cols-[minmax(0,1fr)_minmax(0,.85fr)] lg:gap-14 lg:pb-[88px] lg:pt-[150px]`}>
          <div className="flex max-w-[640px] flex-col" style={{ gap: 18 }}>
            <p style={eyebrow(CYAN)}>Fuze Inspection Systems</p>
            <h1 style={{ margin: 0, font: `600 clamp(30px,4.2vw,56px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
              High-Throughput Digital Radiography for Defence-Grade Fuze QA
            </h1>
            <p style={lead("rgba(255,255,255,.82)")}>
              Custom-built indigenous fuze inspection systems for digital radiography of electronic and mechanical fuzes.
            </p>
            <Badges items={BADGES} />
            <HeroActions />
          </div>
          <div className="relative" style={{ aspectRatio: "1 / 1", border: `1px solid ${HAIR_DARK}`, background: "#EEF1F4" }}>
            <Image src="/assets/prod-fuze-qx-cabinet.jpg" alt="MQS QX Cabinet fuze inspection system with two monitors, emergency stop and fuzes on the loading platform"
              fill priority quality={90} sizes="(min-width:1024px) 44vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── short description (brief §1) + key benefits (§2) ── */}
      <Section id="benefits" tone="white">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="flex max-w-[70ch] flex-col gap-4">
            <p style={lead(BODY)}>
              MQS Technologies has developed a range of custom-built indigenous fuze inspection systems designed to
              perform digital radiography of electronic and mechanical fuzes. Some configurations include a highly
              reliable swivel mechanism that significantly improves cycle time and productivity.
            </p>
            <p style={body(BODY)}>
              MQS&apos;s oldest fuze inspection system, supplied over a decade ago, continues to operate successfully,
              inspecting fuzes in a highly automated manner.
            </p>
          </div>
          <div className="relative" style={{ aspectRatio: "1400 / 1123", background: WHITE, border: `1px solid ${HAIR}` }}>
            <Image src="/assets/prod-fuze-conveyor-cabinet.jpg" alt="Shielded fuze inspection cabinet with double doors and roller conveyors carrying fuze trays on either side"
              fill quality={88} sizes="(min-width:1024px) 40vw, 100vw" className="object-contain" />
          </div>
        </div>
        <h2 className="mt-14" style={h2(INK)}>Key Benefits</h2>
        <BenefitGrid items={BENEFITS} />
      </Section>

      {/* ── product highlights (§3) ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/prod-fuze-qx-cabinet.jpg" aspect="1 / 1" ground="#EEF1F4" items={HIGHLIGHTS}
          alt="MQS QX Cabinet fuze inspection system" />
      </Section>

      {/* ── highlight D, as a source + detector picker ── */}
      <Section id="imaging-chain" tone="ink">
        <SectionHead dark kicker="D" title="Configurable Imaging Chain" intro={HIGHLIGHTS[3].desc} />
        <ImagingChain />
      </Section>

      {/* ── technical information (§4) ── */}
      <Section id="specs" tone="white">
        <SectionHead title="Technical Information" />
        <div className="mt-8 flex flex-col gap-12">
          <div>
            <SpecTable title="X-ray Source Options" head={SOURCE_HEAD} rows={SOURCES} />
            <p className="mt-4" style={{ ...body(MUTED), fontSize: 14 }}>Cabinet &amp; manipulator customizable as per user requirement.</p>
          </div>
          <SpecTable title="Flat Panel Detector (DFPD) Options" head={DETECTOR_HEAD} rows={DETECTORS} />
        </div>
      </Section>

      {/* ── applications (§5) ── */}
      <Section id="applications" tone="page" ruled>
        <SectionHead title="Applications" />
        <p className="mt-8" style={label(CYAN_ON_LIGHT)}>Suitable product range for inspection of</p>
        <div className="mt-4"><TagList items={APPLICATIONS} /></div>
      </Section>

      {/* ── downloadable resources (§6) + request a demo (§7) ── */}
      <Section id="downloads" tone="white">
        <DownloadsAndRelated
          downloadsTitle="Downloadable Resources"
          downloads={[{ name: "Fuze Inspection Systems Brochure (PDF)", href: "/brochures/fuze-inspection-system.pdf" }]}
          related={[{ name: "Defence", note: "Industry page", href: "/industries/defence" }]}
        />
        <div className="mt-14 flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8" style={{ background: PAGE, border: `1px solid ${HAIR}` }}>
          <h3 className="max-w-[56ch]" style={{ ...h3(INK), fontSize: 20 }}>
            Want a fuze inspection workflow customized to your calibre, cycle time, and compliance needs?
          </h3>
          <div className="flex shrink-0 flex-wrap" style={{ gap: 12 }}>
            <a href="#contact" style={btnPrimary} className="hover:!bg-[#0B2A3A] hover:!text-white">Request a Demo</a>
            <a href="/contact" className="hover:!bg-[#EAF6FB]" style={{ ...btnPrimary, background: "transparent", border: `1px solid ${INK}` }}>Talk to an Expert</a>
          </div>
        </div>
      </Section>
    </main>
  );
}
