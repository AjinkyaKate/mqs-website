"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Scroll-motion primitives — the candidates for a single site-wide set.

   These exist because the site currently has seven scroll-triggered components
   that disagree with each other: three durations (280 / 420 / 900ms), four
   thresholds (0 / 0.12 / 0.25 / 0.35) and two rootMargins, plus one generic
   Reveal in components/services that is imported nowhere. Six of the twelve
   public pages have no scroll motion at all. /motion-lab exists to choose one
   set of values; once chosen, the existing components collapse into these.

   TWO RULES EVERY PRIMITIVE HERE FOLLOWS.

   1 · Content is never hidden by markup. Everything server-renders visible and
       is hidden from script only after mount, so with JavaScript unavailable, or
       with prefers-reduced-motion set, the page is simply the page. A reveal
       that can hide content permanently is a bug, not an effect.

   2 · Transform and opacity only, never height, margin or top. Those are the
       properties the compositor can animate without reflow, so nothing here can
       cause layout shift.

   The lint rule react-hooks/set-state-in-effect is the reason these write to the
   DOM through refs instead of driving visibility from React state: setting state
   synchronously in an effect to un-hide content is exactly the cascading render
   that rule is about.
   ────────────────────────────────────────────────────────────── */

export const EASE = "cubic-bezier(.22,.61,.36,1)";

/* Defaults worth arguing about, which is the point of the lab. */
export const D = {
  distance: 24,
  duration: 420,
  step: 60,
  threshold: 0,
  rootMargin: "0px 0px -8% 0px",
};

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Run `play` once the element first crosses the viewport. Falls straight
 *  through to `play` when motion is off or IntersectionObserver is missing, so
 *  the caller never has to handle the degraded path itself. */
function onFirstView(
  el: HTMLElement,
  play: () => void,
  { threshold = D.threshold, rootMargin = D.rootMargin } = {}
): () => void {
  if (reduced() || !("IntersectionObserver" in window)) {
    play();
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      }
    },
    { threshold, rootMargin }
  );
  io.observe(el);
  /* Backstop: if the observer never fires, nothing stays hidden. */
  const t = window.setTimeout(play, 2500);
  return () => {
    io.disconnect();
    window.clearTimeout(t);
  };
}

function clearInline(el: HTMLElement) {
  el.style.removeProperty("transition");
  el.style.removeProperty("opacity");
  el.style.removeProperty("transform");
  el.style.removeProperty("will-change");
  el.style.removeProperty("clip-path");
}

/* ── 1 · Reveal: fade plus rise ── */

export function Reveal({
  children, delay = 0, distance = D.distance, duration = D.duration,
  threshold, rootMargin, style, className,
}: {
  children: ReactNode; delay?: number; distance?: number; duration?: number;
  threshold?: number; rootMargin?: string; style?: CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    el.style.opacity = "0";
    el.style.transform = `translateY(${distance}px)`;
    el.style.willChange = "opacity, transform";
    const play = () => {
      el.style.transition = `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`;
      el.style.opacity = "1";
      el.style.transform = "none";
      window.setTimeout(() => clearInline(el), duration + delay + 80);
    };
    return onFirstView(el, play, { threshold, rootMargin });
  }, [delay, distance, duration, threshold, rootMargin]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* ── 2 · Stagger: the same reveal, applied to each direct child in turn ── */

export function Stagger({
  children, step = D.step, distance = D.distance, duration = D.duration,
  threshold, rootMargin, style, className,
}: {
  children: ReactNode; step?: number; distance?: number; duration?: number;
  threshold?: number; rootMargin?: string; style?: CSSProperties; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host || reduced()) return;
    const kids = Array.from(host.children) as HTMLElement[];
    for (const k of kids) {
      k.style.opacity = "0";
      k.style.transform = `translateY(${distance}px)`;
      k.style.willChange = "opacity, transform";
    }
    const play = () => {
      kids.forEach((k, i) => {
        const d = i * step;
        k.style.transition = `opacity ${duration}ms ${EASE} ${d}ms, transform ${duration}ms ${EASE} ${d}ms`;
        k.style.opacity = "1";
        k.style.transform = "none";
        window.setTimeout(() => clearInline(k), duration + d + 80);
      });
    };
    return onFirstView(host, play, { threshold, rootMargin });
  }, [step, distance, duration, threshold, rootMargin]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* ── 3 · RuleDraw: a hairline that draws itself in ──
   The most on-brand option available, because the whole design system is built
   on 1px dividers and section rules. */

export function RuleDraw({
  colour = "#0B2A3A", height = 1, duration = 620, delay = 0, origin = "left",
}: { colour?: string; height?: number; duration?: number; delay?: number; origin?: "left" | "center" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    el.style.transform = "scaleX(0)";
    el.style.transformOrigin = origin === "center" ? "50% 50%" : "0% 50%";
    el.style.willChange = "transform";
    const play = () => {
      el.style.transition = `transform ${duration}ms ${EASE} ${delay}ms`;
      el.style.transform = "scaleX(1)";
      window.setTimeout(() => clearInline(el), duration + delay + 80);
    };
    return onFirstView(el, play);
  }, [duration, delay, origin]);
  return <div ref={ref} style={{ height, background: colour, width: "100%" }} />;
}

