import { useState, useEffect, useCallback } from 'react';
import type { DynamicContent } from '../types/content';
import {
  getDefaultContent,
  loadContent,
  CONTENT_STORAGE_KEY,
  CONTENT_UPDATED_EVENT,
} from '../services/contentStorage';

export function usePortfolioContent() {
  // Synchronous initial state: check localStorage first, else defaults
  const [content, setContent] = useState<DynamicContent>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(CONTENT_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Array.isArray(parsed.flagshipProjects)) {
            return parsed;
          }
        }
      } catch {
        // ignore and fallback
      }
    }
    return getDefaultContent();
  });

  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const fresh = await loadContent();
      setContent(fresh);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<DynamicContent>;
      if (customEvent.detail) {
        setContent(customEvent.detail);
      } else {
        refresh();
      }
    };

    window.addEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    return () => {
      window.removeEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    };
  }, [refresh]);

  return {
    content,
    isLoading,
    refresh,
  };
}
