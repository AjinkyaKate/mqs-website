import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import AerospaceIndustryPage from "@/components/industries/AerospaceIndustryPage";

export const metadata: Metadata = {
  title: "Aerospace X-Ray & CT Inspection Solutions | MQS Technologies",
  description:
    "Aerospace X-ray, digital radiography and CT inspection systems engineered around flight-critical components, defect targets and programme workflows.",
  alternates: { canonical: "/industries/aerospace" },
};

export default function AerospacePage() {
  return (
    <>
      <SiteHeaderFull />
      <AerospaceIndustryPage />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
