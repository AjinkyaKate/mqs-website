import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import { ConceptDecisionJourney } from "@/components/mqct-concepts/concepts";

/* Layout concept for client review, not a published page. Excluded from search
   and from the site navigation; the canonical MQCT page is /products/mqct-series. */
export const metadata: Metadata = {
  title: "MQCT Series, Concept 01, Decision Journey | MQS Technologies",
  description: "Ordered by the questions a quality engineer asks. The CT versus radiography comparison leads, before any hardware or specification detail.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteHeaderFull />
      <ConceptDecisionJourney />
      <Footer />
    </>
  );
}
