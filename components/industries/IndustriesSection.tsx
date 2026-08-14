/* ──────────────────────────────────────────────────────────────
   Industries — hover-reveal image cards, ported from
   `Industries Hover Reveal.dc.html`. Palette 2B.

   Each card is a full-bleed photo under a steel-navy duotone
   (mix-blend-color #12405C over a grayscale image) + bottom scrim.
   Title always shows; on hover/focus (≥640) the body + "Learn more"
   slide up, the image zooms + darkens, and a 2px cyan top edge
   appears. On mobile (<640) everything is revealed (no hover).

   CSS-only (group-hover / group-focus + sm/lg variants +
   motion-reduce) so it stays a server component with no hydration
   flash. Breakpoints match the .dc: mobile <640, ≥640 hover-reveal.

   NOTE: images are placeholders (existing facility photos) — swap for
   real sector imagery (aerospace / automotive / electronics).
   ────────────────────────────────────────────────────────────── */

const EASE = "ease-[cubic-bezier(.22,.61,.36,1)]";

const CARDS = [
  {
    title: "Aerospace & Defence",
    src: "/assets/ind-aerospace.jpg",
    alt: "Jet engine — the kind of flight-critical component MQS X-ray and CT systems validate",
    body: "Mission-critical X-ray and CT to validate flight- and defence-grade components with complete confidence.",
  },
  {
    title: "Automotive",
    src: "/assets/ind-automotive.jpg",
    alt: "Automotive engine assembly — castings and safety-critical parts inspected by MQS systems",
    body: "High-throughput digital radiography and CT for fast, repeatable defect detection in castings and safety-critical parts.",
  },
  {
    title: "Electronics",
    src: "/assets/ind-electronics.jpg",
    alt: "Printed circuit board close-up — PCB X-ray and CT inspection subject",
    body: "PCB X-ray, 3D CT slicing and AI reel counting to reduce escapes and improve SMT quality and traceability.",
  },
];

// reveal (body + link): shown on mobile, hidden ≥640 until hover/focus
const REVEAL =
  "max-h-[260px] translate-y-0 opacity-100 sm:max-h-0 sm:translate-y-3 sm:opacity-0 " +
  "sm:group-hover:max-h-[260px] sm:group-hover:translate-y-0 sm:group-hover:opacity-100 " +
  "sm:group-focus:max-h-[260px] sm:group-focus:translate-y-0 sm:group-focus:opacity-100";

export default function IndustriesSection() {
  return (
    <section id="industries" className="bg-[#F4F8FA] px-6 py-16 sm:px-10 sm:py-20 lg:px-[55px] lg:py-[120px]">
      {/* intro */}
      <div className="mb-6 flex flex-col gap-2.5 sm:mb-12 sm:gap-3">
        <div className="t-eyebrow" style={{ color: "#0A6A88" }}>
          Industries
        </div>
        <h2
          className="m-0 max-w-[22ch] t-h2"
          style={{ color: "#0B2A3A", textWrap: "pretty" }}
        >
          Trusted in <span style={{ color: "#0A6A88" }}>mission-critical</span> sectors.
        </h2>
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-3 lg:gap-6">
        {CARDS.map((c) => (
          <a
            key={c.title}
            href="/products"
            aria-label={c.title}
            className={`group relative block aspect-[4/3] overflow-hidden border-t-2 border-[#16C1F3] bg-[#0B2A3A] no-underline outline-none transition-colors duration-200 ${EASE} sm:aspect-[4/5] sm:border-[rgba(255,255,255,.14)] sm:group-hover:border-[#16C1F3] sm:group-focus:border-[#16C1F3]`}
          >
            {/* image — grayscale, darkens + zooms on reveal */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.src}
              alt={c.alt}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover grayscale contrast-[1.12] brightness-[.74] transition duration-[400ms] ${EASE} motion-reduce:transition-none sm:brightness-[.92] sm:group-hover:scale-105 sm:group-hover:brightness-[.70] sm:group-focus:scale-105 sm:group-focus:brightness-[.70]`}
            />

            {/* steel-navy duotone */}
            <div className="pointer-events-none absolute inset-0 bg-[#12405C] mix-blend-color" />

            {/* scrim OFF (≥640, resting) */}
            <div
              className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[260ms] ${EASE} motion-reduce:transition-none sm:opacity-100 sm:group-hover:opacity-0 sm:group-focus:opacity-0`}
              style={{ background: "linear-gradient(180deg,rgba(11,42,58,.10) 40%,rgba(8,26,38,.70) 100%)" }}
            />
            {/* scrim ON (mobile + hover/focus) */}
            <div
              className={`pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-[260ms] ${EASE} motion-reduce:transition-none sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus:opacity-100`}
              style={{ background: "linear-gradient(180deg,rgba(11,42,58,.28) 0%,rgba(8,26,38,.90) 100%)" }}
            />

            {/* content */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-5 sm:gap-3.5 sm:px-[18px] sm:py-5 lg:px-7 lg:py-8">
              <div
                className="t-h4"
                style={{ color: "#fff" }}
              >
                {c.title}
              </div>
              <div className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-[260ms] sm:gap-3.5 ${EASE} motion-reduce:transition-none ${REVEAL}`}>
                <div
                  className="t-body"
                  style={{ color: "#D6E4EC", textWrap: "pretty" }}
                >
                  {c.body}
                </div>
                <div className="flex items-center gap-2 t-button" style={{ color: "#16C1F3" }}>
                  Learn more
                  <span className={`inline-block transition-transform duration-200 ${EASE} motion-reduce:transition-none sm:group-hover:translate-x-1 sm:group-focus:translate-x-1`}>
                    →
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
