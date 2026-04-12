import { Section } from "@/components/Section";
import { portfolioData } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <Section id="skills" title="Technical Arsenal" subtitle="A multi-disciplinary toolkit for modern engineering.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioData.skills.map((skillGroup, i) => (
          <Card key={skillGroup.category} className="bg-secondary/30 border-border/50 hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              <div className="mb-6 p-3 bg-primary/10 rounded-xl w-fit">
                <skillGroup.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-6">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <Badge key={item} variant="secondary" className="bg-background/50 font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
