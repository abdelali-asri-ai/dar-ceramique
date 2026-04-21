import type { Metadata } from "next";

import CheckoutView from "@/components/CheckoutView";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Commander · DAR CERAMIQUE",
  description: "Finalisez votre commande de zellige — livraison Europe, paiement sécurisé.",
};

export default function CheckoutPage() {
  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative border-b border-charcoal/10 pb-10 pt-40 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Commande
          </span>
          <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
            Finaliser la commande
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-charcoal/65">
            Vos informations sont transmises via une connexion chiffrée. Nos maâtres-artisans sont notifiés dès validation.
          </p>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CheckoutView />
        </div>
      </section>

      <Footer />
    </main>
  );
}
