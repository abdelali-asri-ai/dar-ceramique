export type ColorMap = Record<string, string>;

const PALETTE_POOL = [
  "#1A1A1A",
  "#FDFCF8",
  "#D4AF37",
  "#B6623C",
  "#2D4A6E",
  "#497B6A",
  "#8A2E2E",
  "#3C2A20",
  "#E8D7B1",
  "#6B7F4F",
];

export function randomPalette(): ColorMap {
  const shuffled = [...PALETTE_POOL].sort(() => Math.random() - 0.5);
  const star = shuffled[0];
  const ray = shuffled[1];
  const corner = shuffled[2];
  return {
    "star-center": star,
    "ray-n": ray,
    "ray-e": ray,
    "ray-s": ray,
    "ray-w": ray,
    "corner-ne": corner,
    "corner-se": corner,
    "corner-sw": corner,
    "corner-nw": corner,
  };
}

// ---------- HSL / nuançage ----------

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function expandHex(hex: string): string {
  const h = hex.replace("#", "");
  return h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(expandHex(hex), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.round(clamp01(x / 255) * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let h = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r = l;
  let g = l;
  let b = l;
  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}

// FNV-1a 32-bit → deterministic pseudo-random in [0, 1) for a given string seed.
function seededUnit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

/**
 * Applique une variation de luminosité déterministe (±rangePct%) seedée
 * par `seed` — simule les bains de cuisson différents de l'argile.
 */
export function nudgeLightness(
  hex: string,
  seed: string,
  rangePct = 3
): string {
  const r01 = seededUnit(seed);
  const delta = (r01 - 0.5) * 2 * (rangePct / 100);
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [r2, g2, b2] = hslToRgb(h, s, clamp01(l + delta));
  return rgbToHex(r2, g2, b2);
}

export function lightenHex(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [r2, g2, b2] = hslToRgb(h, s, clamp01(l + amount));
  return rgbToHex(r2, g2, b2);
}

/**
 * Dérive un ColorMap 9 fragments à partir d'une teinte dominante.
 * - `star-center` : la teinte telle quelle (cœur du motif).
 * - `ray-*`       : variation plus sombre de la teinte (rayons).
 * - `corner-*`    : teinte très éclaircie en fond pour le contraste.
 *
 * Utilisé par le configurateur quand l'utilisateur part d'un carreau
 * du catalogue plutôt que d'une collection préfabriquée.
 */
export function paletteFromAccent(accent: string): ColorMap {
  const ray = lightenHex(accent, -0.12);
  const corner = lightenHex(accent, 0.38);
  return {
    "star-center": accent,
    "ray-n": ray,
    "ray-e": ray,
    "ray-s": ray,
    "ray-w": ray,
    "corner-ne": corner,
    "corner-se": corner,
    "corner-sw": corner,
    "corner-nw": corner,
  };
}
