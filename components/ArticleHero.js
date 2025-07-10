import React from "react";

export default function ArticleHero() {
  return (
    <div className="@container">
      <div className="@[480px]:px-4 @[480px]:py-3">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-80"
          style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAw47FFwcVlLztPB6MoOR451quclKTTmcMkU2DCQCMUB9gsA1iAgo7eXEnHh55THzi7P-8uo-_lXRzOOOn3DzgbayqLhudzdxQGtGtT2aGP7wRY4NlytJtv7ZI4BXkDX1eOwX5O75Mu3H7auQtOnqIUXwbeFaIfgW0JMXolcSoXFyld3We6NnU6Se7CiCY00EWBrC3NxhwyWB4ZLgiwRLJNJrleWYfC1Hk9Pd1Bt3o4znxbBSzf6_51wy98Wa7RSmjiO-G2i1qFHEo')"}}
        ></div>
      </div>
      <h2 className="text-[#171412] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">The Future of AI: Innovations and Ethical Considerations</h2>
      <p className="text-[#827568] text-sm font-normal leading-normal pb-3 pt-1 px-4">By Evelyn Reed · Published on January 15, 2024</p>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f4f2f1] pl-4 pr-4">
          <p className="text-[#171412] text-sm font-medium leading-normal">AI Ethics</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f4f2f1] pl-4 pr-4">
          <p className="text-[#171412] text-sm font-medium leading-normal">Future Tech</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f4f2f1] pl-4 pr-4">
          <p className="text-[#171412] text-sm font-medium leading-normal">Innovation</p>
        </div>
      </div>
    </div>
  );
} 