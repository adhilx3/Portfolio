import { ArrowUpRight, Terminal } from 'lucide-react';
import { PROFILE } from '../data/profile';

export function SkillsSection() {
  return (
    <section id="skills" className="paper-band" aria-labelledby="skills-heading">
      <div className="container">
        <div className="section-header-bar" style={{ borderColor: 'var(--rule-light)' }} data-reveal>
          <h2 id="skills-heading" className="section-heading">
            Technical <span className="section-heading--red">Arsenal</span>
          </h2>
          <p className="section-intro" style={{ color: 'var(--ink-dark-muted)' }}>
            Core languages, security tooling, and operational focus areas practiced across
            coursework, personal builds, and hands-on lab environments.
          </p>
        </div>

        <div className="skills-grid">
          {PROFILE.skills.map((group) => (
            <div key={group.category} className="skill-column" data-skill-col>
              <h3 className="skill-cat">{group.category}</h3>
              <p className="skill-summary">{group.summary}</p>
              <ul className="skill-items" aria-label={group.category}>
                {group.items.map((item) => (
                  <li key={item} className="skill-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="thm-banner" data-reveal>
          <div className="thm-banner-copy">
            <h3>Hands-On Practice on TryHackMe</h3>
            <p>
              Applying TCP/IP analysis, web exploitation basics, and Linux privilege escalation in
              legal, authorized CTF and defensive lab rooms.
            </p>
          </div>

          <a
            href={PROFILE.contact.tryhackme}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            <Terminal size={17} aria-hidden="true" />
            <span>Inspect TryHackMe Profile</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
