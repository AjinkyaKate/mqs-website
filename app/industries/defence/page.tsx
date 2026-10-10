import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import DefenceIndustryPage from "@/components/industries/DefenceIndustryPage";

export const metadata: Metadata = {
  title: "Defence X-Ray Inspection & Automated Test Equipment | MQS Technologies",
  description:
    "Digital radiography for fuzes, shells and ammunition, plus custom Automated Test Equipments for missile, torpedo and defence assemblies. Indigenous engineering by MQS.",
  alternates: { canonical: "/industries/defence" },
};

export default function DefencePage() {
  return (
    <>
      <SiteHeaderFull />
      <DefenceIndustryPage />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
