export default function ArticleDetail({ image, title, author, date, tags = [], content }) {
  return (
    <article className="article-detail">
      {image && (
        <div 
          className="article-detail-image" 
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={`Cover image for ${title}`}
        />
      )}
      
      <header className="article-detail-header">
        <h1 className="article-detail-title">{title}</h1>
        <div className="article-detail-meta">
          By {author} · Published on {date}
        </div>
        {tags && tags.length > 0 && (
          <div className="article-detail-tags">
            {tags.map((tag, index) => (
              <span key={index} className="article-detail-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      {content && (
        <div 
          className="article-detail-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </article>
  );
} 