import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqxOptimaxis from "@/components/products/MqxOptimaxis";

export const metadata: Metadata = {
  title: "MQX.OptimaXis – Digital 2D X-ray Inspection System",
  description:
    "MQX.OptimaXis is an affordable, dependable digital 2D X-ray inspection system for small and mid-sized manufacturers, with AERB-compliant safety and ASTM E2422 aligned imaging.",
  alternates: { canonical: "/products/mqx-optimaxis" },
};

export default function MqxOptimaxisPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqxOptimaxis />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
