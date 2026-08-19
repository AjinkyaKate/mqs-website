import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ServiceDetail, { type ServiceDetailVariant } from "@/components/services/ServiceDetail";
import { ctInspection } from "@/components/services/service-detail-data";

/* Review-only routes: the same page in each of the three design-template
   variants, so the layout can be compared on real content and sent as a link.
   Prerendered but noindex. Delete this folder once a variant is signed off. */

const VARIANTS: ServiceDetailVariant[] = ["editorial", "spec-led", "proof-led"];

export function generateStaticParams() {
  return VARIANTS.map((variant) => ({ variant }));
}

export const metadata: Metadata = {
  title: "CT Inspection Services — layout preview | MQS Technologies",
  robots: { index: false, follow: false },
};

export default async function CtInspectionPreview({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  if (!VARIANTS.includes(variant as ServiceDetailVariant)) notFound();
  return (
    <>
      <SiteHeaderFull />
      <ServiceDetail data={ctInspection} variant={variant as ServiceDetailVariant} showResource={false} />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
