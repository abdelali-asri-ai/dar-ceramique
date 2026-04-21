"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

import { randomPalette, type ColorMap } from "@/lib/colors";
import { getCollection } from "@/lib/collections";
import ZelligeTiling from "./ZelligeTiling";

const INITIAL_PALETTE: ColorMap = getCollection("sahara-minimal")!.palette;

export default function Hero() {
  const [palette, setPalette] = useState<ColorMap>(INITIAL_PALETTE);
  const [isRemixing, setIsRemixing] = useState(false);

  const remix = useCallback(() => {
    setIsRemixing(true);
    setPalette(randomPalette());
    window.setTimeout(() => setIsRemixing(false), 1000);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-cream">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.92]"
        animate={{ rotate: 360 }}
        transition={{ duration: 720, ease: "linear", repeat: Infinity }}
      >
        <ZelligeTiling colors={palette} tileSize={240} />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(250,244,230,0)_0%,_rgba(250,244,230,0.55)_50%,_rgba(250,244,230,0.92)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-40 text-center md:pt-48">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-charcoal/15 bg-cream/70 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.32em] text-charcoal/75 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Artisans du Maroc · depuis 1924
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif text-5xl leading-[1.05] text-charcoal md:text-7xl lg:text-[5.5rem]"
        >
          L'Art de la{" "}
          <span className="relative inline-block italic">
            Géométrie Sacrée
            <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-gold/80" />
          </span>
          ,
          <br className="hidden md:block" /> Redéfini.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-8 max-w-xl font-sans text-base leading-relaxed tracking-wide text-charcoal/75 md:text-lg"
        >
          Chaque fragment est taillé à la main, puis réassemblé en khatam — l'étoile à huit branches. Nous prolongeons ce geste millénaire dans un moteur paramétrique qui vous appartient.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={remix}
            disabled={isRemixing}
            className="group relative inline-flex items-center gap-3 rounded-full bg-charcoal px-8 py-4 text-xs uppercase tracking-[0.28em] text-cream shadow-lg shadow-charcoal/10 transition hover:bg-charcoal/90 disabled:opacity-80"
          >
            <span
              aria-hidden
              className={[
                "h-2 w-2 rounded-full bg-gold transition-transform duration-700",
                isRemixing ? "scale-150" : "scale-100",
              ].join(" ")}
            />
            Personnaliser votre motif
            <svg
              className="h-3 w-3 translate-x-0 transition-transform group-hover:translate-x-1"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M1 6h10M7 2l4 4-4 4" />
            </svg>
          </button>

          <a
            href="#collections"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/25 px-7 py-4 text-xs uppercase tracking-[0.28em] text-charcoal transition hover:border-charcoal"
          >
            Voir les collections
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-20 flex items-center gap-6 text-[0.65rem] uppercase tracking-[0.3em] text-charcoal/55"
        >
          <span>Maroc</span>
          <span className="h-px w-12 bg-charcoal/20" />
          <span>Atelier paramétrique</span>
        </motion.div>
      </div>
    </section>
  );
}
