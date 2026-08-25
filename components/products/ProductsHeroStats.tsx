"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Products hero stats — count-up (`Stats Motion Study.dc.html` → 01),
   adapted to the dark hero band: white numbers, cyan underline sweep.
   • digits ease 0 → target, 1100ms, cubic-bezier(.22,.61,.36,1),
     80ms stagger left → right
   • 2px cyan underline sweeps in, trailing 320ms behind each count
   • vertical column-rule dividers draw from centre outward (420ms),
     shown only where a cell isn't the first column of its row —
     grid is 2-col (mobile/tablet) / 4-col (desktop); top rule kept
   • fires once at ~35% into view (on-load if already visible)
   • prefers-reduced-motion: final values instantly, no motion
   • tabular figures; "+" stays static
   ────────────────────────────────────────────────────────────── */

const CYAN = "#16C1F3";
const RULE_DARK = "rgba(255,255,255,.14)";
const EASE = "cubic-bezier(.22,.61,.36,1)";
const DURATION = 1100;
const STAGGER = 80;

const STATS = [
  { target: 14, suffix: "", label: "NDT product lines" },
  { target: 3, suffix: "", label: "ATE categories" },
  { target: 200, suffix: "+", label: "Installations" },
];
const FINALS = STATS.map((s) => s.target);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ProductsHeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [counts, setCounts] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => {
        setReduced(true);
        setCounts(FINALS);
        setStarted(true);
      });
      return () => cancelAnimationFrame(frame);
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
    <div
      ref={ref}
      className="relative mt-10 grid grid-cols-1 border-t sm:grid-cols-3 md:mt-14 lg:mt-20"
      style={{ borderColor: RULE_DARK }}
    >
      {STATS.map((s, i) => {
        return (
        <div key={s.label} className="relative px-6 py-5 md:px-10 md:py-6 lg:py-8">
          {i > 0 && (
            <span
              aria-hidden
              className="absolute bottom-0 left-0 top-0 hidden w-px sm:block"
              style={{
                background: RULE_DARK,
                transformOrigin: "center",
                transform: started ? "scaleY(1)" : "scaleY(0)",
                transition: reduced ? "none" : `transform 420ms ${EASE} ${i * STAGGER}ms`,
              }}
            />
          )}
          <div className="relative inline-block">
            <div
              className="text-[26px] text-white md:text-[30px] lg:text-[34px]"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "-.025em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
            >
              {counts[i]}
              {s.suffix}
            </div>
            <span
              aria-hidden
              className="absolute left-0 -bottom-1 h-0.5 w-full"
              style={{
                background: CYAN,
                transformOrigin: "left",
                transform: started ? "scaleX(1)" : "scaleX(0)",
                transition: reduced ? "none" : `transform 320ms ${EASE} ${i * STAGGER + 320}ms`,
              }}
            />
          </div>
          <div className="t-caption mt-2" style={{ color: "rgba(255,255,255,.60)" }}>
            {s.label}
          </div>
        </div>
        );
      })}
    </div>
  );
}
