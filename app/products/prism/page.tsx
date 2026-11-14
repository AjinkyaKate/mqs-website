import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqsPrism from "@/components/products/MqsPrism";

export const metadata: Metadata = {
  title: "MQS.PRISM – Production Radiography Imaging System",
  description:
    "MQS.PRISM automated 2D digital X-ray inspection for 24/7 production, with swivel-based loading, AI-enabled ADR to ASTM E2422 and over 1 million parts inspected per year.",
  alternates: { canonical: "/products/prism" },
};

export default function MqsPrismPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqsPrism />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
