"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

import { useCart } from "@/lib/cart";

interface OrderSuccessProps {
  reference: string;
  demo: boolean;
}

export default function OrderSuccess({ reference, demo }: OrderSuccessProps) {
  const { clear, hydrated } = useCart();

  useEffect(() => {
    if (hydrated) clear();
  }, [hydrated, clear]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-2xl flex-col items-center py-16 text-center"
    >
      <div className="grid h-20 w-20 place-items-center rounded-full bg-gold text-3xl text-charcoal">
        ✓
      </div>

      <h1 className="mt-8 font-serif text-4xl text-charcoal md:text-5xl">
        Commande confirmée
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-charcoal/65">
        {demo
          ? "Paiement simulé — en mode démo, aucune transaction réelle. Dès que Stripe est activé, un email de confirmation est automatiquement envoyé au client et à l'atelier."
          : "Un email récapitulatif vous attend dans votre boîte. Nos maâlems préparent votre commande au Maroc — livraison estimée sous 10 jours ouvrés."}
      </p>

      <dl className="mt-10 flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/55">
        <dt>Référence</dt>
        <dd className="font-serif text-2xl normal-case tracking-normal text-charcoal">
          {reference}
        </dd>
      </dl>

      {demo && (
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal/5 px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.26em] text-charcoal/60">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Mode démo · Stripe non encore activé
        </span>
      )}

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/boutique"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
        >
          Retour à la boutique
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/60 transition hover:text-charcoal"
        >
          Revenir à l'accueil
        </Link>
      </div>
    </motion.div>
  );
}
