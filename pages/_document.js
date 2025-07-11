import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function MyDocument() {
  // Safely get GA tracking ID and AdSense Publisher ID
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
  const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap"
        />
        
        {/* RSS Feed Discovery */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="The AI NEWS RSS Feed" 
          href="/api/rss" 
        />
        
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google AdSense with Auto Ads */}
        {ADSENSE_PUBLISHER_ID && (
          <>
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
              crossOrigin="anonymous"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "${ADSENSE_PUBLISHER_ID}",
                    enable_page_level_ads: true
                  });
                `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}