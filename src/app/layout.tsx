import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ensureCatalog } from "@/lib/seed";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SOLEHAUS | Sneakers, Combos & More",
    template: "%s | SOLEHAUS",
  },
  description:
    "Sneakers, sneaker combos, weaves, caps and more. Spring clearance — massive discounts and free delivery across South Africa.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: ReactNode }) {
  await ensureCatalog();

  return (
    <html lang="en-ZA">
      <body className={`${inter.className} min-h-screen bg-white text-[#121212] antialiased`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
