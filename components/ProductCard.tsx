import Image from "next/image";
import Link from "next/link";

import { formatPrice, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  /** `priority` pour la première rangée de la grille uniquement. */
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-charcoal/10 bg-cream transition hover:border-charcoal/40 hover:shadow-[0_30px_80px_-50px_rgba(26,26,26,0.4)]"
    >
      <div className="relative aspect-square overflow-hidden bg-charcoal/5">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-cream/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/70 backdrop-blur"
          aria-hidden
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: product.accent }}
          />
          {product.category === "uni" ? "Uni" : "Motif"}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-5">
        <div>
          <h3 className="font-serif text-xl leading-tight text-charcoal">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-charcoal/50">
            {product.subtitle}
          </p>
        </div>

        <div className="flex items-baseline justify-between gap-3">
          <span className="font-serif text-base tabular-nums text-charcoal">
            {formatPrice(product)}
          </span>
          <span
            aria-hidden
            className="grid h-8 w-8 flex-none place-items-center rounded-full border border-charcoal/20 text-charcoal/70 transition group-hover:translate-x-1 group-hover:border-charcoal group-hover:text-charcoal"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
