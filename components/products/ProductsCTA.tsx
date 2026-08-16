/* ──────────────────────────────────────────────────────────────
   Products "Get in touch" CTA — ported from the updated
   `Products Solutions.dc.html`. Full-bleed navy band over a dark
   photo: left intro + 4 category chips, right a white form card
   (2px cyan top edge) with underline-style fields in a 2-col grid,
   product-specific fields (part/material, defect type), and two
   actions. Palette 2B. Static UI; cyan underline is a real CSS
   :focus state. Stacks below from tablet down.
   ────────────────────────────────────────────────────────────── */

"use client";

import Image from "next/image";
import { useRef, useActionState } from "react";
import { submitProductForm } from "@/lib/actions/enquiry";
import type { ContactFormState } from "@/lib/schemas";

const DARK = "#0B2A3A";
const INK = "#0B2A3A";
const MUTED = "#5F7688";
const HAIRLINE = "#D3DFE7";
const PRIMARY = "#0E3A52";
const CYAN = "#16C1F3";
const ACCENT_ON_DARK = "#5AD1F7";
const RULE_ON_DARK = "rgba(255,255,255,.20)";

const CHIPS = ["Digital radiography", "Industrial CT", "PCB X-ray", "ATE"];

type FieldDef = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  full?: boolean;
};

const FIELDS: FieldDef[] = [
  { label: "Full name*", name: "name", placeholder: "Jane Smith" },
  { label: "Company name*", name: "company", placeholder: "Company Pvt. Ltd." },
  { label: "Work email*", name: "email", type: "email", placeholder: "jane@example.com" },
  { label: "Phone", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
  { label: "Part / material", name: "partMaterial", placeholder: "Aluminium casting, 40 mm" },
  { label: "Defect type*", name: "defectType", placeholder: "Porosity, cracks, inclusions" },
  {
    label: "Application details",
    name: "appDetails",
    textarea: true,
    full: true,
    placeholder: "Throughput, resolution and site constraints",
  },
];

const labelStyle = {
  color: MUTED,
};
const inputBase =
  "w-full border-0 border-b bg-transparent pl-0.5 outline-none transition-colors duration-200 focus:!border-b-[#16C1F3]";

function Field({ label, name, type = "text", placeholder, textarea, full }: FieldDef) {
  return (
    <div className={`flex flex-col gap-2.5 ${full ? "md:col-span-2" : ""}`}>
      <label className="t-caption" style={labelStyle}>{label}</label>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          className={`${inputBase} t-body resize-none py-1.5`}
          style={{ height: 104, borderBottom: `1px solid ${HAIRLINE}`, color: INK }}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${inputBase} t-body h-12`}
          style={{ borderBottom: `1px solid ${HAIRLINE}`, color: INK }}
        />
      )}
    </div>
  );
}

export default function ProductsCTA() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<ContactFormState, FormData>(submitProductForm, { success: false });

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: DARK }}>
      <Image
        src="/assets/photo-dark-hero.jpg"
        alt="Plant floor at night"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ background: "rgba(11,42,58,.82)" }} />

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
            className="t-h2 m-0 text-white md:max-w-[16ch] lg:max-w-[15ch]"
          >
            Not sure which system fits your need?
          </h2>
          <p
            className="t-body m-0 md:max-w-[60ch] lg:max-w-[50ch]"
            style={{ color: "rgba(255,255,255,.72)" }}
          >
            Share your part, material and defect type — our application engineers will recommend the
            right system and run a sample inspection.
          </p>
          <div className="mt-1 grid grid-cols-2 gap-2.5 md:mt-2 md:gap-3 lg:max-w-[520px]">
            {CHIPS.map((c) => (
              <div
                key={c}
                className="t-caption px-3.5 py-3 md:px-[18px] md:py-3.5"
                style={{
                  border: `1px solid ${RULE_ON_DARK}`,
                  color: "#fff",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* form card */}
        <div
          className="bg-white px-6 py-7 md:p-10 lg:flex-[0_0_46%] lg:p-12"
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
            <form ref={formRef} action={formAction}>
              <input type="hidden" name="sourcePage" value="/products" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-7 lg:gap-x-7 lg:gap-y-8">
                {FIELDS.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
              {state.errors && (
                <div className="mt-4 text-sm text-red-600">
                  {Object.values(state.errors).flat().map((e, i) => (
                    <p key={i}>{e}</p>
                  ))}
                </div>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-9 lg:mt-10">
                <button
                  type="submit"
                  disabled={pending}
                  className="t-button flex h-12 items-center justify-center rounded-none px-7 transition-colors duration-200 hover:!bg-[#0A2B3D] disabled:opacity-50"
                  style={{ background: PRIMARY, color: "#fff" }}
                >
                  {pending ? "Submitting..." : "Request consultation"}
                </button>
                <a
                  href="#contact"
                  className="t-button flex h-12 items-center justify-center rounded-none px-7 transition-colors duration-200 hover:!bg-[#0B2A3A] hover:!text-white"
                  style={{ border: `1px solid ${INK}`, color: INK }}
                >
                  Request a demo
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
