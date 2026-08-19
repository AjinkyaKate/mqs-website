/* ──────────────────────────────────────────────────────────────
   Service detail page template — one component serves all five
   /services/* detail pages, driven by ServiceDetailData.

   Ported from the MACHIN design system template
   `templates/mqs-service-detail/ServiceDetail.dc.html`
   (+ ServiceDetailPage.jsx).

   Three structural variants, same tokens and components in each:
   · editorial  — generous rhythm, asymmetric columns, photography carries it,
                  capabilities as a hairline-ruled list
   · spec-led   — denser, capabilities and industries as bordered tables,
                  shorter hero, facility photograph dropped
   · proof-led  — proof band and deliverables promoted above capabilities,
                  deliverables on deep navy, extra mid-page request band

   Section order changes per variant, exactly as the template defines it.
   Deviations from the canvas template, same as the hub page: the template's
   preview header/footer are dropped (the site supplies both), the handoff
   annotations block is not shipped, and the `bp` prop becomes fluid clamps
   plus Tailwind breakpoints. The template's closing CTA is also not rendered,
   because ContactSection follows and already closes the page; the mid-page
   request band in the proof-led variant stays. Static; only Reveal is
   client-side.
   ────────────────────────────────────────────────────────────── */

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import type { Fact, ImageSlot, ServiceDetailData } from "./service-detail-data";

export type ServiceDetailVariant = "editorial" | "spec-led" | "proof-led";

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", HAIR_DARK = "rgba(255,255,255,.16)";
const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const NAVY = "#0B2A3A", NAVY_2 = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

const MAXW = 1330;
const GUT = "clamp(24px,4vw,55px)";
const PAD_Y = "clamp(64px,7vw,120px)";
const PAD_Y_SM = "clamp(56px,6vw,96px)";
const PAD_Y_XS = "clamp(56px,5.5vw,88px)";

/* ── style helpers ── */

const h2 = (color: string): CSSProperties => ({
  margin: 0, font: `600 clamp(26px,3.2vw,38px)/1.12 ${SANS}`, letterSpacing: "-.025em", color, textWrap: "pretty",
});
const lead = (color: string): CSSProperties => ({
  margin: 0, font: `400 clamp(16px,1.5vw,18px)/1.6 ${SANS}`, color, textWrap: "pretty",
});
const bodyText = (color: string): CSSProperties => ({
  margin: 0, font: `400 16px/1.6 ${SANS}`, color, textWrap: "pretty",
});
const smallText = (color: string): CSSProperties => ({
  margin: 0, font: `400 15px/1.6 ${SANS}`, color, textWrap: "pretty",
});
const numLabel = (color: string): CSSProperties => ({
  font: `600 13px/1 ${DISPLAY}`, letterSpacing: ".08em", color,
});

const btn = (bg: string, color: string, border?: string, h = 52): CSSProperties => ({
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
  height: h, padding: "0 26px", background: bg, color, border: border ?? "0",
  transition: `background 200ms ${EASE},color 200ms ${EASE}`,
});

const two = (n: number) => String(n + 1).padStart(2, "0");

/* ── primitives ── */

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
  id?: string; tone?: "page" | "white" | "inset" | "navy" | "navy2"; padY?: string; children: ReactNode;
}) {
  const bg = { page: PAGE, white: WHITE, inset: INSET, navy: NAVY, navy2: NAVY_2 }[tone];
  return (
    <section id={id} style={{ background: bg }}>
      <div className="mx-auto" style={{ maxWidth: MAXW, padding: `${padY} ${GUT}` }}>{children}</div>
    </section>
  );
}

