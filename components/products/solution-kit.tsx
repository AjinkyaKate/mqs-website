"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────────────────────────────
   Shared building blocks for the Solutions product pages
   (MQS.PRISM, MQWR 160U, Microfocus X-ray).

   Every piece here is lifted from an existing product page rather than
   invented: the hero, sticky sub-nav, BenefitGrid and hotspot figure from
   MqxTracE.tsx, the stat strip and two-column spec table from HighEnergy.tsx.
   Those pages keep their own inline copies; this kit exists so the three
   newer pages stay identical to each other without tripling the code.
   ────────────────────────────────────────────────────────────── */

export const EASE = "cubic-bezier(.22,.61,.36,1)";
export const INK = "#0B2A3A", BODY = "#41586A", MUTED = "#5F7688";
export const CYAN = "#16C1F3", CYAN_ON_LIGHT = "#0A6A88", CYAN_ON_DARK = "#5AD1F7";
export const HAIR = "#D3DFE7", HAIR_DARK = "rgba(255,255,255,.14)";
export const PAGE = "#F4F8FA", INSET = "#E9F0F4", WHITE = "#FFFFFF", NAVY = "#0E3A52";
export const SANS = "var(--font-sans)";
export const SHELL = "mx-auto w-full max-w-[1330px] px-6 md:px-10 lg:px-[55px]";

/* No `margin` in these helpers: Tailwind's preflight already zeroes it, and an
   inline margin would silently override every mt-* utility placed beside them. */
