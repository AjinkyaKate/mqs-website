import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import ContactSection from "@/components/contact/ContactSection";
import ShellInspection from "@/components/products/ShellInspection";

export const metadata: Metadata = {
  title: "Shell / Ammunition Inspection Solutions",
  description:
    "Cabinet-based and bunker-based digital X-ray inspection for artillery shells and ammunition across calibres, with MQXR sources from 160 kV to 450 kV and high-energy LINAC options in the 2–6 MeV range.",
  alternates: { canonical: "/products/shell-inspection" },
};

export default function ShellInspectionPage() {
  return (
    <>
      <SiteHeaderFull />
      <ShellInspection />
      <ContactSection showChips={false} />
      <Footer />
    </>
  );
}
