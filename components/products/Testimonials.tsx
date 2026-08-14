/* ──────────────────────────────────────────────────────────────
   Testimonials — ported from the updated `Products Solutions.dc.html`.
   Palette 2B (steel navy, cyan accent). Avatars are initials
   placeholders (colored disc + initials) rather than stock faces:
   these are placeholder quotes to be replaced with real, attributed
   MQS customer testimonials + photos.
   ────────────────────────────────────────────────────────────── */

const INK = "#0B2A3A";
const BODY = "#41586A";
const HAIRLINE = "#D3DFE7";
const TILE = "#F4F8FA";
const PRIMARY = "#0E3A52";

type Quote = {
  name: string;
  role: string;
  initials: string;
  quote: string;
};

const QUOTES: Quote[] = [
  {
    name: "R. Venkatesh",
    role: "Head of Quality, Aerospace Castings",
    initials: "RV",
    quote:
      "The MQCT cell has been running two shifts since commissioning. Porosity calls that used to take a day now close in twenty minutes.",
  },
  {
    name: "A. Deshpande",
    role: "Plant Manager, Wheel Manufacturing",
    initials: "AD",
    quote:
      "Installation, AERB approval and operator training were handled end to end. The inline wheel line met cycle time from week one.",
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="flex flex-none items-center justify-center"
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: PRIMARY,
        color: "#fff",
        font: "600 18px/1 var(--font-sans)",
        letterSpacing: ".02em",
      }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-20 md:px-10 md:py-24 lg:px-[55px] lg:py-[120px]">
      <h2
        className="t-h2 m-0 max-w-[24ch]"
        style={{ color: INK }}
      >
        Quality teams rely on MQS for inspection that holds up on the line.
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-7 lg:gap-8">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            className="m-0 flex flex-col gap-7 border p-7 md:p-8"
            style={{ background: TILE, borderColor: HAIRLINE }}
          >
            <div className="flex items-center gap-4">
              <Avatar initials={q.initials} />
              <figcaption className="flex flex-col gap-1">
                <span className="t-h4" style={{ color: INK }}>{q.name}</span>
                <span className="t-body-sm" style={{ color: BODY }}>{q.role}</span>
              </figcaption>
            </div>
            <blockquote className="t-body m-0" style={{ color: BODY }}>
              {q.quote}
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
