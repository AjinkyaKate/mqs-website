"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import {
  EASE, INK, BODY, CYAN, CYAN_ON_LIGHT, HAIR, HAIR_DARK, PAGE, WHITE, SANS, SHELL,
  eyebrow, label, h2, h3, body, lead,
  Section, SectionHead, SubNav, Badges, HeroActions, StatStrip, BenefitGrid,
  SpecTable, DownloadsAndRelated, Lightbox, ZoomIcon,
  type Zoomable,
} from "./solution-kit";

/* ──────────────────────────────────────────────────────────────
   Digital Radiography Solutions for Pipe Inspection
   /products/pipe-inspection/
   Copy is the client's "Digital_Radiography_Pipe_Inspection_Final_Webpage.docx"
   brief (Downloads/Solutions 2/Weld Inspection) and nothing else: section
   order and headings are the brief's own, and no explanatory copy has been
   added. Page pattern via solution-kit.tsx.

   Interactive piece, carrying the brief's own captions:
   · STEP VIEWER. "Real Inspection Evidence" steps through the three supplied
     radiographs (raw, filtered, negative). "Selected Software Capabilities"
     uses the same viewer for the four MQS Imaging Suite screenshots.

   Image notes:
   · The radiographs come from the supplied 16-bit TIFFs. The copies embedded
     in the .docx had been flattened to pure black and white.
   · The software screenshots are cropped to remove the Windows title bar and
     taskbar, which showed local file paths and folder names.
   · The brief places the hero photograph under "2. Bunker-Based" as well, so
     it is used in both places.

   PENDING MQS SIGN-OFF:
   · The hero / bunker photograph carries a printed label that does not read
     as MQS branding ("PRESPĒIKASAPIS"). Confirm the image is cleared for use.
   · The cabinet photograph has text baked in ("Lead shielded cabinet / High
     radiation protection for operator safety"); it is shown as supplied.
   · The closing "Choose the architecture" note mentions modular concepts,
     but the brief only describes cabinet-based and bunker-based options.
   · The brief has no downloads section; the brochure is the catalogue's
     existing pipe inspection flyer.
   · The brief's closing CTA band is not built: the CTA band was removed
     site-wide at the client's request (see HighEnergy.tsx) and the enquiry
     form follows this page. Copy retained so it stays traceable:
       "Talk to MQS About Your Pipe Inspection Requirement / Whether you need
        a cabinet-based, bunker-based or customized modular solution, MQS can
        help identify the right Digital Radiography architecture for your pipe
        and butt weld inspection needs. / Bring Us the Weld. We'll Engineer
        the Inspection. / Share the pipe diameter, wall thickness, material,
        weld type, inspection objective, throughput and facility environment.
        MQS can configure the imaging, manipulation and system architecture
        around the requirement." plus Talk to an Expert | Request a Demo.
   ────────────────────────────────────────────────────────────── */

const NAV_ITEMS: [string, string][] = [
  ["Overview", "#overview"], ["Weld Evaluation", "#specs"], ["Inspection Evidence", "#evidence"],
  ["System Configurations", "#configurations"], ["Imaging Suite", "#imaging-suite"], ["Why MQS", "#why"],
  ["Downloads", "#downloads"],
];

const BADGES = ["Real-time butt weld inspection", "Stainless, alloy and carbon steel", "Cabinet or bunker-based"];

const STATS: [string, string][] = [
  ["8 – 18 mm", "Pipe wall thickness"],
  ["25 – 100 mm", "Pipe diameter"],
  ["Real-time", "Digital imaging"],
  ["Cabinet / Bunker", "Deployment architectures"],
];

const REFERENCE: string[][] = [
  ["Pipe wall thickness", "8 mm to 18 mm"],
  ["Pipe diameter", "25 mm to 100 mm"],
  ["Material", "Stainless steel, alloy steel and carbon steel"],
];

const DEFECTS = [
  "Porosity and cluster porosity",
  "Lack of fusion",
  "Inclusions",
  "Cracks and other weld discontinuities",
];

type Step = Zoomable & { step: string };

/* Step names and labels are the brief's captions. Alt text describes what is visible. */
const EVIDENCE: Step[] = [
  { step: "Raw", src: "/assets/prod-pipe-raw.jpg", w: 620, h: 516, label: "Raw radiographic image",
    alt: "Raw digital radiograph of a pipe butt weld, with identification marker 15 on the pipe" },
  { step: "Filtered", src: "/assets/prod-pipe-filtered.jpg", w: 669, h: 465, label: "Filtered image with weld defects visible",
    alt: "Filtered radiograph of the same pipe butt weld, with defect indications visible in the weld zone" },
  { step: "Negative", src: "/assets/prod-pipe-negative.jpg", w: 871, h: 359, label: "Negative image with 1T hole visible",
    alt: "Negative radiograph of a pipe butt weld with an ISO 19232 wire image quality indicator and a hole-type indicator marked 12" },
];

