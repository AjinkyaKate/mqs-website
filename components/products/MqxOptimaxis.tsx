"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, CYAN, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, h2, body, lead,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid, HotspotFigure,
  SpecTable, DownloadsAndRelated, Lightbox, ZoomIcon,
  type Hotspot, type Zoomable,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   MQX.OptimaXis product page: /products/mqx-optimaxis/
   Copy is the client's "Optimaxis.docx" brief (Downloads/Solutions 2/
   OptimaXis) and nothing else: section headings are the brief's own, and no
   explanatory copy has been added. Page pattern via solution-kit.tsx.

   One interactive piece: a sample viewer for the four radiographs supplied
   with the brief (1-4.tiff), placed under highlight A, whose copy is about
   imaging. The images carry neutral labels only: the brief does not say
   what part each one is or which defects it shows.

   PENDING MQS SIGN-OFF:
   · The A-E highlight letters sat on a diagram that did not survive export,
     so the pins are placed on the supplied product photograph.
   · The brief has no Applications, Industries or "Why choose" section, and
     no demo video, so those sections are not on this page.
   · Section 6 (Request a Demo / Talk to an Expert) is served by the hero
     button and the contact form below the page, as on the other pages.
   · The catalogue card describes OptimaXis as "for small-batch electronics
     and precision machined parts"; the brief positions it for aluminium and
     light-alloy castings. The brief is followed here.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"], ["Sample Images", "#samples"],
  ["Technical Information", "#specs"], ["Downloads", "#downloads"],
];

const BADGES = ["AERB-compliant safety", "ASTM E2422 aligned", "Upgrade-ready"];

const STATS: [string, string][] = [
  ["160–200 kV", "Monoblock X-ray tube"],
  ["~700×700×800 mm", "Max sample size"],
  ["Up to ~50 kg", "Max sample weight"],
  ["< 0.1 mSv/hr", "Cabinet shielding"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "Bring Inspection In-House", "Reduce dependency on external labs, shorten inspection cycles, and improve delivery timelines."],
  ["02", "Clear Imaging for Everyday Manufacturing", "High-performance imaging enables clear visualization of internal defects in aluminium and light-alloy parts."],
  ["03", "Compact and Easy to Operate", "Fits on standard shop floors with simple joystick/touchscreen-style controls and minimal operator training."],
  ["04", "Safe, Compliant Operation", "AERB-compliant shielding, door interlocks, and emergency stop protection built in for safe use."],
  ["05", "Upgradeable for Future Needs", "Designed to be upgrade-ready for future CT capability or higher kV configurations as requirements grow."],
];

const HIGHLIGHTS: Hotspot[] = [
  { id: "A", title: "High-Performance Imaging Platform", desc: "Detects common casting defects like porosity, gas holes, and shrinkage cavities with high clarity.", at: [82, 55] },
  { id: "B", title: "Compact Footprint, Shop-Floor Friendly", desc: "Easy to deploy for MSMEs and small foundries without infrastructure overhaul.", at: [57, 83] },
  { id: "C", title: "MQS Imaging Suite (MIS) Software", desc: "Faster, smarter inspections with enhancement tools, defect detection, measurement, and batch comparisons.", at: [61, 52] },
  { id: "D", title: "Recipe-Based GUI & Simple Controls", desc: "Minimal operator training; consistent results using pre-set inspection routines.", at: [68, 64] },
  { id: "E", title: "AERB-Compliant Safety Package", desc: "Safer use with interlocks and shielding, aligned to international DR inspection standards like ASTM E2422.", at: [70, 28] },
];

/* Labels are neutral on purpose: the brief supplies the images without
   saying what each part is. Alt text describes only what is visible. */
const SAMPLES: (Zoomable & { tab: string })[] = [
  { tab: "Sample 01", src: "/assets/prod-optimaxis-sample-1.jpg", w: 2000, h: 2000, label: "Sample radiograph 01", alt: "Digital X-ray radiograph of a cast housing with intersecting bores and internal passages" },
  { tab: "Sample 02", src: "/assets/prod-optimaxis-sample-2.jpg", w: 2000, h: 2000, label: "Sample radiograph 02", alt: "Digital X-ray radiograph of a round cast cover with a central hole and moulded markings" },
  { tab: "Sample 03", src: "/assets/prod-optimaxis-sample-3.jpg", w: 2000, h: 2000, label: "Sample radiograph 03", alt: "Digital X-ray radiograph of a cast bracket with two large and three small bores" },
  { tab: "Sample 04", src: "/assets/prod-optimaxis-sample-4.jpg", w: 2000, h: 2000, label: "Sample radiograph 04", alt: "Digital X-ray radiograph of three cast test bars side by side" },
];

const SPECS: string[][] = [
  ["X-ray Tube", "Monoblock, 160–200 kV"],
  ["Detector", "8″ / 9″ / 17″, pixel pitch 140–200 µm"],
  ["Manipulator Travel", "650×650×900 mm, tilt ±45°, rotation 360°"],
  ["Max Sample Size", "~700×700×800 mm"],
  ["Max Sample Weight", "Up to ~50 kg"],
  ["Control", "CNC / Joystick / GUI"],
  ["Cabinet Shielding", "< 0.1 mSv/hr"],
  ["Compliance", "ASTM E2422 aligned (digital radiographic inspection)"],
];

/* ── sample radiograph viewer ── */

