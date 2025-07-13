import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import { getAllArticles, getArticleStats } from '../lib/articles';
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
      <div className="migration-section">
        <h3>🔄 Blog Content Migration</h3>
        <p>
          Migrate articles from <code>blog_content.json</code> to your website format and download images. 
          When original images can't be downloaded, the system automatically uses contextually appropriate fallback images.
        </p>
        
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
      </div>

      {stats && (
        <div className="stats-section">
          <h3>📊 Content Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>{stats.totalArticles}</h4>
              <p>Total Articles</p>
            </div>
            <div className="stat-card">
              <h4>{stats.totalWordCount?.toLocaleString()}</h4>
              <p>Total Words</p>
            </div>
            <div className="stat-card">
              <h4>{stats.articlesWithImages}</h4>
              <p>Articles with Images</p>
            </div>
            <div className="stat-card">
              <h4>{stats.sources?.length || 0}</h4>
              <p>Content Sources</p>
            </div>
          </div>
          
          {stats.sources && stats.sources.length > 0 && (
            <div className="sources-list">
              <h4>Content Sources:</h4>
              <div className="source-tags">
                {stats.sources.map(source => (
                  <span key={source} className="source-tag">{source}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AdminPanel({ articles }) {
  const [activeTab, setActiveTab] = useState('articles');
  const [recentUploads, setRecentUploads] = useState([]);

  const handleUploadComplete = (files) => {
    setRecentUploads(prev => [...files, ...prev]);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>AI News Admin – Content Management</title>
        <meta name="description" content="Manage your AI News content and articles" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-inner">
            <div className="admin-header-section">
              <h1 className="admin-logo">AI News Admin</h1>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                🚪 Logout
              </button>
            </div>
            <nav className="admin-nav">
              <button 
                onClick={() => setActiveTab('articles')}
                className={`admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z" />
                </svg>
                <span>Articles</span>
              </button>
              <button 
                onClick={() => setActiveTab('migration')}
                className={`admin-nav-item ${activeTab === 'migration' ? 'active' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M232,120h-8V96a24,24,0,0,0-24-24H176a24,24,0,0,0-24,24v24h-8a24,24,0,0,0-24,24v56a24,24,0,0,0,24,24h88a24,24,0,0,0,24-24V144A24,24,0,0,0,232,120ZM168,96a8,8,0,0,1,8-8h24a8,8,0,0,1,8,8v24H168ZM240,200a8,8,0,0,1-8,8H144a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h88a8,8,0,0,1,8,8ZM80,72H56A16,16,0,0,0,40,88V216a16,16,0,0,0,16,16H80a16,16,0,0,0,16-16V88A16,16,0,0,0,80,72ZM80,216H56V88H80Z" />
                </svg>
                <span>Migration</span>
              </button>
              <button 
                onClick={() => setActiveTab('uploads')}
                className={`admin-nav-item ${activeTab === 'uploads' ? 'active' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z"/>
                </svg>
                <span>File Upload</span>
              </button>
              <Link href="/admin/settings" className="admin-nav-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3.12-3.12L186-119.64a8,8,0,0,0-3.93-6,107.29,107.29,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.05a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.45a8,8,0,0,0-3.93,6L67.32,64.17q-1.56,1.48-3.12,3.12L40.47,70a8,8,0,0,0-6,3.93,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.05,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.48,1.56,3.12,3.12L70,215.53a8,8,0,0,0,3.93,6,107.29,107.29,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.6,107.6,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3.12-3.12L215.53,186a8,8,0,0,0,6-3.93,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,192a64,64,0,1,1,64-64A64.07,64.07,0,0,1,128,192Z" />
                </svg>
                <span>Settings</span>
              </Link>
            </nav>
          </div>
          <button className="btn-primary admin-new-article-btn">
            New Article
          </button>
        </aside>
        <main className="admin-main-content">
          <header className="admin-header">
            <h2>
              {activeTab === 'articles' ? 'Articles' : 
               activeTab === 'migration' ? 'Content Migration' : 
               'File Upload'}
            </h2>
            <p>
              {activeTab === 'articles' ? 'Manage your website\'s content' : 
               activeTab === 'migration' ? 'Migrate content from blog_content.json and download images' : 
               'Upload images, articles, and documents'}
            </p>
          </header>

          <div className="admin-content-area">
            {activeTab === 'articles' ? (
              <>
                <div className="admin-search-bar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                  <input 
                    type="search"
                    placeholder="Search articles" 
                    aria-label="Search articles"
                  />
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Published Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id}>
                          <td>
                            <div className="admin-table-title">
                              {article.title}
                            </div>
                          </td>
                          <td>{article.author}</td>
                          <td>
                            <span className={`status-badge status-${article.status?.toLowerCase() || 'published'}`}>
                              {article.status || 'Published'}
                            </span>
                          </td>
                          <td>{article.date}</td>
                          <td>
                            <div className="admin-table-actions">
                              <button className="action-btn">Edit</button>
                              <button className="action-btn action-btn--danger">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : activeTab === 'migration' ? (
              <MigrationPanel />
            ) : (
              <div className="admin-upload-section">
                <div className="weekly-articles-section">
                  <h3>📰 Weekly Article Upload</h3>
                  <p>Upload your weekly <code>formatted_articles.json</code> file to update the blog with new articles.</p>
                  <div className="workflow-info">
                    <div className="workflow-step">
                      <span className="step-number">1</span>
                      <span>Prepare your <code>formatted_articles.json</code> file with new articles</span>
                    </div>
                    <div className="workflow-step">
                      <span className="step-number">2</span>
                      <span>Upload the file using the area below</span>
                    </div>
                    <div className="workflow-step">
                      <span className="step-number">3</span>
                      <span>Articles will automatically appear on your blog</span>
                    </div>
                  </div>
                  <div className="template-actions">
                    <a 
                      href="/formatted_articles.json" 
                      download="formatted_articles_template.json"
                      className="template-download-btn"
                    >
                      📥 Download Current Articles (Template)
                    </a>
                    <span className="template-info">
                      Use this as a template for your weekly uploads
                    </span>
                  </div>
                  <FileUpload 
                    onUploadComplete={handleUploadComplete}
                    acceptedTypes=".json"
                  />
                </div>

                <div className="upload-section">
                  <h3>📁 General File Upload</h3>
                  <p>Upload images, documents, and other files for your website.</p>
                  <FileUpload 
                    onUploadComplete={handleUploadComplete}
                    acceptedTypes="image/*,.pdf,.txt,.md,.csv,.xml"
                  />
                </div>

                {recentUploads.length > 0 && (
                  <div className="recent-uploads">
                    <h3>Recent Uploads</h3>
                    <div className="uploads-grid">
                      {recentUploads.map((file, index) => (
                        <div key={index} className="upload-item">
                          <div className="upload-item-info">
                            <h4>{file.filename}</h4>
                            <p>Type: {file.type}</p>
                            <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="upload-item-link">
                              View File
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="upload-guidelines">
                  <h3>Upload Guidelines</h3>
                  <div className="guidelines-grid">
                    <div className="guideline-item">
                      <h4>📸 Images</h4>
                      <p>JPG, PNG, GIF, WebP, SVG<br/>Max size: 5MB</p>
                    </div>
                    <div className="guideline-item">
                      <h4>📄 Documents</h4>
                      <p>PDF, DOC, DOCX, TXT, MD<br/>Max size: 10MB</p>
                    </div>
                    <div className="guideline-item">
                      <h4>📰 Articles</h4>
                      <p>JSON, MD files<br/>Max size: 1MB</p>
                    </div>
                    <div className="guideline-item">
                      <h4>📊 Data</h4>
                      <p>JSON, CSV, XML<br/>Max size: 5MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

// Wrap with authentication
const Admin = requireAuth(AdminPanel);
export default Admin;

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: {
      articles,
    },
  };
}