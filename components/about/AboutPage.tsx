/* ──────────────────────────────────────────────────────────────
   About page — /about-us/
   Ported from the MACHIN design system template
   `templates/mqs-about/About.dc.html` (+ AboutPage.jsx).

   The page argues that the people and one checkable fact are the case: it opens
   on MQS engineers at an MQS system, states the through-line (a doctorate in
   tomography, a tomography systems manufacturer) as a diptych on deep navy,
   then lets the record back it up. Dark and light grounds alternate so no two
   navy sections sit adjacent.

   Same deviations from the canvas template as the other ports: the template's
   preview header and footer are dropped (the site supplies both), the handoff
   annotations block is not shipped, and the `bp` prop becomes fluid clamps plus
   Tailwind breakpoints. The closing CTA uses id="contact-cta" rather than the
   template's "contact", because the site's ContactSection already owns
   id="contact" and both appear on this page.

   The breadcrumb (Home / About Us) is removed at the client's request, even
   though their content brief specifies it under "PAGE SETUP".

   The template's closing CTA ("Want to Learn More About MQS?", Talk to an Expert
   / View Our Products) is deliberately not rendered: ContactSection follows this
   page and already carries the closing call to action, so the template's band
   read as a second CTA stacked on the first. Its copy is still in about-data.ts
   as CTA if it is ever wanted back.

   Static server component. Reveal and the milestone track are the only
   client-side pieces.
   ────────────────────────────────────────────────────────────── */

import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/services/Reveal";
import MilestoneTrack from "./MilestoneTrack";
import {
  AWARD, CLIENTS, FOUNDER, HERO, IMAGES, MILESTONES, PILLARS, PORTFOLIO, PURPOSE, STORY,
  type ImageSlot, type Pillar, type Role,
} from "./about-data";

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
const btn = (bg: string, color: string, border?: string): CSSProperties => ({
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
  height: 52, padding: "0 26px", background: bg, color, border: border ?? "0",
  transition: `background 200ms ${EASE},color 200ms ${EASE}`,
});

function Arrow({ size = 20, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="square" aria-hidden="true"
      className={className} style={{ display: "block", ...style }}>
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
}: { eyebrow: string; title: string; lead?: string; onDark?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: 18, marginBottom: "clamp(32px,4vw,48px)" }}>
      <div className="t-eyebrow" style={{ color: onDark ? CYAN_D : CYAN_L }}>{eyebrow}</div>
      <h2 style={{ ...h2(onDark ? "#fff" : INK), maxWidth: "26ch" }}>{title}</h2>
      {leadCopy && <p style={{ ...lead(onDark ? "rgba(255,255,255,.82)" : BODY), maxWidth: "62ch" }}>{leadCopy}</p>}
    </div>
  );
}

