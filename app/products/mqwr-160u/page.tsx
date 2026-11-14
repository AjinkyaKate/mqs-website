import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import Mqwr160u from "@/components/products/Mqwr160u";

export const metadata: Metadata = {
  title: "MQWR 160U – Inline Wheel Inspection System",
  description:
    "MQWR 160U inline X-ray inspection for 10″–26″ alloy wheels, with automatic wheel alignment, ADR to ASTM E2422-22 and AERB type approval.",
  alternates: { canonical: "/products/mqwr-160u" },
};

export default function Mqwr160uPage() {
  return (
    <>
      <SiteHeaderFull />
      <Mqwr160u />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
