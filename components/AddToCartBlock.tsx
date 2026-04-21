"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";

import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

interface AddToCartBlockProps {
  product: Product;
}

export default function AddToCartBlock({ product }: AddToCartBlockProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(product.category === "uni" ? 10 : 1);
  const [flash, setFlash] = useState<null | "added">(null);

  const unit = product.unit === "m2" ? "m²" : "carreau";
  const unitPlural = product.unit === "m2" ? "m²" : "carreaux";

  const handleAdd = useCallback(() => {
    addItem(product.slug, qty);
    setFlash("added");
    window.setTimeout(() => setFlash(null), 2200);
  }, [addItem, product.slug, qty]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-charcoal/20">
          <StepButton
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            label="Diminuer"
            disabled={qty <= 1}
          >
            −
          </StepButton>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => {
              const n = Number.parseInt(e.target.value, 10);
              setQty(Number.isFinite(n) ? Math.max(1, n) : 1);
            }}
            aria-label={`Quantité en ${unit}`}
            className="w-16 bg-transparent text-center font-serif text-lg tabular-nums text-charcoal focus:outline-none"
          />
          <StepButton
            onClick={() => setQty((q) => q + 1)}
            label="Augmenter"
          >
            +
          </StepButton>
        </div>
        <span className="text-[0.65rem] uppercase tracking-[0.26em] text-charcoal/55">
          {qty > 1 ? unitPlural : unit}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-charcoal px-8 py-4 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
        >
          Ajouter au panier
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/25 px-7 py-4 text-xs uppercase tracking-[0.28em] text-charcoal transition hover:border-charcoal"
        >
          Demander un échantillon
        </Link>
      </div>

      <AnimatePresence>
        {flash === "added" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="mt-4 inline-flex items-center gap-3 rounded-full bg-charcoal/95 py-2 pl-2 pr-4 text-cream"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-charcoal">
              ✓
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.28em]">
              Ajouté au panier
            </span>
            <Link
              href="/panier"
              className="text-[0.65rem] uppercase tracking-[0.28em] text-gold underline-offset-4 hover:underline"
            >
              Voir
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepButton({
  children,
  onClick,
  label,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="grid h-10 w-10 place-items-center text-lg text-charcoal/80 transition hover:text-charcoal disabled:opacity-30"
    >
      {children}
    </button>
  );
}
