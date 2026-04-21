"use client";

import ZelligeRenderer from "./ZelligeRenderer";
import { COLLECTIONS, euroFormatter } from "@/lib/collections";

export default function CollectionsSection() {
  return (
    <section id="collections" className="relative bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
              Collections
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              Trois palettes, mille variations
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-charcoal/70">
              Chaque collection part d'un motif unique — le khatam à huit branches — et décline des harmonies chromatiques éprouvées par nos maîtres-artisans.
            </p>
          </div>
          <a
            href="#custom"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-charcoal/70 transition hover:text-charcoal"
          >
            Configurer votre motif
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {COLLECTIONS.map((card) => (
            <article
              key={card.id}
              className="group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream transition hover:border-charcoal/30"
            >
              <div className="aspect-square bg-charcoal/5">
                <ZelligeRenderer
                  colors={card.palette}
                  enableHover
                  transitionDuration={0.8}
                  className="h-full w-full"
                />
              </div>
              <div className="flex items-start justify-between gap-6 p-7">
                <div className="min-w-0">
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                    {card.tagline}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-charcoal">
                    {card.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                    {card.description}
                  </p>
                  <p className="mt-4 font-serif text-sm tabular-nums text-charcoal/70">
                    À partir de{" "}
                    <span className="text-charcoal">
                      {euroFormatter.format(card.price)}
                    </span>
                    <span className="text-charcoal/50"> / m²</span>
                  </p>
                </div>
                <span className="mt-1 grid h-9 w-9 flex-none place-items-center rounded-full border border-charcoal/20 text-charcoal/70 transition group-hover:translate-x-1 group-hover:border-charcoal group-hover:text-charcoal">
                  →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
