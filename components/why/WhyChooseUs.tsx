/* ──────────────────────────────────────────────────────────────
   Why Choose Us — ported from `Why Choose Us.dc.html` + `Feature.dc.html`
   + the DS GlassPanel/Icon. Full-bleed navy band over a dark photo, with a
   frosted-glass feature panel (the only blur in the system). Palette 2B.
   Desktop: 4 features in a row + CTA top-right.
   Tablet: 2×2 grid + CTA below. Phone: single column (stacked features) + CTA below.
   ────────────────────────────────────────────────────────────── */

import Image from "next/image";

const DARK = "#0B2A3A";
const PRIMARY = "#0E3A52";
const RULE = "rgba(255,255,255,.14)";

type IconName = "hardHat" | "settings" | "shield" | "buoy";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 40,
    height: 40,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "hardHat":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" />
          <path d="M10 10V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5" />
          <path d="M4 15v-3a6 6 0 0 1 6-6" />
          <path d="M14 6a6 6 0 0 1 6 6v3" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 7h-9" />
          <path d="M14 17H5" />
          <circle cx="17" cy="17" r="3" />
          <circle cx="7" cy="7" r="3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "buoy":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

type Feat = { icon: IconName; title: string; description: string };
const FEATURES: Feat[] = [
  { icon: "settings", title: "In-house engineering", description: "Design, build and support of every system under one roof in Hyderabad." },
  { icon: "shield", title: "AERB certified", description: "Radiation safety and regulatory compliance for X-ray installation and operation." },
  { icon: "hardHat", title: "ASTM aligned", description: "Inspection workflows aligned to globally recognised ASTM standards." },
  { icon: "buoy", title: "ISO certified", description: "ISO quality systems for repeatable, controlled and continually-improving processes." },
];

// per-cell dividers: none · left(md+)/top(phone) · left(lg)/top(≤md) · corner
const CELL_BORDER = [
  "",
  "border-t md:border-t-0 md:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t md:border-l lg:border-t-0",
];

function FeatureCard({ icon, title, description }: Feat) {
  return (
    <>
      {/* column — tablet + desktop */}
      <div className="hidden flex-col gap-5 text-white md:flex">
        <div className="flex h-11 items-center text-white">
          <Icon name={icon} />
        </div>
        <div className="t-h4" style={{ color: "#fff" }}>
          {title}
        </div>
        <p
          className="m-0 max-w-[26ch] t-body-sm"
          style={{ color: "rgba(255,255,255,.72)" }}
        >
          {description}
        </p>
      </div>
      {/* stacked — phone */}
      <div className="flex flex-col gap-5 text-white md:hidden">
        <div className="flex items-center gap-4">
          <div className="flex h-10 flex-none items-center text-white">
            <Icon name={icon} />
          </div>
          <div className="t-h4" style={{ color: "#fff" }}>
            {title}
          </div>
        </div>
        <p className="m-0 t-body-sm" style={{ color: "rgba(255,255,255,.72)" }}>
          {description}
        </p>
      </div>
    </>
  );
}

function WorkWithUs({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`box-border h-12 items-center gap-3 rounded-none bg-white t-button no-underline transition-colors duration-200 hover:!bg-[#16C1F3] hover:!text-[#08283A] ${className}`}
      style={{ color: PRIMARY }}
    >
      Work with us
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">
        <path d="M3 9h11" />
        <path d="M9.5 4.5L14 9l-4.5 4.5" />
      </svg>
    </a>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why" className="relative overflow-hidden" style={{ background: DARK }}>
      <Image
        src="/assets/photo-dark-hero.jpg"
        alt="Plant floor at night"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ background: "rgba(11,42,58,.80)" }} />

      <div className="relative px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:pt-[120px] lg:pb-14">
        {/* intro */}
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex max-w-[820px] flex-col gap-6 md:gap-7">
            <div className="t-eyebrow text-white">
              Why choose us
            </div>
            <h2 className="m-0 t-h2 text-white md:max-w-[660px] lg:max-w-none">
              Built for accuracy. Trusted for compliance.
            </h2>
          </div>
          <WorkWithUs className="hidden flex-none px-[26px] lg:inline-flex" />
        </div>

        {/* frosted feature panel */}
        <div
          className="mt-7 grid grid-cols-1 md:mt-9 md:grid-cols-2 lg:mt-28 lg:grid-cols-4"
          style={{
            background: "rgba(255,255,255,.10)",
            border: `1px solid rgba(255,255,255,.20)`,
            backdropFilter: "blur(24px) saturate(120%)",
            WebkitBackdropFilter: "blur(24px) saturate(120%)",
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`px-6 py-8 md:px-8 md:py-10 lg:px-9 lg:py-11 ${CELL_BORDER[i]}`}
              style={{ borderColor: RULE }}
            >
              <FeatureCard {...f} />
            </div>
          ))}
        </div>

        {/* CTA below the panel — tablet + phone */}
        <WorkWithUs className="mt-5 inline-flex px-6 md:mt-6 md:px-[26px] lg:hidden" />
      </div>
    </section>
  );
}
