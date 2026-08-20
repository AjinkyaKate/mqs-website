import Image from "next/image";
import Link from "next/link";
import {
  Btn, GhostBtn,
  BODY, CYAN, CYAN_INK, HAIR, HAIR_SOFT, MUTED, NAVY, PAGE, WHITE,
  SHELL, T_BODY, T_EYEBROW, TR_EYEBROW, TR_LABEL,
  bodyText, eyebrow, figure, h2, h3, lead, microLabel,
} from "./system";
import {
  Analysis, Anatomy, Applications, Benefits, BenefitsStrip,
  CTA, Models, Results, Service, Specs, WhyCT,
} from "./sections";

/* ──────────────────────────────────────────────────────────────
   The five concepts. Each is a bespoke hero plus an ordered run of the shared
   sections; the sections themselves are identical across all five, so the only
   variables under review are sequence, hierarchy and hero treatment.

   The site header is position:fixed at 60 / 72 / 76px, so each concept opens
   with .mqctc-page to clear it. The design's own MqctNav and MqctFooter are
   simplified stand-ins for the real site chrome, so the real SiteHeaderFull
   and Footer are used by the routes instead.

   Type tokens are resolved in system.tsx rather than read from --type-*,
   because the site's globals.css defines those same names at a different
   scale: --type-eyebrow is 12px/1 here and 13px/1.2 in the design project.
   Referencing the site tokens would silently retype every concept.
   ────────────────────────────────────────────────────────────── */

const HERO_LEAD =
  "Fully customized CT systems that uncover defects in places a 2D image cannot reach; from PCBs and battery cells to rocket motors and thick steel castings, with defect analysis that feeds back into defect-free production.";

/* Split across two lines in four of the five heroes, on one line in the
   compact hero. */
function HeadlineTwoLine({ size }: { size: string }) {
  return (
    <h1 style={{ margin: 0, font: `600 ${size} var(--font-sans)`, letterSpacing: "-0.03em", color: NAVY, maxWidth: "17ch", textWrap: "pretty" }}>
      See inside in 3D.<br />Measure with <span style={{ color: CYAN_INK }}>confidence</span>.
    </h1>
  );
}

/* ── energy figures ──
   Five variants, because each hero welds them differently. Kept separate
   rather than parameterised: the padding, ground, divider colour, figure size
   and even the labels differ between them. */

const ENERGY: [string, string, string][] = [
  ["300", "kV", "Microfocus"],
  ["450", "kV", "Minifocus"],
  ["15", "MeV", "LINAC high energy"],
  ["427", "mm", "Maximum detector size"],
];

