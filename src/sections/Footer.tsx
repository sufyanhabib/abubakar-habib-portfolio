import { portfolioData } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-xl font-display font-bold tracking-tighter">
            {portfolioData.identity.name}<span className="text-primary">.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            © {new Date().getFullYear()} Abubakar Habib. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