const SOFTWARE: Step[] = [
  { step: "Defect marking", src: "/assets/prod-pipe-sw-marking.jpg", w: 1920, h: 1012, label: "Defect marking and annotation",
    alt: "MQS Imaging Suite screen with a cluster porosity indication circled and labelled on a weld radiograph" },
  { step: "Magnified defect", src: "/assets/prod-pipe-sw-magnified.jpg", w: 1920, h: 1012, label: "Magnified defect review",
    alt: "MQS Imaging Suite screen showing a magnified region of a pipe weld radiograph beside the full view, with the filter panel open" },
  { step: "DIP calculation", src: "/assets/prod-pipe-sw-dip.jpg", w: 1920, h: 1012, label: "DIP calculation and profile analysis",
    alt: "MQS Imaging Suite DIP calculation window plotting the intensity profile across a duplex wire image quality indicator" },
  { step: "SNR", src: "/assets/prod-pipe-sw-snr.jpg", w: 1920, h: 1012, label: "SNR and image-quality evaluation",
    alt: "MQS Imaging Suite SNR calculation window and measurement details beside a radiograph of a pipe weld" },
];

const CONFIGS = [
  {
    n: "1", title: "Cabinet-Based", line: "Controlled inspection in a compact, self-contained architecture.",
    src: "/assets/prod-pipe-cabinet.jpg", aspect: "920 / 840",
    alt: "Blue lead-shielded MQXC 330 inspection cabinet with its lid open and a pipe port on the side, on a shop floor",
    points: ["Enclosed inspection environment", "Repeatable shop-floor workflow", "Real-time digital imaging"],
  },
  {
    n: "2", title: "Bunker-Based", line: "For larger or specialized installations using a dedicated shielded bunker.",
    src: "/assets/prod-pipe-hero.jpg", aspect: "1703 / 923",
    alt: "Digital radiography manipulator with X-ray source and flat panel detector mounted on a blue scissor-lift table",
    points: ["Flexible bunker integration", "Supports demanding industrial setups", "Source, detector and controls engineered around the application"],
  },
];

const SUITE: [string, string, string][] = [
  ["01", "Real-Time Acquisition", "Live and still-image acquisition for inspection and detailed review."],
  ["02", "Image Enhancement", "Filters and display tools improve visibility and image-quality assessment."],
  ["03", "Measurement Tools", "Length, area and related measurements support evaluation."],
  ["04", "ROI & Magnification", "Region-of-interest and magnification tools focus attention on specific indications."],
  ["05", "DIP / Profile Analysis", "Profile and DIP analysis support image-performance evaluation."],
  ["06", "SNR Evaluation", "SNR tools support image-quality and detector-performance assessment."],
];

const WHY: [string, string, string][] = [
  ["01", "Application Engineering", "Inspection architecture configured around pipe geometry, wall thickness, weld type and production workflow."],
  ["02", "Real-Time Digital Radiography", "Immediate digital image availability supports faster inspection decisions."],
  ["03", "Flexible System Architectures", "Cabinet, bunker and modular configurations support different facilities and production environments."],
  ["04", "Imaging & Analysis Software", "MQS Imaging Suite supports acquisition, enhancement, measurement and image-quality evaluation."],
  ["05", "Custom Engineering", "Mechanical handling, manipulation and integration can be adapted around the application."],
  ["06", "Lifecycle Support", "System support, service and application assistance help sustain inspection performance over time."],
];

/* ── step viewer: tabs over a stack of images, click to open full size ── */

