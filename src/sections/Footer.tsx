import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Mail, Codepen } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const { identity } = portfolioData;

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl font-display font-bold tracking-tighter">
            {portfolioData.identity.name}<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            © {new Date().getFullYear()} Abubakar Habib. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {[
            { icon: Github, href: identity.github, label: "GitHub" },
            { icon: Linkedin, href: identity.linkedin, label: "LinkedIn" },
            { icon: Codepen, href: identity.codepen, label: "CodePen" },
            { icon: Mail, href: `mailto:${identity.email}`, label: "Email" }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-foreground/[0.03] border border-foreground/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
            >
              <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#articles" className="hover:text-foreground transition-colors">Articles</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
