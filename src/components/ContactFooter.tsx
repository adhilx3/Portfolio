import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, ShieldCheck, Terminal } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface ContactFooterProps {
  onOpenAdmin?: () => void;
}

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    handle: 'adhil-parokkot-86b688380',
    href: PROFILE.contact.linkedin,
  },
  {
    label: 'GitHub',
    handle: `@${PROFILE.handle}`,
    href: PROFILE.contact.github,
  },
  {
    label: 'TryHackMe',
    handle: 'adhil.parokkot',
    href: PROFILE.contact.tryhackme,
  },
  {
    label: 'Instagram',
    handle: PROFILE.contact.instagramHandle,
    href: PROFILE.contact.instagram,
  },
] as const;

function fallbackCopyText(text: string): boolean {
  if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
    return false;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(textarea);
  }
  return ok;
}

export function ContactFooter({ onOpenAdmin }: ContactFooterProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'unavailable'>('idle');

  const handleCopyEmail = async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(PROFILE.contact.email);
        setCopyStatus('copied');
        window.setTimeout(() => setCopyStatus('idle'), 2400);
        return;
      } catch {
        // Fall through to legacy fallback.
      }
    }

    if (fallbackCopyText(PROFILE.contact.email)) {
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2400);
      return;
    }

    setCopyStatus('unavailable');
    window.setTimeout(() => setCopyStatus('idle'), 3000);
  };

  return (
    <footer id="contact" className="contact-band" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-grid">
          <div data-reveal>
            <h2 id="contact-heading" className="section-heading">
              Let&apos;s <span className="section-heading--red">Connect</span>
            </h2>
            <p className="contact-lead">
              {PROFILE.availability}. Reach out to discuss security internships, junior analyst
              opportunities, or technical collaborations.
            </p>

            <div className="contact-email-box">
              <a href={`mailto:${PROFILE.contact.email}`} className="btn btn-primary">
                <Mail size={17} aria-hidden="true" />
                <span>{PROFILE.contact.email}</span>
              </a>
              <button
                type="button"
                className="btn btn-outline"
                aria-label="Copy Email"
                onClick={handleCopyEmail}
              >
                {copyStatus === 'copied' ? (
                  <Check size={17} aria-hidden="true" />
                ) : (
                  <Copy size={17} aria-hidden="true" />
                )}
                <span>
                  {copyStatus === 'copied'
                    ? 'Copied'
                    : copyStatus === 'unavailable'
                      ? 'Use Email Link'
                      : 'Copy Email'}
                </span>
              </button>
            </div>
          </div>

          <div className="contact-links-panel" data-reveal>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-link-row"
              >
                <span className="contact-link-left">
                  <span>{link.label}</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="contact-link-handle">{link.handle}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="ethics-footer">
          <p className="ethics-quote" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={17} color="#e11d2e" aria-hidden="true" />
            <span>&ldquo;{PROFILE.ethicsQuote}&rdquo;</span>
          </p>
          <p>{PROFILE.ethicsNote}</p>

          {onOpenAdmin && (
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={onOpenAdmin}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(246, 245, 241, 0.45)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                }}
              >
                <Terminal size={13} aria-hidden="true" />
                <span>Operator Console [Ctrl+Shift+A]</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
