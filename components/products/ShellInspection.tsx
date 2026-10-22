"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  INK, BODY, CYAN, CYAN_ON_LIGHT, CYAN_ON_DARK, HAIR, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, h3, body, lead,
  Section, SectionHead, SubNav, Badges, HeroActions, HotspotFigure, SpecTable, DownloadsAndRelated,
  Lightbox, ZoomIcon,
  type Hotspot, type Zoomable,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   Shell / Ammunition Inspection Solutions, /products/shell-inspection/
   Copy is the client's "Shell_Ammunition_Inspection_Revised_with_Bunker_Images.docx"
   brief (Downloads/Solutions 2/Shell Inspection) and nothing else: section
   headings and order are the brief's own. Page pattern via solution-kit.tsx.

   Interactive pieces, each carrying the brief's words:
   · The cabinet reference configuration uses the brief's A–E callouts. Pin
     positions are taken from the A–E circles the brief overlays on the same
     render (Word drawing offsets converted to image percentages).
   · The two bunker images open full size, with the brief's captions.

   PENDING MQS SIGN-OFF:
   · Detector MQXRD 4343 HE XX is listed with an X-ray range of "20–16 MeV";
     shown exactly as supplied, likely a typo (perhaps 20 kV–16 MeV).
   · The brief's "Talk to an Expert" and "Request a Demo" links are served by
     the hero button and the contact form below the page (no CTA band, as on
     the other product pages).
   · The docx also embeds a bunker render branded "MEDEQUIP"; the MQS-branded
     version of the same render is used instead.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Architectures", "#architectures"], ["Selection", "#selection"],
  ["Cabinet-Based", "#cabinet"], ["Bunker-Based", "#bunker"], ["Technical Configuration", "#specs"],
  ["Applications", "#applications"], ["Downloads", "#downloads"],
];

const BADGES = ["Cabinet-based · 160 kV to 450 kV", "Bunker-based · LINAC 2–6 MeV", "DFPD imaging"];

const ARCHITECTURES: { kicker: string; title: string; points: string[] }[] = [
  {
    kicker: "Cabinet-Based Systems",
    title: "Integrated Digital Radiography for production inspection.",
    points: [
      "Suitable where shell size, penetration requirement and workflow fit a cabinet configuration.",
      "Configurable MQXR source options from 160 kV to 450 kV, depending on the application.",
      "Can integrate shell rotation, indexing, preset programs and DFPD imaging.",
      "Designed for repeatable inspection with a compact, engineered system footprint.",
    ],
  },
  {
    kicker: "Bunker-Based Systems",
    title: "High-energy inspection for demanding penetration requirements.",
    points: [
      "LINAC-based Digital Radiography installed in a shielded bunker.",
      "High-energy options in the 2–6 MeV range, selected according to penetration needs.",
      "Custom motion, positioning and handling can be engineered around shell geometry and bunker layout.",
      "Suited to applications where larger or denser sections require deeper penetration.",
    ],
  },
];

const SELECTION_ROWS: string[][] = [
  ["Shell / ammunition size", "Calibre, diameter, length and handling constraints."],
  ["Material & wall thickness", "Density and penetration required to reveal internal conditions."],
  ["Inspection objective", "Defect target, required image quality and evidence / documentation needs."],
  ["Throughput", "Cycle time, batch size and automation requirement."],
  ["Facility concept", "Cabinet deployment or integration into a shielded bunker and production layout."],
];

/* Brief's "Reference Automated Workflow" table: stage, function, inspection value. */
const WORKFLOW: Hotspot[] = [
  { id: "A", title: "Station 1: X-ray inspection", desc: "Automated radiographic inspection for internal defects and quality verification.", at: [26.1, 33.8] },
  { id: "B", title: "Station 2: Shell rotation & indexing", desc: "Controlled rotation improves inspection coverage and repeatability.", at: [65.4, 55.5] },
  { id: "C", title: "Preset programs: Multiple calibre programs", desc: "Quick changeover and automatic inspection cycles for different shell diameters.", at: [49.1, 64.4] },
  { id: "D", title: "Manipulator & handling: Application-specific mechanical design", desc: "Can be configured around calibre, handling requirement and production layout.", at: [25.1, 60.1] },
  { id: "E", title: "Digital imaging chain: Source + DFPD detector", desc: "Balances penetration, image clarity, documentation and throughput.", at: [89.5, 54.9] },
];

