import React from 'react';
import NewsletterSignup from './NewsletterSignup';
import { SidebarAd } from './AdSense';

export default function Sidebar() {
  const tags = [
    'AI',
    'Ethics',
    'Healthcare',
    'Machine Learning',
    'Deep Learning',
    'Automation',
    'Future Tech'
  ];

  return (
    <aside className="sidebar" role="complementary" aria-label="Sidebar content">
      <section className="sidebar-section">
        <h3 className="sidebar-title">Newsletter</h3>
        <NewsletterSignup />
      </section>
      
      {/* Sidebar ad - high visibility placement */}
      <SidebarAd adSlot="1111111111" />
      
      <section className="sidebar-section">
        <h3 className="sidebar-title">Popular Tags</h3>
        <div className="sidebar-tags" role="list" aria-label="Popular article tags">
          {tags.map((tag, index) => (
            <span 
              className="sidebar-tag" 
              key={index} 
              role="listitem"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  console.log(`Clicked tag: ${tag}`);
                }
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
      
      <section className="sidebar-section">
        <h3 className="sidebar-title">Support Us</h3>
        <a 
          className="sidebar-btn" 
          href="/support" 
          aria-label="Support The AI NEWS by making a donation"
        >
          Support The AI NEWS
        </a>
      </section>
      
      {/* Bottom sidebar ad - catches users scrolling down */}
      <SidebarAd adSlot="2222222222" />
    </aside>
  );
} 