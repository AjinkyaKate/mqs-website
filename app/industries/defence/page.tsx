import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import DefenceIndustryPage from "@/components/industries/DefenceIndustryPage";

export const metadata: Metadata = {
  title: "Defense and Securities X-Ray Inspection & Test Equipment | MQS Technologies",
  description:
    "X-ray inspection and custom Automated Test Equipment for defense, securities, tactical and mission-critical applications. Indigenous engineering by MQS.",
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
