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
import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
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
        <Experience />
        <Projects />
        <Articles />
        <Contact />
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
          <Route path="/ninja-profile" element={<NinjaProfilePage />} />
        </Routes>
      </BrowserRouter>
    </SoundProvider>
  );
}
