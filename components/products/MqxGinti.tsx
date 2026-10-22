"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, CYAN, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, body, lead,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid, HotspotFigure, TagList,
  SpecTable, DownloadsAndRelated, Lightbox, ZoomIcon,
  type Hotspot, type Zoomable,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   MQX.gINti product page, /products/mqx-ginti/
   Copy is the client's "MQX.gINti.docx" brief (Downloads/Solutions 2/Ginti)
   and nothing else: headings are the brief's own section names and no
   explanatory copy has been added. Page pattern via solution-kit.tsx.

   One interactive piece: COUNT VIEWER steps through the supplied reel
   X-ray ("reel count.png") and the two counted results from
   "New ginti image.zip" (01005.PNG, 0201.PNG), under benefit 02's own copy.
   Tab names are image labels only.

   PENDING MQS SIGN-OFF:
   · The A to E highlight letters sat beside the product photo in the brief
     with no leader lines that survived export. A, B and E are pinned where
     the part is visible on the studio photo; C (barcode scanning zone) and
     D (safety interlocks / E-stop) cannot be located on it, so they are
     listed without a pin.
   · Industries: the brief lists applications only, so no industry cards.
   · Request a Demo uses the brief's own line and points at the contact form.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Key Benefits", "#benefits"], ["Highlights", "#highlights"], ["Counting", "#counting"],
  ["Technical Data", "#specs"], ["Applications", "#applications"], ["Downloads", "#downloads"],
];

const BADGES = ["AI-enabled", "AERB type-approved", "ERP/MES connectivity"];

const STATS: [string, string][] = [
  ["< 7 s", "Reel counting time"],
  ["> 99%", "Accuracy, including 01005"],
  ["400 mm", "Max reel diameter"],
  ["4 reels", "Per cycle (178 mm each)"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "Ultra-Fast Counting", "Counts reels in < 7 seconds, improving operator throughput."],
  ["02", "High Accuracy (Even 01005)", "Delivers > 99% accuracy even for ultra-small components."],
  ["03", "Industry 4.0 / Smart Integration Ready", "Supports ERP/MES connectivity, barcode scanning, label printing, and API-based automation."],
  ["04", "Plug & Play Operation", "Intuitive UI & minimal training, enabling users to get started quickly."],
  ["05", "Safe, Reliable, Maintenance-Free", "AERB type-approved with safety interlocks and emergency stop; sealed X-ray source for long service life."],
];

const HIGHLIGHTS: Hotspot[] = [
  { id: "A", title: "Touchscreen / UI Panel", desc: "Smart counting interface & quick operation.", at: [49.5, 50] },
  { id: "B", title: "X-ray Inspection Bay / Reel Tray", desc: "Ensures simultaneous reel counting.", at: [50, 71] },
  { id: "C", title: "Barcode Scanning Zone", desc: "Barcode integration." },
  { id: "D", title: "Safety Interlocks / E-stop", desc: "AERB safety & interlocks." },
  { id: "E", title: "Mobility / Castor Wheels", desc: "Easy handling on shop floor.", at: [30.4, 92.9] },
];

/* Step names are image labels only. Alt text describes what is visible. */
const COUNT_STEPS: (Zoomable & { step: string })[] = [
  { step: "Reel X-ray", src: "/assets/prod-ginti-reel-xray.jpg", w: 2000, h: 2000, label: "Reel X-ray image",
    alt: "X-ray image of an SMT component reel seen face-on, with each component on the wound tape visible as a dark square" },
  { step: "01005 count", src: "/assets/prod-ginti-count-01005.jpg", w: 662, h: 653, label: "01005 reel, counted",
    alt: "X-ray of a reel of 01005 components with each detected component marked and the count total shown at top left" },
  { step: "0201 count", src: "/assets/prod-ginti-count-0201.jpg", w: 651, h: 658, label: "0201 reel, counted",
    alt: "X-ray of a reel of 0201 components with each detected component marked and the count total shown at top left" },
];

const SPECS: string[][] = [
  ["Cycle Time / Accuracy", "< 7 seconds / > 99% (including 01005)"],
  ["Max Reel Diameter", "400 mm"],
  ["Max Reels per Cycle", "4 reels (178 mm each)"],
  ["Dimensions (W×D×H)", "950 × 1000 × 2100 mm"],
  ["System Weight", "~800 kg"],
  ["Compliance / Safety", "AERB type-approved + safety interlocks, emergency stop"],
];

const APPLICATIONS = [
  "SMT stores & inventory control",
  "Production line kitting and reconciliation",
  "Incoming material verification",
  "Line-side reel management",
];

/* ── reel X-ray → count viewer ── */