function SectionHead({
  eyebrow, title, lead: leadCopy, onDark = false,
}: {
  eyebrow: string; title: string; lead?: string; onDark?: boolean;
}) {
  return (
    <div className="flex flex-col" style={{ gap: 18, marginBottom: "clamp(32px,4vw,48px)" }}>
      <div className="t-eyebrow" style={{ color: onDark ? CYAN_D : CYAN_L }}>{eyebrow}</div>
      <h2 style={{ ...h2(onDark ? "#fff" : INK), maxWidth: "26ch" }}>{title}</h2>
      {leadCopy && <p style={{ ...lead(onDark ? "rgba(255,255,255,.82)" : BODY), maxWidth: "62ch" }}>{leadCopy}</p>}
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href}
      className="group t-button inline-flex items-center no-underline transition-colors duration-200 hover:!text-[#0B2A3A] hover:!border-[#0B2A3A]"
      style={{ gap: 10, minHeight: 44, color: CYAN_L, borderBottom: `1px solid ${HAIR}`, width: "fit-content" }}>
      {children}
      <Arrow size={16} className="transition-transform duration-200 group-hover:translate-x-[3px]" />
    </a>
  );
}

/* Labelled key/value row. The label always stays visible, including on mobile
   where it stacks above the value: spec content is never flattened into chips. */
function KeyValue({ item, onDark = false }: { item: Fact; onDark?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[190px_1fr]"
      style={{ gap: "4px 24px", padding: "16px 0", borderTop: `1px solid ${onDark ? HAIR_DARK : HAIR}` }}>
      <dt className="t-eyebrow" style={{ color: onDark ? CYAN_D : CYAN_L, paddingTop: 2 }}>{item.label}</dt>
      <dd style={{ ...bodyText(onDark ? "rgba(255,255,255,.86)" : INK), margin: 0 }}>{item.value}</dd>
    </div>
  );
}

function KeyValueList({ title, items, onDark = false }: { title: string; items: Fact[]; onDark?: boolean }) {
  return (
    <div>
      <h3 style={{
        margin: "0 0 8px", font: `500 clamp(19px,2vw,22px)/1.3 ${SANS}`,
        letterSpacing: "-.01em", color: onDark ? "#fff" : INK,
      }}>{title}</h3>
      <dl style={{ margin: 0 }}>{items.map((i) => <KeyValue key={i.label} item={i} onDark={onDark} />)}</dl>
    </div>
  );
}

/* Image slot: the photograph if one exists, otherwise a labelled placeholder
   naming the frame the design asks for. An empty slot is preferred to a
   photograph that does not show MQS work. */
function Photo({
  slot, className, style, onDark = false,
}: {
  slot: ImageSlot; className?: string; style?: CSSProperties; onDark?: boolean;
}) {
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
    <div className={className} style={{
      background: onDark ? "rgba(255,255,255,.04)" : INSET,
      border: `1px solid ${onDark ? HAIR_DARK : HAIR}`,
      display: "grid", placeItems: "center", padding: "clamp(20px,3vw,32px)", ...style,
    }}>
      <div className="flex flex-col items-center text-center" style={{ gap: 12, maxWidth: 340 }}>
        <span aria-hidden="true" style={{ width: 10, height: 10, background: CYAN }} />
        <span className="t-caption" style={{ color: onDark ? CYAN_D : CYAN_L }}>Photography pending</span>
        <span style={{ font: `400 13px/1.55 ${SANS}`, color: onDark ? "rgba(255,255,255,.7)" : MUTED }}>{slot.need}</span>
      </div>
    </div>
  );
}

type Part = { data: ServiceDetailData; variant: ServiceDetailVariant };

/* ── 1. hero ── */

