"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { CountUp, ImageWipe, Parallax, Reveal, RowCascade, RuleDraw, Stagger, useScrollSpy } from "./primitives";

/* ──────────────────────────────────────────────────────────────
   /motion-lab — a scrollable menu of scroll-motion options.

   Every demo uses real MQS content and real assets, because motion reads
   completely differently against a wall of placeholder text than it does against
   a spec table or a CT render. Each block says what it suits and what it costs,
   and carries a Replay button so it can be judged more than once without a
   reload.

   Not linked from anywhere and carries noindex. Delete the route once the set is
   chosen; the primitives it demonstrates are the thing that stays.
   ────────────────────────────────────────────────────────────── */

const NAVY = "#0B2A3A", WHITE = "#FFFFFF", PAGE = "#F4F8FA", INSET = "#E9F0F4";
const HAIR = "#D3DFE7", CYAN = "#16C1F3", CYAN_INK = "#0A6A88";
const BODY = "#41586A", MUTED = "#5F7688";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

const SHELL: CSSProperties = { maxWidth: 1180, margin: "0 auto", padding: "0 clamp(24px,4vw,55px)" };
const eyebrow = (c = CYAN_INK): CSSProperties => ({ margin: 0, font: `500 12px/1.2 ${SANS}`, letterSpacing: ".1em", textTransform: "uppercase", color: c });
const h3 = (c = NAVY): CSSProperties => ({ margin: 0, font: `600 clamp(21px,2.4vw,28px)/1.2 ${SANS}`, letterSpacing: "-.02em", color: c });
const body = (c = BODY, s = 15): CSSProperties => ({ margin: 0, font: `400 ${s}px/1.6 ${SANS}`, color: c, textWrap: "pretty" });

/* real content, lifted from the pages these would apply to */
const ATE_BENEFITS: [string, string][] = [
  ["01", "High throughput, low human error"],
  ["02", "Built for non-standard testing"],
  ["03", "Scalable architecture"],
  ["04", "Operation without a manual"],
  ["05", "Rugged where it needs to be"],
  ["06", "Traceable by default"],
];
const MQCT_STATS: { v: number; unit: string; label: string }[] = [
  { v: 300, unit: "kV", label: "Microfocus" },
  { v: 450, unit: "kV", label: "Minifocus" },
  { v: 15, unit: "MeV", label: "LINAC high energy" },
  { v: 427, unit: "mm", label: "Max detector size" },
];
const SPEC_ROWS: [string, string][] = [
  ["Microfocus tubes", "Up to 300 kV"],
  ["Minifocus tubes", "Up to 450 kV"],
  ["Linear accelerators", "0.95 MeV to 15 MeV"],
  ["Detector size", "Up to 427 × 427 mm"],
  ["Contrast / ADC", "16-bit"],
  ["Real-time imaging", "Up to 30 fps"],
];
const SPY_IDS = ["spy-overview", "spy-why", "spy-models", "spy-specs"];

/* ── demo frame ── */

function Demo({
  n, name, suits, cost, verdict, children,
}: { n: string; name: string; suits: string; cost: string; verdict: "recommend" | "consider" | "skip"; children: ReactNode }) {
  const [run, setRun] = useState(0);
  const tone = { recommend: ["#0A6A88", "#E3F5FD"], consider: ["#8A5A00", "#FBF2E2"], skip: ["#8A3E1B", "#F6EBE4"] }[verdict];
  const label = { recommend: "Recommend", consider: "Consider", skip: "Would skip" }[verdict];
  return (
    <section style={{ borderTop: `1px solid ${HAIR}`, padding: "clamp(48px,7vw,88px) 0" }}>
      <div style={SHELL}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 14, marginBottom: 14 }}>
          <span style={{ font: `600 13px/1 ${DISPLAY}`, letterSpacing: ".08em", color: CYAN_INK }}>{n}</span>
          <h3 style={h3()}>{name}</h3>
          <span style={{ font: `500 10.5px/1 ${SANS}`, letterSpacing: ".1em", textTransform: "uppercase", background: tone[1], color: tone[0], padding: "6px 8px" }}>{label}</span>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            style={{
              marginLeft: "auto", height: 36, padding: "0 14px", border: `1px solid ${HAIR}`,
              background: WHITE, color: NAVY, cursor: "pointer", borderRadius: 0,
              font: `500 11px/1 ${SANS}`, letterSpacing: ".08em", textTransform: "uppercase",
            }}
          >
            Replay
          </button>
        </div>
        <div style={{ display: "grid", gap: 6, marginBottom: 30, maxWidth: "78ch" }}>
          <p style={body(BODY)}><strong style={{ color: NAVY }}>Suits.</strong> {suits}</p>
          <p style={body(MUTED, 14)}><strong style={{ color: NAVY }}>Costs.</strong> {cost}</p>
        </div>
        <div key={run}>{children}</div>
      </div>
    </section>
  );
}

