import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqctSeries from "@/components/products/MqctSeries";

/* Title and description verbatim from the client's MQCT build reference. */
export const metadata: Metadata = {
  title: "MQCT Series — Industrial Computed Tomography Systems | MQS Technologies",
  description:
    "Industrial CT systems from microfocus to 15 MeV LINAC. 3D defect analysis, porosity classification and dimensional metrology for castings, batteries, electronics and aerospace. Engineered in India.",
  alternates: { canonical: "/products/mqct-series" },
};

export default function MqctSeriesPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqctSeries />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
