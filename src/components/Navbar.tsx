import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PROFILE } from '../data/profile';

const NAV_ITEMS = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href="#top" className="brand-mark" aria-label={`${PROFILE.name} home`}>
          <span className="brand-square" aria-hidden="true" />
          <span>{PROFILE.name}</span>
        </a>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          <span>Menu</span>
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary sections"
          className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
