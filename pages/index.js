import React, { useEffect, useRef, useState } from 'react';

const articles = [
  {
    title: 'Machine Learning Breakthroughs in 2025',
    description: 'Explore the latest developments in machine learning algorithms and their real-world applications across various industries.',
    date: 'January 15, 2025',
  },
  {
    title: 'The Ethics of Autonomous Systems',
    description: 'A deep dive into the moral implications of AI decision-making and the frameworks needed for responsible AI development.',
    date: 'January 12, 2025',
  },
  {
    title: 'Quantum Computing Revolution',
    description: 'Understanding how quantum computers will transform cryptography, drug discovery, and complex problem-solving.',
    date: 'January 10, 2025',
  },
  {
    title: 'Neural Networks in Healthcare',
    description: 'How AI is revolutionizing medical diagnosis, treatment planning, and personalized medicine for better patient outcomes.',
    date: 'January 8, 2025',
  },
  {
    title: 'Blockchain and AI Integration',
    description: 'Exploring the convergence of blockchain technology and artificial intelligence in creating decentralized AI systems.',
    date: 'January 5, 2025',
  },
  {
    title: 'Natural Language Processing Advances',
    description: 'The latest breakthroughs in NLP technology and how they\'re transforming human-computer interaction.',
    date: 'January 3, 2025',
  },
];

export default function Home() {
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
      <header className="header" id="header" ref={headerRef}>
        <div className="nav-container">
          <div className="logo">TechInsights</div>
          <nav>
            <ul className="nav-menu">
              <li><a href="#home">Home</a></li>
              <li><a href="#topics">Topics</a></li>
              <li><a href="#insights">Insights</a></li>
              <li><a href="#ai-tools">AI Tools</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#subscribe">Subscribe</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <section className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">The Future of AI Innovation</h1>
            <p className="hero-description">
              Discover groundbreaking insights into artificial intelligence, machine learning, and the technologies shaping tomorrow's world.
            </p>
            <a href="#read-more" className="hero-cta">Read Full Article</a>
          </div>
        </section>
        <section className="articles-section">
          <h2 className="section-title">Latest Articles</h2>
          <div className="articles-grid">
            {articles.map((article, idx) => (
              <article className="article-card" key={idx}>
                <div className="article-image"></div>
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <div className="article-meta">
                    <span>{article.date}</span>
                    <a href="#" className="read-more">Read More →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="pagination">
            <a href="#" className="pagination-btn">← Previous</a>
            <a href="#" className="pagination-btn active">1</a>
            <a href="#" className="pagination-btn">2</a>
            <a href="#" className="pagination-btn">3</a>
            <a href="#" className="pagination-btn">4</a>
            <a href="#" className="pagination-btn">Next →</a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>About TechInsights</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Your premier destination for cutting-edge technology insights, AI research, and innovative solutions shaping the future.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon">𝕏</a>
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Categories</h3>
              <ul className="footer-links">
                <li><a href="#">Artificial Intelligence</a></li>
                <li><a href="#">Machine Learning</a></li>
                <li><a href="#">Quantum Computing</a></li>
                <li><a href="#">Blockchain</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Newsletter</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>
                Stay updated with our latest insights and breakthroughs.
              </p>
              <form style={{ display: 'flex', gap: 10 }} onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{ flex: 1, padding: 12, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(10px)' }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  style={{ padding: '12px 20px', background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', border: 'none', borderRadius: 8, color: 'white', cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 TechInsights. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        /* Paste all your CSS here from the HTML <style> block */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            color: #ffffff;
            overflow-x: hidden;
        }
        .header {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.9);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        .header.scrolled {
            background: rgba(10, 10, 10, 0.95);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
            from { filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.3)); }
            to { filter: drop-shadow(0 0 20px rgba(78, 205, 196, 0.5)); }
        }
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 40px;
        }
        .nav-menu a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
            position: relative;
            transition: all 0.3s ease;
            padding: 10px 0;
        }
        .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            transition: width 0.3s ease;
        }
        .nav-menu a:hover::after {
            width: 100%;
        }
        .nav-menu a:hover {
            color: #4ecdc4;
            transform: translateY(-2px);
        }
        .main-content {
            margin-top: 80px;
            min-height: 100vh;
        }
        .hero-banner {
            position: relative;
            height: 600px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-bottom: 80px;
        }
        .hero-banner::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><circle cx="500" cy="500" r="400" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="500" cy="500" r="300" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></svg>');
            animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .hero-content {
            text-align: center;
            max-width: 800px;
            padding: 40px;
            position: relative;
            z-index: 2;
        }
        .hero-title {
            font-size: 3.5rem;
            font-weight: 900;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #ffffff, #f0f0f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeInUp 1s ease-out;
        }
        .hero-description {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 30px;
            line-height: 1.6;
            animation: fadeInUp 1s ease-out 0.2s both;
        }
        .hero-cta {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
            animation: fadeInUp 1s ease-out 0.4s both;
        }
        .hero-cta:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(255, 107, 107, 0.4);
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .articles-section {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px 80px;
        }
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 60px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .articles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-bottom: 60px;
        }
        .article-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            cursor: pointer;
        }
        .article-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-color: rgba(78, 205, 196, 0.3);
        }
        .article-image {
            height: 200px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            position: relative;
            overflow: hidden;
        }
        .article-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(78, 205, 196, 0.3));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .article-card:hover .article-image::before {
            opacity: 1;
        }
        .article-content {
            padding: 25px;
        }
        .article-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: #ffffff;
            line-height: 1.4;
        }
        .article-description {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .article-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.5);
        }
        .read-more {
            color: #4ecdc4;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        .read-more:hover {
            color: #ff6b6b;
            transform: translateX(5px);
        }
        .pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 60px;
        }
        .pagination-btn {
            padding: 12px 20px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .pagination-btn:hover, .pagination-btn.active {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-color: transparent;
            transform: translateY(-2px);
        }
        .footer {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 60px 0 20px;
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
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #ffffff;
        }
        .footer-links {
            list-style: none;
        }
        .footer-links li {
            margin-bottom: 10px;
        }
        .footer-links a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .footer-links a:hover {
            color: #4ecdc4;
            transform: translateX(5px);
        }
        .social-icons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        .social-icon {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .social-icon:hover {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            transform: translateY(-3px);
        }
        .footer-bottom {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.5);
        }
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
            .hero-title {
                font-size: 2.5rem;
            }
            .articles-grid {
                grid-template-columns: 1fr;
            }
            .nav-container {
                padding: 0 15px;
            }
        }
      `}</style>
    </>
  );
} 