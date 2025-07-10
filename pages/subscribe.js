import React from "react";
import Head from "next/head";
import NewsletterSignup from "../components/NewsletterSignup";

export default function Subscribe() {
  return (
    <>
      <Head>
        <title>Subscribe – The AI NEWS</title>
        <meta name="description" content="Subscribe to The AI NEWS newsletter for the latest updates, articles, and resources in artificial intelligence." />
        <meta property="og:title" content="Subscribe – The AI NEWS" />
        <meta property="og:description" content="Subscribe to The AI NEWS newsletter for the latest updates, articles, and resources in artificial intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/subscribe" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Subscribe – The AI NEWS" />
        <meta name="twitter:description" content="Subscribe to The AI NEWS newsletter for the latest updates, articles, and resources in artificial intelligence." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/subscribe" />
      </Head>
      
      <div className="content-container subscribe-main">
        <section className="subscribe-header">
          <h1 className="section-title">Subscribe to Our Newsletter</h1>
          <p className="section-description">
            Stay up-to-date with the latest developments in artificial intelligence. Get curated news, insights, and expert analysis delivered directly to your inbox.
          </p>
        </section>
        <div className="subscribe-form-container">
          <NewsletterSignup />
        </div>
        <section className="subscribe-benefits">
          <h2 className="subscribe-benefits-title">What You'll Get</h2>
          <div className="subscribe-benefits-grid">
            <div className="subscribe-benefit-item">
              <div className="subscribe-benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
                </svg>
              </div>
              <div className="subscribe-benefit-content">
                <h3 className="subscribe-benefit-title">Weekly Digest</h3>
                <p className="subscribe-benefit-desc">Curated AI news and articles delivered every week</p>
              </div>
            </div>
            <div className="subscribe-benefit-item">
              <div className="subscribe-benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
                </svg>
              </div>
              <div className="subscribe-benefit-content">
                <h3 className="subscribe-benefit-title">Expert Insights</h3>
                <p className="subscribe-benefit-desc">In-depth analysis and commentary from AI experts</p>
              </div>
            </div>
            <div className="subscribe-benefit-item">
              <div className="subscribe-benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,42H40A14,14,0,0,0,26,56V200a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A14,14,0,0,0,216,42ZM40,54H216a2,2,0,0,1,2,2V98H38V56A2,2,0,0,1,40,54ZM216,202H40a2,2,0,0,1-2-2V110H218v90A2,2,0,0,1,216,202ZM86,140a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H92A6,6,0,0,1,86,140Zm0,20a6,6,0,0,1,6-6h64a6,6,0,0,1,0,12H92A6,6,0,0,1,86,160Z"/>
                </svg>
              </div>
              <div className="subscribe-benefit-content">
                <h3 className="subscribe-benefit-title">Breaking News</h3>
                <p className="subscribe-benefit-desc">Be the first to know about major AI developments</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 