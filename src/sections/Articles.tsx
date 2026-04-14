import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight, Mail, Sparkles, Languages, Globe } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useSound } from "@/components/SoundProvider";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const categories = [
  "All",
  "Frontend",
  "Networking",
  "Systems",
  "AI",
  "Tutorials"
];

type Language = "hinglish" | "english";

interface ContentBlock {
  type: "heading" | "paragraph" | "image" | "bullets" | "code";
  value?: string | string[];
  src?: string;
  alt?: string;
}

interface ContentSection {
  heading: string;
  text?: string;
  code?: string;
  blocks?: ContentBlock[];
}

interface Article {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  content: Record<Language, ContentSection[]>;
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
    <section id="articles" className="py-24 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em]">Technical Insights</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6 text-foreground"
            >
              Tutorials <span className="text-muted-foreground">&</span> Deep Dives
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg leading-relaxed font-light"
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
            className="flex items-center p-1 bg-muted/50 border border-border rounded-full"
          >
            <button
              onClick={() => { setLanguage("hinglish"); playClick(); }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                language === "hinglish" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Hinglish
            </button>
            <button
              onClick={() => { setLanguage("english"); playClick(); }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                language === "english" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
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
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClick();
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-foreground text-background border-foreground" 
                  : "bg-muted/30 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-16">
            {/* Featured Article */}
            {activeCategory === "All" && featuredArticle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" /> Featured Tutorial
                      </span>
                      <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">{featuredArticle.publishedAt}</span>
                    </div>
                    
                    <button 
                      onClick={toggleLanguage}
                      className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                    >
                      <Languages className="h-3.5 w-3.5" />
                      {language === "hinglish" ? "Switch to English" : "Switch to Hinglish"}
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 group-hover:text-primary transition-colors duration-300 leading-tight text-foreground">
                        {featuredArticle.title[language]}
                      </h3>
                      
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-light whitespace-pre-wrap">
                        {featuredArticle.excerpt[language]}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-border">
                    <div className="flex items-center gap-6 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {featuredArticle.readTime}</span>
                      <span className="flex items-center gap-2"><Tag className="h-3.5 w-3.5" /> {featuredArticle.category}</span>
                    </div>
                    
                    <Button 
                      className="group/btn rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all px-8"
                      onClick={() => {
                        setSelectedArticle(featuredArticle);
                        playClick();
                      }}
                    >
                      Read Tutorial <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Article List */}
            <div className="space-y-12">
              {recentArticles.map((article: any, i: number) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => playClick()}
                >
                  <div 
                    className="flex flex-col md:flex-row md:items-start gap-8"
                    onClick={() => {
                      setSelectedArticle(article);
                      playClick();
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-primary font-mono text-[10px] font-bold uppercase tracking-[0.2em]">{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                        <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">{article.publishedAt}</span>
                      </div>
                      
                      <h4 className="text-xl md:text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors duration-300 text-foreground">
                        {article.title[language]}
                      </h4>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2 font-light whitespace-pre-wrap">
                        {article.excerpt[language]}
                      </p>

                      <div className="flex items-center gap-6 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
                        <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors">
                          View Guide <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 h-px w-full bg-border group-hover:bg-primary/20 transition-colors" />
                </motion.article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Writing Focus */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-3xl p-8 shadow-sm"
            >
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-2 text-foreground">
                <BookOpen className="h-4 w-4 text-primary" /> Writing Focus
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-light">
                I explain complex systems through the lens of a builder. My focus is on making 
                high-performance engineering accessible to everyone.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Systems Thinking", icon: Globe },
                  { label: "Frontend Architecture", icon: Sparkles },
                  { label: "Network Protocols", icon: Globe },
                  { label: "AI Integration", icon: Sparkles }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
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
              className="relative overflow-hidden bg-primary/5 border border-primary/20 rounded-3xl p-8"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Mail className="h-24 w-24 -rotate-12 text-primary" />
              </div>
              
              <h4 className="text-lg font-display font-bold mb-3 text-foreground">Stay Informed</h4>
              <p className="text-sm text-muted-foreground mb-8 font-light leading-relaxed">
                Join 500+ developers receiving my monthly deep-dives on systems and UI.
              </p>
              
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
                <Button className="w-full rounded-xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all">
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
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-8 text-foreground">Smart Topics</h4>
              <div className="flex flex-wrap gap-2">
                {["#Systems", "#React", "#Networking", "#AI", "#Performance", "#Security"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 rounded-xl bg-muted/30 border border-border text-[10px] font-mono font-bold text-muted-foreground hover:text-primary hover:border-primary/30 cursor-pointer transition-all uppercase tracking-widest"
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
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-border flex items-center justify-between bg-card/50 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedArticle(null)}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-2" /> Back
                  </Button>
                  <div className="h-4 w-px bg-border" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                    {selectedArticle.category}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center p-1 bg-muted/50 border border-border rounded-full">
                    <button
                      onClick={() => setLanguage("hinglish")}
                      className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                        language === "hinglish" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Hinglish
                    </button>
                    <button
                      onClick={() => setLanguage("english")}
                      className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                        language === "english" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      English
                    </button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setSelectedArticle(null)}
                  >
                    <Sparkles className="h-4 w-4 rotate-45" />
                  </Button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 mb-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    <span>{selectedArticle.publishedAt}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 leading-tight text-foreground">
                        {selectedArticle.title[language]}
                      </h2>

                      <div className="space-y-12">
                        {selectedArticle.content[language].map((section, idx) => (
                          <div key={idx} className="space-y-6">
                            <h3 className="text-xl font-display font-bold text-foreground/90">
                              {section.heading}
                            </h3>
                            
                            {section.blocks ? (
                              <div className="space-y-6">
                                {section.blocks.map((block, bIdx) => {
                                  switch (block.type) {
                                    case "heading":
                                      return <h4 key={bIdx} className="text-lg font-display font-bold text-foreground/80 mt-8">{block.value}</h4>;
                                    case "paragraph":
                                      return <p key={bIdx} className="text-muted-foreground text-lg leading-relaxed font-light whitespace-pre-wrap">{block.value}</p>;
                                    case "image":
                                      return (
                                        <div key={bIdx} className="my-8 rounded-2xl overflow-hidden border border-border bg-muted/20 group/img">
                                          <img 
                                            src={block.src} 
                                            alt={block.alt} 
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover/img:scale-[1.02]" 
                                            referrerPolicy="no-referrer"
                                            onError={(e) => {
                                              const target = e.target as HTMLImageElement;
                                              target.src = `https://picsum.photos/seed/${block.alt || 'tech'}/1200/600`;
                                            }}
                                          />
                                          {block.alt && (
                                            <p className="p-4 text-center text-xs text-muted-foreground italic border-t border-border bg-card/50">
                                              {block.alt}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    case "bullets":
                                      return (
                                        <ul key={bIdx} className="space-y-4 my-6 ml-4">
                                          {(block.value as string[]).map((item, iIdx) => (
                                            <li key={iIdx} className="flex gap-4 text-muted-foreground text-lg font-light leading-relaxed">
                                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                                              <span>{item}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      );
                                    case "code":
                                      return (
                                        <div key={bIdx} className="relative group my-6">
                                          <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                          <pre className="relative p-6 rounded-2xl bg-muted/50 border border-border font-mono text-sm overflow-x-auto text-primary">
                                            <code>{block.value}</code>
                                          </pre>
                                        </div>
                                      );
                                    case "table":
                                      return (
                                        <div key={bIdx} className="my-8 overflow-hidden rounded-2xl border border-border bg-muted/10">
                                          <table className="w-full text-left border-collapse">
                                            <tbody className="divide-y divide-border">
                                              {(block.value as string[][]).map((row, rIdx) => (
                                                <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                                                  {row.map((cell, cIdx) => (
                                                    <td key={cIdx} className={`p-4 text-sm ${cIdx === 0 ? 'font-mono text-primary font-medium w-1/3' : 'text-muted-foreground font-light'}`}>
                                                      {cell}
                                                    </td>
                                                  ))}
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      );
                                    default:
                                      return null;
                                  }
                                })}
                              </div>
                            ) : (
                              <>
                                <p className="text-muted-foreground text-lg leading-relaxed font-light whitespace-pre-wrap">
                                  {section.text}
                                </p>
                                {section.code && (
                                  <div className="relative group">
                                    <div className="absolute -inset-2 bg-primary/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <pre className="relative p-6 rounded-2xl bg-muted/50 border border-border font-mono text-sm overflow-x-auto text-primary">
                                      <code>{section.code}</code>
                                    </pre>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-24 pt-12 border-t border-border text-center">
                    <p className="text-muted-foreground text-sm font-light mb-8">
                      Enjoyed this tutorial? Subscribe to my newsletter for more.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      {selectedArticle.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono text-primary uppercase tracking-widest">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
