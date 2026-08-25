import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import ProductsHeroStats from "@/components/products/ProductsHeroStats";
import Testimonials from "@/components/products/Testimonials";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Products — Industrial X-Ray, CT, Test & Irradiation Systems | MQS Technologies",
  description:
    "Cabinet radiography, industrial CT, high energy LINAC systems, electronics inspection, automated test equipment, fuze inspection and X-ray irradiators — designed and manufactured in Hyderabad.",
};

export default function ProductsPage() {
  return (
    <main style={{ background: "#F4F8FA" }}>
      <SiteHeaderFull />

      {/* hero band */}
      <section className="relative overflow-hidden" style={{ background: "#0B2A3A" }}>
        <Image
          src="/assets/products-overview-hero.png"
          alt="Engineer reviewing an industrial CT scan beside an inspection system"
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-[.36]"
        />
        <div className="relative flex flex-col gap-5 px-6 pt-[84px] md:gap-[26px] md:px-10 md:pt-[104px] lg:gap-[34px] lg:px-[55px] lg:pt-[128px]">
          <nav aria-label="Breadcrumb" className="t-caption" style={{ color: "rgba(255,255,255,.62)" }}>
            <Link href="/" className="no-underline hover:!text-white">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span style={{ color: "#5AD1F7" }}>Products</span>
          </nav>
          <div className="t-eyebrow" style={{ color: "#5AD1F7" }}>Products</div>
          <h1
            className="t-h2 m-0 max-w-[17ch] text-white"
          >
            Everything We Build, in One Place.
          </h1>
          <p className="t-lead m-0 md:max-w-[58ch] lg:max-w-[62ch]" style={{ color: "rgba(255,255,255,.72)" }}>
            From a cabinet that inspects a circuit board to a linear accelerator that sees through half a metre of steel — and the test equipment that verifies what comes off the line. All designed and manufactured in Hyderabad.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#catalog" className="t-button inline-flex h-12 items-center bg-[#16C1F3] px-6 no-underline transition-colors hover:!bg-white" style={{ color: "#08283A" }}>Find the Right System <span aria-hidden="true" className="ml-3">→</span></a>
            <a href="/contact" className="t-button inline-flex h-12 items-center border px-6 no-underline transition-colors hover:!bg-white/10" style={{ color: "#fff", borderColor: "rgba(255,255,255,.42)" }}>Talk to an Expert <span aria-hidden="true" className="ml-3">→</span></a>
          </div>
        </div>
        <ProductsHeroStats />
      </section>

      {/* filterable catalog (chips + NDT + ATE) */}
      <ProductsCatalog />

      {/* testimonials */}
      <Testimonials />

      {/* single shared contact form (same as home) */}
      <ContactSection showChips={false} />

      <Footer />
    </main>
  );
}
