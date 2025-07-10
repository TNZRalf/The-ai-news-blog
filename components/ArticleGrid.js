import React, { useState } from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles = [], title = "Latest Articles" }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const showMoreArticles = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const hasMore = articles.length > visibleCount;
  
  return (
    <section className="article-grid-section">
      <h2 className="section-title">{title}</h2>
      {articles.length === 0 ? (
        <div className="no-articles">No articles available.</div>
      ) : (
        <>
          <div className="article-grid">
            {articles.slice(0, visibleCount).map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
          {hasMore && (
            <div className="pagination-controls">
              <button onClick={showMoreArticles} className="btn-primary">
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}