import { paletteFromAccent, type ColorMap } from "./colors";
import type { Product } from "./products";

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  /** Prix catalogue en € par m² (hors taxes). */
  price: number;
  palette: ColorMap;
  /**
   * Image du carreau à répéter dans la preview.
   * Présent uniquement pour les collections dérivées d'un produit catalogue :
   * dans ce cas on pave le grand cadre avec l'image réelle du carreau au lieu
   * du motif zellige paramétrique.
   */
  tileImage?: string;
}

/** Marge technique ajoutée à la surface commandée pour couvrir les coupes et la casse. */
export const WASTE_MARGIN = 0.1;
/** TVA française standard appliquée au sous-total. */
export const TAX_RATE = 0.2;
export const CURRENCY: "EUR" = "EUR";

/**
 * Les trois collections officielles de l'atelier.
 * Chaque palette est mappée sur la structure 9 fragments de patterns.json :
 * star-center (dominant), ray-* (accent), corner-* (fond).
 */
export const COLLECTIONS: Collection[] = [
  {
    id: "heritage",
    name: "Héritage",
    tagline: "Majorelle · ivoire · émeraude",
    description: "L'authenticité pure des palais mérinides.",
    accent: "#6050DC",
    price: 180,
    palette: {
      "star-center": "#6050DC", // Bleu Majorelle
      "ray-n": "#0F6F4E", // Vert Émeraude
      "ray-e": "#0F6F4E",
      "ray-s": "#0F6F4E",
      "ray-w": "#0F6F4E",
      "corner-ne": "#F5EFE1", // Blanc du Maroc
      "corner-se": "#F5EFE1",
      "corner-sw": "#F5EFE1",
      "corner-nw": "#F5EFE1",
    },
  },
  {
    id: "sahara-minimal",
    name: "Sahara Minimal",
    tagline: "Sable · ocre brûlé · argile brute",
    description:
      "Une esthétique organique pour les intérieurs contemporains.",
    accent: "#9C5A2C",
    price: 210,
    palette: {
      "star-center": "#9C5A2C", // Ocre brûlé
      "ray-n": "#B38A5F", // Argile brute
      "ray-e": "#B38A5F",
      "ray-s": "#B38A5F",
      "ray-w": "#B38A5F",
      "corner-ne": "#E4CDA4", // Sable
      "corner-se": "#E4CDA4",
      "corner-sw": "#E4CDA4",
      "corner-nw": "#E4CDA4",
    },
  },
  {
    id: "midnight-casablanca",
    name: "Midnight Casablanca",
    tagline: "Graphite · or · anthracite",
    description: "Le luxe nocturne, profond et sophistiqué.",
    accent: "#D4AF37",
    price: 250,
    palette: {
      "star-center": "#D4AF37", // Or
      "ray-n": "#3A3A3C", // Gris anthracite
      "ray-e": "#3A3A3C",
      "ray-s": "#3A3A3C",
      "ray-w": "#3A3A3C",
      "corner-ne": "#1C1C1E", // Noir graphite
      "corner-se": "#1C1C1E",
      "corner-sw": "#1C1C1E",
      "corner-nw": "#1C1C1E",
    },
  },
];

export const COLLECTIONS_BY_ID: Record<string, Collection> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.id, c])
);

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS_BY_ID[id];
}

// ---------- Devis ----------

export interface Estimate {
  collection: Collection;
  /** Surface saisie par le client (m²), bornée à ≥ 0. */
  surface: number;
  /** Surface recommandée à commander = surface × (1 + WASTE_MARGIN). */
  surfaceWithWaste: number;
  /** Sous-total HT = surfaceWithWaste × prix unitaire. */
  subtotal: number;
  /** Montant de TVA = subtotal × TAX_RATE. */
  tax: number;
  /** Total TTC = subtotal + tax. */
  total: number;
  currency: typeof CURRENCY;
  wasteMargin: number;
  taxRate: number;
}

/**
 * Calcule un devis complet pour `surface` m² d'une collection donnée.
 * - Ajoute automatiquement une marge de {@link WASTE_MARGIN} pour les coupes.
 * - Applique la TVA de {@link TAX_RATE} sur le sous-total.
 *
 * Lance une erreur si `collectionId` n'est pas reconnu — il ne doit pas
 * y avoir de fallback silencieux côté prix.
 */
export function calculateEstimateFromCollection(
  surface: number,
  collection: Collection
): Estimate {
  const clean = Number.isFinite(surface) ? Math.max(0, surface) : 0;
  const surfaceWithWaste = clean * (1 + WASTE_MARGIN);
  const subtotal = surfaceWithWaste * collection.price;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    collection,
    surface: clean,
    surfaceWithWaste,
    subtotal,
    tax,
    total,
    currency: CURRENCY,
    wasteMargin: WASTE_MARGIN,
    taxRate: TAX_RATE,
  };
}

export function calculateEstimate(
  surface: number,
  collectionId: string
): Estimate {
  const collection = getCollection(collectionId);
  if (!collection) {
    throw new Error(`Collection inconnue : ${collectionId}`);
  }
  return calculateEstimateFromCollection(surface, collection);
}

/**
 * Construit une Collection synthétique à partir d'un produit du catalogue,
 * pour alimenter le configurateur avec un carreau choisi librement.
 * Le prix au m² est déduit selon l'unité : ×100 pour les carreaux 10×10 cm,
 * identique pour les motifs composés déjà facturés au m².
 */
export function collectionFromProduct(product: Product): Collection {
  const pricePerM2 = product.unit === "carreau" ? product.price * 100 : product.price;
  return {
    id: `product-${product.slug}`,
    name: product.name,
    tagline: product.subtitle,
    description: product.description,
    accent: product.accent,
    price: Math.round(pricePerM2),
    palette: paletteFromAccent(product.accent),
    tileImage: product.image,
  };
}

/** Formateur € français cohérent à travers l'app. */
export const euroFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});
