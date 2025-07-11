import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found – The AI NEWS</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our latest AI news and insights instead." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="error-page">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" stroke="var(--color-primary)" strokeWidth="4" fill="none"/>
                <circle cx="60" cy="60" r="30" fill="var(--color-primary)" opacity="0.1"/>
                <path d="M45 45L75 75M75 45L45 75" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h1 className="error-title">404 - Page Not Found</h1>
            
            <p className="error-description">
              Oops! The page you're looking for seems to have vanished into the digital void. 
              But don't worry – there's plenty of cutting-edge AI news waiting for you.
            </p>
            
            <div className="error-actions">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
              <Link href="/insights" className="btn-secondary">
                Browse Insights
              </Link>
            </div>
            
            <div className="error-suggestions">
              <h3>You might be interested in:</h3>
              <ul>
                <li><Link href="/topics">Latest AI Topics</Link></li>
                <li><Link href="/about">About The AI NEWS</Link></li>
                <li><Link href="/subscribe">Subscribe to Newsletter</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 