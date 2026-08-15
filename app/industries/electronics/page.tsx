import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import IndustryDetail from "@/components/industries/IndustryDetail";
import { electronics } from "@/components/industries/industries-data";

export const metadata: Metadata = { title: electronics.metaTitle, description: electronics.metaDescription };

export default function ElectronicsPage() {
  return (
    <>
      <SiteHeaderFull />
      <IndustryDetail data={electronics} />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
