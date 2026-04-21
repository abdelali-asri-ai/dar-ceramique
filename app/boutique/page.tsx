import type { Metadata } from "next";

import BoutiqueCatalog from "@/components/BoutiqueCatalog";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TrustStrip from "@/components/TrustStrip";
import ZelligeTiling from "@/components/ZelligeTiling";
import { getCollection } from "@/lib/collections";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Boutique · DAR CERAMIQUE",
  description:
    "Carreaux unis émaillés 10 × 10 cm et motifs composés. Fabriqués au Maroc, livrés dans toute l'Europe.",
};

const HERO_PALETTE = getCollection("heritage")!.palette;

export default function BoutiquePage() {
  const uni = PRODUCTS.filter((p) => p.category === "uni").length;
  const motif = PRODUCTS.filter((p) => p.category === "motif").length;

  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative overflow-hidden border-b border-charcoal/10 pb-16 pt-36 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-[0.35]"
        >
          <ZelligeTiling colors={HERO_PALETTE} tileSize={140} />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-cream/60 to-cream" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Boutique
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] text-charcoal md:text-6xl">
            Le catalogue de l'atelier
          </h1>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-charcoal/70">
            Nos carreaux unis 10 × 10 cm et nos motifs composés, prêts à commander. Chaque pièce est taillée, émaillée et cuite au Maroc.
          </p>

          <dl className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/55">
            <Stat value={PRODUCTS.length} label="Références" />
            <Stat value={uni} label="Carreaux unis" />
            <Stat value={motif} label="Motifs composés" />
            <Stat value="100 %" label="Fait au Maroc" isString />
          </dl>
        </div>
      </section>

      <section className="relative py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <BoutiqueCatalog />
        </div>
      </section>

      <TrustStrip />

      <Footer />
    </main>
  );
}

function Stat({
  value,
  label,
  isString,
}: {
  value: number | string;
  label: string;
  isString?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-serif text-3xl normal-case tracking-normal text-charcoal">
        {isString ? value : String(value).padStart(2, "0")}
      </span>
      <span>{label}</span>
    </div>
  );
}
