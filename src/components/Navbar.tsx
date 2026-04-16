import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSound } from "@/components/SoundProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Articles", href: "#articles" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isMuted, toggleMute, playClick } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[999] transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-display font-bold tracking-tighter"
        >
          <span className="text-tricolor animate-gradient-x">AH.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => playClick()}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="flex items-center gap-4">
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
              className="rounded-full"
              onClick={() => playClick()}
            >
              <a href="#contact">Hire Me</a>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors text-muted-foreground hover:text-foreground w-10 h-10 flex items-center justify-center relative overflow-hidden"
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
            className="text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed inset-0 z-[998] bg-background/95 backdrop-blur-xl pt-24 px-6 pb-12 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    playClick();
                  }}
                  className="text-3xl font-display font-bold text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="space-y-8">
              <div className="h-px bg-border/50 w-full" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Mail, href: "#" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
                <Button size="lg" className="rounded-full px-8" asChild onClick={() => setIsMobileMenuOpen(false)}>
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
