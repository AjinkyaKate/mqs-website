import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Automated Test Equipment — /products/automated-test-equipment/
   Implementation of "ATE Concept 03 Final.dc.html" (design project
   50c978b1-ce43-45a7-b148-2d85066f51e5) against the client's "AUTOMATED TEST
   EQUIPMENT — Webpage Build Reference" docx. Nine sections, in the design's
   order, with its copy and its data verbatim.

   IMAGES. The four photographs are the client's own, cut out of their
   backgrounds so they sit on the navy hero and the light panels the design
   places them in. Provenance was checked before anything was used, and it
   mattered: the design project also carries four AI-generated files, and those
   turned out to be composite montages of invented scenes, one of which mixes in
   the PCB radiographs from the MQX.tracE page. None of them is on this page.
   The docx is explicit on the point, and right: the buyers are procurement
   engineers, and on a page arguing MQS builds what does not exist, borrowed or
   synthesised imagery quietly contradicts the claim.

   Best source per slot differed. Three of the four are higher resolution inside
   the docx than in the loose folder, and IMG-02 is the other way round, so each
   was taken from whichever copy was larger. Cut out by flooding inward from the
   frame border rather than by a global white threshold, because three of the
   four subjects are white cabinets on a white background and a threshold would
   have eaten the cabinets.

   CONFIDENTIALITY. The portfolio names systems by test function, never by
   platform or customer. That is the docx's own decision and it is load-bearing:
   the source dossier names weapons platforms, customer sites and unit counts,
   and publishing it verbatim would map the company's defence supply chain on an
   indexed page. KMTE is the single exception, named because its launch by the
   Defence Minister in August 2023 is public record. Do not add platform names,
   customer sites or production figures to this page.

   DEPARTURES:
   1 · Responsive behaviour is added. The design is desktop-only, its root sets
       min-width 1180px and it ships no narrower spec, so the scale in
       globals.css keeps its delivered values at desktop and derives two
       narrower steps, collapsing every two-column split at 1024.
   2 · Site header and footer, not the design's, and the root clears the fixed
       header.

   PENDING SIGN-OFF, all from the docx:
   · NCAGE 6567Y is shown in the stats strip. Confirm it may be displayed
     publicly; it is normally a business identifier rather than sensitive, but
     the docx says confirm rather than assume.
   · EXPERIENCE FIGURE. The ATE source says 25+ years and the About page dates
     the move into defence to 1996-99, closer to thirty. This page says 20+ to
     stay defensible. One agreed figure across the site would be better.
   · NO SPECIFICATIONS EXIST. Neither source carries channel counts, voltage
     ranges, accuracy or throughput. Every other product page has a technical
     data section and this one cannot, which is the largest gap on the page.
   · IMG-03 is 457 x 440, so it softens above roughly 450px wide. It is capped
     at its native width here. A better original is worth asking for: this is
     the system with ministerial recognition.
   · Confirm the ATE brochure PDF exists and is current before linking it, and
     consider stating a typical lead time.
   ────────────────────────────────────────────────────────────── */

const NAVY = "#0B2A3A", WHITE = "#FFFFFF", PAGE = "#F4F8FA", INSET = "#E9F0F4";
const HAIR = "#D3DFE7", HAIR_DARK = "rgba(255,255,255,.16)";
const CYAN = "#16C1F3", CYAN_INK = "#0A6A88";
const BODY = "#41586A", MUTED = "#5F7688";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

const SHELL: CSSProperties = { maxWidth: 1330, margin: "0 auto", padding: "0 var(--ate-gut)" };

const eyebrow = (color = CYAN_INK): CSSProperties => ({
  margin: 0, font: `500 13px/1.2 ${SANS}`, letterSpacing: ".09em",
  textTransform: "uppercase", color,
});
const code = (color = CYAN_INK): CSSProperties => ({
  margin: 0, font: `600 13px/1 ${DISPLAY}`, letterSpacing: ".08em", color,
});
const h2 = (color = NAVY): CSSProperties => ({
  margin: 0, font: `600 var(--ate-h2)/1.1 ${SANS}`, letterSpacing: "-.025em", color, textWrap: "pretty",
});
const h3 = (color = NAVY): CSSProperties => ({
  margin: 0, font: `600 var(--ate-h3)/1.15 ${SANS}`, letterSpacing: "-.02em", color, textWrap: "pretty",
});
const lead = (color = BODY): CSSProperties => ({ margin: 0, font: "var(--ate-lead)", color, textWrap: "pretty" });
const text = (color = BODY, size = 16): CSSProperties => ({
  margin: 0, font: `400 ${size}px/1.6 ${SANS}`, color, textWrap: "pretty",
});
const caption = (color = MUTED): CSSProperties => ({
  margin: 0, font: `400 14px/1.55 ${SANS}`, color, textWrap: "pretty",
});

