import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export function Experience() {
  return (
    <Section id="experience" title="Professional Journey" subtitle="Practical engineering experience in networks and systems.">
      <div className="space-y-12">
        {portfolioData.experience.map((exp, i) => (
          <div key={i} className="relative pl-8 md:pl-0">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border md:left-1/2 md:-translate-x-1/2" />
            
            <div className={`flex flex-col md:flex-row items-start gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Content Card */}
              <div className="w-full md:w-[45%] bg-secondary/20 border border-border/50 rounded-2xl p-8 hover:bg-secondary/30 transition-all">
                <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest mb-4">
                  <Calendar className="h-3 w-3" />
                  {exp.period}
                </div>
                <h3 className="text-2xl font-display font-bold mb-1">{exp.role}</h3>
                <div className="flex items-center gap-4 text-muted-foreground mb-6">
                  <span className="flex items-center gap-1 text-sm">
                    <Briefcase className="h-3 w-3" /> {exp.company}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" /> {exp.location}
                  </span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {exp.description}
                </p>
                <ul className="space-y-3">
                  {exp.achievements.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-primary border-4 border-background md:left-1/2 md:-translate-x-1/2 z-10" />
              
              {/* Spacer for Desktop */}
              <div className="hidden md:block w-[45%]" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
