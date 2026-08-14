/* Product Card — ported from `Product Card.dc.html`. Palette 2B.
   Image tile → spec · name · subtitle · description → View solution / Brochure.
   Hover: 1px cyan inset frame, accent name, slow image zoom (CSS group-hover). */

const ACCENT = "#0A6A88";
const INK = "#0B2A3A";
const BODY = "#41586A";
const HAIRLINE = "#D3DFE7";

export type Product = {
  spec: string;
  name: string;
  subtitle: string;
  desc: string;
  image?: string;
  href?: string;
};

export default function ProductCard({ spec, name, subtitle, desc, image, href }: Product) {
  return (
    <div
      className="group flex h-full flex-col bg-white transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_#16C1F3]"
      style={{ border: `1px solid ${HAIRLINE}` }}
    >
      <div className="relative overflow-hidden" style={{ background: "#F4F8FA", borderBottom: `1px solid ${HAIRLINE}` }}>
        <div className="flex h-[200px] items-center justify-center p-6">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain transition-transform duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="t-caption text-center"
              style={{ color: "#93A9B7" }}
            >
              Product render
              <br />
              {name}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-[22px] pt-[22px]">
        <div className="t-caption" style={{ color: ACCENT }}>
          {spec}
        </div>
        <h3
          className="t-h4 m-0 transition-colors duration-200 group-hover:!text-[#0A6A88]"
          style={{ color: INK }}
        >
          {name}
        </h3>
        <div className="t-body-sm" style={{ color: BODY }}>{subtitle}</div>
        <p className="t-body m-0 mb-[22px]" style={{ color: BODY }}>
          {desc}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 px-[22px] pb-[22px]">
        <a
          href={href || "/#contact"}
          className="t-button no-underline transition-colors duration-200 group-hover:!text-[#16C1F3]"
          style={{ color: ACCENT }}
        >
          View solution →
        </a>
        <a
          href="/#contact"
          className="t-button flex h-11 items-center px-[18px] no-underline transition-colors duration-200 hover:!border-[#0E3A52] hover:!bg-[#0E3A52] hover:!text-white"
          style={{ border: `1px solid ${INK}`, color: INK, background: "transparent" }}
        >
          Brochure ↓
        </a>
      </div>
    </div>
  );
}
