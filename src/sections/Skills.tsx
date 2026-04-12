import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <Section id="skills" className="relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -z-10 opacity-20 blur-3xl">
        <div className="w-[500px] h-[500px] bg-primary/10 rounded-full" />
      </div>

      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px w-12 bg-primary/50" />
          <span className="text-primary font-mono text-xs uppercase tracking-[0.3em]">Technical Arsenal</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
        >
          A multi-disciplinary <br className="hidden md:block" />
          <span className="text-muted-foreground">toolkit for modern engineering.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
        {portfolioData.skills.map((skillGroup, i) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "group relative p-8 rounded-3xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all duration-500",
              i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5"
            )}
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="p-3 bg-background/50 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-colors duration-500">
                  <skillGroup.icon className="h-6 w-6 text-primary/80 group-hover:text-primary transition-colors duration-500" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Category 0{i + 1}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold mb-3 tracking-tight">{skillGroup.category}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                {skillGroup.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <Badge 
                    key={item} 
                    variant="secondary" 
                    className="bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground border-border/30 font-normal py-1 px-3 transition-all duration-300"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
