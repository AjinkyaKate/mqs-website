/* ──────────────────────────────────────────────────────────────
   Services overview — /services
   Ported from the MACHIN design system template
   `templates/mqs-services/MqsServices.dc.html` (+ ServicesPage.jsx).

   Hero → three families → service finder → 01 inspection →
   02 precision manufacturing → [proof strip] → how it works →
   03 service & support → why PM matters → closing CTA.

   Deviations from the canvas template, all deliberate:
   · The template's own sticky header and footer are dropped — this page
     uses the site-wide SiteHeaderFull + Footer so every page shares one
     navbar and one footer.
   · The template's "Handoff annotations" block is a spec sheet for the
     build, not page content, so it is not shipped.
   · The proof strip is behind SHOW_PROOF_STRIP (see below).
   · The breadcrumb (Home / Services) is removed at the client's request, even
     though their content brief specifies it under "PAGE SETUP".
   · The template's closing CTA ("Tell Us What You Need.") is not rendered:
     ContactSection follows this page and already closes it, so the two stacked
     into a double call to action. Its copy came from the client brief's FINAL
     CTA section.
   · The template's `bp` prop (desktop/tablet/mobile trees) becomes fluid
     clamps + Tailwind breakpoints, matching the rest of this codebase.
   Palette 2B + site font. Static; only Reveal is client-side.
   ────────────────────────────────────────────────────────────── */

import type { CSSProperties } from "react";
import Reveal from "./Reveal";

/* Handoff, "Proof figures": the 3,500+ / 85,000+ statistics and their monthly
   capacities are pending public-publication approval. Hold the strip out of any
   released build until MQS clears them — then flip this to true. */
const SHOW_PROOF_STRIP = false;

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", HAIR_DARK = "rgba(255,255,255,.14)";
const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const NAVY = "#0B2A3A", NAVY_2 = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

const MAXW = 1330;
const GUT = "clamp(24px,4vw,55px)";
const PAD_Y = "clamp(64px,7vw,120px)";
const PAD_Y_SM = "clamp(56px,6vw,96px)";

/* Phase 1 scope is locked to a single /services/ page: the client content doc's
   five detail pages are not being built. The per-service "View ..." links are
   therefore gone, since there is nowhere for them to go, and each service block
   reads as complete in itself. The Service Finder still routes, but to the
   matching section on this page rather than to a detail page. */

/* ── image slots ──
   Each slot names the photograph the design calls for. Where no authentic MQS
   frame exists in /public/assets yet, `src` is left empty and the slot renders
   a labelled placeholder rather than a stand-in that does not depict it. */
type Slot = { src?: string; alt?: string; need: string };

const IMG: Record<string, Slot> = {
  hero: {
    /* IMG-01. The client's own photograph, replacing a generic stock frame.
       Note this is the same file MQS supplied twice, as both "Image 1.jpg" and
       "Preventive Maintenance Plans.jpg", and it also carries the About page's
       team band. Worth a distinct hero frame when one is available. */
    src: "/assets/svc-hero.jpg",
    alt: "MQS service engineer testing a system's control electronics with a digital multimeter",
    need: "Supplied at 6240×4160 as Service Overview/Image 1.jpg. Reused on /about-us; a distinct frame would be better.",
  },
  inspection: {
    /* IMG-02. A real CT volume with defect indications annotated, replacing a
       generic cabinet render. */
    src: "/assets/svc-ct-inspection.jpg",
    alt: "CT volume of a machined linkage with defect indications and volume measurements annotated",
    need: "Supplied at 2067×1177 as Service Overview/CT Inspection Services.jpg.",
  },
  subAssemblies: {
    /* IMG-03. Deliberately empty: the only supplied frame is 175×224 against an
       800×600 spec, so it renders a labelled placeholder rather than a stand-in. */
    need: "EM Guide and B3 power supply, per the brief. Supplied frame is only 175×224. Need 1600×1200.",
  },
  electronics: {
    need: "Authentic MQS industrial electronics: control unit, PCB integration or cabinet wiring. 4:3, 1600×1200 minimum.",
  },
  maintenance: {
    /* IMG-04. Deliberately empty. The stock frame that stood here is removed, and
       the only supplied candidate is byte-identical to IMG-01 above. */
    need: "Engineer performing maintenance on an MQS system, panel open, tooling in hand. Must be distinct from the hero frame. 1200×1600.",
  },
};

