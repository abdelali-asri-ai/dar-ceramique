import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Commande annulée · DAR CERAMIQUE",
  description: "Le paiement a été annulé. Votre panier est conservé.",
};

export default function OrderCancelledPage() {
  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative border-b border-charcoal/10 pb-10 pt-40 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Annulée
          </span>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
            Paiement annulé
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal/70">
            Pas de prélèvement. Votre panier est conservé en l'état — vous pouvez le retrouver quand vous le souhaitez.
          </p>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 sm:flex-row md:px-10">
          <Link
            href="/panier"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
          >
            Retourner au panier
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-charcoal transition hover:border-charcoal"
          >
            Contacter l'atelier
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
