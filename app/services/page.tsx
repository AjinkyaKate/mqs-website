import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ServicesOverview from "@/components/services/ServicesOverview";

export const metadata: Metadata = {
  title: "Services — CT Inspection, Precision Manufacturing & Support | MQS Technologies",
  description:
    "Send us the part and we will scan it. Send us the drawing and we will build it. CT inspection services, precision sub-assemblies, industrial electronics, preventive maintenance and breakdown support from MQS Technologies, Hyderabad.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeaderFull />
      <ServicesOverview />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