/* ── shared bits ── */

const h1 = (color: string): CSSProperties => ({
  margin: 0, font: `600 clamp(30px,4vw,48px)/1.08 ${SANS}`, letterSpacing: "-.025em", color, textWrap: "pretty",
});
const h2 = (color: string): CSSProperties => ({
  margin: 0, font: `600 clamp(26px,3.2vw,38px)/1.12 ${SANS}`, letterSpacing: "-.025em", color, textWrap: "pretty",
});
const lead = (color: string): CSSProperties => ({
  margin: 0, font: `400 clamp(16px,1.5vw,18px)/1.6 ${SANS}`, color, textWrap: "pretty",
});
const bodyText = (color: string): CSSProperties => ({
  margin: 0, font: `400 16px/1.6 ${SANS}`, color, textWrap: "pretty",
});

const btn = (bg: string, color: string, border?: string): CSSProperties => ({
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
  height: 52, padding: "0 26px", background: bg, color, border: border ?? "0",
  transition: `background 200ms ${EASE},color 200ms ${EASE}`,
});

function Arrow({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="square" aria-hidden="true"
      className={className} style={{ display: "block" }}>
      <path d="M4 12h14M12 5.5 18.5 12 12 18.5" />
    </svg>
  );
}

function Section({
  id, tone = "page", padY = PAD_Y, children,
}: {
  id?: string; tone?: "page" | "white" | "inset" | "navy"; padY?: string; children: React.ReactNode;
}) {
  const bg = { page: PAGE, white: WHITE, inset: INSET, navy: NAVY }[tone];
  return (
    <section id={id} style={{ background: bg }}>
      <div className="mx-auto" style={{ maxWidth: MAXW, padding: `${padY} ${GUT}` }}>{children}</div>
    </section>
  );
}

function Marker({ number, label, onDark = false }: { number: string; label: string; onDark?: boolean }) {
  return (
    <div className="flex items-center" style={{ gap: 10 }}>
      <span className="t-eyebrow" style={{ color: onDark ? CYAN : CYAN_L, fontWeight: 600 }}>{number}</span>
      <span aria-hidden="true" style={{ width: 18, height: 1, background: onDark ? HAIR_DARK : HAIR }} />
      <span className="t-eyebrow" style={{ color: onDark ? "rgba(255,255,255,.74)" : MUTED }}>{label}</span>
    </div>
  );
}

/* Uppercase text link with a hairline underline and a nudging arrow. */
function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href}
      className="group t-button inline-flex items-center no-underline transition-colors duration-200 hover:!text-[#0B2A3A] hover:!border-[#0B2A3A]"
      style={{ gap: 10, minHeight: 44, color: CYAN_L, borderBottom: `1px solid ${HAIR}`, width: "fit-content" }}>
      {children}
      <Arrow size={16} className="transition-transform duration-200 group-hover:translate-x-[3px]" />
    </a>
  );
}

function CapItem({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <li className="flex" style={{
      gap: 12, padding: "13px 0", borderTop: `1px solid ${onDark ? HAIR_DARK : HAIR}`,
      font: `400 15px/1.6 ${SANS}`, color: onDark ? "rgba(255,255,255,.86)" : BODY,
    }}>
      <span aria-hidden="true" style={{ flex: "0 0 auto", width: 6, height: 6, marginTop: 8, background: CYAN }} />
      {children}
    </li>
  );
}

/* Image slot: the photograph if one exists, otherwise a labelled placeholder
   stating the frame the design asks for. */
