import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, Star, Code, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  type: string;
  codeUrl: string;
  liveUrl: string;
  image: string;
}

export interface ProjectCardProps {
  project: Project;
}

interface GitHubMetadata {
  stars: number;
  description: string;
  language: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  const [githubData, setGithubData] = useState<GitHubMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(project.type === "github");

  useEffect(() => {
    if (project.type === "github") {
      const fetchRepoData = async () => {
        try {
          // Extract owner and repo from codeUrl
          const parts = project.codeUrl.replace("https://github.com/", "").split("/");
          if (parts.length >= 2) {
            const [owner, repo] = parts;
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
            if (response.ok) {
              const data = await response.json();
              setGithubData({
                stars: data.stargazers_count,
                description: data.description,
                language: data.language
              });
            }
          }
        } catch (error) {
          console.error("Error fetching GitHub data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchRepoData();
    }
  }, [project.codeUrl, project.type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="group overflow-hidden bg-secondary/10 border-border/50 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
        <div className="aspect-video overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-colors duration-500" />
          
          {/* Type Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge variant={project.type === "github" ? "default" : "secondary"} className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 backdrop-blur-md bg-opacity-80">
              {project.type === "github" ? (
                <span className="flex items-center gap-1.5"><Github className="h-3 w-3" /> GitHub</span>
              ) : (
                <span className="flex items-center gap-1.5"><Code className="h-3 w-3" /> CodePen</span>
              )}
            </Badge>
          </div>

          {/* GitHub Stars Overlay */}
          {project.type === "github" && githubData && (
            <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-primary">
                <Star className="h-3 w-3 fill-primary" />
                <span>{githubData.stars}</span>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6 lg:p-8 flex-grow">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[9px] uppercase tracking-widest font-mono border-primary/20 text-primary/80">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {isLoading ? "Fetching repository details..." : (githubData?.description || project.description)}
          </p>
        </CardContent>

        <CardFooter className="p-6 lg:p-8 pt-0 flex gap-3 mt-auto">
          {project.type === "github" ? (
            <>
              <Button variant="outline" size="sm" className="flex-1 rounded-xl h-11 border-white/10 hover:bg-white/5 group/btn" asChild>
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                  <Github className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" /> Code
                </a>
              </Button>
              {project.liveUrl && (
                <Button size="sm" className="flex-1 rounded-xl h-11 bg-primary hover:bg-primary/90 group/btn" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" /> Live
                  </a>
                </Button>
              )}
            </>
          ) : (
            <Button variant="outline" size="sm" className="w-full rounded-xl h-11 border-primary/20 hover:bg-primary/10 text-primary group/btn" asChild>
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                <Eye className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" /> View Pen
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
});
