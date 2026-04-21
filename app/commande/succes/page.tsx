import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import OrderSuccess from "@/components/OrderSuccess";

export const metadata: Metadata = {
  title: "Commande confirmée · DAR CERAMIQUE",
  description: "Merci pour votre commande — l'atelier du Maroc prend le relais.",
};

interface PageProps {
  searchParams: { ref?: string; demo?: string; session_id?: string };
}

export default function OrderSuccessPage({ searchParams }: PageProps) {
  const reference = searchParams.ref ?? "ZLJ-DEMO-000";
  const demo = searchParams.demo === "1" || !searchParams.session_id;

  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative border-b border-charcoal/10 pb-10 pt-40 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Merci
          </span>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <OrderSuccess reference={reference} demo={demo} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
