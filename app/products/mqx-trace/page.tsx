import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqxTracE from "@/components/products/MqxTracE";

/* Title and description verbatim from the client's MQX.tracE brief. */
export const metadata: Metadata = {
  title: "MQX.tracE — 2D & 3D CT X-Ray Inspection for Electronics | MQS Technologies",
  description:
    "India's first indigenous 2.5D PCB X-ray inspection system. Micron-level detection of solder voids, bridging, PTH fill and BGA defects, with optional 3D CT slicing. AERB type-approved.",
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
