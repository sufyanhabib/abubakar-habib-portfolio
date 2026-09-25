import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Github, Linkedin, Mail, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSound } from "@/components/SoundProvider";
import { cn } from "@/lib/utils";
import { useActiveSectionObserver } from "@/hooks/useActiveSectionObserver";
import { portfolioData } from "@/data/portfolio";

const navLinks = [
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Articles", href: "#articles", id: "articles" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isMuted, toggleMute, playClick } = useSound();
  
  const sectionIds = useMemo(() => ["hero", ...navLinks.map(link => link.id)], []);
  const { activeSection, scrollToSection } = useActiveSectionObserver(sectionIds, {
    headerOffset: 85,
    rootMargin: "-15% 0px -40% 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
    debounceMs: 35,
    bottomThreshold: 70,
    defaultSection: null,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    playClick();
    scrollToSection(id);
  }, [playClick, scrollToSection]);

  const handleMobileLinkClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    playClick();
    scrollToSection(id);
  }, [playClick, scrollToSection]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 py-4",
        isScrolled || isMobileMenuOpen ? "bg-white/90 dark:bg-[#0d0d12]/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 py-3 shadow-sm" : "bg-transparent"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container-responsive flex items-center justify-between">
        <motion.a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "hero")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter relative z-[1000] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        >
          <span className="text-tricolor animate-gradient-x">AH.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 relative" role="tablist">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  role="tab"
                  aria-selected={isActive}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative py-1 px-1 focus:outline-none focus-visible:text-primary",
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)] dark:shadow-[0_0_10px_rgba(96,165,250,0.7)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pl-2 border-l border-border/40">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground w-10 h-10 flex items-center justify-center relative overflow-hidden"
              aria-label={isMuted ? "Unmute" : "Mute"}
              role="switch"
              aria-checked={!isMuted}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMuted ? "muted" : "unmuted"}
                  initial={{ y: 20, rotate: 90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -20, rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <ThemeToggle />
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="rounded-full hover:border-primary/50 transition-colors"
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden relative z-[1000]">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground w-10 h-10 flex items-center justify-center relative overflow-hidden shrink-0"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMuted ? "muted" : "unmuted"}
                initial={{ y: 20, rotate: 90, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -20, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
          <ThemeToggle />
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 active:scale-95 transition-all text-foreground shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              playClick();
            }}
            aria-label={isMobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? "open" : "closed"}
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 z-[998] bg-white dark:bg-[#0d0d12] pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Nav links container, using center align with flexible spacing */}
            <div className="flex flex-col gap-6 py-6 my-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleMobileLinkClick(e, link.id)}
                  className={cn(
                    "text-3xl font-display font-bold tracking-tight transition-colors py-2 flex items-center justify-between",
                    activeSection === link.id ? "text-primary" : "text-foreground/80 hover:text-primary"
                  )}
                >
                  <span>{link.name}</span>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="mobileActiveDot"
                      className="w-2.5 h-2.5 rounded-full bg-primary"
                    />
                  )}
                </motion.a>
              ))}
            </div>
            
            {/* Bottom Actions Bar */}
            <div className="space-y-6 pt-4 shrink-0">
              <div className="h-[1px] bg-border/40 w-full" />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {[
                    { icon: Github, href: portfolioData.identity.github, label: "GitHub" },
                    { icon: Linkedin, href: portfolioData.identity.linkedin, label: "LinkedIn" },
                    { icon: Mail, href: `mailto:${portfolioData.identity.email}`, label: "Email" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target={social.href && social.href !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="w-11 h-11 rounded-full bg-muted/60 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors focus:ring-2 focus:ring-primary"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
                
                <Button 
                  size="lg" 
                  className="rounded-full px-8 shadow-lg shadow-primary/20" 
                  asChild 
                  onClick={(e) => handleMobileLinkClick(e, "contact")}
                >
                  <a href="#contact">Hire Me</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
