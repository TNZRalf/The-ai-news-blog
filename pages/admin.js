import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import FileUpload from '../components/FileUpload';
import { requireAuth, logout } from '../lib/auth';

function MigrationPanel() {
  const [migrationStatus, setMigrationStatus] = useState('idle');
  const [migrationResult, setMigrationResult] = useState(null);
  const [stats, setStats] = useState(null);

  const handleMigration = async () => {
    setMigrationStatus('running');
    try {
      const response = await fetch('/api/migrate-blog-content', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Migration failed');
      }
      
      const result = await response.json();
      setMigrationResult(result);
      setMigrationStatus('completed');
      
      // Refresh stats
      fetchStats();
    } catch (error) {
      console.error('Migration error:', error);
      setMigrationStatus('error');
      setMigrationResult({ error: error.message });
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/article-stats');
      if (response.ok) {
        const statsData = await response.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  React.useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="migration-panel">
      <h3>📝 Content Migration</h3>
      <p>Migrate blog content from JSON file and download images automatically.</p>
      
      <div className="migration-stats">
        {stats && (
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.totalArticles}</span>
              <span className="stat-label">Total Articles</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Math.round(stats.totalWordCount / 1000)}K</span>
              <span className="stat-label">Total Words</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.totalImages}</span>
              <span className="stat-label">Images</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.totalSources}</span>
              <span className="stat-label">Sources</span>
            </div>
          </div>
        )}
      </div>

      <div className="migration-actions">
        <button 
          onClick={handleMigration}
          disabled={migrationStatus === 'running'}
          className={`migration-btn ${migrationStatus === 'running' ? 'running' : ''}`}
        >
          {migrationStatus === 'running' ? '🔄 Migrating...' : '▶️ Start Migration'}
        </button>
      </div>

      {migrationStatus === 'running' && (
        <div className="migration-progress">
          <div className="progress-indicator">
            <div className="spinner"></div>
            <span>Processing articles, downloading images, and applying fallbacks when needed...</span>
          </div>
        </div>
      )}

      {migrationResult && (
        <div className={`migration-result ${migrationStatus === 'error' ? 'error' : 'success'}`}>
          {migrationStatus === 'error' ? (
            <>
              <h4>❌ Migration Failed</h4>
              <p>{migrationResult.error}</p>
            </>
          ) : (
            <>
              <h4>✅ Migration Completed</h4>
              <ul>
                <li>Total articles in source: {migrationResult.totalArticles}</li>
                <li>Successfully converted: {migrationResult.convertedArticles}</li>
                <li>Original images downloaded: {migrationResult.imagesDownloaded}</li>
                {migrationResult.fallbacksUsed > 0 && (
                  <li>Fallback images used: {migrationResult.fallbacksUsed}</li>
                )}
                <li>Total articles with images: {migrationResult.totalWithImages || migrationResult.convertedArticles}</li>
              </ul>
            </>
          )}
        </div>
      )}

      <div className="migration-sources">
        <h4>📊 Content Sources</h4>
        {stats && stats.sources && (
          <div className="sources-list">
            {stats.sources.map((source, index) => (
              <span key={index} className="source-tag">
                {source.name} ({source.count})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPanel({ articles }) {
  const [activeTab, setActiveTab] = useState('content');

  const handleUploadComplete = (files) => {
    console.log('Uploaded files:', files);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>Admin Panel – The AI NEWS</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="admin-container">
        <div className="admin-header">
          <div className="admin-header-content">
            <h1 className="admin-title">📊 Admin Panel</h1>
            <p className="admin-subtitle">Content management and analytics dashboard</p>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="admin-nav">
          <button 
            className={`nav-tab ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            📝 Content
          </button>
          <button 
            className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Upload
          </button>
          <button 
            className={`nav-tab ${activeTab === 'migration' ? 'active' : ''}`}
            onClick={() => setActiveTab('migration')}
          >
            🔄 Migration
          </button>
          <button 
            className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'content' && (
            <div className="content-panel">
              <h2>📝 Content Management</h2>
              <div className="content-overview">
                <div className="overview-grid">
                  <div className="overview-card">
                    <h3>📊 Articles</h3>
                    <p className="overview-number">{articles.length}</p>
                    <p className="overview-label">Total Articles</p>
                  </div>
                  <div className="overview-card">
                    <h3>🏷️ Tags</h3>
                    <p className="overview-number">
                      {[...new Set(articles.flatMap(a => a.tags || []))].length}
                    </p>
                    <p className="overview-label">Unique Tags</p>
                  </div>
                  <div className="overview-card">
                    <h3>📰 Sources</h3>
                    <p className="overview-number">
                      {[...new Set(articles.map(a => a.source).filter(Boolean))].length}
                    </p>
                    <p className="overview-label">Content Sources</p>
                  </div>
                  <div className="overview-card">
                    <h3>📝 Words</h3>
                    <p className="overview-number">
                      {Math.round(articles.reduce((sum, a) => sum + (a.wordCount || 0), 0) / 1000)}K
                    </p>
                    <p className="overview-label">Total Words</p>
                  </div>
                </div>
              </div>
              
              <div className="recent-articles">
                <h3>Recent Articles</h3>
                <div className="articles-list">
                  {articles.slice(0, 5).map(article => (
                    <div key={article.id} className="article-item">
                      <div className="article-info">
                        <h4 className="article-title">{article.title}</h4>
                        <p className="article-meta">
                          By {article.author} · {article.date} · {article.source}
                        </p>
                        <div className="article-tags">
                          {(article.tags || []).slice(0, 3).map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="article-actions">
                        <Link href={`/${article.slug}`} className="action-btn view">
                          👁️ View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="upload-panel">
              <h2>📤 File Upload</h2>
              <p>Upload content files, images, or other media assets.</p>
              <FileUpload onUploadComplete={handleUploadComplete} />
            </div>
          )}

          {activeTab === 'migration' && <MigrationPanel />}

          {activeTab === 'analytics' && (
            <div className="analytics-panel">
              <h2>📈 Analytics</h2>
              <p>Content performance and engagement metrics.</p>
              
              <div className="analytics-grid">
                <div className="analytics-card">
                  <h3>📊 Content Distribution</h3>
                  <div className="content-stats">
                    {[...new Set(articles.map(a => a.source).filter(Boolean))].map(source => {
                      const count = articles.filter(a => a.source === source).length;
                      const percentage = Math.round((count / articles.length) * 100);
                      return (
                        <div key={source} className="source-stat">
                          <span className="source-name">{source}</span>
                          <span className="source-count">{count} ({percentage}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="analytics-card">
                  <h3>🏷️ Popular Tags</h3>
                  <div className="tag-stats">
                    {Object.entries(
                      articles.reduce((acc, article) => {
                        (article.tags || []).forEach(tag => {
                          acc[tag] = (acc[tag] || 0) + 1;
                        });
                        return acc;
                      }, {})
                    )
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([tag, count]) => (
                      <div key={tag} className="tag-stat">
                        <span className="tag-name">{tag}</span>
                        <span className="tag-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>📈 Content Quality</h3>
                  <div className="quality-stats">
                    <div className="quality-metric">
                      <span className="metric-label">Avg. Word Count</span>
                      <span className="metric-value">
                        {Math.round(articles.reduce((sum, a) => sum + (a.wordCount || 0), 0) / articles.length)}
                      </span>
                    </div>
                    <div className="quality-metric">
                      <span className="metric-label">Articles with Images</span>
                      <span className="metric-value">
                        {articles.filter(a => a.image).length}/{articles.length}
                      </span>
                    </div>
                    <div className="quality-metric">
                      <span className="metric-label">Avg. Quality Score</span>
                      <span className="metric-value">
                        {(articles.reduce((sum, a) => sum + (a.qualityScore || 0), 0) / articles.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Admin({ articles }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await requireAuth();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>🔐 Admin Access Required</h1>
          <p>Please authenticate to access the admin panel.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="login-retry-btn"
          >
            🔄 Retry Authentication
          </button>
        </div>
      </div>
    );
  }

  return <AdminPanel articles={articles} />;
}

export async function getStaticProps() {
  // Import articles only in server-side function
  const { getAllArticles } = await import('../lib/articles');
  const articles = getAllArticles();
  
  return {
    props: {
      articles
    }
  };
}