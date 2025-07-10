import React from "react";
import Head from "next/head";
import HeroSection from "../components/HeroSection";
import ArticleGrid from "../components/ArticleGrid";
import Sidebar from "../components/Sidebar";
import { getAllArticles } from "../lib/articles";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>The AI NEWS – Latest AI News, Insights & Tools</title>
        <meta name="description" content="Stay up to date with the latest news, insights, and tools in artificial intelligence. The AI NEWS brings you curated articles, expert opinions, and resources for the AI community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="The AI NEWS – Latest AI News, Insights & Tools" />
        <meta property="og:description" content="Stay up to date with the latest news, insights, and tools in artificial intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/" />
      </Head>
      <div className="content-container">
        <HeroSection />
        <div className="home-content-with-sidebar">
          <div id="articles" className="home-articles-section">
            <ArticleGrid articles={articles} title="Latest Articles" />
          </div>
          <Sidebar />
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