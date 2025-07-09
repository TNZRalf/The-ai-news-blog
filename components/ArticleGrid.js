import React from "react";

export default function ArticleGrid() {
  return (
    <>
      <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Latest Articles</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {/* Repeat this block for each article, static for now */}
        {/* ... (copy the article cards from your HTML, as in the provided code) ... */}
      </div>
      <div className="flex items-center justify-center p-4">
        {/* Pagination controls, static for now */}
        <a href="#" className="flex size-10 items-center justify-center">
          <div className="text-[#181411]" data-icon="CaretLeft" data-size="18px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </div>
        </a>
        <a className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#181411] rounded-full bg-[#f5f2f0]" href="#">1</a>
        <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full" href="#">2</a>
        <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full" href="#">3</a>
        <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full" href="#">4</a>
        <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#181411] rounded-full" href="#">5</a>
        <a href="#" className="flex size-10 items-center justify-center">
          <div className="text-[#181411]" data-icon="CaretRight" data-size="18px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </div>
        </a>
      </div>
    </>
  );
} 