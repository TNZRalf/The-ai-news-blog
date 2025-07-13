import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ArticleHero from "../components/ArticleHero";
import SocialShare from "../components/SocialShare";
import AdBlock from "../components/AdBlock";
import SupportSection from "../components/SupportSection";
import Sidebar from "../components/Sidebar";

export default function ArticlePage({ article, allArticles }) {
  const router = useRouter();

  // Track article view when component mounts
  useEffect(() => {
    if (article && typeof window !== 'undefined') {
      // Only import gtag on client side
      import('../lib/gtag').then(({ trackArticleView }) => {
        trackArticleView(article.title, article.slug);
      });
    }
  }, [article]);

  if (router.isFallback) {
    return <div>Loading article...</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{`${article.title} – The AI NEWS`}</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ainews.com/${article.slug}`} />
        <meta property="og:image" content={article.image} />
        <link rel="canonical" href={`https://ainews.com/${article.slug}`} />
      </Head>
      <div className="content-container article-detail-layout">
        <div className="article-detail-main-content">
          <ArticleHero
            image={article.image}
            title={article.title}
            author={article.author}
            date={article.date}
            tags={article.tags}
            source={article.source}
          />
          <SocialShare articleUrl={`https://ainews.com/${article.slug}`} title={article.title} />
          
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />

          <AdBlock imageUrl="https://images.unsplash.com/photo-1620712943543-2858200f7426?auto=format&fit=crop&w=800&q=80" />
          <SupportSection />
        </div>
        <Sidebar articles={allArticles} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Import articles only in server-side functions
  const { getAllArticles } = await import('../lib/articles');
  const articles = getAllArticles();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Import articles only in server-side functions
  const { getArticleBySlug, getAllArticles } = await import('../lib/articles');
  const article = getArticleBySlug(params.slug);
  const allArticles = getAllArticles();
  return {
    props: { 
      article,
      allArticles
    },
  };
}