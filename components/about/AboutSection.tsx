"use client";

import { useState } from "react";
import Image from "next/image";
import BackgroundVideo from "@/components/media/BackgroundVideo";

/* ──────────────────────────────────────────────────────────────
   About Section 3A — ported from `About Section 3A.dc.html`.
   Palette 2B (steel navy, cyan accent). Layout, video play/pause and
   responsive behavior unchanged; colors remapped: navy Learn-more
   button, cyan-700 #0A6A88 heading accent, navy dark band.

   The dark band uses a self-hosted muted background video
   (BackgroundVideo): reliable mobile autoplay, plays while the band is
   in view, and is toggled by the existing play/pause button.
   ────────────────────────────────────────────────────────────── */

const BAND_VIDEO = "/assets/about-band.mp4";

const ACCENT = "#0A6A88"; // cyan-700 — AA on light
const PRIMARY = "#0E3A52";
const ON_PRIMARY = "#FFFFFF";
const INK = "#0B2A3A";
const BODY = "#41586A";
const MUTED = "#5F7688";
const SURFACE = "#F4F8FA";
const DARK = "#0B2A3A";
const RULE_DARK = "rgba(255,255,255,.14)";

const EYEBROW = "About MQS";
const LEARN_MORE = "Learn more";
const HEADLINE = (
  <>
    Precision inspection, <span style={{ color: ACCENT }}>engineered in-house</span> since 1994.
  </>
);
const PARAGRAPH =
  "MQS Technologies builds advanced non-destructive testing, automated inspection and electrical test systems for mission-critical industries.";
const BAND_HEADLINE = "Designed, built and supported in-house.";
const BAND_LABEL = "Made in Hyderabad";
const BAND_PARAGRAPH =
  "Every MQS system is engineered, assembled and validated at our Hyderabad facility before installation.";
const BAND_CAPTION = "Inside the MQS plant";

function PlayPauseButton({
  playing,
  onClick,
  className = "",
}: {
  playing: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={playing ? "Pause video" : "Play video"}
      className={`flex h-12 w-12 flex-none items-center justify-center gap-1 rounded-none transition-colors duration-200 hover:bg-white/10 ${className}`}
      style={{ border: `1px solid ${RULE_DARK}` }}
    >
      {playing ? (
        <>
          <span className="block h-[14px] w-[3px] bg-white" />
          <span className="block h-[14px] w-[3px] bg-white" />
        </>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="#fff" />
        </svg>
      )}
    </button>
  );
}

