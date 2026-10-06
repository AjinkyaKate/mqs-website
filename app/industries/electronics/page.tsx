import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ElectronicsIndustryPage from "@/components/industries/ElectronicsIndustryPage";

export const metadata: Metadata = {
  title: "Electronics & Semiconductor X-Ray Inspection | MQS Technologies",
  description:
    "Electronics X-ray, 2.5D and CT inspection systems for hidden solder, package and interconnect defects across SMT production and failure analysis.",
  alternates: { canonical: "/industries/electronics" },
};

export default function ElectronicsPage() {
  return (
    <>
      <SiteHeaderFull />
      <ElectronicsIndustryPage />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
