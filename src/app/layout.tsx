import type { Metadata } from "next";
import { Sora, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

// 'Creo' is a commercial face. Sora is the closest free analogue for our heading
// system — geometric, wide proportions, strong display feel. Aliased as --font-display.
const display = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// 'Madley' is also commercial. Outfit is a humanist geometric sans that complements
// Sora and reads cleanly at body sizes. Aliased as --font-body.
const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISAVE Production — Audio Visual Experts",
  description:
    "Premium AV production for events, livestreams, studios and technical event support. ISAVE delivers seamless audio visual experiences.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>
        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