function StepViewer({ steps, name, aspect, ground, dark = false }: {
  steps: Step[]; name: string; aspect: string; ground: string; dark?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState<Zoomable | null>(null);
  const close = useCallback(() => setZoom(null), []);
  const s = steps[step];
  const idle = dark ? "#fff" : INK;
  const edge = dark ? "rgba(255,255,255,.35)" : HAIR;
  return (
    <>
      <div role="tablist" aria-label={name} className="mt-9 flex flex-wrap gap-2">
        {steps.map((a, i) => {
          const on = i === step;
          return (
            <button key={a.src} role="tab" aria-selected={on} type="button" onClick={() => setStep(i)} className="cursor-pointer px-4 py-3"
              style={{ background: on ? CYAN : "transparent", color: on ? INK : idle, border: `1px solid ${on ? CYAN : edge}`, transition: `all 200ms ${EASE}` }}>
              <span style={{ font: `600 13px/1 ${SANS}`, letterSpacing: ".06em" }}>0{i + 1}</span>
              <span className="ml-2.5" style={{ font: `500 14px/1 ${SANS}` }}>{a.step}</span>
            </button>
          );
        })}
      </div>
      <button type="button" onClick={() => setZoom(s)} aria-label={`Open at full resolution: ${s.label}`}
        className="relative mt-5 block w-full cursor-zoom-in border-0 p-0" style={{ background: ground, aspectRatio: aspect, border: `1px solid ${dark ? HAIR_DARK : HAIR}` }}>
        {steps.map((a, i) => (
          <Image key={a.src} src={a.src} alt={a.alt} fill quality={92} sizes="(min-width:1330px) 1220px, 100vw"
            className="object-contain p-3 md:p-5" style={{ opacity: i === step ? 1 : 0, transition: `opacity 350ms ${EASE}` }} />
        ))}
        <ZoomIcon />
      </button>
      <p className="mt-4" aria-live="polite" style={{ font: `500 15px/1.4 ${SANS}`, color: dark ? "rgba(255,255,255,.86)" : INK }}>{s.label}</p>
      <Lightbox shot={zoom} onClose={close} />
    </>
  );
}

function Check({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <li className="grid grid-cols-[28px_1fr] items-center gap-3 py-3.5" style={{ borderBottom: `1px solid ${dark ? HAIR_DARK : HAIR}` }}>
      <span aria-hidden className="grid h-[22px] w-[22px] place-items-center" style={{ background: CYAN, color: INK }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square"><path d="M4 12l5 5L20 6" /></svg>
      </span>
      <span style={{ font: `500 16px/1.4 ${SANS}`, color: dark ? "#fff" : INK }}>{text}</span>
    </li>
  );
}

export default function PipeInspection() {
  return (
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      {/* ── hero ── split, Microfocus-style: the photograph is shot on a pale
          studio ground, so it sits in a frame rather than under the overlay. */}
      <section id="overview" className="relative overflow-hidden scroll-mt-[76px]" style={{ background: INK }}>
        <div className={`${SHELL} grid grid-cols-1 items-center gap-10 pb-12 pt-[120px] md:pb-16 md:pt-[132px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pb-[88px] lg:pt-[150px]`}>
          <div className="flex max-w-[620px] flex-col" style={{ gap: 18 }}>
            <p style={eyebrow(CYAN)}>Digital Radiography · Pipe Inspection</p>
            <h1 style={{ margin: 0, font: `600 clamp(30px,4.2vw,56px)/1.04 ${SANS}`, letterSpacing: "-.025em", color: "#fff", textWrap: "pretty" }}>
              Digital Radiography Systems for Pipe Inspection
            </h1>
            <p style={lead("rgba(255,255,255,.82)")}>Real-Time Butt Weld Inspection for Reliable Pipe Quality</p>
            <Badges items={BADGES} />
            <HeroActions />
          </div>
          <div className="relative" style={{ aspectRatio: "1703 / 923", border: `1px solid ${HAIR_DARK}`, background: "#E8EAEC" }}>
            <Image src="/assets/prod-pipe-hero.jpg" alt="MQS digital radiography system for pipe and butt weld inspection, with X-ray source and flat panel detector on a scissor-lift table"
              fill priority quality={90} sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <SubNav items={NAV_ITEMS} />
      <StatStrip stats={STATS} />

      {/* ── introduction ── */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div className="flex max-w-[78ch] flex-col gap-4">
            <p style={lead(BODY)}>
              MQS Technologies offers advanced digital radiography solutions for real-time pipe and butt weld inspection,
              helping manufacturers and quality teams detect critical weld discontinuities quickly, accurately and
              consistently. Designed for demanding inspection environments, our systems support evaluation of pipe weld
              integrity, enable high-quality radiographic imaging and improve decision-making through powerful image
              processing and analysis tools.
            </p>
            <p style={body(BODY)}>
              Our solutions are suitable for inspection of stainless steel, alloy steel and carbon steel pipes, and
              support applications where weld quality, repeatability and speed are critical.
            </p>
          </div>
          <div className="self-start p-6 md:p-7" style={{ background: INK }}>
            <h3 style={{ ...h3("#fff"), fontSize: 22 }}>Real-time inspection. Faster decisions.</h3>
            <p className="mt-3" style={{ ...body("rgba(255,255,255,.80)"), fontSize: 15 }}>
              Digital imaging removes film-processing delay and gives inspection teams immediate visibility of weld
              condition on the shop floor.
            </p>
          </div>
        </div>
      </Section>

      {/* ── weld evaluation: reference application + defects ── */}
      <Section id="specs" tone="page" ruled>
        <SectionHead kicker="Weld Evaluation" title="High-Performance Digital Radiography for Weld Evaluation"
          intro="MQS pipe inspection solutions deliver clear radiographic images for weld assessment and help inspection teams evaluate common discontinuities such as porosity, cluster porosity, lack of fusion, inclusions and cracks. Robust system design and intelligent imaging tools support faster inspection cycles, better defect visibility and consistent quality decisions." />
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h3 style={{ ...h3(INK), fontSize: 22 }}>Reference Application: Real-Time Butt Weld Inspection</h3>
            <p className="mb-6 mt-3" style={{ ...body(BODY), fontSize: 15 }}>
              A typical straight-pipe butt weld inspection application can be configured around the following operating window.
            </p>
            <SpecTable head={["Parameter", "Typical range / material"]} rows={REFERENCE} />
          </div>
          <div>
            <h3 style={{ ...h3(INK), fontSize: 22 }}>Defects the System Helps Reveal</h3>
            <ul className="m-0 mt-6 list-none p-0" style={{ borderTop: `1px solid ${INK}` }}>
              {DEFECTS.map((d) => <Check key={d} text={d} />)}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── real inspection evidence ── */}
      <Section id="evidence" tone="ink">
        <SectionHead dark title="Real Inspection Evidence"
          intro="Raw and processed radiographic views help inspectors improve visibility of fine discontinuities during evaluation." />
        <StepViewer steps={EVIDENCE} name="Radiographic views" aspect="2 / 1" ground="#05080A" dark />
      </Section>

      {/* ── system configurations ── */}
      <Section id="configurations" tone="white">
        <SectionHead kicker="System Configurations" title="One Inspection Need. Multiple Deployment Architectures."
          intro="MQS can configure the inspection architecture around the pipe geometry, weld location, source energy, shielding concept, available facility and production workflow. The imaging objective remains the same, while the mechanical and shielding architecture changes around the application." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2" style={{ gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
          {CONFIGS.map((c) => (
            <div key={c.n} className="flex flex-col" style={{ background: WHITE }}>
              <div className="relative" style={{ aspectRatio: "16 / 11", background: "#EEF1F3" }}>
                <Image src={c.src} alt={c.alt} fill quality={88} sizes="(min-width:768px) 50vw, 100vw" className="object-contain" />
              </div>
              <div className="p-6 md:p-7">
                <p style={label(CYAN_ON_LIGHT)}>0{c.n}</p>
                <h3 className="mt-3" style={{ ...h3(INK), fontSize: 22 }}>{c.title}</h3>
                <p className="mt-2.5" style={{ ...body(BODY), fontSize: 15 }}>{c.line}</p>
                <ul className="m-0 mt-5 list-none p-0" style={{ borderTop: `1px solid ${HAIR}` }}>
                  {c.points.map((p) => <Check key={p} text={p} />)}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-[78ch] pl-5" style={{ borderLeft: `3px solid ${CYAN}` }}>
          <h3 style={{ ...h3(INK), fontSize: 20 }}>Choose the architecture around the application.</h3>
          <p className="mt-2.5" style={body(BODY)}>
            Cabinet-based systems suit compact controlled inspection, bunker-based systems support larger or specialized
            installations, and modular concepts provide flexibility for custom handling and plant integration.
          </p>
        </div>
      </Section>

      {/* ── MQS Imaging Suite ── */}
      <Section id="imaging-suite" tone="page" ruled>
        <SectionHead kicker="MQS Imaging Suite" title="From Radiograph to Decision."
          intro="The MQS Imaging Suite enhances inspection capability by providing tools for image acquisition, analysis, enhancement and evaluation. It helps operators capture radiographs, review indications and document findings within a structured digital workflow." />
        <BenefitGrid items={SUITE} />
        <h3 className="mt-16" style={{ ...h2(INK), fontSize: "clamp(22px,2.2vw,30px)" }}>Selected Software Capabilities</h3>
        <StepViewer steps={SOFTWARE} name="Software capabilities" aspect="1920 / 1012" ground={WHITE} />
      </Section>

      {/* ── why MQS ── */}
      <Section id="why" tone="white">
        <p style={eyebrow(CYAN_ON_LIGHT)}>Why MQS</p>
        <h2 className="mt-4" style={h2(INK)}>Engineering the Inspection Around the Weld</h2>
        <p className="mt-4 max-w-[66ch]" style={lead(BODY)}>
          MQS combines radiographic expertise, application understanding and system engineering to deliver inspection
          solutions that are practical, reliable and performance-driven. Our Digital Radiography systems are developed to
          help customers improve weld-quality assessment while supporting production efficiency and inspection consistency.
        </p>
        <BenefitGrid items={WHY} />
      </Section>

      {/* ── brochure ── */}
      <Section id="downloads" tone="page" ruled>
        <DownloadsAndRelated downloadsTitle="Download Brochure"
          downloads={[{ name: "Digital Radiography Solutions for Pipe Inspection (PDF)", href: "/brochures/pipe-inspection-dr.pdf" }]} />
      </Section>
    </main>
  );
}
