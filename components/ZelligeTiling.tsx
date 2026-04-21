"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";

import patterns from "@/public/patterns.json";
import { nudgeLightness, type ColorMap } from "@/lib/colors";
import TileMaterialDefs from "./TileMaterialDefs";

interface ZelligeTilingProps {
  colors: ColorMap;
  /**
   * Nombre de motifs par côté du conteneur (1 à 10). Prioritaire sur tileSize.
   * Utilise patternUnits="objectBoundingBox" → indépendant de la taille viewport.
   */
  gridSize?: number;
  /**
   * Taille physique en pixels d'un motif. Ignoré si gridSize est défini.
   */
  tileSize?: number;
  className?: string;
  enableMaterial?: boolean;
  enableHighlight?: boolean;
  transitionDuration?: number;
  nudgeRangePct?: number;
}

export default function ZelligeTiling({
  colors,
  gridSize,
  tileSize = 220,
  className,
  enableMaterial = true,
  enableHighlight = true,
  transitionDuration = 1,
  nudgeRangePct = 3,
}: ZelligeTilingProps) {
  const reactId = useId().replace(/:/g, "");
  const filterId = `mat-${reactId}`;
  const highlightId = `hl-${reactId}`;
  const patternId = `tile-${reactId}`;

  const fragments = useMemo(() => patterns.fragments, []);

  const useBBox = typeof gridSize === "number" && gridSize > 0;
  const patternAttrs = useBBox
    ? ({
        patternUnits: "objectBoundingBox",
        width: 1 / (gridSize as number),
        height: 1 / (gridSize as number),
      } as const)
    : ({
        patternUnits: "userSpaceOnUse",
        width: tileSize,
        height: tileSize,
      } as const);

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      role="img"
      aria-label="Motif zellige en tiling"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <TileMaterialDefs filterId={filterId} highlightId={highlightId} />
        <pattern
          id={patternId}
          x="0"
          y="0"
          {...patternAttrs}
          viewBox={patterns.viewBox}
          preserveAspectRatio="xMidYMid slice"
        >
          {fragments.map((fragment) => {
            const baseColor = colors[fragment.id] ?? "#FDFCF8";
            const nudged = nudgeLightness(baseColor, fragment.id, nudgeRangePct);
            return (
              <g key={fragment.id}>
                <motion.path
                  d={fragment.d}
                  filter={enableMaterial ? `url(#${filterId})` : undefined}
                  stroke="rgba(26, 26, 26, 0.09)"
                  strokeWidth={0.6}
                  initial={false}
                  animate={{ fill: nudged }}
                  transition={{
                    duration: transitionDuration,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
                {enableHighlight && (
                  <path
                    d={fragment.d}
                    fill={`url(#${highlightId})`}
                    pointerEvents="none"
                    aria-hidden
                  />
                )}
              </g>
            );
          })}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