/* ── 4 · CountUp: figures that run up to their value ──
   Already on three pages at 1100ms with an 80ms stagger, and missing from the
   ATE and MQCT stats strips. */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUp({
  value, unit, prefix, decimals = 0, duration = 1100, delay = 0, style,
}: {
  value: number; unit?: string; prefix?: string; decimals?: number;
  duration?: number; delay?: number; style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) =>
    n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const target = el.querySelector<HTMLElement>("[data-n]");
    if (!target) return;
    target.textContent = fmt(0);
    let raf = 0;
    const play = () => {
      const t0 = performance.now() + delay;
      const tick = (now: number) => {
        const p = Math.min(1, Math.max(0, (now - t0) / duration));
        target.textContent = fmt(value * easeOutCubic(p));
        if (p < 1) raf = requestAnimationFrame(tick);
        else target.textContent = fmt(value);
      };
      raf = requestAnimationFrame(tick);
    };
    const stop = onFirstView(el, play, { threshold: 0.35 });
    return () => { stop(); cancelAnimationFrame(raf); };
    /* fmt is derived from decimals, which is in the dep list */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals, duration, delay]);

  return (
    <span ref={ref} style={style}>
      {prefix}
      {/* server-renders the final value, so no-JS and reduced motion both read correctly */}
      <span data-n>{fmt(value)}</span>
      {unit ? <span> {unit}</span> : null}
    </span>
  );
}

/* ── 5 · ImageWipe: reveal a photograph rather than fade it ── */

export function ImageWipe({
  children, mode = "wipe", duration = 900, delay = 0, style,
}: { children: ReactNode; mode?: "wipe" | "scale"; duration?: number; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const inner = el.firstElementChild as HTMLElement | null;
    if (mode === "wipe") {
      el.style.clipPath = "inset(0 100% 0 0)";
      el.style.willChange = "clip-path";
    } else if (inner) {
      inner.style.transform = "scale(1.04)";
      el.style.opacity = "0";
      el.style.willChange = "opacity";
    }
    const play = () => {
      if (mode === "wipe") {
        el.style.transition = `clip-path ${duration}ms ${EASE} ${delay}ms`;
        el.style.clipPath = "inset(0 0 0 0)";
      } else if (inner) {
        el.style.transition = `opacity ${duration}ms ${EASE} ${delay}ms`;
        inner.style.transition = `transform ${duration * 1.4}ms ${EASE} ${delay}ms`;
        el.style.opacity = "1";
        inner.style.transform = "none";
      }
      window.setTimeout(() => { clearInline(el); if (inner) clearInline(inner); }, duration * 1.4 + delay + 100);
    };
    return onFirstView(el, play);
  }, [mode, duration, delay]);
  return <div ref={ref} style={{ overflow: "hidden", ...style }}>{children}</div>;
}

/* ── 6 · RowCascade: table rows arriving in sequence ──
   Rows animate on opacity and transform only; animating row height would
   reflow the table and shift everything under it. */

export function RowCascade({
  children, step = 45, duration = 380, style, className,
}: { children: ReactNode; step?: number; duration?: number; style?: CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host || reduced()) return;
    const rows = Array.from(host.children) as HTMLElement[];
    for (const r of rows) {
      r.style.opacity = "0";
      r.style.transform = "translateX(-10px)";
      r.style.willChange = "opacity, transform";
    }
    const play = () => {
      rows.forEach((r, i) => {
        const d = i * step;
        r.style.transition = `opacity ${duration}ms ${EASE} ${d}ms, transform ${duration}ms ${EASE} ${d}ms`;
        r.style.opacity = "1";
        r.style.transform = "none";
        window.setTimeout(() => clearInline(r), duration + d + 80);
      });
    };
    return onFirstView(host, play);
  }, [step, duration]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

/* ── 7 · Parallax: scroll-linked drift ──
   Included so it can be judged and, most likely, rejected: on a page a
   procurement engineer is scanning for specifications, drift fights the scan. */

export function Parallax({ children, amount = 40, style }: { children: ReactNode; amount?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        /* -1 at the bottom of the viewport, +1 at the top */
        const p = 1 - (r.top + r.height / 2) / vh * 2;
        el.style.transform = `translate3d(0,${(-p * amount).toFixed(1)}px,0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);
  return <div ref={ref} style={{ willChange: "transform", ...style }}>{children}</div>;
}

/* ── 8 · useScrollSpy: which section is in view ──
   Not decoration. The MQCT and MQX.tracE pages carry sticky section navs with no
   active state, on documents over ten thousand pixels tall. */

export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        let current = ids[0] ?? null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
        }
        setActive(current);
      });
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => {
      window.removeEventListener("scroll", read);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids, offset]);
  return active;
}
