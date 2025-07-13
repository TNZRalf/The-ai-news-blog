import React from "react";
import Head from "next/head";
import HeroSection from "../components/HeroSection";
import ArticleGrid from "../components/ArticleGrid";
import Sidebar from "../components/Sidebar";
import { BannerAd, ArticleAd } from "../components/AdSense";
import { getAllArticles } from "../lib/articles";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>The AI NEWS – Latest AI News, Insights & Tools</title>
        <meta name="description" content="Latest AI news, insights & tools for 2024. Expert coverage of machine learning, ChatGPT, AI ethics, and emerging technologies. Join thousands of AI professionals staying informed." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="The AI NEWS – Latest AI News, Insights & Tools" />
        <meta property="og:description" content="Latest AI news, insights & tools for 2024. Expert coverage of machine learning, ChatGPT, AI ethics, and emerging technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/" />
      </Head>
      <div className="content-container">
        <HeroSection />
        
        {/* Banner Ad - High visibility placement after hero */}
        <BannerAd adSlot="7921442724" />
        
        <div className="home-content-with-sidebar">
          <div id="articles" className="home-articles-section">
            <ArticleGrid articles={articles} title="Latest Articles" />
            
            {/* Article Ad - Mid-content placement for better engagement */}
            <ArticleAd adSlot="1694945729" />
          </div>
          <Sidebar articles={articles} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const articles = getAllArticles();
  return {
    props: {
      articles,
    },
  };
}