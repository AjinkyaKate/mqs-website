import Hero from "@/components/hero/Hero";
import StatsStrip from "@/components/stats/StatsStrip";
import AboutSection from "@/components/about/AboutSection";
import ServicesSection from "@/components/services/ServicesSection";
import IndustriesSection from "@/components/industries/IndustriesSection";
import WhyChooseUs from "@/components/why/WhyChooseUs";
import NewsSection from "@/components/news/NewsSection";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import { getSiteImage } from "@/lib/site-images";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

/* The home page previously declared no metadata of its own, so it inherited the
   layout default. It now sets its own, with the canonical, so the most important
   page is explicit rather than incidental. */
export const metadata: Metadata = {
  title: "Industrial X-Ray, CT & NDT Inspection Systems | MQS Technologies",
  description:
    "MQS Technologies designs and manufactures industrial X-ray, CT and NDT inspection systems and automated test equipment in Hyderabad. Serving aerospace, defence, automotive and electronics since 1994.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const heroBg = await getSiteImage("hero-bg");

  return (
    <main>
      <Hero bgImage={heroBg ? { src: heroBg.url, alt: heroBg.alt } : undefined} />
      <StatsStrip />
      <AboutSection />
      <ServicesSection />
      <IndustriesSection />
      <WhyChooseUs />
      <NewsSection />
      <UpcomingEvents />
      <ContactSection />
      <Footer />
    </main>
  );
}
