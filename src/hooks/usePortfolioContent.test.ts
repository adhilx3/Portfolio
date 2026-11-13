import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePortfolioContent } from './usePortfolioContent';
import { saveLocalContent, resetToDefaults } from '../services/contentStorage';
import type { DynamicContent } from '../types/content';

describe('usePortfolioContent hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('initializes with default content without crashing', async () => {
    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => usePortfolioContent());
    });
    expect(hookResult.result.current.content).toBeDefined();
    expect(hookResult.result.current.content.flagshipProjects.length).toBeGreaterThanOrEqual(5);
  });

  it('updates dynamically when content update event is dispatched', async () => {
    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => usePortfolioContent());
    });

    const updatedData: DynamicContent = {
      version: 1,
      lastUpdated: new Date().toISOString(),
      flagshipProjects: [
        {
          id: 'custom-tool',
          repoName: 'CustomTool',
          title: 'Custom Security Tool',
          category: 'Offensive Security',
          summary: 'Testing summary',
          mechanism: 'Testing mechanism',
          architecture: ['Point 1'],
          securityFocus: 'Focus',
          tech: ['Python'],
          commandHint: 'run tool',
          repoUrl: 'https://github.com/adhilx3/CustomTool',
        },
      ],
      roadmap: [],
      stats: { toolsBuilt: 1, labsCompleted: 10, domainsMastered: 2 },
    };

    act(() => {
      saveLocalContent(updatedData);
    });

    expect(hookResult.result.current.content.flagshipProjects.length).toBe(1);
    expect(hookResult.result.current.content.flagshipProjects[0].title).toBe('Custom Security Tool');

    act(() => {
      resetToDefaults();
    });

    expect(hookResult.result.current.content.flagshipProjects.length).toBeGreaterThanOrEqual(5);
  });
});
