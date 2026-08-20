import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import { ConceptProductAnatomy } from "@/components/mqct-concepts/concepts";

/* Layout concept for client review, not a published page. Excluded from search
   and from the site navigation; the canonical MQCT page is /products/mqct-series. */
export const metadata: Metadata = {
  title: "MQCT Series, Concept 02, Product Anatomy | MQS Technologies",
  description: "The machine leads. System architecture and safety construction run immediately after a two-block equipment hero.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <SiteHeaderFull />
      <ConceptProductAnatomy />
      <Footer />
    </>
  );
}
