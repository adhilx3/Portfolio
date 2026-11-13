import { useState, useEffect } from 'react';
import { Shield, Wrench, MapPin, UploadCloud, ExternalLink, LogOut } from 'lucide-react';
import type { DynamicContent, FlagshipProject, RoadmapMilestone, PortfolioStats } from '../../types/content';
import { loadContent, saveLocalContent } from '../../services/contentStorage';
import { AdminGate } from './AdminGate';
import { ProjectStudio } from './ProjectStudio';
import { RoadmapTracker } from './RoadmapTracker';
import { PublishCenter } from './PublishCenter';
import './Dashboard.css';

interface DashboardAppProps {
  onExit: () => void;
}

export function DashboardApp({ onExit }: DashboardAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'roadmap' | 'publish'>('projects');
  const [content, setContent] = useState<DynamicContent | null>(null);

  useEffect(() => {
    loadContent().then(setContent);
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminGate
        onAuthenticated={() => setIsAuthenticated(true)}
        onExit={onExit}
      />
    );
  }

  if (!content) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Loading security telemetry &amp; content store...</p>
      </div>
    );
  }

  const handleProjectsChange = (updatedProjects: FlagshipProject[]) => {
    const updated: DynamicContent = {
      ...content,
      flagshipProjects: updatedProjects,
      stats: {
        ...content.stats,
        toolsBuilt: updatedProjects.length,
      },
    };
    setContent(updated);
    saveLocalContent(updated);
  };

  const handleMilestonesChange = (updatedMilestones: RoadmapMilestone[]) => {
    const updated: DynamicContent = {
      ...content,
      roadmap: updatedMilestones,
    };
    setContent(updated);
    saveLocalContent(updated);
  };

  const handleStatsChange = (updatedStats: PortfolioStats) => {
    const updated: DynamicContent = {
      ...content,
      stats: updatedStats,
    };
    setContent(updated);
    saveLocalContent(updated);
  };

  return (
    <div className="admin-shell">
      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-brand">
            <span className="admin-brand-icon">
              <Shield size={18} aria-hidden="true" />
            </span>
            <div>
              <h1 className="admin-brand-title">Adhil Parokkot</h1>
              <span className="admin-brand-tag">PORTFOLIO_CONTROL_ROOM // v1.2</span>
            </div>
          </div>

          <nav className="admin-tabs" aria-label="Dashboard views">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <Wrench size={15} aria-hidden="true" />
              <span>Security Tools ({content.flagshipProjects.length})</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
              onClick={() => setActiveTab('roadmap')}
            >
              <MapPin size={15} aria-hidden="true" />
              <span>Curriculum &amp; Labs</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'publish' ? 'active' : ''}`}
              onClick={() => setActiveTab('publish')}
            >
              <UploadCloud size={15} aria-hidden="true" />
              <span>Deploy &amp; Sync</span>
            </button>
          </nav>

          <div className="admin-nav-actions">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onExit}
              title="Return to Public Portfolio"
            >
              <span>Public Site</span>
              <ExternalLink size={14} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-icon-only btn-sm"
              onClick={() => setIsAuthenticated(false)}
              aria-label="Lock Console"
              title="Lock Console"
            >
              <LogOut size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-main container">
        {activeTab === 'projects' && (
          <ProjectStudio
            projects={content.flagshipProjects}
            onProjectsChange={handleProjectsChange}
          />
        )}

        {activeTab === 'roadmap' && (
          <RoadmapTracker
            milestones={content.roadmap}
            stats={content.stats}
            onMilestonesChange={handleMilestonesChange}
            onStatsChange={handleStatsChange}
          />
        )}

        {activeTab === 'publish' && (
          <PublishCenter
            content={content}
            onContentReset={setContent}
          />
        )}
      </main>
    </div>
  );
}
