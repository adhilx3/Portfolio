import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FALLBACK_REPOS } from '../data/projects';
import { fetchPublicRepos } from './github';

describe('fetchPublicRepos', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches live GitHub repos, maps fields cleanly, and caches them in sessionStorage', async () => {
    const apiPayload = [
      {
        id: 101,
        name: 'V-Scan-by-dazai',
        description: 'Windows VirusTotal scanner',
        html_url: 'https://github.com/adhilx3/V-Scan-by-dazai',
        language: 'Python',
        stargazers_count: 4,
        forks_count: 1,
        topics: ['security', 'virustotal'],
        updated_at: '2026-11-10T10:00:00Z',
        fork: false,
      },
      {
        id: 102,
        name: 'adhilx3',
        description: null,
        html_url: 'https://github.com/adhilx3/adhilx3',
        language: null,
        stargazers_count: 0,
        forks_count: 0,
        topics: [],
        updated_at: '2026-11-01T10:00:00Z',
        fork: false,
      },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => apiPayload,
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchPublicRepos('adhilx3');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.source).toBe('live');
    expect(result.repos[0]).toMatchObject({
      name: 'V-Scan-by-dazai',
      language: 'Python',
      stars: 4,
      forks: 1,
      url: 'https://github.com/adhilx3/V-Scan-by-dazai',
    });
    expect(sessionStorage.getItem('adhilx3_repos_v1')).not.toBeNull();
  });

  it('returns cached repos on subsequent calls without hitting fetch', async () => {
    sessionStorage.setItem(
      'adhilx3_repos_v1',
      JSON.stringify({
        timestamp: Date.now(),
        repos: FALLBACK_REPOS.slice(0, 2),
      }),
    );

    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchPublicRepos('adhilx3');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.source).toBe('cache');
    expect(result.repos).toHaveLength(2);
  });

  it('falls back cleanly to FALLBACK_REPOS when GitHub API returns 403 rate limit', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: async () => ({ message: 'API rate limit exceeded' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchPublicRepos('adhilx3');

    expect(result.source).toBe('fallback');
    expect(result.repos).toEqual(FALLBACK_REPOS);
  });

  it('falls back cleanly to FALLBACK_REPOS when fetch rejects or returns malformed data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ unexpected: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchPublicRepos('adhilx3');

    expect(result.source).toBe('fallback');
    expect(result.repos).toEqual(FALLBACK_REPOS);
  });
});

