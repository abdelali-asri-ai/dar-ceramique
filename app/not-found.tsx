import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ZelligeTiling from "@/components/ZelligeTiling";
import { getCollection } from "@/lib/collections";

const PALETTE = getCollection("midnight-casablanca")!.palette;

export default function NotFound() {
  return (
    <main className="relative bg-cream">
      <Header />

      <section className="relative overflow-hidden pb-28 pt-40 md:pt-52">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
        >
          <ZelligeTiling colors={PALETTE} tileSize={200} />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/80 to-cream" />
        </div>

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            Erreur 404
          </span>
          <h1 className="mt-6 font-serif text-6xl leading-[1.05] text-charcoal md:text-8xl">
            Ce fragment
            <br />
            n'a pas été trouvé.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-charcoal/65">
            La page que vous cherchez a peut-être été déplacée, renommée ou n'a jamais existé.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-cream transition hover:bg-charcoal/90"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/25 px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-charcoal transition hover:border-charcoal"
            >
              Voir la boutique →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
