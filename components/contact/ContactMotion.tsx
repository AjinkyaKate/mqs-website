"use client";

import { useEffect } from "react";

/* ──────────────────────────────────────────────────────────────
   Reveal for the /contact sections below the fold, from the motion spec in
   "MQS-Contact-Responsive.dc.html": the same mqsRise keyframe as the hero,
   fired on first intersection at a 12% threshold, once only, with the
   department cards staggered 60 / 120 / 180ms.

   Above the fold nothing is observed. Those blocks animate straight from CSS on
   load with their own delays (breadcrumb 40, headline 80, form 140, ledger 160,
   CTAs 220), because a conversion page must not wait on JavaScript to show its
   form.

   Applied from script rather than from CSS, following AboutMotion: with
   JavaScript unavailable every section simply renders visible, so the reveal can
   never hide content. The design's own implementation carries a 1200ms timer as
   a backstop in case IntersectionObserver never fires; that is kept.
   ────────────────────────────────────────────────────────────── */

const SELECTOR = "[data-reveal]";

export default function ContactMotion() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (!targets.length) return;

    const hide = (el: HTMLElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.willChange = "opacity, transform";
    };
    const show = (el: HTMLElement) => {
      const delay = Number(el.dataset.reveal) || 0;
      el.style.transition = `opacity 420ms cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 420ms cubic-bezier(.22,.61,.36,1) ${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "none";
      /* Drop the inline transform once it has run: a lingering transform would
         become the containing block for anything absolutely positioned inside. */
      window.setTimeout(() => {
        el.style.removeProperty("transition");
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("will-change");
      }, 420 + delay + 60);
    };

    targets.forEach(hide);
    const backstop = window.setTimeout(() => targets.forEach(show), 1200);

    if (!("IntersectionObserver" in window)) {
      targets.forEach(show);
      return () => window.clearTimeout(backstop);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.clearTimeout(backstop);
      io.disconnect();
    };
  }, []);

  return null;
}
