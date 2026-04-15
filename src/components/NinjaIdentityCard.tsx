import React from "react";
import { motion } from "motion/react";
import { Shield, Zap, Droplets, Eye, Scroll, Target, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface NinjaIdentityCardProps {
  className?: string;
}

export function NinjaIdentityCard({ className }: NinjaIdentityCardProps) {
  const stats = [
    { label: "Rank", value: "Early Jōnin (Lower Tier)", icon: Award },
    { label: "Village", value: "Konohagakure", icon: Shield },
    { label: "Clan", value: "Nara Clan", icon: Scroll },
    { label: "Dōjutsu", value: "Sharingan (1-Tomoe)", icon: Eye },
  ];

  const natureTypes = [
    { name: "Lightning Release", icon: Zap, color: "text-yellow-400" },
    { name: "Water Release", icon: Droplets, color: "text-blue-400" },
  ];

  const specializations = [
    "Network Systems",
    "Frontend Development",
    "Debugging & Problem Solving"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border/50 bg-secondary/5 p-8 transition-all duration-500 hover:border-primary/30",
        className
      )}
    >
      {/* Background Accent */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      
      {/* Header */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-6 bg-primary/40" />
          <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em]">Shinobi Profile</span>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground tracking-tight">Abubakar Habib</h3>
        <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-70">Identification No. 012607</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-start gap-4 group">
            <div className="mt-1 p-2 rounded-lg bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-colors">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-sm font-medium text-foreground">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-border/50 w-full mb-8" />

      {/* Nature Types */}
      <div className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Nature Types</p>
        <div className="flex flex-wrap gap-3">
          {natureTypes.map((type, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border/50 text-xs font-medium text-foreground transition-all hover:border-primary/30"
            >
              <type.icon className={cn("w-3 h-3", type.color)} />
              {type.name}
            </div>
          ))}
        </div>
      </div>

      {/* Specialization */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">Specialization</p>
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec, i) => (
            <div 
              key={i} 
              className="px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-[11px] text-primary/80 font-medium"
            >
              {spec}
            </div>
          ))}
        </div>
      </div>

      {/* Seal/Stamp Decoration */}
      <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none">
        <Target className="w-24 h-24 text-primary rotate-12" />
      </div>
    </motion.div>
  );
}
