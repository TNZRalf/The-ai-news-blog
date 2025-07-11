import React from 'react';
import Image from 'next/image';

export default function SupportSection() {
  const handleDonationClick = (platform) => {
    console.log(`Donation clicked: ${platform}`);
    // Analytics or tracking could be added here
  };

  return (
    <section className="support-section" role="region" aria-label="Support section">
      <div className="support-container">
        <h2 className="support-section-title">Support Our Work</h2>
                  <p className="support-description">
            Help us continue bringing you the latest AI news and insights. Your support helps us maintain editorial independence and produce quality content.
          </p>
        
        <div className="support-cards">
          <a
            className="support-card"
            href="https://www.buymeacoffee.com/theainews"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleDonationClick('Buy Me a Coffee')}
            aria-label="Support us on Buy Me a Coffee - opens in new tab"
          >
            <Image 
              src="/bmc-icon.png" 
              alt="Buy Me a Coffee" 
              className="support-card-icon"
              width={60}
              height={60}
            />
            <span className="support-card-label">Buy Me a Coffee</span>
          </a>
          
          <a
            className="support-card"
            href="https://paypal.me/theainews?country.x=GB&locale.x=en_GB"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleDonationClick('PayPal')}
            aria-label="Support us via PayPal - opens in new tab"
          >
            <Image 
              src="/paypal-icon.png" 
              alt="PayPal" 
              className="support-card-icon"
              width={60}
              height={60}
            />
            <span className="support-card-label">PayPal</span>
          </a>
        </div>
      </div>
    </section>
  );
} 