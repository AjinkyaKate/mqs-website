import Hero from "@/components/hero/Hero";
import StatsStrip from "@/components/stats/StatsStrip";
import AboutSection from "@/components/about/AboutSection";
import EquipmentSection from "@/components/equipment/EquipmentSection";
import ServicesSection from "@/components/services/ServicesSection";
import IndustriesSection from "@/components/industries/IndustriesSection";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import NewsSection from "@/components/news/NewsSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import { getSiteImage } from "@/lib/site-images";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroBg = await getSiteImage("hero-bg");

  return (
    <main>
      <Hero bgImage={heroBg ? { src: heroBg.url, alt: heroBg.alt } : undefined} />
      <StatsStrip />
      <AboutSection />
      <EquipmentSection />
      <ServicesSection />
      <IndustriesSection />
      <WhyChooseUs />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
