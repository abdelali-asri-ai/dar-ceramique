"use client";

import { motion } from "framer-motion";

interface TileWallPreviewProps {
  image: string;
  alt: string;
  gridSize: number;
  className?: string;
}

/**
 * Pave le cadre avec l'image du carreau sélectionné en répétant la texture CSS.
 * Utilise background-image:repeat pour respecter les proportions naturelles
 * de chaque tuile (carrés 10×10, rectangles 7×28, etc.) sans distorsion.
 * Les joints sont simulés par deux gradients linéaires répétés superposés.
 */
export default function TileWallPreview({
  image,
  alt,
  gridSize,
  className,
}: TileWallPreviewProps) {
  const clamped = Math.max(1, Math.min(gridSize, 10));
  const pct = `${(100 / clamped).toFixed(3)}%`;
  const groutColor = "rgba(26,26,26,0.14)";
  const groutW = clamped > 6 ? "1px" : "2px";

  return (
    <motion.div
      key={`${image}-${clamped}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      role="img"
      aria-label={alt}
      className={["relative h-full w-full overflow-hidden", className ?? ""].join(" ")}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: pct,
        backgroundRepeat: "repeat",
        backgroundPosition: "top left",
      }}
    >
      {/* Joints horizontaux */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent calc(${pct} - ${groutW}),
            ${groutColor} calc(${pct} - ${groutW}),
            ${groutColor} ${pct}
          )`,
        }}
      />
      {/* Joints verticaux */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent calc(${pct} - ${groutW}),
            ${groutColor} calc(${pct} - ${groutW}),
            ${groutColor} ${pct}
          )`,
        }}
      />
      {/* Voile lumineux */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20"
      />
    </motion.div>
  );
}