export const eyebrow = (color: string) => ({ font: `500 12px/1 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase" as const, color });
export const label = (color: string) => ({ font: `500 11px/1.3 ${SANS}`, letterSpacing: ".08em", textTransform: "uppercase" as const, color });
export const h2 = (color: string) => ({ font: `600 clamp(26px,3.2vw,42px)/1.08 ${SANS}`, letterSpacing: "-.025em", color, textWrap: "pretty" as const });
export const h3 = (color: string) => ({ font: `600 clamp(19px,1.9vw,24px)/1.2 ${SANS}`, letterSpacing: "-.018em", color, textWrap: "pretty" as const });
export const body = (color: string) => ({ font: `400 16px/1.6 ${SANS}`, color, textWrap: "pretty" as const });
export const lead = (color: string) => ({ font: `400 clamp(16px,1.5vw,19px)/1.6 ${SANS}`, color, textWrap: "pretty" as const });

export const btnPrimary: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  height: 48, padding: "0 26px", background: CYAN, color: INK, textDecoration: "none",
  font: `500 13px/1 ${SANS}`, letterSpacing: ".045em", textTransform: "uppercase",
  transition: `background 200ms ${EASE}, color 200ms ${EASE}`,
};
export const btnGhostDark: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  height: 48, padding: "0 26px", background: "transparent", border: "1px solid rgba(255,255,255,.42)",
  color: "#fff", textDecoration: "none", font: `500 13px/1 ${SANS}`,
  letterSpacing: ".045em", textTransform: "uppercase",
};

/* ── hooks ── */

export function useViewport() {
  const [w, setW] = useState(1440);
  useEffect(() => {
    const read = () => setW(window.innerWidth);
    read();
    window.addEventListener("resize", read, { passive: true });
    return () => window.removeEventListener("resize", read);
  }, []);
  return { w, mobile: w < 768, tablet: w >= 768 && w < 1024, compact: w < 1024 };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return reduced;
}

/* Fires once when the element first scrolls into view. Animations start from
   here so they are not spent before anyone is looking at them. */
export function useInViewOnce<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/* ── layout ── */

export function Section({ id, tone = "page", children, ruled = false }: { id?: string; tone?: "page" | "white" | "inset" | "navy" | "ink"; children: React.ReactNode; ruled?: boolean }) {
  const bg = { page: PAGE, white: WHITE, inset: INSET, navy: NAVY, ink: INK }[tone];
  return (
    <section id={id} style={{ background: bg, borderTop: ruled ? `1px solid ${HAIR}` : undefined }} className="scroll-mt-[76px]">
      <div className={`${SHELL} py-14 md:py-20 lg:py-24`}>{children}</div>
    </section>
  );
}

export function SectionHead({ kicker, title, intro, dark = false }: { kicker?: string; title: string; intro?: React.ReactNode; dark?: boolean }) {
  return (
    <>
      {kicker && <p style={eyebrow(dark ? CYAN_ON_DARK : CYAN_ON_LIGHT)}>{kicker}</p>}
      <h2 className={kicker ? "mt-4" : undefined} style={h2(dark ? "#fff" : INK)}>{title}</h2>
      {intro && <p className="mt-4 max-w-[66ch]" style={lead(dark ? "rgba(255,255,255,.80)" : BODY)}>{intro}</p>}
    </>
  );
}

export function SubNav({ items }: { items: [string, string][] }) {
  return (
    <div className="sticky top-0 z-40" style={{ background: WHITE, borderBottom: `1px solid ${HAIR}` }}>
      <div className={`${SHELL} flex gap-6 overflow-x-auto`} style={{ scrollbarWidth: "none" }}>
        {items.map(([text, href]) => (
          <a key={href} href={href} className="shrink-0 whitespace-nowrap no-underline transition-colors duration-200 hover:!text-[#0B2A3A]"
            style={{ ...label(MUTED), display: "flex", alignItems: "center", height: 52 }}>
            {text}
          </a>
        ))}
      </div>
    </div>
  );
}

/* Uppercasing turns "µm" into "ΜM" (capital Greek mu), which reads as
   millimetres. Micro-units are kept out of the transform. */
export function Caps({ text }: { text: string }) {
  const parts = text.split(/(µ\S*)/);
  return <>{parts.map((p, i) => (p.startsWith("µ") ? <span key={i} style={{ textTransform: "none" }}>{p}</span> : p))}</>;
}

export function Badges({ items }: { items: string[] }) {
  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {items.map((b) => (
        <span key={b} className="px-3 py-2" style={{ background: "rgba(255,255,255,.10)", border: "1px solid rgba(255,255,255,.22)", ...label("rgba(255,255,255,.86)") }}>
          <Caps text={b} />
        </span>
      ))}
    </div>
  );
}

export function HeroActions() {
  return (
    <div className="mt-3 flex flex-wrap" style={{ gap: 12 }}>
      <a href="#contact" style={btnPrimary} className="hover:!bg-white">Request a demo</a>
      <a href="#specs" style={btnGhostDark} className="hover:!bg-white/10">See specifications</a>
    </div>
  );
}

/* Navy figure strip, the HighEnergy.tsx idiom. */
export function StatStrip({ stats }: { stats: [string, string][] }) {
  return (
    <section style={{ background: NAVY }}>
      <div className={`${SHELL} py-10 md:py-14`}>
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${HAIR_DARK}`, borderLeft: `1px solid ${HAIR_DARK}` }}>
          {stats.map(([figure, caption]) => (
            <div key={caption} className="flex flex-col gap-3 px-5 pb-7 pt-6 md:px-6" style={{ borderRight: `1px solid ${HAIR_DARK}`, borderBottom: `1px solid ${HAIR_DARK}` }}>
              <div style={{ font: `600 clamp(22px,2.4vw,32px)/1.1 ${SANS}`, letterSpacing: "-.02em", color: "#fff" }}>{figure}</div>
              <div style={label("rgba(255,255,255,.62)")}>{caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Five benefits in a three-column grid leave one empty cell (one in the
   two-column grid too), which the 1px-gap idiom paints as a grey block. The
   slot is filled with a plain white cell so the grid reads as complete. */
export function BenefitGrid({ items }: { items: [string, string, string][] }) {
  const fill = items.length % 2 === 1 && items.length % 3 !== 0;
  return (
    <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
      {items.map(([n, t, d]) => (
        <div key={n} className="p-6" style={{ background: WHITE }}>
          <div style={{ font: `600 13px/1 ${SANS}`, letterSpacing: ".08em", color: CYAN_ON_LIGHT }}>{n}</div>
          <h3 className="mt-3.5" style={{ ...h3(INK), fontSize: 19 }}>{t}</h3>
          <p className="mt-2.5" style={{ ...body(BODY), fontSize: 15 }}>{d}</p>
        </div>
      ))}
      {fill && <div aria-hidden className="max-md:hidden" style={{ background: WHITE }} />}
    </div>
  );
}

/* ── hotspot figure (MqxTracE "System features at a glance") ──
   A pin with no position renders in the list only. Software features have no
   honest place to point at on a photograph of hardware. */

export type Hotspot = { id: string; title: string; desc: string; at?: [number, number] };

export function HotspotFigure({ src, alt, aspect, items, fit = "cover", ground = INSET }: {
  src: string; alt: string; aspect: string; items: Hotspot[]; fit?: "cover" | "contain"; ground?: string;
}) {
  const { compact } = useViewport();
  const [active, setActive] = useState(0);
  return (
    <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
      <div className="relative self-start" style={{ background: ground, aspectRatio: aspect }}>
        <Image src={src} alt={alt} fill quality={90} sizes="(min-width:1024px) 55vw, 100vw" className={fit === "cover" ? "object-cover" : "object-contain"} />
        {items.map((h, i) => {
          if (!h.at) return null;
          const on = active === i;
          return (
            <button
              key={h.id}
              type="button"
              aria-label={`${h.id}: ${h.title}`}
              aria-pressed={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="absolute z-[4] grid h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center p-0"
              style={{
                left: `${h.at[0]}%`, top: `${h.at[1]}%`,
                border: `1px solid ${on ? CYAN : INK}`,
                background: on ? CYAN : "rgba(255,255,255,.94)",
                color: on ? "#08283A" : INK,
                font: `600 12px/1 ${SANS}`,
                boxShadow: on ? `0 0 0 6px rgba(22,193,243,.28), 0 3px 12px rgba(8,40,58,.18)` : "0 3px 12px rgba(8,40,58,.18)",
                transition: `background 200ms ${EASE}, border-color 200ms ${EASE}, color 200ms ${EASE}, box-shadow 200ms ${EASE}`,
              }}
            >
              {h.id}
            </button>
          );
        })}
      </div>
      <div style={{ borderTop: `1px solid ${HAIR}` }}>
        {items.map((h, i) => {
          const on = active === i;
          return (
            <button
              key={h.id}
              type="button"
              aria-pressed={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="grid w-full cursor-pointer grid-cols-[30px_1fr] gap-4 border-0 px-4 py-5 text-left"
              style={{ borderBottom: `1px solid ${HAIR}`, background: on ? "#EAF6FB" : "transparent", transition: `background 200ms ${EASE}` }}
            >
              <span className="grid h-[30px] w-[30px] place-items-center" style={{
                border: `1px solid ${on ? CYAN : HAIR}`, background: on ? CYAN : "transparent",
                color: on ? "#08283A" : CYAN_ON_LIGHT, font: `600 13px/1 ${SANS}`,
              }}>{h.id}</span>
              <span>
                <span className="block" style={{ ...h3(INK), fontSize: 18 }}>{h.title}</span>
                {(!compact || on) && <span className="mt-2 block" style={{ ...body(BODY), fontSize: 15 }}>{h.desc}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── tags and industry cards ── */

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap" style={{ gap: 10 }}>
      {items.map((t) => (
        <span key={t} style={{ padding: "9px 16px", background: WHITE, border: `1px solid ${HAIR}`, font: `500 13px/1.2 ${SANS}`, color: INK }}>{t}</span>
      ))}
    </div>
  );
}

export type IndustryLink = { name: string; note?: string; href?: string };

export function IndustryCards({ items }: { items: IndustryLink[] }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`} style={{ gap: 1, background: HAIR, border: `1px solid ${HAIR}` }}>
      {items.map((it) => {
        const inner = (
          <>
            <span style={{ ...h3(INK), fontSize: 18 }}>{it.name}</span>
            {it.note && <span className="mt-2 block" style={{ ...body(BODY), fontSize: 14 }}>{it.note}</span>}
            {it.href && <span className="mt-auto block pt-5" style={label(CYAN_ON_LIGHT)}>Industry page <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span></span>}
          </>
        );
        return it.href ? (
          <a key={it.name} href={it.href} className="group flex flex-col p-6 no-underline transition-colors duration-200 hover:!bg-[#EAF6FB]" style={{ background: WHITE, minHeight: 120 }}>{inner}</a>
        ) : (
          <div key={it.name} className="flex flex-col p-6" style={{ background: WHITE, minHeight: 120 }}>{inner}</div>
        );
      })}
    </div>
  );
}

/* ── spec tables (HighEnergy.tsx table, extended to N value columns) ── */

const th: React.CSSProperties = { textAlign: "left", padding: "16px 20px", background: "#EAF1F5", borderBottom: `1px solid ${HAIR}`, font: `500 11px/1.2 ${SANS}`, letterSpacing: ".09em", textTransform: "uppercase", color: MUTED };

export function SpecTable({ title, head, rows, highlightCol }: { title?: string; head: string[]; rows: string[][]; highlightCol?: number }) {
  return (
    <div>
      {title && <h3 className="mb-[18px]" style={{ ...h3(INK), fontSize: 20 }}>{title}</h3>}
      <div className="overflow-x-auto" style={{ border: `1px solid ${HAIR}`, background: WHITE }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: head.length > 2 ? 520 : 420 }}>
          <thead>
            <tr>{head.map((h, i) => <th key={h} style={{ ...th, ...(highlightCol === i ? { background: "#D7EEF7", color: INK } : null) }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r[0]} style={{ background: ri % 2 ? "#F7FAFC" : WHITE }}>
                {r.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: "14px 20px", borderBottom: `1px solid ${HAIR}`,
                    font: `${ci === 0 ? 500 : 400} 15px/1.5 ${SANS}`, color: ci === 0 ? INK : BODY,
                    background: highlightCol === ci ? "rgba(22,193,243,.08)" : undefined,
                    transition: `background 200ms ${EASE}`,
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── downloads + related solutions ── */

export type Download = { name: string; note?: string; href?: string; status?: string };
export type Related = { name: string; note?: string; href: string };

export function DownloadsAndRelated({ downloads, related, downloadsTitle = "Downloads", relatedTitle = "Helpful Links" }: {
  downloads: Download[]; related?: Related[]; downloadsTitle?: string; relatedTitle?: string;
}) {
  return (
    <div className={`grid grid-cols-1 gap-12 ${related ? "lg:grid-cols-2" : ""} lg:gap-16`}>
      <div className={related ? undefined : "max-w-[640px]"}>
        <h2 style={{ ...h2(INK), fontSize: "clamp(24px,2.4vw,32px)" }}>{downloadsTitle}</h2>
        <div className="mt-7" style={{ borderTop: `1px solid ${INK}` }}>
          {downloads.map((d) => {
            const row = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center" style={{ background: d.href ? CYAN : INSET, color: INK }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" aria-hidden>
                    {d.href ? <path d="M12 4v11M7 10l5 5 5-5M5 20h14" /> : <path d="M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />}
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block" style={{ font: `600 16px/1.3 ${SANS}`, color: INK }}>{d.name}</span>
                  {d.note && <span className="mt-1 block" style={{ ...body(MUTED), fontSize: 14 }}>{d.note}</span>}
                </span>
                {d.status && <span className="shrink-0" style={label(MUTED)}>{d.status}</span>}
              </>
            );
            return d.href ? (
              <a key={d.name} href={d.href} target={d.href.endsWith(".pdf") ? "_blank" : undefined} rel="noopener noreferrer"
                className="flex items-center gap-4 py-4 no-underline transition-colors duration-200 hover:!bg-[#EAF6FB]" style={{ borderBottom: `1px solid ${HAIR}` }}>{row}</a>
            ) : (
              <div key={d.name} className="flex items-center gap-4 py-4" style={{ borderBottom: `1px solid ${HAIR}` }}>{row}</div>
            );
          })}
        </div>
      </div>
      {related && <div>
        <h2 style={{ ...h2(INK), fontSize: "clamp(24px,2.4vw,32px)" }}>{relatedTitle}</h2>
        <div className="mt-7" style={{ borderTop: `1px solid ${INK}` }}>
          {related.map((r) => (
            <a key={r.name} href={r.href} className="group flex items-center gap-4 py-4 no-underline" style={{ borderBottom: `1px solid ${HAIR}` }}>
              <span className="min-w-0 flex-1">
                <span className="block transition-colors duration-200 group-hover:!text-[#0A6A88]" style={{ font: `600 16px/1.3 ${SANS}`, color: INK }}>{r.name}</span>
                {r.note && <span className="mt-1 block" style={{ ...body(MUTED), fontSize: 14 }}>{r.note}</span>}
              </span>
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: CYAN_ON_LIGHT, fontSize: 18 }}>→</span>
            </a>
          ))}
        </div>
      </div>}
    </div>
  );
}

/* ── lightbox (MqxTracE) ── */

export type Zoomable = { src: string; w: number; h: number; label: string; note?: string; alt: string };

export function Lightbox({ shot, onClose }: { shot: Zoomable | null; onClose: () => void }) {
  useEffect(() => {
    if (!shot) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [shot, onClose]);
  if (!shot) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={shot.label} onClick={onClose}
      className="fixed inset-0 z-[100] flex cursor-zoom-out flex-col items-center justify-center p-4 md:p-10" style={{ background: "rgba(6,22,31,.94)" }}>
      <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} quality={95} sizes="100vw" className="max-h-[80vh] w-auto max-w-full object-contain" style={{ height: "auto" }} />
      <p className="mt-5 max-w-[70ch] text-center">
        <span style={{ font: `500 16px/1.4 ${SANS}`, color: "#fff" }}>{shot.label}</span>
        {shot.note && <span className="mt-1 block" style={{ ...body("rgba(255,255,255,.72)"), fontSize: 14 }}>{shot.note}</span>}
      </p>
      <button type="button" onClick={onClose} className="mt-5 border-0 bg-transparent" style={{ ...label("rgba(255,255,255,.7)"), cursor: "pointer" }}>Close (esc)</button>
    </div>
  );
}

export function ZoomIcon() {
  return (
    <span aria-hidden className="absolute bottom-2.5 right-2.5 flex items-center justify-center" style={{ width: 34, height: 34, background: CYAN, color: INK }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square">
        <circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6" />
      </svg>
    </span>
  );
}
