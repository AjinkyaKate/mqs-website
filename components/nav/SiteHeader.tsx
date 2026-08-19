/* Solid interior header for non-home routes (e.g. /products).
   Logo · nav links · Get a quote. Palette 2B. */

import Image from "next/image";

const INK = "#0B2A3A";

const LINKS: [string, string][] = [
  ["About", "/#about"],
  ["Products", "/products"],
  ["Industries", "/#industries"],
  ["Services", "/#services"],
];

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 flex h-[64px] items-center border-b bg-white px-6 md:h-[72px] md:px-10 lg:px-[55px]"
      style={{ borderColor: "rgba(16,16,16,.08)" }}
    >
      <a href="/" className="flex items-center" aria-label="MQS Technologies — home">
        <Image src="/assets/mqs-logo-2a-light.png" alt="MQS Technologies" width={124} height={36} priority className="h-8 w-auto md:h-9" />
      </a>

      <nav className="ml-auto hidden items-center gap-9 lg:flex">
        {LINKS.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="uppercase transition-colors duration-200 hover:!text-[#0A6A88]"
            style={{ font: "var(--type-label)", fontSize: 15, letterSpacing: ".045em", color: INK }}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        href="/#contact"
        className="ml-auto flex h-11 items-center rounded-none px-6 uppercase no-underline transition-colors duration-200 hover:!bg-[#0A2B3D] md:h-12 lg:ml-9"
        style={{ background: "#0E3A52", color: "#fff", font: "500 13px/1 var(--font-sans)", letterSpacing: ".045em" }}
      >
        Get a quote
      </a>
    </header>
  );
}
