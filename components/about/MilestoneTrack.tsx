"use client";

import { useRef } from "react";
import type { Milestone } from "./about-data";

/* Direction B's milestone treatment: one horizontal track, swiped or scrolled.
   Weighted panels are wider, so 1994 and 2010-11 hold the eye while the
   certification years pass quickly. Arrow buttons appear from tablet up;
   on phones it is swipe only. */

const INK_ON_DARK = "#fff";
const HAIR_DARK = "rgba(255,255,255,.16)";
const NAVY = "#0B2A3A";
const CYAN = "#16C1F3";
const SANS = "var(--font-sans)";
const DISPLAY = "var(--font-display)";
const GUT = "clamp(24px,4vw,55px)";

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="square" aria-hidden="true" style={{ display: "block", transform: flip ? "rotate(180deg)" : undefined }}>
      <path d="M4 12h14M12 5.5 18.5 12 12 18.5" />
    </svg>
  );
}

export default function MilestoneTrack({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (d: number) => ref.current?.scrollBy({ left: d, behavior: "smooth" });

  return (
    <section id="milestones" style={{ background: NAVY, padding: "clamp(56px,6vw,96px) 0" }}>
      <div className="mx-auto flex flex-wrap items-end justify-between"
        style={{ maxWidth: 1330, gap: 24, padding: `0 ${GUT}`, marginBottom: "clamp(32px,4vw,48px)" }}>
        <div style={{ maxWidth: "30ch" }}>
          <div className="t-eyebrow" style={{ color: CYAN }}>Legacy and milestones</div>
          <h2 style={{
            margin: "18px 0 0", font: `600 clamp(26px,3.2vw,38px)/1.12 ${SANS}`,
            letterSpacing: "-.025em", color: INK_ON_DARK, textWrap: "pretty",
          }}>Three Decades. Built One Milestone at a Time.</h2>
        </div>
        <div className="hidden md:flex" style={{ gap: 10 }}>
          {([["Previous milestones", -420, true], ["Next milestones", 420, false]] as const).map(([label, d, flip]) => (
            <button key={label} type="button" aria-label={label} onClick={() => by(d)}
              className="flex items-center justify-center transition-colors duration-200 hover:!border-[#16C1F3]"
              style={{
                width: 52, height: 52, background: "transparent", cursor: "pointer",
                border: `1px solid ${HAIR_DARK}`, color: INK_ON_DARK,
              }}>
              <Arrow flip={flip} />
            </button>
          ))}
        </div>
      </div>

      <div ref={ref} className="overflow-x-auto"
        style={{ scrollSnapType: "x proximity", padding: `0 ${GUT} 8px`, WebkitOverflowScrolling: "touch" }}>
        <div className="mx-auto flex" style={{ gap: "clamp(28px,3.4vw,44px)", maxWidth: 1330, paddingRight: GUT }}>
          {milestones.map((m) => {
            const heavy = m.weight === 2;
            return (
              <article key={m.year} className="flex flex-none flex-col"
                style={{
                  width: heavy ? "clamp(300px,38vw,520px)" : "clamp(238px,24vw,320px)",
                  scrollSnapAlign: "start",
                  borderTop: `2px solid ${heavy ? CYAN : HAIR_DARK}`,
                  paddingTop: "clamp(20px,2.2vw,26px)", gap: 14,
                }}>
                <span style={{
                  font: `800 ${heavy ? "clamp(52px,7vw,76px)" : "clamp(34px,4vw,42px)"}/0.9 ${DISPLAY}`,
                  letterSpacing: "-.04em",
                  color: heavy ? INK_ON_DARK : "rgba(255,255,255,.52)",
                }}>{m.year}</span>
                <h3 style={{
                  margin: 0,
                  font: `500 ${heavy ? "clamp(22px,2.4vw,27px)" : "19px"}/1.25 ${SANS}`,
                  letterSpacing: "-.02em", color: INK_ON_DARK, textWrap: "pretty",
                }}>{m.title}</h3>
                {m.body && (
                  <p style={{
                    margin: 0, font: `400 ${heavy ? 17 : 15}px/1.6 ${SANS}`,
                    color: "rgba(255,255,255,.8)", textWrap: "pretty",
                  }}>{m.body}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
