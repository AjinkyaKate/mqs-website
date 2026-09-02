"use client";

import { useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Services Section — ported from `Services Section.dc.html`
   + `Service Row.dc.html`. Palette 2B (steel navy, cyan accent):
   navy carries buttons; cyan (as AA-safe #0A6A88 on light) marks the
   active/hover title, eyebrow, heading accent and links.
   Layout & behavior unchanged from the original import.
   ────────────────────────────────────────────────────────────── */

const ACCENT = "#0A6A88"; // cyan-700 — AA on light grounds
const PRIMARY = "#0E3A52";
const ON_PRIMARY = "#FFFFFF";
const INK = "#0B2A3A";
const BODY = "#41586A";
const MUTED = "#5F7688";
const CHIP_BG = "#E7EEF3";
const CHIP_FG = "#27404F";
const HAIRLINE = "rgba(16,16,16,.08)";
const PAGE = "#F4F8FA";
const EASE = "cubic-bezier(.22,.61,.36,1)";

type Row = {
  title: string;
  description: string;
  chips: [string, string, string];
  image: string;
  imageAlt: string;
  imageBackground: string;
  imageClassName: string;
  active?: boolean;
};

const ROWS: Row[] = [
  {
    title: "Digital Radiography",
    description: "Real-time, high-resolution X-ray inspection of castings, welds, assemblies and safety-critical components.",
    chips: ["Castings", "Welds", "Assemblies"],
    image: "/assets/prod-mqxc.jpg",
    imageAlt: "MQS MQXC 102 digital radiography inspection system",
    imageBackground: "#EEF3F6",
    imageClassName: "object-contain p-5 md:p-7",
    active: true,
  },
  {
    title: "Industrial CT",
    description: "3D imaging for internal flaw detection, dimensional metrology and reverse engineering of complex parts.",
    chips: ["3D imaging", "Metrology", "Porosity"],
    image: "/assets/home-solutions-ct-cabinet.jpg",
    imageAlt: "MQS MQCT 225AB industrial CT inspection cabinet",
    imageBackground: "#EEF3F6",
    imageClassName: "object-contain p-4 md:p-6",
  },
  {
    title: "Automated Test Equipment",
    description: "Custom electrical and functional validation of mission-critical assemblies for aerospace and defence.",
    chips: ["Functional test", "Wire harness", "Fuze / spin"],
    image: "/assets/ate-acpu-rig.png",
    imageAlt: "MQS automated test rig for electrical and functional validation",
    imageBackground: "#EEF3F6",
    imageClassName: "object-contain p-5 md:p-7",
  },
  {
    title: "High-Energy X-ray",
    description: "LINAC-based deep penetration up to 500 mm steel for turbine blades, rocket casings and thick forgings.",
    chips: ["0.9–15 MeV", "500 mm steel", "LINAC"],
    image: "/assets/prod-highenergy-branded.png",
    imageAlt: "MQS high-energy X-ray inspection installation",
    imageBackground: "#EEF3F6",
    imageClassName: "object-contain p-4 md:p-6",
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

function ServiceRow({ title, description, chips, image, imageAlt, imageBackground, imageClassName, active }: Row) {
  const [hovered, setHovered] = useState(false);
  const titleColor = active || hovered ? ACCENT : INK;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex h-full flex-col overflow-hidden border bg-white"
      style={{ borderColor: hovered ? "rgba(10,106,136,.35)" : HAIRLINE, transition: `border-color 200ms ${EASE}, transform 260ms ${EASE}`, transform: hovered ? "translateY(-4px)" : "none" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: imageBackground }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`${imageClassName} transition-transform duration-[420ms] group-hover:scale-[1.025]`}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-5 p-6 md:p-7">
        <h3
          className="t-h3 m-0"
          style={{ color: titleColor, transition: `color 200ms ${EASE}` }}
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
        <div className="mt-auto pt-1">
          <LearnMore />
        </div>
      </div>
    </article>
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
      <div className="flex flex-col gap-12 md:gap-14 lg:gap-16">
        <div className="flex flex-col items-start gap-7 md:gap-9 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[760px] flex-col gap-7 md:gap-9">
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
          </div>
          <AllServices className="hidden px-7 lg:inline-flex" />
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:gap-8">
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
