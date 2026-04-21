import Image from "next/image";
import Link from "next/link";

import { PRODUCTS, FORMATS, type FormatId } from "@/lib/products";

// Regroupe les produits par format, en respectant l'ordre de FORMATS
const GROUPS: { id: FormatId; label: string; products: typeof PRODUCTS }[] =
  FORMATS.flatMap(({ id, label }) => {
    const products = PRODUCTS.filter((p) => p.format === id);
    return products.length > 0 ? [{ id, label, products }] : [];
  });

export default function GallerySection() {
  return (
    <section id="galerie" className="relative bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* En-tête de section */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
              Galerie produits
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              Toute notre collection
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-charcoal/70">
              {PRODUCTS.length} références réparties en {GROUPS.length} formats — tous taillés et émaillés au Maroc.
            </p>
          </div>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-charcoal/70 transition hover:text-charcoal"
          >
            Commander en boutique
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Groupes par format */}
        <div className="space-y-16">
          {GROUPS.map(({ id, label, products }) => (
            <div key={id}>
              {/* Titre du groupe */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                  Format
                </span>
                <h3 className="font-serif text-2xl text-charcoal">{label}</h3>
                <span className="h-px flex-1 bg-charcoal/10" />
                <span className="text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/40">
                  {products.length} référence{products.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Grille des produits du groupe */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                {products.map((product) => (
                  <Link
                    key={product.sku}
                    href={`/boutique/${product.slug}`}
                    className="group relative overflow-hidden rounded-xl bg-charcoal/5"
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.06]"
                      />
                      <span
                        aria-hidden
                        className="absolute left-2 top-2 h-3 w-3 rounded-full border border-white/60 shadow-sm"
                        style={{ background: product.accent }}
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 translate-y-full bg-charcoal/90 px-3 py-2.5 transition duration-300 group-hover:translate-y-0">
                      <p className="truncate text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream">
                        {product.name}
                      </p>
                      <p className="mt-0.5 truncate text-[0.55rem] uppercase tracking-[0.16em] text-cream/55">
                        {product.subtitle.split("·")[1]?.trim() ?? product.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
