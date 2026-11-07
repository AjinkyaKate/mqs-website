import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqsVigil from "@/components/products/MqsVigil";

export const metadata: Metadata = {
  title: "MQS Vigil Portable Real-Time X-Ray Viewing System | MQS Technologies",
  description:
    "MQS Vigil is a portable, battery-powered digital X-ray viewing system for rapid field deployment, remote operation and non-intrusive inspection.",
  alternates: { canonical: "/products/mqs-vigil" },
  openGraph: {
    images: [
      {
        url: "/assets/products/mqs-vigil/field-deployment.png",
        width: 915,
        height: 780,
        alt: "MQS Vigil portable field X-ray system deployed outdoors",
      },
    ],
  },
};

export default function MqsVigilPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqsVigil />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
