import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Support() {
  return (
    <>
      <Head>
        <title>Support Us – The AI NEWS</title>
        <meta name="description" content="Support The AI NEWS with donations via PayPal and Buy Me a Coffee. Help us continue providing quality AI journalism." />
        <meta property="og:title" content="Support Us – The AI NEWS" />
        <meta property="og:description" content="Support The AI NEWS with donations via PayPal and Buy Me a Coffee. Help us continue providing quality AI journalism." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ainews.com/support" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Support Us – The AI NEWS" />
        <meta name="twitter:description" content="Support The AI NEWS with donations via PayPal and Buy Me a Coffee. Help us continue providing quality AI journalism." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://ainews.com/support" />
      </Head>
      
      <div className="content-container support-main">
        <h1 className="support-title">Why your support matters</h1>
        <p className="support-description">
          AI News is a non-profit organization dedicated to providing in-depth, unbiased coverage of the latest developments in artificial intelligence. Our mission is to educate and inform the public about the transformative potential of AI, while also highlighting its ethical implications and societal impact. We rely on the generous support of our readers to continue our work. Your contributions enable us to maintain our editorial independence, produce high-quality content, and reach a wider audience. Every donation, no matter the size, makes a difference.
        </p>
        <h2 className="support-section-title">Ways to Support</h2>
        <div className="support-cards">
          <a className="support-card" href="https://www.buymeacoffee.com/theainews" target="_blank" rel="noopener noreferrer">
            <img src="/bmc-icon.png" alt="Buy Me a Coffee" className="support-card-icon" />
            <span className="support-card-label">Buy Me a Coffee</span>
          </a>
          <a className="support-card" href="https://paypal.me/theainews?country.x=GB&locale.x=en_GB" target="_blank" rel="noopener noreferrer">
            <img src="/paypal-icon.png" alt="PayPal" className="support-card-icon" />
            <span className="support-card-label">PayPal</span>
          </a>
        </div>
        <div className="support-thankyou">
          Thank you for your support! Your contributions help us continue our mission to provide in-depth, unbiased coverage of the latest developments in artificial intelligence.
        </div>
        <Link href="/" className="support-back-btn">Back to AI News</Link>
      </div>
    </>
  );
} 