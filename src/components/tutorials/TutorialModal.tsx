import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, Languages, User, Sparkles, Bookmark, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorialShell } from "./TutorialLayout";
import { TableOfContents } from "./TableOfContents";
import { TutorialHero } from "./TutorialHero";
import { TutorialArticle } from "./TutorialArticle";
import { useState, useEffect } from "react";
import { Article, Language } from "@/types/tutorial";
import { usePersistedLanguage } from "@/hooks/usePersistedLanguage";

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

  useEffect(() => {
    if (isOpen && article) {
      setLikes(article.meta.likes || Math.floor(Math.random() * 100) + 20);
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

  const tocItems = article?.content?.[language]?.map((section) => ({
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
          className="fixed inset-0 z-[900] bg-background flex flex-col overflow-hidden pt-20"
        >
          {/* Top Navigation Bar */}
          <header className="h-20 border-b border-border/30 bg-background/60 backdrop-blur-2xl flex items-center justify-between px-6 md:px-12 shrink-0">
            <div className="flex items-center gap-8">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-2xl hover:bg-muted/50 group/back px-4"
                onClick={onClose}
              >
                <ArrowLeft className="w-4 h-4 mr-3 group-hover/back:-translate-x-1 transition-transform" /> 
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit Reader</span>
              </Button>
              
              <div className="hidden lg:flex items-center gap-4">
                <div className="h-4 w-[1px] bg-border/50" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary/60">
                  {article.meta.category}
                </span>
                <div className="h-1 w-1 rounded-full bg-border" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
                  {article.title[language]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center p-1 bg-muted/20 border border-border/30 rounded-2xl backdrop-blur-sm">
                <button
                  onClick={() => language !== "hinglish" && onLanguageToggle()}
                  className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                    language === "hinglish" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Hinglish
                </button>
                <button
                  onClick={() => language !== "english" && onLanguageToggle()}
                  className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                    language === "english" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  English
                </button>
              </div>
              
              <div className="h-8 w-[1px] bg-border/30 hidden sm:block" />
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Main Reading Area */}
          <div className="flex-1 overflow-y-auto scroll-smooth selection:bg-primary/20 selection:text-primary" id="tutorial-scroll-container">
            <TutorialShell toc={<TableOfContents items={tocItems} />}>
              <TutorialHero 
                title={article.title[language]}
                excerpt={article.excerpt[language]}
                meta={article.meta}
                language={language}
              />

              <motion.div
                key={language}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <TutorialArticle sections={article.content[language]} />
              </motion.div>

              {/* Footer Appreciation & Navigation */}
              <footer className="mt-32 pt-16 border-t border-border/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex items-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLike}
                      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all duration-500 ${
                        hasLiked 
                          ? 'bg-red-500 text-white shadow-xl shadow-red-500/20' 
                          : 'bg-muted/30 border border-border/50 text-muted-foreground hover:border-red-500/30 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                      {likes} Appreciation
                    </motion.button>
                    
                    <div className="flex items-center -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                      <div className="pl-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        +12 others liked this
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-3">
                    {article.meta.tags.map(tag => (
                      <span key={tag} className="px-5 py-2 rounded-xl bg-muted/20 text-[10px] font-mono text-muted-foreground uppercase tracking-widest border border-border/50 hover:text-primary hover:border-primary/30 transition-all cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Steps / Continue Learning */}
                <div className="mt-32 p-12 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                    <Sparkles className="w-48 h-48 -rotate-12 text-primary" />
                  </div>
                  
                  <div className="relative z-10 max-w-2xl">
                    <h3 className="text-3xl font-display font-bold text-foreground mb-6">Master the Craft</h3>
                    <p className="text-muted-foreground text-lg font-light mb-10 leading-relaxed">
                      Deep dives into systems engineering, frontend architecture, and AI integration. 
                      No fluff, just pure technical insights.
                    </p>
                    <Button 
                      variant="default" 
                      className="rounded-2xl px-10 h-14 bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 text-xs font-bold uppercase tracking-widest shadow-lg shadow-foreground/10"
                      onClick={onClose}
                    >
                      Browse All Tutorials <ArrowLeft className="ml-3 w-4 h-4 rotate-180" />
                    </Button>
                  </div>
                </div>
              </footer>
            </TutorialShell>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
