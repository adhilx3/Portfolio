import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { ProjectDrawer } from './ProjectDrawer';
import { FLAGSHIP_PROJECTS } from '../data/projects';

describe('Adhil Parokkot Portfolio App', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Offline fallback test')),
    );
  });

  it('renders Adhil Parokkot identity, honest CEH preparation status, and preserved section anchors', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Adhil/i);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Parokkot/i);
    expect(screen.getByText(/In Preparation/i)).toBeInTheDocument();
    expect(screen.getByText(/Currently Studying/i)).toBeInTheDocument();

    expect(document.getElementById('about')).toBeInTheDocument();
    expect(document.getElementById('projects')).toBeInTheDocument();
    expect(document.getElementById('skills')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/V-Scan-by-dazai/i)).toBeInTheDocument();
    });
  });

  it('opens the architecture drawer for a flagship project and closes it on Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    const inspectButtons = screen.getAllByRole('button', { name: /Inspect Architecture/i });
    await user.click(inspectButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(/V-Scan/i);
    expect(dialog).toHaveTextContent(/SHA-256/i);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('filters GitHub repositories by language accurately', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /V-Scan-by-dazai/i })).toBeInTheDocument();
    });

    const jsFilter = screen.getByRole('button', { name: /^JavaScript/i });
    await user.click(jsFilter);

    expect(screen.getByRole('link', { name: /^Some$/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /V-Scan-by-dazai/i })).not.toBeInTheDocument();

    const allFilter = screen.getByRole('button', { name: /^All/i });
    await user.click(allFilter);
    expect(screen.getByRole('link', { name: /V-Scan-by-dazai/i })).toBeInTheDocument();
  });

  it('copies email to clipboard and falls back gracefully if clipboard API rejects', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<App />);

    const copyBtn = screen.getByRole('button', { name: /Copy Email/i });
    await user.click(copyBtn);

    expect(writeText).toHaveBeenCalledWith('adhilsaju3551@gmail.com');
    expect(screen.getByText(/Copied/i)).toBeInTheDocument();

    // Verify graceful fallback on clipboard error
    writeText.mockRejectedValueOnce(new Error('Clipboard blocked'));
    await user.click(copyBtn);
    expect(screen.getByText(/adhilsaju3551@gmail\.com/i)).toBeInTheDocument();
  });

  it('does not show Copied when navigator.clipboard is unavailable', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
    });

    render(<App />);

    const copyBtn = screen.getByRole('button', { name: /Copy Email/i });
    await user.click(copyBtn);

    expect(screen.queryByText(/^Copied$/i)).not.toBeInTheDocument();
  });

  it('traps Tab focus inside ProjectDrawer and preserves inner focus across onClose identity changes', async () => {
    const user = userEvent.setup();
    const project = FLAGSHIP_PROJECTS[0];
    const { rerender } = render(<ProjectDrawer project={project} onClose={() => {}} />);

    const closeTopBtn = screen.getByRole('button', { name: /Close architecture inspection/i });
    const repoLink = screen.getByRole('link', { name: /Open Repository on GitHub/i });
    const closeBottomBtn = screen.getByRole('button', { name: /^Close$/i });

    expect(closeTopBtn).toHaveFocus();

    // Shift+Tab from first focusable element wraps to last focusable element
    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(closeBottomBtn).toHaveFocus();

    // Tab from last focusable element wraps back to first
    await user.keyboard('{Tab}');
    expect(closeTopBtn).toHaveFocus();

    // Moving focus to repoLink must survive parent rerender with a new onClose reference
    repoLink.focus();
    expect(repoLink).toHaveFocus();
    rerender(<ProjectDrawer project={project} onClose={() => {}} />);
    expect(repoLink).toHaveFocus();
  });

  it('opens Operator Console when footer button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const consoleBtn = screen.getByRole('button', { name: /Operator Console/i });
    await user.click(consoleBtn);

    expect(screen.getByText('Portfolio Control Room')).toBeInTheDocument();
  });
});

