import { ArrowUpRight, CheckSquare, CircleDot } from 'lucide-react';
import { PROFILE } from '../data/profile';
import type { RoadmapMilestone } from '../types/content';

interface AboutSectionProps {
  roadmap?: RoadmapMilestone[];
}

export function AboutSection({ roadmap }: AboutSectionProps) {
  const displayRoadmap = roadmap && roadmap.length > 0 ? roadmap : null;

  return (
    <section id="about" className="paper-band" aria-labelledby="about-heading">
      <div className="container">
        <h2 id="about-heading" className="section-heading" data-reveal>
          Discipline &amp; <span className="section-heading--red">Training</span>
        </h2>

        <div className="about-layout">
          <div data-reveal>
            <p className="about-bio">{PROFILE.bio}</p>

            <div className="credentials-list">
              {PROFILE.credentials.map((cred) => (
                <div key={cred.title} className="credential-row">
                  <div className="credential-top">
                    <h3 className="credential-title">{cred.title}</h3>
                    <span
                      className={`credential-state${
                        cred.state === 'Active Practice' || cred.state === 'In Preparation'
                          ? ' credential-state--active'
                          : ''
                      }`}
                    >
                      {cred.state}
                    </span>
                  </div>
                  <p className="credential-note">{cred.note}</p>
                  {cred.url ? (
                    <div>
                      <a
                        href={cred.url}
                        target="_blank"
                        rel="noreferrer"
                        className="repo-name-link"
                        style={{ color: 'var(--ink-dark)', fontSize: '0.9rem' }}
                      >
                        <span>View TryHackMe Profile</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="roadmap-panel" data-reveal>
            <h3 className="roadmap-heading">
              <span>Curriculum &amp; Lab Progress</span>
            </h3>
            <ul className="roadmap-items">
              {displayRoadmap
                ? displayRoadmap.map((item) => {
                    const isDone = item.status === 'completed';
                    return (
                      <li key={item.id || item.topic} className="roadmap-item">
                        {isDone ? (
                          <CheckSquare
                            size={18}
                            className="roadmap-icon roadmap-icon--done"
                            aria-label="Completed foundation"
                          />
                        ) : (
                          <CircleDot
                            size={18}
                            className="roadmap-icon"
                            aria-label="Currently studying"
                          />
                        )}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p className="roadmap-topic">{item.topic}</p>
                            {item.progressPercent !== undefined && !isDone && (
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  padding: '2px 6px',
                                  background: 'rgba(225, 29, 46, 0.12)',
                                  color: '#E11D2E',
                                  fontWeight: 600,
                                  fontFamily: 'var(--font-mono)',
                                  border: '1px solid rgba(225, 29, 46, 0.3)',
                                }}
                              >
                                {item.progressPercent}%
                              </span>
                            )}
                          </div>
                          <p className="roadmap-detail">{item.detail}</p>
                        </div>
                      </li>
                    );
                  })
                : PROFILE.learningRoadmap.map((item) => {
                    const isDone = item.status === 'completed';
                    return (
                      <li key={item.topic} className="roadmap-item">
                        {isDone ? (
                          <CheckSquare
                            size={18}
                            className="roadmap-icon roadmap-icon--done"
                            aria-label="Completed foundation"
                          />
                        ) : (
                          <CircleDot
                            size={18}
                            className="roadmap-icon"
                            aria-label="Currently studying"
                          />
                        )}
                        <div>
                          <p className="roadmap-topic">{item.topic}</p>
                          <p className="roadmap-detail">{item.detail}</p>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

