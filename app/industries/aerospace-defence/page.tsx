import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { aerospace } from "@/components/industries/industries-data";

export const metadata: Metadata = { title: aerospace.metaTitle, description: aerospace.metaDescription };

export default function AerospacePage() {
  return (
    <>
      <SiteHeaderFull />
      <IndustryDetail data={aerospace} />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
