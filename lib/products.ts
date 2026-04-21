export type ProductCategory = "uni" | "motif";
export type ProductUnit = "carreau" | "m2";

export type ColorFamily =
  | "vert"
  | "bleu"
  | "ocre"
  | "terracotta"
  | "miel"
  | "noir"
  | "rose"
  | "blanc"
  | "gris"
  | "beige"
  | "jaune"
  | "or";

export type RoomId =
  | "sol"
  | "mur"
  | "cuisine"
  | "salle-de-bain"
  | "hammam"
  | "patio"
  | "exterieur";

export type FormatId =
  | "3x3"
  | "5x10"
  | "5x15"
  | "6x24"
  | "7x28"
  | "10x10"
  | "20x20"
  | "panneau-30x30";

export interface Product {
  sku: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  price: number;
  unit: ProductUnit;
  image: string;
  accent: string;
  colorFamily: ColorFamily;
  rooms: RoomId[];
  format: FormatId;
  inStock: boolean;
}

export interface ColorFamilyMeta {
  id: ColorFamily;
  label: string;
  swatch: string;
}

export const COLOR_FAMILIES: ColorFamilyMeta[] = [
  { id: "vert",       label: "Vert",       swatch: "#497B6A" },
  { id: "bleu",       label: "Bleu",       swatch: "#2FA8B5" },
  { id: "ocre",       label: "Ocre",       swatch: "#C9761F" },
  { id: "terracotta", label: "Terracotta", swatch: "#B5623C" },
  { id: "miel",       label: "Miel",       swatch: "#C9952B" },
  { id: "noir",       label: "Noir",       swatch: "#1C1C1E" },
  { id: "rose",       label: "Rose",       swatch: "#C48A8C" },
  { id: "blanc",      label: "Blanc",      swatch: "#F4F1E8" },
  { id: "gris",       label: "Gris",       swatch: "#9E9E9E" },
  { id: "beige",      label: "Beige",      swatch: "#D4C4A0" },
  { id: "jaune",      label: "Jaune",      swatch: "#D4B84A" },
  { id: "or",         label: "Or",         swatch: "#D4AF37" },
];

export const ROOMS: { id: RoomId; label: string }[] = [
  { id: "sol",           label: "Sol" },
  { id: "mur",           label: "Mur" },
  { id: "cuisine",       label: "Cuisine" },
  { id: "salle-de-bain", label: "Salle de bain" },
  { id: "hammam",        label: "Hammam" },
  { id: "patio",         label: "Patio" },
  { id: "exterieur",     label: "Extérieur" },
];

export const FORMATS: { id: FormatId; label: string }[] = [
  { id: "3x3",          label: "3 × 3 cm" },
  { id: "5x10",         label: "5 × 10 cm" },
  { id: "5x15",         label: "5 × 15 cm" },
  { id: "6x24",         label: "6 × 24 cm" },
  { id: "7x28",         label: "7 × 28 cm" },
  { id: "10x10",        label: "10 × 10 cm" },
  { id: "20x20",        label: "20 × 20 cm" },
  { id: "panneau-30x30", label: "Panneau 30 × 30 cm" },
];

export interface GalleryItem {
  id: string;
  caption: string;
  image: string;
  span?: "tall" | "wide" | "square";
}

