import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, GitFork, Star } from 'lucide-react';
import { FALLBACK_REPOS, type GitHubRepo } from '../data/projects';
import { fetchPublicRepos } from '../services/github';

const FILTER_OPTIONS = ['All', 'Python', 'JavaScript', 'CSS', 'Other'] as const;

export function RepoExplorer() {
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [source, setSource] = useState<'live' | 'cache' | 'fallback'>('fallback');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    let active = true;
    fetchPublicRepos('adhilx3').then((result) => {
      if (!active) return;
      setRepos(result.repos);
      setSource(result.source);
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredRepos = useMemo(() => {
    if (activeFilter === 'All') return repos;
    if (activeFilter === 'Other') {
      return repos.filter(
        (repo) => !['Python', 'JavaScript', 'CSS'].includes(repo.language),
      );
    }
    return repos.filter(
      (repo) => repo.language.toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [repos, activeFilter]);

  const statusLabel =
    source === 'live'
      ? `Synced live from GitHub (${repos.length} repos)`
      : source === 'cache'
        ? `Cached GitHub snapshot (${repos.length} repos)`
        : `Verified repository index (${repos.length} repos)`;

  return (
    <section className="explorer-band" aria-labelledby="explorer-heading">
      <div className="container">
        <div className="section-header-bar" data-reveal>
          <h2 id="explorer-heading" className="section-heading">
            All GitHub <span className="section-heading--red">Repositories</span>
          </h2>
          <a
            href="https://github.com/adhilx3?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <span>Open github.com/adhilx3</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="explorer-controls" data-reveal>
          <div className="filter-group" role="group" aria-label="Filter repositories by language">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter}
                type="button"
                className="filter-btn"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <p className="sync-status tabular-nums" aria-live="polite">
            <span className="sync-dot" aria-hidden="true" />
            <span>{statusLabel}</span>
          </p>
        </div>

        <ul className="repo-table" data-reveal>
          {filteredRepos.map((repo) => (
            <li key={repo.name} className="repo-row">
              <div>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-name-link"
                >
                  <span>{repo.name}</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-meta tabular-nums">
                <span className="repo-lang">{repo.language}</span>
                <span className="repo-stat" aria-label={`${repo.stars} stars`}>
                  <Star size={14} aria-hidden="true" />
                  <span>{repo.stars}</span>
                </span>
                <span className="repo-stat" aria-label={`${repo.forks} forks`}>
                  <GitFork size={14} aria-hidden="true" />
                  <span>{repo.forks}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
