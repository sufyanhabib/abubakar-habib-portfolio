import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '@/components/SoundProvider';
import { cn } from '@/lib/utils';

interface ShinobiBackToTopProps {
  /** Scroll distance in pixels before FAB becomes visible. Default: 320 */
  threshold?: number;
  /** Custom additional styling for position / container */
  className?: string;
  /** Show circular tactical scroll progress meter. Default: true */
  showProgress?: boolean;
}

export const ShinobiBackToTop: React.FC<ShinobiBackToTopProps> = ({
  threshold = 320,
  className = "",
  showProgress = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const scrollTimeoutRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const sound = useSound();

  // Handle scroll tracking & progress
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const progress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);
    
    setScrollProgress(progress);
    setIsVisible(currentScrollY > threshold);

    // If currently scrolling to top and we arrived near top (< 10px), stop spinning
    if (currentScrollY <= 10 && isSpinning) {
      setIsSpinning(false);
    }
  }, [threshold, isSpinning]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [handleScroll]);

  // Synthesis of subtle ninja metallic swoosh if audio buffer available
  const playKunaiSwoosh = () => {
    try {
      if (sound?.playClick) {
        sound.playClick();
      }
      // Create a rapid metallic whoosh with Web Audio API if allowed
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Scroll to Top execution
  const handleScrollToTop = () => {
    if (isSpinning) return;

    playKunaiSwoosh();
    setIsSpinning(true);

    // Smooth scroll to summit
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Monitor scroll arrival smoothly with requestAnimationFrame
    const checkScrollArrival = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      if (currentScrollY <= 8) {
        setIsSpinning(false);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      } else {
        animFrameRef.current = requestAnimationFrame(checkScrollArrival);
      }
    };

    animFrameRef.current = requestAnimationFrame(checkScrollArrival);

    // Safety timeout: reset spinning after max 2.2s in case smooth scroll was interrupted
    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsSpinning(false);
    }, 2200);
  };

  // Circular progress SVG values
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="shinobi-back-to-top-fab"
          initial={{ opacity: 0, scale: 0.6, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30, transition: { duration: 0.25, ease: "easeOut" } }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className={cn(
            "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[75] flex flex-col items-center select-none",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tactical Tooltip / Shinobi Label */}
          <AnimatePresence>
            {isHovered && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="absolute -top-11 pointer-events-none whitespace-nowrap px-3 py-1 rounded-md bg-[#020617]/95 border border-[#00FF9F]/30 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_8px_rgba(0,255,159,0.2)]"
              >
                <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#00FF9F]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00FF9F] animate-ping" />
                  <span>SUMMIT [TOP]</span>
                  <span className="text-white/40">{(scrollProgress * 100).toFixed(0)}%</span>
                </div>
                {/* Arrow pointing down */}
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#020617] border-r border-b border-[#00FF9F]/30 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Trigger Button */}
          <button
            id="shinobi-back-to-top-button"
            type="button"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="group relative w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF9F]"
          >
            {/* Ambient Chakra Backdrop Glow */}
            <div 
              className={cn(
                "absolute inset-0 rounded-full blur-xl transition-all duration-500 pointer-events-none",
                isSpinning 
                  ? "bg-[#00D2FF]/40 scale-125" 
                  : "bg-[#00FF9F]/15 group-hover:bg-[#00FF9F]/35 group-hover:scale-110"
              )} 
            />

            {/* Tactical Scroll Gauge Circle (SVG) */}
            {showProgress && (
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" 
                viewBox="0 0 80 80"
              >
                {/* Background Track */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="stroke-white/10 fill-[#020617]/70 backdrop-blur-md"
                  strokeWidth="2.5"
                />
                {/* Active Progress Track */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  fill="none"
                  stroke={isSpinning ? "#00D2FF" : "#00FF9F"}
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-150 drop-shadow-[0_0_6px_rgba(0,255,159,0.8)]"
                />
                {/* 4 Cardinal Reticle Crosshair Ticks */}
                <circle cx="40" cy="6" r="1" fill="#00FF9F" opacity="0.6" />
                <circle cx="74" cy="40" r="1" fill="#00FF9F" opacity="0.6" />
                <circle cx="40" cy="74" r="1" fill="#00FF9F" opacity="0.6" />
                <circle cx="6" cy="40" r="1" fill="#00FF9F" opacity="0.6" />
              </svg>
            )}

            {/* Rotating / Springing Kunai Vessel */}
            <motion.div
              className={cn(
                "relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center",
                !isSpinning && "animate-kunai-float"
              )}
              // Anticipation Pull-Back & Tilt-Backward State on Hover/Press
              whileHover={!isSpinning ? {
                scale: 0.92,
                rotate: -16,
                y: 4,
                transition: { type: "spring", stiffness: 400, damping: 16 }
              } : undefined}
              whileTap={!isSpinning ? {
                scale: 0.84,
                rotate: -24,
                y: 8,
                transition: { type: "spring", stiffness: 500, damping: 18 }
              } : undefined}
              // Active Continuous Spinning State
              animate={isSpinning ? {
                rotate: 360,
                scale: [1, 1.08, 1],
                transition: {
                  rotate: {
                    repeat: Infinity,
                    duration: 0.38,
                    ease: "linear"
                  },
                  scale: {
                    repeat: Infinity,
                    duration: 0.38,
                    ease: "easeInOut"
                  }
                }
              } : {
                rotate: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 350, damping: 20 }
              }}
            >
              {/* Spinning Chakra Slipstream Ring during scroll */}
              {isSpinning && (
                <div className="absolute inset-0 -m-2 rounded-full border border-[#00D2FF]/60 border-t-transparent animate-spin [animation-duration:0.25s] pointer-events-none shadow-[0_0_15px_rgba(0,210,255,0.7)]" />
              )}

              {/* 3D Shining Glossing Kunai Graphic Wrapper */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full p-1">
                {/* Main Kunai Image Asset */}
                <img
                  src="/kunai.png"
                  alt="Shinobi Kunai Back to Top"
                  className={cn(
                    "w-full h-full object-contain select-none pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]",
                    isSpinning 
                      ? "drop-shadow-[0_0_16px_rgba(0,210,255,0.85)] brightness-125" 
                      : "group-hover:drop-shadow-[0_0_12px_rgba(0,255,159,0.7)] group-hover:brightness-110 group-hover:contrast-115 transition-all duration-300"
                  )}
                  onError={(e) => {
                    // Fallback to capital filename or vector asset if needed
                    const target = e.currentTarget;
                    if (!target.src.includes('Kunai.png') && !target.src.includes('kunai.svg')) {
                      target.src = '/Kunai.png';
                    } else if (!target.src.includes('kunai.svg')) {
                      target.src = '/kunai.svg';
                    }
                  }}
                />

                {/* 3D Shining Solar Glare Glint Sweep Effect:
                    Simulates blinding sun glare sweeping across the steel blade */}
                <div 
                  className={cn(
                    "absolute inset-0 pointer-events-none overflow-hidden rounded-full mix-blend-screen",
                    isSpinning ? "opacity-0" : "opacity-100"
                  )}
                >
                  <div 
                    className="absolute -inset-[150%] bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.2)_44%,rgba(255,255,255,0.9)_50%,rgba(0,255,159,0.8)_54%,transparent_65%)] animate-kunai-sun-glare pointer-events-none" 
                  />
                </div>

                {/* Razor-tip Specular Twinkle Sparkle */}
                <div 
                  className={cn(
                    "absolute bottom-2 left-2 w-3 h-3 pointer-events-none animate-kunai-sparkle",
                    isSpinning && "opacity-0"
                  )}
                >
                  <div className="w-full h-full relative flex items-center justify-center">
                    <span className="absolute w-full h-[1.5px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
                    <span className="absolute h-full w-[1.5px] bg-white rounded-full shadow-[0_0_4px_#fff]" />
                    <span className="w-1 h-1 bg-[#00FF9F] rounded-full shadow-[0_0_6px_#00FF9F]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
