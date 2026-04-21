"use client";

import { motion } from "framer-motion";

import ZelligeRenderer from "./ZelligeRenderer";
import { getCollection } from "@/lib/collections";

const NIGHT_PALETTE = getCollection("midnight-casablanca")!.palette;

const STEPS = [
  {
    n: "01",
    title: "La taille",
    text: "Le maâlem frappe la plaque de terre cuite émaillée, libérant le fragment — triangle, losange, étoile.",
  },
  {
    n: "02",
    title: "La composition",
    text: "Les fragments sont posés à l'envers, suivant une géométrie tracée à la règle et au compas.",
  },
  {
    n: "03",
    title: "La coulée",
    text: "La chape de ciment blanc scelle l'assemblage. Le motif n'apparaît qu'une fois la pièce retournée.",
  },
];

export default function AtelierSection() {
  return (
    <section id="atelier" className="relative overflow-hidden bg-charcoal py-28 text-cream md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.1fr] md:px-10">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="relative aspect-square w-full max-w-lg"
          >
            <div className="absolute inset-0 -rotate-[8deg] rounded-3xl bg-charcoal/40 ring-1 ring-cream/10" />
            <div className="absolute inset-0 overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <ZelligeRenderer
                colors={NIGHT_PALETTE}
                enableHover
                transitionDuration={0.8}
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
            L'Atelier
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
            Le geste,
            <br />
            avant l'algorithme
          </h2>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-cream/70">
            Notre moteur paramétrique n'existe que parce qu'un maître artisan, au Maroc, garantit la justesse de chaque angle. Nous codons ce qu'il transmet — rien de plus.
          </p>

          <ol className="mt-12 space-y-8">
            {STEPS.map((step) => (
              <li key={step.n} className="group grid grid-cols-[auto_1fr] gap-6 border-t border-cream/15 pt-6">
                <span className="font-serif text-4xl text-gold/80 transition group-hover:text-gold">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-cream">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
