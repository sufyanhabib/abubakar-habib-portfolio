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
import { useEffect, useLayoutEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Lazy load heavy sections
const LazyExperience = lazy(() => import("@/sections/Experience").then(m => ({ default: m.Experience })));
const LazyProjects = lazy(() => import("@/sections/Projects").then(m => ({ default: m.Projects })));
const LazyArticles = lazy(() => import("@/sections/Articles").then(m => ({ default: m.Articles })));
const LazyContact = lazy(() => import("@/sections/Contact").then(m => ({ default: m.Contact })));

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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">Loading Experience...</div>}>
          <LazyExperience />
        </Suspense>
        <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">Loading Projects...</div>}>
          <LazyProjects />
        </Suspense>
        <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">Loading Articles...</div>}>
          <LazyArticles />
        </Suspense>
        <Suspense fallback={<div className="h-[50vh] flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">Loading Contact...</div>}>
          <LazyContact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/dossier" element={<NinjaProfilePage />} />
        </Routes>
      </BrowserRouter>
    </SoundProvider>
  );
}
