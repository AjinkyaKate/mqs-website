import Image from "next/image";
import {
  Band, BandHead, Btn, Chip, GhostBtn, ImageSlot, Marker,
  BODY, CYAN, CYAN_INK, CYAN_QUIET, FLAG, HAIR, HAIR_SOFT, MUTED,
  NAVY, NAVY_DEEP, OK, ON_DARK, PAGE, PART, NO, WHITE,
  SHELL, T_BODY, T_EYEBROW, TR_EYEBROW,
  bodyText, eyebrow, figure, h2, h3, lead, microLabel,
} from "./system";

/* ──────────────────────────────────────────────────────────────
   The thirteen shared sections the five concepts compose, imported from the
   MQCT Concepts Board design project. Each concept reorders these; only the
   hero and one or two concept-specific blocks differ, which is the whole
   point of the exercise.

   TWO DEPARTURES FROM THE IMPORTED FILES, both deliberate:

   1. RED, AMBER AND GREEN. MqctWhyCT.dc.html sets the comparison dots in
      #3FBF7F, #E0A33C and #E05B4B. That reverses the rule recorded when
      MqctSeries.tsx was built, which said the MQS system has no semantic
      status colour and one must not be invented, and is why that page encodes
      the three states by fill level instead. The design is the newer and more
      deliberate artefact, so it is implemented as drawn, but the two pages now
      disagree with each other and MQS has to settle which is correct before
      either ships. Flagged, not silently reconciled.

   2. EM DASHES. The imported copy carries them in the Why CT pull quote and in
      the concept titles. Removed here per the standing house rule that no
      em dash ships in visible copy. No other wording is altered.

   PENDING MQS SIGN-OFF, carried from the design's own header note:
   · The cabinet render is labelled MQCT 225AB while the architecture calls it
     MQCT-X. The design surfaces the conflict on the page rather than picking
     one, and that is preserved.
   · No publishable PCB, battery or MQCT-D imagery exists, so those four slots
     are labelled drop targets. The design's slot copy explicitly asks for a
     PCB scan with no demo-license banner, which matches what the asset audit
     found on the supplied files.
   · The hero reference to rocket motors needs clearance to be stated publicly.
   ────────────────────────────────────────────────────────────── */

const PAD_SECTION = "clamp(64px,8cqi,120px)";

/* ── Why CT: the seven-question comparison ── */

type State = "ok" | "part" | "no";
const DOT: Record<State, string> = { ok: OK, part: PART, no: NO };
const STATE_WORD: Record<State, string> = {
  ok: "available",
  part: "partial",
  no: "not available",
};

const MATRIX: { n: string; q: string; d2: [string, State]; ct: [string, State] }[] = [
  { n: "01", q: "Is there a defect?", d2: ["Detected", "ok"], ct: ["Detected", "ok"] },
  { n: "02", q: "Where is it in three dimensions?", d2: ["Depth not resolved", "no"], ct: ["Measured directly", "ok"] },
  { n: "03", q: "How large is it by volume?", d2: ["Estimated from projection area", "part"], ct: ["Quantified in mm³", "ok"] },
  { n: "04", q: "Does it fail the porosity specification?", d2: ["Operator judgement", "part"], ct: ["Automatically classified", "ok"] },
  { n: "05", q: "What is the wall thickness here?", d2: ["Not available", "no"], ct: ["Wall thickness mapped", "ok"] },
  { n: "06", q: "Does it match the CAD model?", d2: ["Not available", "no"], ct: ["Full CAD deviation comparison", "ok"] },
  { n: "07", q: "Can internal features be measured?", d2: ["Not available", "no"], ct: ["Internal geometry metrology", "ok"] },
];

function Answer({ value, state, tinted }: { value: string; state: State; tinted?: boolean }) {
  /* Row one ties, so its 2D answer keeps full-strength ink like the CT column.
     Every other losing answer steps back to body colour. */
  const ink = tinted || state === "ok" ? NAVY : BODY;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10, font: T_BODY, color: ink }}>
      <i aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: DOT[state], flex: "0 0 auto", display: "block" }} />
      {value}
      <span className="sr-only"> ({STATE_WORD[state]})</span>
    </span>
  );
}