function Photo({ slot, className, style }: { slot: Slot; className?: string; style?: CSSProperties }) {
  if (slot.src) {
    return (
      <div className={className} style={{ background: INSET, overflow: "hidden", ...style }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slot.src} alt={slot.alt ?? ""} loading="lazy" decoding="async"
          className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={className}
      style={{ background: INSET, border: `1px solid ${HAIR}`, display: "grid", placeItems: "center", padding: "clamp(20px,3vw,32px)", ...style }}>
      <div className="flex flex-col items-center text-center" style={{ gap: 12, maxWidth: 320 }}>
        <span aria-hidden="true" style={{ width: 10, height: 10, background: CYAN }} />
        <span className="t-caption" style={{ color: CYAN_L }}>Photography pending</span>
        <span style={{ font: `400 13px/1.55 ${SANS}`, color: MUTED }}>{slot.need}</span>
      </div>
    </div>
  );
}

/* ── 1. hero ── */

function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: NAVY, minHeight: "clamp(520px,52vw,640px)", display: "flex", alignItems: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.hero.src} alt="" className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "grayscale(1)", opacity: 0.3 }} />
      <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.94) 0%,rgba(11,42,58,.86) 46%,rgba(11,42,58,.62) 100%)" }} />
      <div className="relative mx-auto w-full" style={{ maxWidth: MAXW, padding: `clamp(120px,12vw,170px) ${GUT} clamp(56px,6vw,88px)` }}>
        <div className="flex flex-col" style={{ gap: "clamp(16px,1.8vw,22px)" }}>
          <div className="t-eyebrow" style={{ color: CYAN_D }}>Services</div>
          <h1 style={{ ...h1("#fff"), font: `600 clamp(34px,5vw,68px)/1.05 ${SANS}`, maxWidth: "20ch" }}>
            More Than Machines.<br />Capability You Can Call On.
          </h1>
          <p style={{ ...lead("rgba(255,255,255,.82)"), maxWidth: "58ch" }}>
            Not every requirement means buying a system. Send us the part and we will scan it. Send us the
            drawing and we will build it. Already own an MQS system, we keep it running.
          </p>
          <div className="flex flex-col items-stretch sm:flex-row sm:flex-wrap sm:items-center" style={{ gap: 14, marginTop: 10 }}>
            <a href="#contact" className="t-button hover:!bg-white hover:!text-[#0B2A3A]" style={btn(CYAN, "#08283A")}>
              Raise a Service Request
            </a>
            <a href="#contact" className="t-button hover:!bg-white/20" style={btn("rgba(255,255,255,.1)", "#fff", "1px solid rgba(255,255,255,.28)")}>
              Talk to Our Team<Arrow size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. three service families ── */

const FAMILIES: [string, string, string, string][] = [
  ["01", "Inspection Services", "Send us the part.", "#inspection-services"],
  ["02", "Precision Manufacturing", "Send us the drawing.", "#precision-manufacturing"],
  ["03", "Service & Support", "Keep the system running.", "#service-support"],
];

