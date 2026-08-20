import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactPage, { EMAIL, PHONE, ADDRESS_LINES } from "@/components/contact/ContactPage";

/* Title and description from the client's "CONTACT US" build reference, which
   supersedes the placeholder pair written when this page had no content
   document. One character changed: the reference's em dash after the company
   name is a colon here, per the house rule that no em dash ships in visible
   copy, and a title is visible copy in every search result. */
export const metadata: Metadata = {
  title: "Contact MQS Technologies: X-Ray, CT & ATE Inspection Solutions | Hyderabad",
  description:
    "Talk to the MQS Technologies team about X-ray, CT and automated test requirements. Sales, contract manufacturing and service contacts, Hyderabad. Phone +91 40 2381 1122.",
  alternates: { canonical: "/contact" },
};

/* Organization structured data. The postal address was previously left out
   because it had never been confirmed and a wrong address in structured data is
   worse than none: search engines and map listings pick it up. The Contact Us
   build reference now states it as page content, so it is included here and in
   the visible Visit Us block from the same source. Office hours likewise. */
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
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_LINES[0],
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500018",
    addressCountry: "IN",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  }],
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
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }} />
    </>
  );
}
