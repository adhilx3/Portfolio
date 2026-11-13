import { useState } from 'react';
import { Plus, ArrowUp, ArrowDown, Edit3, Trash2, ExternalLink, Terminal, Shield } from 'lucide-react';
import type { FlagshipProject } from '../../types/content';
import { ProjectFormModal } from './ProjectFormModal';

interface ProjectStudioProps {
  projects: FlagshipProject[];
  onProjectsChange: (projects: FlagshipProject[]) => void;
}

export function ProjectStudio({ projects, onProjectsChange }: ProjectStudioProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<FlagshipProject | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const handleOpenAdd = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (project: FlagshipProject) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the flagship projects list?`)) {
      onProjectsChange(projects.filter((p) => p.id !== id));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const copy = [...projects];
    const item = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = item;
    onProjectsChange(copy);
  };

  const handleSaveProject = (saved: FlagshipProject) => {
    if (editingProject) {
      // Update existing
      onProjectsChange(projects.map((p) => (p.id === saved.id ? saved : p)));
    } else {
      // Prepend to top so new tools immediately get top billing
      onProjectsChange([saved, ...projects]);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(filterQuery.toLowerCase())),
  );

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Security Tools Studio</h2>
          <p className="admin-section-subtitle">
            Manage your flagship offensive & defensive tools. Top-ranked projects appear first on your live portfolio.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenAdd}
        >
          <Plus size={16} aria-hidden="true" />
          <span>Add Security Tool</span>
        </button>
      </div>

      <div className="admin-filter-bar">
        <input
          type="search"
          placeholder="Filter tools by title, domain, or tech..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="admin-search-input"
        />
        <div className="admin-count-badge">
          <span>{filteredProjects.length} of {projects.length} Tools</span>
        </div>
      </div>

      <div className="admin-projects-list">
        {filteredProjects.map((proj, idx) => (
          <article key={proj.id} className="admin-project-card">
            <div className="admin-project-rank">
              <span className="rank-num">#{idx + 1}</span>
              <div className="rank-controls">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="rank-btn"
                  aria-label={`Move ${proj.title} up`}
                >
                  <ArrowUp size={14} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  disabled={idx === projects.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="rank-btn"
                  aria-label={`Move ${proj.title} down`}
                >
                  <ArrowDown size={14} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="admin-project-info">
              <div className="admin-project-top">
                <h3 className="admin-project-title">{proj.title}</h3>
                <span className="admin-category-pill">{proj.category}</span>
                <span className="admin-repo-pill">{proj.repoName}</span>
              </div>

              <p className="admin-project-summary">{proj.summary}</p>

              <div className="admin-project-meta">
                <div className="admin-meta-item">
                  <Terminal size={14} aria-hidden="true" />
                  <code>{proj.commandHint}</code>
                </div>
                <div className="admin-meta-item">
                  <Shield size={14} aria-hidden="true" />
                  <span>{proj.securityFocus}</span>
                </div>
              </div>

              <div className="admin-tech-tags">
                {proj.tech.map((t) => (
                  <span key={t} className="admin-tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="admin-project-actions">
              {proj.repoUrl && (
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-icon-only"
                  aria-label={`View ${proj.title} on GitHub`}
                  title="View on GitHub"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                className="btn btn-secondary btn-icon-only"
                onClick={() => handleOpenEdit(proj)}
                aria-label={`Edit ${proj.title}`}
                title="Edit Dossier"
              >
                <Edit3 size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-icon-only"
                onClick={() => handleDelete(proj.id, proj.title)}
                aria-label={`Delete ${proj.title}`}
                title="Remove Tool"
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}

        {filteredProjects.length === 0 && (
          <div className="admin-empty-state">
            <p>No tools matched your search query.</p>
          </div>
        )}
      </div>

      <ProjectFormModal
        isOpen={modalOpen}
        initialProject={editingProject}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProject}
      />
    </div>
  );
}
