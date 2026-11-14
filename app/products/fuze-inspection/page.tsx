import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import FuzeInspection from "@/components/products/FuzeInspection";

export const metadata: Metadata = {
  title: "Fuze Inspection Systems – Digital Radiography for Fuzes",
  description:
    "Custom-built indigenous fuze inspection systems for digital radiography of electronic and mechanical fuzes, with an optional swivel mechanism, configurable X-ray sources up to 450 kV and AERB-aligned shielding.",
  alternates: { canonical: "/products/fuze-inspection" },
};

export default function FuzeInspectionPage() {
  return (
    <>
      <SiteHeaderFull />
      <FuzeInspection />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