function Families() {
  return (
    <Section tone="white" padY={PAD_Y_SM}>
      <Reveal>
        <div className="grid items-end" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(420px,100%),1fr))", gap: "clamp(20px,4vw,48px)", marginBottom: "clamp(28px,3.5vw,44px)" }}>
          <div className="flex flex-col" style={{ gap: 18 }}>
            <div className="t-eyebrow" style={{ color: CYAN_L }}>Our services</div>
            <h2 style={{ ...h2(INK), maxWidth: "22ch" }}>Three Ways We Support Your Operation.</h2>
          </div>
          <p style={{ ...lead(BODY), maxWidth: "52ch" }}>
            Whether you need an inspection result, a build-to-spec manufacturing partner or lifecycle support
            for an installed system, MQS routes your requirement to the right engineering team.
          </p>
        </div>
        {/* 1px gaps over a hairline ground draw the dividers at any column count */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: HAIR, borderTop: `1px solid ${HAIR}` }}>
          {FAMILIES.map(([n, label, line, href], i) => (
            <a key={n} href={href}
              className={`group flex items-start justify-between no-underline transition-shadow duration-200 hover:shadow-[inset_0_3px_0_#16C1F3] ${i > 0 ? "md:pl-7" : ""}`}
              style={{ gap: 20, background: WHITE, padding: "24px 28px 24px 0", minHeight: 44 }}>
              <span className="flex flex-col" style={{ gap: 8, paddingRight: 8 }}>
                <span style={{ font: `600 13px/1 ${DISPLAY}`, letterSpacing: ".08em", color: CYAN_L }}>{n}</span>
                <span className="transition-colors duration-200 group-hover:!text-[#0A6A88]"
                  style={{ font: `500 clamp(19px,2vw,22px)/1.25 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{label}</span>
                <span style={{ font: `400 15px/1.6 ${SANS}`, color: MUTED }}>{line}</span>
              </span>
              <span className="transition-transform duration-200 group-hover:translate-y-[2px] group-hover:!text-[#0A6A88]"
                style={{ color: MUTED, marginTop: 4, transform: "rotate(90deg)" }}>
                <Arrow size={18} />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 3. service finder ── */

const FINDER: [string, string, string][] = [
  ["Need results but not a system", "CT Inspection Services", "#inspection-services"],
  ["Have a drawing and need it built", "Precision Sub-Assemblies", "#precision-manufacturing"],
  ["Need custom control or power electronics", "Industrial Electronics", "#precision-manufacturing"],
  ["Own a system and want it to stay reliable", "Preventive Maintenance Plans", "#service-support"],
  ["Have a system that is down right now", "Repair & Breakdown Support", "#service-support"],
];

function ServiceFinder() {
  return (
    <Section tone="page" padY={PAD_Y_SM}>
      <Reveal>
        <div className="grid items-end" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(400px,100%),1fr))", gap: "clamp(16px,2.5vw,32px)", marginBottom: "clamp(28px,3vw,40px)" }}>
          <h2 style={{ ...h2(INK), maxWidth: "20ch" }}>Which One Do You Need?</h2>
          <p style={{ ...lead(BODY), maxWidth: "46ch" }}>
            Pick the situation that matches yours. Each route goes to the engineers who handle it.
          </p>
        </div>
        <div className="grid" style={{ gap: 1, background: HAIR, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          {FINDER.map(([situation, service, href]) => (
            <a key={service} href={href}
              className="group grid items-center no-underline transition-[background-color,box-shadow] duration-200 grid-cols-[1fr_auto] hover:!bg-white hover:shadow-[inset_3px_0_0_#16C1F3] md:grid-cols-[1.1fr_1fr_auto]"
              style={{ background: PAGE, gap: "6px 16px", padding: "clamp(18px,2vw,26px) clamp(16px,2vw,24px)", minHeight: 44 }}>
              <span className="col-start-1 md:col-auto" style={{ font: `400 15px/1.6 ${SANS}`, color: MUTED }}>{situation}</span>
              <span className="col-start-1 transition-colors duration-200 group-hover:!text-[#0A6A88] md:col-auto"
                style={{ font: `500 clamp(17px,1.8vw,20px)/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{service}</span>
              <span className="col-start-2 row-start-1 row-end-3 self-center transition-transform duration-200 group-hover:translate-x-[4px] group-hover:!text-[#0A6A88] md:col-auto md:row-auto"
                style={{ color: MUTED }}>
                <Arrow />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 4. inspection services ── */

const CAPS = [
  "2D, 3D and full CT inspection",
  "Internal and external non-destructive inspection",
  "Failure and root-cause analysis",
  "Reverse engineering and product-development support",
  "Dimensional measurement and CAD comparison",
  "Wall-thickness analysis",
  "Casting and weld inspection",
  "Contamination and FOD screening",
  "Material characterization and metrology",
];

const SPECS = [
  "Conventional X-ray up to 450 kV",
  "CT system",
  "High-energy digital flat-panel detector",
  "Fully automated object handling",
  "MQS Imaging Suite",
  "Lead-shielded cabinet",
];

function Inspection() {
  return (
    <Section id="inspection-services" tone="white">
      <Reveal>
        <div className="flex flex-col" style={{ gap: 20, marginBottom: "clamp(36px,4.5vw,56px)" }}>
          <Marker number="01" label="Inspection Services" />
          <h2 style={h1(INK)}>Send Us the Part.</h2>
          <p style={{ ...lead(BODY), maxWidth: "58ch" }}>
            For teams who need CT results before they need a CT system, or who need one-off answers that do
            not justify capital equipment.
          </p>
        </div>
        <div className="grid items-start lg:grid-cols-[1fr_1.05fr]" style={{ gap: "clamp(36px,5vw,72px)" }}>
          <div className="flex flex-col" style={{ gap: 22 }}>
            <h3 className="t-eyebrow" style={{ margin: 0, color: CYAN_L }}>CT Inspection Services</h3>
            <p style={{ margin: 0, font: `600 clamp(26px,3.4vw,40px)/1.08 ${SANS}`, letterSpacing: "-.02em", color: INK }}>
              See Inside in 3D.<br />Validate with Confidence.
            </p>
            <p style={{ ...lead(BODY), maxWidth: "52ch" }}>
              Fast, non-destructive CT scanning for defect detection, reverse engineering, metrology and
              failure analysis, on objects from microns to feet in size.
            </p>
            <ul className="m-0 grid list-none p-0 sm:grid-cols-2" style={{ gap: "0 40px", marginTop: 8 }}>
              {CAPS.map((c) => <CapItem key={c}>{c}</CapItem>)}
            </ul>
          </div>
          <div className="flex flex-col">
            <Photo slot={IMG.inspection} className="aspect-[16/10] w-full lg:aspect-[4/3]" />
            <div className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: 1, background: HAIR, border: `1px solid ${HAIR}`, borderTop: 0 }}>
              {SPECS.map((s) => (
                <div key={s} className="t-caption flex items-center" style={{ gap: 10, background: PAGE, padding: "16px 18px", color: INK }}>
                  <span aria-hidden="true" style={{ flex: "0 0 auto", width: 5, height: 5, background: CYAN }} />{s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 5. precision manufacturing ── */

type Mfg = { title: string; slot: Slot; body: string; caps: string[] };

const MFG: Mfg[] = [
  {
    title: "Precision Sub-Assemblies",
    slot: IMG.subAssemblies,
    body: "Mission-critical electro-mechanical and electronic assemblies, built in-house and proven in defence programmes.",
    caps: ["Electro-mechanical sub-assemblies", "Electronic modules and control units", "Indigenization and import substitution",
      "Testing and qualification support", "Repeatable batch production", "Low-volume through series supply",
      "Fixtures, tools and test setups"],
  },
  {
    title: "Industrial Electronics",
    slot: IMG.electronics,
    body: "Custom electronics and control systems for mission-critical applications, engineered for reliability, long life and repeatable performance in harsh environments.",
    caps: ["Custom control units", "Electronic modules", "Power electronics", "Power-supply units",
      "Wiring and harness integration", "Connectors and enclosures", "Embedded systems", "Microcontroller platforms"],
  },
];

function Precision() {
  return (
    <Section id="precision-manufacturing" tone="inset">
      <Reveal>
        <div className="flex flex-col" style={{ gap: 20, marginBottom: "clamp(32px,4vw,48px)" }}>
          <Marker number="02" label="Precision Manufacturing" />
          <h2 style={h1(INK)}>Send Us the Drawing.</h2>
          <p style={{ ...lead(BODY), maxWidth: "56ch" }}>
            Build-to-spec manufacturing for defence and industrial programmes, from low-volume critical builds
            to series production.
          </p>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(360px,100%),1fr))", gap: "clamp(24px,2.5vw,32px)" }}>
          {MFG.map((m) => (
            <article key={m.title}
              className="flex flex-col transition-[transform,box-shadow] duration-[240ms] hover:-translate-y-0.5 hover:shadow-[0_2px_10px_rgba(11,42,58,.07)]"
              style={{ background: WHITE, border: `1px solid ${HAIR}`, borderTop: `3px solid ${CYAN}`, boxShadow: "0 1px 2px rgba(11,42,58,.04)" }}>
              <Photo slot={m.slot} className="aspect-[4/3] w-full" />
              <div className="flex flex-1 flex-col" style={{ padding: "clamp(24px,2.6vw,36px)", gap: 16 }}>
                <h3 style={{ margin: 0, font: `600 clamp(22px,2.2vw,26px)/1.2 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{m.title}</h3>
                <p style={bodyText(BODY)}>{m.body}</p>
                <ul className="m-0 list-none p-0" style={{ marginTop: 4 }}>
                  {m.caps.map((c) => <CapItem key={c}>{c}</CapItem>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 6. proof strip (gated — see SHOW_PROOF_STRIP) ── */

const PROOF: [string, string, string][] = [
  ["3,500+", "Missile control sections supplied", "100 units / month"],
  ["85,000+", "Piezoelectric generators supplied", "5,000 units / month"],
];

function Proof() {
  return (
    <Section tone="navy" padY={PAD_Y_SM}>
      <div className="grid md:grid-cols-2" style={{ gap: 40 }}>
        {PROOF.map(([figure, label, rate], i) => (
          <div key={figure} className={i === 1 ? "md:border-l md:pl-14" : "md:pr-14"}
            style={i === 1 ? { borderColor: HAIR_DARK } : undefined}>
            <div style={{ font: `600 clamp(52px,7vw,88px)/1 ${DISPLAY}`, letterSpacing: "-.03em", color: "#fff" }}>{figure}</div>
            <p style={{ ...lead("rgba(255,255,255,.82)"), margin: "16px 0 0", maxWidth: "26ch" }}>{label}</p>
            <p className="t-eyebrow" style={{ margin: "10px 0 0", color: CYAN }}>{rate}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── 7. how it works ── */

const STEPS: [string, string][] = [
  ["01", "Share the drawing, BOM or requirement"],
  ["02", "Design-for-manufacture review and process plan"],
  ["03", "Prototype or pilot build and validation"],
  ["04", "Series production, inspection and documentation"],
];

function HowItWorks() {
  return (
    <Section tone="white">
      <Reveal>
        <div className="flex flex-col" style={{ gap: 18, marginBottom: "clamp(36px,4.5vw,56px)" }}>
          <div className="t-eyebrow" style={{ color: CYAN_L }}>How it works</div>
          <h2 style={h2(INK)}>From Requirement to Repeatable Production.</h2>
        </div>
        <ol className="m-0 grid list-none p-0" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: "clamp(20px,2.5vw,32px)" }}>
          {STEPS.map(([n, t]) => (
            <li key={n} style={{ position: "relative", borderTop: `1px solid ${HAIR}`, paddingTop: 20 }}>
              <span aria-hidden="true" style={{ position: "absolute", top: -1, left: 0, width: 32, height: 3, background: CYAN }} />
              <div style={{ font: `600 14px/1 ${DISPLAY}`, letterSpacing: ".06em", color: CYAN_L, marginBottom: 14 }}>{n}</div>
              <p style={{ margin: 0, font: `500 clamp(16px,1.6vw,18px)/1.45 ${SANS}`, color: INK, textWrap: "pretty" }}>{t}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}

/* ── 8. service & support ── */

type Panel = { title: string; lead: string; intro: string; items: string[]; dark?: boolean };

const SUPPORT: Panel[] = [
  {
    title: "Preventive Maintenance Plans (AMC)",
    lead: "Maximize uptime. Protect performance. Extend system life.",
    intro: "An Annual Maintenance Contract shifts customers from waiting for breakdowns to scheduled health checks, calibration and safety verification.",
    items: ["Scheduled preventive-maintenance visits", "Safety and compliance checks",
      "Interlock, shielding and warning-system checks", "Performance verification", "Calibration support",
      "MIS and workflow health checks", "Remote support and troubleshooting", "Traceable service reports"],
  },
  {
    title: "Repair & Breakdown Support",
    lead: "Fast response. Expert diagnostics. Reliable restoration of uptime.",
    intro: "When a system is down, every minute affects production, dispatch and quality confidence.",
    items: ["Remote troubleshooting and first response", "On-site diagnosis and repair", "Root-cause analysis",
      "Electrical subsystem repair", "Mechanical and motion-system repair", "Imaging and control-system repair",
      "Post-repair calibration", "Performance verification", "Service report with recommendations"],
    dark: true,
  },
];

function SupportPanel({ panel }: { panel: Panel }) {
  const dark = !!panel.dark;
  return (
    <div className={dark ? "" : "transition-shadow duration-[240ms] hover:shadow-[0_2px_10px_rgba(11,42,58,.07)]"}
      style={{
        background: dark ? NAVY_2 : WHITE,
        border: `1px solid ${dark ? NAVY_2 : HAIR}`,
        borderLeft: `3px solid ${CYAN}`,
        padding: "clamp(24px,2.6vw,32px)",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
      <h3 style={{ margin: 0, font: `500 clamp(20px,2.2vw,24px)/1.25 ${SANS}`, letterSpacing: "-.015em", color: dark ? "#fff" : INK }}>{panel.title}</h3>
      <p style={{ margin: 0, font: `500 clamp(17px,1.7vw,19px)/1.35 ${SANS}`, letterSpacing: "-.01em", color: dark ? CYAN_D : CYAN_L }}>{panel.lead}</p>
      <p style={bodyText(dark ? "rgba(255,255,255,.8)" : BODY)}>{panel.intro}</p>
      <ul className="m-0 list-none p-0">
        {panel.items.map((i) => <CapItem key={i} onDark={dark}>{i}</CapItem>)}
      </ul>
    </div>
  );
}

function SupportSection() {
  return (
    <Section id="service-support" tone="page">
      <Reveal>
        <div className="flex flex-col" style={{ gap: 20, marginBottom: "clamp(32px,4vw,48px)" }}>
          <Marker number="03" label="Service & Support" />
          <h2 style={h1(INK)}>Already Running an MQS System?</h2>
          <p style={{ ...lead(BODY), maxWidth: "58ch" }}>
            Lifecycle support for installed systems: planned maintenance to keep them running, and breakdown
            response when they are not.
          </p>
        </div>
        <div className="grid items-start lg:grid-cols-[1fr_1.15fr]" style={{ gap: "clamp(28px,3.5vw,48px)" }}>
          <Photo slot={IMG.maintenance} className="aspect-[16/9] w-full lg:sticky lg:top-[100px] lg:aspect-[3/4] lg:max-h-[620px]" />
          <div className="grid" style={{ gridTemplateColumns: "1fr", gap: "clamp(20px,2vw,24px)" }}>
            {SUPPORT.map((p) => <SupportPanel key={p.title} panel={p} />)}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 9. why preventive maintenance matters ── */

const BENEFITS: [string, string, string][] = [
  ["01", "Less Downtime", "Fewer production interruptions"],
  ["02", "Consistent Image Quality", "Stable inspection outcomes"],
  ["03", "Longer Equipment Life", "Better return on capital investment"],
  ["04", "Audit Readiness", "Documented service history"],
];

function Benefits() {
  return (
    <Section tone="white" padY={PAD_Y_SM}>
      <Reveal>
        <h2 style={{ ...h2(INK), marginBottom: "clamp(32px,4vw,48px)", maxWidth: "28ch" }}>Why Preventive Maintenance Matters</h2>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: "clamp(24px,2.5vw,32px)" }}>
          {BENEFITS.map(([n, t, b]) => (
            <div key={n} style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 20 }}>
              <div style={{ font: `600 13px/1 ${DISPLAY}`, letterSpacing: ".08em", color: CYAN_L, marginBottom: 14 }}>{n}</div>
              <h3 style={{ margin: "0 0 10px", font: `500 19px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{t}</h3>
              <p style={{ margin: 0, font: `400 15px/1.6 ${SANS}`, color: MUTED, textWrap: "pretty" }}>{b}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── page ── */

export default function ServicesOverview() {
  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      <Hero />
      <Families />
      <ServiceFinder />
      <Inspection />
      <Precision />
      {SHOW_PROOF_STRIP && <Proof />}
      <HowItWorks />
      <SupportSection />
      <Benefits />
    </main>
  );
}
