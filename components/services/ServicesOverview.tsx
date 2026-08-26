/* ──────────────────────────────────────────────────────────────
   Services hub — /services/
   Recreated from the design handoff "MQS Technologies — Services Overview,
   direction 1A (Editorial Industrial)" (design project 04e8dda3), whose
   README states the HTML is a reference prototype and the task is to rebuild
   it in this codebase's own patterns rather than lift its CSS. So: the site's
   own SiteHeaderFull and Footer are used instead of the reference's, and the
   type/spacing scale lives as .svc-page custom properties in globals.css,
   declared at the design's own breakpoints (1366 / 1024 / 640) because the
   handoff steps those values discretely and calls them final.

   Page order, per the handoff: hero → service families → 01 inspection →
   02 precision manufacturing → how manufacturing works → 03 service &
   support → service finder.

   TWO DELIBERATE DEPARTURES, both forced by decisions already taken:

   1 · No detail-page links. The handoff is a hub routing to five service
       detail pages, and carries roughly seventeen "View ... →" links to them.
       Phase 1 scope is locked to a single /services/ page, so the per-service
       links inside each section are dropped (the content they would route to
       is on the page already), while the family asides and the finder rows
       keep their routing role as in-page anchors. This matches what was
       agreed for the previous build of this page.

   2 · No closing CTA band. The handoff ends on a cyan "Tell us what you
       need." band whose buttons raise a service request. On this site
       ContactSection follows immediately and *is* the enquiry form, with a
       real server action behind it, so the band would sit directly above the
       form it points at. The client has already had closing CTA bands removed
       from three pages for exactly this reason. The band's copy is kept in
       CLOSING below so it stays traceable.

   Static server component: the handoff requires no JS beyond the mobile nav
   drawer, which SiteHeaderFull already owns.
   ────────────────────────────────────────────────────────────── */

import { Fragment } from "react";
import Image from "next/image";

const NAVY = "#0B2A3A";
const NAVY_2 = "#0E3A52";
const CYAN = "#16C1F3";
const CYAN_INK = "#0A6A88";
const PAGE = "#F4F8FA";
const WHITE = "#FFFFFF";
const BODY = "#41586A";
const MUTED = "#5F7688";
const HAIR = "#D3DFE7";
const HAIR_DARK = "rgba(255,255,255,.16)";
const ON_DARK = "rgba(255,255,255,.74)";
const EASE = "cubic-bezier(.22,.61,.36,1)";

/* Archivo (--font-display) is not used here: the handoff reserves it for the
   wordmark, which belongs to SiteHeaderFull. */
const SANS = "var(--font-sans)";

const INSET = "px-[var(--svc-inset)]";

/* ── shared type roles ── */
const eyebrow = (color = CYAN_INK) => ({
  margin: 0,
  font: `500 11px/1 ${SANS}`,
  letterSpacing: ".16em",
  textTransform: "uppercase" as const,
  color,
});
const label = (color = MUTED) => ({
  margin: 0,
  font: `500 11px/1 ${SANS}`,
  letterSpacing: ".14em",
  textTransform: "uppercase" as const,
  color,
});
const h2Style = (color = NAVY) => ({
  margin: 0,
  font: `600 var(--svc-h2)/1 ${SANS}`,
  letterSpacing: "-.03em",
  color,
  textWrap: "pretty" as const,
});
const linkStyle = (color = CYAN_INK) => ({
  font: `600 11px/1 ${SANS}`,
  letterSpacing: ".12em",
  textTransform: "uppercase" as const,
  color,
  display: "inline-block" as const,
  textDecoration: "none" as const,
  transition: `color 200ms ${EASE}`,
});

/* ── content ──────────────────────────────────────────────── */

const HERO = {
  eyebrow: "Services",
  title: "More than machines. Capability you can call on.",
  lead: "Send us the part and we scan it. Send us the drawing and we build it. Already running an MQS system, we keep it running.",
};

/* Family asides keep their routing role, but as in-page anchors: the handoff's
   five detail pages are out of Phase 1 scope. */
