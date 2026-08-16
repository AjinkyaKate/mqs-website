/* ──────────────────────────────────────────────────────────────
   Footer — ported from `MQS Footer.dc.html` (compact).
   Navy block, single row on desktop: brand · links (2×2) · contact,
   hairline-divided; a slim legal bar below. Collapses to
   brand+contact / links on tablet, and a stacked column on mobile.
   Palette 2B + type scale. Static.
   ────────────────────────────────────────────────────────────── */

import Image from "next/image";

const NAVY = "#0E3A52";
const MUTED = "rgba(255,255,255,.72)";
const HEAD = "rgba(255,255,255,.60)";
const RULE = "rgba(255,255,255,.14)";

const link = "text-white no-underline transition-colors duration-200 hover:!text-[#5AD1F7]";

type FooterLink = { label: string; href: string };
const GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Leadership", href: "/#about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Digital Radiography", href: "/products" },
      { label: "Industrial CT", href: "/products" },
      { label: "Microfocus X-ray", href: "/products" },
      { label: "High-Energy X-ray", href: "/products/high-energy-xray" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Aerospace & Defence", href: "/industries/aerospace-defence" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Electronics", href: "/industries/electronics" },
      { label: "Energy", href: "/industries" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "CT Inspection", href: "/#services" },
      { label: "Industrial Electronics", href: "/#services" },
      { label: "Sub-Assemblies", href: "/#services" },
      { label: "Maintenance & Support", href: "/#services" },
    ],
  },
];

const SOCIALS: { key: string; label: string; href: string; glyph: React.ReactNode }[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mqs-technologies-private-limited",
    glyph: <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0M7 8.48H3V21h4zM13.32 8.48H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91z" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/MQS-Technologies-103704454938452/",
    glyph: <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89.61 0 1.22.06 1.83.16v2.5h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12" />,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/mqs_technologies/",
    glyph: (
      <>
        <path fillRule="evenodd" d="M8 2.5h8A5.5 5.5 0 0 1 21.5 8v8a5.5 5.5 0 0 1-5.5 5.5H8A5.5 5.5 0 0 1 2.5 16V8A5.5 5.5 0 0 1 8 2.5m0 2A3.5 3.5 0 0 0 4.5 8v8A3.5 3.5 0 0 0 8 19.5h8a3.5 3.5 0 0 0 3.5-3.5V8A3.5 3.5 0 0 0 16 4.5z" />
        <path fillRule="evenodd" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6" />
        <circle cx="17.2" cy="6.8" r="1.3" />
      </>
    ),
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCSuKS0IX8GA-MDE2ubraQBA",
    glyph: <path fillRule="evenodd" d="M21.6 7.2a2.8 2.8 0 0 0-1.97-1.98C17.88 4.75 12 4.75 12 4.75s-5.88 0-7.63.47A2.8 2.8 0 0 0 2.4 7.2C1.95 8.96 1.95 12 1.95 12s0 3.04.45 4.8a2.8 2.8 0 0 0 1.97 1.98c1.75.47 7.63.47 7.63.47s5.88 0 7.63-.47a2.8 2.8 0 0 0 1.97-1.98c.45-1.76.45-4.8.45-4.8s0-3.04-.45-4.8M10.05 15.3V8.7L15.6 12z" />,
  },
];

function Socials() {
  return (
    <div className="mqs-footer-social mqs-soc-row">
      {SOCIALS.map((s) => (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`MQS Technologies on ${s.label}`}
          className={`mqs-soc mqs-soc--${s.key}`}
        >
          <span className="mqs-soc__ink">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {s.glyph}
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="text-white" style={{ background: NAVY }}>
      <div className="mqs-footer-grid">
        {/* brand */}
        <div className="mqs-footer-brand">
          <Image src="/assets/mqs-logo-2a-dark.png" alt="MQS Technologies" width={124} height={38} className="h-8 w-auto self-start sm:h-[34px] lg:h-[38px]" />
          <div className="t-h4" style={{ color: "#fff" }}>
            Industrial X-ray, CT &amp; NDT inspection systems.
          </div>
          <p className="t-body-sm m-0" style={{ color: MUTED }}>
            Precision inspection equipment engineered in Hyderabad for aerospace, defence, automotive and electronics.
          </p>
          <Socials />
        </div>

        {/* links */}
        <div className="mqs-footer-links">
          {GROUPS.map((g) => (
            <div key={g.title} className="flex flex-col gap-3.5">
              <div className="t-caption" style={{ color: HEAD }}>
                {g.title}
              </div>
              <div className="t-body-sm flex flex-col gap-2.5">
                {g.links.map((l) => (
                  <a key={l.label} href={l.href} className={link}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* contact */}
        <div className="mqs-footer-contact">
          <div className="t-caption" style={{ color: HEAD }}>
            Contact
          </div>
          <address className="t-body-sm m-0 not-italic" style={{ color: MUTED }}>
            MQS Technologies Pvt. Ltd., KK House, Plot B-35/1, Industrial Estate, Sanathnagar, Hyderabad 500018
          </address>
          <div className="t-body-sm flex flex-col gap-1.5">
            <a href="mailto:sales@mqstechnologies.in" className={link}>
              sales@mqstechnologies.in
            </a>
            <a href="tel:+914023811122" className={link}>
              +91 40 2381 1122
            </a>
          </div>
        </div>
      </div>

      <div className="h-px" style={{ background: RULE }} />
      <div className="mqs-footer-legal t-caption" style={{ color: HEAD }}>
        <div>© 2026 MQS Technologies. All rights reserved.</div>
        <div>Designed by Trivexa.</div>
      </div>
    </footer>
  );
}
