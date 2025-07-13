import React from "react";
import Image from "next/image";

export default function ArticleHero({
  image,
  title,
  author,
  date,
  tags = [],
  source
}) {
  // Fallback image if none provided
  const heroImage = image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAw47FFwcVlLztPB6MoOR451quclKTTmcMkU2DCQCMUB9gsA1iAgo7eXEnHh55THzi7P-8uo-_lXRzOOOn3DzgbayqLhudzdxQGtGtT2aGP7wRY4NlytJtv7ZI4BXkDX1eOwX5O75Mu3H7auQtOnqIUXwbeFaIfgW0JMXolcSoXFyld3We6NnU6Se7CiCY00EWBrC3NxhwyWB4ZLgiwRLJNJrleWYfC1Hk9Pd1Bt3o4znxbBSzf6_51wy98Wa7RSmjiO-G2i1qFHEo";
  
  return (
    <article className="article-hero">
      {heroImage && (
        <div className="article-hero-image-container">
          <Image
            className="article-hero-image"
            src={heroImage}
            alt={title ? `Hero image for: ${title}` : "Article hero image"}
            width={1200}
            height={600}
            sizes="100vw"
            priority={true}
          />
        </div>
      )}
      
      {title && (
        <h1 className="article-hero-title">{title}</h1>
      )}
      
      {(author || date) && (
        <div className="article-hero-meta">
          {author && date && (
            <>By <strong>{author}</strong>{source && ` (${source})`} · Published on <time dateTime={date}>{date}</time></>
          )}
          {author && !date && (
            <>By <strong>{author}</strong>{source && ` (${source})`}</>
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