const FAMILIES = [
  {
    n: "01",
    family: "Inspection services",
    statement: "Send us the part.",
    aside: "Inspection results without buying an inspection system. CT scanning, one-off or recurring.",
    links: [["CT inspection services", "#inspection-services"]],
  },
  {
    n: "02",
    family: "Precision manufacturing",
    statement: "Send us the drawing.",
    aside: "Build-to-spec manufacturing for defence and industrial programmes.",
    links: [
      ["Precision sub-assemblies", "#precision-manufacturing"],
      ["Industrial electronics", "#precision-manufacturing"],
    ],
  },
  {
    n: "03",
    family: "Service & support",
    statement: "Already running an MQS system?",
    aside: "Lifecycle support for installed systems, from planned maintenance to breakdown response.",
    links: [
      ["AMC plans", "#service-support"],
      ["Repair & breakdown support", "#service-support"],
    ],
  },
] as const;

const CT_SPECS: [string, string][] = [
  ["X-ray", "Conventional up to 450 kV + CT"],
  ["Detector", "High-energy digital flat panel"],
  ["Handling", "Fully automated"],
  ["Software", "MQS Imaging Suite"],
  ["Facility", "Lead-shielded cabinet"],
];

const CT_CAPS = [
  "Defect detection", "Failure analysis", "Reverse engineering",
  "Product development", "Dimensional measurement", "Wall-thickness analysis",
  "CAD comparison", "Casting inspection", "Weld-quality inspection",
  "Contamination / FOD", "Material characterisation", "Metrology",
];

type MfgItem = {
  slot: string;
  title: string;
  body: string;
  caps: readonly string[];
  image?: { src: string; alt: string };
  /* set instead of `image` where MQS have not supplied the photograph yet */
  need?: string;
};

const MFG: MfgItem[] = [
  {
    slot: "Service A",
    title: "Precision sub-assemblies.",
    body: "Mission-critical electro-mechanical and electronic assemblies built for demanding defence and industrial applications.",
    caps: ["Electro-mechanical assemblies", "Electronic modules", "Control units", "Indigenisation",
      "Import substitution", "Defence-grade qualification", "Batch production", "Fixtures & tooling", "Test setups"],
    /* The handoff ships this render as final. It is the same rotor rig that
       carries the aerospace band on /industries/. */
    image: { src: "/assets/ind-aero-rotor-dr.jpg", alt: "Precision sub-assembly inspection rig" },
  },
  {
    slot: "Service B",
    title: "Industrial electronics.",
    body: "Custom electronics and control systems engineered for reliability and repeatable performance in demanding environments.",
    caps: ["Custom control units", "Electronic modules", "Power electronics", "Power supply units",
      "Wiring", "Harnessing", "Connectors", "Enclosures", "Embedded systems", "Microcontroller platforms"],
    /* Handoff marks this photograph as still needed from MQS. */
    need: "Photograph · control unit / power electronics build",
  },
];

const PROOF: [string, string, string][] = [
  ["3,500+", "Missile control sections supplied", "Capacity · 100 units / month"],
  ["85,000+", "Piezo electric generators supplied", "Capacity · 5,000 units / month"],
];

const STEPS: [string, string][] = [
  ["01", "Share drawing, BOM or requirement"],
  ["02", "Design-for-manufacture review and process planning"],
  ["03", "Prototype or pilot build and validation"],
  ["04", "Series production, inspection and documentation"],
];

const SUPPORT = [
  {
    slot: "Service A",
    title: "Preventive maintenance plans.",
    body: "Maximise uptime, protect performance, extend system life.",
    caps: ["Scheduled maintenance", "Safety & compliance checks", "Interlock & shielding inspection",
      "Performance verification", "Calibration support", "Software health checks", "Remote support", "Visit reports"],
  },
  {
    slot: "Service B",
    title: "Repair & breakdown support.",
    body: "Fast response, expert diagnostics, reliable restoration of uptime.",
    caps: ["Remote troubleshooting", "On-site breakdown support", "Root-cause analysis",
      "Electrical & mechanical repair", "Motion & imaging subsystems", "Control-system repair", "Calibration after repair"],
  },
] as const;

const BENEFITS: [string, string][] = [
  ["Less downtime", "Fewer production interruptions"],
  ["Consistent image quality", "Stable inspection outcomes"],
  ["Longer equipment life", "Better return on capital"],
  ["Audit readiness", "Documented service history"],
];

