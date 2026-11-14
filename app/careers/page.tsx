import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import Footer from "@/components/footer/Footer";
import Careers, { type CareerOpening } from "@/components/careers/Careers";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | MQS",
  description:
    "Join the team building X-ray, CT and NDT inspection systems for aerospace, defence, automotive and electronics. Mechanical, electronics, software, applications and service roles in Hyderabad.",
};

export default async function CareersPage() {
  const now = new Date();
  let openings: CareerOpening[] = [];
  try {
    openings = await prisma.jobOpening.findMany({
      where: {
        published: true,
        status: "open",
        OR: [{ closesAt: null }, { closesAt: { gte: now } }],
      },
      orderBy: [{ openedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        externalId: true,
        title: true,
        department: true,
        location: true,
        employmentType: true,
        applicationUrl: true,
      },
    });
  } catch (caught) {
    // A temporary ERP/database outage must not take the public Careers page
    // down; it falls back to the existing talent-pool state and logs the fault.
    console.error("[careers-openings]", caught);
  }

  return (
    <>
      <SiteHeaderFull />
      <Careers openings={openings} />
      <Footer />
    </>
  );
}
