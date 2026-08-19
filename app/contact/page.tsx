import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ContactPage, { EMAIL, PHONE, TEL } from "@/components/contact/ContactPage";

/* No client content document exists for this page, the only Phase 1 page without
   one, so the title and description are written from facts the site verifies.
   Worth confirming with MQS alongside the address. */
export const metadata: Metadata = {
  title: "Contact MQS Technologies — Inspection Systems & Service, Hyderabad",
  description:
    "Talk to MQS Technologies about X-ray and CT inspection systems, CT inspection services, or support for an installed system. Hyderabad, +91 40 2381 1122.",
  alternates: { canonical: "/contact" },
};

/* Organization structured data, restricted to fields the site verifies. The
   postal address is deliberately omitted: the audit flags the Sanathnagar
   address as never confirmed against the registered address, and a wrong address
   in structured data is worse than none, because search engines and map
   listings will pick it up. Add it once confirmed. */
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MQS Technologies Pvt. Ltd.",
  alternateName: "MQS Technologies",
  foundingDate: "1994",
  url: "https://trivexa-test.vercel.app",
  logo: "https://trivexa-test.vercel.app/assets/mqs-logo-2a-dark.png",
  email: EMAIL,
  telephone: PHONE,
  contactPoint: [{ "@type": "ContactPoint", telephone: PHONE, email: EMAIL, contactType: "sales", areaServed: "IN", availableLanguage: ["en"] }],
  sameAs: [
    "https://www.linkedin.com/company/mqs-technologies-private-limited",
    "https://www.facebook.com/MQS-Technologies-103704454938452/",
    "https://www.instagram.com/mqs_technologies/",
    "https://www.youtube.com/channel/UCSuKS0IX8GA-MDE2ubraQBA",
  ],
};

export default function Contact() {
  return (
    <>
      <SiteHeaderFull />
      <ContactPage />
      <ContactSection showChips={false} />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
    </>
  );
}
