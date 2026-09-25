import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useKunaiCursor } from "@/hooks/useKunaiCursor";

interface ShinobiKunaiCursorProps {
  /**
   * Path to the kunai image asset.
   * @default "/Kunai.png"
   */
  assetUrl?: string;
  /**
   * Target container class or selector to scope cursor hiding.
   * @default "shinobi-dossier-page"
   */
  scopeClass?: string;
}

/**
 * Interactive DOM Kunai Cursor for the Archived Shinobi Dossier.
 * 
 * Features:
 * - Zero-latency requestAnimationFrame hardware tracking
 * - Pixel-perfect hotspot calibration: Blade tip mapped to (10.94%, 88.54%)
 * - Transform-origin pinned to the sharp tip so all rotations pivot on the click point
 * - Reactive micro-interactions for Links, Buttons, and WATER RELEASE capsule
 * - Dynamic chakra energy aura (Emerald for standard, Cyan for Water Release)
 * - Touch device suppression to eliminate phantom cursors on mobile
 * - Non-blocking pointer-events: none architecture
 * - CSS cursor fallback for lower-end environments
 */
export const ShinobiKunaiCursor: React.FC<ShinobiKunaiCursorProps> = ({
  assetUrl = "/Kunai.png",
  scopeClass = "shinobi-dossier-page",
}) => {
  const { x, y, isVisible, isHovered, isPressed, targetType, isTouchDevice } = useKunaiCursor();

  // Disable on mobile touch devices
  if (isTouchDevice) {
    return null;
  }

  // Exact pixel ratio for the sharp tip measured on the 384x384 Kunai asset:
  // Raw tip is at (41px, 339px) => X: 10.68%, Y: 88.28%
  const tipXPercent = 10.68;
  const tipYPercent = 88.28;

  const isWater = targetType === "water-capsule";

  return (
    <>
      {/* Scoped CSS Fallback and Default Cursor Suppression */}
      <style>{`
        .${scopeClass}, .${scopeClass} * {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          .${scopeClass}, .${scopeClass} * {
            cursor: auto !important;
          }
        }
        /* Standard CSS Fallback for browsers or low-end rendering */
        .${scopeClass}-fallback {
          cursor: url('${assetUrl}') 5 42, auto;
        }
      `}</style>

      {/* Hardware-accelerated cursor wrapper with absolute pointer transparency */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[999999] select-none transition-opacity duration-150"
        style={{
          transform: `translate3d(${x}px, ${y}px, 0)`,
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* 
          Offset container: Shifts the asset so the blade tip at (10.68%, 88.28%)
          aligns precisely with the pointer coordinate (0, 0).
        */}
        <div
          className="relative pointer-events-none"
          style={{
            transform: `translate(-${tipXPercent}%, -${tipYPercent}%)`,
          }}
        >
          {/* Animated Kunai Body pivoting directly on the sharp tip */}
          <motion.div
            className="relative pointer-events-none"
            animate={{
              // Spring physics: scales down by 10% on hover (0.90), tactile recoil on click (0.82)
              scale: isPressed ? 0.82 : isHovered ? 0.90 : 1,
              // Rotate by ~98°-100° so the blade tip points up-left (11 o'clock position),
              // mimicking standard OS cursor orientation while pivoting exactly on the tip.
              rotate: isHovered ? (isWater ? 80 : 86) : 98,
            }}
            transition={{
              type: "spring",
              stiffness: 480,
              damping: 24,
              mass: 0.5,
            }}
            style={{
              // Transform origin pinned to the sharp tip of the blade:
              // All rotation, scaling, and tilt pivots on the click hotspot without drift.
              transformOrigin: `${tipXPercent}% ${tipYPercent}%`,
            }}
          >
            {/* Ambient Chakra Energy Aura on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1.25 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute -inset-1 rounded-full blur-md pointer-events-none -z-10 ${
                    isWater
                      ? "bg-cyan-400/40 shadow-[0_0_24px_rgba(0,210,255,0.85)]"
                      : "bg-[#00FF9F]/35 shadow-[0_0_20px_rgba(0,255,159,0.7)]"
                  }`}
                  style={{
                    transformOrigin: `${tipXPercent}% ${tipYPercent}%`,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Kunai Blade Asset */}
            <img
              src={assetUrl}
              alt=""
              width={48}
              height={48}
              className={`w-12 h-12 object-contain pointer-events-none transition-all duration-200 select-none ${
                isHovered
                  ? isWater
                    ? "filter drop-shadow-[0_0_12px_#00d2ff] brightness-125 contrast-110"
                    : "filter drop-shadow-[0_0_10px_#00FF9F] brightness-115"
                  : "filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.65)]"
              }`}
              draggable={false}
            />

            {/* Sharp Tip Tactical Crosshair / Chakra Flare Dot */}
            {isHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className={`absolute w-1.5 h-1.5 rounded-full pointer-events-none ${
                  isWater
                    ? "bg-cyan-300 shadow-[0_0_8px_#00d2ff]"
                    : "bg-[#00FF9F] shadow-[0_0_8px_#00FF9F]"
                }`}
                style={{
                  left: `${tipXPercent}%`,
                  top: `${tipYPercent}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};
