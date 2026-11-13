import { useCallback, useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactFooter } from './components/ContactFooter';
import { FlagshipProjects } from './components/FlagshipProjects';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectDrawer } from './components/ProjectDrawer';
import { RepoExplorer } from './components/RepoExplorer';
import { SkillsSection } from './components/SkillsSection';
import { DashboardApp } from './components/admin/DashboardApp';
import type { FlagshipProject } from './data/projects';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useScrollReveal } from './hooks/useScrollReveal';
import { usePortfolioContent } from './hooks/usePortfolioContent';

export default function App() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<FlagshipProject | null>(null);
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/admin' || window.location.hash === '#admin';
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const { content } = usePortfolioContent();
  const handleCloseDrawer = useCallback(() => setSelectedProject(null), []);

  const handleOpenAdmin = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/admin');
    }
    setIsAdminRoute(true);
  }, []);

  const handleCloseAdmin = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
    }
    setIsAdminRoute(false);
  }, []);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const isNowAdmin = window.location.pathname === '/admin' || window.location.hash === '#admin';
      setIsAdminRoute(isNowAdmin);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut Ctrl+Shift+A to toggle operator console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminRoute((prev) => {
          const next = !prev;
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', next ? '/admin' : '/');
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useScrollReveal(rootRef, prefersReducedMotion);

  if (isAdminRoute) {
    return <DashboardApp onExit={handleCloseAdmin} />;
  }

  return (
    <div ref={rootRef} className="app-shell">
      <div className="scroll-spine" aria-hidden="true">
        <div className="scroll-spine-fill" data-scroll-spine />
      </div>

      <Navbar />

      <main>
        <Hero />
        <AboutSection roadmap={content.roadmap} />
        <FlagshipProjects projects={content.flagshipProjects} onInspect={setSelectedProject} />
        <RepoExplorer />
        <SkillsSection />
      </main>

      <ContactFooter onOpenAdmin={handleOpenAdmin} />

      <ProjectDrawer
        project={selectedProject}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}