function Btn({ children, href, tone }: { children: ReactNode; href: string; tone: "cyan" | "outline" | "quiet" }) {
  const tones: Record<string, CSSProperties> = {
    cyan: { background: CYAN, color: NAVY },
    outline: { background: "transparent", color: WHITE, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.42)" },
    quiet: { background: "transparent", color: NAVY, boxShadow: `inset 0 0 0 1px ${HAIR}` },
  };
  return (
    <a href={href} className={`ate-btn ate-btn--${tone}`} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      height: 52, padding: "0 26px", font: `500 14px/1 ${SANS}`, letterSpacing: ".045em",
      textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap", ...tones[tone],
    }}>{children}</a>
  );
}

/* ── data, verbatim from the design's renderVals and the docx ── */

const STATS: [string, string][] = [
  ["20+ years", "Building defence test systems"],
  ["3 categories", "Manual, microcontroller, PC-based"],
  ["Design → Field", "Lifecycle coverage"],
  ["NCAGE 6567Y", "NATO Commercial & Government Entity code"],
];

const BENEFITS: [string, string, string][] = [
  ["01", "High throughput, low human error", "Automated execution with minimal operator intervention. Repeatability stops depending on who is on shift."],
  ["02", "Built for non-standard testing", "Designed for critical assemblies where off-the-shelf equipment simply cannot perform the test."],
  ["03", "Scalable architecture", "Upgradeable as requirements evolve, so the system is not obsolete the first time the test spec changes."],
  ["04", "Operation without a manual", "Interfaces designed for minimal training, with custom report generation and storage for large volumes of results."],
  ["05", "Rugged where it needs to be", "Portable and battery-operated configurations for field and forward-area use."],
  ["06", "Traceable by default", "Self-test at startup, preset and user-configurable conditions, and stored results for audit and review."],
];

type Row = [string, string];
const CAT_A: Row[] = [
  ["Best for", "Depot and field use where operators are already trained on legacy equipment"],
  ["Operator role", "Sets inputs by switch, reads meters, records results"],
  ["Interface", "Toggle and rotary switches, analogue meters"],
  ["Output", "Manual test report"],
  ["Choose when", "Continuity with legacy equipment matters more than automation"],
];
const CAT_B: Row[] = [
  ["Best for", "Cost-effective embedded testing at higher duty cycles"],
  ["Operator role", "Follows on-screen prompts; system evaluates"],
  ["Interface", "LCD or touch screen with membrane keypad"],
  ["Output", "On-board storage, optional USB printer"],
  ["Choose when", "The test sequence is well defined and unit count is high"],
];
const CAT_C: Row[] = [
  ["Best for", "High-speed testing and complex data capture"],
  ["Operator role", "Starts the sequence; system evaluates and logs"],
  ["Interface", "Full workstation GUI with real-time visualization"],
  ["Output", "Custom reporting, large result sets, export"],
  ["Choose when", "You need to see the data, not just the verdict"],
];

