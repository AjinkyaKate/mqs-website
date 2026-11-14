/* ──────────────────────────────────────────────────────────────
   Get In Touch (dark) — ported from `Get In Touch Dark.dc.html`.
   The Industry / Application fields use the FormSelect dropdown
   (`Form Select.dc.html`); other fields are underline text inputs.
   Full-bleed navy band over a dark photo: left intro + 6 category chips,
   right a white form card (2px cyan top edge) with underline-style fields
   in a 2-col grid. Palette 2B. Static UI (no submit logic); the cyan
   underline is a real CSS :focus state. Stacks below from tablet down.
   ────────────────────────────────────────────────────────────── */

"use client";

import { useEffect, useActionState } from "react";
import { trackEvent } from "@/lib/analytics";
import BackgroundVideo from "@/components/media/BackgroundVideo";
import { submitContactForm } from "@/lib/actions/enquiry";
import type { ContactFormState } from "@/lib/schemas";

const DARK = "#0B2A3A";
const INK = "#0B2A3A";
const MUTED = "#5F7688";
const HAIRLINE = "#D3DFE7";
const PRIMARY = "#0E3A52";
const CYAN = "#16C1F3";
const ACCENT_ON_DARK = "#5AD1F7";
const RULE_ON_DARK = "rgba(255,255,255,.20)";

const CHIPS = [
  "Digital radiography",
  "Industrial CT",
  "High-energy X-ray",
  "PCB X-ray",
  "ATE systems",
  "Custom solution",
];

type FieldDef = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  full?: boolean;
};

const FIELDS: FieldDef[] = [
  { label: "Full name*", name: "name", placeholder: "Your name" },
  { label: "Company name*", name: "company", placeholder: "Your company" },
  { label: "Work email*", name: "email", type: "email", placeholder: "you@company.com", full: true },
];

const labelStyle = {
  color: MUTED,
};
const inputBase =
  "w-full border-0 border-b bg-transparent pl-0.5 outline-none transition-colors duration-200 focus:!border-b-[#16C1F3]";

function Field({ label, name, type = "text", placeholder, defaultValue, full }: FieldDef) {
  return (
    <div className={`flex flex-col gap-2.5 ${full ? "md:col-span-2" : ""}`}>
      <label className="t-caption" style={labelStyle}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
        className={`${inputBase} t-body h-12`}
        style={{ borderBottom: `1px solid ${HAIRLINE}`, color: INK }}
      />
    </div>
  );
}

export default function ContactSection({ showChips = true }: { showChips?: boolean }) {
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(submitContactForm, { success: false });
  useEffect(() => {
    if (state.success) trackEvent("generate_lead", { form: "contact-section" });
  }, [state]);

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: DARK }}>
      <BackgroundVideo
        src="/assets/hero-720.mp4"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,.55)" }} />

      <div className="relative flex flex-col gap-9 px-6 py-20 md:gap-12 md:px-10 md:py-24 lg:flex-row lg:items-start lg:gap-[72px] lg:px-[55px] lg:py-[120px]">
        {/* intro */}
        <div className="flex flex-col gap-[22px] md:gap-[26px] lg:flex-1 lg:gap-8 lg:pt-2">
          <div
            className="t-eyebrow"
            style={{ color: ACCENT_ON_DARK }}
          >
            Get in touch
          </div>
          <h2
            className="t-h2 m-0 text-white md:max-w-[18ch] lg:max-w-[14ch]"
          >
            Tell us what you need to inspect
          </h2>
          <p
            className="t-body m-0 md:max-w-[60ch] lg:max-w-[48ch]"
            style={{ color: "rgba(255,255,255,.72)" }}
          >
            Share your part, material and defect type — our engineers will recommend the right MQS
            system.
          </p>
          {showChips && (
            <div className="mt-1 grid grid-cols-2 gap-2.5 md:mt-2 md:gap-3 lg:max-w-[520px]">
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="t-caption px-3.5 py-3 text-left md:px-[18px] md:py-3.5"
                  style={{ border: `1px solid ${RULE_ON_DARK}`, color: "#fff" }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* form card */}
        <div
          className="bg-white px-6 py-7 md:p-10 lg:flex-[0_0_44%] lg:p-12"
          style={{ borderTop: `2px solid ${CYAN}` }}
        >
          {state.success ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#16C1F3" opacity=".12" />
                <path d="M15 25l6 6 12-12" stroke="#16C1F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="t-body" style={{ color: INK }}>{state.message}</p>
            </div>
          ) : (
            <form action={formAction}>
              <input type="hidden" name="sourcePage" value="/" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-7 lg:gap-x-7 lg:gap-y-8">
                {FIELDS.map((f) => <Field key={f.label} {...f} />)}
              </div>
              {state.errors && (
                <div className="mt-4 text-sm text-red-600">
                  {Object.values(state.errors).flat().map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              )}
              <button
                type="submit"
                disabled={pending}
                className="t-button mt-8 flex h-12 w-full items-center justify-center rounded-none transition-colors duration-200 hover:!bg-[#0A2B3D] disabled:opacity-50 md:mt-9 md:inline-flex md:w-auto md:justify-start md:px-7 lg:mt-10"
                style={{
                  background: PRIMARY,
                  color: "#fff",
                }}
              >
                {pending ? "Submitting..." : "Request consultation"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
