import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import AutomotiveIndustryPage from "@/components/industries/AutomotiveIndustryPage";

export const metadata: Metadata = {
  title: "Automotive X-Ray & CT Inspection Solutions | MQS Technologies",
  description:
    "Automotive digital radiography and CT inspection systems engineered around the component, defect type, throughput and production workflow.",
  alternates: { canonical: "/industries/automotive" },
};

export default function AutomotivePage() {
  return (
    <>
      <SiteHeaderFull />
      <AutomotiveIndustryPage />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
