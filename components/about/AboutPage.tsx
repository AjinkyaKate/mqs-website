/* ──────────────────────────────────────────────────────────────
   About page — /about-us/
   Ported from the design project "MQS About — Concept 04 Responsive"
   (77311f34-c26a-40a2-af51-b798797a5102), which imports
   `MQS About Page.dc.html` at three authored breakpoints.

   Built exactly to the design. Section order:
     Hero (+ stats)  →  Origin  →  SIDM award  →  Portfolio
     →  Team statement  →  Timeline  →  Pillars  →  Purpose  →  Clients

   The design authors two compositions, not one design scaled: the wide
   composition (1440 / 1280) and a stacked composition re-ordered for tablet
   (768) and mobile (390). Both are reproduced from a single DOM using
   Tailwind breakpoints (base = mobile, md: = tablet, lg: = desktop), except
   in the two places where the authored compositions are structurally
   different rather than merely reflowed:

     · Portfolio — desktop is a six-cell bento with bespoke per-cell markup;
       tablet and mobile are uniform image-over-text cards. Both are rendered
       from the same PORTFOLIO.items array and toggled with hidden/lg:grid,
       so the copy is defined once in source.
     · Clients — desktop and tablet run an animated marquee of names set in
       type; mobile is a static bordered grid.

   Three further authored differences, all deliberate:
     · The hero's supporting sentence sits inside the photograph on desktop
       and tablet, and moves out onto the navy block on mobile.
     · The timeline is on navy on desktop and tablet and on the light ground
       on mobile, so long year ranges stay legible.
     · The team statement is shortened on mobile, where the photograph sits
       above the text and "the people in this photograph" no longer reads.

   No breadcrumb and no closing CTA, matching the design and the client's
   earlier instruction to remove both. The hero's "About MQS Technologies"
   eyebrow is also removed at the client's request.

   Server component with three client islands: AboutMotion (reveal on scroll,
   from the interactive prototype), AboutStats (the hero count-up, matching the
   home page's StatsStrip) and the CSS marquee on the client wall. The sticky
   section sub-nav and its scroll-progress bar were built from the interactive
   prototype and then removed at the client's request.
   ────────────────────────────────────────────────────────────── */

import Image from "next/image";
import AboutMotion from "./AboutMotion";
import AboutStats from "./AboutStats";
import {
  AWARD, CLIENT_LOGOS, CLIENTS, HERO, IMAGES, LEADERSHIP, ORIGIN, PILLARS,
  PORTFOLIO, PURPOSE, TEAM, TIMELINE,
} from "./about-data";

const INK = "#0B2A3A", BODY = "#41586A";
const HAIR = "#D3DFE7", HAIR_2 = "#C3D2DB";
const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const NAVY = "#0B2A3A", NAVY_2 = "#0E3A52";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88";
const GHOST = "#E9F0F4";

const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

/* 55px inset on a 1440 viewport is a 1330px content column. */
const MAXW = 1330;
const GUT = "px-5 md:px-10 lg:px-[55px]";
/* Anchor offset for the section ids below. The sticky sub-nav from the
   interactive prototype was removed at the client's request; the ids stay so
   deep links still work, and this clears the fixed global header (60/72/76). */
const SCROLL_MT = "scroll-mt-[80px] md:scroll-mt-[92px] lg:scroll-mt-[96px]";
const INNER = `mx-auto w-full ${GUT}`;

const GRAD_HERO_D = "linear-gradient(100deg,rgba(11,42,58,.9) 0%,rgba(11,42,58,.62) 45%,rgba(11,42,58,.18) 100%)";
const GRAD_HERO_T = "linear-gradient(15deg,rgba(11,42,58,.94) 0%,rgba(11,42,58,.62) 60%,rgba(11,42,58,.3) 100%)";
const GRAD_HERO_M = "linear-gradient(to top,rgba(11,42,58,.96) 0%,rgba(11,42,58,.5) 70%,rgba(11,42,58,.28) 100%)";
const GRAD_AWARD_D = "linear-gradient(to top,rgba(11,42,58,.92) 0%,rgba(11,42,58,.1) 62%)";
const GRAD_AWARD_T = "linear-gradient(to top,rgba(11,42,58,.94) 0%,rgba(11,42,58,.1) 68%)";
const GRAD_CARD = "linear-gradient(to top,rgba(11,42,58,.92),rgba(11,42,58,0) 60%)";
/* Team band. The award band weights its gradient to the bottom because its text
   sits there; this band's text is vertically centred, so the weight is centred
   too: heavy through the middle where the copy sits, easing off at both edges so
   the photograph is still read rather than flattened. */