const BUNKER_SHOTS: Zoomable[] = [
  {
    src: "/assets/prod-shell-bunker-render.jpg", w: 1864, h: 844,
    label: "Engineered motion, detector positioning and handling architecture",
    alt: "Render of an MQS bunker-based shell inspection system with two gantry frames on floor rails, a detector carriage on one frame and a source on the other",
  },
  {
    src: "/assets/prod-shell-bunker-installed.jpg", w: 1448, h: 1086,
    label: "Installed bunker-based shell inspection configuration",
    alt: "Installed MQS bunker-based shell inspection system: two tall gantry towers with a central shell positioning stage and detector inside a shielded room",
  },
];

const BUNKER_FEATURES: { kicker: string; title: string; points: string[] }[] = [
  { kicker: "High-Energy Imaging", title: "Penetration matched to the application.", points: [
    "High-energy source options in the 2–6 MeV range are available depending on the required penetration.",
    "Source and DFPD detector pairing is selected for the component and imaging objective.",
  ] },
  { kicker: "Bunker Integration", title: "Designed around the facility.", points: [
    "System architecture is integrated into a shielded bunker rather than a compact cabinet.",
    "Motion, detector positioning and controls can be adapted to the available layout.",
  ] },
  { kicker: "Custom Handling", title: "The shell defines the mechanism.", points: [
    "Rotation, indexing and positioning can be configured around calibre and shell geometry.",
    "Automation can reduce manual handling and improve repeatability.",
  ] },
  { kicker: "Digital Workflow", title: "From image capture to review.", points: [
    "Digital imaging supports repeatable inspection, image storage and documentation.",
    "Preset or programmed sequences can be developed around the inspection requirement.",
  ] },
];

const SOURCE_ROWS: string[][] = [
  ["Cabinet-Based", "MQXR 160 / 225 / 320 / 450 series", "Selected when the required penetration and component envelope fit an integrated cabinet system."],
  ["Bunker-Based", "High Energy / LINAC 2–6 MeV", "Selected when the application requires deeper penetration, larger handling space or bunker integration."],
];

const DETECTOR_ROWS: string[][] = [
  ["MQXRD 0822 XX", "0–16 MeV", "200 µm", "200 × 200 mm"],
  ["MQXRD 3025 XX", "0–450 kV", "139 µm", "250 × 300 mm"],
  ["MQXRD 1621 XX", "0–16 MeV", "200 µm", "400 × 400 mm"],
  ["MQXRD 4343 HE XX", "20–16 MeV", "139 µm", "427 × 427 mm"],
];

const CAPABILITIES: [string, string][] = [
  ["Configurable Energy", "Match the source to the material thickness and penetration need."],
  ["Digital Imaging", "DFPD options support clear image capture and documentation."],
  ["Automation", "Rotation, indexing and programmed sequences can improve consistency."],
  ["Custom Engineering", "Handling, motion and layout can be adapted to the application."],
];

/* ── pieces ── */

