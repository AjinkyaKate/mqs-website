import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import MqctSeries from "@/components/products/MqctSeries";

export const metadata: Metadata = {
  title: "MQX.NeVa — Industrial Computed Tomography Systems | MQS Technologies",
  description:
    "MQX.NeVa industrial CT systems from microfocus to 15 MeV LINAC for 3D defect analysis, porosity classification and dimensional metrology.",
  alternates: { canonical: "/products/mqx-neva" },
};

export default function MqxNevaPage() {
  return (
    <>
      <SiteHeaderFull />
      <MqctSeries />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
