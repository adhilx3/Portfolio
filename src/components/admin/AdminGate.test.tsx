import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminGate } from './AdminGate';

describe('AdminGate component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders PIN prompt correctly', () => {
    const handleAuth = vi.fn();
    const handleExit = vi.fn();

    render(<AdminGate onAuthenticated={handleAuth} onExit={handleExit} />);

    expect(screen.getByText('Portfolio Control Room')).toBeInTheDocument();
    expect(screen.getByLabelText(/SECURITY_PIN/i)).toBeInTheDocument();
  });

  it('calls onAuthenticated when correct default PIN (1337) is entered', () => {
    const handleAuth = vi.fn();
    const handleExit = vi.fn();

    render(<AdminGate onAuthenticated={handleAuth} onExit={handleExit} />);

    const input = screen.getByLabelText(/SECURITY_PIN/i);
    fireEvent.change(input, { target: { value: '1337' } });

    const submitBtn = screen.getByRole('button', { name: /Authenticate/i });
    fireEvent.click(submitBtn);

    expect(handleAuth).toHaveBeenCalledTimes(1);
  });

  it('shows error message and tracks attempts on incorrect PIN', () => {
    const handleAuth = vi.fn();
    const handleExit = vi.fn();

    render(<AdminGate onAuthenticated={handleAuth} onExit={handleExit} />);

    const input = screen.getByLabelText(/SECURITY_PIN/i);
    fireEvent.change(input, { target: { value: '0000' } });

    const submitBtn = screen.getByRole('button', { name: /Authenticate/i });
    fireEvent.click(submitBtn);

    expect(handleAuth).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toHaveTextContent(/Invalid access PIN/i);
  });

  it('calls onExit when Public Site button is clicked', () => {
    const handleAuth = vi.fn();
    const handleExit = vi.fn();

    render(<AdminGate onAuthenticated={handleAuth} onExit={handleExit} />);

    const exitBtn = screen.getByRole('button', { name: /Public Site/i });
    fireEvent.click(exitBtn);

    expect(handleExit).toHaveBeenCalledTimes(1);
  });
});
