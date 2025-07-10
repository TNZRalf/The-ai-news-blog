import React, { useEffect, useRef, useState } from 'react';

const articles = [
  {
    tag: 'Machine Learning',
    title: 'GPT-5 Breakthrough: New Multimodal Capabilities Announced',
    description: 'OpenAI reveals groundbreaking improvements in reasoning, multimodal understanding, and real-time processing capabilities.',
    date: '2 hours ago',
    author: 'By AI Research Team',
    link: '/gpt-5-breakthrough',
  },
  {
    tag: 'Robotics',
    title: 
      
      "Boston Dynamics' Atlas Robot Achieves Human-Level Dexterity",
    description: 'Latest developments in humanoid robotics show unprecedented manipulation skills and adaptive learning capabilities.',
    date: '5 hours ago',
    author: 'By Tech Correspondent',
    link: '/atlas-robot-dexterity',
  },
  {
    tag: 'Research',
    title: "DeepMind's AlphaFold 3 Revolutionizes Drug Discovery",
    description: 'New protein folding predictions accelerate pharmaceutical research and open new possibilities for personalized medicine.',
    date: '8 hours ago',
    author: 'By Science Editor',
    link: '/alphafold-3-drug-discovery',
  },
  {
    tag: 'Industry',
    title: 'Microsoft and OpenAI Partnership Expands to Enterprise AI',
    description: 'New enterprise solutions bring advanced AI capabilities to businesses worldwide with enhanced security and compliance.',
    date: '1 day ago',
    author: 'By Business Reporter',
    link: '/microsoft-openai-enterprise',
  },
  {
    tag: 'Ethics',
    title: 'EU AI Act Implementation: What Tech Companies Need to Know',
    description: 'Comprehensive guide to the new European AI regulations and their impact on artificial intelligence development and deployment.',
    date: '1 day ago',
    author: 'By Legal Expert',
    link: '/eu-ai-act-implementation',
  },
  {
    tag: 'Innovation',
    title: 'Quantum-AI Hybrid Systems Show Promise for Climate Modeling',
    description: 'Breakthrough research combines quantum computing with AI to create more accurate climate predictions and environmental solutions.',
    date: '2 days ago',
    author: 'By Climate Tech Team',
    link: '/quantum-ai-climate-modeling',
  },
];

const trendingTopics = [
  '#GPT-5',
  '#Robotics',
  '#AlphaFold',
  '#AIEthics',
  '#QuantumAI',
];

