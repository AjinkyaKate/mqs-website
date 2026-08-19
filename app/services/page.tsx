import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ServicesOverview from "@/components/services/ServicesOverview";

/* Title and description verbatim from the client brief's PAGE SETUP block, which
   also names the primary keyword ("industrial CT scanning services India"). The
   previous strings were my wording and said "& Support" where the brief says
   "& System Support". */
export const metadata: Metadata = {
  title: "Services — CT Inspection, Precision Manufacturing & System Support | MQS Technologies",
  description:
    "CT scanning as a service, precision sub-assembly and industrial electronics manufacturing, and AMC and breakdown support for installed inspection systems. Hyderabad-based, defence-proven.",
  alternates: { canonical: "/services" },
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
