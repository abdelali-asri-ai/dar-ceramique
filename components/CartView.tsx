"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/lib/cart";

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export default function CartView() {
  const { items, totals, setQty, remove, hydrated } = useCart();

  if (!hydrated) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-charcoal/15 text-charcoal/40">
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M2 3h2l1.2 8.2a1 1 0 0 0 1 .8h5.6a1 1 0 0 0 1-.8L14 5H5" />
            <circle cx="6.5" cy="14" r="0.8" />
            <circle cx="11.5" cy="14" r="0.8" />
          </svg>
        </div>
        <h2 className="mt-8 font-serif text-3xl text-charcoal">
          Votre panier est vide
        </h2>
        <p className="mt-3 max-w-md text-sm text-charcoal/65">
          Chaque carreau est taillé, émaillé et cuit au Maroc. Commencez votre sélection dans la boutique.
        </p>
        <Link
          href="/boutique"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
        >
          Découvrir le catalogue
          <span aria-hidden>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
      <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const unit = item.product.unit === "m2" ? "m²" : item.qty > 1 ? "carreaux" : "carreau";
            return (
              <motion.li
                key={item.product.sku}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-[88px_1fr_auto] items-center gap-5 py-6 md:grid-cols-[112px_1fr_auto_auto] md:gap-8"
              >
                <Link
                  href={`/boutique/${item.product.slug}`}
                  className="relative aspect-square overflow-hidden rounded-xl border border-charcoal/10 bg-charcoal/5"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>

                <div className="min-w-0">
                  <Link
                    href={`/boutique/${item.product.slug}`}
                    className="font-serif text-xl text-charcoal hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <div className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-charcoal/55">
                    {item.product.subtitle}
                  </div>
                  <div className="mt-2 font-serif text-sm tabular-nums text-charcoal/70">
                    {euro.format(item.product.price)}{" "}
                    <span className="text-charcoal/45">
                      / {item.product.unit === "m2" ? "m²" : "carreau"}
                    </span>
                  </div>

                  <div className="mt-4 inline-flex items-center rounded-full border border-charcoal/15 md:hidden">
                    <QtyBtn onClick={() => setQty(item.product.slug, item.qty - 1)}>
                      −
                    </QtyBtn>
                    <span className="w-10 text-center font-serif text-sm tabular-nums">
                      {item.qty}
                    </span>
                    <QtyBtn onClick={() => setQty(item.product.slug, item.qty + 1)}>
                      +
                    </QtyBtn>
                  </div>
                </div>

                <div className="hidden items-center rounded-full border border-charcoal/15 md:inline-flex">
                  <QtyBtn onClick={() => setQty(item.product.slug, item.qty - 1)}>
                    −
                  </QtyBtn>
                  <span className="w-10 text-center font-serif text-sm tabular-nums">
                    {item.qty}
                  </span>
                  <QtyBtn onClick={() => setQty(item.product.slug, item.qty + 1)}>
                    +
                  </QtyBtn>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-serif text-lg tabular-nums text-charcoal">
                    {euro.format(item.lineTotal)}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-charcoal/45">
                    {item.qty} {unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(item.product.slug)}
                    className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/50 transition hover:text-charcoal"
                  >
                    Retirer
                  </button>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <aside className="md:sticky md:top-28 md:self-start">
        <div className="rounded-3xl border border-charcoal/10 bg-cream p-7 shadow-[0_30px_80px_-50px_rgba(26,26,26,0.35)]">
          <h2 className="font-serif text-2xl text-charcoal">Récapitulatif</h2>

          <dl className="mt-6 space-y-3 text-sm">
            <Row label="Sous-total HT" value={euro.format(totals.subtotal)} />
            <Row label="TVA 20 %" value={euro.format(totals.tax)} muted />
            <Row label="Livraison" value="Calculée à l'étape suivante" muted />
          </dl>

          <div className="mt-6 flex items-baseline justify-between border-t border-charcoal/15 pt-5">
            <span className="text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/70">
              Total TTC
            </span>
            <motion.span
              key={totals.total}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-serif text-3xl tabular-nums text-charcoal"
            >
              {euro.format(totals.total)}
            </motion.span>
          </div>

          <Link
            href="/checkout"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-4 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
          >
            Passer la commande
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/boutique"
            className="mt-3 inline-flex w-full items-center justify-center text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/60 transition hover:text-charcoal"
          >
            Continuer mes achats
          </Link>

          <ul className="mt-8 space-y-3 border-t border-charcoal/10 pt-6 text-[0.65rem] uppercase tracking-[0.24em] text-charcoal/55">
            <li className="flex items-center gap-3">
              <Dot /> Livraison protégée, Europe sous 10 j
            </li>
            <li className="flex items-center gap-3">
              <Dot /> Échantillon offert sur demande
            </li>
            <li className="flex items-center gap-3">
              <Dot /> Paiement sécurisé (Stripe)
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function QtyBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-9 w-9 place-items-center text-charcoal/70 transition hover:text-charcoal"
    >
      {children}
    </button>
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
          "text-[0.65rem] uppercase tracking-[0.24em]",
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

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-gold" aria-hidden />;
}

function CartSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 rounded bg-charcoal/10" />
      <div className="mt-6 h-32 rounded-2xl bg-charcoal/5" />
      <div className="mt-4 h-32 rounded-2xl bg-charcoal/5" />
    </div>
  );
}
