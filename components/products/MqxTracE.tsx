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
   void detail is lost at thumbnail size. Images are contained rather than
   cropped, on a navy ground, so no defect detail is cut off and no image is
   upscaled past its native resolution.

   PENDING MQS SIGN-OFF, all raised by the brief itself:
   · The 7,500x magnification figure is the CT variant's total magnification;
     the 2.5D variant reaches about 7,000x. The hero badge is qualified here
     rather than implying both, per the brief's own instruction.
   · IMG-05, the measured PTH overlay, is supplied at only 334 x 319 px. It is
     the image carrying the fill and void percentages, so it is the one that
     most needs resolution. It is shown unscaled here; re-export from the
     inspection software before go-live.
   · The 2.5D variant lists a 6-axis manipulator and the CT variant 5-axis.
     Confirm, since the CT variant would normally have equal or more axes.
   · "India's first indigenous 2.5D PCB X-ray inspection system" is a strong
     claim. Confirm it can be substantiated if a competitor challenges it.
   · Both variants quote AERB compliance but only the 2.5D is described as
     type-approved, while the hero badge covers both.
   · Resolution here is quoted as JIMA (0.9 and 0.75 um), which is a different
     measure from the detector pixel pitch quoted on the MQXC and MQCT pages.
     Every resolution figure across the site should state its basis.
   ────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const CYAN = "#16C1F3", CYAN_ON_LIGHT = "#0A6A88", CYAN_ON_DARK = "#5AD1F7";
const HAIR = "#D3DFE7";
const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const SANS = "var(--font-sans)";

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Variants", "#variants"], ["2.5D", "#benefits"],
  ["Highlights", "#highlights"], ["CT", "#ct"], ["Gallery", "#gallery"],
  ["Specs", "#specs"], ["Demo", "#demo"],
];

/* The brief's fourth badge is qualified: 7,500x is the CT variant only. */
const BADGES = [
  "India's first indigenous 2.5D system",
  "2D and 3D CT in one platform",
  "AERB type-approved",
  "Up to 7,500× (CT variant)",
];

