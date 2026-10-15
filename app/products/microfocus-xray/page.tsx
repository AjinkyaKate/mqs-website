import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MicrofocusXray from "@/components/products/MicrofocusXray";

export const metadata: Metadata = {
  title: "Microfocus X-Ray Systems",
  description:
    "MQS microfocus X-ray systems from 160 to 300 kV with transmission, reflection, rod anode and dual head tubes, for DR, CT and panoramic inspection down to 0.5 µm.",
  alternates: { canonical: "/products/microfocus-xray" },
};

export default function MicrofocusXrayPage() {
  return (
    <>
      <SiteHeaderFull />
      <MicrofocusXray />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