export function WhyCT() {
  return (
    <Band id="compare" ground={PAGE} padY={PAD_SECTION}>
      <BandHead
        eyebrowText="Why computed tomography"
        heading="Same part. Seven questions. Two very different answers."
        headingSize="clamp(26px,3.1cqi,42px)/1.16"
        headingWidth="24ch"
        supporting="If you already run digital radiography, this is the comparison that matters. Both technologies find defects. Only one measures them."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
        {MATRIX.map((r, i) => (
          <div key={r.n} style={{ background: WHITE, display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 300px", padding: "clamp(18px,1.8cqi,24px) clamp(18px,2cqi,28px)", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ font: `600 13px/1 var(--font-display)`, letterSpacing: ".08em", color: CYAN_INK }}>{r.n}</span>
              <span style={{ font: `500 clamp(17px,1.5cqi,20px)/1.35 var(--font-sans)`, letterSpacing: "-0.01em", color: NAVY }}>{r.q}</span>
            </div>
            <div style={{ flex: "1 1 220px", padding: "clamp(16px,1.8cqi,24px) clamp(18px,2cqi,28px)", borderTop: `1px solid ${HAIR_SOFT}`, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={microLabel()}>2D radiography</span>
              <Answer value={r.d2[0]} state={r.d2[1]} tinted={i === 0} />
            </div>
            <div style={{ flex: "1 1 260px", padding: "clamp(16px,1.8cqi,24px) clamp(18px,2cqi,28px)", background: CYAN_QUIET, borderTop: `3px solid ${CYAN}`, display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={microLabel(CYAN_INK)}>Computed tomography</span>
              <Answer value={r.ct[0]} state={r.ct[1]} />
            </div>
          </div>
        ))}
      </div>

      <blockquote style={{ margin: "clamp(28px,3cqi,44px) 0 0", borderLeft: `3px solid ${CYAN}`, padding: "clamp(18px,2cqi,28px) clamp(20px,2.4cqi,36px)", background: CYAN_QUIET }}>
        <p style={{ margin: 0, font: `500 clamp(19px,2.1cqi,28px)/1.35 var(--font-sans)`, letterSpacing: "-0.015em", color: NAVY, maxWidth: "60ch", textWrap: "pretty" }}>
          2D tells you to scrap the part. CT tells you why the process produced it, which is what stops the next one.
        </p>
      </blockquote>
    </Band>
  );
}

/* ── CT analysis and metrology: three alternating stories ── */

const ANALYSIS: { n: string; title: string; copy: string; src: string; alt: string; out: string; part: string }[] = [
  {
    n: "01", title: "Wall thickness mapping",
    copy: "Thickness colour-mapped across the whole part, flagging thin sections before they become leak paths.",
    src: "/assets/mqctc-wallthickness.jpg",
    alt: "CT wall thickness colour map across an aluminium casting, scale 2.72 to 13.59 mm",
    out: "Thickness map, mm", part: "Aluminium casting",
  },
  {
    n: "02", title: "Porosity analysis",
    copy: "Every pore segmented, sized and located in 3D, then classified by sphericity and volume against the required specification.",
    src: "/assets/mqctc-porosity.jpg",
    alt: "CT porosity analysis of a cast housing, pores coloured by porosity percentage and volume",
    out: "Porosity %, volume mm³", part: "Cast housing",
  },
  {
    n: "03", title: "Indication detection",
    copy: "Automatic flagging of internal defects with position, volume, probability and diameter across the full component volume.",
    src: "/assets/mqctc-indications.jpg",
    alt: "CT indication detection on a suspension bracket, indications coloured by volume in cubic millimetres",
    out: "Position, volume, diameter", part: "Suspension bracket",
  },
];

function AnalysisMeta({ out, part }: { out: string; part: string }) {
  return (
    <dl style={{ margin: 0, borderTop: `1px solid ${HAIR}`, paddingTop: 14, display: "flex", flexWrap: "wrap", gap: "8px 32px" }}>
      <div>
        <dt style={microLabel()}>Output</dt>
        <dd style={{ ...bodyText(NAVY), margin: "4px 0 0" }}>{out}</dd>
      </div>
      <div>
        <dt style={microLabel()}>Part shown</dt>
        <dd style={{ ...bodyText(NAVY), margin: "4px 0 0" }}>{part}</dd>
      </div>
    </dl>
  );
}

export function Analysis() {
  return (
    <Band id="analysis" ground={PAGE} padY={PAD_SECTION}>
      <BandHead
        eyebrowText="CT analysis and metrology"
        heading="From scan to actionable defect data."
        headingSize="clamp(28px,3.6cqi,48px)/1.12"
        headingWidth="20ch"
        supporting="MQCT combines the MQS Imaging Suite with advanced CT reconstruction, visualisation and analysis tools to turn scan data into measurable inspection information."
        gapBelow="clamp(36px,4cqi,64px)"
      />

      {ANALYSIS.map((a, i) => {
        const flip = i === 1; /* the design alternates by wrap-reverse on the middle block */
        const media = (
          <div key="m" style={{ flex: "1 1 560px", minWidth: 280, background: "#000", border: `1px solid ${HAIR}` }}>
            <Image src={a.src} alt={a.alt} width={1400} height={900} quality={92}
              sizes="(min-width:1024px) 55vw, 100vw"
              style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        );
        const copy = (
          <div key="c" style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ font: `600 13px/1 var(--font-display)`, letterSpacing: ".08em", color: CYAN_INK }}>{a.n}</span>
              <h3 style={h3("clamp(22px,2.4cqi,32px)/1.2")}>{a.title}</h3>
            </div>
            <p style={{ ...lead(), maxWidth: "46ch" }}>{a.copy}</p>
            <AnalysisMeta out={a.out} part={a.part} />
          </div>
        );
        return (
          <div key={a.n} style={{
            display: "flex", flexWrap: "wrap", gap: "clamp(24px,3cqi,56px)", alignItems: "center",
            marginTop: i === 0 ? 0 : "clamp(40px,5cqi,88px)",
            paddingTop: "clamp(24px,3cqi,40px)", borderTop: `1px solid ${HAIR}`,
          }}>
            {flip ? [copy, media] : [media, copy]}
          </div>
        );
      })}
    </Band>
  );
}

/* ── Model range: four cards, one of them an unfilled slot ── */

type Model = {
  kind: string; id: string; title: string; energy: string; uses: string[];
  img?: { src: string; alt: string; fit: "cover" | "contain"; pos?: string };
  slot?: string; flagged?: boolean; note?: string;
};

const MODELS: Model[] = [
  {
    kind: "Microfocus", id: "MQCT-M", title: "High detail on small parts", energy: "Microfocus up to 300 kV",
    uses: ["PCBs", "Connectors", "Small precision components", "Small castings", "Micro-defects"],
    img: { src: "/assets/mqctc-highprecision.jpg", alt: "MQS high precision CT system with granite base and manipulator", fit: "contain" },
  },
  {
    kind: "Minifocus", id: "MQCT-X", title: "The mixed-portfolio workhorse", energy: "Minifocus up to 450 kV",
    uses: ["Automotive castings", "Welds", "Composite components", "Medium components", "Mixed materials"],
    img: { src: "/assets/mqctc-cabinet.jpg", alt: "MQCT shielded cabinet with motorized sliding doors open, manipulator inside", fit: "cover", pos: "50% 55%" },
    flagged: true,
    note: "Cabinet shown is labelled MQCT 225AB. Model naming to be confirmed against the MQCT-X designation before publication.",
  },
  {
    kind: "LINAC", id: "MQCT-H", title: "Deep penetration CT", energy: "0.95 to 15 MeV LINAC",
    uses: ["Large castings", "Thick steel", "Heavy engineering", "Aerospace components", "Mission-critical components"],
    img: { src: "/assets/mqctc-linac.jpg", alt: "LINAC based rail mounted shell inspection system with gantry and detector", fit: "cover" },
  },
  {
    kind: "Dual detector", id: "MQCT-D", title: "Speed and coverage", energy: "Configurable dual or multi-tube configuration",
    uses: ["Large components", "High-throughput inspection", "Production environments"],
    slot: "MQCT-D dual detector configuration render. No validated equipment image supplied; drop the approved render here.",
  },
];

export function Models() {
  return (
    <Band id="models" ground={PAGE} padY={PAD_SECTION}>
      <BandHead
        eyebrowText="MQCT model range"
        heading="A model for every inspection need."
        headingSize="clamp(28px,3.4cqi,44px)/1.14"
        supporting="Choose according to the size and density of the component being inspected. Every system shares the same imaging, safety and analysis workflow."
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
        {MODELS.map((m) => (
          <article key={m.id} style={{ flex: "1 1 300px", minWidth: 260, background: WHITE, display: "flex", flexDirection: "column" }}>
            <div style={{ aspectRatio: "4 / 3", background: m.slot ? PAGE : WHITE, overflow: "hidden", ...(m.slot ? { borderBottom: `1px solid ${HAIR}` } : null) }}>
              {m.img ? (
                <Image src={m.img.src} alt={m.img.alt} width={1200} height={900} quality={90}
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  style={{ width: "100%", height: "100%", objectFit: m.img.fit, objectPosition: m.img.pos ?? "50% 50%", display: "block" }} />
              ) : (
                <ImageSlot label={m.slot!} />
              )}
            </div>
            <div style={{ padding: "clamp(20px,2.2cqi,28px)", display: "flex", flexDirection: "column", gap: 14, flex: "1 1 auto" }}>
              <p style={eyebrow()}>{m.kind}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", borderBottom: `1px solid ${HAIR}`, paddingBottom: 14 }}>
                <span style={figure("clamp(24px,2.4cqi,32px)/1")}>{m.id}</span>
                {m.flagged && <span style={microLabel(FLAG)}>Naming pending</span>}
              </div>
              <h3 style={h3("clamp(19px,1.8cqi,23px)/1.28")}>{m.title}</h3>
              <p style={{ ...bodyText(CYAN_INK, 15) }}>{m.energy}</p>
              <ul style={{ margin: 0, padding: "14px 0 0", listStyle: "none", display: "flex", flexDirection: "column", gap: 8, borderTop: `1px solid ${HAIR}` }}>
                {m.uses.map((u) => <li key={u} style={bodyText(BODY, 15)}>{u}</li>)}
              </ul>
              {m.note && (
                <p style={{ ...bodyText(MUTED, 13), lineHeight: 1.5, paddingTop: 12, borderTop: "1px solid rgba(224,163,60,.4)" }}>{m.note}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ── System architecture: annotated cabinet plus five subsystem cards ── */

const ANATOMY: { k: string; area: string; title: string; copy: string; left: string; top: string }[] = [
  { k: "A", area: "Source", title: "Configurable X-ray sources", copy: "Microfocus, minifocus or LINAC depending on penetration and resolution requirements.", left: "33%", top: "44%" },
  { k: "B", area: "Detector", title: "Flat panel and optional line detectors", copy: "Real-time imaging up to 30 fps with 16-bit contrast.", left: "44.5%", top: "56%" },
  { k: "C", area: "Motion", title: "High-precision manipulators", copy: "Multi-axis positioning for accurate and repeatable CT acquisition.", left: "36%", top: "73%" },
  { k: "D", area: "Safety", title: "Shielded X-ray cabinet", copy: "Steel, lead and steel construction with motorized doors, light curtains, interlocks and CCTV.", left: "76%", top: "34%" },
  { k: "E", area: "Software", title: "MQS Imaging Suite", copy: "2D acquisition, automated CT projection capture, processing, macros and repeatable inspection workflows.", left: "14%", top: "66%" },
];

export function Anatomy() {
  return (
    <Band id="architecture" ground={PAGE} padY={PAD_SECTION}>
      <BandHead
        eyebrowText="System architecture"
        heading="What makes up an MQCT system."
        headingSize="clamp(28px,3.4cqi,44px)/1.14"
        supporting="Five subsystems, configured together per component and per inspection standard."
        gapBelow="clamp(28px,3cqi,44px)"
      />

      <div style={{ position: "relative", background: WHITE, border: `1px solid ${HAIR}` }}>
        <Image src="/assets/mqctc-cabinet.jpg" width={2400} height={1493} quality={90}
          alt="MQCT shielded inspection cabinet with motorized doors open, showing source, detector and manipulator inside"
          sizes="(min-width:1330px) 1220px, 100vw"
          style={{ width: "100%", height: "auto", display: "block" }} />
        {ANATOMY.map((a) => (
          <span key={a.k} aria-hidden style={{
            position: "absolute", left: a.left, top: a.top,
            width: "clamp(22px,2.2cqi,30px)", height: "clamp(22px,2.2cqi,30px)",
            background: CYAN, color: NAVY,
            font: `600 clamp(12px,1.1cqi,15px)/1 var(--font-display)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{a.k}</span>
        ))}
      </div>
      <p style={{ ...bodyText(MUTED, 13), marginTop: 12, maxWidth: "70ch" }}>
        Cabinet shown is labelled MQCT 225AB. Model naming to be confirmed against the MQCT-X designation. Callout positions are indicative and to be verified against the production build.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 1, background: HAIR, marginTop: "clamp(28px,3cqi,44px)", border: `1px solid ${HAIR}` }}>
        {ANATOMY.map((a) => (
          <div key={a.k} style={{ flex: "1 1 240px", background: WHITE, padding: "clamp(20px,2.2cqi,28px)", display: "flex", flexDirection: "column", gap: 10 }}>
            <Marker>{a.k}</Marker>
            <p style={{ ...eyebrow(), marginTop: 6 }}>{a.area}</p>
            <h3 style={h3("clamp(18px,1.7cqi,21px)/1.3")}>{a.title}</h3>
            <p style={bodyText(BODY, 15)}>{a.copy}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── Why MQCT: six reasons, two treatments ── */

const BENEFITS: [string, string, string][] = [
  ["01", "High-resolution 2D and 3D visibility", "Inspect internal and external structure as a complete 3D volume."],
  ["02", "Flexible energy configurations", "Microfocus, minifocus and high-energy LINAC configurations."],
  ["03", "Built for production and R and D", "Repeatable production inspection while retaining R and D flexibility."],
  ["04", "Metrology and inspection together", "Run dimensional measurement and defect analysis using the same CT data."],
  ["05", "Powerful analysis ecosystem", "MQS Imaging Suite plus advanced reconstruction, visualisation and analysis."],
  ["06", "Safe by design", "Shielded cabinet, motorized access, safety interlocks and inspection monitoring."],
];

export function Benefits() {
  return (
    <Band ground={WHITE} padY="clamp(64px,7cqi,104px)">
      <div style={{ marginBottom: "clamp(28px,3cqi,44px)" }}>
        <p style={{ ...eyebrow(), marginBottom: 18 }}>Why MQCT</p>
        <h2 style={{ ...h2("clamp(26px,3.1cqi,40px)/1.16"), maxWidth: "24ch" }}>Why choose the MQCT Series.</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 clamp(24px,3cqi,56px)" }}>
        {BENEFITS.map(([n, t, d]) => (
          <div key={n} style={{
            flex: "1 1 300px", borderTop: `1px solid ${HAIR}`, padding: "clamp(20px,2.2cqi,28px) 0",
            display: "grid", gridTemplateColumns: "48px 1fr", gap: 14,
          }}>
            <span style={{ font: `600 13px/1.6 var(--font-display)`, letterSpacing: ".08em", color: CYAN_INK }}>{n}</span>
            <div>
              <h3 style={{ ...h3("clamp(18px,1.8cqi,22px)/1.3"), marginBottom: 8 }}>{t}</h3>
              <p style={{ ...bodyText(), maxWidth: "44ch" }}>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* The compact variant, used by the two concepts that lead with hardware or
   with the selection matrix and need this as a strip rather than a section. */
export function BenefitsStrip() {
  return (
    <Band id="capability" ground={PAGE} padY="clamp(56px,6cqi,88px)">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 48px", alignItems: "baseline", marginBottom: "clamp(24px,2.6cqi,36px)" }}>
        <p style={eyebrow()}>Why MQCT</p>
        <h2 style={h2("clamp(24px,2.6cqi,34px)/1.2")}>Why choose the MQCT Series.</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4cqi,32px)" }}>
        {BENEFITS.map(([n, t, d], i) => (
          <div key={n} style={{
            flex: "1 1 200px",
            borderTop: i === 0 ? `3px solid ${CYAN}` : `1px solid ${HAIR}`,
            paddingTop: 16,
          }}>
            <h3 style={{ ...h3("17px/1.3"), marginBottom: 8 }}>{t}</h3>
            <p style={bodyText(BODY, 15)}>{d}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── Real-world results: the dark band, mostly unfilled by design ── */

const CASTINGS: [string, string, string][] = [
  ["/assets/mqctc-wallthickness.jpg", "Wall thickness colour map of an aluminium casting", "Wall thickness mapped across the full casting, 2.72 to 13.59 mm."],
  ["/assets/mqctc-porosity.jpg", "Porosity analysis of a cast housing", "Pores segmented and classified by porosity percentage and volume."],
  ["/assets/mqctc-indications.jpg", "Indication detection on a suspension bracket", "Indications flagged with position and volume across the bracket."],
];

export function Results() {
  return (
    <Band id="results" ground={NAVY_DEEP} padY={PAD_SECTION} topRule="dark">
      <BandHead
        eyebrowText="Real-world CT results"
        heading="Imaging software in action."
        headingSize="clamp(28px,3.4cqi,44px)/1.14"
        supporting="Real components inspected across electronics, batteries, castings and industrial applications."
        onDark
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4cqi,32px)" }}>
        <figure style={{ flex: "1 1 620px", minWidth: 280, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ aspectRatio: "16 / 10", background: NAVY, border: `1px solid ${ON_DARK}` }}>
            <ImageSlot onDark label="3D CT scan of a populated PCB showing internal traces, vias and solder joints. Deliver 2000 by 1250, no demo-license banner." />
          </div>
          <figcaption style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={eyebrow(CYAN)}>Electronics and PCB</p>
            <h3 style={h3("clamp(20px,2cqi,26px)/1.25", WHITE)}>Hidden electronics structure, layer by layer</h3>
            <p style={{ ...bodyText("rgba(255,255,255,.74)"), maxWidth: "56ch" }}>
              Internal traces, vias and solder joints inspected inside the assembled board, without desoldering or sectioning.
            </p>
            <p style={bodyText("rgba(255,255,255,.5)", 13)}>Image pending: no validated PCB scan supplied for publication.</p>
          </figcaption>
        </figure>

        <div style={{ flex: "1 1 340px", minWidth: 260, display: "flex", flexDirection: "column", gap: "clamp(20px,2.4cqi,32px)" }}>
          {[
            ["Battery, cylindrical cell", "Every winding layer can be inspected so spacing, centring and deformation can be evaluated without opening the cell.", "CT cross-section of a cylindrical Li-ion cell showing winding layers. Deliver 1400 by 1050."],
            ["Battery, electrode overhang", "Anode overhang and electrode alignment can be measured layer by layer.", "CT view of cell top showing anode overhang and electrode alignment. Deliver 1400 by 1050."],
          ].map(([label, copy, slot]) => (
            <figure key={label} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ aspectRatio: "4 / 3", background: NAVY, border: `1px solid ${ON_DARK}` }}>
                <ImageSlot onDark label={slot} />
              </div>
              <figcaption>
                <p style={{ ...eyebrow(CYAN), marginBottom: 8 }}>{label}</p>
                <p style={bodyText("rgba(255,255,255,.78)", 15)}>{copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "clamp(32px,3.4cqi,48px)", paddingTop: "clamp(24px,2.6cqi,36px)", borderTop: `1px solid ${ON_DARK}` }}>
        <p style={{ ...eyebrow(CYAN), marginBottom: 20 }}>Casting inspection</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(16px,2cqi,24px)" }}>
          {CASTINGS.map(([src, alt, cap]) => (
            <figure key={src} style={{ flex: "1 1 300px", minWidth: 240, margin: 0 }}>
              <div style={{ background: "#000", border: `1px solid ${ON_DARK}` }}>
                <Image src={src} alt={alt} width={1400} height={900} quality={90}
                  sizes="(min-width:1024px) 33vw, 100vw"
                  style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <figcaption style={{ ...bodyText("rgba(255,255,255,.78)", 15), marginTop: 12 }}>{cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Band>
  );
}

/* ── Applications ── */

const APPLICATIONS = [
  "Aluminium, steel and composite components", "Additive manufacturing parts", "Aerospace components",
  "Li-ion battery inspection", "Injection moulded components", "Weld sections",
  "Electronics and PCBs", "Industrial and scientific research",
];

export function Applications() {
  return (
    <section style={{ containerType: "inline-size", background: PAGE, borderTop: `1px solid ${HAIR}`, padding: "clamp(48px,5cqi,80px) 0" }}>
      <div style={{ ...SHELL, display: "flex", flexWrap: "wrap", gap: "clamp(24px,3cqi,64px)", alignItems: "flex-start" }}>
        <div style={{ flex: "0 1 320px" }}>
          <p style={{ ...eyebrow(), marginBottom: 14 }}>Applications</p>
          <h2 style={{ ...h2("clamp(24px,2.6cqi,34px)/1.2"), maxWidth: "20ch" }}>Where MQCT delivers value.</h2>
        </div>
        <div style={{ flex: "1 1 420px", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {APPLICATIONS.map((a) => <Chip key={a}>{a}</Chip>)}
        </div>
      </div>
    </section>
  );
}

/* ── Specifications: four groups ── */

const SPECS: { group: string; rows: [string, string][] }[] = [
  { group: "Energy", rows: [
    ["Microfocus tubes", "Up to 300 kV"], ["Minifocus tubes", "Up to 450 kV"],
    ["LINAC", "0.95 to 15 MeV"], ["Dual or multi tube", "Configurable"],
  ]},
  { group: "Detector", rows: [
    ["Detector size", "Up to 427 × 427 mm"], ["Pixel pitch", "100 to 200 µm"],
    ["Contrast, ADC", "16-bit"], ["Real-time imaging", "Up to 30 fps"],
    ["Optional", "Flat panel plus line detectors"],
  ]},
  { group: "Cabinet and safety", rows: [
    ["Construction", "Steel / lead / steel"], ["Leakage", "Below 1 µSv"],
    ["Access", "Motorized sliding doors"], ["Interlocks", "Light curtains plus door limit switches"],
    ["Monitoring", "CCTV recording"],
  ]},
  { group: "Analysis", rows: [
    ["Metrology", "Coordinate measurement, nominal to actual comparison"],
    ["Structure", "Wall thickness analysis"], ["Defects", "Porosity and inclusion analysis"],
    ["Composites", "Fibre material analysis"], ["Export", "Volume meshing, CAD import"],
  ]},
];

export function Specs() {
  return (
    <Band id="specifications" ground={WHITE} padY="clamp(56px,6cqi,96px)">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 48px", alignItems: "baseline", marginBottom: "clamp(24px,2.6cqi,36px)" }}>
        <p style={eyebrow()}>Technical specifications</p>
        <h2 style={h2("clamp(24px,2.6cqi,34px)/1.2")}>Specifications</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,2.4cqi,32px)" }}>
        {SPECS.map((s) => (
          <div key={s.group} style={{ flex: "1 1 280px", minWidth: 260 }}>
            <h3 style={{ margin: "0 0 4px", paddingBottom: 12, borderBottom: `2px solid ${CYAN}`, font: T_EYEBROW, letterSpacing: TR_EYEBROW, textTransform: "uppercase", color: NAVY }}>
              {s.group}
            </h3>
            <dl style={{ margin: 0 }}>
              {s.rows.map(([k, v]) => (
                <div key={k} style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${HAIR_SOFT}` }}>
                  <dt style={bodyText(MUTED, 15)}>{k}</dt>
                  <dd style={{ margin: 0, font: `500 15px/1.4 var(--font-sans)`, color: NAVY }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Band>
  );
}

/* ── CT inspection service hand-off ── */

export function Service() {
  return (
    <Band ground={PAGE} padY="clamp(40px,4.4cqi,64px)">
      <div style={{
        background: WHITE, border: `1px solid ${HAIR}`, borderLeft: `3px solid ${CYAN}`,
        padding: "clamp(22px,2.4cqi,32px) clamp(22px,2.6cqi,36px)",
        display: "flex", flexWrap: "wrap", gap: "clamp(20px,3cqi,48px)", alignItems: "center",
      }}>
        <div style={{ flex: "1 1 420px" }}>
          <p style={{ ...eyebrow(), marginBottom: 12 }}>CT inspection service</p>
          <h2 style={{ ...h2("clamp(20px,2.1cqi,26px)/1.25"), marginBottom: 10 }}>Send us the part instead.</h2>
          <p style={{ ...bodyText(), maxWidth: "64ch" }}>
            If you need CT results before investing in a CT system, MQS can perform CT scanning, defect analysis, metrology, CAD comparison and reverse engineering on your components.
          </p>
        </div>
        <div style={{ flex: "0 1 auto" }}>
          <GhostBtn href="/services">Explore CT Inspection Services</GhostBtn>
        </div>
      </div>
    </Band>
  );
}

/* ── Final CTA ── */

export function CTA() {
  return (
    <section style={{ containerType: "inline-size", background: NAVY_DEEP, borderTop: `1px solid ${ON_DARK}`, padding: "clamp(64px,7cqi,104px) 0" }}>
      <div style={{ ...SHELL, display: "flex", flexWrap: "wrap", gap: "clamp(28px,3.4cqi,64px)", alignItems: "center" }}>
        <div style={{ flex: "1 1 460px", display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={eyebrow(CYAN)}>Request a demo</p>
          <h2 style={{ margin: 0, font: `600 clamp(28px,3.6cqi,48px)/1.1 var(--font-sans)`, letterSpacing: "-0.025em", color: WHITE, maxWidth: "24ch", textWrap: "pretty" }}>
            Want to see MQCT run on your components?
          </h2>
          <p style={{ ...lead("rgba(255,255,255,.78)"), maxWidth: "58ch" }}>
            Tell us the component, material and throughput requirement. The MQS application engineering team can recommend the appropriate configuration and scan a sample where required.
          </p>
        </div>
        <div style={{ flex: "0 1 auto", display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
          <Btn>Request a Demo</Btn>
          <a href="tel:+914023811122" style={{
            font: `500 clamp(20px,2cqi,26px)/1 var(--font-display)`, letterSpacing: "-0.01em",
            color: WHITE, minHeight: 44, display: "inline-flex", alignItems: "center", textDecoration: "none",
          }}>
            +91 40 2381 1122
          </a>
        </div>
      </div>
    </section>
  );
}
