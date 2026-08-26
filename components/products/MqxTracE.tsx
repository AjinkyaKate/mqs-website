"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   MQX.tracE product page — /products/mqx-trace/
   Built from the client's "MQX.tracE — Product Page Content & Assets"
   brief, following the product-page pattern of MqxcSeries.tsx and
   MqctSeries.tsx. Site header, footer and ContactSection come from the
   route wrapper.

   The page covers TWO variants, and the brief is emphatic that the split
   must be explicit early, because a visitor who misses it will read
   contradictory specifications further down and lose confidence. Hence the
   comparison table immediately under the hero, and two separate spec tables.

   The defect gallery has a lightbox, which the brief asks for twice: solder
   void detail is lost at thumbnail size. Its tiles are laid out in justified
   rows sized from each image's own aspect ratio, so nothing is cropped, nothing
   is letterboxed, and nothing is painted above native resolution.

   PENDING MQS SIGN-OFF, all raised by the brief itself:
   · The 7,500x magnification figure is the CT variant's total magnification;
     the 2.5D variant reaches about 7,000x. The hero badge is qualified here
     rather than implying both, per the brief's own instruction.
   · The 2.5D variant lists a 6-axis manipulator and the CT variant 5-axis.
     Confirm, since the CT variant would normally have equal or more axes.
   · "India's first indigenous 2.5D PCB X-ray inspection system" is a strong
     claim. Confirm it can be substantiated if a competitor challenges it.
   · Both variants quote AERB compliance but only the 2.5D is described as
     type-approved, while the hero badge covers both.
   · Resolution here is quoted as JIMA (0.9 and 0.75 um), which is a different
     measure from the detector pixel pitch quoted on the MQXC and MQCT pages.
     Every resolution figure across the site should state its basis.
   · GALLERY COVERAGE. The six captures MQS supplied are two PTH frames, two
     views of one QFP and two of one board. The brief lists BGAs, QFNs, QFPs and
     PTH as the defect types the system finds, so a QFN and a BGA close-up are
     named in the copy but no longer shown. Worth asking for one of each; the
     row arithmetic takes any aspect ratio, so adding two is a data change.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const CYAN = "#16C1F3", CYAN_ON_LIGHT = "#0A6A88";
const HAIR = "#D3DFE7";
const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const SANS = "var(--font-sans)";

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Variants", "#variants"], ["2.5D", "#benefits"],
  ["Highlights", "#highlights"], ["CT", "#ct"], ["Gallery", "#gallery"],
  ["Specs", "#specs"],
];

/* The brief's fourth badge is qualified: 7,500x is the CT variant only. */
const BADGES = [
  "India's first indigenous 2.5D system",
  "2D and 3D CT in one platform",
  "AERB type-approved",
  "Up to 7,500× (CT variant)",
];

const VARIANTS: [string, string, string][] = [
  ["MQX.tracE · 2.5D", "High-magnification 2D X-ray with oblique viewing", "You need to screen boards fast and catch known defect types"],
  ["MQX.tracE CT · 3D", "Adds CT slicing and reconstruction", "Overlap makes 2D ambiguous, or you need evidence-ready failure analysis"],
];

const BENEFITS_2D: [string, string, string][] = [
  ["01", "Micron-level defect detection", "For BGAs, QFNs, QFPs and PTH solder joints, defects measured in microns rather than millimetres."],
  ["02", "AI-powered software", "Standardized inspection and faster reporting, with less operator subjectivity."],
  ["03", "High-throughput ready", "Macros and batch inspection to scan boards in sequence."],
  ["04", "Large inspection coverage", "Very high magnification across dense assemblies."],
  ["05", "AERB-certified safety", "Leakage radiation below 1 µSv/hr for operator-safe use."],
];

