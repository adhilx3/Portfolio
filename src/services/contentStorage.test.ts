import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getDefaultContent,
  loadContent,
  saveLocalContent,
  resetToDefaults,
  isValidContent,
  loadAdminConfig,
  saveAdminConfig,
  CONTENT_STORAGE_KEY,
  CONTENT_UPDATED_EVENT,
} from './contentStorage';
import type { DynamicContent } from '../types/content';

describe('contentStorage service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('generates valid default content with flagship projects and roadmap', () => {
    const defaults = getDefaultContent();
    expect(defaults.version).toBe(1);
    expect(defaults.flagshipProjects.length).toBeGreaterThanOrEqual(5);
    expect(defaults.roadmap.length).toBeGreaterThanOrEqual(4);
    expect(isValidContent(defaults)).toBe(true);
  });

  it('saves content to localStorage and dispatches window event', () => {
    const listener = vi.fn();
    window.addEventListener(CONTENT_UPDATED_EVENT, listener);

    const testContent: DynamicContent = {
      version: 1,
      lastUpdated: new Date().toISOString(),
      flagshipProjects: [],
      roadmap: [],
      stats: { toolsBuilt: 10, labsCompleted: 50, domainsMastered: 9 },
    };

    saveLocalContent(testContent);

    const stored = localStorage.getItem(CONTENT_STORAGE_KEY);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.stats.toolsBuilt).toBe(10);
    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(CONTENT_UPDATED_EVENT, listener);
  });

  it('loads saved content from localStorage over defaults', async () => {
    const customContent: DynamicContent = {
      version: 1,
      lastUpdated: '2026-11-13T00:00:00.000Z',
      flagshipProjects: [],
      roadmap: [],
      stats: { toolsBuilt: 99, labsCompleted: 100, domainsMastered: 12 },
    };

    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(customContent));

    const loaded = await loadContent();
    expect(loaded.stats.toolsBuilt).toBe(99);
  });

  it('resets to defaults cleanly and notifies listeners', () => {
    const listener = vi.fn();
    window.addEventListener(CONTENT_UPDATED_EVENT, listener);

    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify({ invalid: true }));
    const reset = resetToDefaults();

    expect(localStorage.getItem(CONTENT_STORAGE_KEY)).toBeNull();
    expect(reset.flagshipProjects.length).toBeGreaterThanOrEqual(5);
    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(CONTENT_UPDATED_EVENT, listener);
  });

  it('saves and merges admin config correctly', () => {
    const initial = loadAdminConfig();
    expect(initial.repoOwner).toBe('adhilx3');
    expect(initial.repoName).toBe('Portfolio');

    const updated = saveAdminConfig({ githubToken: 'ghp_test123' });
    expect(updated.githubToken).toBe('ghp_test123');
    expect(updated.repoOwner).toBe('adhilx3');

    const reloaded = loadAdminConfig();
    expect(reloaded.githubToken).toBe('ghp_test123');
  });
});
