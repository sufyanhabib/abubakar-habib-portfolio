import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { NinjaProfileCard } from '@/components/ninja-card/NinjaProfileCard';
import { ChevronLeft, Share2, Award, Zap, Shield, Target, Scroll as ScrollIcon, Terminal, Activity, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSound } from '@/components/SoundProvider';
import { Volume2, VolumeX } from 'lucide-react';
import { DOSSIER_ASSETS, STORY_SECTIONS } from '@/constants/dossierData';
import { cn } from '@/lib/utils';

export const NinjaProfilePage: React.FC = () => {
  const { isMuted, toggleMute, playExport } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

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
    <div ref={containerRef} className="min-h-screen bg-[#020617] text-slate-100 selection:bg-[#00FF9F]/30 selection:text-[#00FF9F] overflow-x-hidden">
      {/* Cinematic Background Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-[#00FF9F]/5 blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-[#00C2FF]/5 blur-[150px] translate-y-1/2 pointer-events-none" />

      {/* Floating Ornaments (Manga Accents) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.img 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          src={DOSSIER_ASSETS.ornaments.kakashiReading}
          className="absolute -left-20 top-[20%] w-64 opacity-[0.03] grayscale -rotate-12"
        />
        <motion.img 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
          src={DOSSIER_ASSETS.ornaments.narutoSuit}
          className="absolute -right-20 top-[40%] w-72 opacity-[0.03] grayscale rotate-12"
        />
        <motion.img 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          src={DOSSIER_ASSETS.ornaments.itachiSasuke}
          className="absolute left-[10%] bottom-[10%] w-80 opacity-[0.02] grayscale"
        />
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
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto text-white/40 text-xs sm:text-sm font-mono tracking-widest uppercase leading-relaxed"
            >
              A deep-dive into the technical archive of a digital strategist, specializing in system architectures and interface jutsu.
            </motion.p>
            
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

      {/* 2. Tactical Profile (The Card) */}
      <section id="dossier-section" className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-widest uppercase">
                The <span className="text-[#00FF9F]">Dossier</span>
              </h2>
              <div className="h-px w-32 bg-gradient-to-r from-[#00FF9F] to-transparent" />
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
                  <span className="text-3xl sm:text-4xl font-display font-bold text-white/20">0{index + 1}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h3 className="text-3xl sm:text-5xl font-display font-bold text-white">{section.title}</h3>
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
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-[#00FF9F]/5 blur-2xl pointer-events-none" />
                  <div className="relative w-full max-w-sm aspect-square p-2 rounded-[2rem] border border-white/10 bg-white/5 rotate-3 hover:rotate-0 transition-transform duration-700">
                    <img 
                      src={section.image} 
                      className="w-full h-full object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                      alt={section.title}
                    />
                    {/* Tactical UI elements */}
                    <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md">
                      <Terminal className="w-4 h-4 text-[#00FF9F]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. The Alliance Corridor (Supporting Characters) */}
      <section className="relative py-24 px-6 bg-[#020617]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white">Technologic Alliances</h2>
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Mastery through collaboration across the five tech villages</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Object.entries(DOSSIER_ASSETS.alliances).slice(0, 20).map(([name, url], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden grayscale hover:grayscale-0 border border-white/10 group-hover:border-[#00FF9F]/30 transition-all duration-700">
                  <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-white/60 group-hover:text-[#00FF9F] transition-colors">{name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer / Final Dossier Seal */}
      <footer className="relative py-32 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative p-8 rounded-full border border-dashed border-[#00FF9F]/30 animate-[spin_20s_linear_infinite]">
               <Activity className="w-8 h-8 text-[#00FF9F]" />
            </div>
          </motion.div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-white tracking-widest uppercase">Archive Locked</h3>
            <p className="text-white/40 font-mono text-[10px] uppercase leading-loose">
              Operative: Abubakar Habib // Access Token: VALID <br />
              Last Update: {new Date().toLocaleDateString()} // Konoha Intelligence Bureau
            </p>
          </div>

          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-[#00FF9F] text-xs font-mono uppercase tracking-[0.3em] hover:opacity-80 transition-opacity"
          >
            [ Close Dossier ]
          </Link>
        </div>
      </footer>
    </div>
  );
};
