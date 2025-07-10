import Link from "next/link";

export default function ArticleCard({ title, description, image, author, date, slug }) {
  return (
    <Link href={`/${slug}`} className="article-card">
        <img
          className="article-card-image"
          src={image}
          alt={`Cover image for ${title}`}
          loading="lazy"
        />
        <div className="article-card-content">
          <h3 className="article-card-title">{title}</h3>
          <p className="article-card-desc">{description}</p>
          <div className="article-card-meta">By {author} &middot; {date}</div>
        </div>
    </Link>
  );
}