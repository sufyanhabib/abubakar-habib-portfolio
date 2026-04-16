import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
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
    <Section id="about" className="relative px-6 md:px-12 lg:px-24">
      <div className="space-y-20 lg:space-y-32">
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
            <div className="lg:col-span-7 space-y-10">
              {storyBlocks.map((block, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative pl-8 border-l border-border/50 hover:border-primary/30 transition-colors duration-500"
                >
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-500" />
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-primary/60 mb-3">
                    {labels[i] || "Chapter"}
                  </span>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground font-light group-hover:text-foreground transition-colors duration-500">
                    {block}
                  </p>
                </motion.div>
              ))}

              {/* 5th Timeline Item: Interactive Link to Dossier */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link 
                  to="/dossier" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block pl-8 border-l border-border/50 hover:border-primary/30 transition-colors duration-500"
                >
                  <div className="absolute -left-[5px] top-0 h-2.5 w-2.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-500 shadow-[0_0_10px_rgba(0,0,0,0)] group-hover:shadow-primary/50" />
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-primary/60 mb-3 group-hover:text-primary transition-colors">
                    ACTIVE STATUS
                  </span>
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground font-light group-hover:text-foreground transition-all duration-500 flex items-center gap-2 group-hover:translate-x-1">
                    Abubakar Habib - View Shinobi Profile <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </p>
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
    </Section>
  );
}
