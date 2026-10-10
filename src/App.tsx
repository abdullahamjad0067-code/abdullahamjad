import { useReducedMotion } from "framer-motion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/hero/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/projects/ProjectsSection";
import { SkillsSection } from "./components/skills/SkillsSection";
import { FocusSection } from "./components/sections/FocusSection";
import { ContactSection } from "./components/sections/ContactSection";

export default function App() {
  const reduce = useReducedMotion();
  useSmoothScroll(!reduce);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <FocusSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
