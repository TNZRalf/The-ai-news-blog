import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error – The AI NEWS</title>
        <meta name="description" content="We're experiencing technical difficulties. Please try again later." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="error-page">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" stroke="var(--color-primary)" strokeWidth="4" fill="none"/>
                <circle cx="60" cy="60" r="30" fill="var(--color-primary)" opacity="0.1"/>
                <path d="M60 35V65M60 85H60.02" stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round"/>
                <path d="M35 40L85 80M85 40L35 80" stroke="var(--color-primary)" strokeWidth="2" opacity="0.3"/>
              </svg>
            </div>
            
            <h1 className="error-title">500 - Server Error</h1>
            
            <p className="error-description">
              Our AI seems to have encountered an unexpected glitch. Our team has been notified 
              and is working to resolve this issue. Please try again in a few moments.
            </p>
            
            <div className="error-actions">
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
              <button 
                className="btn-secondary" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
            
            <div className="error-suggestions">
              <h3>What you can do:</h3>
              <ul>
                <li>Wait a few minutes and refresh the page</li>
                <li><Link href="/contact">Report this issue to our team</Link></li>
                <li><Link href="/">Browse our homepage</Link></li>
                <li><Link href="/insights">Check out our latest insights</Link></li>
              </ul>
            </div>
            
            <div className="error-note">
              <p>
                If this problem persists, please <Link href="/contact">contact us</Link> 
                and include the time this error occurred.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 