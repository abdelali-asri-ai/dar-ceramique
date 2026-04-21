"use client";

import { useState } from "react";

import EditorPanel from "./EditorPanel";
import TileWallPreview from "./TileWallPreview";
import ZelligeTiling from "./ZelligeTiling";
import { COLLECTIONS, type Collection } from "@/lib/collections";

const DEFAULT_COLLECTION = COLLECTIONS[0];

export default function CustomSection() {
  const [activeCollection, setActiveCollection] = useState<Collection>(DEFAULT_COLLECTION);
  const [gridSize, setGridSize] = useState<number>(3);
  const [surface, setSurface] = useState<number>(12);

  return (
    <section id="custom" className="relative bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-[0.65rem] uppercase tracking-[0.32em] text-gold">
              Configurateur
            </span>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              Votre motif,
              <br />
              tessellé à votre mur.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-charcoal/70">
              Choisissez une collection ou un carreau du catalogue, ajustez la densité de grille, saisissez votre surface. Les volumes et le prix se recalculent à chaque geste.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[0.6rem] uppercase tracking-[0.28em] text-charcoal/50">
            <span>
              <span className="font-serif text-xl text-charcoal">
                {gridSize * gridSize}
              </span>{" "}
              motif{gridSize * gridSize > 1 ? "s" : ""}
            </span>
            <span className="h-4 w-px bg-charcoal/20" />
            <span>
              <span className="font-serif text-xl text-charcoal">
                {Math.max(0, surface).toLocaleString("fr-FR", {
                  maximumFractionDigits: 1,
                })}
              </span>{" "}
              m²
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(320px,380px)_1fr]">
          <EditorPanel
            activeCollection={activeCollection}
            onCollectionChange={setActiveCollection}
            gridSize={gridSize}
            onGridSizeChange={setGridSize}
            surface={surface}
            onSurfaceChange={setSurface}
          />

          <div className="relative">
            <div className="sticky top-28 aspect-square w-full overflow-hidden rounded-3xl border border-charcoal/10 bg-cream shadow-[0_40px_100px_-40px_rgba(26,26,26,0.45)]">
              {activeCollection.tileImage ? (
                <TileWallPreview
                  image={activeCollection.tileImage}
                  alt={activeCollection.name}
                  gridSize={gridSize}
                  className="h-full w-full"
                />
              ) : (
                <ZelligeTiling
                  colors={activeCollection.palette}
                  gridSize={gridSize}
                  transitionDuration={1}
                  className="h-full w-full"
                />
              )}

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-cream/40" />

              <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-cream/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/70 backdrop-blur">
                {gridSize} × {gridSize}
              </div>
              <div className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-cream/85 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/70 backdrop-blur">
                {activeCollection.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
