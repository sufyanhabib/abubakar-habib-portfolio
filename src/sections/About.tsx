import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { LocationCard } from "@/components/LocationCard";

export function About() {
  const { about } = portfolioData;

  return (
    <Section id="about" title="About Me" subtitle="The intersection of systems and interfaces.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground font-light">
            {about.story}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-border/50">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3 opacity-70">Current Base</h4>
              <p className="text-xl font-display font-bold text-foreground">{portfolioData.identity.location}</p>
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3 opacity-70">Academic Path</h4>
              <p className="text-xl font-display font-bold text-foreground">MCA, Bihar University</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <LocationCard />
        </div>
      </div>
    </Section>
  );
}
