import React from "react";

export default function HeroSection() {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgC7im5jaDiJ4kOYh60TboV38jHJ5bzqttaeg9kaAHP_J346JsZwRcxMqLHkse9JRaZcHB7FpYtdVRtYdI8U9JKNhsZB72lqeqO4qA9WNb9Kj6rLE_aPRvSPbf09wl8dhj7VT5gGXI6pc1wZNEM6V1RpWX-m7_gNc6LJi4e5KWGeAVvzH1LvEs3IyssDgBa88mg_mcG8UMClHfDfM6kL3nwe_TPJaJX3dpMim5XMirL9SD_8XyBhIQokUmnyN8_GmN-FYx7qlG0c4')",
          }}
        >
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Revolutionizing Industries with AI
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Explore the latest advancements in artificial intelligence and their transformative impact on various sectors.
            </h2>
          </div>
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f98c1f] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
          >
            <span className="truncate">Read More</span>
          </button>
        </div>
      </div>
    </div>
  );
} 