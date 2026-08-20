"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Mobile routing matrix — from the "Concept 1a Alternating" handoff, whose
   responsive rules call for a "guided accordion at mobile with a Talk to an
   Expert button per row" in place of the three-column table.

   Only this variant needs state, so it is the page's single client island;
   the table for 700px and up is plain server markup.
   ────────────────────────────────────────────────────────────── */

const NAVY = "#0B2A3A";
const CYAN_INK = "#0A6A88";
const BODY = "#41586A";
const MUTED = "#5F7688";
const HAIR = "#D3DFE7";
const SANS = "var(--font-sans)";

const eyebrow = {
  font: `500 13px/1.2 ${SANS}`,
  letterSpacing: ".045em",
  textTransform: "uppercase" as const,
  color: MUTED,
};

export default function RoutingAccordion({ routes }: { routes: readonly (readonly [string, string, string])[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div style={{ borderTop: `1px solid ${NAVY}` }}>
      {routes.map(([part, problem, system]) => {
        const on = open === part;
        return (
          <div key={part} style={{ borderBottom: `1px solid ${HAIR}` }}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : part)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-3.5 border-0 bg-transparent py-4 text-left"
              style={{ minHeight: 60, cursor: "pointer" }}
            >
              <span style={{ font: `500 17px/1.3 ${SANS}`, color: NAVY }}>{part}</span>
              <span
                style={{ color: CYAN_INK, transform: on ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                  <path d="M5 9l7 7 7-7" />
                </svg>
              </span>
            </button>
            {on && (
              <div className="pb-4.5" style={{ paddingBottom: 18 }}>
                <div style={eyebrow}>The core problem</div>
                <div className="mt-1.5" style={{ font: `400 16px/1.55 ${SANS}`, color: BODY }}>{problem}</div>
                <div className="mt-3.5" style={eyebrow}>Start with</div>
                <div className="mt-1.5" style={{ font: `500 17px/1.35 ${SANS}`, color: CYAN_INK }}>{system}</div>
                <a
                  href="#contact"
                  className="mt-4 flex w-full items-center justify-center transition-colors duration-200 hover:!bg-[#12496A]"
                  style={{
                    height: 52,
                    background: NAVY,
                    color: "#fff",
                    font: `500 14px/1.2 ${SANS}`,
                    letterSpacing: ".045em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Talk to an Expert
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
