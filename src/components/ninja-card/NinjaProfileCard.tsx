import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Tilt from 'react-parallax-tilt';
import { Shield, Zap, Droplets, Eye, Scroll, Target, Award, Activity, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressBar } from './ProgressBar';
import { SharinganEffect } from './SharinganEffect';
import { useNinjaSound } from './useNinjaSound';
import { ParticleBackground } from './ParticleBackground';

interface NinjaProfileCardProps {
  className?: string;
}

export const NinjaProfileCard: React.FC<NinjaProfileCardProps> = ({ className }) => {
  const [progress, setProgress] = useState(65);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const { playLevelUp, playHover, playSharingan } = useNinjaSound();

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
    { name: "Lightning Release", icon: Zap, color: "text-[#00FF9F]", isPrimary: true },
    { name: "Water Release", icon: Droplets, color: "text-[#00C2FF]", isPrimary: false },
  ], []);

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
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        transitionSpeed={1500}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseEnter={playHover}
          className={cn(
            "relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl p-8 md:p-10 transition-all duration-500 hover:border-[#00FF9F]/30 shadow-2xl",
          )}
        >
          {/* Top Header */}
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-[#00FF9F] animate-pulse" />
                <span className="text-[#00FF9F] font-mono text-[10px] uppercase tracking-[0.4em]">Active Status</span>
              </div>
              <h3 className="text-3xl font-display font-bold text-white tracking-tight">Abubakar Habib</h3>
              <p className="text-xs text-white/40 font-mono uppercase tracking-widest">ID: SHINOBI-012607</p>
            </div>
            
            <button 
              onClick={() => window.open('/ninja-profile', '_blank')}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00FF9F]/40 transition-all group/btn"
              title="Open Full Profile"
            >
              <ExternalLink className="w-4 h-4 text-white/60 group-hover/btn:text-[#00FF9F] transition-colors" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              {/* Glowing Border */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#00FF9F] to-[#00C2FF] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700" />
              
              <div className="relative w-32 h-32 rounded-full border-2 border-white/10 p-1 bg-[#0B0F19]">
                <div className="w-full h-full rounded-full overflow-hidden bg-white/5 relative">
                  <img 
                    src="/input_file_0.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Sharingan Effect Layer */}
                  <SharinganEffect onActivate={playSharingan} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 text-white/40">
                  <stat.icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-sm font-medium text-white/90">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Nature Types */}
          <div className="space-y-4 mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Nature Transformation</span>
            <div className="flex flex-wrap gap-3">
              {natureTypes.map((type, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 transition-all hover:border-white/20"
                >
                  <type.icon className={cn("w-3.5 h-3.5", type.color)} />
                  {type.name}
                  {type.isPrimary && <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#00FF9F]/10 text-[#00FF9F] uppercase tracking-tighter">Primary</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Next Milestone</span>
                <p className="text-sm font-bold text-white tracking-wide">ANBU Level Integration</p>
              </div>
              <span className="text-xs font-mono text-[#00FF9F]">{Math.round(progress)}%</span>
            </div>
            
            <ProgressBar progress={progress} isLevelingUp={isLevelingUp} />

            <button
              onClick={handleLevelUp}
              disabled={isLevelingUp}
              className={cn(
                "w-full py-4 rounded-2xl font-display font-bold text-sm tracking-widest uppercase transition-all duration-500 relative overflow-hidden group/levelup",
                isLevelingUp 
                  ? "bg-[#00FF9F]/20 text-[#00FF9F] cursor-default" 
                  : "bg-white text-[#0B0F19] hover:bg-[#00FF9F] hover:shadow-[0_0_30px_rgba(0,255,159,0.3)]"
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLevelingUp ? "Ascending..." : "Level Up"}
                {!isLevelingUp && <ChevronRight className="w-4 h-4 transition-transform group-hover/levelup:translate-x-1" />}
              </span>
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/levelup:animate-shine" />
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.02] pointer-events-none">
            <Target className="w-64 h-64 text-white" />
          </div>
        </motion.div>
      </Tilt>
    </div>
  );
};
