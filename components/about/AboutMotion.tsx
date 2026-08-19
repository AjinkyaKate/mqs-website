"use client";

import { useEffect } from "react";

/* ──────────────────────────────────────────────────────────────
   Reveal on scroll for the About page — ported from
   `MQS About - Interactive.dc.html`, where it is the feature behind the
   prototype's "Reveal on scroll: On / Off" control.

   The designer's values, kept exactly: every section except the first starts
   at opacity 0 and 24px down, and animates in over 420ms on an ease-out
   cubic when its top crosses 92% of the viewport.

   Two departures from the prototype's implementation, not its behaviour:
   the prototype polled with setInterval and drove opacity frame by frame,
   which it had to do inside the canvas; here an IntersectionObserver fires a
   CSS transition. And the inline opacity/transform are removed once the
   transition ends, so no section is left holding a transform — a lingering
   transform would become the containing block for the page's absolutely
   positioned pieces, such as the hero's stats strip.

   This applies styles from script rather than from CSS on purpose: with
   JavaScript unavailable the sections simply render visible, so the reveal
   can never hide content. prefers-reduced-motion skips it entirely.
   ────────────────────────────────────────────────────────────── */

const RISE = 24;
const DUR = 420;
const EASE = "cubic-bezier(.22,.61,.36,1)";

export default function AboutMotion() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const all = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    /* The first section is the hero and is never hidden. */
    const targets = all.slice(1);
    if (!targets.length) return;

    const clear = (el: HTMLElement) => {
      el.style.removeProperty("transition");
      el.style.removeProperty("opacity");
      el.style.removeProperty("transform");
      el.style.removeProperty("will-change");
    };

    const timers: number[] = [];
    const show = (el: HTMLElement) => {
      if (el.dataset.mqsShown === "1") return;
      el.dataset.mqsShown = "1";
      el.style.transition = `opacity ${DUR}ms ${EASE}, transform ${DUR}ms ${EASE}`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      timers.push(window.setTimeout(() => clear(el), DUR + 80));
    };

    for (const el of targets) {
      el.style.willChange = "opacity, transform";
      el.style.opacity = "0";
      el.style.transform = `translateY(${RISE}px)`;
    }

    if (!("IntersectionObserver" in window)) {
      for (const el of targets) show(el);
      return () => targets.forEach(clear);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      /* the designer's trigger line: 92% down the viewport */
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    for (const el of targets) io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(window.clearTimeout);
      for (const el of targets) {
        delete el.dataset.mqsShown;
        clear(el);
      }
    };
  }, []);

  return null;
}
