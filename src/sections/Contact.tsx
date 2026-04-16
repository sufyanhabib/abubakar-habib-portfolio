import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export function Contact() {
  const { identity } = portfolioData;

  return (
    <Section id="contact" title="Let's Connect" subtitle="Interested in working together or just want to talk tech?" className="px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-6">
            Building the future of <span className="text-primary italic">systems</span> and <span className="text-primary italic">interfaces</span>.
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg mb-10 leading-relaxed">
            I'm currently open to Frontend Developer and Network Engineer roles. If you're looking for an engineer with a systems mindset and a passion for polished UI, let's talk.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</p>
                <a href={`mailto:${identity.email}`} className="text-lg font-medium hover:text-primary transition-colors">
                  {identity.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">GitHub</p>
                <a href={identity.github} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-primary transition-colors">
                  github.com/sufyanhabib
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/20 border border-border/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="How can I help you?"
              />
            </div>
            <Button size="lg" className="w-full rounded-xl py-6 text-xs font-bold uppercase tracking-widest">
              Send Message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
