import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Section({ children, id, className, title, subtitle }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto", className)}>
      {(title || subtitle) && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground text-lg max-w-2xl">
              {subtitle}
            </p>
          )}
          <div className="h-1 w-12 bg-primary mt-6" />
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
