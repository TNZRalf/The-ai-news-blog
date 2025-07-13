import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import ArticleGrid from "../components/ArticleGrid";
import { BannerAd } from "../components/AdSense";

export default function Topics({ articles }) {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTopics, setShowAllTopics] = useState(false);

  // Process tags using useMemo for better performance and availability
  const { tagCounts, allTags, popularTags, remainingTags } = useMemo(() => {
    const tagCountsData = {};
    
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
      'data science',
      'algorithm',
      'classification',
      'news'
    ];
    
    articles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => {
          // Only include relevant topics for AI news blog
          const normalizedTag = tag.toLowerCase();
          if (!excludedTopics.includes(normalizedTag)) {
            tagCountsData[tag] = (tagCountsData[tag] || 0) + 1;
          }
        });
      }
    });
    
    // Sort tags by relevance and frequency
    const sortedTags = Object.keys(tagCountsData).sort((a, b) => {
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
        return tagCountsData[b] - tagCountsData[a];
      }
    });
    
    return {
      tagCounts: tagCountsData,
      allTags: sortedTags,
      popularTags: sortedTags.slice(0, 6),
      remainingTags: sortedTags.slice(6)
    };
  }, [articles]);

  // Handle URL filter parameter (from sidebar links)
  useEffect(() => {
    if (router.isReady && router.query.filter) {
      const filterTopic = router.query.filter;
      // Find the exact tag that matches the filter (case-insensitive)
      const matchingTag = Object.keys(tagCounts).find(tag => 
        tag.toLowerCase() === filterTopic.toLowerCase()
      );
      if (matchingTag) {
        setSelectedTopic(matchingTag);
        // Clear the URL parameter after setting the filter
        router.replace('/topics', undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query.filter, tagCounts, router]);

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
    setShowAllTopics(false); // Close dropdown when selecting
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleTopicsDropdown = () => {
    setShowAllTopics(!showAllTopics);
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
        <BannerAd adSlot="7922562280" />

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
          
          {/* Quick access to popular topics */}
          <div className="topics-quick-access">
            <button 
              className={`topics-filter-btn ${selectedTopic === 'all' ? 'active' : ''}`}
              onClick={() => handleTopicChange('all')}
            >
              All Topics ({articles.length})
            </button>
            {popularTags.map((tag) => {
              const count = tagCounts[tag];
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
            
            {/* Dropdown for all topics */}
            <div className="topics-dropdown-container">
              <button 
                className="topics-dropdown-toggle"
                onClick={toggleTopicsDropdown}
                aria-expanded={showAllTopics}
              >
                More Topics ({remainingTags.length})
                <svg 
                  className={`dropdown-arrow ${showAllTopics ? 'expanded' : ''}`}
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"/>
                </svg>
              </button>
              
              {showAllTopics && (
                <div className="topics-dropdown-menu">
                  {remainingTags.map((tag) => {
                    const count = tagCounts[tag];
                    return (
                      <button 
                        key={tag}
                        className={`topics-dropdown-item ${selectedTopic === tag ? 'active' : ''}`}
                        onClick={() => handleTopicChange(tag)}
                      >
                        <span className="topic-name">{tag}</span>
                        <span className="topic-count">({count})</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Ad placement before results - captures engaged users */}
        <BannerAd adSlot="7922562280" />

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
  // Import articles only in server-side function
  const { getAllArticles } = await import('../lib/articles');
  const articles = getAllArticles();
  return {
    props: {
      articles,
    },
  };
} 