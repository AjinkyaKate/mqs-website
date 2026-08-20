/* ──────────────────────────────────────────────────────────────
   Contact page — /contact
   The one Phase 1 page with no client content document, so the copy here is
   written from facts the site already verifies and nothing else:

   · phone and email as they appear in the footer
   · the Sanathnagar address, which the audit flags as never confirmed against
     the registered address (see NOTE below)
   · "eight cities", from the About brief's 2025 milestone

   Deliberately absent, because MQS has not supplied it: regional office
   addresses, office hours, a separate service line, a map pin. The eight-city
   presence is stated without naming cities, since only Hyderabad is known.

   The enquiry form is the existing ContactSection, reused rather than
   duplicated, so submissions land in the same Enquiry table and admin view.
   Palette 2B + site font. Static.
   ────────────────────────────────────────────────────────────── */

import type { CSSProperties, ReactNode } from "react";

const EASE = "cubic-bezier(.22,.61,.36,1)";
const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
const HAIR = "#D3DFE7", PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF";
const NAVY = "#0B2A3A";
const CYAN = "#16C1F3", CYAN_L = "#0A6A88", CYAN_D = "#5AD1F7";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";

const MAXW = 1330;
const GUT = "clamp(24px,4vw,55px)";

export const PHONE = "+91 40 2381 1122";
export const TEL = "tel:+914023811122";
export const EMAIL = "sales@mqstechnologies.in";

/* NOTE: unconfirmed. This is the address in the footer and the only one on the
   site; it has never been checked against the registered address. Confirm before
   this page is used for anything official, and before adding postal address to
   structured data or a Google Business listing. */