function CountViewer() {
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState<Zoomable | null>(null);
  const close = useCallback(() => setZoom(null), []);
  const s = COUNT_STEPS[step];
  return (
    <>
      <div role="tablist" aria-label="Reel counting images" className="mt-9 flex flex-wrap gap-2">
        {COUNT_STEPS.map((a, i) => {
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
        className="relative mx-auto mt-5 block w-full max-w-[720px] cursor-zoom-in border-0 p-0" style={{ background: "#BDBDBD", aspectRatio: "1 / 1" }}>
        {COUNT_STEPS.map((a, i) => (
          <Image key={a.src} src={a.src} alt={a.alt} fill quality={92} sizes="(min-width:768px) 720px, 100vw"
            className="object-contain" style={{ opacity: i === step ? 1 : 0, transition: `opacity 350ms ${EASE}` }} />
        ))}
        <ZoomIcon />
      </button>
      <p className="mx-auto mt-4 max-w-[720px]" style={label("rgba(255,255,255,.62)")}>{s.label}</p>
      <Lightbox shot={zoom} onClose={close} />
    </>
  );
}

export default function MqxGinti() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── the studio photo is a tall kiosk on white, so it sits in
          its own panel beside the copy instead of bleeding behind it. */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <div className={`relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 ${SHELL}`}
          style={{ paddingTop: 120, paddingBottom: "clamp(48px,6vw,72px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <p style={eyebrow(CYAN)}>MQX.gINti · X-Ray Component Counter</p>
            <h1 className="max-w-[720px]" style={{ margin: 0, font: `600 clamp(30px,4.2vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
              AI Enabled, High-Speed X-Ray Component Counter
            </h1>
            <p className="max-w-[600px]" style={lead("rgba(255,255,255,.84)")}>
              Plug &amp; Play Setup. Minimal Training. Accurate Even for 01005.
            </p>
            <Badges items={BADGES} />
            <HeroActions />
          </div>
          <div className="relative mx-auto w-full max-w-[420px]" style={{ background: WHITE, aspectRatio: "1086 / 1448" }}>
            <Image src="/assets/prod-ginti-kiosk.jpg" alt="MQX.gINti X-ray component counter: a grey floor-standing cabinet with touchscreen, reel tray slot and castor wheels"
              fill priority quality={88} sizes="(min-width:1024px) 420px, 90vw" className="object-contain" />
          </div>
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── overview + key benefits ── */}
      <Section id="benefits" tone="white">
        <p className="max-w-[78ch]" style={lead(BODY)}>
          MQX.gINti is an AI-enabled X-ray component counter built to deliver ultra-fast, accurate reel counting for SMT
          lines and stores. It counts reels in &lt; 7 seconds with &gt; 99% accuracy, even for 01005 components, helping
          reduce manual errors and improve inventory control.
        </p>
        <h2 className="mt-14" style={h2(INK)}>Key Benefits</h2>
        <BenefitGrid items={BENEFITS} />
      </Section>

      {/* ── product highlights ── */}
      <Section id="highlights" tone="page" ruled>
        <SectionHead title="Product Highlights" />
        <HotspotFigure src="/assets/prod-ginti-kiosk.jpg" aspect="1086 / 1448" fit="contain" ground={WHITE} items={HIGHLIGHTS}
          alt="MQX.gINti cabinet with lettered feature callouts on the touchscreen, reel tray and castor wheels" />
      </Section>

      {/* ── benefit 02, shown on the supplied X-ray images ── */}
      <Section id="counting" tone="ink">
        <SectionHead dark kicker="01005" title="High Accuracy (Even 01005)" intro="Delivers > 99% accuracy even for ultra-small components." />
        <CountViewer />
      </Section>

      {/* ── technical data ── */}
      <Section id="specs" tone="page">
        <SectionHead title="Technical Data" />
        <div className="mt-8 max-w-[860px]"><SpecTable head={["Parameter", "Specification"]} rows={SPECS} /></div>
      </Section>

      {/* ── applications ── */}
      <Section id="applications" tone="white">
        <SectionHead title="Applications" />
        <div className="mt-8"><TagList items={APPLICATIONS} /></div>
      </Section>

      {/* ── downloads & demo CTA ── */}
      <Section id="downloads" tone="page" ruled>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <DownloadsAndRelated downloadsTitle="Downloadable Materials"
            downloads={[{ name: "MQX.gINti Brochure (PDF)", href: "/brochures/mqx-ginti.pdf" }]} />
          <div>
            <h2 style={{ ...h2(INK), fontSize: "clamp(24px,2.4vw,32px)" }}>Request a Demo</h2>
            <p className="mt-7 max-w-[52ch] pt-5" style={{ ...body(BODY), borderTop: `1px solid ${INK}` }}>
              See how MQX.gINti can reduce counting time and improve inventory accuracy in your SMT operations.
            </p>
            <a href="#contact" className="mt-6 hover:!bg-[#0B2A3A] hover:!text-white"
              style={{ display: "inline-flex", alignItems: "center", height: 48, padding: "0 26px", background: CYAN, color: INK, textDecoration: "none", font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase" }}>
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
