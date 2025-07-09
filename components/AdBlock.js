import React from "react";

export default function AdBlock({ imageUrl }) {
  return (
    <div className="p-4">
      <div className="flex items-stretch justify-between gap-4 rounded-xl">
        <div className="flex flex-[2_2_0px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[#171412] text-base font-bold leading-tight">Advertisement</p>
            <p className="text-[#827568] text-sm font-normal leading-normal">Sponsored Content</p>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#f4f2f1] text-[#171412] text-sm font-medium leading-normal w-fit">
            <span className="truncate">Learn More</span>
          </button>
        </div>
        <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{backgroundImage: `url('${imageUrl}')`}}></div>
      </div>
    </div>
  );
} 