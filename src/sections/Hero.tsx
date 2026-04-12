import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useRef } from "react";

export function Hero() {
  const { identity } = portfolioData;
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax offsets for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.98]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden bg-background transition-colors duration-700"
    >
      {/* Premium Background System */}
      <div className="absolute inset-0 z-0">
        {/* Layered Radial Glows - Dark Mode */}
        <motion.div 
          style={{ y: shouldReduceMotion ? 0 : y1 }}
          className="absolute top-[-10%] right-[-5%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 dark:bg-indigo-900/20 bg-blue-100/40 blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-0 dark:opacity-100" 
        />
        <motion.div 
          style={{ y: shouldReduceMotion ? 0 : y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-900/15 dark:bg-blue-900/15 bg-sky-100/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-0 dark:opacity-100" 
        />

        {/* Layered Shapes - Light Mode */}
        <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-700">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-sky-50/50 via-white to-white" />
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 1, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-sky-100/20 blur-3xl" 
          />
        </div>
        
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

        {/* Organic Layered Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-[25vh] z-10 pointer-events-none">
          <svg 
            viewBox="0 0 1440 320" 
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <motion.path 
              style={{ y: shouldReduceMotion ? 0 : useTransform(scrollYProgress, [0, 1], [0, 40]) }}
              className="fill-background/40 dark:fill-[#0d0d12]"
              d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></motion.path>
          </svg>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12 lg:py-0">
        <motion.div
          style={{ 
            opacity: shouldReduceMotion ? 1 : contentOpacity,
            scale: shouldReduceMotion ? 1 : contentScale
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-display font-bold tracking-tighter leading-tight mb-8"
          >
            <span className="text-tricolor animate-gradient-x inline-block">
              {identity.name}
            </span>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl font-display font-medium text-foreground/70 mb-4 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            {identity.title}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-primary font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-10 opacity-80 flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Available for new opportunities
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-12 leading-relaxed font-light"
          >
            {identity.valueProp}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center lg:justify-start gap-5 mb-16"
          >
            <Button size="xl" className="rounded-full px-10 bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-xl shadow-primary/20" asChild>
              <a href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="xl" variant="outline" className="rounded-full px-10 border-foreground/20 hover:bg-foreground/5 transition-all duration-300" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center lg:justify-start gap-5 mb-12"
          >
            {[
              { icon: Github, href: identity.github, label: "GitHub" },
              { icon: Linkedin, href: identity.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${identity.email}`, label: "Email" }
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
              >
                <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                
                {/* Premium Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Tooltip-like label (optional, but adds to premium feel) */}
                <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-300 bg-foreground text-background text-[10px] font-mono px-2 py-1 rounded uppercase tracking-widest pointer-events-none">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-8 lg:px-0 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[320px] md:max-w-lg aspect-square group">
            {/* Background Abstract Waves (Inspired by Josh but techy) */}
            <div className="absolute inset-0 z-0 overflow-visible pointer-events-none">
              <svg viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-20 dark:opacity-30">
                <motion.path
                  d="M0,200 Q100,100 200,200 T400,200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                  animate={{ d: ["M0,200 Q100,150 200,200 T400,200", "M0,200 Q100,250 200,200 T400,200", "M0,200 Q100,150 200,200 T400,200"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,220 Q100,120 200,220 T400,220"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="text-primary/50"
                  animate={{ d: ["M0,220 Q100,170 200,220 T400,220", "M0,220 Q100,270 200,220 T400,220", "M0,220 Q100,170 200,220 T400,220"] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </svg>
            </div>

            {/* Premium Circular Frame */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/10 bg-muted/30 backdrop-blur-sm">
              <img 
                src={identity.avatarUrl} 
                alt={identity.name} 
                className="object-cover w-full h-full transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-80 mix-blend-lighten dark:mix-blend-screen"
                referrerPolicy="no-referrer"
              />
              {/* Subtle Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Labels (Pills) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-4 md:-left-8 bg-background/90 backdrop-blur-md border-2 border-orange-500/50 px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-orange-500">Frontend</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-4 md:-right-8 bg-background/90 backdrop-blur-md border-2 border-dashed border-green-500/50 px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-green-500">Network</span>
            </motion.div>

            <motion.div 
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -right-8 md:-right-12 bg-background/90 backdrop-blur-md border-2 border-dotted border-primary/50 px-4 py-2 rounded-full shadow-xl z-20 flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-primary">AI Engineer</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground/50">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
