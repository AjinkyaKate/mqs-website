import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import MqxcSeries from "@/components/products/MqxcSeries";
import ContactSection from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "MQXC Series — Cabinet X-Ray & Digital Radiography Systems | MQS Technologies",
  description:
    "AERB-compliant cabinet digital radiography systems from 160 kV to 450 kV. High-resolution 2D and CT-ready inspection for electronics, castings, welds and aerospace parts. Made in India.",
};

export default function MqxcSeriesPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqxcSeries />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
