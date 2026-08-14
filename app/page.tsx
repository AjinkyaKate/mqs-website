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

export default function Home() {
  return (
    <main>
      <Hero />
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
