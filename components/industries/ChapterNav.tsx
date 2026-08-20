"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Chapter nav for /industries/ — from the "V4 Chapters" design
   (project 2e7d7293). A sticky index beside the three primary-industry
   chapters, with the current chapter highlighted as you scroll.

   The design's own rule is kept exactly: the active chapter is the last one
   whose top has passed 220px from the viewport top.

   The design is desktop-only (it declares min-width:1200px and carries no
   media queries), so the small-screen behaviour is ours: below the chapter
   grid's breakpoint the index becomes a horizontally scrollable chip row that
   sticks under the site header, rather than disappearing.
   ────────────────────────────────────────────────────────────── */

const CYAN = "#16C1F3";
const CYAN_INK = "#0A6A88";
const NAVY = "#0B2A3A";
const MUTED = "#5F7688";
const HAIR = "#D3DFE7";
const WHITE = "#FFFFFF";
const SANS = "var(--font-sans)";

export type Chapter = { num: string; label: string; id: string };

export default function ChapterNav({ chapters, note }: { chapters: Chapter[]; note: string }) {
  const [active, setActive] = useState(chapters[0]?.id ?? "");
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      let current = chapters[0]?.id ?? "";
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < 220) current = c.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        read();
      });
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [chapters]);

  return (
    <>
      {/* ── desktop: sticky index column ── */}
      <nav aria-label="Chapters" className="hidden lg:block lg:sticky lg:top-[120px] lg:pt-20">
        <div
          style={{
            font: `500 13px/1.2 ${SANS}`,
            letterSpacing: ".09em",
            textTransform: "uppercase",
            color: MUTED,
            paddingBottom: 18,
          }}
        >
          Chapters
        </div>
        {chapters.map((c) => {
          const on = active === c.id;
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={on ? "true" : undefined}
              className="flex flex-col gap-1.5 py-4 pl-4 no-underline transition-colors duration-200 hover:bg-white"
              style={{ borderLeft: `2px solid ${on ? CYAN : HAIR}` }}
            >
              <span
                style={{
                  font: `600 13px/1 ${SANS}`,
                  letterSpacing: ".045em",
                  color: on ? CYAN_INK : MUTED,
                }}
              >
                {c.num}
              </span>
              <span style={{ font: `500 17px/1.25 ${SANS}`, color: on ? NAVY : MUTED }}>{c.label}</span>
            </a>
          );
        })}
        <div
          className="mt-7 pt-5"
          style={{ borderTop: `1px solid ${HAIR}`, font: `400 15px/1.55 ${SANS}`, color: MUTED }}
        >
          {note}
        </div>
      </nav>

      {/* ── below desktop: a sticky chip row instead of a column ── */}
      <nav
        aria-label="Chapters"
        className="mqs-chapterbar sticky top-[60px] z-20 -mx-[var(--ind-inset)] px-[var(--ind-inset)] md:top-[72px] lg:hidden"
        style={{ background: "rgba(244,248,250,.94)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${HAIR}` }}
      >
        <ul className="mqs-chapterbar-list flex min-w-0 list-none items-stretch gap-5 overflow-x-auto p-0">
          {chapters.map((c) => {
            const on = active === c.id;
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  aria-current={on ? "true" : undefined}
                  className="flex h-12 items-center whitespace-nowrap border-b-2 no-underline transition-colors duration-200"
                  style={{
                    font: `500 13px/1 ${SANS}`,
                    letterSpacing: ".045em",
                    color: on ? CYAN_INK : MUTED,
                    borderBottomColor: on ? CYAN : "transparent",
                  }}
                >
                  <span style={{ color: on ? CYAN_INK : MUTED, marginRight: 8 }}>{c.num}</span>
                  {c.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <span className="sr-only" style={{ color: WHITE }} />
    </>
  );
}
