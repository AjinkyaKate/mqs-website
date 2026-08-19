import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ServiceDetail from "@/components/services/ServiceDetail";
import { ctInspection } from "@/components/services/service-detail-data";

/* Layout variant this page ships with. The design template offers three
   ("editorial" | "spec-led" | "proof-led"); compare them at
   /services/ct-inspection/preview/<variant> and change this one word to switch. */
const VARIANT = "editorial" as const;

/* The datasheet in the resource strip does not exist yet, so the strip stays off
   rather than shipping a download that goes nowhere. */
const SHOW_RESOURCE = false;

export const metadata: Metadata = {
  title: ctInspection.metaTitle,
  description: ctInspection.metaDescription,
};

export default function CtInspectionPage() {
  return (
    <>
      <SiteHeaderFull />
      <ServiceDetail data={ctInspection} variant={VARIANT} showResource={SHOW_RESOURCE} />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