function Bullets({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
      {items.map((t) => (
        <li key={t} className="grid grid-cols-[14px_1fr] gap-3">
          <span aria-hidden className="mt-[9px] h-[6px] w-[6px]" style={{ background: dark ? CYAN : CYAN_ON_LIGHT }} />
          <span style={{ ...body(dark ? "rgba(255,255,255,.78)" : BODY), fontSize: 15 }}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* A brief "statement" line followed by its supporting sentence. */
function Statement({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 pl-5 md:pl-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12" style={{ borderLeft: `3px solid ${CYAN}` }}>
      <p style={{ ...h3(dark ? "#fff" : INK), fontSize: "clamp(20px,2vw,26px)" }}>{title}</p>
      <p style={body(dark ? "rgba(255,255,255,.78)" : BODY)}>{text}</p>
    </div>
  );
}

function BunkerGallery() {
  const [zoom, setZoom] = useState<Zoomable | null>(null);
  const close = useCallback(() => setZoom(null), []);
  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        {BUNKER_SHOTS.map((s) => (
          <figure key={s.src} className="m-0 flex flex-col">
            <button type="button" onClick={() => setZoom(s)} aria-label={`Open at full resolution: ${s.label}`}
              className="relative block w-full cursor-zoom-in border-0 p-0" style={{ background: WHITE, aspectRatio: `${s.w} / ${s.h}` }}>
              <Image src={s.src} alt={s.alt} fill quality={90} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              <ZoomIcon />
            </button>
            <figcaption className="mt-3" style={label("rgba(255,255,255,.66)")}>{s.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 max-w-[80ch]" style={{ ...body("rgba(255,255,255,.70)"), fontSize: 14 }}>
        Representative MQS bunker-based LINAC shell inspection systems. Final configuration is engineered around the
        calibre, penetration requirement and bunker layout.
      </p>
      <Lightbox shot={zoom} onClose={close} />
    </>
  );
}

export default function ShellInspection() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── the installed bunker photograph, under the site's navy wash */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <Image src="/assets/prod-shell-bunker-installed.jpg" alt="Installed MQS bunker-based shell inspection system with two gantry towers and a central shell positioning stage"
          fill priority quality={88} sizes="100vw" className="object-cover object-[70%_center]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.97) 0%,rgba(11,42,58,.88) 40%,rgba(11,42,58,.40) 75%,rgba(11,42,58,.18) 100%)" }} />
        <div className={`relative flex flex-col justify-end ${SHELL}`} style={{ zIndex: 3, minHeight: "clamp(560px,72vh,700px)", gap: 18, paddingTop: 120, paddingBottom: "clamp(48px,6vw,72px)" }}>
          <p style={eyebrow(CYAN)}>Shell / Ammunition Inspection Solutions</p>
          <h1 className="max-w-[720px]" style={{ margin: 0, font: `600 clamp(30px,4.2vw,58px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
            One Application. Two Inspection Architectures.
          </h1>
          <p className="max-w-[620px]" style={lead("rgba(255,255,255,.84)")}>
            MQS Technologies provides Digital X-ray inspection solutions for artillery shells and ammunition across
            different calibres. The inspection architecture is selected around the calibre, material, wall thickness,
            required penetration, throughput and facility layout.
          </p>
          <Badges items={BADGES} />
          <HeroActions />
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />

      {/* ── cabinet vs bunker ── */}
      <Section id="architectures" tone="white">
        <SectionHead title="Cabinet-Based and Bunker-Based Digital X-ray Inspection for Artillery Shells & Ammunition" />
        <div className="mt-9 grid grid-cols-1 md:grid-cols-2" style={{ gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
          {ARCHITECTURES.map((a, i) => (
            <div key={a.kicker} className="p-6 md:p-8" style={{ background: WHITE }}>
              <div className="flex items-center gap-3">
                <span className="grid h-[30px] w-[30px] place-items-center" style={{ background: i === 0 ? CYAN : INK, color: i === 0 ? INK : "#fff", font: `600 13px/1 ${SANS}` }}>0{i + 1}</span>
                <span style={eyebrow(CYAN_ON_LIGHT)}>{a.kicker}</span>
              </div>
              <h3 className="mt-5" style={{ ...h3(INK), fontSize: 21 }}>{a.title}</h3>
              <Bullets items={a.points} />
            </div>
          ))}
        </div>
        <Statement title="The inspection method stays the same. The deployment architecture changes."
          text="Both configurations combine the X-ray source, digital detector, manipulation and software into a system engineered around the shell and the inspection objective. The final source, detector and handling configuration is application-specific." />
      </Section>

      {/* ── selection factors ── */}
      <Section id="selection" tone="page" ruled>
        <SectionHead title="How MQS Selects the Right Configuration" />
        <div className="mt-9"><SpecTable head={["Selection factor", "What MQS evaluates"]} rows={SELECTION_ROWS} /></div>
      </Section>

      {/* ── cabinet-based, on the brief's A–E reference configuration ── */}
      <Section id="cabinet" tone="white">
        <SectionHead kicker="Cabinet-Based Shell Inspection" title="Automated Digital Radiography for Repeatable Production Inspection"
          intro="For applications that fit a cabinet-based architecture, MQS can combine digital X-ray imaging with automated shell handling, rotation and indexing. A reference MQS shell-inspection configuration uses a dual-station workflow to improve consistency and reduce manual dependency." />
        <p className="mt-10" style={label(CYAN_ON_LIGHT)}>Reference Automated Workflow</p>
        <HotspotFigure src="/assets/prod-shell-cabinet-workflow.jpg" aspect="1158 / 865" fit="contain" ground={WHITE} items={WORKFLOW}
          alt="Render of the reference MQS automated shell inspection and handling configuration: X-ray source on a vertical column, shell tray on a linear frame, inclined loading chute and a trolley, with lettered callouts A to E" />
        <p className="mt-4" style={{ ...body(BODY), fontSize: 14 }}>Reference MQS automated shell inspection and handling configuration</p>
      </Section>

      {/* ── bunker-based ── */}
      <Section id="bunker" tone="ink">
        <SectionHead dark kicker="Bunker-Based Shell Inspection" title="High-Energy LINAC Inspection for Greater Penetration"
          intro="When the inspection requires higher penetration than a cabinet-based configuration can provide, MQS can engineer a bunker-based shell inspection system using a high-energy LINAC source. The X-ray source, detector, shell positioning and control architecture are integrated around the shielded bunker and the required inspection sequence." />
        <BunkerGallery />
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 1, background: HAIR_DARK, border: `1px solid ${HAIR_DARK}` }}>
          {BUNKER_FEATURES.map((f) => (
            <div key={f.kicker} className="p-6" style={{ background: INK }}>
              <p style={label(CYAN_ON_DARK)}>{f.kicker}</p>
              <h3 className="mt-3.5" style={{ ...h3("#fff"), fontSize: 19 }}>{f.title}</h3>
              <Bullets items={f.points} dark />
            </div>
          ))}
        </div>
        <Statement dark title="Cabinet or bunker is an engineering decision, not a product hierarchy."
          text="The right architecture depends on the shell, penetration requirement, throughput and site conditions. MQS can recommend the simpler cabinet configuration where it is sufficient, and move to a LINAC-based bunker solution when the application demands higher energy or a larger installation envelope." />
      </Section>

      {/* ── technical configuration ── */}
      <Section id="specs" tone="page" ruled>
        <SectionHead kicker="Technical Configuration" title="Source and Detector Options"
          intro="The supplied shell inspection material lists multiple X-ray source and DFPD options. Exact pairings should be finalized after the component and inspection requirement are reviewed by MQS engineering." />
        <div className="mt-9 flex flex-col gap-12">
          <SpecTable title="X-ray Source Options" head={["System architecture", "X-ray source options", "Typical deployment logic"]} rows={SOURCE_ROWS} />
          <SpecTable title="DFPD Detector Options" head={["Detector", "X-ray Range", "Pixel Size", "Active Area"]} rows={DETECTOR_ROWS} />
        </div>
        <h2 className="mt-16" style={{ ...h2(INK), fontSize: "clamp(22px,2.4vw,30px)" }}>Common Capabilities Across Both Architectures</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
          {CAPABILITIES.map(([t, d], i) => (
            <div key={t} className="p-6" style={{ background: WHITE }}>
              <div style={{ font: `600 13px/1 ${SANS}`, letterSpacing: ".08em", color: CYAN_ON_LIGHT }}>0{i + 1}</div>
              <h3 className="mt-3.5" style={{ ...h3(INK), fontSize: 19 }}>{t}</h3>
              <p className="mt-2.5" style={{ ...body(BODY), fontSize: 15 }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── applications + closing line ── */}
      <Section id="applications" tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead title="Applications" />
            <p className="mt-6" style={lead(BODY)}>
              Suitable for inspection of artillery shells and ammunition across calibres. The same engineering approach
              can also be extended to similar cylindrical inspection applications where internal integrity must be
              verified without destructive sectioning.
            </p>
          </div>
          <div className="p-7 md:p-9" style={{ background: INK }}>
            <h2 style={{ ...h2("#fff"), fontSize: "clamp(22px,2.4vw,30px)" }}>Bring Us the Calibre. We&apos;ll Engineer the Inspection.</h2>
            <p className="mt-4" style={body("rgba(255,255,255,.80)")}>
              Share the shell size, material, wall thickness, inspection objective, throughput and available facility
              layout. MQS can recommend a cabinet-based system or engineer a bunker-based LINAC solution around the
              requirement.
            </p>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 no-underline" style={label(CYAN_ON_DARK)}>
              Talk to an expert <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Section>

      {/* ── downloads ── */}
      <Section id="downloads" tone="page" ruled>
        <DownloadsAndRelated
          downloadsTitle="Downloads"
          relatedTitle="Helpful Links"
          downloads={[
            { name: "Shell / Ammunition Brochure (PDF)", href: "/brochures/shell-ammunition-inspection.pdf" },
            { name: "High-Energy X-ray Brochure (PDF)", href: "/brochures/high-energy-xray.pdf" },
          ]}
          related={[
            { name: "High-Energy X-Ray Solutions", href: "/products/high-energy-xray" },
            { name: "Defence Industry", href: "/industries/defence" },
          ]}
        />
      </Section>
    </main>
  );
}
