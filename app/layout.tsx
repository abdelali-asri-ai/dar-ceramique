import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { CartProvider } from "@/lib/cart";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DAR CERAMIQUE · L'Art de la Géométrie Sacrée, Redéfini",
  description:
    "Atelier paramétrique de zellige marocain. Fragments taillés à la main, assemblés en khatam à huit branches. Maroc.",
  metadataBase: new URL("https://darceramique.com"),
  openGraph: {
    title: "DAR CERAMIQUE · L'Art de la Géométrie Sacrée",
    description: "Zellige paramétrique, héritage du Maroc.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream font-sans text-charcoal antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
