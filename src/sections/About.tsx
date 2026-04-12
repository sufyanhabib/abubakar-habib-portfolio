import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";

export function About() {
  const { about } = portfolioData;

  return (
    <Section id="about" title="About Me" subtitle="The intersection of systems and interfaces.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            {about.story}
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">Location</h4>
              <p className="text-foreground font-medium">{portfolioData.identity.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">Education</h4>
              <p className="text-foreground font-medium">MCA, Bihar University</p>
            </div>
          </div>
        </div>
        
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted group">
          <img 
            src={portfolioData.identity.avatarUrl} 
            alt={portfolioData.identity.name} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          <div className="absolute inset-0 border border-white/10 rounded-2xl" />
        </div>
      </div>
    </Section>
  );
}
