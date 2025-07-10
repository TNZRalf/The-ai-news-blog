import React from "react";

export default function ArticleHero({
  image,
  title,
  author,
  date,
  tags = []
}) {
  // Fallback image if none provided
  const heroImage = image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAw47FFwcVlLztPB6MoOR451quclKTTmcMkU2DCQCMUB9gsA1iAgo7eXEnHh55THzi7P-8uo-_lXRzOOOn3DzgbayqLhudzdxQGtGtT2aGP7wRY4NlytJtv7ZI4BXkDX1eOwX5O75Mu3H7auQtOnqIUXwbeFaIfgW0JMXolcSoXFyld3We6NnU6Se7CiCY00EWBrC3NxhwyWB4ZLgiwRLJNJrleWYfC1Hk9Pd1Bt3o4znxbBSzf6_51wy98Wa7RSmjiO-G2i1qFHEo";
  
  return (
    <article className="article-hero">
      {heroImage && (
        <img
          className="article-hero-image"
          src={heroImage}
          alt={title ? `Hero image for: ${title}` : "Article hero image"}
          loading="lazy"
        />
      )}
      
      {title && (
        <h1 className="article-hero-title">{title}</h1>
      )}
      
      {(author || date) && (
        <div className="article-hero-meta">
          {author && date && (
            <>By <strong>{author}</strong> · Published on <time dateTime={date}>{date}</time></>
          )}
          {author && !date && (
            <>By <strong>{author}</strong></>
          )}
          {!author && date && (
            <>Published on <time dateTime={date}>{date}</time></>
          )}
        </div>
      )}
      
      {tags && tags.length > 0 && (
        <div className="article-hero-tags" role="list" aria-label="Article tags">
          {tags.map((tag, index) => (
            <span className="tag" key={index} role="listitem">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
} 