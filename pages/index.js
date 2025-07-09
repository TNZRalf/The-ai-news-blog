import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ArticleGrid from "../components/ArticleGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Newsreader, \"Noto Sans\", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <HeroSection />
            <ArticleGrid />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
} 