import { motion } from "motion/react";
import { ArrowRight, BookOpen, Clock, Tag, ChevronRight, Mail, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useSound } from "@/components/SoundProvider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  "All",
  "Frontend",
  "Networking",
  "Systems",
  "AI",
  "Tutorials",
  "Performance"
];

export function Articles() {
  const { articles } = portfolioData as any;
  const { playClick } = useSound();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter((a: any) => a.category === activeCategory || (activeCategory === "Tutorials" && a.title.toLowerCase().includes("guide")));

  const featuredArticle = articles.find((a: any) => a.featured);
  const recentArticles = filteredArticles.filter((a: any) => !a.featured || activeCategory !== "All");

  return (
    <section id="articles" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0d0d12] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em]">Knowledge Hub</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6"
          >
            Technical Insights <span className="text-muted-foreground">&</span> Tutorials
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl text-lg leading-relaxed font-light"
          >
            Exploring the intersection of high-performance frontend engineering, 
            robust network infrastructure, and the future of intelligent systems.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                playClick();
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "bg-foreground/5 border-foreground/10 text-muted-foreground hover:border-primary/50 hover:text-foreground"
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
                
                <div className="relative bg-foreground/[0.03] border border-foreground/10 rounded-3xl p-8 md:p-10 overflow-hidden">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> Featured
                    </span>
                    <span className="text-muted-foreground text-xs font-mono">{featuredArticle.date}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed font-light">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {featuredArticle.readTime}</span>
                      <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> {featuredArticle.category}</span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="group/btn text-primary hover:text-primary hover:bg-primary/10 rounded-full"
                      onClick={() => playClick()}
                    >
                      Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Article List */}
            <div className="space-y-12">
              {recentArticles.map((article: any, i: number) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => playClick()}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-primary font-mono text-[10px] uppercase tracking-wider">{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                        <span className="text-muted-foreground text-[10px] font-mono">{article.date}</span>
                      </div>
                      
                      <h4 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {article.title}
                      </h4>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 font-light">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-mono">
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {article.readTime}</span>
                        <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors">
                          Read More <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 h-px w-full bg-foreground/5 group-hover:bg-primary/20 transition-colors" />
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
              className="bg-foreground/[0.02] border border-foreground/10 rounded-3xl p-8"
            >
              <h4 className="text-sm font-mono font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Writing Focus
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-light">
                I write about building scalable frontend systems, the nuances of network protocols, 
                and practical applications of AI in modern web development.
              </p>
              <div className="space-y-3">
                {["System Architecture", "React Performance", "Network Security", "AI-Driven UX"].map((topic) => (
                  <div key={topic} className="flex items-center gap-3 text-xs text-foreground/80">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    {topic}
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
                <Mail className="h-24 w-24 -rotate-12" />
              </div>
              
              <h4 className="text-lg font-display font-bold mb-3">Stay in the loop</h4>
              <p className="text-sm text-muted-foreground mb-6 font-light">
                Get notified when I publish new tutorials or technical deep-dives. No spam, ever.
              </p>
              
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="w-full bg-background/50 border border-foreground/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:opacity-90">
                  Subscribe
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
              <h4 className="text-sm font-mono font-bold uppercase tracking-widest mb-6">Popular Topics</h4>
              <div className="flex flex-wrap gap-2">
                {["#react", "#networking", "#typescript", "#ai", "#performance", "#security"].map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-foreground/[0.03] border border-foreground/10 text-[10px] font-mono text-muted-foreground hover:text-primary hover:border-primary/30 cursor-pointer transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </section>
  );
}
