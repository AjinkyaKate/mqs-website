import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import { ConceptTechnicalBuyer } from "@/components/mqct-concepts/concepts";

/* Layout concept for client review, not a published page. Excluded from search
   and from the site navigation; the canonical MQCT page is /products/mqct-series. */
export const metadata: Metadata = {
  title: "MQCT Series, Concept 04, Technical Buyer | MQS Technologies",
  description: "Built for engineers and procurement. Compact hero, persistent section nav and a requirement-to-model matrix before the marketing sections.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteHeaderFull />
      <ConceptTechnicalBuyer />
      <Footer />
    </>
  );
}
