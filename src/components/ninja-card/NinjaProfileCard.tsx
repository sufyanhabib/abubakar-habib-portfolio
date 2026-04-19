import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import { Shield, Zap, Droplets, Eye, Scroll, Target, Award, Activity, ChevronRight, ExternalLink, Box, Terminal, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from './ProgressBar';
import { SharinganEffect } from './SharinganEffect';
import { useNinjaSound } from './useNinjaSound';
import { ParticleBackground } from './ParticleBackground';
import { DOSSIER_ASSETS } from '@/constants/dossierData';

interface NinjaProfileCardProps {
  className?: string;
}

export const NinjaProfileCard: React.FC<NinjaProfileCardProps> = ({ className }) => {
  const [progress, setProgress] = useState(65);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [activeNature, setActiveNature] = useState<string | null>(null);
  const { playLevelUp, playHover, playSharingan, playLightning, playWater } = useNinjaSound();

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
    { label: "Village", value: "Konohagakure", icon: Shield },
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
      onAction: playWater,
      glowColor: "group-hover:shadow-[0_0_20px_rgba(0,194,255,0.4)]"
    },
  ], [playLightning, playWater]);

  const handleNatureClick = (name: string, action: () => void) => {
    setActiveNature(name);
    action();
    setTimeout(() => setActiveNature(null), 1000);
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Particle Background Layer */}
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none z-0">
        <ParticleBackground />
      </div>

      <Tilt
        perspective={1200}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="2.5rem"
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        transitionSpeed={1500}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseEnter={playHover}
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0B0F19]/90 backdrop-blur-3xl p-8 md:p-10 transition-all duration-500 hover:border-[#00FF9F]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
            activeNature === "Lightning Release" && "animate-shake border-[#00FF9F]/50"
          )}
        >
          {/* Intense Elementaljutsu Overlays */}
          <AnimatePresence>
            {activeNature === "Lightning Release" && (
              <motion.div
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
                    key={i}
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

            {activeNature === "Water Release" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
              >
                {/* Expanding Ripples */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-[#00C2FF]/30 shadow-[0_0_40px_rgba(0,194,255,0.2)]"
                    initial={{ width: 0, height: 0, opacity: 0.6 }}
                    animate={{ 
                      width: ["0%", "200%"],
                      height: ["0%", "200%"],
                      opacity: [0.6, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: i * 0.3,
                      ease: "easeOut",
                      repeat: Infinity
                    }}
                  />
                ))}
                {/* Submerged Filter Effect */}
                <div className="absolute inset-0 bg-[#00C2FF]/5 backdrop-blur-[1px]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tactical HUD Overlay Elements */}
          <div className="absolute top-0 right-0 p-8 flex flex-col gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-1 h-3 bg-[#00FF9F]" />
              ))}
            </div>
            <div className="h-[2px] w-12 bg-[#00FF9F]" />
          </div>

          {/* Top Header */}
          <div className="flex justify-between items-start mb-10 relative z-20">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-[#00FF9F] animate-pulse" />
                <span className="text-[#00FF9F] font-mono text-[10px] uppercase tracking-[0.4em]">Tactical Feed</span>
              </div>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">Abubakar Habib</h3>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">Hash: 0x82f..921k | Status: SHINOBI_ACTIVE</p>
            </div>
            
            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00FF9F]/40 transition-all group/btn">
              <Terminal className="w-4 h-4 text-white/60 group-hover/btn:text-[#00FF9F] transition-colors" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12 relative">
            <div className="relative group/avatar">
              {/* Radial HUD Ring */}
              <div className="absolute -inset-8 rounded-full border border-white/5 animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-10 rounded-full border border-dashed border-white/5 animate-[spin_20s_linear_infinite_reverse]" />
              
              {/* Glowing Border */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#00FF9F] to-[#00C2FF] opacity-10 blur-xl group-hover:opacity-30 transition-opacity duration-700" />
              
              <div className="relative w-40 h-40 rounded-full border-2 border-white/10 p-1 bg-[#0B0F19]">
                <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative">
                  <img 
                    src={DOSSIER_ASSETS.hero} 
                    alt="Abubakar Habib Shinobi" 
                    className="w-full h-full object-cover transition-all duration-700 brightness-90 saturate-[0.8] group-hover:saturate-100"
                  />
                  {/* Official Site Style Stamp */}
                  <div className="absolute top-2 left-2 rotate-[-15deg] opacity-60 pointer-events-none z-20">
                    <div className="px-2 py-0.5 border-2 border-[#00FF9F] text-[#00FF9F] font-display font-black text-[10px] uppercase italic bg-[#020617]/40 backdrop-blur-sm">VERIFIED</div>
                  </div>
                  {/* Sharingan Effect Layer */}
                  <SharinganEffect onActivate={playSharingan} />
                </div>
              </div>

              {/* HUD Markers */}
              <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center p-2 rounded-lg bg-[#00FF9F]/10 border border-[#00FF9F]/20 backdrop-blur-md">
                <Box className="w-5 h-5 text-[#00FF9F]" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12 relative z-20">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2 group/stat">
                <div className="flex items-center gap-2 text-white/40">
                  <stat.icon className="w-3.5 h-3.5 group-hover/stat:text-[#00FF9F] transition-colors" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-sm font-medium text-white/90 group-hover/stat:text-white transition-colors uppercase tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Nature Types */}
          <div className="space-y-4 mb-12 relative z-20">
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-white/40 font-mono" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Elemental Cache</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {natureTypes.map((type, i) => (
                <motion.button 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNatureClick(type.name, type.onAction)}
                  className={cn(
                    "group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono uppercase font-medium text-white/80 transition-all hover:bg-white/10 overflow-hidden",
                    activeNature === type.name ? cn("border-white/40", type.glowColor) : "hover:border-white/20"
                  )}
                >
                  <type.icon className={cn("w-3.5 h-3.5 relative z-10 transition-transform duration-500", activeNature === type.name && "scale-125", type.color)} />
                  <span className="relative z-10">{type.name}</span>
                  {type.isPrimary && <span className="relative z-10 text-[8px] px-1.5 py-0.5 rounded bg-[#00FF9F]/10 text-[#00FF9F] border border-[#00FF9F]/20 uppercase tracking-tighter">Prime</span>}
                  
                  {/* Elemental Animation Layer */}
                  <AnimatePresence>
                    {activeNature === type.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.15, scale: 2 }}
                        exit={{ opacity: 0 }}
                        className={cn("absolute inset-0 rounded-full", i === 0 ? "bg-[#00FF9F]" : "bg-[#00C2FF]")}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-6 relative z-20 bg-white/5 p-6 rounded-[1.5rem] border border-white/5">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Exp Threshold</span>
                <p className="text-xs font-bold text-white tracking-[0.2em] uppercase">Limit Burst // Ascension</p>
              </div>
              <span className="text-xs font-mono text-[#00FF9F]">{Math.round(progress)}%</span>
            </div>
            
            <ProgressBar progress={progress} isLevelingUp={isLevelingUp} />

            <button
              onClick={handleLevelUp}
              disabled={isLevelingUp}
              className={cn(
                "w-full py-4 rounded-xl font-display font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 relative overflow-hidden group/levelup",
                isLevelingUp 
                  ? "bg-[#00FF9F]/20 text-[#00FF9F] cursor-default" 
                  : "bg-white text-[#0B0F19] hover:bg-[#00FF9F] hover:shadow-[0_0_30px_rgba(0,255,159,0.3)]"
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
