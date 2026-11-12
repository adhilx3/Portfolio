import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';

const BARCODE_WIDTHS = [2, 6, 3, 10, 2, 4, 8, 2, 5, 2, 12, 3, 2, 7];

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-barcode-field" data-hero-barcode aria-hidden="true">
        {BARCODE_WIDTHS.map((width, idx) => (
          <span
            key={`${width}-${idx}`}
            className={`hero-barcode-bar${idx === 3 || idx === 10 ? ' hero-barcode-bar--red' : ''}`}
            style={{ width: `${width}px` }}
          />
        ))}
      </div>

      <div className="container">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              <span className="hero-title-line" data-hero-line>
                {PROFILE.firstName}
              </span>
              <span className="hero-title-line hero-title-line--red" data-hero-line>
                {PROFILE.lastName}
              </span>
            </h1>

            <div className="hero-rule" data-hero-rule aria-hidden="true" />

            <p className="hero-statement" data-hero-line>
              {PROFILE.role} &amp; {PROFILE.subtitle}. Pursuing an Advanced Diploma in Information
              Security and preparing for CEH—building practical security tools in Python, C++, and
              JavaScript.
            </p>

            <div className="hero-actions" data-hero-line>
              <a href="#projects" className="btn btn-primary">
                <span>Inspect Flagship Work</span>
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <span>GitHub ({PROFILE.handle})</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <aside className="hero-aside" aria-label="Profile overview" data-hero-line>
            <div className="hero-fact">
              <span className="hero-fact-key">Focus</span>
              <span className="hero-fact-val">Defensive &amp; Offensive Fundamentals</span>
            </div>
            <div className="hero-fact">
              <span className="hero-fact-key">Credential Track</span>
              <span className="hero-fact-val">Adv. Diploma · CEH (In Prep)</span>
            </div>
            <div className="hero-fact">
              <span className="hero-fact-key">Base</span>
              <span className="hero-fact-val">{PROFILE.location}</span>
            </div>
            <div className="hero-fact">
              <span className="hero-fact-key">Status</span>
              <span className="hero-fact-val">Open to Internships &amp; Junior Roles</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

