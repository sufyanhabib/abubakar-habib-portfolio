import React from 'react';
import { cn } from '@/lib/utils';

interface KonohaBannerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showShadow?: boolean;
}

export const KonohaBanner: React.FC<KonohaBannerProps> = ({
  className = "",
  size = 'md',
  showShadow = true
}) => {
  const sizeClasses = {
    sm: "w-10 h-14",
    md: "w-14 h-20 sm:w-16 sm:h-24",
    lg: "w-20 h-28 sm:w-24 sm:h-34"
  }[size];

  return (
    <div 
      className={cn(
        "relative inline-block select-none transition-transform duration-300 hover:scale-105 hover:-rotate-1",
        sizeClasses,
        className
      )}
      title="Konohagakure Clan Pennant"
    >
      <svg
        viewBox="0 0 100 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Konoha Red Banner"
      >
        <defs>
          {/* Wood rod gradient */}
          <linearGradient id="wood-rod" x1="10" y1="12" x2="90" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="25%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Wooden Finials */}
          <radialGradient id="wood-knob" cx="12" cy="15" r="5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </radialGradient>

          {/* Crimson fabric gradient with silk highlight */}
          <linearGradient id="banner-cloth" x1="16" y1="18" x2="84" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7F1D1D" />
            <stop offset="15%" stopColor="#991B1B" />
            <stop offset="45%" stopColor="#DC2626" />
            <stop offset="55%" stopColor="#EF4444" />
            <stop offset="85%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#6E1212" />
          </linearGradient>

          {/* Vertical shadow/fold gradient */}
          <linearGradient id="cloth-shading" x1="50" y1="18" x2="50" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="8%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </linearGradient>

          {/* Drop shadow */}
          <filter id="banner-shadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Group with shadow */}
        <g filter={showShadow ? "url(#banner-shadow)" : undefined}>
          {/* 1. Hanging Rope */}
          <path
            d="M 50 2 L 14 15 M 50 2 L 86 15"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {/* Hanging Loop Knot at apex */}
          <circle cx="50" cy="2" r="1.5" fill="#B45309" stroke="#78350F" strokeWidth="0.8" />

          {/* 2. Banner Cloth Silhouette (V-chevron bottom) */}
          <path
            d="M 17 18 L 83 18 L 83 96 L 50 134 L 17 96 Z"
            fill="url(#banner-cloth)"
          />

          {/* Silk fold overlay & bottom hem shading */}
          <path
            d="M 17 18 L 83 18 L 83 96 L 50 134 L 17 96 Z"
            fill="url(#cloth-shading)"
          />

          {/* Left & Right edge inner folds */}
          <path d="M 17 18 L 22 18 L 22 93 L 17 96 Z" fill="rgba(0,0,0,0.18)" />
          <path d="M 83 18 L 78 18 L 78 93 L 83 96 Z" fill="rgba(0,0,0,0.22)" />

          {/* Center vertical subtle cloth fold highlight */}
          <line x1="50" y1="20" x2="50" y2="132" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          {/* 3. Top Decorative Border (Greek Key Meander / Raemon) */}
          <rect x="17" y="19" width="66" height="8" fill="rgba(20, 5, 5, 0.45)" />
          
          {/* Meander pattern frets */}
          <g stroke="#1F0404" strokeWidth="1" fill="none" strokeLinecap="square" strokeLinejoin="miter">
            {/* Pattern Unit 1 */}
            <path d="M 20 25 L 20 21 L 24 21 L 24 24 L 22 24 L 22 22.5" />
            {/* Pattern Unit 2 */}
            <path d="M 28 25 L 28 21 L 32 21 L 32 24 L 30 24 L 30 22.5" />
            {/* Pattern Unit 3 */}
            <path d="M 36 25 L 36 21 L 40 21 L 40 24 L 38 24 L 38 22.5" />
            {/* Pattern Unit 4 */}
            <path d="M 44 25 L 44 21 L 48 21 L 48 24 L 46 24 L 46 22.5" />
            {/* Pattern Unit 5 */}
            <path d="M 52 25 L 52 21 L 56 21 L 56 24 L 54 24 L 54 22.5" />
            {/* Pattern Unit 6 */}
            <path d="M 60 25 L 60 21 L 64 21 L 64 24 L 62 24 L 62 22.5" />
            {/* Pattern Unit 7 */}
            <path d="M 68 25 L 68 21 L 72 21 L 72 24 L 70 24 L 70 22.5" />
            {/* Pattern Unit 8 */}
            <path d="M 76 25 L 76 21 L 80 21 L 80 24 L 78 24 L 78 22.5" />
          </g>
          {/* Gold separator hairline */}
          <line x1="17" y1="27" x2="83" y2="27" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />

          {/* 4. Konoha (Leaf Village) Spiral Insignia Emblem */}
          <g transform="translate(50, 58) scale(1.15)">
            {/* Drop shadow for insignia */}
            <path
              d="M -18 14 C -12 20, 8 20, 16 12 C 22 6, 22 -6, 17 -13 C 14 -17, 8 -19, 3 -19 C 12 -21, 23 -17, 26 -21 C 21 -15, 23 -12, 21 -7 C 23 2, 18 16, 4 20 C -9 24, -22 17, -24 6 C -25 -4, -18 -15, -6 -18 C 5 -20, 15 -14, 16 -3 C 17 6, 10 12, 1 12 C -6 12, -10 7, -9 1 C -8 -4, -4 -7, 0 -6 C 3 -5, 4 -2, 2 0 C 1 1, 0 1, -1 0"
              fill="none"
              stroke="#111827"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0, 1)"
              opacity="0.5"
            />
            {/* Main Konoha Leaf Spiral */}
            <path
              d="M -18 14 C -12 20, 8 20, 16 12 C 22 6, 22 -6, 17 -13 C 14 -17, 8 -19, 3 -19 C 12 -21, 23 -17, 26 -21 C 21 -15, 23 -12, 21 -7 C 23 2, 18 16, 4 20 C -9 24, -22 17, -24 6 C -25 -4, -18 -15, -6 -18 C 5 -20, 15 -14, 16 -3 C 17 6, 10 12, 1 12 C -6 12, -10 7, -9 1 C -8 -4, -4 -7, 0 -6 C 3 -5, 4 -2, 2 0 C 1 1, 0 1, -1 0"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="4.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Triangle notch at leaf base */}
            <path
              d="M -23 11 L -29 17 L -18 17 Z"
              fill="#0A0A0A"
            />
          </g>

          {/* 5. Japanese Kanji: 木ノ葉 (Konoha) Calligraphy */}
          <g fill="#0A0A0A">
            {/* 木 (Ki/Tree) */}
            <path d="M 40 88 L 40 102 M 35 93 L 45 93 M 40 93 L 36 100 M 40 93 L 44 100" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            {/* ノ (No) */}
            <path d="M 52 90 Q 48 97 45 101" stroke="#0A0A0A" strokeWidth="1.6" strokeLinecap="round" />
            {/* 葉 (Ha/Leaf) */}
            {/* Top radical 艹 */}
            <path d="M 56 89 L 66 89 M 59 87 L 59 91 M 63 87 L 63 91" stroke="#0A0A0A" strokeWidth="1.4" strokeLinecap="round" />
            {/* Middle 世 */}
            <path d="M 57 93 L 65 93 M 57 93 L 57 97 L 65 97 M 61 93 L 61 97" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
            {/* Bottom 木 */}
            <path d="M 61 97 L 61 104 M 57 100 L 65 100 M 61 100 L 58 103 M 61 100 L 64 103" stroke="#0A0A0A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* 6. Wooden Hanging Rod & Finials (Overlapping top of cloth) */}
          {/* Main rod */}
          <rect
            x="13"
            y="13.5"
            width="74"
            height="5"
            rx="1.5"
            fill="url(#wood-rod)"
            stroke="#451A03"
            strokeWidth="0.6"
          />
          {/* Left Finial Knob */}
          <circle cx="12" cy="16" r="3.5" fill="url(#wood-knob)" stroke="#451A03" strokeWidth="0.8" />
          <circle cx="11" cy="15" r="1.2" fill="#FEF3C7" opacity="0.6" />
          
          {/* Right Finial Knob */}
          <circle cx="88" cy="16" r="3.5" fill="url(#wood-knob)" stroke="#451A03" strokeWidth="0.8" />
          <circle cx="87" cy="15" r="1.2" fill="#FEF3C7" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};