const FINDER: [string, string, string][] = [
  ["I need inspection results but don't need to buy a machine.", "CT inspection services", "#inspection-services"],
  ["I have a drawing and need the component manufactured.", "Precision sub-assemblies", "#precision-manufacturing"],
  ["I need custom control or power electronics.", "Industrial electronics", "#precision-manufacturing"],
  ["I own an MQS system and want to keep it reliable.", "Preventive maintenance", "#service-support"],
  ["My system is down right now.", "Repair & breakdown support", "#service-support"],
];

/* Not rendered: ContactSection follows this page and is the service-request
   form itself. Kept so the handoff's closing copy stays traceable. */
export const CLOSING = {
  title: "Tell us what you need.",
  body: "Whether it is a part to scan, an assembly to build, or a system that has stopped, we route your request to the right engineer.",
  actions: ["Raise a service request", "Call the service team"],
};

/* ── pieces ───────────────────────────────────────────────── */

function Btn({ href, children, variant }: { href: string; children: React.ReactNode; variant: "primary" | "outline" }) {
  const base = {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    height: 48,
    padding: "0 26px",
    font: `600 11px/1 ${SANS}`,
    letterSpacing: ".12em",
    textTransform: "uppercase" as const,
    textDecoration: "none" as const,
    transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
  };
  const skin =
    variant === "primary"
      ? { background: CYAN, color: NAVY }
      : { background: "transparent", color: "#fff", boxShadow: `inset 0 0 0 1px ${HAIR_DARK}` };
  return (
    <a
      href={href}
      style={{ ...base, ...skin }}
      className={`max-[639px]:h-[52px] max-[639px]:w-full ${variant === "primary" ? "hover:!bg-[#0FA6D4]" : "hover:!bg-white/10"}`}
    >
      {children}
    </a>
  );
}

/* Slash-separated capability run. The handoff tints the separators, not the
   items, so they are rendered as their own elements rather than styled by
   nth-child. */
function TagList({ items, onDark = false }: { items: readonly string[]; onDark?: boolean }) {
  return (
    <div
      className="flex flex-wrap max-[639px]:gap-x-3 max-[639px]:gap-y-1.5"
      style={{ gap: "8px 20px", font: `400 14px/1.4 ${SANS}`, color: onDark ? ON_DARK : BODY, marginBottom: 28 }}
    >
      {items.map((it, i) => (
        <Fragment key={it}>
          {i > 0 && <span style={{ color: onDark ? "rgba(255,255,255,.4)" : HAIR }}>/</span>}
          <span className="max-[639px]:text-[13px]">{it}</span>
        </Fragment>
      ))}
    </div>
  );
}

/* The handoff's labelled placeholder: navy-2 ground, a 24px inset hairline and
   a caption naming the shot it needs. Decorative until real photography lands. */