const GRAD_TEAM_D = "linear-gradient(to bottom,rgba(11,42,58,.20) 0%,rgba(11,42,58,.86) 30%,rgba(11,42,58,.86) 70%,rgba(11,42,58,.20) 100%)";
const GRAD_TEAM_T = "linear-gradient(to bottom,rgba(11,42,58,.24) 0%,rgba(11,42,58,.90) 30%,rgba(11,42,58,.90) 72%,rgba(11,42,58,.24) 100%)";

const EYEBROW = "font-medium uppercase tracking-[.09em] leading-none";
const LABEL = "font-medium uppercase tracking-[.045em] leading-[1.3]";
const NUM = "font-extrabold leading-none";

/* ══════════════ 1 — hero + stats ══════════════ */

function Hero() {
  return (
    <section className="relative" style={{ background: NAVY }}>
      <div className="relative h-[400px] md:h-[520px] lg:h-[820px]">
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[52%_46%] md:object-[44%_46%]"
        />
        <div className="absolute inset-0 md:hidden" style={{ background: GRAD_HERO_M }} />
        <div className="absolute inset-0 hidden md:block lg:hidden" style={{ background: GRAD_HERO_T }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: GRAD_HERO_D }} />

        {/* Desktop: the design anchored this block at top:104px; at the client's
            request it now sits on the image's vertical centre, still left
            aligned on the 55px inset. Tablet and mobile stay bottom-anchored
            as authored. */}
        <div className="absolute inset-x-5 bottom-[26px] md:inset-x-10 md:bottom-10 lg:inset-x-auto lg:left-[55px] lg:top-1/2 lg:bottom-auto lg:max-w-[760px] lg:-translate-y-1/2">
          {/* The design's "About MQS Technologies" eyebrow is removed at the
              client's request. HERO.eyebrow is kept in about-data.ts so the
              design's copy stays traceable. */}
          <h1
            className="m-0 mb-0 md:mb-5 lg:mb-7 text-[46px] leading-[.98] md:text-[68px] md:leading-[.96] lg:text-[108px] lg:leading-[.94] font-semibold tracking-[-.032em] lg:tracking-[-.035em] text-white"
            style={{ fontFamily: SANS }}
          >
            {HERO.title}
          </h1>
          <p
            className="m-0 hidden md:block md:max-w-[520px] lg:max-w-[600px] text-[17px] leading-[1.6] lg:text-[19px] lg:leading-[1.62] text-white/84 text-pretty"
            style={{ fontFamily: SANS }}
          >
            {HERO.lead}
          </p>
        </div>
      </div>

      {/* Desktop: inside the photograph, flush to its bottom edge.
          Tablet and mobile: its own strip below, on navy. */}
      {/* Desktop: the strip is absolutely inset 55px, so it must carry no
          gutter padding of its own or the inset doubles. */}
      <div className="px-5 pt-[26px] md:px-10 md:pt-0 lg:px-0 lg:pt-0 lg:absolute lg:inset-x-[55px] lg:bottom-0">
        <div className="bg-[#0B2A3A] md:bg-[#0E3A52] lg:bg-transparent -mx-5 px-5 md:-mx-10 md:px-10 lg:mx-0 lg:px-0">
          <p
            className="m-0 mb-[26px] md:hidden text-[17px] leading-[1.6] text-white/84 text-pretty"
            style={{ fontFamily: SANS }}
          >
            {HERO.lead}
          </p>
          <AboutStats />
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 2 — origin ══════════════ */

function Origin() {
  return (
    <section id="story" className={SCROLL_MT} style={{ background: NAVY }}>
      <div className={`${INNER} py-14 pb-16 md:py-[72px] lg:py-[120px]`} style={{ maxWidth: MAXW }}>
        <div className="lg:grid lg:grid-cols-[520px_1fr] lg:gap-[88px] lg:items-start">
          <div>
            <div
              className={`${NUM} text-[92px] leading-[.86] md:text-[128px] md:leading-[.82] lg:text-[216px] lg:leading-[.8] tracking-[-.05em]`}
              style={{ fontFamily: DISPLAY, color: "transparent", WebkitTextStroke: `2px ${CYAN}` }}
            >
              {ORIGIN.year}
            </div>
            <p
              className="m-0 mt-[26px] hidden lg:block border-t border-white/20 pt-6 text-[16px] leading-[1.6] text-white/70"
              style={{ fontFamily: SANS }}
            >
              {ORIGIN.caption}
            </p>
          </div>

          <div>
            <h2
              className="m-0 mt-[26px] md:mt-9 lg:mt-0 mb-[18px] md:mb-[22px] lg:mb-[30px] text-[30px] leading-[1.1] md:text-[40px] md:leading-[1.06] lg:text-[60px] lg:leading-[1.04] font-semibold tracking-[-.026em] md:tracking-[-.028em] lg:tracking-[-.03em] text-white text-pretty"
              style={{ fontFamily: SANS }}
            >
              {ORIGIN.heading}
            </h2>

            {/* Mobile runs the designer's two shortened paragraphs. */}
            <div className="md:hidden">
              <p className="m-0 mb-4 text-[16px] leading-[1.62] text-white/78 text-pretty" style={{ fontFamily: SANS }}>
                {ORIGIN.paraMobileFirst}
              </p>
              <p className="m-0 mb-[34px] text-[16px] leading-[1.62] text-white/78 text-pretty" style={{ fontFamily: SANS }}>
                {ORIGIN.paraMobile}
              </p>
            </div>
            <div className="hidden md:block">
              <p className="m-0 mb-[18px] lg:mb-[22px] lg:max-w-[700px] text-[17px] leading-[1.62] lg:text-[18px] lg:leading-[1.64] text-white/78 text-pretty" style={{ fontFamily: SANS }}>
                {ORIGIN.paras[0]}
              </p>
              <p className="m-0 mb-10 lg:mb-12 lg:max-w-[700px] text-[17px] leading-[1.62] lg:text-[18px] lg:leading-[1.64] text-white/78 text-pretty" style={{ fontFamily: SANS }}>
                {ORIGIN.paras[1]}
              </p>
            </div>

            <div className="border-t border-white/20 pt-[30px] md:pt-9 lg:pt-11 md:grid md:grid-cols-[180px_1fr] md:gap-8 lg:grid-cols-[200px_1fr] lg:gap-11 md:items-center">
              <Image
                src={IMAGES.founder.src}
                alt={IMAGES.founder.alt}
                width={413}
                height={531}
                quality={90}
                sizes="(min-width:1024px) 200px, (min-width:768px) 180px, 100vw"
                className="block w-full h-[300px] md:w-[180px] md:h-[225px] lg:w-[200px] lg:h-[250px] object-cover object-[50%_18%] md:object-[50%_20%] grayscale-[.2]"
              />
              <div className="mt-6 md:mt-0">
                <p
                  className="m-0 mb-[18px] text-[26px] leading-[1.18] md:text-[30px] md:leading-[1.16] lg:text-[40px] lg:leading-[1.14] font-semibold tracking-[-.022em] md:tracking-[-.024em] lg:tracking-[-.026em] text-white text-pretty"
                  style={{ fontFamily: SANS }}
                >
                  {LEADERSHIP.claimBefore}
                  <span style={{ color: CYAN }}>{LEADERSHIP.claimAccent}</span>
                  {LEADERSHIP.claimAfter}
                </p>
                <div className="flex flex-col gap-1 lg:flex-row lg:gap-12">
                  {LEADERSHIP.people.map((p, i) => (
                    <div key={p.name}>
                      <p
                        className={`m-0 lg:mb-1 text-[15px] leading-[1.4] md:text-[16px] md:leading-[1.3] lg:text-[17px] font-semibold ${i === 0 ? "text-white" : "text-white/70 lg:text-white"}`}
                        style={{ fontFamily: SANS }}
                      >
                        {p.name}
                        <span className="lg:hidden"> · {p.role}</span>
                      </p>
                      <p className={`m-0 hidden lg:block text-[11px] ${LABEL} text-white/66`} style={{ fontFamily: SANS }}>
                        {p.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 3 — SIDM award ══════════════ */

function Award() {
  return (
    <section id="award" className={`relative ${SCROLL_MT}`} style={{ background: NAVY_2 }}>
      <div className="relative h-[280px] md:h-[440px] lg:h-[680px]">
        <Image
          src={IMAGES.award.src}
          alt={IMAGES.award.alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[44%_34%] md:object-[50%_34%]"
        />
        <div className="absolute inset-0 hidden md:block lg:hidden" style={{ background: GRAD_AWARD_T }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: GRAD_AWARD_D }} />
      </div>

      {/* Tablet and desktop: the text sits directly on the photograph, carried by
          the gradient scrim above. Only mobile gets a solid ground, because
          there the photograph ends above the text rather than behind it.
          The background must be a class, not an inline style: an inline style
          cannot be turned off at a breakpoint and previously left a solid navy
          box sitting over the image at every width. */}
      <div className="bg-[#0E3A52] px-5 pt-7 pb-[34px] md:absolute md:inset-x-10 md:bottom-9 md:bg-transparent md:p-0 lg:inset-x-[55px] lg:bottom-16 lg:grid lg:grid-cols-[1fr_420px] lg:gap-20 lg:items-end">
        <div>
          <p className={`m-0 mb-3 md:mb-3.5 lg:mb-5 text-[11px] lg:text-[12px] ${EYEBROW}`} style={{ fontFamily: SANS, color: CYAN }}>
            {AWARD.eyebrow}
          </p>
          <h2
            className="m-0 mb-3 md:mb-3.5 lg:mb-0 text-[30px] leading-[1.1] md:text-[40px] md:leading-[1.04] lg:text-[64px] lg:leading-[1.02] font-semibold tracking-[-.026em] md:tracking-[-.028em] lg:tracking-[-.03em] text-white text-pretty"
            style={{ fontFamily: SANS }}
          >
            {AWARD.title}
          </h2>
        </div>
        <p
          className="m-0 md:max-w-[520px] lg:max-w-none text-[16px] leading-[1.6] lg:text-[17px] lg:leading-[1.62] text-white/84 text-pretty"
          style={{ fontFamily: SANS }}
        >
          {AWARD.body}
        </p>
      </div>
    </section>
  );
}

/* ══════════════ 4 — portfolio ══════════════ */

function PortfolioHead() {
  return (
    <div className="lg:flex lg:items-end lg:justify-between mb-7 md:mb-10 lg:mb-12">
      <div>
        <p className={`m-0 mb-3.5 lg:mb-[18px] text-[11px] lg:text-[12px] ${EYEBROW}`} style={{ fontFamily: SANS, color: CYAN_L }}>
          {PORTFOLIO.eyebrow}
        </p>
        <h2
          className="m-0 text-[30px] leading-[1.08] md:text-[40px] md:leading-[1.04] lg:text-[52px] lg:leading-[1.02] font-semibold tracking-[-.026em] md:tracking-[-.028em] text-pretty"
          style={{ fontFamily: SANS, color: INK }}
        >
          {PORTFOLIO.heading}
        </h2>
      </div>
      <p className={`m-0 mt-4 lg:mt-0 text-[11px] ${LABEL} lg:leading-none`} style={{ fontFamily: SANS, color: CYAN_L }}>
        {PORTFOLIO.flow}
      </p>
    </div>
  );
}

function Portfolio() {
  const [i1, i2, i3, i4, i5, i6] = PORTFOLIO.items;
  const cardBox = "flex flex-col justify-between p-[30px]";
  const cardNum = `m-0 mb-2.5 text-[11px] ${LABEL} leading-none`;
  const cardH = "m-0 mb-2 text-[22px] leading-[1.18] font-semibold tracking-[-.018em]";
  const cardP = "m-0 text-[15px] leading-[1.55]";

  return (
    <section id="portfolio" className={SCROLL_MT} style={{ background: PAGE }}>
      <div className={`${INNER} py-14 md:py-20 lg:py-[110px]`} style={{ maxWidth: MAXW }}>
        <PortfolioHead />

        {/* ── desktop: six-cell bento ── */}
        <div
          className="hidden lg:grid gap-4"
          style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "340px 300px 300px" }}
        >
          {/* 01 — tall photograph, spans two rows */}
          <div className="relative overflow-hidden" style={{ gridRow: "span 2", background: NAVY }}>
            {/* The render is portrait, so cover trims 235px vertically and
                nothing horizontally. Biased to the top so the hood and the
                "MQXC 102 / MQS" branding keep clear air above them; the base it
                gives up is the area the heading overlays anyway. */}
            <Image src={i1.src} alt={i1.alt} fill quality={90} sizes="(min-width:1024px) 660px, 50vw" className="object-cover object-[50%_12%]" />
            <div className="absolute inset-0" style={{ background: GRAD_CARD }} />
            <div className="absolute inset-x-9 bottom-[34px]">
              <p className={`m-0 mb-2.5 text-[11px] ${LABEL} leading-none`} style={{ fontFamily: SANS, color: CYAN }}>{i1.n}</p>
              <h3 className="m-0 mb-2.5 text-[32px] leading-[1.14] font-semibold tracking-[-.022em] text-white" style={{ fontFamily: SANS }}>{i1.name}</h3>
              <p className="m-0 max-w-[460px] text-[16px] leading-[1.55] text-white/80" style={{ fontFamily: SANS }}>{i1.desc}</p>
            </div>
          </div>

          {/* 02 — wide, spans two columns */}
          <div
            className="grid grid-cols-[1fr_300px] items-center gap-6 p-9"
            style={{ gridColumn: "span 2", background: WHITE, border: `1px solid ${HAIR}` }}
          >
            <div>
              <p className={`m-0 mb-2.5 text-[11px] ${LABEL} leading-none`} style={{ fontFamily: SANS, color: CYAN_L }}>{i2.n}</p>
              <h3 className="m-0 mb-2.5 text-[30px] leading-[1.14] font-semibold tracking-[-.022em]" style={{ fontFamily: SANS, color: INK }}>{i2.name}</h3>
              <p className="m-0 text-[16px] leading-[1.55] text-pretty" style={{ fontFamily: SANS, color: BODY }}>{i2.desc}</p>
            </div>
            <Image src={i2.src} alt={i2.alt} width={605} height={557} quality={90} sizes="300px" className="block w-[300px] h-[230px] object-contain" />
          </div>

          {/* 03 */}
          <div className={cardBox} style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
            <div>
              <p className={cardNum} style={{ fontFamily: SANS, color: CYAN_L }}>{i3.n}</p>
              <h3 className={cardH} style={{ fontFamily: SANS, color: INK }}>{i3.name}</h3>
              <p className={cardP} style={{ fontFamily: SANS, color: BODY }}>{i3.short}</p>
            </div>
            <Image src={i3.src} alt={i3.alt} width={846} height={1200} quality={90} sizes="320px" className="block w-full h-[120px] object-contain" />
          </div>

          {/* 04 — photograph at low opacity */}
          <div className="relative overflow-hidden" style={{ background: NAVY }}>
            {/* The design faded this cell's image to .55 to knock back a busy
                software screenshot. The asset is now an actual radiograph, which
                is the cell's subject rather than texture, so it runs at full
                opacity. The bottom scrim stays for the heading. */}
            <Image src={i4.src} alt={i4.alt} fill quality={90} sizes="(min-width:1024px) 640px, 25vw" className="object-cover object-[50%_30%]" />
            <div className="absolute inset-0" style={{ background: GRAD_CARD }} />
            <div className="absolute inset-x-[30px] bottom-7">
              <p className={`m-0 mb-2.5 text-[11px] ${LABEL} leading-none`} style={{ fontFamily: SANS, color: CYAN }}>{i4.n}</p>
              <h3 className="m-0 mb-2 text-[22px] leading-[1.18] font-semibold tracking-[-.018em] text-white" style={{ fontFamily: SANS }}>{i4.name}</h3>
              <p className="m-0 text-[15px] leading-[1.5] text-white/82" style={{ fontFamily: SANS }}>{i4.short}</p>
            </div>
          </div>

          {/* 05 */}
          <div className={cardBox} style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
            <div>
              <p className={cardNum} style={{ fontFamily: SANS, color: CYAN_L }}>{i5.n}</p>
              <h3 className={cardH} style={{ fontFamily: SANS, color: INK }}>{i5.name}</h3>
              <p className={cardP} style={{ fontFamily: SANS, color: BODY }}>{i5.short}</p>
            </div>
            <Image src={i5.src} alt={i5.alt} width={354} height={570} quality={90} sizes="320px" className="block w-full h-[120px] object-contain" />
          </div>

          {/* 06 */}
          <div className={cardBox} style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
            <div>
              <p className={cardNum} style={{ fontFamily: SANS, color: CYAN_L }}>{i6.n}</p>
              <h3 className={cardH} style={{ fontFamily: SANS, color: INK }}>{i6.name}</h3>
              <p className={cardP} style={{ fontFamily: SANS, color: BODY }}>{i6.short}</p>
            </div>
            <Image src={i6.src} alt={i6.alt} width={415} height={409} quality={90} sizes="320px" className="block w-full h-[120px] object-contain" />
          </div>
        </div>

        {/* ── tablet + mobile: uniform cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5 lg:hidden">
          {PORTFOLIO.items.map((p) => (
            <div key={p.n} className="flex min-w-0 flex-col" style={{ background: WHITE, border: `1px solid ${HAIR}` }}>
              <Image
                src={p.src}
                alt={p.alt}
                width={846}
                height={1200}
                quality={90}
                sizes="(min-width:768px) 50vw, 100vw"
                className="block w-full h-[170px] md:h-[160px] object-contain"
                style={{ background: PAGE, borderBottom: `1px solid ${HAIR}` }}
              />
              <div className="px-5 pt-5 pb-6 md:px-6 md:pt-[22px] md:pb-[26px]">
                <p className={`m-0 mb-2 md:mb-2.5 text-[11px] ${LABEL} leading-none`} style={{ fontFamily: SANS, color: CYAN_L }}>{p.n}</p>
                <h3 className="m-0 mb-2 text-[20px] md:text-[21px] leading-[1.2] font-semibold tracking-[-.018em]" style={{ fontFamily: SANS, color: INK }}>{p.name}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-pretty" style={{ fontFamily: SANS, color: BODY }}>{p.short}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 5 — team statement ══════════════ */

function Team() {
  return (
    <section className="relative" style={{ background: NAVY }}>
      <div className="relative h-[260px] md:h-[420px] lg:h-[560px]">
        {/* A different photograph from the hero's: the hero image was carrying
            this band as well, so it appeared twice on the page. */}
        <Image
          src={IMAGES.team.src}
          alt={IMAGES.team.alt}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 hidden md:block lg:hidden" style={{ background: GRAD_TEAM_T }} />
        <div className="absolute inset-0 hidden lg:block" style={{ background: GRAD_TEAM_D }} />
      </div>

      {/* Same as the award band: tablet and desktop put the text on the
          photograph, carried by the flat scrim above it, and only mobile needs
          a solid ground because there the photograph ends above the text.
          Set as a class, not an inline style, so it can be dropped at md. */}
      <div className="bg-[#0B2A3A] px-5 pt-[30px] pb-9 md:absolute md:inset-x-10 md:top-1/2 md:-translate-y-1/2 md:bg-transparent md:p-0 lg:inset-x-[55px] lg:grid lg:grid-cols-[1fr_380px] lg:gap-20 lg:items-center">
        <p
          className="m-0 mb-3.5 md:mb-[18px] lg:mb-0 text-[26px] leading-[1.16] md:text-[34px] md:leading-[1.14] lg:text-[50px] lg:leading-[1.1] font-semibold tracking-[-.022em] md:tracking-[-.026em] lg:tracking-[-.028em] text-white text-pretty"
          style={{ fontFamily: SANS }}
        >
          <span className="md:hidden">{TEAM.statementMobile}</span>
          <span className="hidden md:inline">{TEAM.statement}</span>
        </p>
        <div className="lg:border-l lg:border-white/28 lg:pl-9">
          <p
            className="m-0 md:max-w-[520px] lg:max-w-none text-[16px] leading-[1.6] lg:text-[17px] lg:leading-[1.62] text-white/78 lg:text-white/82 text-pretty"
            style={{ fontFamily: SANS }}
          >
            {TEAM.note}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 6 — timeline ══════════════ */

function Timeline() {
  return (
    <section id="timeline" className={`bg-[#F4F8FA] md:bg-[#0B2A3A] ${SCROLL_MT}`}>
      <div className={`${INNER} py-14 md:py-20 lg:py-[110px]`} style={{ maxWidth: MAXW }}>
        <div className="lg:max-w-[820px] mb-9 md:mb-12 lg:mb-16">
          <p className={`m-0 mb-3.5 lg:mb-[18px] text-[11px] lg:text-[12px] ${EYEBROW} text-[#0A6A88] md:text-[#16C1F3]`} style={{ fontFamily: SANS }}>
            {TIMELINE.eyebrow}
          </p>
          <h2
            className="m-0 text-[30px] leading-[1.1] md:text-[40px] md:leading-[1.06] lg:text-[52px] lg:leading-[1.04] font-semibold tracking-[-.026em] md:tracking-[-.028em] text-[#0B2A3A] md:text-white text-pretty"
            style={{ fontFamily: SANS }}
          >
            {TIMELINE.heading}
          </h2>
        </div>

        <div className="border-t border-[#0B2A3A] md:border-white/24">
          {TIMELINE.items.map((t) => (
            <div
              key={t.year}
              className="py-6 md:py-7 lg:py-[34px] border-b border-[#D3DFE7] md:border-white/16 lg:grid lg:grid-cols-[300px_1fr] lg:gap-14 lg:items-baseline"
            >
              <div
                className={`${NUM} text-[40px] md:text-[48px] lg:text-[56px] tracking-[-.035em] whitespace-nowrap ${
                  t.major ? "text-[#0A6A88] md:text-[#16C1F3]" : "text-[#0B2A3A] md:text-white/88"
                }`}
                style={{ fontFamily: DISPLAY }}
              >
                {t.year}
              </div>
              {/* The design's "Turning point" label on major milestones is removed
                  at the client's request; major years stay distinguished by
                  colour alone. TIMELINE.majorLabel is kept in about-data.ts. */}
              <div className="lg:max-w-[760px]">
                <h3
                  className="m-0 mt-3 md:mt-3.5 lg:mt-0 mb-2 text-[19px] leading-[1.24] md:text-[22px] md:leading-[1.22] lg:text-[26px] lg:leading-[1.2] font-semibold tracking-[-.016em] md:tracking-[-.018em] lg:tracking-[-.02em] text-[#0B2A3A] md:text-white text-pretty"
                  style={{ fontFamily: SANS }}
                >
                  {t.title}
                </h3>
                <p
                  className="m-0 text-[15px] leading-[1.6] md:text-[16px] text-[#41586A] md:text-white/70 text-pretty"
                  style={{ fontFamily: SANS }}
                >
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 7 — pillars ══════════════ */

function Pillars() {
  return (
    <section id="pillars" className={SCROLL_MT} style={{ background: WHITE }}>
      <div className={`${INNER} py-14 md:py-20 lg:py-[110px]`} style={{ maxWidth: MAXW }}>
        <h2
          className="m-0 mb-8 md:mb-11 lg:mb-14 text-[30px] leading-[1.1] md:text-[38px] md:leading-[1.06] lg:text-[46px] lg:leading-[1.04] font-semibold tracking-[-.026em] "
          style={{ fontFamily: SANS, color: INK }}
        >
          {PILLARS.heading}
        </h2>
        <div className="border-t" style={{ borderColor: INK }}>
          {PILLARS.items.map((p) => (
            <div
              key={p.n}
              className="py-6 md:py-7 lg:py-[38px] border-b md:grid md:grid-cols-[80px_1fr] md:gap-6 lg:grid-cols-[120px_1fr_1fr] lg:gap-14 lg:items-baseline"
              style={{ borderColor: HAIR }}
            >
              <span
                className={`hidden md:block ${NUM} text-[36px] lg:text-[52px] tracking-[-.04em]`}
                style={{ fontFamily: DISPLAY, color: GHOST }}
              >
                {p.n}
              </span>
              <div className="lg:contents">
                <div className="flex items-baseline gap-3.5 mb-2.5 lg:mb-0">
                  <span className={`md:hidden ${NUM} text-[22px] tracking-[-.03em]`} style={{ fontFamily: DISPLAY, color: CYAN }}>
                    {p.n}
                  </span>
                  <h3
                    className="m-0 text-[21px] leading-[1.2] md:text-[24px] md:leading-[1.18] lg:text-[34px] lg:leading-[1.14] font-semibold tracking-[-.018em] md:tracking-[-.02em] lg:tracking-[-.024em] text-pretty"
                    style={{ fontFamily: SANS, color: INK }}
                  >
                    {p.name}
                  </h3>
                </div>
                <div>
                  <p
                    className="m-0 mb-3 lg:mb-3.5 text-[15px] leading-[1.58] md:text-[16px] lg:text-[17px] lg:leading-[1.6] text-pretty"
                    style={{ fontFamily: SANS, color: BODY }}
                  >
                    {p.desc}
                  </p>
                  <p className={`m-0 text-[11px] ${LABEL}`} style={{ fontFamily: SANS, color: CYAN_L }}>
                    {p.proof}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 8 — purpose ══════════════ */

function Purpose() {
  return (
    <section style={{ background: INSET }}>
      <div className={`${INNER} py-14 md:py-20 lg:py-[110px]`} style={{ maxWidth: MAXW }}>
        <p className={`m-0 mb-[22px] md:mb-7 lg:mb-10 text-[11px] lg:text-[12px] ${EYEBROW}`} style={{ fontFamily: SANS, color: CYAN_L }}>
          {PURPOSE.eyebrow}
        </p>
        <h2
          className="m-0 mb-9 md:mb-12 lg:mb-16 lg:max-w-[1240px] text-[30px] leading-[1.14] md:text-[40px] md:leading-[1.1] lg:text-[58px] font-semibold tracking-[-.026em] lg:tracking-[-.03em] text-pretty"
          style={{ fontFamily: SANS, color: INK }}
        >
          {PURPOSE.heading}
        </h2>
        <div className="md:grid md:grid-cols-2 md:gap-9 lg:gap-14">
          {PURPOSE.items.map((it, i) => (
            <div
              key={it.label}
              className={`border-t pt-5 md:pt-[22px] lg:pt-[26px] ${i === 0 ? "mb-7 md:mb-0" : ""}`}
              style={{ borderColor: HAIR_2 }}
            >
              <p className={`m-0 mb-2.5 lg:mb-3 text-[11px] ${LABEL} leading-none`} style={{ fontFamily: SANS, color: CYAN_L }}>
                {it.label}
              </p>
              <p
                className="m-0 text-[16px] leading-[1.58] md:text-[17px] md:leading-[1.55] lg:text-[20px] text-pretty"
                style={{ fontFamily: SANS, color: INK }}
              >
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════ 9 — clients ══════════════ */

/* The design set ten client names in Archivo type. At the client's request the
   wall now shows the 32 supplied logos instead, keeping the design's two
   authored structures: an animated marquee at tablet and desktop, and a static
   bordered grid on mobile.

   The marquee duplicates the list to loop, so its marks carry empty alt text
   and the readable client list is rendered once, visually hidden. The mobile
   grid is a single pass, so there its marks carry real alt text.

   Marquee duration is scaled from the design's 40s/34s to hold the same pixel
   speed over a track that is now three times longer. */

function LogoMarquee() {
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div
      className="overflow-hidden py-[30px] lg:py-10"
      style={{ borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}
    >
      {/* Each mark sits in a fixed box and is contained inside it, so marks of
          wildly different aspect (6.5:1 down to 0.68:1) keep one rhythm.
          Note: globals.css sets an unlayered `img { max-width:100% }`, which
          beats Tailwind's max-w-* utilities, so the box carries the size and
          the image simply fills it. */}
      <div className="mqs-marquee flex w-max items-center gap-10 lg:gap-14" aria-hidden="true">
        {doubled.map((l, i) => (
          <div key={`${l.src}-${i}`} className="flex h-8 w-[116px] shrink-0 items-center justify-center lg:h-10 lg:w-[150px]">
            <Image
              src={l.src}
              alt=""
              width={l.w}
              height={l.h}
              quality={90}
              sizes="300px"
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {CLIENT_LOGOS.map((l) => <li key={l.src}>{l.name}</li>)}
      </ul>
    </div>
  );
}

function Clients() {
  return (
    <section id="clients" className={SCROLL_MT} style={{ background: PAGE }}>
      {/* mobile: heading and a bordered grid of marks */}
      <div className={`${INNER} md:hidden py-14 pb-16`} style={{ maxWidth: MAXW }}>
        <h2 className="m-0 mb-2.5 text-[28px] leading-[1.1] font-semibold tracking-[-.024em]" style={{ fontFamily: SANS, color: INK }}>
          {CLIENTS.heading}
        </h2>
        <p className="m-0 mb-7 text-[16px] leading-[1.55] text-pretty" style={{ fontFamily: SANS, color: BODY }}>
          {CLIENTS.lead}
        </p>
        <div
          className="grid grid-cols-3"
          style={{ background: WHITE, borderTop: `1px solid ${HAIR}`, borderLeft: `1px solid ${HAIR}` }}
        >
          {CLIENT_LOGOS.map((l) => (
            <div
              key={l.src}
              className="flex h-[86px] items-center justify-center px-2.5"
              style={{ borderRight: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}
            >
              <div className="flex h-[38px] w-full items-center justify-center">
                <Image
                  src={l.src}
                  alt={l.name}
                  width={l.w}
                  height={l.h}
                  quality={90}
                  sizes="200px"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* tablet + desktop: heading in the gutter, marquee full bleed */}
      <div className="hidden md:block pt-[72px] pb-20 lg:pt-[90px] lg:pb-[100px]">
        <div className={`${INNER} pb-7 lg:pb-[34px]`} style={{ maxWidth: MAXW }}>
          <h2
            className="m-0 mb-2.5 lg:mb-3 text-[34px] leading-[1.06] lg:text-[40px] lg:leading-[1.04] font-semibold tracking-[-.025em]"
            style={{ fontFamily: SANS, color: INK }}
          >
            {CLIENTS.heading}
          </h2>
          <p className="m-0 lg:max-w-[600px] text-[16px] leading-[1.55] text-pretty" style={{ fontFamily: SANS, color: BODY }}>
            {CLIENTS.lead}
          </p>
        </div>
        <LogoMarquee />
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* reveal on scroll, from the interactive prototype; renders nothing */}
      <AboutMotion />
      <Hero />
      <Origin />
      <Award />
      <Portfolio />
      <Team />
      <Timeline />
      <Pillars />
      <Purpose />
      <Clients />
    </main>
  );
}