const AERO: Row[] = [
  ["Alternator control & protection test rig", "Voltage regulation, frequency regulation, current control and protection response, under simulated aircraft electrical conditions."],
  ["Static voltage regulator test rig", "Voltage and frequency regulation of a 12 kVA three-phase alternator regulator, tested statically by substituting an equivalent AC source for the permanent magnet generator."],
  ["Duct temperature sensor test rig", "Sensor output across a temperature range, with the sensor immersed in a temperature-controlled bath of aviation turbine fuel to replicate its real operating environment."],
];
const DEFENCE: Row[] = [
  ["Portable missile checkout equipment (KMTE)", "Final pre-firing checkout in the field: generates course and pitch commands, measures response time, and compares results against preset limits to display PASS or FAIL."],
  ["Launcher test panel suite", "Eight panels covering card-level and system-level testing, fault isolation, calibration and final acceptance of launcher electronics."],
  ["Fire-control sighting test stand", "Electrical parameters of the primary fire-control and sighting device of a main battle tank, verified before integration and field deployment."],
  ["Spin test equipment", "Rotational speed at which fuze segment-lock shutters open, measured optically at speeds to 8,000 RPM and read out by an ARM-based controller."],
  ["Wire harness tester", "Continuity, isolation resistance and insulation strength for airborne applications."],
  ["Gyro test rack", "Drift parameters and stabilization rate for gyro gimbal assemblies."],
];

const CAPS: [string, string, string][] = [
  ["Startup", "Self-test at power-on", "The system verifies itself before it verifies your assembly, so a fault in the tester is never mistaken for a fault in the unit."],
  ["Configuration", "Preset and user-defined conditions", "Standard test conditions stored as presets, with room for the operator to configure where the process requires it."],
  ["Records", "Built-in result storage", "Hundreds to thousands of test results retained on the system, available for recall and review."],
  ["Output", "Custom report generation", "Reports formatted to your documentation requirement, not to a generic template."],
];

const APPS: [string, string, string][] = [
  ["Aerospace", "Aircraft electrical and sensor systems", "Alternator control and protection, voltage regulation, temperature sensing, verified under simulated aircraft conditions before installation."],
  ["Defence", "Assemblies where test coverage is a safety requirement", "Launcher electronics, fuzes, guidance sub-assemblies and integration-stage testing, validated at build and re-validated through maintenance."],
  ["Industrial QA", "Production testing where cycle time decides output", "Module and system fault diagnosis, and high-throughput production testing where repeatability and speed determine line performance."],
];

const TAGS = [
  "Functional validation", "Continuity & isolation", "Voltage & frequency regulation", "Response time",
  "Drift & stabilization", "Rotational speed measurement", "Environmental simulation", "Fault isolation & calibration",
];

const PROCESS: [string, string, string][] = [
  ["01", "Define", "Share the assembly, the parameters to verify, the throughput and the environment it will be tested in."],
  ["02", "Architect", "We propose a category and scope: manual, microcontroller or PC-based, plus fixturing, interfaces and reporting."],
  ["03", "Build & validate", "Design, manufacture and in-house validation against your acceptance criteria before dispatch."],
  ["04", "Deploy & support", "Installation, commissioning, operator familiarisation, and support through the life of the system."],
];

