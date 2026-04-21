"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/lib/cart";

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export default function CheckoutView() {
  const { items, totals, hydrated } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h2 className="font-serif text-3xl text-charcoal">Panier vide</h2>
        <p className="mt-4 text-sm text-charcoal/65">
          Vous ne pouvez pas passer commande sans articles. Commencez par le catalogue.
        </p>
        <Link
          href="/boutique"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
        >
          Voir la boutique →
        </Link>
      </div>
    );
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const name = `${formData.get("firstName") ?? ""} ${formData.get("lastName") ?? ""}`.trim();

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          lines: items.map((it) => ({ slug: it.product.slug, qty: it.qty })),
        }),
      });

      const data = (await res.json()) as { sessionUrl?: string; error?: string };
      if (!res.ok || !data.sessionUrl) {
        throw new Error(data.error ?? "checkout_failed");
      }
      // Redirection Stripe Checkout (ou page succès démo)
      window.location.href = data.sessionUrl;
    } catch (err) {
      console.error(err);
      setError(
        "Impossible de lancer le paiement. Réessayez dans un instant ou contactez l'atelier."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
      <form onSubmit={handleSubmit} className="space-y-10">
        <Fieldset
          number="01"
          title="Vos coordonnées"
          subtitle="Pour vous tenir informé de l'avancée de la commande."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Prénom" name="firstName" required autoComplete="given-name" />
            <Input label="Nom" name="lastName" required autoComplete="family-name" />
            <Input label="Email" name="email" type="email" required autoComplete="email" className="sm:col-span-2" />
            <Input label="Téléphone" name="phone" type="tel" required autoComplete="tel" className="sm:col-span-2" />
          </div>
        </Fieldset>

        <Fieldset
          number="02"
          title="Adresse de livraison"
          subtitle="Livraison Europe · 10 jours ouvrés à compter de l'envoi."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Adresse" name="address" required className="sm:col-span-2" autoComplete="street-address" />
            <Input label="Code postal" name="zip" required autoComplete="postal-code" />
            <Input label="Ville" name="city" required autoComplete="address-level2" />
            <Input label="Pays" name="country" defaultValue="France" required autoComplete="country-name" className="sm:col-span-2" />
          </div>
        </Fieldset>

        <Fieldset
          number="03"
          title="Paiement sécurisé"
          subtitle="Redirection vers Stripe — carte bancaire, Apple Pay, Google Pay, 3D Secure."
        >
          <div className="rounded-2xl border border-charcoal/15 bg-charcoal/[0.02] p-5">
            <div className="flex items-center justify-between">
              <span className="text-[0.65rem] uppercase tracking-[0.26em] text-charcoal/60">
                Mode de paiement
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-[0.55rem] uppercase tracking-[0.24em] text-charcoal/55 ring-1 ring-charcoal/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Stripe · SSL · 3D Secure
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              À la confirmation, vous êtes redirigé vers la page de paiement hébergée par Stripe. Aucune donnée de carte ne transite par notre serveur.
            </p>
          </div>
        </Fieldset>

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-400/30 bg-red-50 px-5 py-4 text-sm text-red-900"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-charcoal px-7 py-4 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90 disabled:opacity-70"
        >
          {submitting
            ? "Redirection vers le paiement…"
            : `Payer ${euro.format(totals.total)} en sécurité`}
          <span aria-hidden className="transition group-hover:translate-x-1">
            →
          </span>
        </button>
      </form>

      <aside className="md:sticky md:top-28 md:self-start">
        <div className="rounded-3xl border border-charcoal/10 bg-cream p-7 shadow-[0_30px_80px_-50px_rgba(26,26,26,0.35)]">
          <h2 className="font-serif text-xl text-charcoal">Votre commande</h2>

          <ul className="mt-6 space-y-5">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.product.sku}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-4"
                >
                  <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal/5">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-charcoal px-1 font-serif text-[0.65rem] tabular-nums text-cream">
                      {item.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-serif text-base text-charcoal">
                      {item.product.name}
                    </div>
                    <div className="mt-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-charcoal/50">
                      {item.product.subtitle}
                    </div>
                  </div>
                  <div className="flex-none font-serif text-sm tabular-nums text-charcoal">
                    {euro.format(item.lineTotal)}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <dl className="mt-8 space-y-2.5 border-t border-charcoal/10 pt-6 text-sm">
            <Row label="Sous-total HT" value={euro.format(totals.subtotal)} />
            <Row label="TVA 20 %" value={euro.format(totals.tax)} muted />
            <Row label="Livraison" value="Offerte" muted />
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t border-charcoal/15 pt-4">
            <span className="text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/70">
              Total TTC
            </span>
            <span className="font-serif text-2xl tabular-nums text-charcoal">
              {euro.format(totals.total)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Fieldset({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-charcoal/10 pt-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="font-serif text-3xl text-gold/70">{number}</span>
        <div>
          <legend className="font-serif text-2xl text-charcoal">{title}</legend>
          <p className="mt-1 text-xs text-charcoal/55">{subtitle}</p>
        </div>
      </div>
      {children}
    </fieldset>
  );
}

function Input({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={["relative block", className ?? ""].join(" ")}>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder ?? " "}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="peer w-full rounded-xl border border-charcoal/15 bg-cream px-4 pb-2.5 pt-6 font-serif text-base text-charcoal placeholder-transparent transition focus:border-charcoal focus:outline-none"
      />
      <span className="pointer-events-none absolute left-4 top-2 text-[0.55rem] uppercase tracking-[0.28em] text-charcoal/55">
        {label}
      </span>
    </label>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt
        className={[
          "text-[0.6rem] uppercase tracking-[0.24em]",
          muted ? "text-charcoal/50" : "text-charcoal/70",
        ].join(" ")}
      >
        {label}
      </dt>
      <dd
        className={[
          "font-serif tabular-nums",
          muted ? "text-sm text-charcoal/60" : "text-base text-charcoal",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
