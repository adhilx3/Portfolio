import { ArrowUpRight, FileSearch } from 'lucide-react';
import { FLAGSHIP_PROJECTS, type FlagshipProject } from '../data/projects';

interface FlagshipProjectsProps {
  onInspect: (project: FlagshipProject) => void;
}

export function FlagshipProjects({ onInspect }: FlagshipProjectsProps) {
  return (
    <section id="projects" className="dark-band" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-header-bar" data-reveal>
          <h2 id="projects-heading" className="section-heading">
            Flagship <span className="section-heading--red">Tools</span>
          </h2>
          <p className="section-intro">
            Security utilities, automation pipelines, and defensive bots built while studying
            InfoSec and CEH fundamentals. Open any tool to review its internal architecture and
            authorized-use scope.
          </p>
        </div>

        <div className="flagship-list">
          {FLAGSHIP_PROJECTS.map((project) => (
            <article key={project.id} className="flagship-row" data-dossier-row>
              <div className="flagship-title-wrap">
                <h3 className="flagship-title">{project.title}</h3>
                <p className="flagship-category">{project.category}</p>
                <p className="flagship-cmd">{project.commandHint}</p>
              </div>

              <div className="flagship-body">
                <p className="flagship-summary">{project.summary}</p>
                <p className="flagship-mechanism">{project.mechanism}</p>
                <ul className="tech-row" aria-label={`${project.title} technologies`}>
                  {project.tech.map((item) => (
                    <li key={item} className="tech-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flagship-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onInspect(project)}
                >
                  <FileSearch size={17} aria-hidden="true" />
                  <span>Inspect Architecture</span>
                </button>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <span>Source Code</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
