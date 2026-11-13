import { FLAGSHIP_PROJECTS } from '../data/projects';
import { PROFILE } from '../data/profile';
import type { DynamicContent, RoadmapMilestone, AdminConfig } from '../types/content';

export const CONTENT_STORAGE_KEY = 'adhil_portfolio_content_v1';
export const ADMIN_CONFIG_STORAGE_KEY = 'adhil_admin_config_v1';
export const CONTENT_UPDATED_EVENT = 'adhil_content_updated';

export const DEFAULT_CONFIG: AdminConfig = {
  repoOwner: 'adhilx3',
  repoName: 'Portfolio',
  branch: 'main',
  filePath: 'public/data/content.json',
};

/**
 * Returns the verified default seed content based on static files.
 */
export function getDefaultContent(): DynamicContent {
  const defaultRoadmap: RoadmapMilestone[] = PROFILE.learningRoadmap.map((item, idx) => ({
    id: `milestone-${idx + 1}`,
    topic: item.topic,
    category:
      item.topic.toLowerCase().includes('ceh') || item.topic.toLowerCase().includes('pentest')
        ? 'CEH'
        : item.topic.toLowerCase().includes('network')
          ? 'Networking'
          : 'InfoSec',
    status: item.status === 'completed' ? 'completed' : 'in-progress',
    progressPercent: item.status === 'completed' ? 100 : 65,
    detail: item.detail,
  }));

  // Add active DNS recon scanner to tool roadmap
  defaultRoadmap.push({
    id: 'milestone-dns-recon',
    topic: 'DNS Hygiene & Email Spoofing Recon Scanner',
    category: 'Tooling',
    status: 'in-progress',
    progressPercent: 85,
    detail: 'SPF/DMARC/DKIM email spoofing scanner, DNSSEC validator, and automated scoring CLI.',
    targetDate: '2026-Q4',
  });

  return {
    version: 1,
    lastUpdated: new Date().toISOString(),
    flagshipProjects: [...FLAGSHIP_PROJECTS],
    roadmap: defaultRoadmap,
    stats: {
      toolsBuilt: FLAGSHIP_PROJECTS.length + 1, // existing 5 + dns-recon
      labsCompleted: 45,
      domainsMastered: 8,
    },
  };
}

/**
 * Validates whether an object conforms to DynamicContent.
 */
export function isValidContent(obj: unknown): obj is DynamicContent {
  if (!obj || typeof obj !== 'object') return false;
  const c = obj as DynamicContent;
  return (
    typeof c.version === 'number' &&
    Array.isArray(c.flagshipProjects) &&
    Array.isArray(c.roadmap) &&
    typeof c.stats === 'object' &&
    c.stats !== null
  );
}

/**
 * Loads content with 3-tier fallback:
 * 1. localStorage draft/custom data
 * 2. Static bundled /data/content.json
 * 3. Default seed from verified static files
 */
export async function loadContent(): Promise<DynamicContent> {
  // 1. Check local storage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(CONTENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isValidContent(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fall through to network
    }
  }

  // 2. Fetch bundled file
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch('/data/content.json', {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (isValidContent(data)) {
          saveLocalContent(data, false); // save without dispatching update storm
          return data;
        }
      }
    } catch {
      // Fall through to defaults
    }
  }

  // 3. Defaults
  return getDefaultContent();
}

/**
 * Saves content to localStorage and dispatches change event for live hooks.
 */
export function saveLocalContent(content: DynamicContent, dispatchEvent = true): void {
  if (typeof window === 'undefined' || !window.localStorage) return;

  const toSave: DynamicContent = {
    ...content,
    lastUpdated: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(toSave));
    if (dispatchEvent) {
      window.dispatchEvent(new CustomEvent(CONTENT_UPDATED_EVENT, { detail: toSave }));
    }
  } catch (err) {
    console.error('Failed to save content to localStorage', err);
  }
}

/**
 * Resets local data back to initial defaults.
 */
export function resetToDefaults(): DynamicContent {
  const defaults = getDefaultContent();
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_UPDATED_EVENT, { detail: defaults }));
  }
  return defaults;
}

/**
 * Admin configuration storage (GitHub Token, repo target).
 */
export function loadAdminConfig(): AdminConfig {
  if (typeof window === 'undefined' || !window.localStorage) return DEFAULT_CONFIG;
  try {
    const raw = window.localStorage.getItem(ADMIN_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch {
    // fallback
  }
  return DEFAULT_CONFIG;
}

export function saveAdminConfig(config: Partial<AdminConfig>): AdminConfig {
  const current = loadAdminConfig();
  const merged: AdminConfig = { ...current, ...config };
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(ADMIN_CONFIG_STORAGE_KEY, JSON.stringify(merged));
    } catch (err) {
      console.error('Failed to save admin config', err);
    }
  }
  return merged;
}

/**
 * Converts unicode string to UTF-8 base64.
 */
function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16)),
    ),
  );
}

/**
 * Publishes content directly to GitHub repository via GitHub REST API.
 */
export async function publishToGitHub(
  content: DynamicContent,
  token: string,
  configOverrides?: Partial<AdminConfig>,
): Promise<{ commitSha: string; commitUrl: string }> {
  const config = { ...loadAdminConfig(), ...configOverrides };
  const { repoOwner, repoName, branch, filePath } = config;

  if (!token) {
    throw new Error('GitHub Personal Access Token is required to publish.');
  }

  const endpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
  const authHeaders = {
    Authorization: `Bearer ${token.trim()}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // 1. Get existing file SHA if present
  let existingSha: string | undefined;
  try {
    const checkRes = await fetch(`${endpoint}?ref=${branch}`, {
      headers: authHeaders,
    });
    if (checkRes.ok) {
      const fileMeta = await checkRes.json();
      existingSha = fileMeta.sha;
    }
  } catch {
    // New file, proceed without sha
  }

  // 2. Prepare payload
  const jsonContent = JSON.stringify(content, null, 2);
  const base64Content = utf8ToBase64(jsonContent);

  const payload: {
    message: string;
    content: string;
    branch: string;
    sha?: string;
  } = {
    message: `chore(content): update portfolio projects & roadmap (${new Date().toLocaleDateString()})`,
    content: base64Content,
    branch,
  };

  if (existingSha) {
    payload.sha = existingSha;
  }

  // 3. Commit file
  const putRes = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!putRes.ok) {
    const errBody = await putRes.json().catch(() => ({}));
    throw new Error(
      errBody.message || `GitHub publish failed with HTTP ${putRes.status}: ${putRes.statusText}`,
    );
  }

  const result = await putRes.json();
  return {
    commitSha: result.commit?.sha || '',
    commitUrl: result.commit?.html_url || `https://github.com/${repoOwner}/${repoName}`,
  };
}
