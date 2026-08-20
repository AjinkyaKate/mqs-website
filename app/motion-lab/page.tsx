import type { Metadata } from "next";
import SiteHeaderFull from "@/components/nav/SiteHeaderFull";
import MotionLab from "@/components/motion/MotionLab";

/* Internal review route for choosing the site's scroll-motion set. Not linked
   from anywhere and excluded from search. Delete once the set is agreed; the
   primitives in components/motion are what stays. */
export const metadata: Metadata = {
  title: "Scroll motion options | MQS internal",
  robots: { index: false, follow: false },
};

export default function MotionLabPage() {
  return (
    <>
      <SiteHeaderFull />
      <MotionLab />
    </>
  );
}
