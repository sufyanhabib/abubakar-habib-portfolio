import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <Section 
      id="projects" 
      title="Featured Projects" 
      subtitle="A collection of real-world applications and creative experiments from GitHub and CodePen."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </Section>
  );
}
