import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import HighEnergy from "@/components/products/HighEnergy";

export const metadata: Metadata = {
  title: "High Energy X-Ray Solutions — LINAC Radiography & CT | MQS Technologies",
  description:
    "High energy radiography and CT from 0.9 to 15 MeV. Penetrate up to 500 mm of steel and 2500 mm of solid propellant for rocket motors, castings, weldments and pressure vessels. Engineered in Hyderabad.",
};

export default function HighEnergyPage() {
  return (
    <>
      <SiteHeaderFull />
      <HighEnergy />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