function Hero({ data, variant }: Part) {
  const dense = variant === "spec-led";
  return (
    <section style={{
      position: "relative", overflow: "hidden", background: NAVY,
      minHeight: dense ? "clamp(440px,44vw,500px)" : "clamp(500px,50vw,620px)",
      display: "flex", alignItems: "center",
    }}>
      {data.images.hero.src && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.images.hero.src} alt="" className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "grayscale(1)", opacity: 0.32 }} />
          <div className="absolute inset-0" style={{ background: "#12405C", mixBlendMode: "color" }} />
        </>
      )}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(90deg,rgba(11,42,58,.94) 0%,rgba(11,42,58,.86) 48%,rgba(11,42,58,.62) 100%)",
      }} />
      <div className="relative mx-auto w-full" style={{
        maxWidth: MAXW,
        padding: `${dense ? "clamp(112px,11vw,150px)" : "clamp(120px,12vw,170px)"} ${GUT} clamp(52px,5.5vw,80px)`,
      }}>
        <div className="flex flex-col" style={{ gap: "clamp(16px,1.8vw,22px)" }}>
          <nav aria-label="Breadcrumb" className="t-eyebrow flex flex-wrap items-center"
            style={{ gap: 8, marginBottom: 8, color: "rgba(255,255,255,.7)" }}>
            <Link href="/" className="transition-colors duration-200 hover:!text-white" style={{ color: "rgba(255,255,255,.7)" }}>Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="transition-colors duration-200 hover:!text-white" style={{ color: "rgba(255,255,255,.7)" }}>Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" style={{ color: "#fff" }}>{data.name}</span>
          </nav>
          <div className="t-eyebrow" style={{ color: CYAN_D }}>{data.name}</div>
          <h1 style={{
            margin: 0, color: "#fff", letterSpacing: "-.025em", maxWidth: "20ch", textWrap: "pretty",
            font: `600 ${dense ? "clamp(33px,4vw,56px)" : "clamp(33px,4.6vw,66px)"}/1.05 ${SANS}`,
          }}>
            {data.headline[0]}<br />{data.headline[1]}
          </h1>
          <p style={{ ...lead("rgba(255,255,255,.82)"), maxWidth: "58ch" }}>{data.lead}</p>
          <div className="flex flex-col items-stretch sm:flex-row sm:flex-wrap sm:items-center" style={{ gap: 14, marginTop: 10 }}>
            <a href="#contact" className="t-button hover:!bg-white hover:!text-[#0B2A3A]" style={btn(CYAN, "#08283A")}>
              Raise a Service Request
            </a>
            <a href="#contact" className="t-button hover:!bg-white/20"
              style={btn("rgba(255,255,255,.1)", "#fff", "1px solid rgba(255,255,255,.28)")}>
              Talk to Our Team<Arrow size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. what it is ── */

