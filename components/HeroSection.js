import React from 'react';

export default function HeroSection({
  title = "The Future of AI: Innovations and Ethical Considerations",
  subtitle = "Explore the latest advancements in artificial intelligence, from machine learning breakthroughs to the ethical implications of AI in society.",
  ctaText = "Read Latest Articles",
  ctaLink = "#articles"
}) {
  const handleCtaClick = (e) => {
    if (ctaLink.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(ctaLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="hero-section" role="banner">
      <div className="hero-container">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        
        <a 
          href={ctaLink}
          className="hero-cta"
          onClick={handleCtaClick}
          role="button"
          aria-label={`${ctaText} - Navigate to articles section`}
        >
          {ctaText}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="currentColor" 
            viewBox="0 0 256 256"
            aria-hidden="true"
          >
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
          </svg>
        </a>
      </div>
    </section>
  );
} 