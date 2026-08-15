import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import IndustriesOverview from "@/components/industries/IndustriesOverview";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Industries We Serve — X-Ray & CT Inspection for Aerospace, Automotive, Electronics | MQS Technologies",
  description:
    "Industrial X-ray and CT inspection built around your sector. Aerospace and defence, automotive and EV, electronics, energy and foundry — with systems matched to the parts you actually make.",
};

export default function IndustriesPage() {
  return (
    <>
      <SiteHeaderFull />
      <IndustriesOverview />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
