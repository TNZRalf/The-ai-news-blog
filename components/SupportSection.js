import React from "react";

export default function SupportSection() {
  return (
    <>
      <h2 className="text-[#171412] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Support Our Work</h2>
      <p className="text-[#171412] text-base font-normal leading-normal pb-3 pt-1 px-4">
        If you appreciate our in-depth reporting and analysis on AI, please consider supporting our work. Your contribution helps us continue to provide valuable insights
        into the rapidly evolving world of artificial intelligence.
      </p>
      <div className="flex justify-stretch">
        <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f9f2eb] text-[#171412] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Donate via PayPal</span>
          </button>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f4f2f1] text-[#171412] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Buy Me a Coffee</span>
          </button>
        </div>
      </div>
    </>
  );
} 