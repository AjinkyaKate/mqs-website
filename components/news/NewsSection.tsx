"use client";

import { useState } from "react";
import Image from "next/image";

/* Recognition — MQS awards. Two cards (photo · award tag · title · description),
   hover 4px cyan inset frame + accent title + slow zoom. Palette 2B. */

const ACCENT = "#0A6A88";
const INK = "#0B2A3A";
const BODY = "#41586A";
const HAIRLINE = "#D3DFE7";
const EASE = "cubic-bezier(.22,.61,.36,1)";

type Award = { tag: string; image: string; title: string; desc: string };
const AWARDS: Award[] = [
  {
    tag: "SIDM Champions · 2025",
    image: "/assets/award-sidm.jpg",
    title: "SIDM Champions Award 2025",
    desc: "Recognised by the Hon'ble Defence Minister for indigenisation of High-Energy CT systems.",
  },
  {
    tag: "FTCCI Excellence Award",
    image: "/assets/award-ftcci.jpg",
    title: "Product Innovation — SME",
    desc: "For the inline wheel inspection system — a first-of-its-kind indigenous solution.",
  },
];

function AwardCard({ tag, image, title, desc }: Award) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-6 text-inherit no-underline"
      style={{ color: "inherit" }}
    >
      <div
        className="overflow-hidden"
        style={{
          aspectRatio: "16 / 9",
          background: HAIRLINE,
          boxShadow: `inset 0 0 0 4px ${hovered ? "rgba(22,193,243,1)" : "rgba(22,193,243,0)"}`,
          transition: `box-shadow 200ms ${EASE}`,
        }}
      >
        <Image
          src={image}
          alt={title}
          width={800}
          height={450}
          className="h-full w-full object-cover"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: `transform 420ms ${EASE}` }}
        />
      </div>
      <div className="flex flex-col gap-3 pb-6" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
        <span className="t-caption" style={{ color: ACCENT }}>
          {tag}
        </span>
        <h3
          className="m-0 t-h3"
          style={{ color: hovered ? ACCENT : INK, transition: `color 200ms ${EASE}` }}
        >
          {title}
        </h3>
        <p className="m-0 t-body" style={{ color: BODY }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function NewsSection() {
  return (
    <section id="recognition" className="px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:py-[120px]" style={{ background: "#F4F8FA" }}>
      <div className="flex flex-col gap-5 md:gap-6 lg:gap-7">
        <div className="t-eyebrow" style={{ color: ACCENT }}>
          Recognition
        </div>
        <h2
          className="m-0 max-w-[720px] t-h2"
          style={{ color: INK }}
        >
          Awards &amp; <span style={{ color: ACCENT }}>recognition</span>.
        </h2>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-8 lg:mt-20 lg:gap-10">
        {AWARDS.map((a) => (
          <AwardCard key={a.title} {...a} />
        ))}
      </div>
    </section>
  );
}
