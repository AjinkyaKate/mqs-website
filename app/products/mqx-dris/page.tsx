import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import MqxcSeries from "@/components/products/MqxcSeries";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "MQX.drIS — Cabinet X-Ray & Digital Radiography Systems | MQS Technologies",
  description:
    "MQX.drIS cabinet digital radiography systems with mini-focus and microfocus sources up to 450 kV, high-resolution detectors and multi-axis part handling.",
  alternates: { canonical: "/products/mqx-dris" },
};

export default function MqxDrisPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqxcSeries />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
