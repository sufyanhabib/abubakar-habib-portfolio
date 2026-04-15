import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight, Mail, Sparkles, Languages, Globe } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useSound } from "@/components/SoundProvider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TutorialModal } from "@/components/tutorials/TutorialModal";
import { Article, Language } from "@/types/tutorial";

const categories = [
  "All",
  "Frontend",
  "Networking",
  "Systems",
  "AI",
  "Tutorials"
];

export function Articles() {
  const { articles } = portfolioData as { articles: Article[] };
  const { playClick } = useSound();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("preferred_lang") as Language) || "hinglish";
    }
    return "hinglish";
  });

  useEffect(() => {
    localStorage.setItem("preferred_lang", language);
  }, [language]);

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter((a: Article) => a.meta.category === activeCategory);

  const featuredArticle = articles.find((a: Article) => a.featured);
  const recentArticles = filteredArticles.filter((a: Article) => !a.featured || activeCategory !== "All");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "hinglish" ? "english" : "hinglish");
    playClick();
  };

  return (
    <section id="articles" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-10 bg-primary/50" />
              <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.4em]">Technical Insights</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8 text-foreground"
            >
              Tutorials <span className="text-muted-foreground/40">&</span> Deep Dives
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-xl leading-relaxed font-light max-w-xl"
            >
              Authentic technical education written in Hinglish. 
              Bridging the gap between complex systems and clear explanations.
            </motion.p>
          </div>

          {/* Global Language Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center p-1.5 bg-muted/30 border border-border rounded-full backdrop-blur-sm"
          >
            <button
              onClick={() => { setLanguage("hinglish"); playClick(); }}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                language === "hinglish" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hinglish
            </button>
            <button
              onClick={() => { setLanguage("english"); playClick(); }}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                language === "english" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              English
            </button>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClick();
              }}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${
                activeCategory === cat 
                  ? "bg-foreground text-background border-foreground shadow-xl shadow-foreground/10" 
                  : "bg-muted/20 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="space-y-24">
          {/* Featured Article */}
          {activeCategory === "All" && featuredArticle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              
              <div className="relative bg-card border border-border/50 rounded-[2rem] p-10 md:p-12 overflow-hidden shadow-2xl shadow-primary/5">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                  <div className="flex items-center gap-6">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5" /> Featured
                    </span>
                    <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.3em]">{featuredArticle.meta.publishedAt}</span>
                  </div>
                  
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                  >
                    <Languages className="h-4 w-4" />
                    {language === "hinglish" ? "English" : "Hinglish"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h3 className="text-3xl md:text-5xl font-display font-bold mb-8 group-hover:text-primary transition-colors duration-500 leading-[1.15] text-foreground tracking-tight">
                      {featuredArticle.title[language]}
                    </h3>
                    
                    <p className="text-muted-foreground text-xl mb-10 leading-relaxed font-light whitespace-pre-wrap max-w-2xl">
                      {featuredArticle.excerpt[language]}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap items-center justify-between gap-8 pt-10 border-t border-border/50">
                  <div className="flex items-center gap-8 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-primary/50" /> {featuredArticle.meta.readTime}</span>
                    <span className="flex items-center gap-2.5"><Tag className="h-4 w-4 text-primary/50" /> {featuredArticle.meta.category}</span>
                  </div>
                  
                  <Button 
                    className="group/btn rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 px-10 h-14 text-xs font-bold uppercase tracking-widest shadow-lg shadow-foreground/10"
                    onClick={() => {
                      setSelectedArticle(featuredArticle);
                      playClick();
                    }}
                  >
                    Read Tutorial <ArrowRight className="ml-3 h-4 w-4 group-hover/btn:translate-x-2 transition-transform duration-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {recentArticles.map((article: Article, i: number) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer flex flex-col h-full"
                onClick={() => {
                  setSelectedArticle(article);
                  playClick();
                }}
              >
                <div className="relative flex-1 bg-card border border-border/50 rounded-[2rem] p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                      {article.meta.category}
                    </span>
                    <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">{article.meta.publishedAt}</span>
                  </div>
                  
                  <h4 className="text-2xl font-display font-bold mb-6 group-hover:text-primary transition-colors duration-500 text-foreground tracking-tight leading-tight">
                    {article.title[language]}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3 font-light flex-1">
                    {article.excerpt[language]}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary/40" /> {article.meta.readTime}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Article Reading Modal */}
      <TutorialModal
        article={selectedArticle as Article}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        language={language}
        onLanguageToggle={toggleLanguage}
      />
    </section>
  );
}
