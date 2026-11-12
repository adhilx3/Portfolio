import { useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactFooter } from './components/ContactFooter';
import { FlagshipProjects } from './components/FlagshipProjects';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectDrawer } from './components/ProjectDrawer';
import { RepoExplorer } from './components/RepoExplorer';
import { SkillsSection } from './components/SkillsSection';
import type { FlagshipProject } from './data/projects';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<FlagshipProject | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useScrollReveal(rootRef, prefersReducedMotion);

  return (
    <div ref={rootRef} className="app-shell">
      <div className="scroll-spine" aria-hidden="true">
        <div className="scroll-spine-fill" data-scroll-spine />
      </div>

      <Navbar />

      <main>
        <Hero />
        <AboutSection />
        <FlagshipProjects onInspect={setSelectedProject} />
        <RepoExplorer />
        <SkillsSection />
      </main>

      <ContactFooter />

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
