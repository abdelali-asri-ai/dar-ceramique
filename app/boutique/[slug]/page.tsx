import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartBlock from "@/components/AddToCartBlock";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import {
  PRODUCTS,
  formatPrice,
  getProduct,
} from "@/lib/products";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Produit introuvable · DAR CERAMIQUE" };
  return {
    title: `${product.name} · DAR CERAMIQUE`,
    description: product.description,
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  const specs: { label: string; value: string }[] =
    product.category === "uni"
      ? [
          { label: "Format", value: "10 × 10 cm" },
          { label: "Épaisseur", value: "10 mm" },
          { label: "Matière", value: "Terre cuite émaillée" },
          { label: "Finition", value: "Émail craquelé artisanal" },
          { label: "Poids", value: "≈ 0,23 kg / carreau" },
          { label: "Origine", value: "Maroc" },
        ]
      : [
          { label: "Format", value: "Panneau composé, 30 × 30 cm" },
          { label: "Épaisseur", value: "10 mm" },
          { label: "Matière", value: "Terre cuite émaillée" },
          { label: "Pose", value: "Sur chape ou adhésif spécifique" },
          { label: "Poids", value: "≈ 23 kg / m²" },
          { label: "Origine", value: "Maroc" },
        ];

  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative pt-36 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-10 flex flex-wrap items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/50"
          >
            <Link href="/" className="transition hover:text-charcoal">
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link href="/boutique" className="transition hover:text-charcoal">
              Boutique
            </Link>
            <span aria-hidden>/</span>
            <span className="text-charcoal/80">{product.name}</span>
          </nav>

          <div className="grid gap-10 md:grid-cols-[1.05fr_1fr] md:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal/5 shadow-[0_40px_100px_-40px_rgba(26,26,26,0.45)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-gold">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: product.accent }}
                  aria-hidden
                />
                {product.category === "uni" ? "Carreau uni" : "Motif composé"}
              </span>

              <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
                {product.name}
              </h1>

              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.26em] text-charcoal/55">
                {product.subtitle}
              </p>

              <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-charcoal/75">
                {product.description}
              </p>

              <div className="mt-10 flex items-baseline gap-4">
                <span className="font-serif text-4xl tabular-nums text-charcoal">
                  {formatPrice(product)}
                </span>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.26em] text-charcoal/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    En stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.26em] text-charcoal/55">
                    <span className="h-1.5 w-1.5 rounded-full bg-charcoal/40" />
                    Sur commande · 6 semaines
                  </span>
                )}
              </div>

              <div className="mt-8">
                <AddToCartBlock product={product} />
              </div>

              <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-charcoal/10 pt-8 text-sm">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-[0.6rem] uppercase tracking-[0.26em] text-charcoal/50">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 font-serif text-base text-charcoal">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative mt-28 border-t border-charcoal/10 py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-10 flex items-baseline justify-between gap-6">
              <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
                Dans la même famille
              </h2>
              <Link
                href="/boutique"
                className="text-xs uppercase tracking-[0.28em] text-charcoal/70 transition hover:text-charcoal"
              >
                Tout le catalogue →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
