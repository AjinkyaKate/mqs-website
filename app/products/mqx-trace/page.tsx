import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqxTracE from "@/components/products/MqxTracE";

export const metadata: Metadata = {
  title: "MQX.tracE — 2.5D, CT & IN-3D PCB X-Ray Inspection | MQS Technologies",
  description:
    "MQX.tracE 2.5D, CT and IN-3D PCB X-ray inspection systems for micron-level defect detection, 3D slicing and inline automated analysis.",
  alternates: { canonical: "/products/mqx-trace" },
};

export default function MqxTracEPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqxTracE />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
