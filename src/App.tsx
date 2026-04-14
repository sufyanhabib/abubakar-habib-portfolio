import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Articles } from "@/sections/Articles";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { SoundProvider } from "@/components/SoundProvider";
import { useEffect, useLayoutEffect } from "react";

export default function App() {
  // Disable browser scroll restoration immediately
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  useLayoutEffect(() => {
    // Force scroll to top before paint
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    // Fallback for some browsers or late layout shifts
    const handleLoad = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <SoundProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Articles />
          <Contact />
        </main>
        <Footer />
      </div>
    </SoundProvider>
  );
}
