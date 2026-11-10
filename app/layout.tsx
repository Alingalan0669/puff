import type { Metadata } from "next";
import { Bowlby_One, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";

const display = Bowlby_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://puffindose.example.com"),
  title: {
    default: "Puffin Dose | Vape Shop in Lupon, Philippines",
    template: "%s | Puffin Dose",
  },
  description:
    "Puffin Dose - legit local vape shop in Purok Malinawon, Bagumbayan, Lupon, Philippines. Disposable vapes, pods, devices, e-juice, coils & accessories. Est. 2022.",
  openGraph: {
    title: "Puffin Dose | Vape Shop in Lupon, Philippines",
    description: "Puff. Chill. Repeat. Authentic vapes, fast local delivery, legit since 2022.",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puffin Dose",
    description: "Puff. Chill. Repeat. Vape shop in Lupon, Philippines.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} font-body`}>
        <AgeGate />
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
