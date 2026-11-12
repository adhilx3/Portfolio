import { useEffect, useRef } from 'react';
import { ArrowUpRight, ShieldAlert, X } from 'lucide-react';
import type { FlagshipProject } from '../data/projects';

interface ProjectDrawerProps {
  project: FlagshipProject | null;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!project) return undefined;

    const previousFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocused?.focus();
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="drawer-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCloseRef.current();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-project-title"
        className="drawer-panel"
      >
        <div className="drawer-top">
          <div>
            <h2 id="drawer-project-title" className="section-heading" style={{ fontSize: '2.5rem' }}>
              {project.title}
            </h2>
            <p className="drawer-label" style={{ marginTop: '0.35rem' }}>
              {project.category} · {project.repoName}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="drawer-close-btn"
            aria-label="Close architecture inspection"
            onClick={() => onCloseRef.current()}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="drawer-block">
          <span className="drawer-label">Purpose &amp; Mechanism</span>
          <p>{project.summary}</p>
          <p style={{ color: 'var(--ink-dark-muted)' }}>{project.mechanism}</p>
        </div>

        <div className="drawer-block">
          <span className="drawer-label">Architecture &amp; Engineering Decisions</span>
          <ul className="drawer-list">
            {project.architecture.map((line) => (
              <li key={line}>
                <span className="drawer-bullet" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="drawer-block">
          <span className="drawer-label">Security Concepts Applied</span>
          <p>{project.securityFocus}</p>
        </div>

        <div className="drawer-block">
          <span className="drawer-label">Stack</span>
          <div className="tech-row">
            {project.tech.map((item) => (
              <span
                key={item}
                className="tech-chip"
                style={{
                  borderColor: 'var(--ink-dark)',
                  color: 'var(--ink-dark)',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {project.legalNote ? (
          <div className="drawer-legal">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              <ShieldAlert size={17} color="#e11d2e" aria-hidden="true" />
              <span>Authorized Use Notice</span>
            </div>
            <p>{project.legalNote}</p>
          </div>
        ) : null}

        <div className="drawer-footer-actions">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            <span>Open Repository on GitHub</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="btn btn-outline"
            style={{ color: 'var(--ink-dark)', borderColor: 'var(--ink-dark)' }}
            onClick={() => onCloseRef.current()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
