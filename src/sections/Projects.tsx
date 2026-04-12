import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="Curated work demonstrating frontend capability and product thinking.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project, i) => (
          <Card key={i} className="group overflow-hidden bg-secondary/20 border-border/50 flex flex-col h-full">
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={`https://picsum.photos/seed/${project.title}/800/450`} 
                alt={project.title} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
            </div>
            <CardContent className="p-8 flex-grow">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[10px] uppercase tracking-wider font-mono">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-1">The Challenge</h4>
                  <p className="text-xs text-muted-foreground">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-primary mb-1">The Solution</h4>
                  <p className="text-xs text-muted-foreground">{project.solution}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-4 pb-6 flex gap-4 mt-auto">
              <Button variant="outline" size="sm" className="flex-1 rounded-full h-10" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                  <Github className="mr-2 h-4 w-4" /> Code
                </a>
              </Button>
              <Button size="sm" className="flex-1 rounded-full h-10" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                  <ExternalLink className="mr-2 h-4 w-4" /> Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
