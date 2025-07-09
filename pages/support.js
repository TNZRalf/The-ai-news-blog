import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Support() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Newsreader, \"Noto Sans\", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <h2 className="text-[#181411] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Why your support matters</h2>
            <p className="text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              AI News is a non-profit organization dedicated to providing in-depth, unbiased coverage of the latest developments in artificial intelligence. Our mission is to
              educate and inform the public about the transformative potential of AI, while also highlighting its ethical implications and societal impact. We rely on the generous
              support of our readers to continue our work. Your contributions enable us to maintain our editorial independence, produce high-quality content, and reach a wider
              audience. Every donation, no matter the size, makes a difference.
            </p>
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Ways to Support</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 items-center">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCi8_fwaN9HxInQYYfkgi3Vfh5Vl17RJopiLWDVyAnDNFRDTHm8gV9InII4OBnqa2duHpx0lp6weKUWAxrXcQdOU6tR-j4LdyXLUPjfe7b4DDJ1qonHXX03NoMT1R29JBw1748asNEHHhF0dwS9RWUg74fjEhChVnOlozRu-j90TjqBAchouHMcBjGbCz6hTKAqDhGY5ZagDK9tw5UcwWpDycsAaUWb2FG-VHNGCwAeKMJ3mPJfASUNaemAd6YGqOlqT2y16GK5iRo')"}}
                ></div>
                <h2 className="text-[#181411] text-base font-bold leading-tight">PayPal</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 items-center">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJhvOhEbwUnwwCXNSR8zwwFI6mrqY4mrDJG3eMs-x11gCz14n7gRlEp9QGsYu7myaWMquLCmJm8ALkHHuvjiYKGmA8Xq4-gwFxUCY0oIZpLGRJWOHHcvWstBcvbRtTzBjJdoBTzIdi2ofl6qbSJzi8yAh6obeEb-Y_-iUR_jzcetS6XsV0IdGrTlQTLIIhVo-E-9047iNMEXBU2ZfBr70OcOjq9G1zN987HgShLDSAjwHN_kP1OTWdU0ImbJbeE8YfH-Ezt07WVbs')"}}
                ></div>
                <h2 className="text-[#181411] text-base font-bold leading-tight">Buy Me a Coffee</h2>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 items-center">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7ObXOC_7cqDgMbS0-wetO5WA0JycUGmy2rgxUuZ_AwQCF_c3HdZfUcJC2VfwbU3jpa3_hY-KucJEcBuOujyYsliYRQzjROm-KWhAxG0t547qJNwar-iyhxHLW5h1FROrhBIN6DM_nJiMuYRCfYBPm7iX67euMIvDEPaw8-b__v8Cdx6o07fc5Zlp25r-w1_oKYxvQtDmh3gfPbcnlsb858s7tflOUriNyudEXiCFpyKVddNDJyTpxwwsTUjkyN5y8PVncd2-IwDI')"}}
                ></div>
                <h2 className="text-[#181411] text-base font-bold leading-tight">Patreon</h2>
              </div>
            </div>
            <p className="text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Thank you for your support! Your contributions help us continue our mission to provide in-depth, unbiased coverage of the latest developments in artificial
              intelligence.
            </p>
            <div className="flex px-4 py-3 justify-center">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f98c1f] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Back to AI News</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
} 