const HIGHLIGHTS: [string, string, string][] = [
  ["1", "CT-ready shielded enclosure", "Safe 2D and CT workflows in a single platform, with no protective clothing required."],
  ["2", "Precision multi-axis manipulator", "Accurate CT acquisition with 360° rotation and wide tilt for alignment."],
  ["3", "Operator control console", "Joystick and mouse navigation with quick zoom, giving a faster operator learning curve."],
  ["4", "Inspection and analysis software suite", "Filters, measurements, annotations, automatic report generation and layer analysis for full traceability."],
  ["5", "Safety systems", "Door interlocks, emergency stop and caution light, enforcing automatic X-ray shutoff."],
];
const HIGHLIGHT_POSITIONS: [number, number][] = [
  [26, 35], // shielded inspection enclosure
  [21, 53], // manipulator visible through the viewing window
  [59, 57], // operator console and physical controls
  [56, 43], // inspection and analysis software on screen
  [44, 62], // emergency stop and safety controls
];

const WORKFLOW = ["Acquire (2D)", "Slice (CT)", "Analyze", "Report"];

const BENEFITS_CT: [string, string, string][] = [
  ["01", "Layer-by-layer CT visibility", "Separate overlapping features and reduce escapes."],
  ["02", "Faster failure analysis and R&D cycles", "Evidence-ready slices with no physical sectioning."],
  ["03", "Standardized inspection workflows", "Manual, semi-automatic and automatic modes, plus macros."],
  ["04", "Advanced measurement tools", "Package and semiconductor analysis with pass/fail support."],
  ["05", "Safe, compliant operation", "Radiation safety below 1 µSv/hr at the cabinet surface."],
];

type Shot = { src: string; w: number; h: number; label: string; note: string; alt: string };

/* Justified rows, the shape a mixed-aspect set actually wants.

   These six run from 0.81 to 1.83 in aspect, so no single tile shape works: a
   square tile with contain would leave the PTH capture filling 55% of its box
   while the near-square packages filled 97%. The grid would read as ragged for
   a reason that had nothing to do with the content.

   Each row sizes its tiles' widths in proportion to their aspect ratios, so
   every tile in a row shares one height and the row fills the measure exactly.
   Tile aspect equals image aspect, so nothing is letterboxed and nothing is
   cropped. Row 1 sums to 4.103 and row 2 to 2.877, giving 292px and 417px
   at the 1330 shell, and every image paints at roughly a third of its native
   width, so none is upscaled.

   The images arrive as cut-outs on transparency with 7 to 23% empty margin, so
   each is trimmed to its alpha bounding box and flattened onto #06161F, the
   tile ground below. Untrimmed margin would put the dead space straight back.

   Order pairs each subject with its companion in reading order: the two PTH
   frames, then the two views of the same QFP, then the two of the same board.
   The PTH pair in particular has to stay adjacent, as the brief requires: they
   are the same joints, first imaged then measured, and the second only means
   anything beside the first. */
const GALLERY_ROWS: Shot[][] = [
  [
    { src: "/assets/prod-trace-pth.jpg", w: 1600, h: 874, label: "PTH solder joints", note: "Voids visible as bright inclusions inside each barrel.", alt: "X-ray of a row of plated through-hole solder joints in a carrier, with internal voids visible as bright inclusions" },
    { src: "/assets/prod-trace-pth-measured.jpg", w: 1322, h: 1069, label: "The same joints, measured", note: "Fill and void percentages calculated automatically.", alt: "Annotated X-ray of four PTH joints with measurement cylinders, outlined voids and fill and void percentages per barrel" },
    { src: "/assets/prod-trace-qfp-voids.jpg", w: 1186, h: 1146, label: "QFP die-attach voiding", note: "Large irregular voids beneath the die, every bond wire resolved.", alt: "X-ray of a quad flat package showing bond wires and large irregular voids in the die attach layer" },
  ],
  [
    { src: "/assets/prod-trace-qfp-field.jpg", w: 1144, h: 1128, label: "The same package, wider field", note: "Neighbouring passives and the full lead frame in one exposure.", alt: "X-ray of the same quad flat package with neighbouring surface-mount passives in frame" },
    { src: "/assets/prod-trace-board.jpg", w: 1133, h: 1073, label: "Assembled board", note: "BGA array, magnetics and connectors in a single scan.", alt: "X-ray of an assembled card showing a BGA array, magnetics and two connectors" },
    { src: "/assets/prod-trace-board-full.jpg", w: 1088, h: 1348, label: "The same board, full field", note: "Edge connector to mounting bracket, with inner-layer routing visible.", alt: "Full-field X-ray of the same assembled card, from edge connector to mounting bracket" },
  ],
];

