import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-display" 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "GlamGo | Discover Top Independent Stylists",
  description: "Book high-end independent hair stylists and salons. Seamless scheduling, transparent pricing, flawless results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${dmSans.className} film-grain`}>
        <SmoothScroll>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
