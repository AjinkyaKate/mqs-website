import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import { ConceptFindMeasureImprove } from "@/components/mqct-concepts/concepts";

/* Layout concept for client review, not a published page. Excluded from search
   and from the site navigation; the canonical MQCT page is /products/mqct-series. */
export const metadata: Metadata = {
  title: "MQCT Series, Concept 05, Find, Measure, Improve | MQS Technologies",
  description: "A workflow-led story. Find, measure and improve frames every later section as part of one loop ending in a corrected process.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteHeaderFull />
      <ConceptFindMeasureImprove />
      <Footer />
    </>
  );
}