export default function AboutSection() {
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying((p) => !p);

  const learnMore = (
    <a
      href="/products"
      className="t-button flex h-12 items-center justify-center rounded-none no-underline transition-colors duration-200 hover:!bg-[#0A2B3D] hover:!text-white"
      style={{
        background: PRIMARY,
        color: ON_PRIMARY,
      }}
    >
      {LEARN_MORE}
    </a>
  );

  return (
    <section id="about">
      {/* ══════════════ DESKTOP (≥1024) ══════════════ */}
      <div className="hidden lg:block">
        {/* intro + gallery */}
        <div style={{ background: SURFACE, padding: "120px 55px" }}>
          <div
            className="grid items-start"
            style={{ gridTemplateColumns: "1fr 2fr", gap: 24, paddingBottom: 72 }}
          >
            <div
              className="t-eyebrow"
              style={{ color: MUTED, paddingTop: 18 }}
            >
              {EYEBROW}
            </div>
            <h2
              className="t-h2 m-0"
              style={{ color: INK }}
            >
              {HEADLINE}
            </h2>
          </div>

          <div
            className="grid items-start"
            style={{ gridTemplateColumns: "0.8fr 1.45fr 0.85fr", gap: 24 }}
          >
            {/* col 1 — tall portrait + Learn more */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden" style={{ aspectRatio: "3 / 4.5", background: DARK }}>
                <Image
                  src="/assets/about-entrance.jpg"
                  alt="MQS Technologies office entrance"
                  width={400}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              {learnMore}
            </div>

            {/* col 2 — large centre */}
            <div className="overflow-hidden" style={{ aspectRatio: "1 / 1.08", background: DARK }}>
              <Image
                src="/assets/about-banner.jpg"
                alt="Engineers operating an MQS X-ray and CT inspection system"
                width={800}
                height={864}
                className="h-full w-full object-cover"
              />
            </div>

            {/* col 3 — medium + paragraph */}
            <div className="flex flex-col gap-7">
              <div className="overflow-hidden" style={{ aspectRatio: "4 / 3.2", background: DARK }}>
                <Image
                  src="/assets/about-office.jpg"
                  alt="MQS engineering team at work"
                  width={400}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="t-body m-0" style={{ color: BODY }}>
                {PARAGRAPH}
              </p>
            </div>
          </div>
        </div>

        {/* dark video band */}
        <div className="relative overflow-hidden" style={{ background: DARK, height: 660 }}>
          <BackgroundVideo src={BAND_VIDEO} playing={playing} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(11,42,58,.6)" }} />
          <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "72px 55px" }}>
            <div className="flex items-start justify-between gap-20">
              <h3
                className="t-h2 m-0 text-white"
                style={{ maxWidth: 740 }}
              >
                {BAND_HEADLINE}
              </h3>
              <div
                className="t-caption whitespace-nowrap"
                style={{ color: "rgba(255,255,255,.7)", paddingTop: 14 }}
              >
                {BAND_LABEL}
              </div>
            </div>
            <div className="flex items-end justify-between gap-20">
              <div className="flex items-center gap-5">
                <PlayPauseButton playing={playing} onClick={toggle} />
                <div
                  className="t-caption"
                  style={{ color: "rgba(255,255,255,.7)", maxWidth: 240 }}
                >
                  {BAND_CAPTION}
                </div>
              </div>
              <p
                className="t-body m-0 text-right"
                style={{ color: "rgba(255,255,255,.66)", maxWidth: 340 }}
              >
                {BAND_PARAGRAPH}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ TABLET + PHONE (<1024) ══════════════ */}
      <div className="lg:hidden">
        {/* intro — single image, paragraph under heading */}
        <div className="flex flex-col gap-7 px-6 py-16 md:gap-8 md:px-10 md:py-[88px]" style={{ background: SURFACE }}>
          <div
            className="t-eyebrow"
            style={{ color: MUTED }}
          >
            {EYEBROW}
          </div>
          <h2
            className="t-h2 m-0"
            style={{ color: INK }}
          >
            {HEADLINE}
          </h2>
          <p
            className="t-body m-0 md:max-w-[600px]"
            style={{ color: BODY }}
          >
            {PARAGRAPH}
          </p>
          <div className="mt-1 aspect-[3/4] overflow-hidden md:mt-2 md:aspect-[16/9]" style={{ background: DARK }}>
            <Image
              src="/assets/about-banner.jpg"
              alt="Engineers operating an MQS X-ray and CT inspection system"
              width={800}
              height={864}
              className="h-full w-full object-cover"
            />
          </div>
          <a
            href="/products"
            className="t-button flex h-12 items-center justify-center self-start rounded-none px-6 no-underline transition-colors duration-200 hover:!bg-[#0A2B3D] hover:!text-white md:w-[220px] md:px-0"
            style={{
              background: PRIMARY,
              color: ON_PRIMARY,
            }}
          >
            {LEARN_MORE}
          </a>
        </div>

        {/* dark video band — stacked */}
        <div className="relative h-[600px] overflow-hidden md:h-[620px]" style={{ background: DARK }}>
          <BackgroundVideo src={BAND_VIDEO} playing={playing} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "rgba(11,42,58,.64)" }} />
          <div className="absolute inset-0 flex flex-col gap-6 px-6 py-12 md:gap-8 md:px-10 md:py-14">
            <div
              className="t-caption"
              style={{ color: "rgba(255,255,255,.7)" }}
            >
              {BAND_LABEL}
            </div>
            <h3
              className="t-h2 m-0 text-white"
            >
              {BAND_HEADLINE}
            </h3>
            <p
              className="t-body m-0 md:max-w-[520px]"
              style={{ color: "rgba(255,255,255,.66)" }}
            >
              {BAND_PARAGRAPH}
            </p>
            <div className="mt-auto flex items-center gap-4">
              <PlayPauseButton playing={playing} onClick={toggle} />
              <div
                className="t-caption"
                style={{ color: "rgba(255,255,255,.7)" }}
              >
                {BAND_CAPTION}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
