import React, { useState, useEffect } from 'react';
import { ShieldAlert, KeyRound, ArrowLeft, Terminal } from 'lucide-react';
import { loadAdminConfig } from '../../services/contentStorage';

interface AdminGateProps {
  onAuthenticated: () => void;
  onExit: () => void;
}

const DEFAULT_PIN = '1337'; // Default security PIN

export function AdminGate({ onAuthenticated, onExit }: AdminGateProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (attempts >= 5) {
      setIsLocked(true);
      const timer = setTimeout(() => {
        setAttempts(0);
        setIsLocked(false);
        setError(null);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    const config = loadAdminConfig();
    const targetPin = config.pinHash || DEFAULT_PIN;

    if (pin.trim() === targetPin) {
      setError(null);
      onAuthenticated();
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setError(
        nextAttempts >= 5
          ? 'Too many failed attempts. Security lockout active for 30 seconds.'
          : `Invalid access PIN. Attempt ${nextAttempts}/5. (Default PIN: 1337)`,
      );
      setPin('');
    }
  };

  return (
    <div className="admin-gate-overlay">
      <div className="admin-gate-card">
        <div className="admin-gate-header">
          <div className="admin-gate-badges">
            <span className="admin-gate-badge">
              <Terminal size={13} aria-hidden="true" /> CONSOLE_AUTH_V1
            </span>
            <span className="admin-gate-badge admin-gate-badge--sec">SEC_LEVEL_01</span>
          </div>
          <h1 className="admin-gate-title">Portfolio Control Room</h1>
          <p className="admin-gate-subtitle">
            Restricted administrative console for Adhil Parokkot. Enter your access credentials to manage
            featured tools and curriculum roadmap telemetry.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-gate-form">
          <label htmlFor="admin-pin-input" className="admin-gate-label">
            <KeyRound size={15} aria-hidden="true" />
            <span>SECURITY_PIN</span>
          </label>

          <input
            id="admin-pin-input"
            type="password"
            autoFocus
            maxLength={16}
            disabled={isLocked}
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              if (error) setError(null);
            }}
            placeholder="••••"
            className="admin-gate-input"
          />

          {error && (
            <div className="admin-gate-error" role="alert">
              <ShieldAlert size={16} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="admin-gate-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onExit}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Public Site</span>
            </button>

            <button
              type="submit"
              disabled={isLocked || !pin.trim()}
              className="btn btn-primary"
            >
              <span>Authenticate</span>
            </button>
          </div>
        </form>

        <div className="admin-gate-footer">
          <p>
            Default operator PIN: <code>1337</code> (configurable inside console settings).
          </p>
        </div>
      </div>
    </div>
  );
}