export default function App() {
  const headerRef = useRef(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      alert("Thank you for subscribing! You'll receive our latest insights soon.");
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header" id="header" ref={headerRef}>
        <div className="nav-container">
          <a href="/" className="logo">
            <div className="logo-icon">AI</div>
            AI News Hub
          </a>
          <nav>
            <ul className="nav-menu">
              <li><a href="/" className="active">Home</a></li>
              <li><a href="/topics">Topics</a></li>
              <li><a href="/insights">Insights</a></li>
              <li><a href="/ai-tools">AI Tools</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/subscribe" className="nav-cta">Subscribe</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Stay Ahead with <span className="highlight">AI News</span></h1>
              <p>Get the latest insights, breakthroughs, and analysis from the world of artificial intelligence. Stay informed with our curated content from leading AI researchers and industry experts.</p>
              <div className="hero-cta-group">
                <a href="#articles" className="hero-cta">Read Latest News →</a>
                <a href="/subscribe" className="hero-cta secondary">Subscribe Free</a>
              </div>
            </div>
            <div className="hero-image">
              🤖
            </div>
          </div>
        </section>

        {/* Articles Section with Sidebar */}
        <div className="content-layout">
          <div className="main-column">
            <section className="articles-section" id="articles">
              <div className="section-header">
                <h2 className="section-title">Latest AI News</h2>
                <p className="section-subtitle">Discover the most important developments in artificial intelligence, machine learning, and emerging technologies.</p>
              </div>
              <div className="articles-grid">
                {articles.slice(0, 3).map((article, idx) => (
                  <article className="article-card" key={idx}>
                    <div className="article-image">
                      <span className="article-tag">{article.tag}</span>
                    </div>
                    <div className="article-content">
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-description">{article.description}</p>
                      <div className="article-meta">
                        <span className="article-date">{article.date}</span>
                        <span className="article-author">{article.author}</span>
                      </div>
                      <div className="article-actions">
                        <a href={article.link} className="read-more">Read More →</a>
                        <div className="share-buttons">
                          <a href="#" className="share-btn">𝕏</a>
                          <a href="#" className="share-btn">f</a>
                          <a href="#" className="share-btn">in</a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
                {/* Ad Slot */}
                <div className="ad-slot">
                  <p>Advertisement Placeholder</p>
                  <small>Google AdSense integration point</small>
                </div>
                {articles.slice(3).map((article, idx) => (
                  <article className="article-card" key={idx+3}>
                    <div className="article-image">
                      <span className="article-tag">{article.tag}</span>
                    </div>
                    <div className="article-content">
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-description">{article.description}</p>
                      <div className="article-meta">
                        <span className="article-date">{article.date}</span>
                        <span className="article-author">{article.author}</span>
                      </div>
                      <div className="article-actions">
                        <a href={article.link} className="read-more">Read More →</a>
                        <div className="share-buttons">
                          <a href="#" className="share-btn">𝕏</a>
                          <a href="#" className="share-btn">f</a>
                          <a href="#" className="share-btn">in</a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Newsletter</h3>
              <div className="newsletter-signup">
                <p style={{marginBottom: 15, color: '#666'}}>Get the latest AI news delivered to your inbox.</p>
                <form onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    className="newsletter-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <button className="newsletter-btn" type="submit">Subscribe Free</button>
                </form>
              </div>
            </div>
            <div className="sidebar-section">
              <h3 className="sidebar-title">Support Our Work</h3>
              <div className="support-widget">
                <p style={{marginBottom: 15, color: '#666'}}>Help us continue providing quality AI news and insights.</p>
                <a href="/support" className="support-btn">Support Us</a>
              </div>
            </div>
            <div className="sidebar-section">
              <h3 className="sidebar-title">Trending Topics</h3>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                {trendingTopics.map((topic, idx) => (
                  <span key={idx} style={{background: '#f0f0f0', padding: '6px 12px', borderRadius: 15, fontSize: '0.9rem', color: '#666'}}>{topic}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>AI News Hub</h3>
              <p style={{color: '#cccccc', lineHeight: 1.6, marginBottom: 20}}>
                Your premier destination for the latest AI news, research insights, and technological breakthroughs.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon">𝕏</a>
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">📧</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="/about">About</a></li>
                <li><a href="/topics">Topics</a></li>
                <li><a href="/insights">Insights</a></li>
                <li><a href="/ai-tools">AI Tools</a></li>
                <li><a href="/subscribe">Subscribe</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Categories</h3>
              <ul className="footer-links">
                <li><a href="/topics/machine-learning">Machine Learning</a></li>
                <li><a href="/topics/robotics">Robotics</a></li>
                <li><a href="/topics/research">Research</a></li>
                <li><a href="/topics/ethics">AI Ethics</a></li>
                <li><a href="/topics/industry">Industry News</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/support">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 AI News Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        /* All CSS from the provided HTML goes here */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Open Sans', sans-serif;
            color: #000000;
            background: #ffffff;
            line-height: 1.6;
        }
        .header {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #f0f0f0;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
        }
        .logo {
            font-family: 'Poppins', sans-serif;
            font-size: 24px;
            font-weight: 800;
            color: #000000;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #ffa61e, #ff8c00);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 900;
            font-size: 18px;
        }
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 32px;
            align-items: center;
        }
        .nav-menu a {
            color: #000000;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
        }
        .nav-menu a:hover {
            color: #ffa61e;
        }
        .nav-menu a.active {
            color: #ffa61e;
        }
        .nav-cta {
            background: #ffa61e;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .nav-cta:hover {
            background: #ff8c00;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 166, 30, 0.3);
        }
        .main-content {
            margin-top: 70px;
            min-height: 100vh;
        }
        .hero-section {
            position: relative;
            min-height: 500px;
            width: 100vw;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-bottom: 60px;
        }
        .hero-container {
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
            align-items: center;
            justify-content: center;
        }
        .hero-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
        .hero-content h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 3rem;
            font-weight: 800;
            color: #000000;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        .hero-content .highlight {
            color: #ffa61e;
        }
        .hero-content p {
            font-size: 1.2rem;
            color: #666666;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .hero-cta-group {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }
        .hero-cta {
            background: #ffa61e;
            color: white;
            padding: 16px 32px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .hero-cta:hover {
            background: #ff8c00;
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(255, 166, 30, 0.3);
        }
        .hero-cta.secondary {
            background: transparent;
            color: #000000;
            border: 2px solid #000000;
        }
        .hero-cta.secondary:hover {
            background: #000000;
            color: white;
        }
        .hero-image {
            position: relative;
            height: 350px;
            background: linear-gradient(135deg, #ffa61e, #ff8c00);
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 4rem;
            font-weight: 800;
        }
        .articles-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 80px;
        }
        .section-header {
            text-align: center;
            margin-bottom: 50px;
        }
        .section-title {
            font-family: 'Poppins', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: #000000;
            margin-bottom: 15px;
        }
        .section-subtitle {
            font-size: 1.1rem;
            color: #666666;
            max-width: 600px;
            margin: 0 auto;
        }
        .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }
        .article-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
        }
        .article-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        .article-image {
            height: 200px;
            background: linear-gradient(135deg, #ffa61e, #ff8c00);
            position: relative;
            overflow: hidden;
        }
        .article-tag {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(255, 255, 255, 0.9);
            color: #ffa61e;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .article-content {
            padding: 25px;
        }
        .article-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
            color: #000000;
            margin-bottom: 12px;
            line-height: 1.4;
        }
        .article-description {
            color: #666666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .article-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .article-date {
            color: #999999;
            font-size: 0.9rem;
        }
        .article-author {
            color: #ffa61e;
            font-weight: 600;
            font-size: 0.9rem;
        }
        .article-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .read-more {
            color: #ffa61e;
            text-decoration: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.3s ease;
        }
        .read-more:hover {
            color: #ff8c00;
            transform: translateX(5px);
        }
        .share-buttons {
            display: flex;
            gap: 10px;
        }
        .share-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #f5f5f5;
            color: #666666;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        .share-btn:hover {
            background: #ffa61e;
            color: white;
            transform: translateY(-2px);
        }
        .ad-slot {
            grid-column: 1 / -1;
            background: #f8f9fa;
            border: 2px dashed #e9ecef;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            color: #666666;
            font-style: italic;
        }
        .sidebar {
            background: #f8f9fa;
            border-radius: 16px;
            padding: 30px;
            position: sticky;
            top: 100px;
        }
        .sidebar-section {
            margin-bottom: 30px;
        }
        .sidebar-title {
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            font-weight: 600;
            color: #000000;
            margin-bottom: 15px;
        }
        .newsletter-signup {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        .newsletter-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 1rem;
        }
        .newsletter-btn {
            width: 100%;
            background: #ffa61e;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .newsletter-btn:hover {
            background: #ff8c00;
        }
        .support-widget {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            text-align: center;
        }
        .support-btn {
            background: #ffa61e;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        .support-btn:hover {
            background: #ff8c00;
            transform: translateY(-2px);
        }
        .footer {
            background: #000000;
            color: white;
            padding: 60px 0 30px;
            margin-top: 80px;
        }
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
            margin-bottom: 40px;
        }
        .footer-section h3 {
            font-family: 'Poppins', sans-serif;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #ffa61e;
        }
        .footer-links {
            list-style: none;
        }
        .footer-links li {
            margin-bottom: 10px;
        }
        .footer-links a {
            color: #cccccc;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .footer-links a:hover {
            color: #ffa61e;
        }
        .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        .social-icon {
            width: 40px;
            height: 40px;
            background: #333333;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .social-icon:hover {
            background: #ffa61e;
            transform: translateY(-3px);
        }
        .footer-bottom {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid #333333;
            color: #999999;
        }
        /* Responsive Design */
        @media (max-width: 768px) {
            .hero-section {
                min-height: 0;
                padding: 40px 0 0 0;
            }
            .hero-container {
                grid-template-columns: 1fr;
                gap: 40px;
                text-align: center;
                justify-content: center;
            }
            .hero-content {
                align-items: center;
            }
            .hero-content h1 {
                font-size: 2.2rem;
            }
            .articles-grid {
                grid-template-columns: 1fr;
            }
            .nav-menu {
                display: none;
            }
            .hero-cta-group {
                justify-content: center;
            }
        }
        .content-layout {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 40px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 80px;
            justify-content: center;
        }
        @media (max-width: 1024px) {
            .content-layout {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </>
  );
}
