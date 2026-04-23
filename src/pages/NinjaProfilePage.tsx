import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { NinjaProfileCard } from '@/components/ninja-card/NinjaProfileCard';
import { ChevronLeft, Share2, Award, Zap, Shield, Target, Scroll as ScrollIcon, Terminal, Activity, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSound } from '@/components/SoundProvider';
import { Volume2, VolumeX } from 'lucide-react';
import { DOSSIER_ASSETS, STORY_SECTIONS, MANGA_CALLOUTS } from '@/constants/dossierData';
import { cn } from '@/lib/utils';
import { SHINOBI_IMAGES } from '@/constants/assetRegistry';

export const NinjaProfilePage: React.FC = () => {
  const { isMuted, toggleMute, playExport } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Mouse Parallax for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 50);
    mouseY.set((clientY / innerHeight - 0.5) * 50);
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    playExport();
    // Mock download delay
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 1500);
  };

  const scrollToDossier = () => {
    document.getElementById('dossier-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-[#00FF9F]/30 selection:text-[#00FF9F] overflow-x-hidden"
    >
      {/* Cinematic Background Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-[#00FF9F]/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-[#00C2FF]/5 blur-[150px] translate-y-1/2 pointer-events-none" />

      {/* Global Ambient Accents */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03] bg-[radial-gradient(#00FF9F_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating Tactical Labels */}
      <div className="fixed inset-0 pointer-events-none z-[55] overflow-hidden select-none">
        <div className="absolute top-1/4 left-10 text-[8px] font-mono text-white/10 [writing-mode:vertical-lr] uppercase tracking-[0.5em]">SYSTEM_ARCH_LOG</div>
        <div className="absolute top-1/2 right-4 text-[8px] font-mono text-white/5 [writing-mode:vertical-lr] uppercase tracking-[0.5em]">K BUREAU_SHADOW</div>
        <div className="absolute bottom-[10%] left-10 text-[8px] font-mono text-white/10 [writing-mode:vertical-lr] uppercase tracking-[0.5em]">ARCHIVE_SEAL_LOCKED</div>
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl z-[60]">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 text-white/40 hover:text-[#00FF9F] transition-all group"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#00FF9F]/30 transition-colors">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] hidden sm:block">Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMute}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/40 hover:text-[#00FF9F]"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Share2 className="w-4 h-4 text-white/40" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00FF9F]/10 border border-[#00FF9F]/20">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#00FF9F]">Online</span>
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <motion.div 
          style={{ scaleX: smoothProgress }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF9F] to-transparent origin-left"
        />
      </nav>

      {/* 1. Hero Dossier Entry */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020617]/50 z-20 pointer-events-none" />

          <motion.video 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2 }}
            autoPlay
            loop
            muted
            playsInline
            src={DOSSIER_ASSETS.backgroundVideo}
            className="absolute inset-0 w-full h-full object-cover grayscale z-10"
          />
          {/* Fallback image if video fails or while loading */}
          <div className="absolute inset-0 bg-[#020617] -z-10" />
        </div>

        <div className="relative z-10 w-full max-w-5xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <div className="relative p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group cursor-help">
              <div className="absolute -inset-4 rounded-full bg-[#00FF9F]/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#00FF9F]/40 shadow-[0_0_30px_rgba(0,255,159,0.1)]">
                <img src={DOSSIER_ASSETS.hero} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="absolute -bottom-2 right-0 p-2 rounded-lg bg-[#020617] border border-white/10 text-[#00FF9F]">
                <Shield className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#00FF9F]/5 border border-[#00FF9F]/10 text-[#00FF9F] text-[10px] font-mono uppercase tracking-[0.3em]"
            >
              <Target className="w-3 h-3" />
              Classification: TOP SECRET // JŌNIN-LEVEL ACCESS
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter"
            >
              Abubakar <span className="text-white/20">Habib</span>
            </motion.h1>
            
            <div className="relative inline-block">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-2xl mx-auto text-white/40 text-xs sm:text-sm font-mono tracking-widest uppercase leading-relaxed"
              >
                A deep-dive into the technical archive of a digital strategist, specializing in system architectures and interface jutsu.
              </motion.p>
            </div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex flex-wrap justify-center gap-4 pt-6"
            >
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="group relative px-6 py-3 rounded-xl bg-white text-[#020617] font-display font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-[#00FF9F] hover:shadow-[0_0_30px_rgba(0,255,159,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#020617] border-t-transparent rounded-full animate-spin" />
                      Encrypting...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Export Scroll
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />
              </button>
              <button 
                onClick={scrollToDossier}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-display font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-2 active:scale-95"
              >
                <Activity className="w-4 h-4" />
                Live Vitals
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-12"
          >
            <div className="flex flex-col items-center gap-4 text-white/20">
              <span className="text-[10px] font-mono uppercase tracking-widest animate-pulse">Initiating scroll sync...</span>
              <div className="w-px h-16 bg-gradient-to-b from-[#00FF9F] to-transparent animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1.5 Energetic Marquee Section */}
      <div className="relative py-8 bg-[#00FF9F] overflow-hidden border-y-4 border-black rotate-1 sm:rotate-2 scale-105 z-40">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8 flex-shrink-0">
              <span className="text-4xl sm:text-6xl font-display font-black text-[#020617] uppercase italic">"Believe it!" //</span>
              <span className="text-2xl sm:text-4xl font-display font-bold text-[#020617] uppercase italic">Hard work is worthless for those that don't believe in themselves //</span>
              <span className="text-4xl sm:text-6xl font-display font-black text-[#020617] uppercase italic">The Road to Mastery Never Ends: Habib_Architect_Shinobi //</span>
              <span className="text-4xl sm:text-6xl font-display font-black text-transparent stroke-black uppercase italic" style={{ WebkitTextStroke: '2px #020617' }}>Full-Stack_Shinobi // System_Architect //</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Tactical Profile (The Card) */}
      <section id="dossier-section" className="relative py-24 px-6 overflow-hidden">
        {/* Reimagined Background Ornaments (Post-Video Context) */}
        <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
          <motion.img 
            initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
            whileInView={{ opacity: 0.3, rotate: -5, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={DOSSIER_ASSETS.ornaments.itachiSasuke}
            className="absolute left-0 top-0 w-[400px] lg:w-[600px] grayscale opacity-40 translate-x-[-10%] translate-y-[10%]"
          />
          <motion.img 
            initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
            whileInView={{ opacity: 0.25, rotate: 5, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            src={DOSSIER_ASSETS.ornaments.narutoSuit}
            className="absolute right-0 bottom-0 w-[400px] lg:w-[500px] grayscale opacity-40 translate-x-[10%] translate-y-[-10%]"
          />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-mono uppercase tracking-widest text-white/40">
                <Shield className="w-2 h-2" />
                Active_Dossier_Link
              </div>
              <h2 className="group relative text-5xl sm:text-7xl font-display font-black text-white tracking-widest uppercase italic -skew-x-12">
                The <span className="text-[#00FF9F]">Dossier</span>
              </h2>
              <div className="h-1 w-48 bg-[#00FF9F] shadow-[0_0_10px_#00FF9F]" />
            </div>
            
            <p className="text-slate-400 font-mono text-sm leading-loose">
              Operating out of the Shadow Leaf network, this operative has mastered the art of high-concurrency systems and fluid interface transformations. 
              Known for precision in complex data extractions and the tactical application of modern frontend frameworks.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Village", value: "Konohagakure", icon: Shield },
                { label: "Rank", value: "Early Jōnin", icon: Award },
                { label: "Specialization", value: "System Architecture", icon: Target },
                { label: "Affinities", value: "Lightning / Water", icon: Zap },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 group hover:border-[#00FF9F]/30 transition-all">
                  <div className="flex items-center gap-2 text-white/40">
                    <item.icon className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-mono uppercase tracking-widest">{item.label}</span>
                  </div>
                  <p className="text-xs font-bold text-white uppercase tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <NinjaProfileCard className="w-full max-w-xl" />
          </div>
        </div>
      </section>

      {/* 2.5 Latest Directives (Official Site News Vibes) */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#020617]">
        {/* Bottom-Right Background Ornament */}
        <motion.img 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          whileInView={{ opacity: 0.25, scale: 1.1, x: 0 }}
          transition={{ duration: 1.5 }}
          src={SHINOBI_IMAGES.sections.special}
          className="absolute -right-20 bottom-0 w-[500px] lg:w-[700px] grayscale pointer-events-none opacity-60"
        />

        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b-4 border-[#00FF9F] pb-8">
            <div className="space-y-2">
              <span className="text-[#00FF9F] font-mono text-xs uppercase tracking-[0.5em]">// ARCHIVE_UPDATES</span>
              <h2 className="text-4xl sm:text-7xl font-display font-black text-white uppercase italic -skew-x-6 leading-none">Latest <br /> <span className="text-white/20">Directives</span></h2>
            </div>
            <div className="flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg border border-white/10 italic">
              <Activity className="w-3 h-3 text-[#00FF9F] animate-pulse" />
              Real-time_Sync_Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 sm:mt-24">
            {[
              { id: "01", title: "Project Phoenix Launch", category: "S-RANK", date: "20.APR.26", desc: "Initiating the next generation of cloud-based jutsu protocols." },
              { id: "02", title: "State Fluidity Patch", category: "TECHNICAL", date: "18.APR.26", desc: "Optimizing the chakra flow across multi-region data nodes." },
              { id: "03", title: "Village Security Audit", category: "SECURITY", date: "15.APR.26", desc: "Strengthening the perimeter seals against unauthorized chakra leaks." },
            ].map((directive, i) => (
              <motion.div
                key={directive.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-full flex flex-col p-8 bg-white/5 border-2 border-white/5 hover:border-[#00FF9F] transition-all duration-500 rounded-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 font-display font-black text-6xl text-white/5 group-hover:text-[#00FF9F]/10 transition-colors uppercase italic -skew-x-12">{directive.id}</div>
                <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-[#00FF9F]/10 border border-[#00FF9F]/20 text-[8px] font-mono text-[#00FF9F] tracking-[0.2em]">{directive.category}</span>
                    <span className="text-[10px] font-mono text-white/20">{directive.date}</span>
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white uppercase leading-tight group-hover:text-[#00FF9F] transition-colors">{directive.title}</h4>
                  <p className="text-xs text-white/40 font-mono leading-relaxed flex-1">{directive.desc}</p>
                  <button className="flex items-center gap-2 text-[#00FF9F] text-[9px] font-mono uppercase tracking-[0.3em] pt-4 group-hover:translate-x-2 transition-transform italic">
                    [ Read_Scroll ]
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(#00FF9F_1px,transparent_1px)] bg-[size:10px_10px] opacity-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Narrative Chronicles (Interactive Story) */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-32">
          {STORY_SECTIONS.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col gap-12 items-center",
                index % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              )}
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="px-2 py-0.5 rounded bg-[#00FF9F]/10 border border-[#00FF9F]/20 text-[8px] font-mono text-[#00FF9F] tracking-[0.2em]">
                    {section.label}
                  </div>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white/10">0{index + 1}</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-4xl sm:text-6xl font-display font-black text-white uppercase tracking-tighter italic -skew-x-6">{section.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {section.tags?.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-[#00FF9F] tracking-widest uppercase">#{tag}</span>
                    ))}
                  </div>
                </div>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-mono">
                  {section.content}
                </p>
                
                {section.types && (
                  <div className="grid grid-cols-1 gap-4 pt-4">
                    {section.types.map((type, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                          <span className="text-white/60">{type.element}</span>
                          <span className="text-[#00FF9F]">{type.skill}</span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${type.level}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="h-full bg-gradient-to-r from-[#00FF9F] to-[#00C2FF]" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.missions && (
                  <div className="space-y-4 pt-4">
                    {section.missions.map((m, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-xs font-bold text-white group-hover:text-[#00FF9F] transition-colors">{m.title}</h5>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">{m.rank}</span>
                        </div>
                        <p className="text-[10px] text-white/40 leading-normal">{m.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex-1 w-full flex justify-center">
                <motion.div 
                  initial={{ rotate: 10 }}
                  whileInView={{ rotate: index % 2 === 0 ? 3 : -3 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-4 rounded-3xl bg-[#00FF9F]/5 blur-2xl pointer-events-none group-hover:bg-[#00FF9F]/10 transition-colors" />
                  <div className="relative w-full max-w-sm aspect-square p-2 rounded-[2rem] border border-white/10 bg-white/5 hover:border-[#00FF9F]/30 transition-all duration-700">
                    <img 
                      src={section.image} 
                      className="w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale group-hover:grayscale-0 transition-all duration-700" 
                      alt={section.title}
                    />
                    {/* Tactical UI elements */}
                    <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/5 group-hover:border-[#00FF9F]/40 transition-colors">
                      <Terminal className="w-4 h-4 text-[#00FF9F]" />
                    </div>
                    
                    {/* Floating Manga Tag */}
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -bottom-4 -left-4 px-3 py-1 bg-[#020617] border border-[#00FF9F]/20 rounded-lg shadow-xl"
                    >
                      <span className="text-[7px] font-mono text-[#00FF9F] uppercase tracking-tighter">DATA_{section.id.toUpperCase()}</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3.5 Character Quote Section (Official Site Punchiness) */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF9F]/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-8 bg-[#00FF9F]/20 blur-3xl rounded-full animate-pulse" />
            <ScrollIcon className="w-16 h-16 text-[#00FF9F] relative z-10" />
          </motion.div>
          
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-7xl font-display font-black text-white leading-none uppercase italic">
              "It's not about the <br />
              <span className="text-[#00FF9F]">jutsu you know</span>,<br />
              but how you <span className="text-white/20">scale it</span>."
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#00FF9F]/20" />
              <span className="text-xs font-mono text-white/40 uppercase tracking-[0.5em]">The Unwritten Scroll // Vol. 82</span>
              <div className="h-px w-12 bg-[#00FF9F]/20" />
            </div>
          </div>
        </div>
        
        {/* Background Accent Ornament */}
        <motion.img 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.08 }}
          src={SHINOBI_IMAGES.ornaments.ornament5}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-64 lg:w-96 grayscale pointer-events-none"
        />
      </section>

      {/* 4. The Alliance Corridor (Supporting Characters) */}
      <section className="relative py-24 px-6 bg-[#020617]/50 border-y border-white/5 overflow-hidden">
        {/* Background Accent Image */}
        <div className="absolute inset-0 z-0 opacity-[0.03] grayscale pointer-events-none overflow-hidden">
          <img src={SHINOBI_IMAGES.sections.news} className="w-full h-full object-cover" />
          {/* Subtle Side Ornament to add character without overlap */}
          <motion.img 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 0.05, x: 0 }}
            src={SHINOBI_IMAGES.ornaments.ornament2}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] grayscale"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <motion.img 
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              src={SHINOBI_IMAGES.ornaments.ornament5}
              className="w-32 mx-auto opacity-40 grayscale border-2 border-[#00FF9F]/30 rounded-full p-4 bg-[#020617] shadow-[0_0_30px_rgba(0,255,159,0.2)]"
            />
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-7xl font-display font-black text-white uppercase tracking-tighter italic -skew-x-12">Elite Alliances</h2>
              <div className="flex justify-center gap-3">
                <div className="h-1.5 w-16 bg-[#00FF9F]" />
                <div className="h-1.5 w-16 bg-white/20" />
                <div className="h-1.5 w-16 bg-[#00C2FF]" />
              </div>
            </div>
            <p className="text-white/60 font-mono text-xs uppercase tracking-[0.5em] max-w-2xl mx-auto">Mastery through high-rank collaboration across the five Great Tech Villages</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.entries(DOSSIER_ASSETS.alliances).slice(0, 20).map(([name, url], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden grayscale hover:grayscale-0 border-2 border-white/5 group-hover:border-[#00FF9F] transition-all duration-500 shadow-2xl relative">
                  <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={name} />
                  
                  {/* Squad ID Overlay */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-md rounded border border-white/10 text-[7px] font-mono text-white/50 group-hover:text-[#00FF9F] transition-colors">
                    SQUAD_ID_{i + 1}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:text-white transition-colors truncate">{name}</p>
                    <div className="h-0.5 w-0 group-hover:w-full bg-[#00FF9F] transition-all duration-500 mt-1" />
                  </div>
                </div>
                
                {/* Decorative UI nodes on hover */}
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#00FF9F] opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-[0_0_10px_#00FF9F]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00FF9F] opacity-0 group-hover:opacity-100 transition-opacity rounded-full shadow-[0_0_10px_#00FF9F]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer / Final Dossier Seal (REIMAGINED) */}
      <footer className="relative py-48 px-6 text-center bg-[#02030a] overflow-hidden border-t-2 border-white/5">
        {/* Exploding Background Seals for Footer */}
        <div className="absolute inset-x-0 top-0 h-full flex items-center justify-center pointer-events-none">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
            whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
            src={SHINOBI_IMAGES.ornaments.ornament3}
            className="absolute left-5 bottom-5 w-[300px] sm:w-[350px] lg:w-[400px] grayscale transition-all duration-700"
          />
          <motion.img 
            initial={{ opacity: 0, scale: 0.9, rotate: 15 }}
            whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
            src={SHINOBI_IMAGES.ornaments.ornament1}
            className="absolute right-5 top-5 w-[300px] sm:w-[350px] lg:w-[400px] grayscale transition-all duration-700"
          />
        </div>

        <div className="max-w-xl mx-auto space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-10"
          >
            <div className="relative group">
              <div className="absolute -inset-16 bg-[#00FF9F]/20 blur-3xl rounded-full animate-pulse group-hover:bg-[#00FF9F]/30 transition-colors" />
              
              {/* Outer Circular Tech Border */}
              <div className="relative p-12 sm:p-16 rounded-full border-2 border-dashed border-[#00FF9F]/40 animate-[spin_30s_linear_infinite]">
                 <div className="absolute inset-0 border-2 border-[#00FF9F]/10 rounded-full scale-125" />
              </div>
              
              {/* Inner Logo Seal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 rounded-full bg-[#020617] border border-[#00FF9F] shadow-[0_0_50px_rgba(0,255,159,0.3)]">
                  <Activity className="w-12 h-12 text-[#00FF9F]" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-4xl sm:text-6xl font-display font-black text-white tracking-[0.2em] uppercase italic -skew-x-12">
                Archive <span className="text-white/20">Locked</span>
              </h3>
              
              <div className="space-y-2 py-6 border-y border-white/5">
                <p className="text-[#00FF9F] font-mono text-[10px] uppercase tracking-[0.5em] italic">Access State: Encrypted_Final_Seal</p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/40 font-mono text-[9px] uppercase tracking-widest leading-loose">
                  <span>Operative: Abubakar Habib</span>
                  <span className="text-[#00FF9F]">Access Token: VALID_NODE</span>
                  <span>Last Update: {new Date().toLocaleDateString()}</span>
                  <span>Bureau: Konoha Intelligence</span>
                </div>
              </div>
            </div>

            <Link 
              to="/"
              className="group relative inline-flex items-center gap-4 px-10 py-4 bg-white/5 border border-white/10 rounded-full transition-all hover:bg-[#00FF9F]/10 hover:border-[#00FF9F]/30"
            >
              <div className="absolute inset-0 bg-[#00FF9F]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-xl" />
              <span className="text-[#00FF9F] text-sm font-mono font-bold uppercase tracking-[0.4em]">
                [ Close Dossier ]
              </span>
              <div className="w-8 h-px bg-gradient-to-r from-[#00FF9F] to-transparent group-hover:w-12 transition-all" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom decorative bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00FF9F]/40 to-transparent" />
      </footer>
    </div>
  );
};
