import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqxGinti from "@/components/products/MqxGinti";

export const metadata: Metadata = {
  title: "MQX.gINti – AI Enabled, High-Speed X-Ray Component Counter",
  description:
    "MQX.gINti AI-enabled X-ray component counter for SMT lines and stores: counts reels in under 7 seconds with over 99% accuracy, even for 01005 components.",
  alternates: { canonical: "/products/mqx-ginti" },
};

export default function MqxGintiPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqxGinti />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
