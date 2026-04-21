"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";

import patterns from "@/public/patterns.json";
import {
  lightenHex,
  nudgeLightness,
  type ColorMap,
} from "@/lib/colors";
import TileMaterialDefs from "./TileMaterialDefs";

type PatternData = typeof patterns;
type Fragment = PatternData["fragments"][number];

interface ZelligeRendererProps {
  colors: ColorMap;
  size?: number | string;
  className?: string;
  enableHover?: boolean;
  enableMaterial?: boolean;
  enableHighlight?: boolean;
  materialFilterId?: string;
  highlightGradientId?: string;
  strokeColor?: string;
  strokeWidth?: number;
  transitionDuration?: number;
  nudgeRangePct?: number;
  onFragmentClick?: (fragmentId: string) => void;
}

export default function ZelligeRenderer({
  colors,
  size = "100%",
  className,
  enableHover = true,
  enableMaterial = true,
  enableHighlight = true,
  materialFilterId,
  highlightGradientId,
  strokeColor = "rgba(26, 26, 26, 0.09)",
  strokeWidth = 0.6,
  transitionDuration = 1,
  nudgeRangePct = 3,
  onFragmentClick,
}: ZelligeRendererProps) {
  const localId = useId().replace(/:/g, "");
  const filterId = materialFilterId ?? `mat-${localId}`;
  const highlightId = highlightGradientId ?? `hl-${localId}`;
  const includeDefs = !materialFilterId && !highlightGradientId;

  const fragments = useMemo<Fragment[]>(
    () => patterns.fragments as Fragment[],
    []
  );

  return (
    <svg
      viewBox={patterns.viewBox}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Motif zellige khatam"
      preserveAspectRatio="xMidYMid meet"
    >
      {includeDefs && (
        <defs>
          <TileMaterialDefs filterId={filterId} highlightId={highlightId} />
        </defs>
      )}

      {fragments.map((fragment) => {
        const baseColor = colors[fragment.id] ?? "#FDFCF8";
        // Nuançage déterministe : chaque fragment a sa propre dérive de bain de cuisson
        const nudged = nudgeLightness(baseColor, fragment.id, nudgeRangePct);
        const hovered = lightenHex(nudged, 0.08);

        return (
          <g key={fragment.id} data-fragment={fragment.id} data-role={fragment.role}>
            <motion.path
              d={fragment.d}
              filter={enableMaterial ? `url(#${filterId})` : undefined}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinejoin="miter"
              initial={false}
              animate={{ fill: nudged }}
              whileHover={enableHover ? { fill: hovered } : undefined}
              transition={{
                duration: transitionDuration,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                cursor: enableHover || onFragmentClick ? "pointer" : "default",
              }}
              onClick={
                onFragmentClick ? () => onFragmentClick(fragment.id) : undefined
              }
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
    </svg>
  );
}

export { patterns };
