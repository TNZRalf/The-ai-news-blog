import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Newsreader, \"Noto Sans\", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4"><p className="text-[#181411] tracking-light text-[32px] font-bold leading-tight min-w-72">About The AI NEWS</p></div>
            <p className="text-[#181411] text-base font-normal leading-normal pb-3 pt-1 px-4">
              The AI NEWS is a leading source of information and insights on artificial intelligence, machine learning, and related technologies. Our mission is to provide
              accurate, timely, and engaging content that helps our readers understand the latest developments in AI and their impact on society.
            </p>
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Team</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 flex-col">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwC7UPzCo_7Mh1v8xviq1vPE3l3Gdcy6slR4wdTTpas8JO8qrGfVLv5xAzxZvLZXimnpQ0E8HipJpS6srpksQsVvVjkscUwQjHApjPDXjxv13CFzQmVGedoBuTr8mBsnIikfEJY7chk1B8y4--sGdHva7Fgm0s9OMXHLSemjHbrWhJRZH4EYRb-LvSMu54mCY1648DJzUSL4PTGfAp4JOOanOsg4TiX5eVKuNlEqWqmqDSncNsX7Y2kqUCA8Bk79XfUKltkf9up7c')"}}
                ></div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#181411] text-base font-bold leading-tight">Sophia Carter</h2>
                  <p className="text-[#8c755f] text-sm font-normal leading-normal">Editor-in-Chief</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 flex-col">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCN5T32SGDEqqj5kqZpfTsaypZSP0ZA3gH2D10Pb_wsvdcyqeaME2JtQQcVgdmFqzQCu3Id6VStnTcEoePOFca8GY7k6JqB34ZoQ-xHQjILpO6rCiYjxRi_IN7D5CzP5tr-El1oBAyyqjyIArWyzZYmcGKe0WAZ8kGr7cUpUFfgTkrqjTxyqFfJyDTPbroJhnXO-wM2u2mNE3ryqnaq1KaqFCim8fw9duHHrlR54o37GAVn-Mt0KqJXcGXnW1yNWEIJmHKnBNOi__s')"}}
                ></div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#181411] text-base font-bold leading-tight">Ethan Bennett</h2>
                  <p className="text-[#8c755f] text-sm font-normal leading-normal">Senior Writer</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 flex-col">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDA3_w2w4d3Zvcq19x_322rr0zj0rcx9aqwOctJRue-xwxMJshtHvJD5vx210wtlqyGL6ryBOKCA0aVl1F_PmWkshudoCwGsRd3_rc0fb_rdkPaOVNAHHdmgM0sCoQNTxXgCUrWH2jL_zqR2lWHyC2mS2Y6AVKTtxq_zRHgEjt-Kad8HOtOXqOj64z5tfOzduKb48RrEieDcai--FiEFPAJTzqRyv7Z4D9aqZU0nljcIlaakCrBlAd082Tn1kI0DHHU6gz6Pq9Ufj4')"}}
                ></div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#181411] text-base font-bold leading-tight">Liam Harper</h2>
                  <p className="text-[#8c755f] text-sm font-normal leading-normal">Technology Analyst</p>
                </div>
              </div>
            </div>
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Values</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 flex-col">
                <div className="text-[#181411]" data-icon="PencilSimple" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#181411] text-base font-bold leading-tight">Integrity</h2>
                  <p className="text-[#8c755f] text-sm font-normal leading-normal">We are committed to providing unbiased and ethical reporting on AI.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 flex-col">
                <div className="text-[#181411]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#181411] text-base font-bold leading-tight">Accuracy</h2>
                  <p className="text-[#8c755f] text-sm font-normal leading-normal">We strive to ensure that our content is accurate and up-to-date.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#e6e0db] bg-white p-4 flex-col">
                <div className="text-[#181411]" data-icon="Users" data-size="24px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#181411] text-base font-bold leading-tight">Community</h2>
                  <p className="text-[#8c755f] text-sm font-normal leading-normal">We aim to build a community of AI enthusiasts and professionals.</p>
                </div>
              </div>
            </div>
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Contact Us</h2>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#181411] text-base font-medium leading-normal pb-2">Name</p>
                <input
                  placeholder="Your Name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-14 placeholder:text-[#8c755f] p-[15px] text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#181411] text-base font-medium leading-normal pb-2">Email</p>
                <input
                  placeholder="Your Email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] h-14 placeholder:text-[#8c755f] p-[15px] text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#181411] text-base font-medium leading-normal pb-2">Message</p>
                <textarea
                  placeholder="Your Message"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border border-[#e6e0db] bg-white focus:border-[#e6e0db] min-h-36 placeholder:text-[#8c755f] p-[15px] text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f98c1f] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Send Message</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
} 