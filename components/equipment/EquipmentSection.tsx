"use client";

import { useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Equipment Section — ported from `Equipment Section.dc.html`
   + `Equipment Card.dc.html`. Palette 2B (steel navy, cyan accent).
   Layout & behavior unchanged; only colors remapped:
   eyebrow/category-hover/arrow-hover use cyan-700 #0A6A88 (AA on light),
   the arrow button rests navy, the Explore button is navy primary.
   ────────────────────────────────────────────────────────────── */

const ACCENT = "#0A6A88"; // cyan-700 — AA on light
const PRIMARY = "#0E3A52";
const ON_PRIMARY = "#FFFFFF";
const INK = "#0B2A3A";
const BODY = "#41586A";
const MUTED = "#5F7688";
const TILE = "#F4F8FA";
const EASE = "cubic-bezier(.22,.61,.36,1)";

type CardProps = {
  category: string;
  specOneLabel: string;
  specOneValue: string;
  specTwoLabel: string;
  specTwoValue: string;
  description: string;
  image: string;
};

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="t-caption"
      style={{
        color: MUTED,
      }}
    >
      {label}:{" "}
      <span style={{ fontWeight: 400, letterSpacing: 0, textTransform: "none", color: INK }}>
        {value}
      </span>
    </div>
  );
}

function ArrowButton({ hovered }: { hovered: boolean }) {
  const bg = hovered ? TILE : PRIMARY;
  const color = hovered ? ACCENT : "#FFFFFF";
  return (
    <div
      className="flex flex-none items-center justify-center"
      style={{
        width: 48,
        height: 48,
        background: bg,
        border: `1px solid ${bg}`,
        color,
        transition: `background 200ms ${EASE}, border-color 200ms ${EASE}, color 200ms ${EASE}`,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        style={{
          transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
          transition: `transform 200ms ${EASE}`,
        }}
      >
        <path d="M3 9h11" />
        <path d="M9.5 4.5L14 9l-4.5 4.5" />
      </svg>
    </div>
  );
}

function EquipmentCard(p: CardProps) {
  const [hovered, setHovered] = useState(false);
  const nameColor = hovered ? ACCENT : INK;

  return (
    <a
      href="/products"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-9 text-inherit no-underline"
      style={{ color: "inherit" }}
    >
      {/* top — WIDE (tablet + desktop) */}
      <div className="hidden items-start justify-between gap-8 md:flex">
        <div
          className="t-h3"
          style={{
            color: nameColor,
            transition: `color 200ms ${EASE}`,
          }}
        >
          {p.category}
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <SpecLine label={p.specOneLabel} value={p.specOneValue} />
          <SpecLine label={p.specTwoLabel} value={p.specTwoValue} />
        </div>
      </div>

      {/* top — NARROW (phone) */}
      <div className="flex flex-col gap-3.5 md:hidden">
        <div
          className="t-h3"
          style={{
            color: nameColor,
          }}
        >
          {p.category}
        </div>
        <SpecLine label={p.specOneLabel} value={p.specOneValue} />
        <SpecLine label={p.specTwoLabel} value={p.specTwoValue} />
      </div>

      {/* product image tile */}
      <div
        className="flex w-full items-center justify-center overflow-hidden"
        style={{ aspectRatio: "4 / 3", background: TILE, padding: "7%" }}
      >
        <Image
          src={p.image}
          alt={p.category}
          width={600}
          height={450}
          className="h-full w-full object-contain"
          style={{
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: `transform 420ms ${EASE}`,
          }}
        />
      </div>

      {/* bottom — WIDE (desktop): description left, arrow right */}
      <div className="hidden items-end justify-between gap-10 lg:flex">
        <p className="t-body m-0" style={{ maxWidth: 400, color: BODY }}>
          {p.description}
        </p>
        <ArrowButton hovered={hovered} />
      </div>

      {/* bottom — STACKED (phone + tablet): description then arrow below */}
      <div className="flex flex-col items-start gap-6 lg:hidden">
        <p className="t-body m-0" style={{ color: BODY }}>
          {p.description}
        </p>
        <ArrowButton hovered={hovered} />
      </div>
    </a>
  );
}

function ExploreButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="/products"
      className={`t-button h-12 items-center rounded-none no-underline transition-colors duration-200 hover:!bg-[#0A2B3D] hover:!text-white ${className}`}
      style={{
        background: PRIMARY,
        color: ON_PRIMARY,
      }}
    >
      Explore all systems
    </a>
  );
}

const CARD_A: CardProps = {
  category: "MQXC Series",
  specOneLabel: "VOLTAGE",
  specOneValue: "160–450 kV",
  specTwoLabel: "MODALITY",
  specTwoValue: "DR & CT",
  description: "Enclosed cabinet systems for 2D digital radiography and CT of medium castings, weld coupons and structural parts.",
  image: "/assets/prod-mqxc.jpg",
};
const CARD_B: CardProps = {
  category: "High-Energy X-ray",
  specOneLabel: "ENERGY",
  specOneValue: "0.9–15 MeV",
  specTwoLabel: "PENETRATION",
  specTwoValue: "500 mm steel",
  description: "LINAC-based deep-penetration inspection of turbine blades, rocket-motor casings and thick-wall forgings.",
  image: "/assets/prod-highenergy.jpg",
};

export default function EquipmentSection() {
  return (
    <section id="equipment" className="bg-white px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:py-[120px]">
      {/* intro */}
      <div className="flex flex-col gap-5 md:gap-6 lg:gap-7">
        <div
          className="t-eyebrow"
          style={{ color: ACCENT }}
        >
          Equipment
        </div>
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
          <h2
            className="t-h2 m-0 md:max-w-[640px] lg:max-w-[900px]"
            style={{ color: INK }}
          >
            Systems engineered for industrial-scale inspection.
          </h2>
          <ExploreButton className="hidden flex-none px-7 lg:inline-flex" />
        </div>
      </div>

      {/* divider */}
      <div className="mt-10 h-px md:mt-12 lg:mt-14" style={{ background: "rgba(16,16,16,.08)" }} />

      {/* card grid */}
      <div className="grid grid-cols-1 pt-11 md:pt-14 lg:grid-cols-2 lg:pt-[72px]">
        <div className="pb-11 md:pb-14 lg:pb-0 lg:pr-[55px]">
          <EquipmentCard {...CARD_A} />
        </div>
        <div
          className="border-t pt-11 md:pt-14 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[55px]"
          style={{ borderColor: "rgba(16,16,16,.08)" }}
        >
          <EquipmentCard {...CARD_B} />
        </div>
      </div>

      {/* explore button — tablet + phone */}
      <ExploreButton className="mt-11 inline-flex self-start px-6 md:mt-14 md:px-7 lg:hidden" />
    </section>
  );
}
