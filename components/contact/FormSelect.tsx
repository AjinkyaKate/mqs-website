"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────
   Form Select — ported from `Form Select.dc.html`.
   Underline select field for the MQS contact form: same 48px control
   height, micro-label and hairline rhythm as the text inputs. The
   only additions are a flush-right chevron and a hairline menu panel
   welded to the field by a 2px cyan top edge. Palette 2B.

   Two variants, one shared value (.dc mobile note B):
   • DESKTOP (md+) — custom dropdown: 48px control, transparent, bottom
     rule only (cyan when open); placeholder muted #5F7688, value ink
     #0B2A3A; chevron muted→ink, rotates 180° open; menu 1px hairline +
     2px cyan top edge, zero radius, no shadow, 44px rows, hover #F4F8FA
     + ink, selected row ink + #F4F8FA + cyan check; overlays content;
     click-outside / Escape close.
   • MOBILE (<md) — native OS picker: same underline shell, native
     <select> inside so the OS wheel/sheet handles the list; flush-right
     chevron, cyan rule on focus.
   200ms colour cross-fades only.
   ────────────────────────────────────────────────────────────── */

const HAIRLINE = "#D3DFE7";
const CYAN = "#16C1F3";
const INK = "#0B2A3A";
const BODY = "#41586A";
const MUTED = "#5F7688";
const HOVER = "#F4F8FA";
const EASE = "cubic-bezier(.22,.61,.36,1)";

type Props = {
  placeholder: string;
  options: string[];
  name?: string;
};

export default function FormSelect({ placeholder, options, name }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filled = value != null;

  return (
    <div ref={ref} className="relative">
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      {/* MOBILE (<md) — native OS picker inside the underline shell */}
      <div className="relative md:hidden">
        <select
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value || null)}
          className="t-body h-12 w-full cursor-pointer appearance-none border-0 bg-transparent pr-7 outline-none transition-colors duration-200 focus:!border-b-[#16C1F3]"
          style={{
            borderBottom: `1px solid ${HAIRLINE}`,
            color: filled ? INK : MUTED,
          }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="t-body" style={{ color: INK }}>
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke={filled ? INK : MUTED}
          strokeWidth="1.6"
          strokeLinecap="square"
        >
          <path d="M4 6.5l5 5 5-5" />
        </svg>
      </div>

      {/* DESKTOP (md+) — custom dropdown */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="hidden h-12 w-full items-center justify-between border-0 bg-transparent p-0 text-left outline-none md:flex"
        style={{
          borderBottom: `1px solid ${open ? CYAN : HAIRLINE}`,
          cursor: "pointer",
          transition: `border-color 200ms ${EASE}`,
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="t-body" style={{ color: filled ? INK : MUTED }}>
          {value ?? placeholder}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke={open || filled ? INK : MUTED}
          strokeWidth="1.6"
          strokeLinecap="square"
          style={{
            flex: "none",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: `transform 200ms ${EASE}`,
          }}
        >
          <path d="M4 6.5l5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 hidden flex-col overflow-auto md:flex"
          style={{
            maxHeight: 264,
            background: "#fff",
            border: `1px solid ${HAIRLINE}`,
            borderTop: `2px solid ${CYAN}`,
          }}
        >
          {options.map((o) => {
            const selected = o === value;
            const active = selected || hovered === o;
            return (
              <div
                key={o}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setValue(o);
                  setOpen(false);
                }}
                onMouseEnter={() => setHovered(o)}
                onMouseLeave={() => setHovered((h) => (h === o ? null : h))}
                className="t-body flex h-12 flex-none items-center justify-between px-4 md:h-11"
                style={{
                  cursor: "pointer",
                  color: active ? INK : BODY,
                  background: active ? HOVER : "transparent",
                  transition: "background 200ms, color 200ms",
                }}
              >
                <span>{o}</span>
                {selected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke={CYAN}
                    strokeWidth="2"
                    strokeLinecap="square"
                    style={{ flex: "none" }}
                  >
                    <path d="M3 8.5l3.5 3.5L13 4.5" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
