import { JourneyTimeline } from "@/components/JourneyTimeline";

export function Experience() {
  return (
    <section id="experience" className="py-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-visible">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
          Professional Journey
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          An elegant trajectory of technical growth and systems engineering.
        </p>
        <div className="h-1 w-12 bg-primary mt-6" />
      </div>
      <JourneyTimeline />
    </section>
  );
}
