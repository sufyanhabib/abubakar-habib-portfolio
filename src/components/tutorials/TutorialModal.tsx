import { motion, AnimatePresence } from "motion/react";
import { X, Clock, Calendar, Eye, Heart, Share2, ArrowLeft, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorialLayout } from "./TutorialLayout";
import { TableOfContents } from "./TableOfContents";
import { ArticleContent } from "./ArticleContent";
import { useState, useEffect } from "react";

type Language = "hinglish" | "english";

interface Article {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  content: Record<Language, any[]>;
}

interface TutorialModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageToggle: () => void;
}

export function TutorialModal({ article, isOpen, onClose, language, onLanguageToggle }: TutorialModalProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (isOpen && article) {
      // Simulate view count increment
      setViews(Math.floor(Math.random() * 1000) + 500);
      setLikes(Math.floor(Math.random() * 100) + 20);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, article]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const tocItems = article?.content?.[language]?.map((section: any) => ({
    id: section.heading.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
    title: section.heading,
    level: 2
  })) || [];

  return (
    <AnimatePresence>
      {isOpen && article && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden"
        >
          {/* Header */}
          <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-[110]">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-muted"
                onClick={onClose}
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <div className="h-4 w-px bg-border hidden sm:block" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary hidden sm:block">
                {article.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onLanguageToggle}
                className="rounded-full border-primary/20 hover:border-primary/50 text-[10px] font-bold uppercase tracking-wider"
              >
                <Languages className="w-3.5 h-3.5 mr-2" />
                {language === "hinglish" ? "English" : "Hinglish"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto scroll-smooth">
            <TutorialLayout toc={<TableOfContents items={tocItems} />}>
              {/* Hero Section */}
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {article.publishedAt}</span>
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                    <span className="flex items-center gap-2"><Eye className="w-3.5 h-3.5" /> {views} views</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
                    {article.title[language]}
                  </h1>

                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      H
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground uppercase tracking-wider">Habib</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Principal Engineer</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main Content */}
              <motion.div
                key={language}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArticleContent sections={article.content[language]} />
              </motion.div>

              {/* Footer Actions */}
              <footer className="mt-24 pt-12 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-4">
                    <Button
                      variant={hasLiked ? "default" : "outline"}
                      className={`rounded-full px-6 transition-all ${hasLiked ? 'bg-red-500 hover:bg-red-600 text-white border-none' : ''}`}
                      onClick={handleLike}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${hasLiked ? 'fill-current' : ''}`} />
                      {likes} Appreciation
                    </Button>
                    <Button variant="outline" className="rounded-full px-6">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-muted text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Continue Learning */}
                <div className="mt-24 p-8 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Languages className="w-32 h-32 -rotate-12" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-4">Continue Learning</h3>
                  <p className="text-muted-foreground text-sm font-light mb-6 max-w-md">
                    Explore more deep dives into systems engineering, frontend architecture, and AI integration.
                  </p>
                  <Button variant="link" className="p-0 text-primary hover:text-primary/80 font-bold uppercase tracking-widest text-[10px]">
                    Browse all tutorials →
                  </Button>
                </div>
              </footer>
            </TutorialLayout>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