function SpecList({ rows, onDark }: { rows: Row[]; onDark?: boolean }) {
  return (
    <dl style={{ margin: "24px 0 0" }}>
      {rows.map(([k, v]) => (
        <div key={k} className="ate-spec" style={{
          borderTop: `1px solid ${onDark ? HAIR_DARK : HAIR}`, padding: "12px 0",
          display: "grid", gridTemplateColumns: "130px 1fr", gap: 16,
        }}>
          <dt style={eyebrow(onDark ? CYAN : CYAN_INK)}>{k}</dt>
          <dd style={{ ...text(onDark ? "rgba(255,255,255,.86)" : NAVY, 14.5), margin: 0 }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function AteSystems() {
  return (
    <main className="ate-page" style={{ background: PAGE, color: BODY, fontFamily: SANS }}>

      {/* 01 · hero, product blended into the navy ground */}
      <section style={{
        position: "relative", background: NAVY, overflow: "hidden",
        minHeight: "var(--ate-hero-min)", display: "flex", alignItems: "center",
      }}>
        {/* Two layers, as drawn: a luminosity pass that lets the cabinet take the
            navy's hue, and a lower-opacity straight copy over it to bring some of
            the panel colour back. */}
        <div aria-hidden className="ate-hero-img" style={{
          position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)",
          height: "var(--ate-hero-img)", aspectRatio: "774 / 1240",
        }}>
          <Image src="/assets/ate-acpu-rig.png" alt="" fill priority quality={90}
            sizes="(min-width:1180px) 400px, 300px"
            style={{ objectFit: "contain", opacity: .92, mixBlendMode: "luminosity", filter: "saturate(.55) contrast(1.05)" }} />
          <Image src="/assets/ate-acpu-rig.png" alt="" fill priority quality={90}
            sizes="(min-width:1180px) 400px, 300px"
            style={{ objectFit: "contain", opacity: .55 }} />
        </div>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(90deg,rgba(11,42,58,.99) 0%,rgba(11,42,58,.96) 38%,rgba(11,42,58,.72) 60%,rgba(11,42,58,.42) 78%,rgba(11,42,58,.62) 100%)" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(0deg,rgba(11,42,58,.95) 0%,rgba(11,42,58,0) 26%),linear-gradient(180deg,rgba(11,42,58,.85) 0%,rgba(11,42,58,0) 22%)" }} />

        <div style={{ position: "relative", ...SHELL, width: "100%", padding: "clamp(116px,9vw,140px) var(--ate-gut) clamp(72px,7vw,104px)" }}>
          <div style={{ maxWidth: "var(--ate-hero-copy)" }}>
            <p style={eyebrow(CYAN)}>Automated Test Equipment</p>
            <h1 style={{
              margin: "24px 0 0", font: `600 var(--ate-h1)/1.03 ${SANS}`, letterSpacing: "-.028em",
              color: WHITE, maxWidth: "18ch", textWrap: "pretty",
            }}>
              When no instrument you can buy will <span style={{ color: CYAN }}>answer the question.</span>
            </h1>
            <p style={{ ...lead("rgba(255,255,255,.84)"), margin: "28px 0 0", maxWidth: "52ch" }}>
              Some assemblies cannot be verified by anything on a catalogue page. MQS designs and builds the test equipment
              for those: manual, microcontroller and PC-based systems for design, production and maintenance, engineered
              around one assembly and the way your people actually work.
            </p>
            <div className="ate-cta" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 38 }}>
              <Btn href="#contact" tone="cyan">Talk to an Engineer</Btn>
              <Btn href="#portfolio" tone="outline">See Systems We&rsquo;ve Built</Btn>
            </div>
            <p style={{ ...caption("rgba(255,255,255,.62)"), fontSize: 13.5, marginTop: 32 }}>
              IMG-01 · Alternator Control &amp; Protection Unit test rig, a full-cabinet functional verification system
              simulating aircraft electrical conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 02 · compact data row */}
      <section style={{ background: WHITE, padding: "40px 0", borderBottom: `1px solid ${HAIR}` }}>
        {/* nowrap above 1024 so each label wraps inside its own 24ch box, which is
            what the design intends; whole items wrapping turned one row into three.
            Below that it becomes a two-up grid. */}
        <div className="ate-stats" style={{ ...SHELL, alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          {STATS.map(([figure, label]) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
              <span style={{ font: `600 24px/1.1 ${DISPLAY}`, letterSpacing: "-.03em", color: NAVY, whiteSpace: "nowrap" }}>{figure}</span>
              <span style={{ ...text(MUTED, 14), maxWidth: "24ch" }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 · why custom */}
      <section id="why" style={{ background: PAGE, padding: "var(--ate-sec) 0" }}>
        <div style={SHELL}>
          <div style={{ maxWidth: "64ch", marginBottom: 56 }}>
            <p style={eyebrow()}>Why custom ATE</p>
            <h2 style={{ ...h2(), margin: "20px 0 0" }}>Catalogue instruments test parameters. ATE tests your assembly.</h2>
            <p style={{ ...lead(), margin: "24px 0 0" }}>
              A bench multimeter measures voltage. It does not know what your unit is supposed to do, in what sequence,
              under what conditions, or what result counts as a pass. For a critical assembly, the gap between those two
              things is where escapes happen. Custom test equipment closes it: the test sequence, the limits, the fixture
              and the report are built around one assembly, so the operator presses start, and the system decides.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "var(--ate-grid-3)", gap: "var(--ate-gap-md)" }}>
            {BENEFITS.map(([n, title, body]) => (
              <div key={n} style={{ background: WHITE, border: `1px solid ${HAIR}`, padding: 28 }}>
                <div style={{ ...code(), marginBottom: 16 }}>{n}</div>
                <h3 style={{ margin: "0 0 10px", font: `500 21px/1.3 ${SANS}`, letterSpacing: "-.015em", color: NAVY }}>{title}</h3>
                <p style={text(BODY, 15)}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · three categories */}
      <section id="categories" style={{ background: WHITE, padding: "var(--ate-sec) 0 0" }}>
        <div style={SHELL}>
          <div style={{ display: "grid", gridTemplateColumns: "var(--ate-cols-intro)", gap: 80, alignItems: "end" }}>
            <div>
              <p style={eyebrow()}>Three categories</p>
              <h2 style={{ ...h2(), margin: "20px 0 0" }}>Three ways to build a test system.</h2>
            </div>
            <p style={lead()}>
              The choice is driven by test speed, data complexity, budget, and sometimes by what your people were trained
              on. Most requirements resolve to one of these within the first conversation.
            </p>
          </div>
        </div>

        {/* A · manual / analog */}
        <div style={{ background: WHITE, padding: "80px 0 0" }}>
          <div style={SHELL}>
            <div style={{
              borderTop: `2px solid ${NAVY}`, paddingTop: 32, display: "grid",
              gridTemplateColumns: "var(--ate-cols-a)", gap: 64, alignItems: "start",
            }}>
              <div style={{ background: INSET, border: `1px solid ${HAIR}`, padding: "var(--ate-pad-box)" }}>
                <Image src="/assets/ate-launcher-panel.png" width={1047} height={612} quality={92}
                  sizes="(min-width:1180px) 620px, (min-width:1024px) 55vw, 90vw"
                  alt="MQS manual test panel with toggle switches, rotary selectors, indicator lamps and connectors"
                  style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
              <div>
                <p style={code()}>A · Manual / analog</p>
                <h3 style={{ ...h3(), margin: "16px 0 0" }}>Built to match the training your operators already have.</h3>
                <p style={{ ...text(BODY), margin: "20px 0 0", lineHeight: 1.65 }}>
                  User-operated equipment following a documented procedure: the operator sets inputs on toggle or rotary
                  switches, reads voltage, current and frequency, and prepares the test report. These remain the traditional
                  test systems in defence depots, specified where continuity with existing training matters.
                </p>
                <p style={{ ...caption(), margin: "20px 0 0" }}>
                  IMG-02 · Launcher test panel, one of eight panels in a card-level and system-level test suite. The
                  front-panel layout deliberately replicates the original equipment so trained operators need no retraining.
                </p>
                <SpecList rows={CAT_A} />
              </div>
            </div>
          </div>
        </div>

        {/* B · microcontroller-based, on navy */}
        <div style={{ background: NAVY, marginTop: 80, padding: "88px 0" }}>
          <div style={{ ...SHELL, display: "grid", gridTemplateColumns: "var(--ate-cols-b)", gap: "var(--ate-gap-lg)", alignItems: "center" }}>
            <div>
              <p style={code(CYAN)}>B · Microcontroller-based</p>
              <h3 style={{ ...h3(WHITE), margin: "16px 0 0" }}>Embedded testing that travels to the unit.</h3>
              <p style={{ ...text("rgba(255,255,255,.82)"), margin: "20px 0 0", lineHeight: 1.65 }}>
                Embedded test systems offered as a cost-effective package, designed for higher duty cycles and ease of
                operation. A typical system pairs an LCD or touch screen with a membrane keyboard, and connects to the unit
                under test through custom connectors or a mechanical enclosure suited to its form factor.
              </p>
              <SpecList rows={CAT_B} onDark />
            </div>
            <div style={{ background: WHITE, padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              {/* Capped at native width: at 457 x 440 this is the smallest of the
                  four and softens beyond it. The docx flags it and asks for a
                  better original. */}
              <Image src="/assets/ate-portable-case.png" width={457} height={440} quality={92}
                sizes="420px"
                alt="MQS portable ruggedised test equipment in a hard case with keypad, display and rotary controls"
                style={{ display: "block", width: "var(--ate-case-w)", maxWidth: "100%", height: "auto" }} />
              <p style={{ ...caption(), borderTop: `1px solid ${HAIR}`, paddingTop: 14, width: "100%" }}>
                IMG-03 · Portable field test system in a ruggedised case, battery powered for standalone operation,
                generating commands, measuring response time and displaying a PASS / FAIL verdict against preset limits.
              </p>
            </div>
          </div>
        </div>

        {/* C · PC-based */}
        <div style={{ background: WHITE, padding: "88px 0 var(--ate-sec)" }}>
          <div style={{ ...SHELL, display: "grid", gridTemplateColumns: "var(--ate-cols-c)", gap: "var(--ate-gap-lg)", alignItems: "center" }}>
            <div style={{ background: INSET, border: `1px solid ${HAIR}`, padding: 40, display: "flex", justifyContent: "center" }}>
              <Image src="/assets/ate-static-regulator.png" width={700} height={1240} quality={92}
                sizes="(min-width:1180px) 340px, 300px"
                alt="MQS static regulator test rig cabinet with instrumentation, meters and control panel"
                style={{ display: "block", height: "var(--ate-tall)", width: "auto", maxWidth: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <p style={code()}>C · PC-based (LabVIEW)</p>
              <h3 style={{ ...h3(), margin: "16px 0 0" }}>When you need to see the data, not just the verdict.</h3>
              <p style={{ ...text(BODY), margin: "20px 0 0", lineHeight: 1.65, maxWidth: "56ch" }}>
                Workstation-driven systems for high-speed testing and complex data capture, combining analog and digital
                measurement sources with real-time data acquisition, visualization and custom software.
              </p>
              <p style={{ ...caption(), margin: "20px 0 0", maxWidth: "56ch" }}>
                IMG-04 · Static regulator test rig, a cabinet system for functional verification of voltage and frequency
                regulation under controlled laboratory conditions.
              </p>
              <div style={{ maxWidth: "56ch" }}><SpecList rows={CAT_C} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · systems built */}
      <section id="portfolio" style={{ background: PAGE, padding: "var(--ate-sec) 0" }}>
        <div style={SHELL}>
          <div style={{ maxWidth: "60ch", marginBottom: 56 }}>
            <p style={eyebrow()}>Systems built</p>
            <h2 style={{ ...h2(), margin: "20px 0 0" }}>What we have designed and delivered.</h2>
            <p style={{ ...lead(), margin: "22px 0 0" }}>
              Each entry is a system MQS has built and delivered. Described by test function rather than by platform or
              customer, in line with the confidentiality our defence customers expect.
            </p>
          </div>

          {([["Aerospace test systems", "Three systems", AERO], ["Defence test systems", "Six systems", DEFENCE]] as const).map(([title, count, items]) => (
            <div key={title} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, font: `500 var(--ate-h4)/1.2 ${SANS}`, letterSpacing: "-.015em", color: NAVY }}>{title}</h3>
                <span style={eyebrow(MUTED)}>{count}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "var(--ate-grid-3)", gap: 24 }}>
                {items.map(([system, verifies]) => (
                  <div key={system} style={{ background: WHITE, border: `1px solid ${HAIR}`, borderTop: `3px solid ${CYAN}`, padding: 26 }}>
                    <h4 style={{ margin: "0 0 12px", font: `500 19px/1.3 ${SANS}`, letterSpacing: "-.01em", color: NAVY }}>{system}</h4>
                    <p style={text(BODY, 15)}>{verifies}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* KMTE gets its own block. It is the one system nameable in full,
              because the ministerial launch is public record. */}
          <div style={{ background: NAVY, padding: "44px 48px", display: "grid", gridTemplateColumns: "var(--ate-cols-kmte)", gap: 56, alignItems: "center" }}>
            <div>
              <p style={eyebrow(CYAN)}>One system named in full</p>
              <h3 style={{ ...h3(WHITE), margin: "16px 0 0" }}>Konkurs M Missile Test Equipment</h3>
            </div>
            <p style={{ ...text("rgba(255,255,255,.86)", 17), lineHeight: 1.65 }}>
              The Konkurs M Missile Test Equipment (KMTE) can be named openly, because it was launched publicly by the
              Hon&rsquo;ble Defence Minister in August 2023. That launch is a matter of public record, and it is the single
              strongest credential in the ATE portfolio: an indigenous test system, recognised at ministerial level, built
              for use at forward locations.
            </p>
          </div>
        </div>
      </section>

      {/* 06 · standard capabilities */}
      <section id="capabilities" style={{ background: WHITE, padding: "var(--ate-sec) 0" }}>
        <div style={SHELL}>
          <div style={{ marginBottom: 48 }}>
            <p style={eyebrow()}>Standard capabilities</p>
            <h2 style={{ ...h2(), margin: "20px 0 0" }}>Included in every system we build.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "var(--ate-grid-4)", gap: 24 }}>
            {CAPS.map(([key, title, body]) => (
              <div key={key} style={{ background: INSET, padding: 28 }}>
                <div style={{ ...eyebrow(), marginBottom: 14 }}>{key}</div>
                <h3 style={{ margin: "0 0 10px", font: `500 20px/1.3 ${SANS}`, letterSpacing: "-.01em", color: NAVY }}>{title}</h3>
                <p style={text(BODY, 15)}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 · applications */}
      <section id="applications" style={{ background: PAGE, padding: "var(--ate-sec) 0" }}>
        <div style={SHELL}>
          <div style={{ marginBottom: 48 }}>
            <p style={eyebrow()}>Applications</p>
            <h2 style={{ ...h2(), margin: "20px 0 0" }}>Where MQS test equipment is used.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "var(--ate-grid-3)", gap: 0, borderTop: `2px solid ${NAVY}` }}>
            {APPS.map(([key, title, body]) => (
              <div key={key} className="ate-app" style={{ padding: "28px 32px", borderLeft: `1px solid ${HAIR}` }}>
                <div style={{ ...eyebrow(), marginBottom: 14 }}>{key}</div>
                <h3 style={{ margin: "0 0 12px", font: `500 22px/1.3 ${SANS}`, letterSpacing: "-.01em", color: NAVY }}>{title}</h3>
                <p style={text(BODY, 15)}>{body}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 40 }}>
            {TAGS.map((t) => (
              <span key={t} style={{
                border: `1px solid ${HAIR}`, background: WHITE, padding: "10px 16px",
                font: `500 14px/1.2 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase", color: NAVY,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · how it works */}
      <section id="process" style={{ background: WHITE, padding: "var(--ate-sec) 0" }}>
        <div style={{ ...SHELL, display: "grid", gridTemplateColumns: "var(--ate-cols-process)", gap: 80, alignItems: "start" }}>
          <div>
            <p style={eyebrow()}>How it works</p>
            <h2 style={{ ...h2(), margin: "20px 0 0", font: `600 calc(var(--ate-h2) * .92)/1.12 ${SANS}` }}>
              A custom system is a project, not a purchase order.
            </h2>
          </div>
          <div>
            {PROCESS.map(([n, stage, body]) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 24, borderTop: `1px solid ${HAIR}`, padding: "26px 0" }}>
                <span style={{ ...code(), lineHeight: 1.6 }}>{n}</span>
                <div>
                  <h3 style={{ margin: "0 0 10px", font: `500 var(--ate-h4)/1.25 ${SANS}`, letterSpacing: "-.015em", color: NAVY }}>{stage}</h3>
                  <p style={text(BODY)}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 · final CTA */}
      <section id="contact" style={{ background: NAVY, padding: "calc(var(--ate-sec) * .93) 0" }}>
        <div style={{ ...SHELL, display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center" }}>
          <p style={eyebrow(CYAN)}>Talk to us</p>
          <h2 style={{ ...h2(WHITE), font: `600 calc(var(--ate-h2) * 1.05)/1.1 ${SANS}`, maxWidth: "26ch" }}>
            Have a test requirement nothing on the market covers?
          </h2>
          <p style={{ ...lead("rgba(255,255,255,.82)"), maxWidth: "60ch" }}>
            Tell us the assembly, the parameters you need to verify and where it will be tested. Our engineers will propose
            a category and a scope, and will say so if a standard instrument would do the job.
          </p>
          <div className="ate-cta" style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center", marginTop: 12 }}>
            <Btn href="/contact" tone="cyan">Talk to an Engineer</Btn>
            <a href="tel:+914023811122" style={{
              font: `500 22px/1 ${DISPLAY}`, color: WHITE, letterSpacing: "-.01em",
              minHeight: 44, display: "inline-flex", alignItems: "center", padding: "0 16px", textDecoration: "none",
            }}>+91 40 2381 1122</a>
          </div>
        </div>
      </section>
    </main>
  );
}
