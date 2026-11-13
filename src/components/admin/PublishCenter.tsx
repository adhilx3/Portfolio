import { useState } from 'react';
import { UploadCloud, Download, Copy, Check, RotateCcw, ExternalLink, AlertTriangle, Key } from 'lucide-react';
import type { DynamicContent, AdminConfig } from '../../types/content';
import {
  publishToGitHub,
  saveAdminConfig,
  loadAdminConfig,
  resetToDefaults,
} from '../../services/contentStorage';

interface PublishCenterProps {
  content: DynamicContent;
  onContentReset: (freshDefaults: DynamicContent) => void;
}

export function PublishCenter({ content, onContentReset }: PublishCenterProps) {
  const [config, setConfig] = useState<AdminConfig>(() => loadAdminConfig());
  const [tokenInput, setTokenInput] = useState(config.githubToken || '');
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{ sha: string; url: string } | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSaveToken = () => {
    const updated = saveAdminConfig({ githubToken: tokenInput.trim() });
    setConfig(updated);
    alert('GitHub Token saved securely in your browser local storage.');
  };

  const handlePublish = async () => {
    const token = tokenInput.trim() || config.githubToken;
    if (!token) {
      setPublishError('GitHub Personal Access Token is required to push to your repository.');
      return;
    }

    setIsPublishing(true);
    setPublishError(null);
    setPublishResult(null);

    try {
      const res = await publishToGitHub(content, token, config);
      setPublishResult({ sha: res.commitSha, url: res.commitUrl });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown publish failure.';
      setPublishError(msg);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adhil-portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = async () => {
    const jsonStr = JSON.stringify(content, null, 2);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(jsonStr);
      } else {
        const ta = document.createElement('textarea');
        ta.value = jsonStr;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert('Failed to copy to clipboard.');
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to revert all custom tools and roadmap progress back to factory defaults?',
      )
    ) {
      const fresh = resetToDefaults();
      onContentReset(fresh);
      alert('Content reset to default portfolio state.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    saveAdminConfig({ pinHash: newPin.trim() });
    setNewPin('');
    setPinSuccess(true);
    setTimeout(() => setPinSuccess(false), 3000);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2 className="admin-section-title">Deployment &amp; Synchronization Center</h2>
          <p className="admin-section-subtitle">
            Publish your project dossiers and training telemetry directly to GitHub and Vercel, or download offline backups.
          </p>
        </div>
      </div>

      <div className="admin-sync-grid">
        {/* GitHub 1-Click Publisher */}
        <div className="admin-sync-card">
          <div className="admin-sync-card-header">
            <UploadCloud size={22} className="sync-icon" aria-hidden="true" />
            <div>
              <h3 className="sync-card-title">Live GitHub &amp; Vercel Sync</h3>
              <p className="sync-card-desc">
                Pushes <code>public/data/content.json</code> directly to <code>{config.repoOwner}/{config.repoName}</code>, triggering an automated Vercel production rebuild.
              </p>
            </div>
          </div>

          <div className="admin-field" style={{ marginTop: '16px' }}>
            <label htmlFor="gh-token">
              GitHub Personal Access Token (repo scope)
            </label>
            <div className="admin-input-btn-group">
              <input
                id="gh-token"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleSaveToken}
              >
                Save Token
              </button>
            </div>
            <p className="admin-field-hint">
              Stored exclusively in your local browser storage. Never transmitted to third-party servers.
            </p>
          </div>

          {publishError && (
            <div className="admin-sync-error" role="alert">
              <AlertTriangle size={18} aria-hidden="true" />
              <span>{publishError}</span>
            </div>
          )}

          {publishResult && (
            <div className="admin-sync-success">
              <Check size={18} aria-hidden="true" />
              <div>
                <p>
                  <strong>Successfully published to GitHub!</strong>
                </p>
                <p>Vercel is now deploying your updated portfolio live.</p>
                <a
                  href={publishResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sync-commit-link"
                >
                  View Commit on GitHub <ExternalLink size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          )}

          <div style={{ marginTop: '16px' }}>
            <button
              type="button"
              disabled={isPublishing}
              className="btn btn-primary"
              onClick={handlePublish}
            >
              <UploadCloud size={17} aria-hidden="true" />
              <span>{isPublishing ? 'Publishing to GitHub...' : 'Publish to Live Site'}</span>
            </button>
          </div>
        </div>

        {/* Offline Backups & Export */}
        <div className="admin-sync-card">
          <div className="admin-sync-card-header">
            <Download size={22} className="sync-icon" aria-hidden="true" />
            <div>
              <h3 className="sync-card-title">Offline Backups &amp; Export</h3>
              <p className="sync-card-desc">
                Download or copy your complete portfolio content configuration as a structured JSON snapshot.
              </p>
            </div>
          </div>

          <div className="admin-backup-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleDownloadJson}
            >
              <Download size={16} aria-hidden="true" />
              <span>Download content.json</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopyJson}
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Raw JSON'}</span>
            </button>
          </div>

          <hr className="admin-divider" />

          {/* Change PIN */}
          <div>
            <h4 className="sync-subheading">
              <Key size={16} aria-hidden="true" />
              <span>Console Access PIN</span>
            </h4>
            <p className="sync-subdesc">
              Change the security PIN required to unlock this management console (default is <code>1337</code>).
            </p>

            <form onSubmit={handleChangePin} className="admin-input-btn-group" style={{ marginTop: '8px' }}>
              <input
                type="password"
                placeholder="New 4-16 digit PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Change PIN
              </button>
            </form>
            {pinSuccess && (
              <p style={{ color: '#22c55e', fontSize: '0.85rem', marginTop: '6px' }}>
                ✓ PIN updated successfully.
              </p>
            )}
          </div>

          <hr className="admin-divider" />

          {/* Factory Reset */}
          <div>
            <h4 className="sync-subheading" style={{ color: 'var(--red-signal)' }}>
              <RotateCcw size={16} aria-hidden="true" />
              <span>Factory Defaults</span>
            </h4>
            <p className="sync-subdesc">
              Clear local overrides and revert the portfolio to verified repository defaults.
            </p>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={handleResetDefaults}
              style={{ marginTop: '8px' }}
            >
              <span>Revert to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
