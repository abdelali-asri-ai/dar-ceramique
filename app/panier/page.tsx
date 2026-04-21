import type { Metadata } from "next";

import CartView from "@/components/CartView";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Panier · DAR CERAMIQUE",
  description: "Votre sélection de carreaux et motifs, prêts à être commandés.",
};

export default function PanierPage() {
  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative border-b border-charcoal/10 pb-10 pt-40 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Panier
          </span>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
            Votre sélection
          </h1>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CartView />
        </div>
      </section>

      <Footer />
    </main>
  );
}
