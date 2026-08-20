import { Fragment, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import ContactForm from "./ContactForm";
import ContactMotion from "./ContactMotion";

/* ──────────────────────────────────────────────────────────────
   Contact page — /contact
   Implementation of "MQS-Contact-Responsive.dc.html" (design project
   950b9821-72db-4627-8418-d93777d9a36f), which is the responsive build of the
   chosen concept, drawn from the client's "CONTACT US — Webpage Build
   Reference" docx. Both were read; where they differ the docx is the content
   authority and the .dc.html is the layout authority.

   THE ONE CONSTRAINT THAT SHAPES EVERYTHING. Every CTA on the site lands here,
   so the enquiry form sits in the right column level with the headline, never
   below it, and there is no hero photograph. Both are the reference's own
   instructions and both are conversion decisions, not aesthetic ones: a tall
   hero here costs enquiries directly.

   Layout values live as custom properties on .mqs-contact in globals.css,
   swapped at the design's own breakpoints (1100 / 700) rather than duplicated
   as markup, which is what its handoff annotation asks for.

   FIVE DEPARTURES, all forced:

   1 · The design ships its own header and footer. The real SiteHeaderFull and
       Footer are used instead, so this page carries the site's chrome. Because
       SiteHeaderFull is position:fixed while the design's was in flow, the root
       clears it with padding rather than the design's zero.

   2 · The design's closing "Handoff annotations" section is a spec panel behind
       a design-only showSpec prop, not page content. Excluded; its contents are
       implemented instead.

   3 · Privacy Policy is plain text, not a link. /privacy-policy does not exist
       on this site. The reference lists it as a launch blocker under the DPDP
       Act, and it applies to the careers form and every product form too.

   4 · The service card and the hero's "system down" row point at
       /services#service-support rather than the reference's
       /services/repair-support/. Phase 1 scope is locked to a single /services/
       page with no sub-pages, so that path will not exist; the anchor does.

   5 · The map is a labelled placeholder. The design specifies a static map
       image that loads the interactive embed on click, which needs a Maps key
       and a 2000x1250 asset, neither of which exists yet. Get Directions works
       today, so the section is useful without it.

   PENDING SIGN-OFF, all raised by the reference itself:
   · RESPONSE TIME. "We reply within one working day" is not in the source
     document. The reference calls it the cheapest improvement on the page and
     also warns to publish only a figure the team can hold to.
   · RETENTION. The notice says 24 months. The careers form already says 12.
     One of the two is wrong.
   · SERVICE REQUEST. Confirm a service request route exists before this page
     sends a customer with a system down through it.
   · The contract manufacturing contact is a personal-name address; a role alias
     would survive staff changes.
   ────────────────────────────────────────────────────────────── */

const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", INSET = "#E9F0F4", WHITE = "#FFFFFF", NAVY = "#0B2A3A";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88";
const HAIR_DARK = "rgba(255,255,255,.16)";
const SANS = "var(--font-sans)";
const EASE = "cubic-bezier(.22,.61,.36,1)";

export const PHONE = "+91 40 2381 1122";
export const TEL = "tel:+914023811122";
export const EMAIL = "sales@mqstechnologies.in";
export const ADDRESS_LINES = [
  "KK House, Plot No. B-35/1, Industrial Estate",
  "Sanathnagar, Hyderabad – 500018",
  "Telangana, India",
];
export const HOURS = "Mon–Sat, 9:30 AM – 6:30 PM IST";
/* Address string from the build reference, used for the directions link. */
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("MQS Technologies, KK House, Plot No B-35/1, Industrial Estate, Sanathnagar, Hyderabad 500018, Telangana, India");
const SERVICE_HREF = "/services#service-support";

const SHELL: CSSProperties = { maxWidth: 1330, margin: "0 auto", padding: "0 var(--gut)" };

const eyebrow = (color = CYAN_L): CSSProperties => ({
  margin: 0, font: `500 13px/1.2 ${SANS}`, letterSpacing: ".09em",
  textTransform: "uppercase", color,
});
const microLabel = (color = MUTED): CSSProperties => ({
  margin: 0, font: `500 13px/1.2 ${SANS}`, letterSpacing: ".045em",
  textTransform: "uppercase", color,
});
const lead = (color = BODY): CSSProperties => ({ margin: 0, font: "var(--lead)", color, textWrap: "pretty" });
const bodyText = (color = BODY, size?: number): CSSProperties => ({
  margin: 0, font: `400 ${size ?? 16}px/1.6 ${SANS}`, color, textWrap: "pretty",
});

function Btn({ children, href, tone, external }: { children: ReactNode; href: string; tone: "cyan" | "navy" | "quiet" | "white"; external?: boolean }) {
  const tones: Record<string, CSSProperties> = {
    cyan: { background: CYAN, color: INK },
    navy: { background: NAVY, color: WHITE },
    quiet: { background: "transparent", color: NAVY, boxShadow: `inset 0 0 0 1px ${HAIR}` },
    white: { background: WHITE, color: NAVY, boxShadow: `inset 0 0 0 1px ${HAIR}` },
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      className={`mqs-btn mqs-btn--${tone}`}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        height: 52, padding: "0 24px", width: "var(--btnw)",
        font: `500 14px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase",
        textDecoration: "none", whiteSpace: "nowrap", ...tones[tone],
        transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
      }}
    >
      {children}
    </a>
  );
}

/* ── 1 · hero, quick contact ledger, and the form beside it ── */

const QUICK: { label: string; value: ReactNode; sub: string }[] = [
  {
    label: "Response",
    value: <span style={{ font: `500 20px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK }}>We reply within one working day</span>,
    sub: HOURS,
  },
  {
    label: "Call",
    value: <a href={TEL} style={{ font: `500 20px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK, minHeight: 44, display: "flex", alignItems: "center" }}>{PHONE}</a>,
    sub: "Direct line to the Hyderabad office",
  },
  {
    label: "Email",
    value: <a href={`mailto:${EMAIL}`} style={{ font: `500 20px/1.3 ${SANS}`, letterSpacing: "-.01em", color: INK, wordBreak: "break-word", minHeight: 44, display: "flex", alignItems: "center" }}>{EMAIL}</a>,
    sub: "Sales and application advice",
  },
  {
    label: "System down?",
    value: <Link href={SERVICE_HREF} style={{ font: `500 20px/1.3 ${SANS}`, letterSpacing: "-.01em", color: CYAN_L, minHeight: 44, display: "flex", alignItems: "center" }}>Raise a service request →</Link>,
    sub: "Faster than the enquiry form for existing customers",
  },
];

function Hero() {
  return (
    <section id="enquiry" style={{ background: WHITE, padding: "calc(var(--secpad) * 0.6) 0 var(--secpad)" }}>
      <div style={{ ...SHELL, display: "grid", gridTemplateColumns: "var(--herocols)", gap: "var(--herogap)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* alignItems centres the row against the 44px mobile tap target on Home;
              without it the separator and current page sit on a different baseline. */}
          <nav aria-label="Breadcrumb" className="mqs-fade" style={{ display: "flex", gap: 8, alignItems: "center", ...microLabel(), animationDelay: "40ms" }}>
            <Link href="/" className="mqs-tap" style={{ color: MUTED }}>Home</Link>
            <span aria-hidden>/</span>
            <span aria-current="page" style={{ color: INK }}>Contact</span>
          </nav>

          <div className="mqs-rise" style={{ display: "flex", flexDirection: "column", gap: 20, animationDelay: "80ms" }}>
            <p style={eyebrow()}>Contact us</p>
            <h1 style={{
              margin: 0, font: `600 var(--h1)/1.04 ${SANS}`, letterSpacing: "-.025em",
              color: INK, maxWidth: "17ch", textWrap: "pretty",
            }}>
              Let&rsquo;s discuss your <span style={{ color: CYAN_L }}>inspection requirement</span>.
            </h1>
            <p style={{ ...lead(), maxWidth: "46ch" }}>
              Tell us what you need to inspect and our team will recommend the right X-ray, CT or ATE solution.
            </p>
          </div>

          <dl className="mqs-rise" style={{
            margin: 0, display: "grid", gridTemplateColumns: "var(--quickcols)",
            columnGap: 24, animationDelay: "160ms",
          }}>
            {QUICK.map((q, i) => (
              <Fragment key={q.label}>
                <dt style={{ borderTop: `1px solid ${HAIR}`, padding: "18px 0 6px", ...microLabel() }}>{q.label}</dt>
                <dd style={{
                  margin: 0, borderTop: `1px solid ${HAIR}`, padding: "16px 0 18px",
                  display: "flex", flexDirection: "column", gap: 4,
                  ...(i === QUICK.length - 1 ? { borderBottom: `1px solid ${HAIR}` } : null),
                }}>
                  {q.value}
                  <span style={bodyText(MUTED, 14)}>{q.sub}</span>
                </dd>
              </Fragment>
            ))}
          </dl>

          <div className="mqs-rise" style={{
            display: "flex", flexDirection: "var(--ctadir)" as CSSProperties["flexDirection"],
            gap: 16, alignItems: "stretch", animationDelay: "220ms",
          }}>
            <Btn href="#enquiry-form" tone="cyan">Get in touch</Btn>
            <Btn href={`mailto:${EMAIL}`} tone="quiet">Talk to Sales</Btn>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

/* ── 2 · department contacts ── */

const DEPARTMENTS: { eyebrow: string; title: string; copy: string; emails: string[]; cta: string; href: string; tone: "navy" | "cyan" }[] = [
  {
    eyebrow: "Sales", title: "New systems & enquiries",
    copy: "Product selection, demonstrations, quotations and application advice across X-ray, CT and ATE.",
    emails: ["sales@mqstechnologies.in", "bdev@mqstechnologies.in"],
    cta: "Email Sales", href: "mailto:sales@mqstechnologies.in", tone: "navy",
  },
  {
    eyebrow: "Contract manufacturing", title: "Build to your drawing",
    copy: "Precision sub-assemblies, industrial electronics and indigenization programmes.",
    emails: ["vijayabhaskar@mqstechnologies.in"],
    cta: "Email the Team", href: "mailto:vijayabhaskar@mqstechnologies.in", tone: "navy",
  },
  {
    eyebrow: "Service & support", title: "Already running an MQS system",
    copy: "AMC, preventive maintenance, breakdown support and spares for installed systems. The fastest route is a service request, which reaches the service desk directly.",
    emails: [],
    cta: "Raise a Service Request", href: SERVICE_HREF, tone: "cyan",
  },
];

function Departments() {
  return (
    <section id="departments" style={{ background: INSET, padding: "var(--secpad) 0" }}>
      <div style={{ ...SHELL, display: "flex", flexDirection: "column", gap: 44 }}>
        <div data-reveal="0" style={{ display: "grid", gridTemplateColumns: "var(--herocols)", gap: 48, alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={eyebrow()}>Departments</p>
            <h2 style={{ margin: 0, font: `600 var(--h2)/1.1 ${SANS}`, letterSpacing: "-.025em", color: INK, maxWidth: "22ch", textWrap: "pretty" }}>
              Reach the right team directly.
            </h2>
          </div>
          <p style={{ ...lead(), maxWidth: "44ch" }}>If you already know who you need, skip the form.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "var(--deptcols)", gap: 24 }}>
          {DEPARTMENTS.map((d, i) => (
            <article key={d.eyebrow} data-reveal={60 + i * 60} style={{
              background: WHITE, border: `1px solid ${HAIR}`, padding: "36px 32px 32px",
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <p style={eyebrow()}>{d.eyebrow}</p>
              <h3 style={{ margin: 0, font: `500 var(--h3)/1.2 ${SANS}`, letterSpacing: "-.015em", color: INK }}>{d.title}</h3>
              <p style={{ ...bodyText(), flex: 1 }}>{d.copy}</p>
              {d.emails.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {d.emails.map((m) => (
                    <a key={m} href={`mailto:${m}`} className="mqs-tap" style={{ font: `400 14px/1.6 ${SANS}`, color: CYAN_L, wordBreak: "break-word" }}>{m}</a>
                  ))}
                </div>
              )}
              <div style={{ marginTop: 8, alignSelf: "flex-start" }}>
                <a
                  href={d.href}
                  className={`mqs-btn mqs-btn--${d.tone}`}
                  style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    height: 44, padding: "0 20px",
                    background: d.tone === "cyan" ? CYAN : NAVY, color: d.tone === "cyan" ? INK : WHITE,
                    font: `500 14px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase",
                    textDecoration: "none", whiteSpace: "nowrap", transition: `background 200ms ${EASE}`,
                  }}
                >
                  {d.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3 · visit us ── */

function Visit() {
  return (
    <section id="visit" style={{ background: WHITE, padding: "var(--secpad) 0" }}>
      <div style={{ ...SHELL, display: "flex", flexDirection: "column", gap: 44 }}>
        <div data-reveal="0" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={eyebrow()}>Visit us</p>
          <h2 style={{ margin: 0, font: `600 var(--h2)/1.1 ${SANS}`, letterSpacing: "-.025em", color: INK, maxWidth: "24ch", textWrap: "pretty" }}>
            Corporate office &amp; manufacturing facility.
          </h2>
        </div>

        <div data-reveal="80" style={{ display: "grid", gridTemplateColumns: "var(--visitcols)", border: `1px solid ${HAIR}` }}>
          {/* The design calls for a static map that loads the interactive embed
              on click, so the Google iframe never costs this page its load time.
              Neither the static asset nor a Maps key exists yet, so this is the
              labelled slot until one does. Directions work regardless. */}
          <div style={{
            position: "relative", aspectRatio: "var(--mapratio)", background: INSET,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12, padding: "clamp(20px,3vw,36px)", textAlign: "center",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="1.4" strokeLinecap="square" aria-hidden="true">
              <path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" />
            </svg>
            <p style={{ ...bodyText(MUTED, 13), maxWidth: "42ch" }}>
              Static map of Sanathnagar, Hyderabad. Click-to-load Google Maps embed, 2000 × 1250 asset pending.
            </p>
            <span style={microLabel("#8FA6B5")}>Image slot</span>
          </div>

          <div style={{ background: NAVY, color: WHITE, padding: "44px 40px", display: "flex", flexDirection: "column", gap: 8 }}>
            <p style={eyebrow(CYAN)}>Hyderabad</p>
            <h3 style={{ margin: "8px 0 20px", font: `500 var(--h3)/1.25 ${SANS}`, letterSpacing: "-.015em", color: WHITE }}>
              MQS Technologies Pvt. Ltd.
            </h3>
            <p style={{ margin: "0 0 24px", font: `400 16px/1.65 ${SANS}`, color: "rgba(255,255,255,.82)", maxWidth: "32ch" }}>
              {ADDRESS_LINES.join(", ")}
            </p>
            <div style={{ borderTop: `1px solid ${HAIR_DARK}`, padding: "14px 0", display: "flex", justifyContent: "space-between", gap: 16 }}>
              <span style={microLabel("rgba(255,255,255,.7)")}>Phone</span>
              <a href={TEL} className="mqs-tap" style={{ color: WHITE, font: `400 16px/1.6 ${SANS}` }}>{PHONE}</a>
            </div>
            <div style={{ borderTop: `1px solid ${HAIR_DARK}`, borderBottom: `1px solid ${HAIR_DARK}`, padding: "14px 0", display: "flex", justifyContent: "space-between", gap: 16 }}>
              <span style={microLabel("rgba(255,255,255,.7)")}>Hours</span>
              <span style={{ font: `400 14px/1.6 ${SANS}`, color: "rgba(255,255,255,.86)", textAlign: "right" }}>{HOURS}</span>
            </div>
            <div style={{ marginTop: 28 }}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mqs-btn mqs-btn--cyan"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", height: 52,
                  background: CYAN, color: INK, font: `500 14px/1 ${SANS}`, letterSpacing: ".045em",
                  textTransform: "uppercase", textDecoration: "none", transition: `background 200ms ${EASE}`,
                }}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4 · follow ── */

function Follow() {
  return (
    <section id="follow" style={{ background: INSET, padding: "calc(var(--secpad) * 0.7) 0", borderTop: `1px solid ${HAIR}` }}>
      <div data-reveal="0" style={{ ...SHELL, display: "grid", gridTemplateColumns: "var(--followcols)", gap: 40, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={eyebrow()}>Follow MQS</p>
          <h2 style={{ margin: 0, font: `600 calc(var(--h2) * 0.82)/1.15 ${SANS}`, letterSpacing: "-.02em", color: INK }}>
            Keep up with what we&rsquo;re building.
          </h2>
          <p style={{ ...bodyText(), maxWidth: "52ch" }}>
            System launches, exhibition appearances and inspection application notes.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "var(--ctadir)" as CSSProperties["flexDirection"], gap: 16 }}>
          <Btn href="https://www.linkedin.com/company/mqs-technologies-private-limited/" tone="navy" external>Follow on LinkedIn</Btn>
          <Btn href="https://www.youtube.com/@MQSTechnologiesPvtLtd" tone="white" external>Subscribe on YouTube</Btn>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="mqs-contact" style={{ background: WHITE, color: BODY, fontFamily: SANS }}>
      <ContactMotion />
      <Hero />
      <Departments />
      <Visit />
      <Follow />
    </main>
  );
}
