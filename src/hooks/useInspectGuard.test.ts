import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInspectGuard } from './useInspectGuard';

describe('useInspectGuard hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('blocks standard contextmenu right-click on body', () => {
    renderHook(() => useInspectGuard(true));

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it('permits right-click inside an input element for copy/paste', () => {
    renderHook(() => useInspectGuard(true));

    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    input.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();

    document.body.removeChild(input);
  });

  it('blocks F12 shortcut', () => {
    renderHook(() => useInspectGuard(true));

    const event = new KeyboardEvent('keydown', { key: 'F12', cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it('blocks Ctrl+Shift+I (DevTools Inspect)', () => {
    renderHook(() => useInspectGuard(true));

    const event = new KeyboardEvent('keydown', {
      key: 'I',
      ctrlKey: true,
      shiftKey: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it('blocks Ctrl+U (View Source)', () => {
    renderHook(() => useInspectGuard(true));

    const event = new KeyboardEvent('keydown', {
      key: 'u',
      ctrlKey: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });

  it('preserves Ctrl+Shift+A for Portfolio Admin Console', () => {
    renderHook(() => useInspectGuard(true));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      shiftKey: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    window.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