function Placeholder({ caption, className, style }: { caption: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`} style={{ background: NAVY_2, ...style }}>
      <div className="pointer-events-none absolute inset-6" style={{ border: "1px solid rgba(255,255,255,.12)" }} />
      <p
        className="relative m-auto max-w-[380px] p-8 text-center max-[639px]:text-left"
        style={{ font: `500 11px/1.7 ${SANS}`, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}
      >
        {caption}
      </p>
    </div>
  );
}

/* Section head: statement left, supporting paragraph right. */
function SecHead({ n, family, title, lead, onDark = false, className, style }: {
  n: string; family: string; title: string; lead: string; onDark?: boolean; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`grid items-end gap-20 max-[1365px]:gap-14 max-[1023px]:grid-cols-1 max-[1023px]:items-start max-[1023px]:gap-6 lg:grid-cols-[1fr_480px] max-[1365px]:lg:grid-cols-[1fr_400px] ${INSET} ${className ?? ""}`}
      style={style}
    >
      <div>
        <p style={{ ...eyebrow(onDark ? CYAN : CYAN_INK), marginBottom: 22 }}>{`${n} · ${family}`}</p>
        <h2 style={h2Style(onDark ? "#fff" : NAVY)}>{title}</h2>
      </div>
      <p style={{ margin: 0, font: `400 17px/1.6 ${SANS}`, color: onDark ? ON_DARK : BODY, textWrap: "pretty" }}>{lead}</p>
    </div>
  );
}

/* ── 1 · hero ─────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative flex min-h-[660px] max-[1023px]:min-h-[520px] max-[639px]:min-h-0" style={{ background: NAVY_2 }}>
      {/* Handoff calls for an engineer servicing an open CT system. MQS have not
          supplied that shot, and every unused candidate wide enough for a hero is
          a CGI render or a boardroom photograph. This is a different frame cut
          from the same 7008x4672 original that feeds the /about-us hero: a
          tighter crop on the machine bay, so the two pages do not open on the
          same composition. The specified photograph is still on the request
          list. */}
      <Image
        src="/assets/svc-hero-ct-bay.jpg"
        alt="MQS engineer at an inspection system in the Hyderabad facility"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      {/* left-to-right scrim on desktop and tablet, top-to-bottom on mobile */}
      <div className="absolute inset-0 max-[639px]:hidden" style={{ background: "linear-gradient(90deg,rgba(11,42,58,.92) 0%,rgba(11,42,58,.74) 45%,rgba(11,42,58,.1) 100%)" }} />
      <div className="absolute inset-0 hidden max-[639px]:block" style={{ background: "linear-gradient(180deg,rgba(11,42,58,.35) 0%,rgba(11,42,58,.9) 55%)" }} />

      <div className={`relative z-[2] w-full self-end pb-[72px] pt-[120px] max-[639px]:pb-10 max-[639px]:pt-[200px] ${INSET}`}>
        <p style={{ ...eyebrow(CYAN), marginBottom: 26 }}>{HERO.eyebrow}</p>
        <h1
          className="max-w-[920px]"
          style={{ margin: 0, font: `600 var(--svc-h1)/.98 ${SANS}`, letterSpacing: "-.03em", color: "#fff", textWrap: "pretty" }}
        >
          {HERO.title}
        </h1>
        <p
          className="max-w-[600px] max-[1023px]:max-w-none"
          style={{ margin: "26px 0 0", font: `400 var(--svc-lead)/1.6 ${SANS}`, color: "rgba(255,255,255,.78)", textWrap: "pretty" }}
        >
          {HERO.lead}
        </p>
        <div className="mt-9 flex flex-wrap gap-3.5 max-[639px]:mt-7 max-[639px]:flex-col max-[639px]:gap-2.5">
          <Btn href="#contact" variant="primary">Raise a service request</Btn>
          <Btn href="#contact" variant="outline">Talk to our team</Btn>
        </div>
      </div>
    </section>
  );
}

/* ── 2 · service families ─────────────────────────────────── */

function Families() {
  return (
    <section className={INSET} style={{ background: PAGE }} aria-label="Service families">
      {FAMILIES.map((f, i) => (
        <div
          key={f.n}
          className="grid items-start gap-12 py-16 max-[1023px]:grid-cols-[88px_1fr] max-[1023px]:gap-x-7 max-[1023px]:gap-y-6 max-[1023px]:py-11 max-[639px]:grid-cols-[56px_1fr] max-[639px]:gap-4 max-[639px]:py-8 lg:grid-cols-[200px_1fr_300px]"
          style={{ borderBottom: i === FAMILIES.length - 1 ? 0 : `1px solid ${HAIR}` }}
        >
          <div style={{ font: `600 var(--svc-fam)/.8 ${SANS}`, letterSpacing: "-.04em", color: HAIR }}>{f.n}</div>
          <div>
            <p style={{ ...eyebrow(), marginBottom: 16 }}>{f.family}</p>
            <h3 style={{ margin: 0, font: `600 var(--svc-h3)/1.02 ${SANS}`, letterSpacing: "-.03em", color: NAVY, textWrap: "pretty" }}>
              {f.statement}
            </h3>
          </div>
          {/* on tablet the aside drops under the statement, in column 2 */}
          <div className="max-[1023px]:col-start-2" style={{ font: `400 16px/1.6 ${SANS}`, color: BODY }}>
            <span className="max-[639px]:text-[15px]">{f.aside}</span>
            <div className="flex flex-col gap-2" style={{ marginTop: 18 }}>
              {f.links.map(([text, href]) => (
                <a key={text} href={href} style={linkStyle()} className="hover:!text-[#0B2A3A]">
                  {text} →
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── 3 · 01 inspection services ───────────────────────────── */

function Inspection() {
  return (
    <section
      id="inspection-services"
      className="scroll-mt-[80px] pt-[var(--svc-sec-y)] md:scroll-mt-[92px] lg:scroll-mt-[96px]"
      style={{ background: WHITE }}
      aria-label="Inspection services"
    >
      <SecHead
        n="01"
        family="Inspection services"
        title="See inside in 3D. Validate with confidence."
        lead="For teams who need CT results before they need a CT system, or who require one-off inspection without capital investment."
        className="mb-16 max-[639px]:mb-8"
      />

      <div className="grid lg:grid-cols-[1fr_420px] max-[1365px]:lg:grid-cols-[1fr_380px] max-[1023px]:grid-cols-1">
        <div className="relative min-h-[620px] max-[1023px]:min-h-[420px] max-[639px]:min-h-[300px]" style={{ background: NAVY }}>
          <Image
            src="/assets/svc-ct-voids.jpg"
            alt="CT analysis showing internal voids in a plated through-hole array"
            fill
            quality={90}
            sizes="(min-width:1024px) 70vw, 100vw"
            className="object-cover"
          />
        </div>
        {/* Content is vertically centred rather than top-aligned. The handoff
            closed this panel with a "View CT inspection services" link; with
            that gone (no detail page in Phase 1) top alignment left a band of
            empty navy under the spec rows. */}
        <div
          className="flex flex-col justify-center pb-14 pl-12 pr-[var(--svc-inset)] pt-14 max-[1023px]:pb-10 max-[1023px]:pl-[var(--svc-inset)] max-[1023px]:pt-10 max-[639px]:pb-8 max-[639px]:pt-8"
          style={{ background: NAVY, color: "#fff" }}
        >
          <p style={{ ...eyebrow(CYAN), marginBottom: 28 }}>CT analysis output</p>
          <p style={{ margin: "0 0 36px", font: `400 15px/1.6 ${SANS}`, color: ON_DARK, textWrap: "pretty" }}>
            Internal void and defect indication in a plated through-hole array, as a 3D volume, sectioned and measured.
          </p>
          <dl className="m-0" style={{ borderTop: `1px solid ${HAIR_DARK}` }}>
            {CT_SPECS.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-6 py-3.5 max-[639px]:gap-3 max-[639px]:py-[11px]"
                style={{ borderBottom: `1px solid ${HAIR_DARK}`, font: `500 11px/1.4 ${SANS}`, letterSpacing: ".1em", textTransform: "uppercase" }}
              >
                <dt className="m-0 max-[639px]:text-[10px]" style={{ color: "rgba(255,255,255,.56)" }}>{k}</dt>
                <dd className="m-0 text-right max-[639px]:text-[10px]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={`grid gap-12 pb-[var(--svc-sec-y)] pt-[72px] max-[1023px]:grid-cols-1 max-[1023px]:gap-6 max-[639px]:pt-10 lg:grid-cols-[200px_1fr] ${INSET}`}>
        <p style={label()}>
          CT scanning
          <br />
          supports
        </p>
        <ul className="m-0 grid list-none grid-cols-3 p-0 max-[1023px]:grid-cols-2 max-[639px]:grid-cols-1" style={{ columnGap: 48 }}>
          {CT_CAPS.map((c) => (
            <li key={c} className="py-4 max-[639px]:py-3 max-[639px]:text-[15px]" style={{ font: `400 16px/1.4 ${SANS}`, color: NAVY, borderTop: `1px solid ${HAIR}` }}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── 4 · 02 precision manufacturing ───────────────────────── */

function Manufacturing() {
  return (
    <section
      id="precision-manufacturing"
      className="scroll-mt-[80px] pt-[var(--svc-sec-y)] md:scroll-mt-[92px] lg:scroll-mt-[96px]"
      style={{ background: PAGE }}
      aria-label="Precision manufacturing"
    >
      <SecHead
        n="02"
        family="Precision manufacturing"
        title="Send us the drawing."
        lead="Build-to-spec manufacturing for defence and industrial programmes, from low-volume critical builds to repeatable series production."
        className="pb-[72px] max-[639px]:pb-8"
        style={{ borderBottom: `1px solid ${HAIR}` }}
      />

      <div className="mx-[var(--svc-inset)] grid grid-cols-2 max-[1023px]:grid-cols-1" style={{ borderBottom: `1px solid ${HAIR}` }}>
        {MFG.map((m, i) => (
          <div
            key={m.title}
            className={
              i === 0
                ? "pb-16 pr-14 pt-14 max-[1023px]:px-0 max-[1023px]:pb-11 max-[1023px]:pt-0"
                : "pb-16 pl-14 pt-14 max-[1023px]:px-0 max-[1023px]:py-11"
            }
            style={
              i === 0
                ? { borderRight: `1px solid ${HAIR}` }
                : undefined
            }
          >
            {m.image ? (
              <div className="mb-9 flex h-[300px] items-center justify-center overflow-hidden max-[639px]:mb-6 max-[639px]:h-[200px]" style={{ background: WHITE }}>
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  width={726}
                  height={810}
                  quality={90}
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="max-h-[88%] max-w-[82%] object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            ) : (
              <Placeholder caption={m.need ?? "Photograph needed"} className="mb-9 h-[300px] max-[639px]:mb-6 max-[639px]:h-[200px]" />
            )}
            <p style={label()}>{m.slot}</p>
            <h3
              className="max-[639px]:!text-[24px]"
              style={{ margin: "14px 0 16px", font: `600 var(--svc-service-h3)/1.08 ${SANS}`, letterSpacing: "-.025em", color: NAVY }}
            >
              {m.title}
            </h3>
            <p className="max-w-[520px] max-[1023px]:max-w-none" style={{ margin: "0 0 24px", font: `400 16px/1.6 ${SANS}`, color: BODY, textWrap: "pretty" }}>
              {m.body}
            </p>
            <TagList items={m.caps} />
          </div>
        ))}
      </div>

      {/* Proof numerals stay large and uncontained at every breakpoint: the
          handoff calls them the credibility of the page. */}
      <div className={`grid grid-cols-2 pb-[var(--svc-sec-y)] pt-20 max-[1023px]:grid-cols-1 max-[1023px]:gap-10 max-[1023px]:pt-14 ${INSET}`}>
        {PROOF.map(([num, cap, cap2], i) => (
          <div
            key={num}
            className={i === 0 ? "pr-14 max-[1023px]:pb-10 max-[1023px]:pr-0" : "pl-14 max-[1023px]:pl-0"}
            style={i === 0 ? { borderRight: `1px solid ${HAIR}` } : undefined}
          >
            <div className="max-[639px]:!tracking-[-.03em]" style={{ font: `600 var(--svc-stat)/.85 ${SANS}`, letterSpacing: "-.045em", color: NAVY }}>
              {num}
            </div>
            <div className="max-[639px]:!text-[17px]" style={{ margin: "12px 0 0", font: `600 20px/1.3 ${SANS}`, color: NAVY }}>{cap}</div>
            <p style={{ ...label(), marginTop: 16 }}>{cap2}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 5 · how manufacturing works ──────────────────────────── */

function Process() {
  return (
    <section className={`py-[104px] max-[639px]:py-[var(--svc-sec-y)] ${INSET}`} style={{ background: WHITE }} aria-label="How manufacturing works">
      <h2 style={{ margin: "0 0 clamp(32px,5vw,64px)", font: `600 var(--svc-h3)/1.05 ${SANS}`, letterSpacing: "-.03em", color: NAVY, textWrap: "pretty" }}>
        From requirement to series production.
      </h2>
      <div
        className="grid grid-cols-4 gap-10 pt-7 max-[1023px]:grid-cols-2 max-[1023px]:gap-8 max-[639px]:grid-cols-1 max-[639px]:gap-0 max-[639px]:border-t-0 max-[639px]:pt-0"
        style={{ borderTop: `1px solid ${HAIR}` }}
      >
        {STEPS.map(([n, text]) => (
          <div key={n} className="max-[639px]:border-t max-[639px]:border-[#D3DFE7] max-[639px]:py-5">
            <div className="mb-5 max-[639px]:mb-2" style={{ font: `600 15px/1 ${SANS}`, letterSpacing: ".06em", color: CYAN }}>{n}</div>
            <p className="max-[639px]:!text-[16px]" style={{ margin: 0, font: `400 18px/1.45 ${SANS}`, color: NAVY, textWrap: "pretty" }}>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 6 · 03 service & support ─────────────────────────────── */

function Support() {
  return (
    <section
      id="service-support"
      className="scroll-mt-[80px] pt-[var(--svc-sec-y)] md:scroll-mt-[92px] lg:scroll-mt-[96px]"
      style={{ background: NAVY, color: "#fff" }}
      aria-label="Service and support"
    >
      <SecHead
        n="03"
        family="Service & support"
        title="Already running an MQS system?"
        lead="Lifecycle support for installed systems, from planned preventive maintenance to breakdown response."
        onDark
        className="mb-16 max-[639px]:mb-8"
      />

      {/* Handoff asks for an engineer electrical-testing an installed system
          with a multimeter, which is exactly what this supplied frame shows. */}
      <div className="relative h-[420px] max-[1023px]:h-[320px] max-[639px]:h-[240px]" style={{ background: NAVY_2 }}>
        <Image
          src="/assets/mqs-multimeter-service.jpg"
          alt="MQS engineer performing electrical testing on a system's control electronics with a digital multimeter"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
      </div>

      <div className={`grid grid-cols-2 max-[1023px]:grid-cols-1 ${INSET}`}>
        {SUPPORT.map((s, i) => (
          <div
            key={s.title}
            className={
              i === 0
                ? "pb-[72px] pr-14 pt-16 max-[1023px]:px-0 max-[1023px]:py-11"
                : "pb-[72px] pl-14 pt-16 max-[1023px]:px-0 max-[1023px]:py-11"
            }
            style={i === 0 ? { borderRight: `1px solid ${HAIR_DARK}` } : undefined}
          >
            <p style={label("rgba(255,255,255,.56)")}>{s.slot}</p>
            <h3
              className="max-[639px]:!text-[24px]"
              style={{ margin: "14px 0", font: `600 var(--svc-support-h3)/1.1 ${SANS}`, letterSpacing: "-.025em", color: "#fff" }}
            >
              {s.title}
            </h3>
            <p style={{ margin: "0 0 24px", font: `400 16px/1.6 ${SANS}`, color: ON_DARK, textWrap: "pretty" }}>{s.body}</p>
            <TagList items={s.caps} onDark />
          </div>
        ))}
      </div>

      <div
        className={`grid grid-cols-4 gap-10 pb-[104px] pt-7 max-[1023px]:grid-cols-2 max-[1023px]:gap-7 max-[1023px]:pb-20 max-[639px]:grid-cols-1 max-[639px]:gap-5 max-[639px]:pb-16 ${INSET}`}
        style={{ borderTop: `1px solid ${HAIR_DARK}` }}
      >
        {BENEFITS.map(([head, detail]) => (
          <div key={head}>
            <b className="block" style={{ font: `600 18px/1.3 ${SANS}`, marginBottom: 8, color: "#fff" }}>{head}</b>
            <span style={{ font: `400 14px/1.5 ${SANS}`, color: "rgba(255,255,255,.6)" }}>{detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 7 · service finder ───────────────────────────────────── */

function Finder() {
  return (
    <section className={`py-[var(--svc-sec-y)] ${INSET}`} style={{ background: PAGE }} aria-label="Service finder">
      <div className="mb-14 grid items-end gap-20 max-[1365px]:gap-14 max-[1023px]:grid-cols-1 max-[1023px]:items-start max-[1023px]:gap-6 lg:grid-cols-[1fr_420px] max-[1365px]:lg:grid-cols-[1fr_400px]">
        <h2 style={h2Style()}>Which one do you need?</h2>
        <p style={{ margin: 0, font: `400 16px/1.6 ${SANS}`, color: BODY }}>Start from the requirement, not the org chart.</p>
      </div>
      <div style={{ borderTop: `1px solid ${HAIR}` }}>
        {FINDER.map(([question, dest, href]) => (
          <a
            key={question}
            href={href}
            className="grid items-center gap-12 py-[30px] no-underline transition-colors duration-200 hover:!bg-[#EDF3F6] max-[1365px]:gap-8 max-[1023px]:grid-cols-1 max-[1023px]:items-start max-[1023px]:gap-3 max-[1023px]:py-6 lg:grid-cols-[1fr_380px] max-[1365px]:lg:grid-cols-[1fr_320px]"
            style={{ borderBottom: `1px solid ${HAIR}` }}
          >
            <span style={{ font: `400 var(--svc-finder-q)/1.25 ${SANS}`, letterSpacing: "-.015em", color: NAVY, textWrap: "pretty" }}>
              {question}
            </span>
            <span style={{ ...linkStyle(), fontSize: 12 }}>{dest} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ServicesOverview() {
  return (
    <main className="svc-page" style={{ background: PAGE, color: BODY, fontFamily: SANS }}>
      <Hero />
      <Families />
      <Inspection />
      <Manufacturing />
      <Process />
      <Support />
      <Finder />
    </main>
  );
}
