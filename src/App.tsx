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
import { NinjaProfilePage } from "@/pages/NinjaProfilePage";
import { ShinobiBackToTop } from "@/components/ShinobiBackToTop";
import { useEffect, useLayoutEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top on route change or refresh
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Articles />
        <Contact />
      </main>
      <Footer />
      <ShinobiBackToTop threshold={350} />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <SoundProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/dossier" element={<NinjaProfilePage />} />
          </Routes>
        </BrowserRouter>
      </SoundProvider>
    </MotionConfig>
  );
}
