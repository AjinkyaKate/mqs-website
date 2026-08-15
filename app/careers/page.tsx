import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import Careers from "@/components/careers/Careers";

export const metadata: Metadata = {
  title: "Careers at MQS Technologies — Engineering Jobs in Hyderabad",
  description:
    "Join the team building X-ray, CT and NDT inspection systems for aerospace, defence, automotive and electronics. Mechanical, electronics, software, applications and service roles in Hyderabad.",
};

export default function CareersPage() {
  return (
    <>
      <SiteHeaderFull />
      <Careers />
      <Footer />
    </>
  );
}
