import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight, Mail, Sparkles, Languages, Globe } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useSound } from "@/components/SoundProvider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TutorialModal } from "@/components/tutorials/TutorialModal";

const categories = [
  "All",
  "Frontend",
  "Networking",
  "Systems",
  "AI",
  "Tutorials"
];

type Language = "hinglish" | "english";

interface Article {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  content: Record<Language, any[]>;
}

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
    : articles.filter((a: any) => a.category === activeCategory);

  const featuredArticle = articles.find((a: any) => a.featured);
  const recentArticles = filteredArticles.filter((a: any) => !a.featured || activeCategory !== "All");

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
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
                      <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.3em]">{featuredArticle.publishedAt}</span>
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
                      <span className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-primary/50" /> {featuredArticle.readTime}</span>
                      <span className="flex items-center gap-2.5"><Tag className="h-4 w-4 text-primary/50" /> {featuredArticle.category}</span>
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

            {/* Article List */}
            <div className="space-y-16">
              {recentArticles.map((article: any, i: number) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer relative"
                  onClick={() => {
                    setSelectedArticle(article);
                    playClick();
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-5 mb-6">
                        <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.3em]">{article.category}</span>
                        <div className="h-1 w-1 rounded-full bg-muted-foreground/20" />
                        <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.2em]">{article.publishedAt}</span>
                      </div>
                      
                      <h4 className="text-2xl md:text-3xl font-display font-bold mb-6 group-hover:text-primary transition-colors duration-500 text-foreground tracking-tight leading-tight">
                        {article.title[language]}
                      </h4>
                      
                      <p className="text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-2 font-light whitespace-pre-wrap max-w-2xl">
                        {article.excerpt[language]}
                      </p>

                      <div className="flex items-center gap-8 text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-primary/40" /> {article.readTime}</span>
                        <span className="flex items-center gap-2.5 group-hover:text-primary transition-all duration-500">
                          View Guide <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-500" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-border/50 via-border to-transparent group-hover:from-primary/20 group-hover:via-primary/30 transition-all duration-700" />
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            {/* Writing Focus */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-[2rem] p-10 shadow-xl shadow-primary/5"
            >
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-10 flex items-center gap-3 text-foreground">
                <BookOpen className="h-5 w-5 text-primary" /> Writing Focus
              </h4>
              <p className="text-base text-muted-foreground leading-relaxed mb-10 font-light">
                I explain complex systems through the lens of a builder. My focus is on making 
                high-performance engineering accessible to everyone.
              </p>
              <div className="space-y-5">
                {[
                  { label: "Systems Thinking", icon: Globe },
                  { label: "Frontend Architecture", icon: Sparkles },
                  { label: "Network Protocols", icon: Globe },
                  { label: "AI Integration", icon: Sparkles }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 text-xs text-foreground/70 font-medium group/item hover:text-primary transition-colors cursor-default">
                    <div className="h-2 w-2 rounded-full bg-primary/30 group-hover/item:bg-primary transition-colors" />
                    {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden bg-primary/5 border border-primary/20 rounded-[2rem] p-10"
            >
              <div className="absolute -top-4 -right-4 p-4 opacity-5">
                <Mail className="h-32 w-32 -rotate-12 text-primary" />
              </div>
              
              <h4 className="text-xl font-display font-bold mb-4 text-foreground">Stay Informed</h4>
              <p className="text-sm text-muted-foreground mb-10 font-light leading-relaxed">
                Join 500+ developers receiving my monthly deep-dives on systems and UI.
              </p>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all text-foreground placeholder:text-muted-foreground/30 shadow-inner"
                />
                <Button className="w-full rounded-2xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 h-14 text-xs font-bold uppercase tracking-widest shadow-lg shadow-foreground/10">
                  Subscribe to Insights
                </Button>
              </div>
            </motion.div>

            {/* Popular Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-10 text-foreground">Smart Topics</h4>
              <div className="flex flex-wrap gap-3">
                {["#Systems", "#React", "#Networking", "#AI", "#Performance", "#Security"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-5 py-2.5 rounded-2xl bg-muted/20 border border-border/50 text-[10px] font-mono font-bold text-muted-foreground hover:text-primary hover:border-primary/30 cursor-pointer transition-all duration-500 uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </aside>
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
