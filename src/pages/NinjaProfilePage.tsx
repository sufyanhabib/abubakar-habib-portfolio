import React from 'react';
import { motion } from 'motion/react';
import { NinjaProfileCard } from '@/components/ninja-card/NinjaProfileCard';
import { ChevronLeft, Share2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSound } from '@/components/SoundProvider';
import { Volume2, VolumeX } from 'lucide-react';

export const NinjaProfilePage: React.FC = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-[#00FF9F]/30 selection:text-[#00FF9F]">
      {/* Top Navigation */}
      <nav className="fixed top-0 inset-x-0 h-20 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-white/60 hover:text-[#00FF9F] transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs font-mono uppercase tracking-widest">Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-[#00FF9F]"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Share2 className="w-4 h-4 text-white/60" />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF9F]/10 border border-[#00FF9F]/20 text-[#00FF9F] text-[10px] font-mono uppercase tracking-[0.2em]"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#00FF9F] animate-pulse" />
              Verified Shinobi Profile
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold tracking-tight"
            >
              Dossier: <span className="text-white/40">Abubakar Habib</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed"
            >
              A comprehensive breakdown of technical capabilities, elemental affinities, and career progression within the global developer network.
            </motion.p>
          </div>

          {/* The Card */}
          <div className="flex justify-center">
            <NinjaProfileCard className="w-full max-w-xl" />
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4"
            >
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00FF9F]">Mission History</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Successfully completed over 50+ high-priority frontend missions, specializing in React architecture and complex UI systems. Currently operating as a freelance consultant for global tech villages.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4"
            >
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#00C2FF]">Technical Arsenal</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Node.js", "GraphQL"].map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/40">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
