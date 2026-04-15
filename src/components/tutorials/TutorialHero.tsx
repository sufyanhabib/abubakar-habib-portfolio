import { motion } from 'motion/react';
import { Clock, Calendar, Eye, User, Sparkles, Tag } from 'lucide-react';
import { ArticleMeta, Language } from '@/types/tutorial';

interface TutorialHeroProps {
  title: string;
  excerpt: string;
  meta: ArticleMeta;
  language: Language;
}

export function TutorialHero({ title, excerpt, meta, language }: TutorialHeroProps) {
  return (
    <div className="mb-24 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-10"
      >
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> {meta.category}
          </span>
          {meta.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-tight max-w-4xl">
          {title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl border-l-2 border-primary/20 pl-8 italic">
          {excerpt}
        </p>

        {/* Meta Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-8 pt-10 border-t border-border/50">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-14 h-14 rounded-full bg-card border border-border/50 flex items-center justify-center text-primary overflow-hidden shadow-xl">
                <User className="w-7 h-7" />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                {meta.author} <Sparkles className="w-3.5 h-3.5 text-primary" />
              </p>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">Principal Engineer</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
            <span className="flex items-center gap-2.5"><Calendar className="w-4 h-4 text-primary/50" /> {meta.publishedAt}</span>
            <span className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-primary/50" /> {meta.readTime}</span>
            <span className="flex items-center gap-2.5"><Eye className="w-4 h-4 text-primary/50" /> {meta.views || 0} views</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
