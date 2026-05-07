import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { SHINOBI_IMAGES } from "@/constants/assetRegistry";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Suspense, lazy } from "react";

const LazyLocationCard = lazy(() => import("@/components/LocationCard").then(m => ({ default: m.LocationCard })));

export function About() {
  const { about } = portfolioData;
  
  // Split story into narrative blocks
  const storyBlocks = about.story.split('\n\n').filter(Boolean);
  
  const labels = ["The Foundation", "The Practical Path", "The Transition", "Current Focus"];

  return (
    <section id="about" className="relative overflow-hidden bg-background pt-32 pb-24 border-y border-border/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 space-y-20 lg:space-y-32 relative z-10">
        {/* Top Section: Narrative Storytelling */}
        <div className="space-y-16">
          <div className="space-y-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em]">The Narrative</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              Bridging the gap between <br className="hidden sm:block" />
              <span className="text-muted-foreground">systems and interfaces.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-7 space-y-10 relative">
              {/* Manga Fade Texture */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
              
              {storyBlocks.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative pl-8 border-l-2 border-border/20 hover:border-primary transition-colors duration-500"
                >
                  <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-sm rotate-45 bg-border group-hover:bg-primary transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0)] group-hover:shadow-primary/50" />
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-primary/60 mb-3 group-hover:text-primary transition-colors">
                    {labels[i] || "Chapter"}
                  </span>
                  <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground font-light group-hover:text-foreground transition-colors duration-500">
                    {block}
                  </p>
                </motion.div>
              ))}

              {/* Enhanced Dossier Link: Shinobi Directive UI */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-8"
              >
                <Link 
                  to="/dossier" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block p-8 bg-secondary/5 border-2 border-dashed border-border/50 hover:border-primary hover:bg-primary/[0.02] transition-all duration-500 rounded-2xl overflow-hidden"
                >
                  {/* Reimagined Card Background */}
                  <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                    <img 
                      src={SHINOBI_IMAGES.ornaments.ornament5} 
                      className="absolute -right-10 -bottom-10 w-64 grayscale rotate-12 group-hover:rotate-0 transition-transform duration-700" 
                      alt="" 
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Classified Directive</span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-display font-black text-foreground uppercase italic -skew-x-6">Archived Shinobi Dossier</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-mono text-muted-foreground uppercase">Status</p>
                        <p className="text-xs font-mono font-bold text-primary uppercase">Active_Link</p>
                      </div>
                      <div className="p-4 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <ExternalLink className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-secondary/5 border border-border/50 space-y-8"
              >
                <div className="group">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/50 mb-3 group-hover:text-primary transition-colors">Current Base</h4>
                  <p className="text-xl sm:text-2xl font-display font-bold text-foreground">{portfolioData.identity.location}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Operating from the heart of India, bringing systems-thinking to global interfaces.</p>
                </div>
                <div className="h-px bg-border/50 w-full" />
                <div className="group">
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/50 mb-3 group-hover:text-primary transition-colors">Academic Path</h4>
                  <p className="text-xl sm:text-2xl font-display font-bold text-foreground">MCA, Bihar University</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Master of Computer Applications, specialized in systems and software architecture.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Interactive Location Experience */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-primary font-mono text-[10px] uppercase tracking-[0.4em]">Interactive Experience</span>
              <h3 className="text-3xl font-display font-bold tracking-tight">Location Identity</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              A real-time visualization of my origin and your current node in the global network.
            </p>
          </div>
          <Suspense fallback={<div className="h-[400px] rounded-[2.5rem] bg-secondary/5 animate-pulse flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">Initializing Map...</div>}>
            <LazyLocationCard />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
