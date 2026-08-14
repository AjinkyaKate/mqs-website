"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Services Section — ported from `Services Section.dc.html`
   + `Service Row.dc.html`. Palette 2B (steel navy, cyan accent):
   navy carries buttons; cyan (as AA-safe #0A6A88 on light) marks the
   active/hover title, eyebrow, heading accent and links.
   Layout & behavior unchanged from the original import.
   ────────────────────────────────────────────────────────────── */

const ACCENT = "#0A6A88"; // cyan-700 — AA on light grounds
const ACCENT_HOVER = "#0C87AD";
const PRIMARY = "#0E3A52";
const ON_PRIMARY = "#FFFFFF";
const INK = "#0B2A3A";
const BODY = "#41586A";
const MUTED = "#5F7688";
const CHIP_BG = "#E7EEF3";
const CHIP_FG = "#27404F";
const HAIRLINE = "rgba(16,16,16,.08)";
const PAGE = "#F4F8FA";
const DARK = "#0B2A3A";
const EASE = "cubic-bezier(.22,.61,.36,1)";

type Row = {
  title: string;
  description: string;
  chips: [string, string, string];
  active?: boolean;
};

const ROWS: Row[] = [
  {
    title: "Digital Radiography",
    description: "Real-time, high-resolution X-ray inspection of castings, welds, assemblies and safety-critical components.",
    chips: ["Castings", "Welds", "Assemblies"],
    active: true,
  },
  {
    title: "Industrial CT",
    description: "3D imaging for internal flaw detection, dimensional metrology and reverse engineering of complex parts.",
    chips: ["3D imaging", "Metrology", "Porosity"],
  },
  {
    title: "Automated Test Equipment",
    description: "Custom electrical and functional validation of mission-critical assemblies for aerospace and defence.",
    chips: ["Functional test", "Wire harness", "Fuze / spin"],
  },
  {
    title: "High-Energy X-ray",
    description: "LINAC-based deep penetration up to 500 mm steel for turbine blades, rocket casings and thick forgings.",
    chips: ["0.9–15 MeV", "500 mm steel", "LINAC"],
  },
];

const chipStyle = {
  background: CHIP_BG,
  color: CHIP_FG,
  padding: "10px 16px",
};
const focusLabelStyle = {
  color: MUTED,
};

function LearnMore() {
  return (
    <a
      href="/products"
      className="t-button no-underline transition-colors duration-200 hover:!text-[#0C87AD]"
      style={{
        color: ACCENT,
      }}
    >
      Learn more
    </a>
  );
}

function ServiceRow({ title, description, chips, active }: Row) {
  const [hovered, setHovered] = useState(false);
  const titleColor = active || hovered ? ACCENT : INK;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-7 border-b pb-9"
      style={{ borderColor: HAIRLINE }}
    >
      {/* WIDE (desktop) — title left, description right; focus label above chips */}
      <div className="hidden items-start justify-between gap-12 lg:flex">
        <h3
          className="t-h3 m-0 shrink-0 grow-0 basis-[44%]"
          style={{
            color: titleColor,
            transition: `color 200ms ${EASE}`,
          }}
        >
          {title}
        </h3>
        <p className="t-body m-0 flex-1" style={{ color: BODY }}>
          {description}
        </p>
      </div>
      <div className="hidden flex-col gap-4 lg:flex">
        <span className="t-caption" style={focusLabelStyle}>Service focus:</span>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-3">
            {chips.map((c) => (
              <span key={c} className="t-caption" style={chipStyle}>
                {c}
              </span>
            ))}
          </div>
          <LearnMore />
        </div>
      </div>

      {/* NARROW (tablet + phone) — everything stacked */}
      <div className="flex flex-col items-start gap-5 lg:hidden">
        <h3
          className="t-h3 m-0"
          style={{ color: titleColor }}
        >
          {title}
        </h3>
        <p className="t-body m-0" style={{ color: BODY }}>
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="t-caption" style={{ ...focusLabelStyle, width: "100%" }}>Service focus:</span>
          {chips.map((c) => (
            <span key={c} className="t-caption" style={chipStyle}>
              {c}
            </span>
          ))}
        </div>
        <LearnMore />
      </div>
    </div>
  );
}

function AllServices({ className = "" }: { className?: string }) {
  return (
    <a
      href="/products"
      className={`t-button h-12 items-center self-start rounded-none no-underline transition-colors duration-200 hover:!bg-[#0A2B3D] hover:!text-white ${className}`}
      style={{
        background: PRIMARY,
        color: ON_PRIMARY,
      }}
    >
      View all solutions
    </a>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:py-[120px]"
      style={{ background: PAGE }}
    >
      <div className="lg:flex lg:items-start lg:gap-20">
        {/* LEFT / intro — sticky on desktop */}
        <div className="flex flex-col gap-7 md:gap-9 lg:sticky lg:top-[55px] lg:flex-[0_0_44%] lg:self-start">
          <div
            className="t-eyebrow"
            style={{ color: ACCENT }}
          >
            Our solutions
          </div>
          <h2
            className="t-h2 m-0 md:max-w-[660px] lg:max-w-none"
            style={{ color: INK }}
          >
            End-to-end inspection and <span style={{ color: ACCENT }}>test systems</span>.
          </h2>
          <div
            className="w-full overflow-hidden aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3]"
            style={{ background: DARK }}
          >
            <img
              src="/assets/photo-services.jpg"
              alt="Plant floor"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <AllServices className="hidden px-7 lg:inline-flex" />
        </div>

        {/* RIGHT / rows */}
        <div className="mt-10 flex flex-1 flex-col gap-9 md:mt-14 md:gap-11 lg:mt-0 lg:gap-12 lg:pt-1.5">
          {ROWS.map((r) => (
            <ServiceRow key={r.title} {...r} />
          ))}
        </div>
      </div>

      {/* button after the list — tablet + phone */}
      <AllServices className="mt-2 inline-flex px-6 md:mt-3 md:px-7 lg:hidden" />
    </section>
  );
}