/* Photograph, or a labelled placeholder naming the frame the design asks for. */
function Photo({
  slot, className, style, onDark = false,
}: { slot: ImageSlot; className?: string; style?: CSSProperties; onDark?: boolean }) {
  if (slot.src) {
    return (
      <div className={className} style={{ background: INSET, overflow: "hidden", ...style }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={slot.src} alt={slot.alt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={className} style={{
      background: onDark ? "rgba(255,255,255,.05)" : INSET,
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

/* ── 1. photographic hero ── */

function Hero() {
  return (
    <section style={{
      position: "relative", overflow: "hidden", background: NAVY,
      minHeight: "clamp(540px,54vw,660px)", display: "flex",
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMAGES.hero.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0" style={{
        background: "linear-gradient(90deg,rgba(11,42,58,.95) 0%,rgba(11,42,58,.84) 46%,rgba(11,42,58,.44) 100%)",
      }} />
      <div className="relative mx-auto flex w-full flex-col justify-end"
        style={{ maxWidth: MAXW, padding: `clamp(96px,11vw,132px) ${GUT} clamp(40px,5vw,56px)` }}>
        <div>
          <div className="t-eyebrow" style={{ color: CYAN }}>{HERO.eyebrow}</div>
          <h1 style={{
            margin: "22px 0 0", color: "#fff", letterSpacing: "-.03em",
            font: `600 clamp(34px,5.2vw,74px)/1.02 ${SANS}`,
          }}>{HERO.heading}</h1>
          <p style={{ ...lead("rgba(255,255,255,.82)"), maxWidth: "54ch", marginTop: 22 }}>{HERO.lead}</p>
          <div className="flex flex-col items-stretch sm:flex-row sm:items-center" style={{ gap: 14, marginTop: 34 }}>
            <a href="#contact" className="t-button hover:!bg-white hover:!text-[#0B2A3A]" style={btn(CYAN, "#08283A")}>
              Talk to an Expert
            </a>
            <a href="/products" className="t-button hover:!bg-white/20"
              style={btn("rgba(255,255,255,.1)", "#fff", "1px solid rgba(255,255,255,.28)")}>
              View Our Products<Arrow size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. the through-line statement: the one aesthetic risk on the page ── */

function ThroughLine() {
  const cell = (title: string, sub: string, accent: boolean) => (
    <div className="flex flex-col" style={{ gap: 16 }}>
      <span style={{
        font: `600 clamp(26px,3.6vw,46px)/1.1 ${SANS}`, letterSpacing: "-.025em",
        color: accent ? CYAN : "#fff", textWrap: "balance",
      }}>{title}</span>
      <p style={{ ...bodyText("rgba(255,255,255,.8)"), maxWidth: "40ch" }}>{sub}</p>
    </div>
  );
  return (
    <Section id="founder" tone="navy2" padY="clamp(64px,7.5vw,104px)">
      <Reveal>
        <div className="t-eyebrow" style={{ color: CYAN, marginBottom: 34 }}>The through-line</div>
        <div className="grid items-start lg:grid-cols-[1fr_64px_1fr]" style={{ gap: "clamp(28px,3vw,34px)" }}>
          {cell(FOUNDER.claim, FOUNDER.claimSub, false)}
          <div aria-hidden="true" className="hidden justify-center lg:flex" style={{ paddingTop: 12 }}>
            <Arrow size={30} style={{ color: CYAN }} />
          </div>
          {cell(FOUNDER.result, FOUNDER.resultSub, true)}
        </div>
        <div className="grid items-start md:grid-cols-[200px_1fr]"
          style={{
            gap: "clamp(24px,3vw,40px)", marginTop: "clamp(40px,5vw,64px)",
            borderTop: `1px solid ${HAIR_DARK}`, paddingTop: 34,
          }}>
          <Photo slot={IMAGES.founder} onDark className="w-full" style={{ maxWidth: 200, aspectRatio: "413 / 531" }} />
          <dl className="m-0 flex flex-col" style={{ gap: 22, maxWidth: "44ch" }}>
            {FOUNDER.roles.map((r: Role) => (
              <div key={r.label}>
                <dt className="t-eyebrow" style={{ color: CYAN, marginBottom: 6 }}>{r.label}</dt>
                <dd style={{ ...bodyText("#fff"), margin: 0 }}>{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 3. story ── */

function Story() {
  return (
    <Section id="story" tone="white">
      <Reveal>
        <div className="grid items-start lg:grid-cols-[0.78fr_1fr]" style={{ gap: "clamp(32px,6vw,88px)" }}>
          <div>
            <div className="t-eyebrow" style={{ color: CYAN_L, marginBottom: 20 }}>Our story</div>
            <h2 style={{ ...h2(INK), maxWidth: "18ch" }}>{STORY.heading}</h2>
          </div>
          <div className="flex flex-col" style={{ gap: 22, maxWidth: "62ch" }}>
            <p style={{ ...bodyText(BODY), fontSize: 17 }}>{STORY.paras[0]}</p>
            <p style={{ ...bodyText(BODY), fontSize: 17 }}>{STORY.paras[1]}</p>
            <p style={{ ...bodyText(BODY), fontSize: 17 }}>{STORY.paras[2]}</p>
            <p style={{ ...bodyText(BODY), fontSize: 17 }}>{STORY.today}</p>
            <p style={{ ...bodyText(BODY), fontSize: 17 }}>{STORY.paras[3]}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 5. award ── */

function AwardBand() {
  return (
    <Section tone="white" padY={PAD_Y_SM}>
      <Reveal>
        <div className="grid items-center md:grid-cols-[0.86fr_1fr]" style={{ gap: "clamp(28px,4vw,56px)" }}>
          <Photo slot={IMAGES.award} className="aspect-[1280/853] w-full" />
          <div>
            <div className="t-eyebrow" style={{ color: CYAN_L, marginBottom: 18 }}>{AWARD.eyebrow}</div>
            <h2 style={{
              margin: 0, font: `600 clamp(25px,3.2vw,40px)/1.15 ${SANS}`,
              letterSpacing: "-.025em", color: INK, maxWidth: "20ch",
            }}>{AWARD.title}</h2>
            <p style={{ ...lead(BODY), marginTop: 18, maxWidth: "44ch" }}>{AWARD.body}</p>
            <p className="t-eyebrow" style={{ margin: "22px 0 0", color: MUTED }}>{AWARD.date}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 6. pillars, claim and proof on navy ── */

function PillarClaim({ p, i }: { p: Pillar; i: number }) {
  return (
    <Reveal delay={Math.min(i, 3) * 40}>
      <div className="grid lg:grid-cols-2"
        style={{ gap: "clamp(14px,3vw,40px)", padding: "clamp(26px,3vw,34px) 0", borderTop: `1px solid ${HAIR_DARK}` }}>
        <div className="flex" style={{ gap: "clamp(14px,1.8vw,22px)" }}>
          <span className="flex-none" style={{ font: `800 clamp(15px,1.6vw,18px)/1.5 ${DISPLAY}`, color: CYAN }}>{p.n}</span>
          <div>
            <h3 style={{ margin: 0, font: `500 clamp(21px,2.4vw,26px)/1.2 ${SANS}`, letterSpacing: "-.02em", color: "#fff" }}>{p.title}</h3>
            <p style={{ ...bodyText("rgba(255,255,255,.8)"), marginTop: 12, maxWidth: "46ch" }}>{p.body}</p>
          </div>
        </div>
        <p style={{
          margin: 0, font: `500 clamp(17px,1.8vw,20px)/1.5 ${SANS}`,
          color: CYAN, maxWidth: "40ch", textWrap: "pretty",
        }}>{p.proof}</p>
      </div>
    </Reveal>
  );
}

function Pillars() {
  return (
    <section id="pillars" style={{ background: NAVY }}>
      <div className="mx-auto" style={{ maxWidth: MAXW, padding: `${PAD_Y} ${GUT}` }}>
        <SectionHead onDark eyebrow="Our promise" title={PILLARS.heading} lead={PILLARS.lead} />
        <div style={{ borderBottom: `1px solid ${HAIR_DARK}` }}>
          {PILLARS.items.map((p, i) => <PillarClaim key={p.n} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ── 7. portfolio: type first, images as a secondary layer ── */

/* Six supplied files at six different sizes. Each keeps its own ratio and the row
   is bottom-aligned, so nothing is upscaled or force-cropped to a common cell.
   Wraps on desktop; below that it is a swipeable strip rather than six tall stacks. */
function PortfolioImages() {
  return (
    <div className="flex flex-nowrap items-end overflow-x-auto lg:flex-wrap lg:overflow-x-visible"
      style={{ gap: "clamp(12px,1.6vw,20px)", paddingBottom: 6 }}>
      {PORTFOLIO.items.map((it) => (
        <div key={it.src} className="relative flex-none"
          style={{
            aspectRatio: it.ratio,
            height: it.tall ? "clamp(190px,24vw,290px)" : "clamp(132px,16vw,186px)",
            background: INSET, border: `1px solid ${HAIR}`, overflow: "hidden",
          }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={it.src} alt={it.name} loading="lazy" decoding="async"
            className="absolute inset-0 h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function Portfolio() {
  const list = (
    <div style={{ borderBottom: `1px solid ${HAIR}` }}>
      {PORTFOLIO.items.map((it, i) => (
        <div key={it.src}
          className="group grid grid-cols-[40px_1fr] items-baseline transition-colors duration-200 hover:!border-[#16C1F3] md:grid-cols-[72px_1fr]"
          style={{ gap: "clamp(12px,2vw,28px)", padding: "clamp(20px,2.4vw,26px) 0", borderTop: `1px solid ${HAIR}` }}>
          <span style={{ font: `800 clamp(17px,1.8vw,20px)/1 ${DISPLAY}`, color: CYAN_L }}>{"0" + (i + 1)}</span>
          <div className="grid items-baseline" style={{ gap: 8 }}>
            <h3 className="transition-colors duration-200 group-hover:!text-[#0A6A88]"
              style={{
                margin: 0, font: `500 clamp(20px,2.4vw,27px)/1.2 ${SANS}`,
                letterSpacing: "-.02em", color: INK, textWrap: "pretty",
              }}>{it.name}</h3>
            <p style={{ ...bodyText(BODY), maxWidth: "52ch" }}>{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <Section id="portfolio" tone="white">
      <SectionHead eyebrow="What we build" title={PORTFOLIO.heading} lead={PORTFOLIO.lead} />
      {/* min-w-0 on the image cell: without it the nowrap strip sizes its grid
          track to content and pushes the page sideways on narrow screens. */}
      <div className="grid items-start lg:grid-cols-[1fr_0.62fr]" style={{ gap: "clamp(28px,5vw,64px)" }}>
        <Reveal className="min-w-0">{list}</Reveal>
        <Reveal delay={80} className="min-w-0"><PortfolioImages /></Reveal>
      </div>
    </Section>
  );
}

/* ── 8. purpose and values ── */

function Purpose() {
  return (
    <Section id="purpose" tone="inset">
      <SectionHead eyebrow="Purpose and values" title={PURPOSE.heading} />
      <div className="grid lg:grid-cols-3" style={{ gap: "clamp(0px,4vw,48px)" }}>
        {PURPOSE.items.map((it, i) => (
          <Reveal key={it.label} delay={i * 60}>
            <div style={{ borderTop: `2px solid ${NAVY}`, paddingTop: 20, paddingBottom: 26 }}>
              <h3 className="t-eyebrow" style={{ margin: "0 0 14px", color: CYAN_L }}>{it.label}</h3>
              <p style={{ ...bodyText(BODY), fontSize: 17 }}>{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ marginTop: "clamp(40px,5vw,64px)" }}>
        <Photo slot={IMAGES.facility} className="aspect-[4/3] w-full md:aspect-[21/9]" />
      </Reveal>
    </Section>
  );
}

/* ── 9. clients, type only ── */

function Clients() {
  return (
    <Section id="clients" tone="white">
      <SectionHead eyebrow="Strategic collaborations" title={CLIENTS.heading} lead={CLIENTS.lead} />
      <Reveal>
        <ul className="m-0 grid list-none grid-cols-2 p-0 md:grid-cols-3 lg:grid-cols-5"
          style={{ borderTop: `1px solid ${HAIR}`, borderLeft: `1px solid ${HAIR}` }}>
          {CLIENTS.names.map((n) => (
            <li key={n} className="flex items-center"
              style={{
                borderRight: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}`,
                minHeight: "clamp(88px,10vw,112px)", padding: "clamp(16px,2vw,22px)",
              }}>
              <span style={{ font: `500 clamp(17px,1.8vw,20px)/1.2 ${DISPLAY}`, letterSpacing: "-.01em", color: INK }}>{n}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <p style={{ ...bodyText(MUTED), marginTop: 22, fontSize: 15, maxWidth: "70ch" }}>{CLIENTS.note}</p>
    </Section>
  );
}

/* ── page ── */

export default function AboutPage() {
  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      <Hero />
      <ThroughLine />
      <Story />
      <MilestoneTrack milestones={MILESTONES} />
      <AwardBand />
      <Pillars />
      <Portfolio />
      <Purpose />
      <Clients />
    </main>
  );
}
