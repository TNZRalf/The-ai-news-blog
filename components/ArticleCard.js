import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ title, description, image, author, date, slug, source }) {
  return (
    <Link href={`/${slug}`} className="article-card">
        <Image
          className="article-card-image"
          src={image}
          alt={`Cover image for ${title}`}
          width={400}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkqTnPWojKMo7GHnvf2v1u72EXUdaZgafyQhIGdgtppgMoOEZ3eHEJ1Dxt2Yo/1v1Nnj6R4g=="
        />
        <div className="article-card-content">
          <h3 className="article-card-title">{title}</h3>
          <p className="article-card-desc">{description}</p>
          <div className="article-card-meta">{source} &middot; {date}</div>
        </div>
    </Link>
  );
}