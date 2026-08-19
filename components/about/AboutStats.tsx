"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FOUNDED, STATS } from "./about-data";

/* ──────────────────────────────────────────────────────────────
   About hero stats — the design's five-figure strip, with the count-up the
   client asked for so it behaves the same as the home page.

   Motion copied from components/stats/StatsStrip.tsx so the two strips match:
   digits ease 0 → target over 1100ms on an ease-out cubic with an 80ms
   stagger left to right, fired once when the strip is 35% into the viewport,
   never replayed on scroll-back, and short-circuited to the final values under
   prefers-reduced-motion. Figures are tabular so digit width never jitters and
   the suffix stays put.

   The home page also sweeps a cyan underline under each figure and draws its
   dividers from the centre outward. Neither is carried over: the About design
   gives these cells their own hairline borders, and an underline would fight
   them.

   The figures are seeded at their final values so the server-rendered HTML
   carries the real numbers, not zeros: crawlers and anyone without JavaScript
   see "32+ / 150+ / 8 / 100+ / 40+". They are reset to zero in a layout effect,
   which runs before the browser paints, so the ramp still starts from nothing
   with no flash of the final values.

   Layout, type and colour are unchanged from the design: 30 / 32 / 44px
   Archivo, cyan at mobile and tablet, white on the photograph at desktop.
   ────────────────────────────────────────────────────────────── */

const DISPLAY = "var(--font-display)";
const SANS = "var(--font-sans)";
const DURATION = 1100;
const STAGGER = 80;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const targetOf = (s: (typeof STATS)[number]) =>
  s.target ?? new Date().getFullYear() - (s.fromYear ?? FOUNDED);

/* useLayoutEffect on the client, useEffect on the server, so seeding the zeros
   happens before paint without React warning during server rendering. */
const useBeforePaint = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  /* seeded at the finals for SSR, zeroed before paint on the client */
  const [counts, setCounts] = useState<number[]>(() => STATS.map(targetOf));
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useBeforePaint(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCounts(STATS.map(() => 0));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setCounts(STATS.map(targetOf));
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

  useEffect(() => {
    if (!started || reduced) return;
    const targets = STATS.map(targetOf);
    const total = DURATION + (STATS.length - 1) * STAGGER;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      setCounts(
        targets.map((t, i) => {
          const local = (elapsed - i * STAGGER) / DURATION;
          const pr = local <= 0 ? 0 : local >= 1 ? 1 : easeOutCubic(local);
          return Math.round(t * pr);
        }),
      );
      if (elapsed < total) raf = requestAnimationFrame(tick);
      else setCounts(targets);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduced]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 border-t border-white/18 md:grid-cols-3 md:border-t-0 lg:grid-cols-5 lg:border-t lg:border-white/28"
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className="border-b border-white/14 py-[18px] md:border-white/16 md:py-[22px] lg:border-b-0 lg:border-l lg:border-white/18 lg:px-[26px] lg:py-0 lg:pb-[34px] lg:pt-7"
        >
          <div
            className="font-extrabold leading-none tracking-[-.035em] text-[30px] text-[#16C1F3] md:text-[32px] lg:text-[44px] lg:tracking-[-.04em] lg:text-white"
            style={{ fontFamily: DISPLAY, fontVariantNumeric: "tabular-nums" }}
          >
            {counts[i]}
            {s.suffix}
          </div>
          <div
            className="mt-1.5 font-medium uppercase leading-[1.3] tracking-[.045em] text-[10px] text-white/70 lg:mt-2 lg:text-[11px]"
            style={{ fontFamily: SANS }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
