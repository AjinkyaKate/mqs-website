import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import ProductsHeroStats from "@/components/products/ProductsHeroStats";
import Testimonials from "@/components/products/Testimonials";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Solutions — MQS Technologies",
  description:
    "MQS inspection & test systems: digital radiography, CT, microfocus, high-energy X-ray, PCB inspection and automated test equipment.",
};

export default function ProductsPage() {
  return (
    <main style={{ background: "#F4F8FA" }}>
      <SiteHeaderFull />

      {/* hero band */}
      <section className="relative overflow-hidden" style={{ background: "#0B2A3A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/products-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-[.28]" />
        <div className="relative flex flex-col gap-5 px-6 pt-[84px] md:gap-[26px] md:px-10 md:pt-[104px] lg:gap-[34px] lg:px-[55px] lg:pt-[128px]">
          <div className="t-eyebrow" style={{ color: "#5AD1F7" }}>
            All solutions
          </div>
          <h1
            className="t-h2 m-0 max-w-[17ch] text-white"
          >
            Inspection &amp; test systems for every application.
          </h1>
          <p className="t-lead m-0 md:max-w-[58ch] lg:max-w-[62ch]" style={{ color: "rgba(255,255,255,.72)" }}>
            From sub-micron electronics to 500 mm steel — MQS has the right system for your quality challenge.
          </p>
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
