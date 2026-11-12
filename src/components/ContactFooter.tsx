import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, ShieldCheck } from 'lucide-react';
import { PROFILE } from '../data/profile';

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

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(PROFILE.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
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
                {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                <span>{copied ? 'Copied' : 'Copy Email'}</span>
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
        </div>
      </div>
    </footer>
  );
}
