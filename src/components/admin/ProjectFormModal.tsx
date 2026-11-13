import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import type { FlagshipProject } from '../../types/content';

interface ProjectFormModalProps {
  isOpen: boolean;
  initialProject?: FlagshipProject | null;
  onClose: () => void;
  onSave: (project: FlagshipProject) => void;
}

export function ProjectFormModal({
  isOpen,
  initialProject,
  onClose,
  onSave,
}: ProjectFormModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [mechanism, setMechanism] = useState('');
  const [architectureText, setArchitectureText] = useState('');
  const [securityFocus, setSecurityFocus] = useState('');
  const [techText, setTechText] = useState('');
  const [commandHint, setCommandHint] = useState('');
  const [legalNote, setLegalNote] = useState('');
  const [repoName, setRepoName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title || '');
      setCategory(initialProject.category || '');
      setSummary(initialProject.summary || '');
      setMechanism(initialProject.mechanism || '');
      setArchitectureText((initialProject.architecture || []).join('\n'));
      setSecurityFocus(initialProject.securityFocus || '');
      setTechText((initialProject.tech || []).join(', '));
      setCommandHint(initialProject.commandHint || '');
      setLegalNote(initialProject.legalNote || '');
      setRepoName(initialProject.repoName || '');
      setRepoUrl(initialProject.repoUrl || '');
    } else {
      // Clean slate
      setTitle('');
      setCategory('');
      setSummary('');
      setMechanism('');
      setArchitectureText('');
      setSecurityFocus('');
      setTechText('');
      setCommandHint('');
      setLegalNote('');
      setRepoName('');
      setRepoUrl('');
    }
    setValidationError(null);
  }, [initialProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !summary.trim() || !repoUrl.trim()) {
      setValidationError('Title, Category, Summary, and Repository URL are required.');
      return;
    }

    const archList = architectureText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const techList = techText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const generatedId =
      initialProject?.id ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const project: FlagshipProject = {
      id: generatedId,
      repoName: repoName.trim() || title.trim(),
      title: title.trim(),
      category: category.trim(),
      summary: summary.trim(),
      mechanism: mechanism.trim() || 'Custom security testing automation.',
      architecture:
        archList.length > 0
          ? archList
          : ['Modular defensive architecture with command parameterization.'],
      securityFocus: securityFocus.trim() || 'Defensive automation and threat triage.',
      tech: techList.length > 0 ? techList : ['Python', 'Security CLI'],
      commandHint: commandHint.trim() || `${title.toLowerCase()} --help`,
      legalNote: legalNote.trim() || undefined,
      repoUrl: repoUrl.trim(),
    };

    onSave(project);
    onClose();
  };

  const handleApplyPresetDns = () => {
    setTitle('dns-recon Scanner');
    setCategory('Email Spoofing & DNS Hygiene Auditing');
    setSummary(
      'Defensive reconnaissance and security auditing tool that assesses target domains for email spoofing susceptibility (SPF, DMARC, DKIM) and critical DNS hygiene vulnerabilities.',
    );
    setMechanism(
      'Parses multi-tier DNS records validating RFC 7208 SPF lookup limits, RFC 7489 DMARC policy enforcement, public DKIM key sizes, and tests for open zone transfers (AXFR).',
    );
    setArchitectureText(
      'SPF validator traces recursive include: statements and checks the 10-lookup threshold to prevent PermError.\nDMARC inspector flags relaxed alignment, partial percentages (pct < 100), and missing reporting (rua).\nAutomated security score generator outputting colored terminal summaries and structured JSON reports.',
    );
    setSecurityFocus(
      'Phishing prevention, DNS infrastructure hygiene, crypto key size audit (<2048-bit RSA flags).',
    );
    setTechText('Python 3.10+, dnspython, Rich Terminal UI, JSON/Markdown Reporting');
    setCommandHint('dns-recon audit --domain target.com --dkim-selector default --json');
    setLegalNote(
      'Performs standard DNS queries and non-destructive zone transfer checks; compliant with passive reconnaissance best practices.',
    );
    setRepoName('Dns-Health-and-Email-Spoofing-Scanner');
    setRepoUrl('https://github.com/adhilx3/Dns-Health-and-Email-Spoofing-Scanner');
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="admin-modal-header">
          <div>
            <h2 id="modal-title" className="admin-modal-title">
              {initialProject ? 'Edit Flagship Tool' : 'Add New Security Tool'}
            </h2>
            <p className="admin-modal-desc">
              Define the architectural dossier, security scope, and execution hints displayed in the Flagship section.
            </p>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {!initialProject && (
          <div className="admin-preset-banner">
            <div>
              <p className="admin-preset-text">
                Working on your new DNS Scanner?
              </p>
              <p className="admin-preset-sub">
                Pre-populate fields with verified `dns-recon` architecture details in one click.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleApplyPresetDns}
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Load dns-recon Preset</span>
            </button>
          </div>
        )}

        {validationError && (
          <div className="admin-form-error" role="alert">
            <AlertCircle size={16} aria-hidden="true" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-modal-form">
          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="proj-title">Tool Title *</label>
              <input
                id="proj-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. V-Scan or dns-recon"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="proj-category">Category / Domain *</label>
              <input
                id="proj-category"
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Malware Triage, DNS Auditing"
              />
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="proj-repo-name">GitHub Repo Name *</label>
              <input
                id="proj-repo-name"
                type="text"
                required
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="e.g. Dns-Health-and-Email-Spoofing-Scanner"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="proj-repo-url">GitHub Repository URL *</label>
              <input
                id="proj-repo-url"
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/adhilx3/..."
              />
            </div>
          </div>

          <div className="admin-field">
            <label htmlFor="proj-summary">Executive Summary *</label>
            <textarea
              id="proj-summary"
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="What does this tool do and who does it protect?"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="proj-mechanism">Core Mechanism</label>
            <textarea
              id="proj-mechanism"
              rows={2}
              value={mechanism}
              onChange={(e) => setMechanism(e.target.value)}
              placeholder="How does it work under the hood? (e.g. SHA-256 hash lookup before upload)"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="proj-arch">
              Architecture Bullet Points (One per line)
            </label>
            <textarea
              id="proj-arch"
              rows={3}
              value={architectureText}
              onChange={(e) => setArchitectureText(e.target.value)}
              placeholder="Line 1: Worker thread separation&#10;Line 2: Rule validation pipeline&#10;Line 3: Structured export format"
            />
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="proj-security">Security Focus</label>
              <input
                id="proj-security"
                type="text"
                value={securityFocus}
                onChange={(e) => setSecurityFocus(e.target.value)}
                placeholder="e.g. Phishing prevention, local key isolation"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="proj-tech">Technologies (Comma separated)</label>
              <input
                id="proj-tech"
                type="text"
                value={techText}
                onChange={(e) => setTechText(e.target.value)}
                placeholder="e.g. Python, dnspython, Rich CLI"
              />
            </div>
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="proj-cmd">CLI Command Hint / Signature</label>
              <input
                id="proj-cmd"
                type="text"
                value={commandHint}
                onChange={(e) => setCommandHint(e.target.value)}
                placeholder="e.g. dns-recon audit --domain example.com"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="proj-legal">Authorized-Use / Legal Note</label>
              <input
                id="proj-legal"
                type="text"
                value={legalNote}
                onChange={(e) => setLegalNote(e.target.value)}
                placeholder="e.g. Strictly intended for authorized security audits."
              />
            </div>
          </div>

          <div className="admin-modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialProject ? 'Update Tool' : 'Save & Add to Flagships'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
