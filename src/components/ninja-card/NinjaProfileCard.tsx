import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import { 
  Shield, 
  Zap, 
  Droplets, 
  Eye, 
  Scroll, 
  Target, 
  Award, 
  Activity, 
  ChevronRight, 
  ExternalLink, 
  Database,
  Waves,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from './ProgressBar';
import { NinjaKunaiIcon } from './NinjaKunaiIcon';
import { KonohaBanner } from './KonohaBanner';
import { useNinjaSound } from './useNinjaSound';
import { useWaterDragonJutsu } from './useWaterDragonJutsu';
import { ParticleBackground } from './ParticleBackground';
import { DOSSIER_ASSETS } from '@/constants/dossierData';

interface NinjaProfileCardProps {
  className?: string;
}

export const NinjaProfileCard: React.FC<NinjaProfileCardProps> = ({ className }) => {
  const [progress, setProgress] = useState(65);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [activeNature, setActiveNature] = useState<string | null>(null);
  const { playLevelUp, playHover, playSharingan, playLightning } = useNinjaSound();

  // Stable callback references to prevent hook re-triggering
  const handleWaterCastStart = useCallback(() => {
    setActiveNature("Water Release");
  }, []);

  const handleWaterCastEnd = useCallback(() => {
    setActiveNature((prev) => (prev === "Water Release" ? null : prev));
  }, []);

  // Battle-tested Water Dragon Jutsu Hook with Audio Controller & Casting State Management
  const { 
    isCasting: isWaterCasting, 
    isPlaying: isWaterPlaying,
    castProgress: waterCastProgress,
    castId: waterCastId, 
    playJutsu: triggerWaterDragonJutsu, 
    stopJutsu: stopWaterDragonJutsu 
  } = useWaterDragonJutsu({
    volume: 0.85,
    onCastStart: handleWaterCastStart,
    onCastEnd: handleWaterCastEnd
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLevelUp = useCallback(() => {
    if (isLevelingUp) return;
    
    setIsLevelingUp(true);
    playLevelUp();
    
    // Animate to 100%
    setProgress(100);
    
    // Reset after delay
    setTimeout(() => {
      setIsLevelingUp(false);
      setProgress(65);
    }, 3000);
  }, [isLevelingUp, playLevelUp]);

  const stats = useMemo(() => [
    { label: "Rank", value: "Early Jōnin", icon: Award },
    { label: "Village", value: "Konohagakure-(Bihar)", icon: Shield },
    { label: "Clan", value: "Nara Clan", icon: Scroll },
    { label: "Dōjutsu", value: "Sharingan (1-Tomoe)", icon: Eye, hasEffect: true },
  ], []);

  const natureTypes = useMemo(() => [
    { 
      name: "Lightning Release", 
      icon: Zap, 
      color: "text-[#00FF9F]", 
      isPrimary: true,
      onAction: playLightning,
      glowColor: "group-hover:shadow-[0_0_20px_rgba(0,255,159,0.4)]"
    },
    { 
      name: "Water Release", 
      icon: Droplets, 
      color: "text-[#00C2FF]", 
      isPrimary: false,
      onAction: triggerWaterDragonJutsu,
      glowColor: "group-hover:shadow-[0_0_25px_rgba(0,210,255,0.5)]"
    },
  ], [playLightning, triggerWaterDragonJutsu]);

  const handleNatureClick = useCallback((name: string, action: () => void) => {
    if (name === "Water Release") {
      // Clean restart from frame zero and terminates prior playback
      action();
    } else {
      if (isWaterCasting) {
        stopWaterDragonJutsu();
      }
      setActiveNature(name);
      action();
      setTimeout(() => {
        setActiveNature((prev) => (prev === name ? null : prev));
      }, 1000);
    }
  }, [isWaterCasting, stopWaterDragonJutsu]);

  return (
    <div className={cn("relative group", className)}>
      {/* Particle Background Layer */}
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none z-0">
        <ParticleBackground />
      </div>

      <Tilt
        perspective={1200}
        glareEnable={!isMobile}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="2.5rem"
        tiltMaxAngleX={isMobile ? 0 : 6}
        tiltMaxAngleY={isMobile ? 0 : 6}
        transitionSpeed={1500}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseEnter={playHover}
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0B0F19]/90 backdrop-blur-3xl p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-[#00FF9F]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
            activeNature === "Lightning Release" && "animate-shake border-[#00FF9F]/50",
            isWaterCasting && "border-[#00d2ff]/70 shadow-[0_0_60px_rgba(0,210,255,0.25),inset_0_0_30px_rgba(0,210,255,0.06)]"
          )}
        >
          {/* Elemental Jutsu Overlays with Explicit Key Reset */}
          <AnimatePresence mode="wait">
            {activeNature === "Lightning Release" && (
              <motion.div
                key="overlay-lightning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 pointer-events-none"
              >
                {/* Flash Effect */}
                <div className="absolute inset-0 bg-white/10 dark:bg-[#00FF9F]/20 animate-flicker" />
                
                {/* Lightning Bolt Particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.svg
                    key={`lightning-particle-${i}`}
                    viewBox="0 0 100 100"
                    className="absolute w-24 h-24 text-[#00FF9F] drop-shadow-[0_0_10px_#00FF9F]"
                    style={{
                      left: `${Math.random() * 80}%`,
                      top: `${Math.random() * 80}%`,
                      rotate: `${Math.random() * 360}deg`
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.8],
                    }}
                    transition={{ 
                      duration: 0.2, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 0.5
                    }}
                  >
                    <motion.path
                      d="M50,10 L40,50 L60,40 L50,90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                ))}
              </motion.div>
            )}

            {/* Dynamic Water Dragon Jutsu Ambient Overlay: Atomic Remount with waterCastId */}
            {isWaterCasting && (
              <motion.div
                key={`water-dragon-ambient-${waterCastId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
              >
                {/* Expanding Concentric Hydro Shockwaves */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={`overlay-hydro-wave-${waterCastId}-${i}`}
                    className="absolute rounded-full border border-[#00d2ff]/30 shadow-[0_0_50px_rgba(0,210,255,0.25)]"
                    initial={{ width: "0%", height: "0%", opacity: 0.8 }}
                    animate={{ 
                      width: ["0%", "260%"],
                      height: ["0%", "260%"],
                      opacity: [0.8, 0]
                    }}
                    transition={{ 
                      duration: 2.4, 
                      delay: i * 0.5,
                      ease: "easeOut",
                      repeat: Infinity
                    }}
                  />
                ))}

                {/* Rotating Hydro Dragon Chakra Outer Orbit */}
                <motion.div 
                  initial={{ rotate: 0, scale: 0.85, opacity: 0 }}
                  animate={{ rotate: 360, scale: 1, opacity: 0.25 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ rotate: { duration: 16, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.4 } }}
                  className="absolute w-[170%] h-[170%] rounded-full border border-dashed border-[#00d2ff]/50"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Header */}
          <div className="flex justify-between items-start mb-6 sm:mb-10 relative z-20">
            <div className="space-y-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className={cn(
                  "flex h-1.5 w-1.5 rounded-full transition-all duration-300", 
                  isWaterCasting ? "bg-[#00d2ff] animate-ping" : "bg-[#00FF9F] animate-pulse"
                )} />
                <span className={cn(
                  "font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-colors duration-300",
                  isWaterCasting ? "text-[#00d2ff]" : "text-[#00FF9F]"
                )}>
                  Tactical Feed
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Abubakar Habib</h3>
              <p className="text-[8px] sm:text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">
                Hash: 0x82f..921k | Status: SHINOBI_ACTIVE
              </p>
            </div>
            
            {/* Top Right Corner: Konohagakure Official Clan Pennant (Banner.png) */}
            <div 
              className="relative select-none pt-0.5 pr-0.5 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.75)]"
              title="Konohagakure Clan Pennant (Official Village Insignia)"
            >
              <KonohaBanner size="md" />
            </div>
          </div>

          {/* Profile Section & Avatar Aura */}
          <div className="flex flex-col items-center mb-8 sm:mb-12 relative">
            <div className="relative group/avatar">
              {/* Radial HUD Ring */}
              <div className={cn(
                "absolute -inset-6 sm:-inset-8 rounded-full border transition-colors duration-700 animate-[spin_30s_linear_infinite]",
                isWaterCasting ? "border-[#00d2ff]/40 shadow-[0_0_20px_rgba(0,210,255,0.3)]" : "border-white/5"
              )} />
              <div className={cn(
                "absolute -inset-8 sm:-inset-10 rounded-full border border-dashed transition-colors duration-700 animate-[spin_20s_linear_infinite_reverse]",
                isWaterCasting ? "border-[#00d2ff]/30" : "border-white/5"
              )} />
              
              {/* Glowing Ambient Mist Aura */}
              <div className={cn(
                "absolute -inset-3 sm:-inset-4 rounded-full transition-all duration-700",
                isWaterCasting 
                  ? "bg-[#00d2ff]/20 opacity-60" 
                  : "bg-gradient-to-tr from-[#00FF9F] to-[#00C2FF] opacity-10 group-hover:opacity-30"
              )} />

              {/* Hydro Chakra Mist & Ripple Waves: Atomic Reset with waterCastId */}
              <AnimatePresence mode="wait">
                {isWaterCasting && (
                  <motion.div
                    key={`avatar-ripple-wrapper-${waterCastId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {/* Concentric Hydro Aura Ripples radiating from avatar */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={`avatar-ripple-${waterCastId}-${i}`}
                        initial={{ width: "100%", height: "100%", opacity: 0.8, x: "-50%", y: "-50%" }}
                        animate={{ 
                          width: ["100%", "220%"],
                          height: ["100%", "220%"],
                          opacity: [0.8, 0]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 2.2, 
                          delay: i * 0.65, 
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        className="absolute left-1/2 top-1/2 rounded-full border-2 border-[#00d2ff]/50 shadow-[0_0_30px_rgba(0,210,255,0.4)] pointer-events-none"
                      />
                    ))}

                    {/* Rotating Hydro Dragon Vortex Outer Ring */}
                    <motion.div
                      initial={{ opacity: 0, rotate: 0 }}
                      animate={{ opacity: 1, rotate: 360 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        rotate: { duration: 9, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 0.4 }
                      }}
                      className="absolute -inset-10 sm:-inset-12 rounded-full border border-dashed border-[#00d2ff]/60 shadow-[0_0_25px_rgba(0,210,255,0.35)] pointer-events-none"
                    />

                    {/* Floating Water Droplets around Abubakar Habib Avatar */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`avatar-droplet-${waterCastId}-${i}`}
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] pointer-events-none"
                        style={{
                          left: `${15 + i * 14}%`,
                          top: '60%'
                        }}
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          y: [-8, -48 - (i % 3) * 18],
                          scale: [0.5, 1.3, 0.3]
                        }}
                        transition={{ 
                          duration: 1.8, 
                          delay: i * 0.25, 
                          repeat: Infinity,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Avatar Container */}
              <div className={cn(
                "relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 p-1 bg-[#0B0F19] transition-all duration-500",
                isWaterCasting ? "border-[#00d2ff] shadow-[0_0_35px_rgba(0,210,255,0.6)]" : "border-white/10"
              )}>
                <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative">
                  <img 
                    src={DOSSIER_ASSETS.hero} 
                    alt="Abubakar Habib Shinobi" 
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isWaterCasting 
                        ? "brightness-105 saturate-125 contrast-105" 
                        : "brightness-90 saturate-[0.8] group-hover:saturate-100"
                    )}
                  />
                  {/* Water Dragon Aura shimmer on portrait */}
                  <AnimatePresence>
                    {isWaterCasting && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.15, 0.35, 0.15] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-t from-[#00d2ff]/30 via-transparent to-[#00d2ff]/10 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Top-Right Status Icon: Ninja Kunai Vector Telemetry (Kunai.png) */}
              <div 
                title="Ninja Kunai Telemetry"
                className={cn(
                  "absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center p-2 rounded-lg border backdrop-blur-md transition-all duration-500 z-20 group/kunai",
                  isWaterCasting 
                    ? "bg-[#00d2ff]/20 border-[#00d2ff]/50 shadow-[0_0_20px_rgba(0,210,255,0.4)] text-[#00d2ff]" 
                    : "bg-[#00FF9F]/10 border-[#00FF9F]/20 text-[#00FF9F] hover:border-[#00FF9F]/40 shadow-[0_0_15px_rgba(0,255,159,0.15)]"
                )}
              >
                <NinjaKunaiIcon 
                  className={cn(
                    "w-7 h-7 transition-all duration-300 transform group-hover/kunai:scale-110 group-hover/kunai:-rotate-6",
                    isWaterCasting ? "drop-shadow-[0_0_8px_#00d2ff]" : "drop-shadow-[0_0_6px_rgba(0,255,159,0.35)]"
                  )} 
                  isWaterCasting={isWaterCasting} 
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12 relative z-20">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2 group/stat">
                <div className="flex items-center gap-2 text-white/40">
                  <stat.icon className={cn(
                    "w-3.5 h-3.5 transition-colors",
                    isWaterCasting ? "group-hover/stat:text-[#00d2ff]" : "group-hover/stat:text-[#00FF9F]"
                  )} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-sm font-medium text-white/90 group-hover/stat:text-white transition-colors uppercase tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Nature Types (ELEMENTAL CACHE) */}
          <div className="space-y-4 mb-12 relative z-20">
            <div className="flex items-center gap-2">
              <Database className={cn("w-3 h-3 font-mono transition-colors", isWaterCasting ? "text-[#00d2ff]" : "text-white/40")} />
              <span className={cn(
                "text-[10px] font-mono uppercase tracking-widest transition-colors",
                isWaterCasting ? "text-[#00d2ff]/80" : "text-white/40"
              )}>
                Elemental Cache
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {natureTypes.map((type, i) => {
                const isWater = type.name === "Water Release";
                const isWaterButtonActive = isWater && isWaterCasting;

                return (
                  <button 
                    key={i} 
                    type="button"
                    id={isWater ? "elemental-cache-water-release-btn" : `elemental-cache-btn-${i}`}
                    onClick={() => handleNatureClick(type.name, type.onAction)}
                    aria-busy={isWaterButtonActive}
                    aria-label={isWater ? (isWaterButtonActive ? "Water Dragon Jutsu is active (click to restart)" : "Activate Water Release") : type.name}
                    className={cn(
                      "group relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border text-[10px] font-mono uppercase font-semibold transition-all duration-300 cursor-pointer select-none",
                      isWaterButtonActive 
                        ? "border-[#00d2ff] bg-[#00d2ff]/15 text-white shadow-[0_0_25px_rgba(0,210,255,0.5)]" 
                        : (activeNature === type.name 
                            ? cn("border-white/40 bg-white/10 text-white", type.glowColor) 
                            : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/25 hover:text-white"
                          )
                    )}
                  >
                    {/* Elemental Icon */}
                    <type.icon 
                      className={cn(
                        "w-3.5 h-3.5 shrink-0 transition-all duration-300", 
                        isWaterButtonActive 
                          ? "scale-110 text-[#00d2ff] drop-shadow-[0_0_8px_#00d2ff]" 
                          : (activeNature === type.name ? "scale-110" : ""),
                        !isWaterButtonActive && type.color
                      )} 
                    />
                    
                    {/* Button Text */}
                    <span className={cn(
                      "tracking-wider whitespace-nowrap transition-colors duration-300",
                      isWaterButtonActive && "text-white font-bold drop-shadow-[0_0_8px_rgba(0,210,255,0.7)]"
                    )}>
                      {type.name}
                    </span>

                    {/* Primary Badge for Lightning */}
                    {type.isPrimary && (
                      <span className="shrink-0 text-[8px] px-1.5 py-0.5 rounded bg-[#00FF9F]/10 text-[#00FF9F] border border-[#00FF9F]/20 uppercase tracking-tighter">
                        Prime
                      </span>
                    )}

                    {/* Dynamic Casting Status Badge for Water Dragon Jutsu with Smooth Width and Fade */}
                    <AnimatePresence>
                      {isWaterButtonActive && (
                        <motion.span
                          key="water-casting-badge"
                          initial={{ opacity: 0, scale: 0.8, width: 0 }}
                          animate={{ opacity: 1, scale: 1, width: "auto" }}
                          exit={{ opacity: 0, scale: 0.8, width: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="inline-flex items-center gap-1.5 text-[8px] px-2 py-0.5 rounded-full bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 font-mono tracking-widest font-bold overflow-hidden whitespace-nowrap shrink-0"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping shrink-0" />
                          CASTING
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Section */}
          <div className={cn(
            "space-y-6 relative z-20 p-6 rounded-[1.5rem] border transition-all duration-500",
            isWaterCasting ? "bg-[#00d2ff]/5 border-[#00d2ff]/20" : "bg-white/5 border-white/5"
          )}>
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Exp Threshold</span>
                <p className="text-xs font-bold text-white tracking-[0.2em] uppercase">Limit Burst // Ascension</p>
              </div>
              <span className={cn(
                "text-xs font-mono transition-colors",
                isWaterCasting ? "text-[#00d2ff]" : "text-[#00FF9F]"
              )}>
                {Math.round(progress)}%
              </span>
            </div>
            
            <ProgressBar progress={progress} isLevelingUp={isLevelingUp} />

            <button
              onClick={handleLevelUp}
              disabled={isLevelingUp}
              className={cn(
                "w-full py-4 rounded-xl font-display font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 relative overflow-hidden group/levelup",
                isLevelingUp 
                  ? "bg-[#00FF9F]/20 text-[#00FF9F] cursor-default" 
                  : (isWaterCasting 
                      ? "bg-[#00d2ff] text-[#0B0F19] hover:bg-white hover:shadow-[0_0_30px_rgba(0,210,255,0.4)]"
                      : "bg-white text-[#0B0F19] hover:bg-[#00FF9F] hover:shadow-[0_0_30px_rgba(0,255,159,0.3)]"
                    )
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLevelingUp ? "Ascending..." : "Initiate Level Up"}
                {!isLevelingUp && <ChevronRight className="w-4 h-4 transition-transform group-hover/levelup:translate-x-1" />}
              </span>
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/levelup:animate-shine" />
            </button>
          </div>

          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
        </motion.div>
      </Tilt>
    </div>
  );
};