function Card({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ background: WHITE, border: `1px solid ${HAIR}`, padding: 22 }}>
      <div style={{ font: `600 13px/1 ${DISPLAY}`, letterSpacing: ".08em", color: CYAN_INK, marginBottom: 12 }}>{n}</div>
      <p style={{ margin: 0, font: `500 17px/1.3 ${SANS}`, letterSpacing: "-.01em", color: NAVY }}>{title}</p>
    </div>
  );
}

export default function MotionLab() {
  const active = useScrollSpy(SPY_IDS);

  return (
    /* No top padding on main: the navy header below runs under the fixed site
       header so that header has the dark ground its over-dark treatment expects.
       Padding the root instead left it invisible on the light page ground. */
    <main style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      <header style={{ background: NAVY, padding: "clamp(132px,11vw,164px) 0 clamp(56px,7vw,88px)" }}>
        <div style={SHELL}>
          <p style={eyebrow(CYAN)}>Internal · not linked, noindex</p>
          <h1 style={{ margin: "18px 0 0", font: `600 clamp(30px,4.4vw,52px)/1.06 ${SANS}`, letterSpacing: "-.03em", color: WHITE, maxWidth: "24ch" }}>
            Scroll motion, nine options.
          </h1>
          <p style={{ ...body("rgba(255,255,255,.82)", 17), marginTop: 22, maxWidth: "68ch" }}>
            Every demo below uses real MQS content, because motion reads differently against a spec table than against
            placeholder text. Scroll through, hit Replay on anything you want to see again, and tell me which to keep.
            Whatever you pick becomes one shared set of values and replaces the seven that currently disagree.
          </p>
          <p style={{ ...body("rgba(255,255,255,.62)", 14), marginTop: 18, maxWidth: "68ch" }}>
            Today: three durations (280 / 420 / 900ms), four thresholds and two rootMargins across seven components, one
            generic Reveal imported nowhere, and no scroll motion at all on services, industries, MQCT, MQX.tracE, MQXC,
            ATE or careers. If your system is set to reduced motion, everything here will simply be still, by design.
          </p>
        </div>
      </header>

      <Demo
        n="01" name="Section rise" verdict="recommend"
        suits="The default for every section on every page. Fade plus a 24px rise. This one effect is what makes a page feel like it arrives as you scroll, and it is already on About and Contact."
        cost="Nothing measurable. Transform and opacity only, so no layout shift, and it never touches a hero."
      >
        <Reveal>
          <div style={{ background: WHITE, border: `1px solid ${HAIR}`, padding: "clamp(24px,4vw,44px)" }}>
            <p style={eyebrow()}>Why computed tomography</p>
            <p style={{ margin: "16px 0 0", font: `600 clamp(22px,3vw,34px)/1.14 ${SANS}`, letterSpacing: "-.025em", color: NAVY, maxWidth: "24ch" }}>
              Same part. Seven questions. Two very different answers.
            </p>
            <p style={{ ...body(BODY, 16), marginTop: 16, maxWidth: "58ch" }}>
              If you already run digital radiography, this is the comparison that matters. Both technologies find defects.
              Only one measures them.
            </p>
          </div>
        </Reveal>
      </Demo>

      <Demo
        n="02" name="Grid stagger" verdict="recommend"
        suits="Card rows and benefit grids: the ATE benefits 3×2, the MQCT benefits, the portfolio cards, the department cards on Contact where it already runs. Children arrive 60ms apart."
        cost="Adds about 350ms before the last card in a six-card grid settles. Keep the step small; at 120ms a six-card grid feels slow."
      >
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
          {ATE_BENEFITS.map(([n, t]) => <Card key={n} n={n} title={t} />)}
        </Stagger>
      </Demo>

      <Demo
        n="03" name="Hairline draw" verdict="recommend"
        suits="Section rules and dividers. The most on-brand option available, because the whole design system is built on 1px hairlines and 2px section rules. Reads as precision rather than decoration."
        cost="Nothing. A single scaleX on a 1px element."
      >
        <div style={{ display: "grid", gap: 34 }}>
          {["Three ways to build a test system.", "What we have designed and delivered.", "Included in every system we build."].map((t, i) => (
            <div key={t}>
              <RuleDraw colour={NAVY} height={2} delay={i * 140} />
              <p style={{ margin: "18px 0 0", font: `600 clamp(19px,2.4vw,26px)/1.2 ${SANS}`, letterSpacing: "-.02em", color: NAVY }}>{t}</p>
            </div>
          ))}
        </div>
      </Demo>

      <Demo
        n="04" name="Count-up figures" verdict="recommend"
        suits="Stats strips. Already on the home page, About and the products hero at 1100ms with an 80ms stagger. Missing from the MQCT and ATE strips, which is an inconsistency worth closing either way."
        cost="None, and the final value server-renders, so no-JS and reduced motion both read the real number rather than a zero."
      >
        <div style={{ background: WHITE, border: `1px solid ${HAIR}`, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 1, backgroundColor: HAIR }}>
          {MQCT_STATS.map((s, i) => (
            <div key={s.label} style={{ background: WHITE, padding: "26px 22px" }}>
              <CountUp value={s.v} unit={s.unit} delay={i * 80}
                style={{ font: `600 clamp(26px,3.2vw,38px)/1 ${DISPLAY}`, letterSpacing: "-.03em", color: NAVY, display: "block" }} />
              <p style={{ ...eyebrow(MUTED), marginTop: 12 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Demo>

      <Demo
        n="05" name="Image reveal, wipe" verdict="consider"
        suits="Analysis renders, where the wipe draws the eye across the defect as it appears. Strongest on the wall-thickness and porosity maps."
        cost="900ms is long. On a page with nine images it becomes the thing the reader notices, so it wants reserving for two or three."
      >
        <ImageWipe mode="wipe" style={{ border: `1px solid ${HAIR}`, background: "#000" }}>
          <Image src="/assets/mqctc-wallthickness.jpg" width={1363} height={666} quality={90} sizes="(min-width:1180px) 1070px, 92vw"
            alt="CT wall thickness colour map of an aluminium casting"
            style={{ display: "block", width: "100%", height: "auto" }} />
        </ImageWipe>
      </Demo>

      <Demo
        n="06" name="Image reveal, scale" verdict="consider"
        suits="Equipment photography. A 1.04 scale settling to 1.0 under a fade, which is quieter than a wipe and works better on a cut-out than on a full-bleed frame."
        cost="Very subtle, to the point where it is fair to ask whether it earns its code. Worth comparing directly against 05 and against plain 01."
      >
        <ImageWipe mode="scale" style={{ background: INSET, border: `1px solid ${HAIR}`, padding: "clamp(20px,4vw,44px)", display: "flex", justifyContent: "center" }}>
          <Image src="/assets/ate-acpu-rig.png" width={774} height={1240} quality={90} sizes="340px"
            alt="MQS ACPU test rig cabinet"
            style={{ display: "block", height: "clamp(280px,40vw,420px)", width: "auto" }} />
        </ImageWipe>
      </Demo>

      <Demo
        n="07" name="Spec row cascade" verdict="consider"
        suits="The MQCT and MQX.tracE spec tables, and the ATE category spec lists. Rows arrive 45ms apart with a small horizontal offset."
        cost="On a 24-row table the last row lands a second after the first. Good on a six-row group, wrong on a long one, so it wants a row cap."
      >
        <RowCascade style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
          {SPEC_ROWS.map(([k, v], i) => (
            <div key={k} style={{
              display: "grid", gridTemplateColumns: "minmax(0,5fr) minmax(0,6fr)", gap: 16,
              padding: "14px 20px", borderTop: i ? `1px solid ${HAIR}` : "none",
            }}>
              <span style={eyebrow(MUTED)}>{k}</span>
              <span style={{ ...body(NAVY, 15), fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </RowCascade>
      </Demo>

      <Demo
        n="08" name="Sticky nav active state" verdict="recommend"
        suits="Not decoration, and the one on this list that is a usability fix. MQCT and MQX.tracE both carry sticky section navs with no active state on documents over ten thousand pixels tall, so the nav cannot tell you where you are. Scroll the block below and watch the bar."
        cost="A scroll listener on one rAF. Nothing else."
      >
        <div>
          <div style={{ position: "sticky", top: 76, zIndex: 5, background: WHITE, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`, display: "flex", gap: 22, padding: "0 20px", overflowX: "auto" }}>
            {SPY_IDS.map((id) => {
              const on = active === id;
              return (
                <a key={id} href={`#${id}`} style={{
                  ...eyebrow(on ? NAVY : MUTED), height: 48, display: "inline-flex", alignItems: "center",
                  borderBottom: `2px solid ${on ? CYAN : "transparent"}`, textDecoration: "none", whiteSpace: "nowrap",
                  transition: "color 200ms, border-color 200ms",
                }}>
                  {id.replace("spy-", "")}
                </a>
              );
            })}
          </div>
          {SPY_IDS.map((id, i) => (
            <div key={id} id={id} style={{ scrollMarginTop: 130, background: i % 2 ? INSET : WHITE, border: `1px solid ${HAIR}`, borderTop: "none", padding: "clamp(40px,8vw,90px) 24px" }}>
              <p style={eyebrow()}>{id.replace("spy-", "")}</p>
              <p style={{ ...body(NAVY, 18), marginTop: 10, fontWeight: 500 }}>Scroll on. The bar above should follow.</p>
            </div>
          ))}
        </div>
      </Demo>

      <Demo
        n="09" name="Parallax drift" verdict="skip"
        suits="Hero cut-outs, in theory: the ATE cabinet or the MQXC render drifting 40px against the copy."
        cost="Here so you can reject it with your eyes rather than on my say-so. Your readers are procurement engineers scanning for specifications, and drift fights a scan. It also pins a transform on an element for the whole scroll, which is the one thing that reliably costs you a frame budget on a mid-range Android."
      >
        <div style={{ background: NAVY, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center", padding: "clamp(30px,5vw,60px)" }}>
          <div>
            <p style={eyebrow(CYAN)}>Automated Test Equipment</p>
            <p style={{ margin: "16px 0 0", font: `600 clamp(22px,3.2vw,36px)/1.06 ${SANS}`, letterSpacing: "-.028em", color: WHITE, maxWidth: "18ch" }}>
              When no instrument you can buy will answer the question.
            </p>
          </div>
          <Parallax amount={40}>
            <Image src="/assets/ate-acpu-rig.png" width={774} height={1240} quality={88} sizes="220px"
              alt="" aria-hidden="true"
              style={{ display: "block", height: "clamp(200px,26vw,300px)", width: "auto", opacity: .9 }} />
          </Parallax>
        </div>
      </Demo>

      <section style={{ background: NAVY, padding: "clamp(56px,7vw,88px) 0", marginTop: 40 }}>
        <div style={SHELL}>
          <p style={eyebrow(CYAN)}>Next</p>
          <p style={{ margin: "16px 0 0", font: `600 clamp(22px,3vw,32px)/1.14 ${SANS}`, letterSpacing: "-.02em", color: WHITE, maxWidth: "40ch" }}>
            Tell me the numbers you want and I will make them the only ones on the site.
          </p>
          <p style={{ ...body("rgba(255,255,255,.8)", 16), marginTop: 18, maxWidth: "72ch" }}>
            Pick the effects, and say if you want different values from the defaults here: 24px rise, 420ms, 60ms stagger,
            fired when a block is 8% into the viewport. Then the seven existing components collapse into these, the dead
            Reveal in components/services goes, and the six pages with no motion get it.
          </p>
        </div>
      </section>
    </main>
  );
}
