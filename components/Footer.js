import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const internalLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support' },
    { href: '/topics', label: 'Topics' },
    { href: '/insights', label: 'Insights' }
  ];
  
  const socialLinks = [
    { 
      href: 'https://x.com/the_ainews', 
      label: 'X (Twitter)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
          <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,75.74,109.6,194.4,109.6h0c66.23,0,120-53.77,120-120V156.67A103.25,103.25,0,0,0,247.39,68.94Z"/>
        </svg>
      )
    },
    { 
      href: 'https://www.facebook.com/profile.php?id=61577845109945', 
      label: 'Facebook',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"/>
        </svg>
      )
    },
    { 
      href: 'https://www.instagram.com/the.ainews/', 
      label: 'Instagram',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <nav aria-label="Footer navigation">
          <ul className="footer-nav">
            {internalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <ul className="footer-nav footer-social">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="footer-link footer-social-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${link.label} - opens in new tab`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="copyright">
          <p>© {currentYear} The AI NEWS. All rights reserved.</p>
          <p>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
            {' • '}
            <a href="mailto:the.ainews0@gmail.com" className="footer-link">
              the.ainews0@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
} 