import Link from 'next/link';
import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleHamburger = () => setNavOpen((open) => !open);
  const closeNav = () => setNavOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link className="logo" href="/" onClick={closeNav}>
          AI News
        </Link>
        <nav className="nav" aria-label="Main Navigation">
          <button
            className="hamburger"
            aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={navOpen}
            onClick={handleHamburger}
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`nav-list${navOpen ? ' open' : ''}`}>
            <li>
              <Link className="navLink" href="/" onClick={closeNav}>
                Home
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/topics" onClick={closeNav}>
                Topics
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/insights" onClick={closeNav}>
                Insights
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/about" onClick={closeNav}>
                About
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/support" onClick={closeNav}>
                Support Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <DarkModeToggle />
          <Link className="cta-button" href="/subscribe" onClick={closeNav}>
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}