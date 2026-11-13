import { useState } from 'react';
import { Plus, CheckCircle2, Clock, CircleDot, Trash2 } from 'lucide-react';
import type { RoadmapMilestone, PortfolioStats, MilestoneCategory, MilestoneStatus } from '../../types/content';

interface RoadmapTrackerProps {
  milestones: RoadmapMilestone[];
  stats: PortfolioStats;
  onMilestonesChange: (milestones: RoadmapMilestone[]) => void;
  onStatsChange: (stats: PortfolioStats) => void;
}

export function RoadmapTracker({
  milestones,
  stats,
  onMilestonesChange,
  onStatsChange,
}: RoadmapTrackerProps) {
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState<MilestoneCategory>('CEH');
  const [newStatus, setNewStatus] = useState<MilestoneStatus>('in-progress');
  const [newProgress, setNewProgress] = useState(50);
  const [newDetail, setNewDetail] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newDetail.trim()) return;

    const newItem: RoadmapMilestone = {
      id: `milestone-${Date.now()}`,
      topic: newTopic.trim(),
      category: newCategory,
      status: newStatus,
      progressPercent: newStatus === 'completed' ? 100 : newProgress,
      detail: newDetail.trim(),
    };

    onMilestonesChange([...milestones, newItem]);
    setNewTopic('');
    setNewDetail('');
    setNewProgress(50);
    setIsAdding(false);
  };

  const handleUpdateStatus = (id: string, status: MilestoneStatus) => {
    onMilestonesChange(
      milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              status,
              progressPercent: status === 'completed' ? 100 : m.progressPercent === 100 ? 50 : m.progressPercent,
            }
          : m,
      ),
    );
  };

  const handleUpdateProgress = (id: string, percent: number) => {
    onMilestonesChange(
      milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              progressPercent: percent,
              status: percent === 100 ? 'completed' : m.status === 'completed' ? 'in-progress' : m.status,
            }
          : m,
      ),
    );
  };

  const handleDeleteMilestone = (id: string) => {
    onMilestonesChange(milestones.filter((m) => m.id !== id));
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Curriculum &amp; Training Roadmap</h2>
          <p className="admin-section-subtitle">
            Track your CEH v12 preparation, Advanced Diploma coursework, TryHackMe labs, and active defensive tool builds.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus size={16} aria-hidden="true" />
          <span>{isAdding ? 'Cancel' : 'Add Milestone'}</span>
        </button>
      </div>

      {/* Quick Metrics Bar */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-label">Verified Security Tools</span>
          <div className="admin-stat-input-wrap">
            <input
              type="number"
              min={0}
              value={stats.toolsBuilt}
              onChange={(e) => onStatsChange({ ...stats, toolsBuilt: Number(e.target.value) })}
              className="admin-stat-input"
            />
            <span className="admin-stat-unit">Built</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">TryHackMe Labs &amp; CTFs</span>
          <div className="admin-stat-input-wrap">
            <input
              type="number"
              min={0}
              value={stats.labsCompleted}
              onChange={(e) => onStatsChange({ ...stats, labsCompleted: Number(e.target.value) })}
              className="admin-stat-input"
            />
            <span className="admin-stat-unit">Completed</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <span className="admin-stat-label">Knowledge Domains</span>
          <div className="admin-stat-input-wrap">
            <input
              type="number"
              min={0}
              value={stats.domainsMastered}
              onChange={(e) => onStatsChange({ ...stats, domainsMastered: Number(e.target.value) })}
              className="admin-stat-input"
            />
            <span className="admin-stat-unit">Mastered</span>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAddMilestone} className="admin-inline-form">
          <h3 className="admin-form-subheading">New Curriculum Milestone</h3>
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="ms-topic">Topic / Milestone Name *</label>
              <input
                id="ms-topic"
                type="text"
                required
                placeholder="e.g. CEH Module 3: Scanning Networks"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label htmlFor="ms-cat">Category</label>
              <select
                id="ms-cat"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as MilestoneCategory)}
              >
                <option value="CEH">CEH</option>
                <option value="InfoSec">InfoSec Diploma</option>
                <option value="Tooling">Security Tooling</option>
                <option value="Networking">Networking</option>
                <option value="Labs">TryHackMe Labs</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="ms-status">Status</label>
              <select
                id="ms-status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as MilestoneStatus)}
              >
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="planned">Planned</option>
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="ms-pct">Progress ({newProgress}%)</label>
              <input
                id="ms-pct"
                type="range"
                min={0}
                max={100}
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="ms-detail">Description / Key Competencies *</label>
            <textarea
              id="ms-detail"
              rows={2}
              required
              placeholder="What hands-on skills or lab targets were covered?"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
            />
          </div>

          <div className="admin-inline-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Milestone
            </button>
          </div>
        </form>
      )}

      {/* Milestones List */}
      <div className="admin-milestones-list">
        {milestones.map((m) => {
          const isDone = m.status === 'completed';
          return (
            <article key={m.id} className="admin-milestone-card">
              <div className="milestone-status-indicator">
                {isDone ? (
                  <CheckCircle2 size={20} className="icon-done" aria-label="Completed" />
                ) : m.status === 'in-progress' ? (
                  <CircleDot size={20} className="icon-progress" aria-label="In Progress" />
                ) : (
                  <Clock size={20} className="icon-planned" aria-label="Planned" />
                )}
              </div>

              <div className="milestone-content">
                <div className="milestone-header">
                  <h3 className="milestone-title">{m.topic}</h3>
                  <span className="milestone-category-pill">{m.category}</span>
                  <span className={`milestone-status-badge status-${m.status}`}>
                    {m.status.toUpperCase()}
                  </span>
                </div>

                <p className="milestone-detail">{m.detail}</p>

                <div className="milestone-progress-bar-wrap">
                  <div className="milestone-progress-bar">
                    <div
                      className="milestone-progress-fill"
                      style={{ width: `${m.progressPercent}%` }}
                    />
                  </div>
                  <span className="milestone-progress-pct">{m.progressPercent}%</span>
                </div>
              </div>

              <div className="milestone-actions">
                <select
                  value={m.status}
                  onChange={(e) => handleUpdateStatus(m.id, e.target.value as MilestoneStatus)}
                  className="milestone-status-select"
                  aria-label={`Change status for ${m.topic}`}
                >
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                </select>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={m.progressPercent}
                  onChange={(e) => handleUpdateProgress(m.id, Number(e.target.value))}
                  className="milestone-progress-slider"
                  aria-label={`Adjust progress percentage for ${m.topic}`}
                />

                <button
                  type="button"
                  className="btn btn-danger btn-icon-only"
                  onClick={() => handleDeleteMilestone(m.id)}
                  aria-label={`Delete milestone ${m.topic}`}
                  title="Remove Milestone"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
