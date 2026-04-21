"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  COLLECTIONS,
  WASTE_MARGIN,
  calculateEstimateFromCollection,
  collectionFromProduct,
  euroFormatter,
  type Collection,
} from "@/lib/collections";
import { PRODUCTS, type Product } from "@/lib/products";

/** Motif physique : 20×20 cm d'émaillé → 0.04 m² par carreau assemblé. */
const TILE_AREA_M2 = 0.04;
/** Terre cuite émaillée, 10 mm d'épaisseur → ≈ 23 kg/m². */
const WEIGHT_KG_PER_M2 = 23;
const FRAGMENTS_PER_TILE = 9;

type SourceTab = "collections" | "catalog";

interface EditorPanelProps {
  activeCollection: Collection;
  onCollectionChange: (c: Collection) => void;
  gridSize: number;
  onGridSizeChange: (n: number) => void;
  surface: number;
  onSurfaceChange: (n: number) => void;
  className?: string;
}

export default function EditorPanel({
  activeCollection,
  onCollectionChange,
  gridSize,
  onGridSizeChange,
  surface,
  onSurfaceChange,
  className,
}: EditorPanelProps) {
  const [tab, setTab] = useState<SourceTab>(() =>
    activeCollection.id.startsWith("product-") ? "catalog" : "collections"
  );

  const calc = useMemo(() => {
    const clean = Math.max(0, surface);
    const gross = clean * (1 + WASTE_MARGIN);
    const tiles = Math.ceil(gross / TILE_AREA_M2);
    const fragments = tiles * FRAGMENTS_PER_TILE;
    const weight = Math.round(clean * WEIGHT_KG_PER_M2);
    return { gross, tiles, fragments, weight };
  }, [surface]);

  const estimate = useMemo(
    () => calculateEstimateFromCollection(surface, activeCollection),
    [surface, activeCollection]
  );

  const activeProductSlug = activeCollection.id.startsWith("product-")
    ? activeCollection.id.slice("product-".length)
    : null;

  const fmt = (n: number) => n.toLocaleString("fr-FR");

  return (
    <aside
      className={[
        "flex flex-col gap-9 rounded-3xl border border-charcoal/10 bg-cream p-7 shadow-[0_30px_80px_-50px_rgba(26,26,26,0.35)]",
        className ?? "",
      ].join(" ")}
    >
      <header>
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
          Atelier paramétrique
        </span>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-charcoal">
          Concevez votre zellige
        </h3>
      </header>

      {/* -------- Source : Collections / Catalogue -------- */}
      <section aria-labelledby="editor-source">
        <div className="mb-3 flex items-baseline justify-between">
          <h4
            id="editor-source"
            className="text-[0.65rem] uppercase tracking-[0.3em] text-charcoal/70"
          >
            Source du motif
          </h4>
          <span className="text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/40">
            {tab === "collections" ? `${COLLECTIONS.length} palettes` : `${PRODUCTS.length} carreaux`}
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Source du motif"
          className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-charcoal/5 p-1"
        >
          {[
            { id: "collections" as const, label: "Collections" },
            { id: "catalog" as const, label: "Catalogue" },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={[
                  "rounded-full px-3 py-2 text-[0.65rem] uppercase tracking-[0.22em] transition",
                  active
                    ? "bg-charcoal text-cream shadow-sm"
                    : "text-charcoal/60 hover:text-charcoal",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === "collections" ? (
          <div role="radiogroup" aria-label="Collections" className="space-y-2">
            {COLLECTIONS.map((c) => (
              <CollectionCard
                key={c.id}
                collection={c}
                active={c.id === activeCollection.id}
                onSelect={() => onCollectionChange(c)}
              />
            ))}
          </div>
        ) : (
          <div
            role="radiogroup"
            aria-label="Catalogue"
            className="max-h-[340px] overflow-y-auto overscroll-contain rounded-xl pr-1 grid grid-cols-2 gap-2"
          >
            {PRODUCTS.map((p) => (
              <ProductSwatch
                key={p.sku}
                product={p}
                active={p.slug === activeProductSlug}
                onSelect={() => onCollectionChange(collectionFromProduct(p))}
              />
            ))}
          </div>
        )}
      </section>

      {/* -------- Grille -------- */}
      <section aria-labelledby="editor-grid">
        <div className="mb-3 flex items-baseline justify-between">
          <h4
            id="editor-grid"
            className="text-[0.65rem] uppercase tracking-[0.3em] text-charcoal/70"
          >
            Densité de grille
          </h4>
          <span className="font-serif text-lg tabular-nums text-charcoal">
            {gridSize} × {gridSize}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={gridSize}
          onChange={(e) => onGridSizeChange(Number(e.target.value))}
          aria-label={`Grille ${gridSize} par ${gridSize}`}
          className="w-full cursor-pointer accent-charcoal"
        />
        <div className="mt-2 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/45">
          <span>1 motif</span>
          <span className="font-serif normal-case tracking-normal text-charcoal/70">
            {gridSize * gridSize} motif{gridSize * gridSize > 1 ? "s" : ""} visibles
          </span>
          <span>10 × 10</span>
        </div>
      </section>

      {/* -------- Calculateur -------- */}
      <section aria-labelledby="editor-surface">
        <h4
          id="editor-surface"
          className="mb-3 text-[0.65rem] uppercase tracking-[0.3em] text-charcoal/70"
        >
          Surface projet
        </h4>

        <label className="relative block">
          <input
            type="number"
            min={0}
            step={0.5}
            value={Number.isFinite(surface) ? surface : 0}
            onChange={(e) => {
              const v = Number.parseFloat(e.target.value);
              onSurfaceChange(Number.isFinite(v) ? Math.max(0, v) : 0);
            }}
            className="peer w-full rounded-xl border border-charcoal/20 bg-cream px-4 pb-3 pt-6 font-serif text-2xl tabular-nums text-charcoal transition focus:border-charcoal focus:outline-none"
            aria-label="Surface en mètres carrés"
          />
          <span className="pointer-events-none absolute left-4 top-2 text-[0.6rem] uppercase tracking-[0.3em] text-charcoal/50">
            m²
          </span>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-serif text-lg text-charcoal/40">
            m²
          </span>
        </label>

        <motion.dl
          layout
          className="mt-5 divide-y divide-charcoal/10 border-y border-charcoal/10"
        >
          <StatRow label="Carreaux" value={fmt(calc.tiles)} unit="motifs" />
          <StatRow
            label="Fragments taillés"
            value={fmt(calc.fragments)}
            unit="à la main"
          />
          <StatRow
            label="Poids estimé"
            value={fmt(calc.weight)}
            unit="kg"
            highlight
          />
          <StatRow
            label="Surface brute"
            value={calc.gross.toLocaleString("fr-FR", {
              maximumFractionDigits: 2,
            })}
            unit="m² · marge 10 %"
          />
        </motion.dl>

        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.28em] text-charcoal/40">
          Base · motif 20 × 20 cm · émaillé 10 mm · {WEIGHT_KG_PER_M2} kg/m²
        </p>
      </section>

      {/* -------- Devis -------- */}
      <section
        aria-labelledby="editor-estimate"
        className="rounded-2xl bg-charcoal p-6 text-cream shadow-inner"
      >
        <div className="flex items-baseline justify-between">
          <h4
            id="editor-estimate"
            className="text-[0.65rem] uppercase tracking-[0.3em] text-gold"
          >
            Devis indicatif
          </h4>
          <span className="font-serif text-xs tabular-nums text-cream/60">
            {euroFormatter.format(estimate.collection.price)}{" "}
            <span className="text-cream/40">/ m²</span>
          </span>
        </div>

        <dl className="mt-5 space-y-2.5 text-sm">
          <EstimateRow
            label="Sous-total HT"
            value={euroFormatter.format(estimate.subtotal)}
          />
          <EstimateRow
            label={`TVA ${Math.round(estimate.taxRate * 100)} %`}
            value={euroFormatter.format(estimate.tax)}
            muted
          />
          <div className="border-t border-cream/15 pt-3">
            <EstimateRow
              label="Total TTC"
              value={euroFormatter.format(estimate.total)}
              emphasize
            />
          </div>
        </dl>
        <p className="mt-4 text-[0.6rem] uppercase tracking-[0.28em] text-cream/40">
          Basé sur{" "}
          {estimate.surfaceWithWaste.toLocaleString("fr-FR", {
            maximumFractionDigits: 2,
          })}{" "}
          m² commandés · {estimate.collection.name.toLowerCase()}
        </p>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 bg-gold px-6 py-3.5 text-xs uppercase tracking-[0.28em] text-charcoal transition hover:bg-gold/90"
        >
          Demander le devis définitif
          <span aria-hidden>→</span>
        </button>
      </section>
    </aside>
  );
}

function EstimateRow({
  label,
  value,
  muted,
  emphasize,
}: {
  label: string;
  value: string;
  muted?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt
        className={[
          "uppercase tracking-[0.22em]",
          emphasize
            ? "text-[0.65rem] text-cream"
            : muted
            ? "text-[0.6rem] text-cream/55"
            : "text-[0.6rem] text-cream/70",
        ].join(" ")}
      >
        {label}
      </dt>
      <dd className="flex items-baseline">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={[
            "font-serif tabular-nums",
            emphasize
              ? "text-2xl text-gold"
              : muted
              ? "text-sm text-cream/60"
              : "text-base text-cream",
          ].join(" ")}
        >
          {value}
        </motion.span>
      </dd>
    </div>
  );
}

function StatRow({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-xs text-charcoal/60">{label}</dt>
      <dd className="flex items-baseline gap-2 text-right">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className={[
            "font-serif tabular-nums",
            highlight ? "text-xl text-charcoal" : "text-base text-charcoal",
          ].join(" ")}
        >
          {value}
        </motion.span>
        {unit && (
          <span className="text-[0.6rem] uppercase tracking-[0.24em] text-charcoal/45">
            {unit}
          </span>
        )}
      </dd>
    </div>
  );
}

function CollectionCard({
  collection,
  active,
  onSelect,
}: {
  collection: Collection;
  active: boolean;
  onSelect: () => void;
}) {
  const uniqueColors = useMemo(() => {
    const seen = new Set<string>();
    const order: string[] = [];
    for (const id of Object.keys(collection.palette)) {
      const c = collection.palette[id];
      if (!seen.has(c)) {
        seen.add(c);
        order.push(c);
      }
    }
    return order;
  }, [collection]);

  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={active}
      className={[
        "group flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition",
        active
          ? "border-charcoal bg-charcoal text-cream shadow-[inset_0_0_0_1px_rgba(212,175,55,0.35)]"
          : "border-charcoal/15 bg-cream text-charcoal hover:border-charcoal/40 hover:bg-charcoal/[0.02]",
      ].join(" ")}
    >
      <div className="flex flex-none -space-x-1.5">
        {uniqueColors.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className={[
              "h-5 w-5 rounded-full border transition",
              active ? "border-charcoal/80" : "border-cream",
            ].join(" ")}
            style={{ background: c, boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)" }}
          />
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <div className="truncate font-serif text-base leading-tight">
            {collection.name}
          </div>
          <div
            className={[
              "flex-none font-serif text-sm tabular-nums",
              active ? "text-gold" : "text-charcoal/80",
            ].join(" ")}
          >
            {euroFormatter.format(collection.price)}
            <span
              className={[
                "ml-1 text-[0.55rem] uppercase tracking-[0.2em]",
                active ? "text-cream/50" : "text-charcoal/40",
              ].join(" ")}
            >
              /m²
            </span>
          </div>
        </div>
        <div
          className={[
            "mt-0.5 truncate text-[0.6rem] uppercase tracking-[0.24em]",
            active ? "text-cream/60" : "text-charcoal/50",
          ].join(" ")}
        >
          {collection.tagline}
        </div>
      </div>

      <span
        aria-hidden
        className={[
          "grid h-6 w-6 flex-none place-items-center rounded-full border text-[0.65rem] transition",
          active
            ? "border-gold bg-gold text-charcoal"
            : "border-charcoal/25 text-charcoal/30 group-hover:border-charcoal group-hover:text-charcoal",
        ].join(" ")}
      >
        {active ? "✓" : ""}
      </span>
    </button>
  );
}

function ProductSwatch({
  product,
  active,
  onSelect,
}: {
  product: Product;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={active}
      className={[
        "group relative flex flex-col overflow-hidden rounded-xl border text-left transition",
        active
          ? "border-charcoal ring-2 ring-gold/60 ring-offset-1 ring-offset-cream shadow-md"
          : "border-charcoal/15 hover:border-charcoal/40 hover:shadow-sm",
      ].join(" ")}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream/60">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="160px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Pastille couleur en haut à gauche */}
        <span
          aria-hidden
          className="absolute left-2 top-2 h-3 w-3 rounded-full border border-white/60 shadow"
          style={{ background: product.accent }}
        />
        {/* Badge sélectionné */}
        {active && (
          <span
            aria-hidden
            className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-gold text-[0.6rem] font-bold text-charcoal shadow"
          >
            ✓
          </span>
        )}
      </div>

      {/* Infos */}
      <div
        className={[
          "flex flex-col gap-0.5 px-2.5 py-2 transition",
          active ? "bg-charcoal text-cream" : "bg-cream text-charcoal",
        ].join(" ")}
      >
        <span className="truncate text-[0.65rem] font-semibold leading-tight">
          {product.name}
        </span>
        <span
          className={[
            "truncate text-[0.55rem] uppercase tracking-[0.16em]",
            active ? "text-cream/55" : "text-charcoal/45",
          ].join(" ")}
        >
          {product.subtitle.split("·")[1]?.trim() ?? product.subtitle}
        </span>
        <span
          className={[
            "mt-0.5 font-serif text-[0.7rem] tabular-nums",
            active ? "text-gold" : "text-charcoal/70",
          ].join(" ")}
        >
          {euroFormatter.format(product.unit === "carreau" ? product.price * 100 : product.price)}
          <span className={["ml-0.5 text-[0.5rem] uppercase", active ? "text-cream/40" : "text-charcoal/35"].join(" ")}>/m²</span>
        </span>
      </div>
    </button>
  );
}
