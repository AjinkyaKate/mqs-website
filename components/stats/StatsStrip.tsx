"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Stats strip — MQS proof numbers. Light band, 5 stats, hairline-
   divided on desktop.

   Motion: `Stats Motion Study.dc.html` → 01 · Count-up.
   • digits ease 0 → target, 1100ms, cubic-bezier(.22,.61,.36,1),
     80ms stagger left → right
   • vertical hairline dividers draw from centre outward (420ms)
   • 2px cyan underline sweeps left → right as each value locks
     (320ms, trailing 320ms behind the count)
   • fires once when the strip is ~35% into the viewport; if already
     on screen at load it still plays once, the frame after paint;
     never replays on scroll-back
   • prefers-reduced-motion: final values render instantly, no motion
   • tabular figures so digit width never jitters; "+" stays static
   ────────────────────────────────────────────────────────────── */

const INK = "#0B2A3A";
const MUTED = "#5F7688";
const CYAN = "#16C1F3";
const HAIRLINE = "rgba(16,16,16,.08)";
const EASE = "cubic-bezier(.22,.61,.36,1)";
const DURATION = 1100;
const STAGGER = 80;

/* Founded 1994. Derived rather than hardcoded: the client's About brief asked for
   the fixed "31 years" to go, because a literal goes stale every January. It was
   already wrong, 1994 to 2026 is 32. */
const FOUNDED = 1994;
const YEARS = new Date().getFullYear() - FOUNDED;

const STATS = [
  { target: YEARS, suffix: "+", label: "Years" },
  { target: 150, suffix: "+", label: "Engineers" },
  { target: 100, suffix: "+", label: "Installations" },
  { target: 8, suffix: "", label: "Cities" },
  { target: 40, suffix: "+", label: "AERB approvals" },
];

const FINALS = STATS.map((s) => s.target);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));

  // trigger: reduced-motion short-circuit, else observe scroll-in
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setCounts(FINALS);
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // count-up ramp (skipped under reduced motion)
  useEffect(() => {
    if (!started || reduced) return;
    let raf = 0;
    const start = performance.now();
    const total = DURATION + (STATS.length - 1) * STAGGER;
    const tick = (now: number) => {
      const elapsed = now - start;
      setCounts(
        STATS.map((s, i) => {
          const local = (elapsed - i * STAGGER) / DURATION;
          const p = local <= 0 ? 0 : local >= 1 ? 1 : easeOutCubic(local);
          return Math.round(s.target * p);
        }),
      );
      if (elapsed < total) raf = requestAnimationFrame(tick);
      else setCounts(FINALS);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduced]);

  return (
    <section ref={ref} className="bg-white px-6 py-14 md:px-10 md:py-16 lg:px-[55px] lg:py-20">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-0">
        {STATS.map((s, i) => {
          const numberDelay = reduced ? 0 : i * STAGGER;
          // column-rule: show a divider only when this cell is NOT the first
          // column of its row — grid is 2-col mobile / 3-col tablet / 5-col desktop.
          const divVis = `${i % 2 !== 0 ? "block" : "hidden"} ${i % 3 !== 0 ? "md:block" : "md:hidden"} lg:block`;
          return (
            <div
              key={s.label}
              className={`relative flex flex-col gap-2 ${i > 0 ? "lg:pl-8" : ""}`}
            >
              {/* vertical divider — draws from centre outward; centred in the
                  column gap on mobile/tablet, flush-left on the 5-col desktop */}
              {i > 0 && (
                <span
                  aria-hidden
                  className={`absolute -left-3 top-0 bottom-0 w-px lg:left-0 ${divVis}`}
                  style={{
                    background: HAIRLINE,
                    transformOrigin: "center",
                    transform: started ? "scaleY(1)" : "scaleY(0)",
                    transition: reduced ? "none" : `transform 420ms ${EASE} ${numberDelay}ms`,
                  }}
                />
              )}

              {/* number + cyan underline sweep */}
              <div className="relative inline-block self-start">
                <span
                  className="t-stat"
                  style={{
                    color: INK,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {counts[i]}
                  {s.suffix}
                </span>
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-1.5 h-0.5 w-full"
                  style={{
                    background: CYAN,
                    transformOrigin: "left",
                    transform: started ? "scaleX(1)" : "scaleX(0)",
                    transition: reduced
                      ? "none"
                      : `transform 320ms ${EASE} ${numberDelay + 320}ms`,
                  }}
                />
              </div>

              <div
                className="t-caption"
                style={{ color: MUTED }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
