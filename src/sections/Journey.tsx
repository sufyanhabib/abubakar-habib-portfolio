import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { motion } from "motion/react";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Journey() {
  return (
    <Section id="journey" title="Learning Journey" subtitle="A trajectory of continuous growth and technical range.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {portfolioData.learningJourney.map((step, i) => (
          <div key={i} className="relative group">
            <div className="mb-6 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {i + 1}
              </div>
              {i < portfolioData.learningJourney.length - 1 && (
                <div className="hidden lg:block flex-grow h-[1px] bg-border ml-4" />
              )}
            </div>
            <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
              {step.milestone}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Certifications & Training</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portfolioData.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium">{cert.name}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-50">— {cert.status}</span>
              </div>
            ))}
          </div>
        </div>
        <Button variant="outline" className="rounded-full group" asChild>
          <a href={portfolioData.identity.github} target="_blank" rel="noopener noreferrer">
            View Learning Repos <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