type SpecTable = { title: string; rows: [string, string][] };
const SPECS: SpecTable[] = [
  { title: "MQX.tracE · 2.5D", rows: [
    ["X-ray energy range", "20 – 160 kV"], ["Max target power", "25 W"],
    ["Tube type", "Microfocus, open type, transmission target"], ["JIMA resolution", "0.9 µm"],
    ["Detector active area", "161 × 161 mm"], ["Pixel pitch / frame rate", "105 µm / 40 fps"],
    ["Manipulator", "6-axis, servo motors with encoder"], ["Magnification", "Geometric above 1,900×; system above 7,000×"],
    ["Radiation safety", "AERB type-approved; leakage below 1 µSv/hr"],
    ["Footprint / weight", "2200 (H) × 1800 (W) × 1900 (D) mm; approx. 4500 kg"],
  ]},
  { title: "MQX.tracE CT · 3D", rows: [
    ["Power", "AC mains 220 – 230 V, 50 Hz, single phase"], ["Anode voltage", "30 – 160 kV"],
    ["Target power", "Up to 15 W"], ["X-ray source", "Open tube, transmission target"],
    ["Resolution", "0.75 µm or better"], ["Magnification", "Geometric up to 3,000×; total up to 7,500×"],
    ["Imaging", "Above 1 MP; 10 fps; 16-bit ADC"], ["Manipulator", "Five-axis; 360° rotation, ±70° tilt"],
    ["PCB capacity", "Max 440 × 550 mm; inspection area 310 × 310 mm; sample weight 5 kg"],
    ["Inspection modes", "Manual / semi-automatic / automatic, plus macros"],
    ["CT capability", "3D CT slicing and reconstruction"],
    ["Radiation safety", "Below 1 µSv/hr at cabinet surface"],
    ["Image export", "RAW / JPEG / TIFF / GIF / BMP"],
    ["Vibration mitigation", "Anti-vibration supports for stability"],
  ]},
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

function Section({ id, tone = "page", children }: { id?: string; tone?: "page" | "white" | "inset" | "navy"; children: React.ReactNode }) {
  const bg = { page: PAGE, white: WHITE, inset: INSET, navy: INK }[tone];
  return (
    <section id={id} style={{ background: bg }} className="scroll-mt-[76px]">
      <div className={`${SHELL} py-14 md:py-20 lg:py-24`}>{children}</div>
    </section>
  );
}

function BenefitGrid({ items }: { items: [string, string, string][] }) {
  return (
    <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, background: HAIR }}>
      {items.map(([n, t, d]) => (
        <div key={n} className="p-6" style={{ background: WHITE }}>
          <div style={{ font: `600 13px/1 ${SANS}`, letterSpacing: ".08em", color: CYAN_ON_LIGHT }}>{n}</div>
          <h3 className="mt-3.5" style={{ ...h3(INK), fontSize: 19 }}>{t}</h3>
          <p className="mt-2.5" style={{ ...body(BODY), fontSize: 15 }}>{d}</p>
        </div>
      ))}
    </div>
  );
}