/* Concept 01: welded under the split hero, white cells on a hairline ground. */
function EnergyStripStacked() {
  return (
    <div style={{ ...SHELL, marginTop: "clamp(32px,3.6cqi,56px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: HAIR, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        {ENERGY.map(([n, unit, label], i) => (
          <div key={label} style={{
            flex: "1 1 160px", background: WHITE,
            padding: i === 0
              ? "clamp(20px,2.2cqi,28px) clamp(4px,1cqi,12px) clamp(20px,2.2cqi,28px) 0"
              : "clamp(20px,2.2cqi,28px) clamp(4px,1cqi,12px)",
          }}>
            <p style={figure("clamp(28px,3.2cqi,42px)/1")}>
              {n} <span style={{ fontSize: ".55em", letterSpacing: 0, color: CYAN_INK }}>{unit}</span>
            </p>
            <p style={{ ...eyebrow(MUTED), marginTop: 10 }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Concept 02: a ruled band below the two-block hero, on the page ground. */
function EnergyBandStacked() {
  return (
    <div style={{ borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`, background: PAGE }}>
      <div style={SHELL}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: HAIR_SOFT }}>
        {ENERGY.map(([n, unit, label], i) => (
          <div key={label} style={{
            flex: "1 1 170px", background: PAGE,
            padding: i === 0
              ? "clamp(18px,2cqi,26px) clamp(8px,1.4cqi,20px) clamp(18px,2cqi,26px) 0"
              : "clamp(18px,2cqi,26px) clamp(8px,1.4cqi,20px)",
          }}>
            <p style={figure("clamp(26px,2.8cqi,36px)/1")}>
              {n} <span style={{ fontSize: ".55em", color: CYAN_INK }}>{unit}</span>
            </p>
            <p style={{ ...eyebrow(MUTED), marginTop: 8 }}>{label}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

/* Concepts 03 and 05: baseline pairs rather than stacked figures, so the
   strip stays shallow where the hero above it is already tall. */
function EnergyStripInline({ ground, compact }: { ground: string; compact?: boolean }) {
  const labels = compact
    ? ["Microfocus", "Minifocus", "LINAC high energy", "Max detector"]
    : ["Microfocus", "Minifocus", "LINAC high energy", "Max detector size"];
  const pad = compact ? "clamp(16px,1.8cqi,22px)" : "clamp(16px,1.8cqi,24px)";
  return (
    <div style={SHELL}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: HAIR_SOFT }}>
      {ENERGY.map(([n, unit], i) => (
        <div key={labels[i]} style={{
          flex: "1 1 170px", background: ground,
          padding: i === 0 ? `${pad} clamp(8px,1.4cqi,20px) ${pad} 0` : `${pad} clamp(8px,1.4cqi,20px)`,
          display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap",
        }}>
          <span style={figure(compact ? "clamp(22px,2.2cqi,28px)/1" : "clamp(22px,2.4cqi,32px)/1")}>{n} {unit}</span>
          <span style={eyebrow(MUTED)}>{labels[i]}</span>
        </div>
      ))}
      </div>
    </div>
  );
}

/* Concept 04: a 2 by 2 block parked beside the compact hero copy. */
function EnergyBlock() {
  const short: [string, string, string][] = [
    ["300", "kV", "Microfocus"], ["450", "kV", "Minifocus"],
    ["15", "MeV", "LINAC"], ["427", "mm", "Max detector"],
  ];
  return (
    <div style={{ flex: "1 1 280px", minWidth: 250, display: "flex", flexWrap: "wrap", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
      {short.map(([n, unit, label]) => (
        <div key={label} style={{ flex: "1 1 120px", background: PAGE, padding: "clamp(14px,1.6cqi,20px)" }}>
          <p style={figure("clamp(22px,2.2cqi,30px)/1")}>
            {n} <span style={{ fontSize: ".55em", color: CYAN_INK }}>{unit}</span>
          </p>
          <p style={{ ...microLabel(), marginTop: 8 }}>{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Concept 01: Decision Journey ── */

function HeroSplit() {
  return (
    <section style={{ containerType: "inline-size", background: WHITE, padding: "clamp(40px,5cqi,80px) 0 0" }}>
      <div style={{ ...SHELL, display: "flex", flexWrap: "wrap", gap: "clamp(28px,3.4cqi,56px)", alignItems: "center" }}>
        <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: "clamp(18px,2cqi,26px)" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", flexWrap: "wrap", gap: 8, font: T_EYEBROW, letterSpacing: TR_LABEL, color: MUTED }}>
            <Link href="/" style={{ color: MUTED, textDecoration: "none" }}>Home</Link><span aria-hidden>/</span>
            <Link href="/products" style={{ color: MUTED, textDecoration: "none" }}>Products</Link><span aria-hidden>/</span>
            <span aria-current="page" style={{ color: NAVY }}>MQCT Series</span>
          </nav>
          <p style={eyebrow()}>MQCT Series · Computed tomography solutions</p>
          <HeadlineTwoLine size="clamp(34px,5.2cqi,72px)/1.04" />
          <p style={{ ...lead(), maxWidth: "56ch" }}>{HERO_LEAD}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Btn>Request a Demo</Btn>
            <GhostBtn>See Specifications</GhostBtn>
          </div>
        </div>
        <div style={{ flex: "1 1 420px", minWidth: 280, background: WHITE, border: `1px solid ${HAIR}` }}>
          <Image src="/assets/mqctc-openframe.jpg" width={2400} height={1350} priority quality={88}
            alt="MQCT open-frame microfocus CT inspection system with rotary stage and flat panel detector"
            sizes="(min-width:1330px) 620px, 100vw"
            style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </div>
      <EnergyStripStacked />
    </section>
  );
}

export function ConceptDecisionJourney() {
  return (
    <main className="mqctc-page">
      <HeroSplit />
      <WhyCT />
      <Analysis />
      <Models />
      <Anatomy />
      <Benefits />
      <Results />
      <Applications />
      <Specs />
      <Service />
      <CTA />
    </main>
  );
}

/* ── Concept 02: Product Anatomy ── */

function HeroEquipment() {
  return (
    <section style={{ containerType: "inline-size", background: WHITE }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
        <div style={{
          flex: "1 1 460px", minWidth: 300, background: PAGE,
          display: "flex", flexDirection: "column", justifyContent: "center",
          gap: "clamp(18px,2cqi,26px)", padding: "clamp(40px,5cqi,88px) clamp(24px,3.9cqi,55px)",
        }}>
          <p style={eyebrow()}>MQCT Series · Computed tomography solutions</p>
          <h1 style={{ margin: 0, font: `600 clamp(34px,4.6cqi,64px)/1.04 var(--font-sans)`, letterSpacing: "-0.03em", color: NAVY, maxWidth: "16ch", textWrap: "pretty" }}>
            See inside in 3D.<br />Measure with <span style={{ color: CYAN_INK }}>confidence</span>.
          </h1>
          <p style={{ ...lead(), maxWidth: "50ch" }}>{HERO_LEAD}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Btn>Request a Demo</Btn>
            <GhostBtn>See Specifications</GhostBtn>
          </div>
        </div>
        <div style={{ flex: "1 1 520px", minWidth: 300, background: WHITE, display: "flex", alignItems: "center", position: "relative" }}>
          <Image src="/assets/mqctc-cabinet.jpg" width={2400} height={1493} priority quality={88}
            alt="MQCT shielded CT inspection cabinet with motorized doors open, manipulator and detector inside"
            sizes="(min-width:1024px) 55vw, 100vw"
            style={{ width: "100%", height: "100%", minHeight: "clamp(260px,34cqi,560px)", objectFit: "cover", objectPosition: "50% 55%", display: "block" }} />
          <span style={{ position: "absolute", left: 0, bottom: 0, background: NAVY, color: WHITE, font: T_EYEBROW, letterSpacing: TR_EYEBROW, textTransform: "uppercase", padding: "10px 14px" }}>
            Cabinet shown: MQCT 225AB, naming pending
          </span>
        </div>
      </div>
      <EnergyBandStacked />
    </section>
  );
}

export function ConceptProductAnatomy() {
  return (
    <main className="mqctc-page">
      <HeroEquipment />
      <Anatomy />
      <BenefitsStrip />
      <Models />
      <WhyCT />
      <Analysis />
      <Results />
      <Specs />
      <Applications />
      <Service />
      <CTA />
    </main>
  );
}

/* ── Concept 03: Results First ── */

function HeroFullBleed() {
  return (
    <>
      <section style={{
        containerType: "inline-size", position: "relative", background: "#000",
        minHeight: "clamp(420px,44cqi,720px)", display: "flex", alignItems: "flex-end", overflow: "hidden",
      }}>
        <Image src="/assets/mqctc-wallthickness.jpg" fill priority quality={90} sizes="100vw"
          alt="CT wall thickness colour map of an aluminium casting"
          style={{ objectFit: "cover", objectPosition: "60% 45%" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(8,34,47,.96) 0%,rgba(8,34,47,.88) 42%,rgba(8,34,47,.35) 100%)" }} />
        <div style={{
          position: "relative", maxWidth: 1330, width: "100%", margin: "0 auto",
          padding: "clamp(48px,6cqi,104px) clamp(24px,3.9cqi,55px)",
          display: "flex", flexDirection: "column", gap: "clamp(18px,2cqi,26px)",
        }}>
          <p style={eyebrow(CYAN)}>MQCT Series · Computed tomography solutions</p>
          <h1 style={{ margin: 0, font: `600 clamp(34px,5.4cqi,76px)/1.02 var(--font-sans)`, letterSpacing: "-0.03em", color: WHITE, maxWidth: "17ch", textWrap: "pretty" }}>
            See inside in 3D.<br />Measure with <span style={{ color: CYAN }}>confidence</span>.
          </h1>
          <p style={{ ...lead("rgba(255,255,255,.85)"), maxWidth: "54ch" }}>{HERO_LEAD}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 6 }}>
            <Btn>Request a Demo</Btn>
            <GhostBtn onDark>See Specifications</GhostBtn>
          </div>
          <p style={{ ...bodyText("rgba(255,255,255,.7)", 13), marginTop: 8 }}>
            Shown: wall thickness map of an aluminium casting, 2.72 to 13.59 mm, scanned on an MQCT system.
          </p>
        </div>
      </section>
      <section style={{ containerType: "inline-size", background: WHITE, borderBottom: `1px solid ${HAIR}` }}>
        <EnergyStripInline ground={WHITE} compact />
      </section>
    </>
  );
}

export function ConceptResultsFirst() {
  return (
    <main className="mqctc-page">
      <HeroFullBleed />
      <Analysis />
      <Results />
      <WhyCT />
      <Anatomy />
      <Models />
      <Benefits />
      <Specs />
      <Applications />
      <Service />
      <CTA />
    </main>
  );
}

/* ── Concept 04: Technical Buyer ── */

const NAV_ITEMS: [string, string][] = [
  ["Select a model", "#select"],
  ["Capability", "#capability"],
  ["Analysis", "#analysis"],
  ["CT vs 2D", "#compare"],
  ["Specifications", "#specifications"],
  ["Results", "#results"],
];

const MATRIX_ROWS: [string, string, string, string][] = [
  ["Small, high-detail parts", "MQCT-M", "Microfocus, up to 300 kV", "PCBs, connectors, small precision components, small castings, micro-defects"],
  ["A mixed component portfolio", "MQCT-X", "Minifocus, up to 450 kV", "Automotive castings, welds, composite components, medium components, mixed materials"],
  ["Thick or dense sections", "MQCT-H", "LINAC, 0.95 to 15 MeV", "Large castings, thick steel, heavy engineering, aerospace and mission-critical components"],
  ["At production throughput", "MQCT-D", "Dual or multi-tube", "Large components, high-throughput inspection, production environments"],
];

function HeroCompact() {
  return (
    <section style={{ containerType: "inline-size", background: WHITE, padding: "clamp(32px,3.6cqi,56px) 0" }}>
      <div style={{ ...SHELL, display: "flex", flexWrap: "wrap", gap: "clamp(24px,3cqi,56px)", alignItems: "center" }}>
        <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={eyebrow()}>MQCT Series · Computed tomography solutions</p>
          <h1 style={{ margin: 0, font: `600 clamp(30px,3.6cqi,50px)/1.06 var(--font-sans)`, letterSpacing: "-0.03em", color: NAVY, maxWidth: "20ch", textWrap: "pretty" }}>
            See inside in 3D. Measure with <span style={{ color: CYAN_INK }}>confidence</span>.
          </h1>
          <p style={{ ...bodyText(), maxWidth: "62ch" }}>{HERO_LEAD}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 4 }}>
            <Btn>Request a Demo</Btn>
            <GhostBtn>See Specifications</GhostBtn>
          </div>
        </div>
        <EnergyBlock />
      </div>
    </section>
  );
}

function SectionNav() {
  return (
    <nav aria-label="On this page" className="mqctc-sticky" style={{
      containerType: "inline-size", background: PAGE,
      borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`,
    }}>
      <div style={{ ...SHELL, display: "flex", flexWrap: "wrap", gap: "clamp(14px,2cqi,28px)", alignItems: "center", minHeight: 52 }}>
        {NAV_ITEMS.map(([label, href]) => (
          <a key={href} href={href} className="mqctc-navlink" style={{
            font: T_EYEBROW, letterSpacing: TR_LABEL, textTransform: "uppercase",
            color: BODY, whiteSpace: "nowrap", minHeight: 44,
            display: "inline-flex", alignItems: "center", textDecoration: "none",
          }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

function ModelMatrix() {
  return (
    <section id="select" style={{ containerType: "inline-size", background: PAGE, padding: "clamp(56px,6cqi,96px) 0" }}>
      <div style={SHELL}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 48px", alignItems: "baseline", marginBottom: "clamp(24px,2.6cqi,36px)" }}>
          <p style={eyebrow()}>Inspection requirement</p>
          <h2 style={h2("clamp(24px,2.8cqi,36px)/1.18")}>Start from the component, not the machine.</h2>
        </div>
        <div style={{ border: `1px solid ${HAIR}` }}>
          {MATRIX_ROWS.map(([need, id, energy, examples], i) => (
            <div key={id} style={{
              display: "flex", flexWrap: "wrap", gap: 1, background: HAIR,
              ...(i > 0 ? { borderTop: `1px solid ${HAIR}` } : null),
            }}>
              <div style={{ flex: "1 1 220px", background: WHITE, padding: "clamp(16px,1.8cqi,22px) clamp(16px,1.8cqi,24px)" }}>
                <p style={microLabel()}>If you inspect</p>
                <p style={{ margin: "8px 0 0", font: `500 17px/1.35 var(--font-sans)`, color: NAVY }}>{need}</p>
              </div>
              <div style={{ flex: "1 1 150px", background: WHITE, padding: "clamp(16px,1.8cqi,22px) clamp(16px,1.8cqi,24px)" }}>
                <p style={{ margin: 0, font: `600 22px/1 var(--font-display)`, letterSpacing: "-0.02em", color: CYAN_INK }}>{id}</p>
                <p style={{ ...microLabel(), marginTop: 8 }}>{energy}</p>
              </div>
              <div style={{ flex: "1 1 260px", background: WHITE, padding: "clamp(16px,1.8cqi,22px) clamp(16px,1.8cqi,24px)", font: T_BODY, fontSize: 15, color: BODY }}>
                {examples}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConceptTechnicalBuyer() {
  return (
    <main className="mqctc-page">
      <HeroCompact />
      <SectionNav />
      <ModelMatrix />
      <Models />
      <BenefitsStrip />
      <Analysis />
      <WhyCT />
      <Specs />
      <Applications />
      <Results />
      <Anatomy />
      <Service />
      <CTA />
    </main>
  );
}

/* ── Concept 05: Find, Measure, Improve ── */

const WORKFLOW: { n: string; step: string; src: string; alt: string; copy: string }[] = [
  {
    n: "01", step: "Find", src: "/assets/mqctc-indications.jpg",
    alt: "Indications flagged inside a suspension bracket, coloured by volume",
    copy: "Internal defects flagged automatically across the full component volume, with position, volume, probability and diameter.",
  },
  {
    n: "02", step: "Measure", src: "/assets/mqctc-wallthickness.jpg",
    alt: "Wall thickness colour map of an aluminium casting",
    copy: "Wall thickness, internal geometry and CAD deviation measured from the same scan, in millimetres rather than impressions.",
  },
  {
    n: "03", step: "Improve", src: "/assets/mqctc-porosity.jpg",
    alt: "Porosity distribution across a cast housing, classified by volume",
    copy: "Porosity classified against specification and located in 3D, so gating, feeding and process settings can be corrected at source.",
  },
];

function HeroPaired() {
  return (
    <section style={{ containerType: "inline-size", background: WHITE, padding: "clamp(36px,4.4cqi,72px) 0 0" }}>
      <div style={{ ...SHELL, display: "flex", flexDirection: "column", gap: "clamp(20px,2.4cqi,32px)" }}>
        <p style={eyebrow()}>MQCT Series · Computed tomography solutions</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3cqi,64px)", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 460px" }}>
            <HeadlineTwoLine size="clamp(34px,5cqi,68px)/1.04" />
          </div>
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>
            <p style={{ ...lead(), maxWidth: "52ch" }}>{HERO_LEAD}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Btn>Request a Demo</Btn>
              <GhostBtn>See Specifications</GhostBtn>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "clamp(28px,3.2cqi,48px)", display: "flex", flexWrap: "wrap", gap: 1, background: HAIR, borderTop: `1px solid ${HAIR}` }}>
        {[
          { src: "/assets/mqctc-openframe.jpg", alt: "MQCT open-frame microfocus CT inspection system", cap: "The system", bg: WHITE },
          { src: "/assets/mqctc-porosity.jpg", alt: "CT porosity analysis output from a cast housing", cap: "What it returns", bg: "#000" },
        ].map((f) => (
          <figure key={f.cap} style={{ flex: "1 1 400px", minWidth: 280, margin: 0, background: f.bg, position: "relative" }}>
            <Image src={f.src} alt={f.alt} width={2400} height={1350} priority quality={88}
              sizes="(min-width:1024px) 50vw, 100vw"
              style={{ width: "100%", height: "100%", minHeight: "clamp(220px,26cqi,420px)", objectFit: "cover", display: "block" }} />
            <figcaption style={{ position: "absolute", left: 0, bottom: 0, background: NAVY, color: WHITE, font: T_EYEBROW, letterSpacing: TR_EYEBROW, textTransform: "uppercase", padding: "10px 14px" }}>
              {f.cap}
            </figcaption>
          </figure>
        ))}
      </div>

      <div style={{ background: PAGE, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <EnergyStripInline ground={PAGE} />
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section style={{ containerType: "inline-size", background: WHITE, padding: "clamp(64px,8cqi,120px) 0" }}>
      <div style={SHELL}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3cqi,64px)", alignItems: "flex-end", marginBottom: "clamp(32px,3.4cqi,48px)" }}>
          <div style={{ flex: "1 1 460px" }}>
            <p style={{ ...eyebrow(), marginBottom: 18 }}>Find, measure, improve</p>
            <h2 style={{ ...h2("clamp(28px,3.4cqi,44px)/1.14"), maxWidth: "24ch" }}>Three steps from a suspect part to a corrected process.</h2>
          </div>
          <p style={{ ...lead(), flex: "1 1 320px", maxWidth: "50ch" }}>
            The same CT volume answers all three questions, so inspection findings can travel straight back to production.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4cqi,32px)" }}>
          {WORKFLOW.map((w) => (
            <article key={w.n} style={{
              flex: "1 1 320px", minWidth: 260, display: "flex", flexDirection: "column", gap: 16,
              borderTop: `3px solid ${CYAN}`, paddingTop: 20,
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span style={{ font: `600 13px/1 var(--font-display)`, letterSpacing: ".08em", color: CYAN_INK }}>{w.n}</span>
                <h3 style={h3("clamp(20px,2cqi,26px)/1.25")}>{w.step}</h3>
              </div>
              <div style={{ background: "#000", border: `1px solid ${HAIR}` }}>
                <Image src={w.src} alt={w.alt} width={1400} height={900} quality={90}
                  sizes="(min-width:1024px) 33vw, 100vw"
                  style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <p style={bodyText()}>{w.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConceptFindMeasureImprove() {
  return (
    <main className="mqctc-page">
      <HeroPaired />
      <Workflow />
      <WhyCT />
      <Analysis />
      <Anatomy />
      <Models />
      <Results />
      <Applications />
      <Benefits />
      <Specs />
      <Service />
      <CTA />
    </main>
  );
}

/* ── shared metadata for the five review routes ── */

export const CONCEPTS = [
  { ref: "1a", slug: "decision-journey", n: "Concept 01", name: "Decision Journey" },
  { ref: "1b", slug: "product-anatomy", n: "Concept 02", name: "Product Anatomy" },
  { ref: "1c", slug: "results-first", n: "Concept 03", name: "Results First" },
  { ref: "1d", slug: "technical-buyer", n: "Concept 04", name: "Technical Buyer" },
  { ref: "1e", slug: "find-measure-improve", n: "Concept 05", name: "Find, Measure, Improve" },
] as const;
