import React, { memo } from "react";

export const HeroGlobeFallback: React.FC = memo(function HeroGlobeFallback() {
  return (
    <div 
      className="relative w-full h-full flex items-center justify-center bg-[#020203] overflow-hidden select-none"
      aria-label="Interactive Globe Loading"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,159,0.12),transparent_70%)] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/10 to-transparent blur-3xl pointer-events-none z-10" />

      {/* Cybernetic Globe Wireframe */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Outer orbital rings */}
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_25s_linear_infinite]" />
        <div className="absolute inset-2 rounded-full border border-dashed border-[#00D2FF]/25 animate-[spin_35s_linear_infinite_reverse]" />
        <div className="absolute inset-6 rounded-full border border-primary/20 animate-[spin_45s_linear_infinite]" />

        {/* Globe Silhouette SVG */}
        <svg className="w-48 h-48 sm:w-56 sm:h-56 text-primary/40 drop-shadow-[0_0_15px_rgba(0,255,159,0.3)] animate-pulse" viewBox="0 0 100 100" fill="none">
          {/* Main sphere outline */}
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.2" className="text-[#00FF9F]/60" />
          
          {/* Latitudes */}
          <ellipse cx="50" cy="50" rx="42" ry="14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="42" ry="28" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />

          {/* Longitudes */}
          <ellipse cx="50" cy="50" rx="14" ry="42" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="28" ry="42" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
          <line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />

          {/* Glowing node points */}
          <circle cx="35" cy="42" r="2" fill="#FF9933" className="animate-ping" />
          <circle cx="35" cy="42" r="1.5" fill="#FF9933" />
          
          <circle cx="68" cy="38" r="2" fill="#00D2FF" className="animate-ping" style={{ animationDelay: "1s" }} />
          <circle cx="68" cy="38" r="1.5" fill="#00D2FF" />

          <circle cx="52" cy="62" r="2" fill="#00FF9F" className="animate-ping" style={{ animationDelay: "1.8s" }} />
          <circle cx="52" cy="62" r="1.5" fill="#00FF9F" />

          <circle cx="42" cy="28" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="65" r="1.5" fill="#FFFFFF" />

          {/* Connecting data arc */}
          <path d="M 35 42 Q 50 20 68 38" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
          <path d="M 35 42 Q 40 60 52 62" stroke="#FF9933" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
        </svg>

        {/* Center glowing core */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-primary/10 via-[#00D2FF]/15 to-transparent blur-md" />
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20" />
    </div>
  );
});

export default HeroGlobeFallback;
