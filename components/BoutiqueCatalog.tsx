"use client";

import { useMemo, useState } from "react";

import ProductCard from "./ProductCard";
import {
  COLOR_FAMILIES,
  FORMATS,
  PRODUCTS,
  ROOMS,
  type ColorFamily,
  type FormatId,
  type ProductCategory,
  type RoomId,
} from "@/lib/products";

type Filter = ProductCategory | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Tout le catalogue" },
  { id: "uni", label: "Carreaux unis" },
  { id: "motif", label: "Motifs composés" },
];

/** Enlève les diacritiques et normalise la casse pour la recherche. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/** Mutation immuable d'un Set : ajoute si absent, retire si présent. */
function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export default function BoutiqueCatalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [colors, setColors] = useState<Set<ColorFamily>>(new Set());
  const [rooms, setRooms] = useState<Set<RoomId>>(new Set());
  const [formats, setFormats] = useState<Set<FormatId>>(new Set());

  const normalizedQuery = useMemo(() => normalize(query), [query]);

  const items = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filter !== "all" && p.category !== filter) return false;
      if (colors.size > 0 && !colors.has(p.colorFamily)) return false;
      if (formats.size > 0 && !formats.has(p.format)) return false;
      if (rooms.size > 0 && !p.rooms.some((r) => rooms.has(r))) return false;
      if (normalizedQuery.length > 0) {
        const haystack = normalize(`${p.name} ${p.subtitle} ${p.description}`);
        if (!haystack.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [filter, colors, rooms, formats, normalizedQuery]);

  const counts = useMemo(
    () => ({
      all: PRODUCTS.length,
      uni: PRODUCTS.filter((p) => p.category === "uni").length,
      motif: PRODUCTS.filter((p) => p.category === "motif").length,
    }),
    []
  );

  const activeCount =
    colors.size +
    rooms.size +
    formats.size +
    (filter === "all" ? 0 : 1) +
    (normalizedQuery.length > 0 ? 1 : 0);

  function resetAll() {
    setFilter("all");
    setQuery("");
    setColors(new Set());
    setRooms(new Set());
    setFormats(new Set());
  }

  return (
    <>
      {/* Barre de recherche + compteur */}
      <div className="flex flex-col-reverse items-start gap-5 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Catégories"
          className="flex flex-wrap items-center gap-3"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={[
                  "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] transition",
                  active
                    ? "border-charcoal bg-charcoal text-cream"
                    : "border-charcoal/20 text-charcoal/70 hover:border-charcoal hover:text-charcoal",
                ].join(" ")}
              >
                {f.label}
                <span
                  className={[
                    "rounded-full px-1.5 py-0.5 font-mono text-[0.55rem]",
                    active ? "bg-cream/15 text-cream/80" : "bg-charcoal/5 text-charcoal/60",
                  ].join(" ")}
                >
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
        </div>

        <label className="relative flex w-full items-center md:max-w-xs">
          <span className="sr-only">Rechercher une référence</span>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="pointer-events-none absolute left-4 h-4 w-4 text-charcoal/40"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 3.5 3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un motif, une teinte…"
            className="w-full rounded-full border border-charcoal/20 bg-cream px-11 py-2.5 font-serif text-sm text-charcoal placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Effacer la recherche"
              className="absolute right-3 grid h-6 w-6 place-items-center rounded-full text-charcoal/50 transition hover:bg-charcoal/5 hover:text-charcoal"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </label>
      </div>

      {/* Bloc filtres avancés */}
      <div className="mt-8 rounded-3xl border border-charcoal/10 bg-cream/60 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
          <FilterRow label="Teinte">
            <div className="flex flex-wrap gap-2.5">
              {COLOR_FAMILIES.map((c) => {
                const active = colors.has(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColors((prev) => toggle(prev, c.id))}
                    aria-pressed={active}
                    title={c.label}
                    className={[
                      "inline-flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-[0.65rem] uppercase tracking-[0.22em] transition",
                      active
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/60",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className="h-5 w-5 rounded-full border border-charcoal/15 shadow-inner"
                      style={{ backgroundColor: c.swatch }}
                    />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </FilterRow>

          <FilterRow label="Pièce">
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => {
                const active = rooms.has(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRooms((prev) => toggle(prev, r.id))}
                    aria-pressed={active}
                    className={[
                      "rounded-full border px-3.5 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] transition",
                      active
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/60",
                    ].join(" ")}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </FilterRow>

          <FilterRow label="Format">
            <div className="flex flex-wrap gap-2">
              {FORMATS.map((f) => {
                const active = formats.has(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormats((prev) => toggle(prev, f.id))}
                    aria-pressed={active}
                    className={[
                      "rounded-full border px-3.5 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] transition",
                      active
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/60",
                    ].join(" ")}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </FilterRow>
        </div>

        {activeCount > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-charcoal/10 pt-5">
            <span className="mr-1 text-[0.6rem] uppercase tracking-[0.28em] text-charcoal/55">
              Filtres actifs
            </span>

            {filter !== "all" && (
              <Chip onClear={() => setFilter("all")}>
                {FILTERS.find((f) => f.id === filter)!.label}
              </Chip>
            )}
            {normalizedQuery.length > 0 && (
              <Chip onClear={() => setQuery("")}>« {query.trim()} »</Chip>
            )}
            {Array.from(colors).map((id) => {
              const meta = COLOR_FAMILIES.find((c) => c.id === id)!;
              return (
                <Chip
                  key={`c-${id}`}
                  onClear={() => setColors((prev) => toggle(prev, id))}
                >
                  <span
                    aria-hidden
                    className="mr-1.5 inline-block h-3 w-3 rounded-full border border-cream/20"
                    style={{ backgroundColor: meta.swatch }}
                  />
                  {meta.label}
                </Chip>
              );
            })}
            {Array.from(rooms).map((id) => (
              <Chip
                key={`r-${id}`}
                onClear={() => setRooms((prev) => toggle(prev, id))}
              >
                {ROOMS.find((r) => r.id === id)!.label}
              </Chip>
            ))}
            {Array.from(formats).map((id) => (
              <Chip
                key={`f-${id}`}
                onClear={() => setFormats((prev) => toggle(prev, id))}
              >
                {FORMATS.find((f) => f.id === id)!.label}
              </Chip>
            ))}

            <button
              type="button"
              onClick={resetAll}
              className="ml-auto text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/60 underline-offset-4 transition hover:text-charcoal hover:underline"
            >
              Tout effacer
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.28em] text-charcoal/55">
        <span>
          {items.length} {items.length > 1 ? "références" : "référence"}
          {activeCount > 0 ? " · filtrées" : ""}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product, i) => (
          <ProductCard key={product.sku} product={product} priority={i < 4} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-charcoal/15 text-charcoal/50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-6 w-6">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" strokeLinecap="round" />
            </svg>
          </span>
          <p className="font-serif text-lg text-charcoal">
            Aucune référence ne correspond à vos critères
          </p>
          <p className="max-w-sm text-sm text-charcoal/60">
            Essayez d'élargir la recherche en retirant un filtre, ou contactez l'atelier pour une pièce sur-mesure.
          </p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-2 rounded-full border border-charcoal px-5 py-2 text-[0.65rem] uppercase tracking-[0.26em] text-charcoal transition hover:bg-charcoal hover:text-cream"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <span className="pt-1.5 text-[0.6rem] uppercase tracking-[0.3em] text-charcoal/55 md:w-20">
        {label}
      </span>
      <div>{children}</div>
    </>
  );
}

function Chip({
  children,
  onClear,
}: {
  children: React.ReactNode;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-charcoal px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-cream">
      {children}
      <button
        type="button"
        onClick={onClear}
        aria-label="Retirer ce filtre"
        className="grid h-4 w-4 place-items-center rounded-full text-cream/70 transition hover:bg-cream/15 hover:text-cream"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3">
          <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
}
