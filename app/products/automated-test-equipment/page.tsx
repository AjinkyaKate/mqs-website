import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import AteSystems from "@/components/products/AteSystems";

/* Title and description from the client's "AUTOMATED TEST EQUIPMENT" build
   reference, with the em dash after the first clause replaced by a colon per the
   house rule; a page title is visible copy in every search result. */
export const metadata: Metadata = {
  title: "Automated Test Equipment: Custom Test Systems for Defence & Industry | MQS Technologies",
  description:
    "Custom-built test equipment for assemblies no catalogue instrument can verify. Manual, microcontroller and PC-based systems, designed and manufactured in Hyderabad.",
  alternates: { canonical: "/products/automated-test-equipment" },
};

export default function AutomatedTestEquipmentPage() {
  return (
    <>
      <SiteHeaderFull />
      <AteSystems />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
