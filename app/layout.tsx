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

export const metadata: Metadata = {
  title: "MQS Technologies — Engineering heavy-duty performance.",
  description:
    "Precision-engineered industrial equipment for heavy loads, operations, and demanding environments.",
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
