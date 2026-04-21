/**
 * <defs> content regroupant la matière d'un fragment de zellige :
 *  - filtre combinant grain d'argile (feTurbulence) + ombre interne (alpha inversé, blur, composite)
 *  - radialGradient de reflet spéculaire (gradientUnits=objectBoundingBox → local à chaque fragment)
 *
 * À inclure à l'intérieur d'un <defs>. Les ids sont passés explicitement pour éviter
 * les collisions quand plusieurs instances cohabitent dans la page.
 */
interface TileMaterialDefsProps {
  filterId: string;
  highlightId: string;
  grainFrequency?: number;
  grainIntensity?: number;
  shadowBlur?: number;
  shadowOpacity?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  highlightIntensity?: number;
}

export default function TileMaterialDefs({
  filterId,
  highlightId,
  grainFrequency = 1.6,
  grainIntensity = 0.18,
  shadowBlur = 1.6,
  shadowOpacity = 0.45,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  highlightIntensity = 0.42,
}: TileMaterialDefsProps) {
  return (
    <>
      <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
        {/* 1. Grain argile — turbulence multipliée par la forme */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency={grainFrequency}
          numOctaves={2}
          seed={7}
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values={`0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 ${grainIntensity} 0`}
          result="grainLayer"
        />
        <feComposite
          in="grainLayer"
          in2="SourceGraphic"
          operator="in"
          result="grainMasked"
        />

        {/* 2. Inner shadow : invert alpha, blur, offset, clip in shape, colorize dark */}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 -1 1"
          result="invAlpha"
        />
        <feGaussianBlur
          in="invAlpha"
          stdDeviation={shadowBlur}
          result="invBlur"
        />
        <feOffset
          in="invBlur"
          dx={shadowOffsetX}
          dy={shadowOffsetY}
          result="invOff"
        />
        <feComposite
          in="invOff"
          in2="SourceAlpha"
          operator="in"
          result="shadowClipped"
        />
        <feColorMatrix
          in="shadowClipped"
          type="matrix"
          values={`0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 0 0
                   0 0 0 ${shadowOpacity} 0`}
          result="innerShadow"
        />

        {/* 3. Empilement : couleur de base → grain → ombre interne */}
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="grainMasked" />
          <feMergeNode in="innerShadow" />
        </feMerge>
      </filter>

      {/* Reflet spéculaire : cx/cy en haut-gauche, rayon 0.75 — s'adapte au
          bounding box de chaque path auquel on applique fill={`url(#${highlightId})`} */}
      <radialGradient
        id={highlightId}
        cx="0.28"
        cy="0.22"
        r="0.75"
        fx="0.22"
        fy="0.18"
        gradientUnits="objectBoundingBox"
      >
        <stop offset="0%" stopColor="#ffffff" stopOpacity={highlightIntensity} />
        <stop
          offset="45%"
          stopColor="#ffffff"
          stopOpacity={highlightIntensity * 0.18}
        />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
    </>
  );
}
