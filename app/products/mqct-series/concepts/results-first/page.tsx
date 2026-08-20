import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import { ConceptResultsFirst } from "@/components/mqct-concepts/concepts";

/* Layout concept for client review, not a published page. Excluded from search
   and from the site navigation; the canonical MQCT page is /products/mqct-series. */
export const metadata: Metadata = {
  title: "MQCT Series, Concept 03, Results First | MQS Technologies",
  description: "Lead with what CT reveals. A full-bleed wall thickness scan carries the hero and the analysis stories follow immediately.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteHeaderFull />
      <ConceptResultsFirst />
      <Footer />
    </>
  );
}
