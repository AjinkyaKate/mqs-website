import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import AboutPage from "@/components/about/AboutPage";
import { META } from "@/components/about/about-data";

export const metadata: Metadata = { title: META.title, description: META.description };

export default function AboutUsPage() {
  return (
    <>
      <SiteHeaderFull />
      <AboutPage />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