function SampleViewer() {
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState<Zoomable | null>(null);
  const close = useCallback(() => setZoom(null), []);
  const s = SAMPLES[step];
  return (
    <>
      <div role="tablist" aria-label="Sample radiographs" className="mt-9 flex flex-wrap gap-2">
        {SAMPLES.map((a, i) => {
          const on = i === step;
          return (
            <button key={a.src} role="tab" aria-selected={on} type="button" onClick={() => setStep(i)} className="cursor-pointer px-4 py-3"
              style={{ background: on ? CYAN : "transparent", color: on ? INK : "#fff", border: `1px solid ${on ? CYAN : "rgba(255,255,255,.35)"}`, transition: `all 200ms ${EASE}` }}>
              <span style={{ font: `500 14px/1 ${SANS}` }}>{a.tab}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_160px]">
        <button type="button" onClick={() => setZoom(s)} aria-label={`Open at full resolution: ${s.label}`}
          className="relative block w-full cursor-zoom-in border-0 p-0" style={{ background: WHITE, aspectRatio: "16 / 10" }}>
          {SAMPLES.map((a, i) => (
            <Image key={a.src} src={a.src} alt={a.alt} fill quality={92} sizes="(min-width:1330px) 1040px, 100vw"
              className="object-contain p-3 md:p-5" style={{ opacity: i === step ? 1 : 0, transition: `opacity 350ms ${EASE}` }} />
          ))}
          <ZoomIcon />
        </button>
        <div className="grid grid-cols-4 gap-2 md:grid-cols-1 md:content-start">
          {SAMPLES.map((a, i) => (
            <button key={a.src} type="button" onClick={() => setStep(i)} aria-label={`Show ${a.label}`}
              className="relative block cursor-pointer p-0" style={{ background: WHITE, aspectRatio: "1 / 1", border: `2px solid ${i === step ? CYAN : HAIR_DARK}`, transition: `border-color 200ms ${EASE}` }}>
              <Image src={a.src} alt="" fill sizes="160px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      </div>
      <Lightbox shot={zoom} onClose={close} />
    </>
  );
}

export default function MqxOptimaxis() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── portrait shop-floor photo beside the copy, the
          MicrofocusXray.tsx split layout. */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <div className={`${SHELL} grid grid-cols-1 items-center gap-10 pb-12 pt-[120px] md:pb-16 md:pt-[132px] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] lg:gap-14 lg:pb-[88px] lg:pt-[150px]`}>
          <div className="flex max-w-[640px] flex-col" style={{ gap: 18 }}>
            <p style={eyebrow(CYAN)}>MQX.OptimaXis · Digital 2D X-ray Inspection System</p>
            <h1 style={{ margin: 0, font: `600 clamp(30px,4.2vw,56px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
              Bring X-ray inspection in-house. Build customer trust.
            </h1>
            <p style={lead("rgba(255,255,255,.82)")}>
              MQX.OptimaXis is an affordable, dependable digital 2D X-ray inspection system designed for small and
              mid-sized manufacturers who want faster inspection, lower costs, and higher customer confidence.
            </p>
            <Badges items={BADGES} />
            <HeroActions />
          </div>
          <div className="relative mx-auto w-full max-w-[460px]" style={{ aspectRatio: "4 / 5", border: `1px solid ${HAIR_DARK}`, background: "#1A1D20" }}>
            <Image src="/assets/prod-optimaxis-hero.jpg" alt="MQX.OptimaXis X-ray inspection cabinet on a shop floor, with operator console and the inspection bay open"
              fill priority quality={90} sizes="(min-width:1024px) 460px, 100vw" className="object-cover object-[center_45%]" />
          </div>
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── overview (brief §1) + key benefits (§2) ── */}
      <Section id="benefits" tone="white">
        <div className="flex max-w-[78ch] flex-col gap-4">
          <p style={lead(BODY)}>
            Instead of depending on outside labs and waiting for reports, OptimaXis helps you start in-house radiographic
            inspection by reducing turnaround time and making quality visible right on the shop floor.
          </p>
          <p style={body(BODY)}>
            Built on MQS&apos;s proven expertise, it is safe, reliable, and easy to use, making it ideal for manufacturers
            taking their first step toward in-house quality control.
          </p>
        </div>
        <h2 className="mt-14" style={h2(INK)}>Key Benefits</h2>
        <BenefitGrid items={BENEFITS} />
      </Section>

      {/* ── product highlights (§3) ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/prod-optimaxis-system.jpg" aspect="1565 / 2000" items={HIGHLIGHTS} fit="contain" ground={WHITE}
          alt="MQX.OptimaXis inspection cabinet with operator console, monitor and open inspection bay, with lettered feature callouts" />
      </Section>

      {/* ── highlight A, shown on the supplied sample radiographs ── */}
      <Section id="samples" tone="ink">
        <SectionHead dark kicker="A" title="High-Performance Imaging Platform"
          intro="Detects common casting defects like porosity, gas holes, and shrinkage cavities with high clarity." />
        <SampleViewer />
      </Section>

      {/* ── technical information (§4) ── */}
      <Section id="specs" tone="page" ruled>
        <div className="max-w-[860px]">
          <SectionHead title="Technical Information" />
          <div className="mt-8"><SpecTable head={["Parameter", "Specification"]} rows={SPECS} /></div>
        </div>
      </Section>

      {/* ── download & demo (§6); the demo CTA is the hero button and the
          contact form below ── */}
      <Section id="downloads" tone="white">
        <DownloadsAndRelated
          downloadsTitle="Download Brochure"
          downloads={[
            { name: "OptimaXis Brochure (PDF)", href: "/brochures/mqx-optimaxis.pdf" },
          ]}
        />
      </Section>
    </main>
  );
}
