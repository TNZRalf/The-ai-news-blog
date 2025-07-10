import React, { useState } from "react";
import Head from "next/head";
import ArticleGrid from "../components/ArticleGrid";
import { getAllArticles } from "../lib/articles";

export default function Insights({ articles }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on search query
  const filteredArticles = articles.filter(article => {
    if (searchQuery === '') return true;
    
    const searchMatch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
      (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return searchMatch;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <Head>
        <title>Insights – The AI NEWS</title>
        <meta name="description" content="Deep insights and analysis on artificial intelligence trends, ethics, and impact on society from our expert team." />
        <meta property="og:title" content="Insights – The AI NEWS" />
        <meta property="og:description" content="Deep insights and analysis on artificial intelligence trends, ethics, and impact on society from our expert team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/insights" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Insights – The AI NEWS" />
        <meta name="twitter:description" content="Deep insights and analysis on artificial intelligence trends, ethics, and impact on society from our expert team." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/insights" />
      </Head>
      
      <div className="content-container insights-main">
        <section className="insights-header">
          <h1 className="section-title">Insights & Analysis</h1>
          <p className="section-description">
            Deep insights and expert analysis on artificial intelligence trends, ethics, and societal impact.
          </p>
        </section>

        <section className="insights-search">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search insights by title, content, or topics..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="search-clear"
                  aria-label="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="search-results-count">
                {filteredArticles.length} insight{filteredArticles.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </section>

        <section className="insights-results">
          <div className="insights-results-header">
            <h2 className="insights-results-title">
              {searchQuery ? (
                `Search Results (${filteredArticles.length})`
              ) : (
                `All Insights (${filteredArticles.length})`
              )}
            </h2>
            {searchQuery && (
              <div className="active-filters">
                <span className="filter-tag">
                  Search: "{searchQuery}"
                  <button onClick={clearSearch} className="filter-remove">×</button>
                </span>
              </div>
            )}
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="no-results">
              <p>No insights found matching your search criteria.</p>
              <p>Try adjusting your search terms to find more relevant insights.</p>
            </div>
          ) : (
            <ArticleGrid 
              articles={filteredArticles} 
              title={searchQuery ? "Search Results" : "Insights & Analysis"}
            />
          )}
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allArticles = getAllArticles();
  
  // Filter articles related to insights, analysis, ethics, editorial content
  const insightsArticles = allArticles.filter(article => {
    const content = (article.title + ' ' + article.description + ' ' + (article.tags?.join(' ') || '')).toLowerCase();
    return content.includes('insight') || 
           content.includes('analysis') || 
           content.includes('opinion') || 
           content.includes('editorial') || 
           content.includes('ethics') ||
           content.includes('impact') ||
           content.includes('future') ||
           content.includes('trend') ||
           content.includes('perspective') ||
           content.includes('debate') ||
           article.tags?.some(tag => 
             ['insights', 'analysis', 'opinion', 'ethics', 'editorial', 'trends'].includes(tag.toLowerCase())
           );
  });

  return {
    props: {
      articles: insightsArticles
    }
  };
} 