export default function MqxTracE() {
  const [w, setW] = useState(1440);
  const [open, setOpen] = useState<string | null>(SPECS[0].title);
  const [zoom, setZoom] = useState<Shot | null>(null);
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const read = () => setW(window.innerWidth);
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);

  /* Escape closes the lightbox, and the page behind it does not scroll. */
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoom(null); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [zoom]);

  const mobile = w < 768;
  const tablet = w >= 768 && w < 1024;
  const accordion = w < 1024;

  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <Image
          src="/assets/prod-trace-hero.jpg"
          alt="MQX.tracE 2.5D X-ray inspection cabinet with operator console"
          fill
          priority
          quality={88}
          sizes="100vw"
          className="object-cover"
          style={{ filter: "grayscale(1)" }}
        />
        <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.94) 0%,rgba(11,42,58,.80) 46%,rgba(11,42,58,.40) 100%)" }} />
        <div
          className={`relative flex flex-col justify-end ${SHELL}`}
          style={{ zIndex: 3, minHeight: mobile ? 540 : tablet ? 580 : 660, gap: 18, paddingTop: 120, paddingBottom: mobile ? 48 : 72 }}
        >
          <p style={eyebrow(CYAN)}>MQX.tracE · 2.5D X-ray for electronics</p>
          <h1 className="max-w-[760px]" style={{ margin: 0, font: `600 clamp(30px,4.2vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
            Engineered to reveal the invisible.
          </h1>
          <p className="max-w-[640px]" style={lead("rgba(255,255,255,.82)")}>
            India&apos;s first indigenous 2.5D PCB X-ray inspection system, built for micron-level defect detection in
            high-density electronic assemblies, revealing solder voids, cracks, bridging, missing BGAs and PTH fill issues
            that visual inspection cannot catch.
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span key={b} className="px-3 py-2" style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.22)", ...label("rgba(255,255,255,.86)") }}>
                {b}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap" style={{ gap: 12 }}>
            <a href="#contact" style={btnPrimary} className="hover:!bg-white">Request a demo</a>
            <a href="#specs" style={btnGhostDark} className="hover:!bg-white/10">See specifications</a>
          </div>
        </div>
      </section>

      {/* ── sticky section nav ── */}
      <div className="sticky top-0 z-40" style={{ background: WHITE, borderBottom: `1px solid ${HAIR}` }}>
        <div className={`${SHELL} flex gap-6 overflow-x-auto`} style={{ scrollbarWidth: "none" }}>
          {NAV_ITEMS.map(([text, href]) => (
            <a key={href} href={href} className="shrink-0 whitespace-nowrap no-underline transition-colors duration-200 hover:!text-[#0B2A3A]"
              style={{ ...label(MUTED), display: "flex", alignItems: "center", height: 52 }}>
              {text}
            </a>
          ))}
        </div>
      </div>

      {/* ── the two variants, stated up front ── */}
      <Section id="variants" tone="white">
        <h2 style={h2(INK)}>One platform. Two depths of answer.</h2>
        <p className="mt-4 max-w-[62ch]" style={lead(BODY)}>
          Where 2D leaves ambiguity, MQX.tracE CT adds 3D slicing and reconstruction to isolate layers, verify internal
          geometry and generate evidence-ready reports, without destructive sectioning. Both variants share an AI-powered
          imaging suite.
        </p>
        <div className="mt-9" style={{ borderTop: `1px solid ${INK}` }}>
          <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:py-3" style={{ borderBottom: `1px solid ${HAIR}` }}>
            <span style={label(INK)}>Variant</span><span style={label(INK)}>What it does</span><span style={label(INK)}>Choose it when</span>
          </div>
          {VARIANTS.map(([v, does, when]) => (
            <div key={v} className="grid grid-cols-1 gap-1.5 py-4 md:grid-cols-3 md:items-baseline md:gap-6" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <span style={{ font: `600 17px/1.3 ${SANS}`, color: INK }}>{v}</span>
              <span style={body(BODY)}>{does}</span>
              <span style={body(MUTED)}>{when}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 2.5D variant ── */}
      <Section id="benefits" tone="page">
        <p style={eyebrow(CYAN_ON_LIGHT)}>MQX.tracE · 2.5D</p>
        <h2 className="mt-4" style={h2(INK)}>Micron-level defect detection for electronics.</h2>
        <BenefitGrid items={BENEFITS_2D} />
      </Section>

      {/* ── product highlights ── */}
      <Section id="highlights" tone="white">
        <h2 style={h2(INK)}>System features at a glance.</h2>
        <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <div className="relative aspect-[16/9]" style={{ background: INSET }}>
            <Image
              src="/assets/prod-trace-system.jpg"
              alt="MQX.tracE inspection cabinet with operator console and imaging software on screen"
              fill
              quality={90}
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
            />
            {HIGHLIGHTS.map(([number, title], index) => {
              const active = activeHighlight === index;
              const [x, y] = HIGHLIGHT_POSITIONS[index];
              return (
                <button
                  key={number}
                  type="button"
                  aria-label={`${number}: ${title}`}
                  aria-pressed={active}
                  onMouseEnter={() => setActiveHighlight(index)}
                  onFocus={() => setActiveHighlight(index)}
                  onClick={() => setActiveHighlight(index)}
                  className="absolute z-[4] grid h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center p-0"
                  style={{
                    left: `${x}%`, top: `${y}%`,
                    border: `1px solid ${active ? CYAN : INK}`,
                    background: active ? CYAN : "rgba(255,255,255,.94)",
                    color: active ? "#08283A" : INK,
                    font: `600 12px/1 ${SANS}`,
                    boxShadow: "0 3px 12px rgba(8,40,58,.18)",
                    transition: `background 200ms ${EASE}, border-color 200ms ${EASE}, color 200ms ${EASE}`,
                  }}
                >
                  {number}
                </button>
              );
            })}
          </div>
          <div style={{ borderTop: `1px solid ${HAIR}` }}>
            {HIGHLIGHTS.map(([number, title, description], index) => {
              const active = activeHighlight === index;
              return (
                <button
                  key={number}
                  type="button"
                  aria-pressed={active}
                  onMouseEnter={() => setActiveHighlight(index)}
                  onFocus={() => setActiveHighlight(index)}
                  onClick={() => setActiveHighlight(index)}
                  className="grid w-full cursor-pointer grid-cols-[30px_1fr] gap-4 border-0 px-4 py-5 text-left"
                  style={{
                    borderBottom: `1px solid ${HAIR}`,
                    background: active ? "#EAF6FB" : "transparent",
                    transition: `background 200ms ${EASE}`,
                  }}
                >
                  <span className="grid h-[30px] w-[30px] place-items-center" style={{
                    border: `1px solid ${active ? CYAN : HAIR}`,
                    background: active ? CYAN : "transparent",
                    color: active ? "#08283A" : CYAN_ON_LIGHT,
                    font: `600 13px/1 ${SANS}`,
                  }}>{number}</span>
                  <span>
                    <span className="block" style={{ ...h3(INK), fontSize: 18 }}>{title}</span>
                    {(!accordion || active) && <span className="mt-2 block" style={{ ...body(BODY), fontSize: 15 }}>{description}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── CT variant ── */}
      <Section id="ct" tone="inset">
        <p style={eyebrow(CYAN_ON_LIGHT)}>MQX.tracE CT · 3D</p>
        <h2 className="mt-4" style={h2(INK)}>2D gives answers. CT gives certainty.</h2>
        <p className="mt-4 max-w-[70ch]" style={lead(BODY)}>
          For complex electronics, 2D views can be ambiguous because layers overlap. MQX.tracE CT combines high-clarity 2D
          screening with 3D slicing and reconstruction, so teams can isolate layers, verify internal geometry, confirm root
          cause and generate evidence-ready reports, without cutting a board apart.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          {WORKFLOW.map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              <span className="px-3.5 py-2.5" style={{ background: WHITE, border: `1px solid ${HAIR}`, font: `500 14px/1.2 ${SANS}`, color: INK }}>{step}</span>
              {i < WORKFLOW.length - 1 && <span aria-hidden style={{ color: CYAN_ON_LIGHT }}>→</span>}
            </span>
          ))}
        </div>
        <BenefitGrid items={BENEFITS_CT} />
      </Section>

      {/* ── defect gallery, with lightbox ── */}
      <Section id="gallery" tone="navy">
        <h2 style={h2("#fff")}>Sample inspection images.</h2>
        <p className="mt-4 max-w-[64ch]" style={lead("rgba(255,255,255,.80)")}>
          Representative captures from MQX.tracE: solder voids, fill measurement and package-level defects on real PCB
          assemblies. Select any image to open it at full resolution.
        </p>
        {/* The gap shows the section's own navy. The house idiom is a 1px gap over
            a hairline ground, but these are light-toned radiographs on a dark
            band, so a light divider between two light images is invisible; the
            dark ground is the divider that works here. */}
        <div className="mqs-jrows mt-9">
          {GALLERY_ROWS.map((row, ri) => (
            <div key={ri} className="mqs-jrow mqs-jrow--cap">
              {row.map((g) => (
                <figure
                  key={g.src}
                  className="m-0 flex flex-col"
                  /* width in proportion to aspect ratio, so the row shares one
                     height and fills the measure exactly. Below 700 the row
                     becomes a column and each tile takes the full measure at its
                     own aspect; all three or all one, never a stretched orphan */
                  style={{ flex: `${(g.w / g.h).toFixed(4)} 1 0px` }}
                >
                  <button
                    type="button"
                    onClick={() => setZoom(g)}
                    className="mqxt-tile relative block w-full cursor-zoom-in border-0 p-0"
                    style={{ aspectRatio: `${g.w} / ${g.h}`, background: "#06161f" }}
                    aria-label={`Open at full resolution: ${g.label}`}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      quality={92}
                      sizes="(min-width:1330px) 570px, (min-width:700px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <span aria-hidden className="mqxt-zoom absolute bottom-2.5 right-2.5 flex items-center justify-center"
                      style={{ width: 34, height: 34, background: CYAN, color: INK }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square">
                        <circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6" />
                      </svg>
                    </span>
                  </button>
                  <figcaption className="pt-3.5">
                    <span className="block" style={{ font: `500 15px/1.35 ${SANS}`, letterSpacing: "-.01em", color: "#fff" }}>{g.label}</span>
                    <span className="mt-1.5 block" style={{ ...body("rgba(255,255,255,.68)"), fontSize: 14 }}>{g.note}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ── specifications ── */}
      <Section id="specs" tone="page">
        <h2 style={h2(INK)}>Specifications.</h2>
        <p className="mt-4 max-w-[64ch]" style={lead(BODY)}>
          Two variants, quoted separately. Note that resolution here is JIMA resolution, the smallest feature the system can
          resolve, which is a different measure from the detector pixel pitch quoted on the MQXC and MQCT pages.
        </p>
        <div className="mt-9 flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
          {SPECS.map((t) => {
            const isOpen = !accordion || open === t.title;
            return (
              <div key={t.title} style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
                {accordion ? (
                  <button type="button" onClick={() => setOpen(isOpen ? null : t.title)} aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 border-0 bg-transparent p-5 text-left"
                    style={{ cursor: "pointer", minHeight: 56 }}>
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* The closing CTA band is removed at the client's request, for the same
          reason as on the MQCT page: ContactSection follows and is the enquiry
          form. Copy retained so it stays traceable:
            "Next step / Want to see MQX.tracE find what others miss? / Request a
             demo and see 2.5D and 3D CT inspection run on your own boards and
             components." plus Request a demo and Talk to an inspection expert. */}

      {/* ── lightbox ── */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.label}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center p-4 md:p-10"
          style={{ background: "rgba(6,22,31,.94)" }}
        >
          <Image
            src={zoom.src}
            alt={zoom.alt}
            width={zoom.w}
            height={zoom.h}
            quality={95}
            sizes="100vw"
            className="max-h-[80vh] w-auto max-w-full object-contain"
            style={{ height: "auto" }}
          />
          <p className="mt-5 max-w-[70ch] text-center">
            <span style={{ font: `500 16px/1.4 ${SANS}`, color: "#fff" }}>{zoom.label}</span>
            <span className="mt-1 block" style={{ ...body("rgba(255,255,255,.72)"), fontSize: 14 }}>{zoom.note}</span>
          </p>
          <button
            type="button"
            onClick={() => setZoom(null)}
            className="mt-5 border-0 bg-transparent"
            style={{ ...label("rgba(255,255,255,.7)"), cursor: "pointer" }}
          >
            Close (esc)
          </button>
        </div>
      )}
    </main>
  );
}
