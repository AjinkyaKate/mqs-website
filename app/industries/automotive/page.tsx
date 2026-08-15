import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { automotive } from "@/components/industries/industries-data";

export const metadata: Metadata = { title: automotive.metaTitle, description: automotive.metaDescription };

export default function AutomotivePage() {
  return (
    <>
      <SiteHeaderFull />
      <IndustryDetail data={automotive} />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