const VARIANTS: [string, string, string][] = [
  ["MQX.tracE — 2.5D", "High-magnification 2D X-ray with oblique viewing", "You need to screen boards fast and catch known defect types"],
  ["MQX.tracE CT — 3D", "Adds CT slicing and reconstruction", "Overlap makes 2D ambiguous, or you need evidence-ready failure analysis"],
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

const WORKFLOW = ["Acquire (2D)", "Slice (CT)", "Analyze", "Report"];

const BENEFITS_CT: [string, string, string][] = [
  ["01", "Layer-by-layer CT visibility", "Separate overlapping features and reduce escapes."],
  ["02", "Faster failure analysis and R&D cycles", "Evidence-ready slices with no physical sectioning."],
  ["03", "Standardized inspection workflows", "Manual, semi-automatic and automatic modes, plus macros."],
  ["04", "Advanced measurement tools", "Package and semiconductor analysis with pass/fail support."],
  ["05", "Safe, compliant operation", "Radiation safety below 1 µSv/hr at the cabinet surface."],
];

type Shot = { src: string; w: number; h: number; caption: string; alt: string; small?: boolean };
/* Order matters: the PTH pair reads as the same joints, first imaged then
   measured, so they stay adjacent. */
const GALLERY: Shot[] = [
  { src: "/assets/prod-trace-pth.jpg", w: 925, h: 494, caption: "PTH solder joints — voids visible as bright inclusions inside each barrel", alt: "X-ray image of plated through-hole solder joints showing internal voids" },
  { src: "/assets/prod-trace-pth-measured.jpg", w: 334, h: 319, small: true, caption: "The same joints, measured — fill and void percentages calculated automatically", alt: "Annotated X-ray of PTH joints with fill and void percentages per barrel" },
  { src: "/assets/prod-trace-qfn.jpg", w: 550, h: 526, caption: "QFN die-attach voiding — large irregular voids that pass functional test", alt: "X-ray of a QFN package showing large voids in the die attach layer" },
  { src: "/assets/prod-trace-qfp.jpg", w: 812, h: 814, caption: "QFP package — bond wires resolved individually, void at the die centre", alt: "X-ray of a QFP package showing bond wires, leads and an internal void" },
  { src: "/assets/prod-trace-bga.jpg", w: 1280, h: 1043, caption: "BGA solder balls with adjacent bond wires and vias in one frame", alt: "High-magnification X-ray of BGA solder balls, bond wires and vias" },
  { src: "/assets/prod-trace-board.jpg", w: 900, h: 926, caption: "Full assembled board in a single scan — BGA, magnetics, connectors, inner layers", alt: "Full-board X-ray of an assembled card showing BGA, magnetics and routing" },
];

type SpecTable = { title: string; rows: [string, string][] };
const SPECS: SpecTable[] = [
  { title: "MQX.tracE — 2.5D", rows: [
    ["X-ray energy range", "20 – 160 kV"], ["Max target power", "25 W"],
    ["Tube type", "Microfocus, open type, transmission target"], ["JIMA resolution", "0.9 µm"],
    ["Detector active area", "161 × 161 mm"], ["Pixel pitch / frame rate", "105 µm / 40 fps"],
    ["Manipulator", "6-axis, servo motors with encoder"], ["Magnification", "Geometric above 1,900×; system above 7,000×"],
    ["Radiation safety", "AERB type-approved; leakage below 1 µSv/hr"],
    ["Footprint / weight", "2200 (H) × 1800 (W) × 1900 (D) mm; approx. 4500 kg"],
  ]},
  { title: "MQX.tracE CT — 3D", rows: [
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
        <p style={eyebrow(CYAN_ON_LIGHT)}>MQX.tracE — 2.5D</p>
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
          </div>
          <div style={{ borderTop: `1px solid ${HAIR}` }}>
            {HIGHLIGHTS.map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[24px_1fr] gap-4 py-5" style={{ borderBottom: `1px solid ${HAIR}` }}>
                <span style={{ font: `600 15px/1.2 ${SANS}`, color: CYAN_ON_LIGHT }}>{n}</span>
                <div>
                  <h3 style={{ ...h3(INK), fontSize: 18 }}>{t}</h3>
                  <p className="mt-2" style={{ ...body(BODY), fontSize: 15 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* The brief specifies callouts 1–5 overlaid on this photograph. Until
            that artwork lands the numbers key the list only. */}
      </Section>

      {/* ── CT variant ── */}
      <Section id="ct" tone="inset">
        <p style={eyebrow(CYAN_ON_LIGHT)}>MQX.tracE CT — 3D</p>
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
          Representative captures from MQX.tracE: solder voids, fill defects and bridging on real PCB components. Select any
          image to open it at full resolution.
        </p>
        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, background: "rgba(255,255,255,.12)" }}>
          {GALLERY.map((g) => (
            <figure key={g.src} className="m-0" style={{ background: INK }}>
              <button
                type="button"
                onClick={() => setZoom(g)}
                className="relative block w-full cursor-zoom-in border-0 p-0"
                style={{ aspectRatio: "1 / 1", background: "#06161f" }}
                aria-label={`Open full resolution: ${g.caption}`}
              >
                <Image src={g.src} alt={g.alt} fill quality={92} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-contain" />
              </button>
              <figcaption className="p-4" style={{ ...body("rgba(255,255,255,.74)"), fontSize: 14 }}>
                {g.caption}
                {g.small && (
                  <span className="mt-2 block" style={{ ...label("rgba(255,255,255,.5)") }}>
                    Supplied at 334 × 319 · re-export pending
                  </span>
                )}
              </figcaption>
            </figure>
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

      {/* ── demo ── */}
      <Section id="demo" tone="navy">
        <div className="grid grid-cols-1 items-end gap-7 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p style={eyebrow(CYAN_ON_DARK)}>Next step</p>
            <h2 className="mt-4" style={h2("#fff")}>Want to see MQX.tracE find what others miss?</h2>
          </div>
          <div>
            <p style={lead("rgba(255,255,255,.82)")}>
              Request a demo and see 2.5D and 3D CT inspection run on your own boards and components.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" style={btnPrimary} className="hover:!bg-white">Request a demo</a>
              <a href="#contact" style={btnGhostDark} className="hover:!bg-white/10">Talk to an inspection expert</a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── lightbox ── */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.caption}
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
          <p className="mt-5 max-w-[70ch] text-center" style={{ ...body("rgba(255,255,255,.82)"), fontSize: 15 }}>{zoom.caption}</p>
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
