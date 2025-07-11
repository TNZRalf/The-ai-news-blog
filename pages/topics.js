import React, { useState } from "react";
import Head from "next/head";
import ArticleGrid from "../components/ArticleGrid";
import { BannerAd } from "../components/AdSense";
import { getAllArticles } from "../lib/articles";

export default function Topics({ articles }) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique tags from all articles
  const allTags = [...new Set(articles.flatMap(article => article.tags || []))];
  
  // Filter articles based on selected topic and search query
  const filteredArticles = articles.filter(article => {
    // Topic filter
    const topicMatch = selectedTopic === 'all' || 
      (article.tags && article.tags.some(tag => 
        tag.toLowerCase() === selectedTopic.toLowerCase()
      ));
    
    // Search filter
    const searchMatch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags && article.tags.some(tag => 
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
      (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return topicMatch && searchMatch;
  });

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      <Head>
        <title>Topics – The AI NEWS</title>
        <meta name="description" content="Browse AI articles by topic: Machine Learning, ChatGPT, AI Ethics, Healthcare AI, Deep Learning, and more. Find exactly what you're looking for in artificial intelligence." />
        <meta property="og:title" content="Topics – The AI NEWS" />
        <meta property="og:description" content="Browse AI articles by topic: Machine Learning, ChatGPT, AI Ethics, Healthcare AI, Deep Learning, and more. Find exactly what you're looking for." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/topics" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Topics – The AI NEWS" />
        <meta name="twitter:description" content="Browse AI articles by topic: Machine Learning, ChatGPT, AI Ethics, Healthcare AI, Deep Learning, and more." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/topics" />
      </Head>
      
      <div className="content-container topics-main">
        <section className="topics-header">
          <h1 className="section-title">Topics</h1>
          <p className="section-description">
            Discover articles by topic. Filter by your interests to find the most relevant AI news and insights.
          </p>
        </section>

        {/* Ad placement after header - high visibility */}
        <BannerAd adSlot="3333333333" />

        <section className="topics-search">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search articles by title, content, or tags..."
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
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </section>

        <section className="topics-filter">
          <h2 className="topics-filter-title">Filter by Topic</h2>
          <div className="topics-filter-buttons">
            <button 
              className={`topics-filter-btn ${selectedTopic === 'all' ? 'active' : ''}`}
              onClick={() => handleTopicChange('all')}
            >
              All Topics ({articles.length})
            </button>
            {allTags.map((tag) => {
              const count = articles.filter(article => 
                article.tags && article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
              ).length;
              return (
                <button 
                  key={tag}
                  className={`topics-filter-btn ${selectedTopic === tag ? 'active' : ''}`}
                  onClick={() => handleTopicChange(tag)}
                >
                  {tag} ({count})
                </button>
              );
            })}
          </div>
        </section>

        {/* Ad placement before results - captures engaged users */}
        <BannerAd adSlot="4444444444" />

        <section className="topics-results">
          <div className="topics-results-header">
            <h2 className="topics-results-title">
              {searchQuery ? (
                `Search Results (${filteredArticles.length})`
              ) : selectedTopic === 'all' ? (
                `All Articles (${filteredArticles.length})`
              ) : (
                `${selectedTopic} Articles (${filteredArticles.length})`
              )}
            </h2>
            {(searchQuery || selectedTopic !== 'all') && (
              <div className="active-filters">
                {searchQuery && (
                  <span className="filter-tag">
                    Search: "{searchQuery}"
                    <button onClick={clearSearch} className="filter-remove">×</button>
                  </span>
                )}
                {selectedTopic !== 'all' && (
                                      <span className="filter-tag">
                      Topic: {selectedTopic}
                      <button onClick={() => handleTopicChange('all')} className="filter-remove">×</button>
                    </span>
                )}
              </div>
            )}
          </div>
          
          {filteredArticles.length === 0 ? (
            <div className="no-results">
              <p>No articles found matching your criteria.</p>
              <p>Try adjusting your search terms or topic filters.</p>
            </div>
          ) : (
            <ArticleGrid 
              articles={filteredArticles} 
              title={searchQuery ? "Search Results" : selectedTopic === 'all' ? "All Articles" : `${selectedTopic} Articles`}
            />
          )}
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: {
      articles,
    },
  };
} 