"use client";

import { useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Insights & Resources — ported from `Insights And Resources.dc.html`
   + `Article Card.dc.html`. Palette 2B.
   Desktop: intro (eyebrow + heading + outline CTA right) + 3-up cards.
   Tablet: heading, CTA below it, 2-up cards. Phone: stacked cards, CTA after.
   Hover: 4px inset cyan frame on the image, accent title, slow image zoom.
   ────────────────────────────────────────────────────────────── */

const ACCENT = "#0A6A88";
const INK = "#0B2A3A";
const HAIRLINE = "#D3DFE7";
const EASE = "cubic-bezier(.22,.61,.36,1)";

type Article = { date: string; image: string; title: string };
const ARTICLES: Article[] = [
  { date: "Apr 11, 2026", image: "/assets/article-1.jpg", title: "Lorem ipsum dolor sit amet consectetur adipiscing." },
  { date: "Mar 27, 2026", image: "/assets/article-2.jpg", title: "Sed do eiusmod tempor incididunt ut labore." },
  { date: "Mar 02, 2026", image: "/assets/article-3.jpg", title: "Magna aliqua ut enim ad minim veniam quis." },
];

function ArticleCard({ date, image, title }: Article) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-6 text-inherit no-underline"
      style={{ color: "inherit" }}
    >
      <div
        className="overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
          background: HAIRLINE,
          boxShadow: `inset 0 0 0 4px ${hovered ? "rgba(22,193,243,1)" : "rgba(22,193,243,0)"}`,
          transition: `box-shadow 200ms ${EASE}`,
        }}
      >
        <Image
          src={image}
          alt={title}
          width={800}
          height={600}
          className="h-full w-full object-cover"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: `transform 420ms ${EASE}` }}
        />
      </div>
      <div
        className="flex flex-col gap-3 pb-6"
        style={{ borderBottom: `1px solid ${HAIRLINE}` }}
      >
        <span
          className="uppercase"
          style={{ font: "500 12px/1 var(--font-sans)", letterSpacing: ".045em", color: ACCENT }}
        >
          {date}
        </span>
        <h3
          className="m-0"
          style={{
            font: "600 22px/1.28 var(--font-sans)",
            letterSpacing: "-.025em",
            color: hovered ? ACCENT : INK,
            transition: `color 200ms ${EASE}`,
          }}
        >
          {title}
        </h3>
      </div>
    </a>
  );
}

function ViewAll({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      className={`box-border h-12 items-center rounded-none uppercase no-underline transition-colors duration-200 hover:!border-[#0E3A52] hover:!bg-[#0E3A52] hover:!text-white ${className}`}
      style={{
        background: "transparent",
        border: `1px solid ${INK}`,
        color: INK,
        font: "500 13px/1 var(--font-sans)",
        letterSpacing: ".045em",
      }}
    >
      View all articles
    </a>
  );
}

export default function InsightsSection() {
  return (
    <section
      id="insights"
      className="px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:py-[120px]"
      style={{ background: "#F4F8FA" }}
    >
      {/* intro */}
      <div className="flex flex-col gap-5 md:gap-6 lg:gap-7">
        <div
          className="uppercase"
          style={{ font: "500 12px/1 var(--font-sans)", letterSpacing: ".09em", color: ACCENT }}
        >
          Insights &amp; resources
        </div>
        <div className="flex flex-col items-start lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2
            className="m-0 text-[34px] leading-[1.08] md:max-w-[560px] md:text-[44px] md:leading-[1.06] lg:max-w-[660px] lg:text-[56px] lg:leading-[1.04]"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "-.025em", color: INK }}
          >
            Knowledge for industrial decision-makers.
          </h2>
          <ViewAll className="mt-4 hidden flex-none px-7 md:inline-flex lg:mt-0" />
        </div>
      </div>

      {/* cards */}
      <div className="mt-11 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-x-8 md:gap-y-9 lg:mt-20 lg:grid-cols-3 lg:gap-10">
        {ARTICLES.map((a) => (
          <ArticleCard key={a.title} {...a} />
        ))}
      </div>

      {/* CTA after cards — phone only */}
      <ViewAll className="mt-11 inline-flex self-start px-6 md:hidden" />
    </section>
  );
}
