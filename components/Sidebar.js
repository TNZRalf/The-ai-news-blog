import React from 'react';
import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';
import { SidebarAd } from './AdSense';

export default function Sidebar({ articles = [] }) {
  // Generate dynamic popular tags from articles using same logic as topics page
  const tagCounts = {};
  
  // Define topics to exclude (not relevant for AI news blog)
  const excludedTopics = ['image', 'text', 'framework', 'api', 'scikit-learn', 'interpretability'];
  
  // Define most relevant topics for AI news blog (in priority order)
  const priorityTopics = [
    'ai', 
    'artificial intelligence', 
    'machine learning', 
    'neural network', 
    'research', 
    'security', 
    'llm',
    'data science'
  ];
  
  articles.forEach(article => {
    if (article.tags) {
      article.tags.forEach(tag => {
        // Only include relevant topics for AI news blog
        const normalizedTag = tag.toLowerCase();
        if (!excludedTopics.includes(normalizedTag)) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    }
  });
  
  // Sort tags by relevance and frequency (same logic as topics page)
  const allTags = Object.keys(tagCounts).sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    
    // First, prioritize topics in our priority list
    const aPriority = priorityTopics.indexOf(aLower);
    const bPriority = priorityTopics.indexOf(bLower);
    
    if (aPriority !== -1 && bPriority !== -1) {
      return aPriority - bPriority; // Sort by priority order
    } else if (aPriority !== -1) {
      return -1; // a is priority, b is not
    } else if (bPriority !== -1) {
      return 1; // b is priority, a is not
    } else {
      // Both are not priority topics, sort by frequency
      return tagCounts[b] - tagCounts[a];
    }
  });
  
  // Get top 7 most relevant tags for sidebar
  const popularTags = allTags.slice(0, 7);

  return (
    <aside className="sidebar" role="complementary" aria-label="Sidebar content">
      <section className="sidebar-section">
        <h3 className="sidebar-title">Newsletter</h3>
        <NewsletterSignup />
      </section>
      
      {/* Sidebar ad - high visibility placement */}
      <SidebarAd adSlot="1931869002" />
      
      <section className="sidebar-section">
        <h3 className="sidebar-title">Popular Tags</h3>
        <div className="sidebar-tags" role="list" aria-label="Popular article tags">
          {popularTags.map((tag, index) => (
            <Link 
              href={`/topics?filter=${encodeURIComponent(tag.toLowerCase())}`}
              key={index} 
              className="sidebar-tag"
              role="listitem"
              aria-label={`View articles tagged with ${tag}`}
            >
              {tag}
            </Link>
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
      <SidebarAd adSlot="8631889160" />
    </aside>
  );
} 