const ADDRESS = ["MQS Technologies Pvt. Ltd.", "KK House, Plot B-35/1", "Industrial Estate, Sanathnagar", "Hyderabad 500018, Telangana, India"];
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("MQS Technologies KK House Plot B-35/1 Industrial Estate Sanathnagar Hyderabad 500018")}`;

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

function Arrow({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="square" aria-hidden="true" style={{ display: "block" }}>
      <path d="M4 12h14M12 5.5 18.5 12 12 18.5" />
    </svg>
  );
}

function Section({ id, tone = "page", children }: { id?: string; tone?: "page" | "white" | "inset" | "navy"; children: ReactNode }) {
  const bg = { page: PAGE, white: WHITE, inset: INSET, navy: NAVY }[tone];
  return (
    <section id={id} style={{ background: bg }}>
      <div className="mx-auto" style={{ maxWidth: MAXW, padding: `clamp(56px,6vw,96px) ${GUT}` }}>{children}</div>
    </section>
  );
}

/* Three things people arrive here to do, each pointed at the route that handles
   it rather than all funnelling into one inbox. */
const ROUTES = [
  {
    n: "01",
    title: "Sales and new systems",
    body: "Specifying an inspection system, comparing configurations, or asking for a quote. Our application engineers will want the part size, material, thickness and the defect you are chasing.",
    actions: [
      { label: "Request a consultation", href: "#contact", primary: true },
      { label: "View our products", href: "/products" },
    ],
  },
  {
    n: "02",
    title: "Service and support",
    body: "You already run an MQS system and need planned maintenance, calibration, or a breakdown response. Service requests route to the engineers who handle that system.",
    actions: [
      { label: "Raise a service request", href: "/services#service-support", primary: true },
      { label: "Call the service team", href: TEL },
    ],
  },
  {
    n: "03",
    title: "Inspection as a service",
    body: "You need a CT result but not a CT system. Send us the part and we will scan it, then return documented findings against your drawing.",
    actions: [
      { label: "CT inspection services", href: "/services#inspection-services", primary: true },
    ],
  },
];

export default function ContactPage() {
  return (
    <main style={{ background: PAGE, color: INK, fontFamily: SANS }}>
      {/* hero */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto" style={{ maxWidth: MAXW, padding: `clamp(120px,12vw,168px) ${GUT} clamp(56px,6vw,88px)` }}>
          <div className="flex flex-col" style={{ gap: "clamp(16px,1.8vw,22px)" }}>
            <div className="t-eyebrow" style={{ color: CYAN_D }}>Contact</div>
            <h1 style={{
              margin: 0, color: "#fff", letterSpacing: "-.03em", maxWidth: "22ch",
              font: `600 clamp(34px,5vw,64px)/1.05 ${SANS}`,
            }}>Talk to Our Team.</h1>
            <p style={{ ...lead("rgba(255,255,255,.82)"), maxWidth: "58ch" }}>
              Tell us what you need to inspect, build or keep running, and we will route it to the engineers
              who handle it. Designed and manufactured in Hyderabad since 1994.
            </p>
            <div className="flex flex-col items-stretch sm:flex-row sm:flex-wrap sm:items-center" style={{ gap: 14, marginTop: 12 }}>
              <a href={TEL} className="t-button hover:!bg-white hover:!text-[#0B2A3A]" style={btn(CYAN, "#08283A")}>
                {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="t-button hover:!bg-white/20"
                style={btn("rgba(255,255,255,.1)", "#fff", "1px solid rgba(255,255,255,.28)")}>
                {EMAIL}<Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* what are you contacting us about */}
      <Section tone="white">
        <div className="flex flex-col" style={{ gap: 18, marginBottom: "clamp(32px,4vw,48px)" }}>
          <div className="t-eyebrow" style={{ color: CYAN_L }}>Where to start</div>
          <h2 style={{ margin: 0, font: `600 clamp(26px,3.2vw,38px)/1.12 ${SANS}`, letterSpacing: "-.025em", color: INK, maxWidth: "26ch" }}>
            Three Reasons People Call Us.
          </h2>
        </div>
        <div className="grid" style={{ gap: 1, background: HAIR, borderTop: `1px solid ${HAIR}` }}>
          {ROUTES.map((r) => (
            <div key={r.n} className="grid md:grid-cols-[64px_1fr_auto]"
              style={{ gap: "clamp(12px,2.4vw,32px)", background: WHITE, padding: "clamp(24px,2.8vw,32px) 0" }}>
              <span style={{ font: `800 clamp(15px,1.7vw,19px)/1.4 ${DISPLAY}`, color: CYAN_L }}>{r.n}</span>
              <div>
                <h3 style={{ margin: "0 0 12px", font: `500 clamp(20px,2.2vw,25px)/1.22 ${SANS}`, letterSpacing: "-.02em", color: INK }}>{r.title}</h3>
                <p style={{ ...bodyText(BODY), maxWidth: "62ch" }}>{r.body}</p>
              </div>
              <div className="flex flex-col items-stretch sm:flex-row sm:items-center md:flex-col md:items-stretch" style={{ gap: 10, minWidth: 220 }}>
                {r.actions.map((a) => (
                  <a key={a.label} href={a.href}
                    className={`t-button ${a.primary ? "hover:!bg-[#0B2A3A] hover:!text-white" : "hover:!border-[#0B2A3A] hover:!text-[#0B2A3A]"}`}
                    style={a.primary
                      ? { ...btn(CYAN, "#08283A"), height: 46 }
                      : { ...btn("transparent", CYAN_L, `1px solid ${HAIR}`), height: 46 }}>
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* office */}
      <Section tone="inset">
        <div className="grid lg:grid-cols-[1fr_1fr]" style={{ gap: "clamp(32px,5vw,64px)" }}>
          <div>
            <div className="t-eyebrow" style={{ color: CYAN_L, marginBottom: 18 }}>Registered office</div>
            <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 4 }}>
              {ADDRESS.map((line, i) => (
                <span key={line} style={{
                  font: `${i === 0 ? 500 : 400} clamp(17px,1.7vw,20px)/1.55 ${SANS}`,
                  letterSpacing: i === 0 ? "-.01em" : undefined,
                  color: i === 0 ? INK : BODY,
                }}>{line}</span>
              ))}
            </address>
            <div className="flex flex-col" style={{ gap: 10, marginTop: 26 }}>
              <a href={TEL} className="w-fit transition-colors duration-200 hover:!text-[#0B2A3A]"
                style={{ font: `500 clamp(18px,1.8vw,22px)/1.3 ${DISPLAY}`, letterSpacing: "-.01em", color: CYAN_L }}>{PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="w-fit transition-colors duration-200 hover:!text-[#0B2A3A]"
                style={{ font: `400 17px/1.5 ${SANS}`, color: CYAN_L }}>{EMAIL}</a>
            </div>
            <div style={{ marginTop: 26 }}>
              <a href={DIRECTIONS} target="_blank" rel="noopener"
                className="t-button inline-flex items-center hover:!bg-[#0B2A3A] hover:!text-white"
                style={{ ...btn("transparent", INK, `1px solid ${INK}`), height: 46 }}>
                Get directions<Arrow />
              </a>
            </div>
          </div>

          <div style={{ borderTop: `2px solid ${NAVY}`, paddingTop: 22 }}>
            <h3 className="t-eyebrow" style={{ margin: "0 0 14px", color: CYAN_L }}>Across India</h3>
            <p style={{ ...bodyText(BODY), maxWidth: "48ch" }}>
              Engineering and manufacturing run from Hyderabad, with service coverage across eight cities and
              more than 100 installations in the field.
            </p>
            {/* Regional office addresses have not been supplied. Listing city names
                without them would be a guess, so the presence is stated and the
                detail is left for MQS to fill. */}
            <p style={{ ...bodyText(MUTED), fontSize: 15, marginTop: 18, maxWidth: "48ch" }}>
              For the office nearest you, call the number above and we will put you through to the regional
              engineer.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
