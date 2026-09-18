import React from 'react';

interface NinjaKunaiIconProps {
  className?: string;
  isWaterCasting?: boolean;
}

export const NinjaKunaiIcon: React.FC<NinjaKunaiIconProps> = ({ 
  className = "w-5 h-5",
  isWaterCasting = false 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ninja Kunai"
      role="img"
    >
      <defs>
        {/* Steel blade upper bevel highlight (metallic silver) */}
        <linearGradient id="kunai-blade-top" x1="50" y1="40" x2="20" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Steel blade lower bevel shadow (charcoal/gunmetal) */}
        <linearGradient id="kunai-blade-bottom" x1="60" y1="60" x2="20" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="40%" stopColor="#334155" />
          <stop offset="85%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Metal ring pommel gradient */}
        <radialGradient id="kunai-ring" cx="77" cy="23" r="14" fx="75" fy="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="45%" stopColor="#64748B" />
          <stop offset="85%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>

        {/* Handle wrap cords */}
        <linearGradient id="kunai-wrap" x1="66" y1="30" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Chakra aura glow filters */}
        <filter id="kunai-glow-green" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#00FF9F" floodOpacity="0.4" />
        </filter>
        <filter id="kunai-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00D2FF" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Main Kunai Dagger Group */}
      <g filter={isWaterCasting ? "url(#kunai-glow-cyan)" : "url(#kunai-glow-green)"}>
        {/* Subtle drop shadow behind kunai */}
        <path
          d="M 17 88 L 33 55 L 43 45 L 63 25 L 79 19 A 11 11 0 1 1 89 29 L 69 49 L 59 59 L 55 69 Z"
          fill="rgba(0,0,0,0.35)"
          transform="translate(1.5, 2)"
        />

        {/* 1. Pommel Ring (Outer ring and punched hole) */}
        <circle cx="77" cy="23" r="11" fill="url(#kunai-ring)" stroke="#0F172A" strokeWidth="1" />
        <circle cx="77" cy="23" r="5.5" fill="#0B0F19" stroke="#334155" strokeWidth="0.8" />
        <circle cx="76" cy="22" r="9.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />

        {/* 2. Handle Shaft (wrapped grip) */}
        {/* Under-shaft */}
        <path
          d="M 68 30 L 71 33 L 49 55 L 46 52 Z"
          fill="#1E293B"
        />
        {/* Cord Wrap Segments */}
        <g stroke="#0F172A" strokeWidth="0.6">
          <path d="M 67 31 L 70 34 L 66 38 L 63 35 Z" fill="url(#kunai-wrap)" />
          <path d="M 63 35 L 66 38 L 62 42 L 59 39 Z" fill="url(#kunai-wrap)" />
          <path d="M 59 39 L 62 42 L 58 46 L 55 43 Z" fill="url(#kunai-wrap)" />
          <path d="M 55 43 L 58 46 L 54 50 L 51 47 Z" fill="url(#kunai-wrap)" />
          <path d="M 51 47 L 54 50 L 50 54 L 47 51 Z" fill="url(#kunai-wrap)" />
        </g>
        {/* Cord Highlight line along top rim of grip */}
        <line x1="68" y1="30" x2="47" y2="51" stroke="rgba(255,255,255,0.6)" strokeWidth="0.6" strokeLinecap="round" />

        {/* 3. Bolster / Collar Collar between handle and blade */}
        <path
          d="M 45 49 L 51 55 L 48 58 L 42 52 Z"
          fill="#334155"
          stroke="#0F172A"
          strokeWidth="0.8"
        />

        {/* 4. Blade: Faceted Spear-Point Diamond Shape */}
        {/* Top/Right Bevel (Light facet) */}
        <path
          d="M 44 46 L 47 53 L 15 85 L 30 58 Z"
          fill="url(#kunai-blade-top)"
          stroke="#E2E8F0"
          strokeWidth="0.5"
        />
        {/* Bottom/Left Bevel (Shadow facet) */}
        <path
          d="M 47 53 L 54 56 L 38 70 L 15 85 Z"
          fill="url(#kunai-blade-bottom)"
          stroke="#334155"
          strokeWidth="0.5"
        />

        {/* Central Ridge / Spine (from bolster to razor tip) */}
        <line
          x1="47"
          y1="53"
          x2="15"
          y2="85"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Perimeter Cutting Edge Highlighting */}
        <line x1="44" y1="46" x2="15" y2="85" stroke="rgba(255,255,255,0.85)" strokeWidth="0.75" />
        <line x1="54" y1="56" x2="15" y2="85" stroke="#475569" strokeWidth="0.75" />

        {/* Specular Glint at the tip */}
        <circle cx="15.5" cy="84.5" r="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
};