// ─── Produits ──────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── Carreaux 10 × 10 ──
  {
    sku: "UNI-VERT-DEAU",
    slug: "vert-deau-10x10",
    name: "Vert d'Eau",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Teinte claire et minérale inspirée des bassins de riads. Émail craquelé à la main, légères variations de ton d'un carreau à l'autre.",
    price: 3.8,
    unit: "carreau",
    image: "/catalog/vert-deau-10x10.jpg",
    accent: "#7EB9A6",
    colorFamily: "vert",
    rooms: ["mur", "cuisine", "salle-de-bain", "hammam", "patio"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-TURQUOISE",
    slug: "bleu-turquoise-10x10",
    name: "Bleu Turquoise",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Turquoise vif, éclatant à la lumière. La teinte des médersas du Maroc, signature de l'art zellige marocain.",
    price: 4.0,
    unit: "carreau",
    image: "/catalog/bleu-turquoise-10x10.jpg",
    accent: "#2FA8B5",
    colorFamily: "bleu",
    rooms: ["mur", "salle-de-bain", "hammam", "patio", "exterieur"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-MIEL",
    slug: "miel-10x10",
    name: "Miel",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Jaune ambré profond, chaleureux sous la lumière directe. Classique intemporel de notre palette artisanale.",
    price: 3.8,
    unit: "carreau",
    image: "/catalog/miel-10x10.jpg",
    accent: "#C9952B",
    colorFamily: "miel",
    rooms: ["sol", "mur", "cuisine", "patio"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-TERRACOTTA",
    slug: "terracotta-10x10",
    name: "Terracotta",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Terre cuite chaude, signature des remparts de Marrakech. Patine vivante, idéale en crédence ou en sol intérieur.",
    price: 3.8,
    unit: "carreau",
    image: "/catalog/terracotta-10x10.jpg",
    accent: "#B5623C",
    colorFamily: "terracotta",
    rooms: ["sol", "mur", "cuisine", "patio", "exterieur"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-BLANC-NEIGE",
    slug: "blanc-neige-10x10",
    name: "Blanc Neige",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Blanc pur, légèrement irrégulier. La base de toutes les compositions claires, intemporel et lumineux.",
    price: 3.6,
    unit: "carreau",
    image: "/catalog/blanc-neige-10x10.jpg",
    accent: "#F4F1E8",
    colorFamily: "blanc",
    rooms: ["sol", "mur", "cuisine", "salle-de-bain", "hammam"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-VIEUX-ROSE",
    slug: "vieux-rose-10x10",
    name: "Vieux Rose",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Rose poudré, sourd, presque argileux. Pour les salles de bains et les espaces intimes qui cherchent la douceur.",
    price: 4.0,
    unit: "carreau",
    image: "/catalog/vieux-rose-10x10.jpg",
    accent: "#C48A8C",
    colorFamily: "rose",
    rooms: ["mur", "salle-de-bain"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-GRIS",
    slug: "gris-10x10",
    name: "Gris",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Gris naturel, sobre et élégant. S'associe aussi bien avec le blanc qu'avec les teintes chaudes pour des compositions contemporaines.",
    price: 3.8,
    unit: "carreau",
    image: "/catalog/gris-10x10.png",
    accent: "#9E9E9E",
    colorFamily: "gris",
    rooms: ["sol", "mur", "cuisine", "salle-de-bain"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-BLEU-FONCE",
    slug: "bleu-fonce-10x10",
    name: "Bleu Foncé",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Bleu profond, presque nuit, qui évoque les ciels du Maroc à l'heure bleue. Idéal en accent ou en pose continue.",
    price: 4.2,
    unit: "carreau",
    image: "/catalog/bleu-fonce-10x10.png",
    accent: "#1A3A5C",
    colorFamily: "bleu",
    rooms: ["mur", "salle-de-bain", "hammam"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-NOIR-METAL",
    slug: "noir-metal-10x10",
    name: "Noir Métal",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Noir intense aux reflets métalliques. Effet graphique maximum en pose continue ou en damier avec le blanc neige.",
    price: 4.2,
    unit: "carreau",
    image: "/catalog/noir-metal-10x10.png",
    accent: "#1C1C1E",
    colorFamily: "noir",
    rooms: ["sol", "mur", "cuisine", "salle-de-bain"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-ROSE-FONCE",
    slug: "rose-fonce-10x10",
    name: "Rose Foncé",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Rose soutenu, lumineux et chaleureux. Apporte du caractère aux intérieurs contemporains sans perdre la chaleur de l'artisanat.",
    price: 4.0,
    unit: "carreau",
    image: "/catalog/rose-fonce-10x10.png",
    accent: "#C06080",
    colorFamily: "rose",
    rooms: ["mur", "salle-de-bain", "cuisine"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-JONATRE",
    slug: "jonatre-10x10",
    name: "Jonâtre",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Ocre doré à dominante jaune-orangé, chaleureux comme la lumière rasante sur les remparts du Maroc.",
    price: 4.0,
    unit: "carreau",
    image: "/catalog/jonatre-10x10.png",
    accent: "#C9761F",
    colorFamily: "ocre",
    rooms: ["sol", "mur", "cuisine", "patio"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-VERT-EMERAUDE",
    slug: "vert-emeraude-10x10",
    name: "Vert Émeraude",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Vert émeraude intense, saturé. Rappelle la végétation luxuriante des jardins andalous et des patios marocains.",
    price: 4.2,
    unit: "carreau",
    image: "/catalog/vert-emeraude-10x10.png",
    accent: "#2E7D32",
    colorFamily: "vert",
    rooms: ["mur", "salle-de-bain", "hammam", "patio"],
    format: "10x10",
    inStock: true,
  },

  // ── Carreaux 20 × 20 ──
  {
    sku: "UNI-VERT-20X20",
    slug: "vert-20x20",
    name: "Vert 20 × 20",
    category: "uni",
    subtitle: "Carreau émaillé · 20 × 20 cm",
    description:
      "Grand format carré en vert naturel. Pose rapide, effet immersif garanti en sol ou en grand pan de mur.",
    price: 8.5,
    unit: "carreau",
    image: "/catalog/vert-20x20.png",
    accent: "#497B6A",
    colorFamily: "vert",
    rooms: ["sol", "mur", "patio", "exterieur"],
    format: "20x20",
    inStock: true,
  },
  {
    sku: "UNI-VERT-FONCE-20X20",
    slug: "vert-fonce-20x20",
    name: "Vert Foncé 20 × 20",
    category: "uni",
    subtitle: "Carreau émaillé · 20 × 20 cm",
    description:
      "Vert profond en grand format. Présence forte, idéal pour structurer un espace ouvert ou habiller un mur de façade.",
    price: 9.0,
    unit: "carreau",
    image: "/catalog/vert-fonce-20x20.png",
    accent: "#2D5A3D",
    colorFamily: "vert",
    rooms: ["sol", "mur", "patio", "exterieur"],
    format: "20x20",
    inStock: true,
  },

  // ── Carreaux rectangulaires ──
  {
    sku: "UNI-VERT-5X10",
    slug: "vert-5x10",
    name: "Vert 5 × 10",
    category: "uni",
    subtitle: "Carreau émaillé · 5 × 10 cm",
    description:
      "Format rectangulaire en vert d'eau clair. Posé en brique ou en chevron, il crée un effet de mouvement subtil.",
    price: 2.2,
    unit: "carreau",
    image: "/catalog/vert-5x10.png",
    accent: "#7EB9A6",
    colorFamily: "vert",
    rooms: ["mur", "salle-de-bain", "cuisine", "hammam"],
    format: "5x10",
    inStock: true,
  },
  {
    sku: "UNI-VERT-CROISE",
    slug: "vert-croise-10x5",
    name: "Vert Croisé 10 × 5",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 5 cm",
    description:
      "Rectangle vert à émail croisé, jouant sur la lumière selon l'angle d'observation. Effet tissé très recherché.",
    price: 2.5,
    unit: "carreau",
    image: "/catalog/vert-croise-10x5.png",
    accent: "#5A9E8A",
    colorFamily: "vert",
    rooms: ["mur", "salle-de-bain", "cuisine"],
    format: "5x10",
    inStock: true,
  },
  {
    sku: "UNI-VERT-LONGUEUR",
    slug: "vert-longueur-10x5",
    name: "Vert en Longueur 10 × 5",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 5 cm",
    description:
      "Format allongé vert naturel. Pose en longueur ou en décalé pour un rendu contemporain et dynamique.",
    price: 2.5,
    unit: "carreau",
    image: "/catalog/vert-longueur-10x5.png",
    accent: "#4A8E72",
    colorFamily: "vert",
    rooms: ["mur", "cuisine", "salle-de-bain"],
    format: "5x10",
    inStock: true,
  },
  {
    sku: "UNI-JAUNE-GRIS-5X15",
    slug: "jaune-gris-5x15",
    name: "Jaune & Gris 5 × 15",
    category: "uni",
    subtitle: "Carreau émaillé · 5 × 15 cm",
    description:
      "Biton jaune et gris en format métro allongé. Alliance inattendue et moderne, parfaite pour des frises ou des crédences.",
    price: 3.2,
    unit: "carreau",
    image: "/catalog/jaune-gris-5x15.png",
    accent: "#D4B84A",
    colorFamily: "jaune",
    rooms: ["mur", "cuisine", "salle-de-bain"],
    format: "5x15",
    inStock: true,
  },
  {
    sku: "UNI-BEIGE-TRIBECA",
    slug: "beige-tribeca-6x24",
    name: "Beige Tribeca 6 × 24",
    category: "uni",
    subtitle: "Carreau émaillé · 6 × 24,6 cm",
    description:
      "Long rectangle beige ivoire à la texture naturelle. Format Tribeca pour des poses en épi ou en décalé, esprit loft industriel doux.",
    price: 4.5,
    unit: "carreau",
    image: "/catalog/beige-tribeca-6x24.png",
    accent: "#D4C4A0",
    colorFamily: "beige",
    rooms: ["sol", "mur", "cuisine", "salle-de-bain"],
    format: "6x24",
    inStock: true,
  },
  {
    sku: "UNI-BLEU-AGADIR",
    slug: "bleu-agadir-7x28",
    name: "Bleu Agadir 7 × 28",
    category: "uni",
    subtitle: "Carreau émaillé · 7 × 28 cm",
    description:
      "Grand rectangle bleu océan, inspiré des façades d'Agadir. Allonge les volumes, idéal en mur de douche ou en revêtement de piscine.",
    price: 5.5,
    unit: "carreau",
    image: "/catalog/bleu-agadir-7x28.png",
    accent: "#1A6B9A",
    colorFamily: "bleu",
    rooms: ["mur", "salle-de-bain", "hammam", "exterieur"],
    format: "7x28",
    inStock: true,
  },

  // ── Petits formats & mosaïques ──
  {
    sku: "UNI-VERT-MOSAIQUE",
    slug: "vert-mosaique-3x3",
    name: "Vert Mosaïque 3 × 3",
    category: "motif",
    subtitle: "Mosaïque émaillée · 3 × 3 cm",
    description:
      "Micro-carreaux verts pour des compositions libres ou des frises fines. Le format le plus traditionnel du zellige artisanal du Maroc.",
    price: 185,
    unit: "m2",
    image: "/catalog/vert-mosaique-3x3.png",
    accent: "#7EB9A6",
    colorFamily: "vert",
    rooms: ["mur", "salle-de-bain", "hammam", "patio"],
    format: "3x3",
    inStock: true,
  },
  {
    sku: "MOTIF-MULTICOLORE",
    slug: "multicolore",
    name: "Multicolore",
    category: "motif",
    subtitle: "Composition multicolore · prix au m²",
    description:
      "Composition festive mêlant six teintes traditionnelles. Chaque panneau est unique, taillé et assemblé à la main par nos maâlems.",
    price: 245,
    unit: "m2",
    image: "/catalog/multicolore.png",
    accent: "#C9761F",
    colorFamily: "ocre",
    rooms: ["sol", "mur", "patio"],
    format: "panneau-30x30",
    inStock: true,
  },
  {
    sku: "UNI-NATURE",
    slug: "nature-01",
    name: "Nature",
    category: "uni",
    subtitle: "Carreau émaillé · ton naturel",
    description:
      "Ton terre naturel non teint, laissant apparaître la matière brute de l'argile marocaine. Authenticité maximale.",
    price: 3.5,
    unit: "carreau",
    image: "/catalog/nature-01.png",
    accent: "#C4B090",
    colorFamily: "beige",
    rooms: ["sol", "mur", "patio", "exterieur"],
    format: "10x10",
    inStock: true,
  },

  // ── Nouveaux carreaux croisés 10 × 5 ──
  {
    sku: "UNI-CROISE-NATUREL",
    slug: "croise-naturel-10x5",
    name: "Croisé Naturel",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 5 cm",
    description:
      "Ton naturel sable avec texture croisée en relief. Pose en brique ou en chevron, idéal pour des espaces chaleureux et organiques.",
    price: 2.8,
    unit: "carreau",
    image: "/catalog/croise-naturel-10x5.jpeg",
    accent: "#C4B090",
    colorFamily: "beige",
    rooms: ["mur", "cuisine", "salle-de-bain"],
    format: "5x10",
    inStock: true,
  },
  {
    sku: "UNI-CROISE-BLEU",
    slug: "croise-bleu-10x5",
    name: "Croisé Bleu",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 5 cm",
    description:
      "Bleu profond avec motif croisé en surface. L'émail joue avec la lumière selon l'angle de pose, créant un effet de profondeur unique.",
    price: 3.2,
    unit: "carreau",
    image: "/catalog/croise-bleu-10x5.jpeg",
    accent: "#2A5BA0",
    colorFamily: "bleu",
    rooms: ["mur", "salle-de-bain", "hammam"],
    format: "5x10",
    inStock: true,
  },
  {
    sku: "UNI-CROISE-NATURE",
    slug: "croise-nature-10x5",
    name: "Croisé Nature",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 5 cm",
    description:
      "Teinte terre nature avec texture croisée raffinée. Sobre et élégant, s'intègre dans tous les intérieurs contemporains.",
    price: 2.8,
    unit: "carreau",
    image: "/catalog/croise-nature-10x5.jpeg",
    accent: "#A8957A",
    colorFamily: "beige",
    rooms: ["mur", "cuisine", "salle-de-bain", "patio"],
    format: "5x10",
    inStock: true,
  },

  // ── Gris clair & foncé 10 × 10 ──
  {
    sku: "UNI-GRIS-CLAIR",
    slug: "gris-clair-10x10",
    name: "Gris Clair",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Gris perle délicat, lumineux. Parfait en fond neutre pour faire ressortir des compositions colorées ou en pose continue pour un effet minéral épuré.",
    price: 3.8,
    unit: "carreau",
    image: "/catalog/gris-clair-10x10.jpeg",
    accent: "#C8C8C8",
    colorFamily: "gris",
    rooms: ["sol", "mur", "cuisine", "salle-de-bain"],
    format: "10x10",
    inStock: true,
  },
  {
    sku: "UNI-GRIS-FONCE",
    slug: "gris-fonce-10x10",
    name: "Gris Foncé",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Gris anthracite profond, presque ardoise. Sophistiqué en pose continue, saisissant en damier avec le blanc neige ou le beige.",
    price: 4.0,
    unit: "carreau",
    image: "/catalog/gris-fonce-10x10.jpeg",
    accent: "#5A5A5A",
    colorFamily: "gris",
    rooms: ["sol", "mur", "cuisine", "salle-de-bain"],
    format: "10x10",
    inStock: true,
  },

  // ── Nature Décoré 20 × 20 ──
  {
    sku: "MOTIF-NATURE-DECORE-BLEU",
    slug: "nature-decore-bleu-20x20",
    name: "Nature Décoré Bleu",
    category: "motif",
    subtitle: "Carreau décoré · 20 × 20 cm",
    description:
      "Grand format naturel orné de motifs géométriques bleus peints à la main. Chaque carreau est une œuvre unique alliant fond argile et décor de cobalt.",
    price: 12.0,
    unit: "carreau",
    image: "/catalog/nature-decore-bleu-20x20.png",
    accent: "#2A5BA0",
    colorFamily: "bleu",
    rooms: ["mur", "salle-de-bain", "hammam", "patio"],
    format: "20x20",
    inStock: true,
  },
  {
    sku: "MOTIF-NATURE-DECORE-VERT",
    slug: "nature-decore-vert-20x20",
    name: "Nature Décoré Vert",
    category: "motif",
    subtitle: "Carreau décoré · 20 × 20 cm",
    description:
      "Grand format naturel orné de motifs végétaux et géométriques verts. Fond argile brute et décor émeraude pour un esprit jardin andalou.",
    price: 12.0,
    unit: "carreau",
    image: "/catalog/nature-decore-vert-20x20.png",
    accent: "#2E7D32",
    colorFamily: "vert",
    rooms: ["mur", "salle-de-bain", "hammam", "patio"],
    format: "20x20",
    inStock: true,
  },

  // ── Rose Foncé 10 × 10 (nouvelle référence) ──
  {
    sku: "UNI-ROSE-FONCE-V2",
    slug: "rose-fonce-v2-10x10",
    name: "Rose Foncé II",
    category: "uni",
    subtitle: "Carreau émaillé · 10 × 10 cm",
    description:
      "Rose soutenu aux reflets chauds, légèrement plus intense que notre Rose Foncé classique. Caractère affirmé pour les espaces qui osent la couleur.",
    price: 4.0,
    unit: "carreau",
    image: "/catalog/rose-fonce-v2-10x10.jpeg",
    accent: "#B05070",
    colorFamily: "rose",
    rooms: ["mur", "salle-de-bain", "cuisine"],
    format: "10x10",
    inStock: true,
  },
];

export const PRODUCTS_BY_SLUG: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.slug, p])
);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS_BY_SLUG[slug];
}

export function getProductsByCategory(
  category: ProductCategory | "all"
): Product[] {
  return category === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === category);
}

// ─── Galerie éditoriale ─────────────────────────────────────────────────────

export const GALLERY: GalleryItem[] = [
  {
    id: "zellige-vert-deau",
    caption: "Vert d'Eau — pose en mur, Maroc",
    image: "/catalog/vert-deau-10x10.jpg",
    span: "tall",
  },
  {
    id: "zellige-turquoise",
    caption: "Bleu Turquoise — hammam privé",
    image: "/catalog/bleu-turquoise-10x10.jpg",
    span: "square",
  },
  {
    id: "zellige-multicolore",
    caption: "Composition multicolore — patio",
    image: "/catalog/multicolore.png",
    span: "wide",
  },
  {
    id: "zellige-miel",
    caption: "Miel — sol intérieur",
    image: "/catalog/miel-10x10.jpg",
    span: "square",
  },
  {
    id: "zellige-vert-emeraude",
    caption: "Vert Émeraude — mur de jardin",
    image: "/catalog/vert-emeraude-10x10.png",
    span: "square",
  },
  {
    id: "zellige-terracotta",
    caption: "Terracotta — crédence de cuisine",
    image: "/catalog/terracotta-10x10.jpg",
    span: "tall",
  },
  {
    id: "zellige-noir-metal",
    caption: "Noir Métal — salle de bain",
    image: "/catalog/noir-metal-10x10.png",
    span: "square",
  },
  {
    id: "zellige-beige-tribeca",
    caption: "Beige Tribeca — loft contemporain",
    image: "/catalog/beige-tribeca-6x24.png",
    span: "wide",
  },
  {
    id: "zellige-bleu-agadir",
    caption: "Bleu Agadir — douche à l'italienne",
    image: "/catalog/bleu-agadir-7x28.png",
    span: "square",
  },
];

// ─── Formatage ──────────────────────────────────────────────────────────────

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export function formatPrice(p: Product): string {
  const amount = priceFormatter.format(p.price);
  return p.unit === "m2" ? `${amount} / m²` : `${amount} / carreau`;
}
