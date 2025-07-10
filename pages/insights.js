import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Insights() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Newsreader, \"Noto Sans\", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#181411] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Insights</h2>
            <p className="text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4">Editorials and deep dives on AI. (This is a placeholder page. You can add editorial content here.)</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
} 