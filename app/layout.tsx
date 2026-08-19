import type { Metadata } from "next";
import { Figtree, Archivo } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/* Canonical origin. Env-overridable because the site is still on its staging
   domain: set NEXT_PUBLIC_SITE_URL to the live domain and canonicals, OG URLs
   and the sitemap follow without a code change. */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://trivexa-test.vercel.app";

/* Site-wide defaults. Every inner page sets its own absolute title, so there is
   deliberately no title template: adding one would double the "| MQS
   Technologies" the page titles already carry.

   These replace the Machin starter copy ("Engineering heavy-duty performance",
   "equipment for heavy loads"), which described the wrong industry on the most
   important page. The home brief is the one client document with no PAGE SETUP
   block, so these follow the pattern the other five briefs establish and use
   only claims the site already makes. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Industrial X-Ray, CT & NDT Inspection Systems | MQS Technologies",
  description:
    "Digital radiography, industrial CT, high-energy X-ray and automated test systems for aerospace, defence, automotive and electronics. Engineered in Hyderabad since 1994.",
  applicationName: "MQS Technologies",
  /* Only the stable fields here. og:title and og:description are deliberately
     omitted so Next falls back to each page's own title and description: setting
     them at the layout level gave every inner page the home page's share card. */
  openGraph: {
    type: "website",
    siteName: "MQS Technologies",
    locale: "en_IN",
    images: [{ url: "/assets/og-default.jpg", width: 1200, height: 630, alt: "MQS application engineers at a digital radiography system in Hyderabad" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og-default.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
