import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import PipeInspection from "@/components/products/PipeInspection";

export const metadata: Metadata = {
  title: "Digital Radiography Systems for Pipe Inspection",
  description:
    "Real-time digital radiography for pipe and butt weld inspection of stainless steel, alloy steel and carbon steel pipes, in cabinet-based or bunker-based configurations with the MQS Imaging Suite.",
  alternates: { canonical: "/products/pipe-inspection" },
};

export default function PipeInspectionPage() {
  return (
    <>
      <SiteHeaderFull />
      <PipeInspection />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
