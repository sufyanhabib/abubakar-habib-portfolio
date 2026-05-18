import { Section } from "@/components/Section";
import { JourneyTimeline } from "@/components/JourneyTimeline";

export function Experience() {
  return (
    <Section 
      id="experience" 
      title="Professional Journey" 
      subtitle="An elegant trajectory of technical growth and systems engineering."
      className="overflow-visible"
    >
      <JourneyTimeline />
    </Section>
  );
}
