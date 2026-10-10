import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import HeavyEngineeringIndustryPage from "@/components/industries/HeavyEngineeringIndustryPage";

export const metadata: Metadata = {
  title: "Heavy Engineering Weld & Pipe X-Ray Inspection | MQS Technologies",
  description:
    "Digital Radiography for pipe butt welds, tubular joints and SAW pipes. Cabinet, bunker and modular systems with MQS Imaging Suite for measurement and traceability.",
  alternates: { canonical: "/industries/heavy-engineering" },
};

export default function HeavyEngineeringPage() {
  return (
    <>
      <SiteHeaderFull />
      <HeavyEngineeringIndustryPage />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
