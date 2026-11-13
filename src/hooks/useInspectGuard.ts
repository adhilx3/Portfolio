import { useEffect } from 'react';

export function useInspectGuard(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // 1. Intercept Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Allow right-click inside input/textarea so text copy/paste still works
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      e.preventDefault();
    };

    // 2. Intercept DevTools Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Preserve Ctrl+Shift+A for Portfolio Admin Console
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        return;
      }

      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        // Ctrl+Shift+I (DevTools Elements), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspector)
        if (
          e.shiftKey &&
          (e.key.toLowerCase() === 'i' ||
            e.key.toLowerCase() === 'j' ||
            e.key.toLowerCase() === 'c')
        ) {
          e.preventDefault();
          return;
        }

        // Ctrl+U (View Source)
        if (e.key.toLowerCase() === 'u') {
          e.preventDefault();
          return;
        }

        // Ctrl+S (Save Page HTML)
        if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          return;
        }
      }
    };

    // 3. InfoSec Security Console Easter Egg for Recruiters & Mentors
    try {
      console.log(
        '%c[ ADHIL PAROKKOT // SECURITY OPERATIONS CONSOLE ]',
        'color: #E11D2E; font-size: 16px; font-weight: 800; font-family: monospace; padding: 4px 0;',
      );
      console.log(
        '%c"The only way to learn security is to practice it, legally and ethically."',
        'color: #F6F5F1; font-size: 12px; font-style: italic;',
      );
      console.log(
        '%cCEH In Preparation | Adv. Diploma in InfoSec | GitHub: https://github.com/adhilx3',
        'color: #A3A29E; font-size: 11px; font-family: monospace;',
      );
    } catch {
      // Ignore in environments without console
    }

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);
}
