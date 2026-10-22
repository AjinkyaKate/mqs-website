import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import Mqir225 from "@/components/products/Mqir225";

export const metadata: Metadata = {
  title: "MQIR 225 – X-Ray Irradiator",
  description:
    "MQIR 225 laboratory X-ray irradiator: up to 225 kV and 4500 W, optional internal dosimeter, configurable beam shaping and an AERB-guideline shielded cabinet with leakage ≤ 0.1 mR/hr.",
  alternates: { canonical: "/products/mqir-225" },
};

export default function Mqir225Page() {
  return (
    <>
      <SiteHeaderFull />
      <Mqir225 />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
