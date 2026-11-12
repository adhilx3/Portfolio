import { FALLBACK_REPOS, type GitHubRepo } from '../data/projects';

const CACHE_KEY = 'adhilx3_repos_v1';
const CACHE_TTL_MS = 1000 * 60 * 15;

interface RawGitHubRepo {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  html_url?: unknown;
  language?: unknown;
  stargazers_count?: unknown;
  forks_count?: unknown;
  topics?: unknown;
  updated_at?: unknown;
}

export interface RepoFetchResult {
  repos: GitHubRepo[];
  source: 'live' | 'cache' | 'fallback';
}

const fallbackByName = new Map(FALLBACK_REPOS.map((repo) => [repo.name.toLowerCase(), repo]));

function mapRepo(raw: RawGitHubRepo, index: number): GitHubRepo | null {
  if (typeof raw.name !== 'string' || typeof raw.html_url !== 'string') {
    return null;
  }

  const known = fallbackByName.get(raw.name.toLowerCase());
  const rawDescription = typeof raw.description === 'string' && raw.description.trim() ? raw.description.trim() : null;
  const rawLanguage = typeof raw.language === 'string' && raw.language.trim() ? raw.language.trim() : null;
  const topics = Array.isArray(raw.topics)
    ? raw.topics.filter((t): t is string => typeof t === 'string')
    : known?.topics ?? [];

  return {
    id: typeof raw.id === 'number' ? raw.id : index + 1,
    name: raw.name,
    description: rawDescription ?? known?.description ?? 'Public GitHub repository.',
    url: raw.html_url,
    language: rawLanguage ?? known?.language ?? 'Other',
    stars: typeof raw.stargazers_count === 'number' ? raw.stargazers_count : 0,
    forks: typeof raw.forks_count === 'number' ? raw.forks_count : 0,
    topics,
    updatedAt: typeof raw.updated_at === 'string' ? raw.updated_at : known?.updatedAt ?? '',
  };
}

function readCache(): GitHubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { timestamp?: number; repos?: unknown };
    if (
      typeof parsed.timestamp !== 'number' ||
      Date.now() - parsed.timestamp > CACHE_TTL_MS ||
      !Array.isArray(parsed.repos)
    ) {
      return null;
    }
    return parsed.repos as GitHubRepo[];
  } catch {
    return null;
  }
}

function writeCache(repos: GitHubRepo[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), repos }));
  } catch {
    // Ignore storage quota or restricted environments.
  }
}

export async function fetchPublicRepos(username = 'adhilx3'): Promise<RepoFetchResult> {
  const cached = readCache();
  if (cached && cached.length > 0) {
    return { repos: cached, source: 'cache' };
  }

  const controller = new AbortController();
  const timer = globalThis.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=20`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      return { repos: FALLBACK_REPOS, source: 'fallback' };
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      return { repos: FALLBACK_REPOS, source: 'fallback' };
    }

    const mapped = data
      .map((item, idx) => mapRepo((item ?? {}) as RawGitHubRepo, idx))
      .filter((item): item is GitHubRepo => item !== null);

    if (mapped.length === 0) {
      return { repos: FALLBACK_REPOS, source: 'fallback' };
    }

    writeCache(mapped);
    return { repos: mapped, source: 'live' };
  } catch {
    return { repos: FALLBACK_REPOS, source: 'fallback' };
  } finally {
    globalThis.clearTimeout(timer);
  }
}