function WhatItIs({ data, variant }: Part) {
  if (variant === "spec-led") {
    return (
      <Section tone="white" padY={PAD_Y_XS}>
        <Reveal>
          <div className="grid lg:grid-cols-[1.15fr_1fr]" style={{ gap: "clamp(32px,5vw,64px)" }}>
            <div>
              <div className="t-eyebrow" style={{ color: CYAN_L, marginBottom: 18 }}>What it is</div>
              <p style={{ ...bodyText(BODY), fontSize: 17 }}>{data.intro}</p>
            </div>
            <dl style={{ margin: 0, borderTop: `2px solid ${NAVY}` }}>
              {data.facts.map((f) => <KeyValue key={f.label} item={f} />)}
            </dl>
          </div>
        </Reveal>
      </Section>
    );
  }
  return (
    <Section tone="white">
      <Reveal>
        <div className="grid items-start lg:grid-cols-[1fr_0.62fr]" style={{ gap: "clamp(36px,6vw,88px)" }}>
          <div>
            <div className="t-eyebrow" style={{ color: CYAN_L, marginBottom: 20 }}>What it is</div>
            <p style={{ ...lead(BODY), maxWidth: "58ch" }}>{data.intro}</p>
          </div>
          {/* SpecList equivalent: stacked label over value, no rules */}
          <dl className="flex flex-col" style={{ margin: 0, gap: 18, borderTop: `2px solid ${NAVY}`, paddingTop: 22 }}>
            {data.facts.map((f) => (
              <div key={f.label} className="flex flex-col" style={{ gap: 4 }}>
                <dt className="t-eyebrow" style={{ color: CYAN_L }}>{f.label}</dt>
                <dd style={{ ...bodyText(INK), margin: 0 }}>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 3. capabilities ── */

function Capabilities({ data, variant }: Part) {
  const head = (
    <SectionHead eyebrow="Capabilities" title="What This Service Covers."
      lead={variant === "editorial"
        ? "Six capability areas, each run by the engineers who own the process end to end."
        : undefined} />
  );

  if (variant === "spec-led") {
    return (
      <Section tone="page" padY={PAD_Y_XS}>
        <Reveal>
          {head}
          <div style={{ border: `1px solid ${HAIR}`, background: WHITE }}>
            {data.caps.map((c, i) => (
              <div key={c.title} className="grid md:grid-cols-[0.85fr_1.15fr]"
                style={{
                  gap: "6px 32px", padding: "clamp(18px,2vw,20px) clamp(20px,2.4vw,28px)",
                  borderTop: i === 0 ? 0 : `1px solid ${HAIR}`,
                }}>
                <div className="flex items-baseline" style={{ gap: 12 }}>
                  <span style={{ ...numLabel(CYAN_L), font: `600 12px/1.4 ${DISPLAY}` }}>{two(i)}</span>
                  <span style={{ font: `500 17px/1.35 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{c.title}</span>
                </div>
                <p style={smallText(MUTED)}>{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    );
  }

  if (variant === "proof-led") {
    return (
      <Section tone="page" padY={PAD_Y_SM}>
        <Reveal>
          {head}
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(24px,2.5vw,32px)" }}>
            {data.caps.map((c, i) => (
              <div key={c.title} style={{
                background: WHITE, border: `1px solid ${HAIR}`, borderTop: `3px solid ${CYAN}`,
                padding: "clamp(22px,2.4vw,26px)",
              }}>
                <div style={{ ...numLabel(CYAN_L), font: `600 12px/1 ${DISPLAY}`, marginBottom: 14 }}>{two(i)}</div>
                <h3 style={{ margin: "0 0 10px", font: `500 19px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{c.title}</h3>
                <p style={smallText(MUTED)}>{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    );
  }

  /* editorial: hairline-ruled list, two columns of prose on desktop */
  return (
    <Section tone="page">
      <Reveal>
        {head}
        <div className="grid lg:grid-cols-2" style={{ columnGap: "clamp(32px,5vw,64px)" }}>
          {data.caps.map((c, i) => (
            <div key={c.title} className="grid grid-cols-[44px_1fr]"
              style={{ gap: 12, padding: "26px 0", borderTop: `1px solid ${HAIR}` }}>
              <span style={{ ...numLabel(CYAN_L), font: `600 13px/1.6 ${DISPLAY}` }}>{two(i)}</span>
              <div>
                <h3 style={{
                  margin: "0 0 10px", font: `500 clamp(19px,2vw,22px)/1.28 ${SANS}`,
                  letterSpacing: "-.015em", color: INK,
                }}>{c.title}</h3>
                <p style={{ ...bodyText(BODY), maxWidth: "44ch" }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 4. systems and setup ── */

function SystemsSetup({ data, variant }: Part) {
  const showPhoto = variant !== "spec-led";
  return (
    <Section tone="white" padY={variant === "spec-led" ? PAD_Y_XS : PAD_Y}>
      <Reveal>
        <SectionHead eyebrow="Systems and setup" title="What We Run, and What You Get With It." />
        <div className="grid md:grid-cols-2" style={{ gap: "clamp(36px,5vw,64px)" }}>
          <KeyValueList title="What we run in house" items={data.inHouse} />
          <KeyValueList title="What the service includes" items={data.includes} />
        </div>
        {showPhoto && (
          <div style={{ marginTop: "clamp(36px,4.5vw,56px)" }}>
            <Photo slot={data.images.facility} className="aspect-[4/3] w-full md:aspect-[21/9]" />
          </div>
        )}
      </Reveal>
    </Section>
  );
}

/* ── 5. deliverables ── */

function Deliverables({ data, variant }: Part) {
  const dark = variant === "proof-led";
  return (
    <Section tone={dark ? "navy2" : "inset"} padY={PAD_Y_SM}>
      <Reveal>
        <SectionHead onDark={dark} eyebrow="Deliverables" title="What You Receive."
          lead="Every engagement closes with the same package, referenced to your drawing or acceptance criteria." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4" style={{ gap: "clamp(24px,2.5vw,32px)" }}>
          {data.deliverables.map((d, i) => (
            <div key={d.title} style={{
              position: "relative", borderTop: `1px solid ${dark ? HAIR_DARK : HAIR}`, paddingTop: 20,
            }}>
              <span aria-hidden="true" style={{ position: "absolute", top: -1, left: 0, width: 32, height: 3, background: CYAN }} />
              <div style={{ ...numLabel(dark ? CYAN : CYAN_L), marginBottom: 14 }}>{two(i)}</div>
              <h3 style={{
                margin: "0 0 10px", font: `500 clamp(19px,1.9vw,21px)/1.3 ${SANS}`,
                letterSpacing: "-.01em", color: dark ? "#fff" : INK,
              }}>{d.title}</h3>
              <p style={smallText(dark ? "rgba(255,255,255,.74)" : MUTED)}>{d.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 6. proof band ── */

function ProofBand({ data, variant }: Part) {
  const heavy = variant === "proof-led";
  const fig = heavy ? "clamp(50px,7.5vw,104px)" : "clamp(50px,5.5vw,76px)";
  return (
    <Section tone="navy" padY={heavy ? "clamp(64px,7.5vw,104px)" : PAD_Y_XS}>
      <Reveal>
        <SectionHead onDark eyebrow="Proof" title={heavy ? "Results First." : "Sample Results."} lead={data.proofNote} />
        <div className={`grid items-center ${heavy ? "lg:grid-cols-2" : "lg:grid-cols-[1.1fr_1fr]"}`}
          style={{ gap: "clamp(36px,5vw,64px)" }}>
          <div className="grid grid-cols-1">
            {data.proofStats.map((s, i) => (
              <div key={s.label} className="grid grid-cols-1 items-baseline md:grid-cols-[auto_1fr]"
                style={{
                  gap: "8px 28px", padding: "clamp(20px,2.2vw,24px) 0",
                  borderTop: i === 0 ? 0 : `1px solid ${HAIR_DARK}`,
                }}>
                <div className="flex items-baseline" style={{ gap: 8 }}>
                  <span style={{ font: `600 ${fig}/0.92 ${DISPLAY}`, letterSpacing: "-.045em", color: "#fff" }}>{s.figure}</span>
                  <span className="t-eyebrow" style={{
                    font: `500 clamp(16px,1.6vw,20px)/1 ${DISPLAY}`, letterSpacing: ".02em", color: CYAN,
                  }}>{s.unit}</span>
                </div>
                <p style={{ ...bodyText("rgba(255,255,255,.8)"), maxWidth: "34ch" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <Photo slot={data.images.proof} onDark className="aspect-[4/3] w-full" />
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 7. where it adds value ── */

function ValueGrid({ data, variant }: Part) {
  const table = variant === "spec-led";
  return (
    <Section tone="page" padY={PAD_Y_SM}>
      <Reveal>
        <SectionHead eyebrow="Where it adds value" title="Industries and Applications."
          lead="The sectors this service runs for, and the parts it is asked to answer for." />
        {table ? (
          <div style={{ border: `1px solid ${HAIR}`, background: WHITE }}>
            {data.value.map((v, i) => (
              <div key={v.industry} className="grid grid-cols-1 md:grid-cols-[240px_1fr]"
                style={{ gap: "6px 32px", padding: "18px clamp(20px,2.4vw,28px)", borderTop: i === 0 ? 0 : `1px solid ${HAIR}` }}>
                <span style={{ font: `500 17px/1.4 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{v.industry}</span>
                <p style={smallText(MUTED)}>{v.apps}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(24px,2.5vw,32px)" }}>
            {data.value.map((v) => (
              <div key={v.industry} style={{ borderTop: `1px solid ${HAIR}`, paddingTop: 18 }}>
                <h3 style={{ margin: "0 0 8px", font: `500 18px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{v.industry}</h3>
                <p style={smallText(MUTED)}>{v.apps}</p>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </Section>
  );
}

/* ── mid-page request band, proof-led only ── */

function MidRequest({ data }: { data: ServiceDetailData }) {
  return (
    <Section tone="white" padY="clamp(48px,5vw,64px)">
      <div className="grid items-center lg:grid-cols-[1fr_auto]"
        style={{
          gap: "clamp(24px,3.5vw,48px)", border: `1px solid ${HAIR}`, borderLeft: `3px solid ${CYAN}`,
          padding: "clamp(24px,3vw,32px) clamp(24px,3.2vw,36px)",
        }}>
        <div>
          <h3 style={{
            margin: "0 0 8px", font: `500 clamp(20px,2.2vw,24px)/1.25 ${SANS}`,
            letterSpacing: "-.015em", color: INK,
          }}>{data.midRequest.title}</h3>
          <p style={{ ...bodyText(BODY), maxWidth: "56ch" }}>{data.midRequest.body}</p>
        </div>
        <div className="flex flex-col items-stretch sm:flex-row" style={{ gap: 12 }}>
          <a href="#contact" className="t-button hover:!bg-[#0B2A3A] hover:!text-white" style={btn(CYAN, "#08283A", undefined, 48)}>
            Raise a Service Request
          </a>
          <a href="#contact" className="t-button hover:!bg-[#0B2A3A] hover:!text-white"
            style={btn("transparent", INK, `1px solid ${HAIR}`, 48)}>
            Talk to Our Team
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ── 9. resource strip ── */

function ResourceStrip({ data }: { data: ServiceDetailData }) {
  return (
    <Section tone="white" padY="clamp(40px,4vw,56px)">
      <div className="grid items-center lg:grid-cols-[auto_1fr_auto]"
        style={{
          gap: "clamp(16px,2.5vw,32px)", borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`,
          padding: "clamp(20px,2.2vw,24px) 0",
        }}>
        <span className="t-eyebrow" style={{ color: CYAN_L }}>Resource</span>
        <div>
          <div style={{ font: `500 18px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>{data.resource.title}</div>
          <p style={{ ...smallText(MUTED), marginTop: 4 }}>{data.resource.meta}</p>
        </div>
        <TextLink href={data.resource.href}>{data.resource.cta}</TextLink>
      </div>
    </Section>
  );
}

/* ── page ── */

export default function ServiceDetail({
  data,
  variant = "editorial",
  showProof = true,
  showResource = true,
}: {
  data: ServiceDetailData;
  variant?: ServiceDetailVariant;
  showProof?: boolean;
  showResource?: boolean;
}) {
  const p = { data, variant };
  const sections: ReactNode[] = [<Hero key="hero" {...p} />];

  if (variant === "proof-led") {
    if (showProof) sections.push(<ProofBand key="proof" {...p} />);
    sections.push(<WhatItIs key="what" {...p} />);
    sections.push(<Deliverables key="deliv" {...p} />);
    sections.push(<MidRequest key="mid" data={data} />);
    sections.push(<Capabilities key="caps" {...p} />);
    sections.push(<SystemsSetup key="sys" {...p} />);
    sections.push(<ValueGrid key="value" {...p} />);
  } else if (variant === "spec-led") {
    sections.push(<WhatItIs key="what" {...p} />);
    sections.push(<SystemsSetup key="sys" {...p} />);
    sections.push(<Capabilities key="caps" {...p} />);
    sections.push(<Deliverables key="deliv" {...p} />);
    sections.push(<ValueGrid key="value" {...p} />);
    if (showProof) sections.push(<ProofBand key="proof" {...p} />);
  } else {
    sections.push(<WhatItIs key="what" {...p} />);
    sections.push(<Capabilities key="caps" {...p} />);
    sections.push(<SystemsSetup key="sys" {...p} />);
    sections.push(<Deliverables key="deliv" {...p} />);
    if (showProof) sections.push(<ProofBand key="proof" {...p} />);
    sections.push(<ValueGrid key="value" {...p} />);
  }

  if (showResource) sections.push(<ResourceStrip key="res" data={data} />);

  return <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>{sections}</main>;
}
