import React from "react";
import Head from "next/head";
import ArticleGrid from "../components/ArticleGrid";
import { getAllArticles } from "../lib/articles";

export default function AITools({ articles }) {
  return (
    <>
      <Head>
        <title>AI Tools – The AI NEWS</title>
        <meta name="description" content="Discover the latest AI tools, software, and platforms. Comprehensive reviews and guides to help you navigate the AI landscape." />
        <meta property="og:title" content="AI Tools – The AI NEWS" />
        <meta property="og:description" content="Discover the latest AI tools, software, and platforms. Comprehensive reviews and guides to help you navigate the AI landscape." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/ai-tools" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools – The AI NEWS" />
        <meta name="twitter:description" content="Discover the latest AI tools, software, and platforms. Comprehensive reviews and guides to help you navigate the AI landscape." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/ai-tools" />
      </Head>
      
      <div className="content-container ai-tools-main">
        <section className="page-header">
          <h1 className="section-title">AI Tools & Platforms</h1>
          <p className="section-description">
            Discover the latest AI tools, software, and platforms that are shaping the future of artificial intelligence.
          </p>
        </section>
        <ArticleGrid articles={articles} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allArticles = getAllArticles();
  
  // Filter articles related to AI tools, software, platforms
  const toolsArticles = allArticles.filter(article => {
    const content = (article.title + ' ' + article.description + ' ' + (article.tags?.join(' ') || '')).toLowerCase();
    return content.includes('tool') || 
           content.includes('software') || 
           content.includes('platform') || 
           content.includes('app') ||
           content.includes('api') ||
           content.includes('framework') ||
           content.includes('library') ||
           content.includes('service') ||
           content.includes('solution') ||
           article.tags?.some(tag => 
             ['tools', 'software', 'platform', 'technology', 'development'].includes(tag.toLowerCase())
           );
  });

  return {
    props: {
      articles: toolsArticles
    }
  };
} 