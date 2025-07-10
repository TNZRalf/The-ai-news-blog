import React from 'react';

export default function SupportSection() {
  const handleDonationClick = (platform) => {
    console.log(`Donation clicked: ${platform}`);
    // Analytics or tracking could be added here
  };

  return (
    <section className="support-section" role="region" aria-label="Support section">
      <div className="support-container">
        <h2 className="support-title">Support Our Work</h2>
        <p className="support-description">
          Help us continue bringing you the latest AI news and insights. Your support keeps us independent and ad-free.
        </p>
        
        <div className="support-options">
          <a 
            href="https://coff.ee/theainews"
            target="_blank" 
            rel="noopener noreferrer"
            className="support-option"
            onClick={() => handleDonationClick('Buy Me Coffee')}
            aria-label="Support us on Buy Me Coffee - opens in new tab"
          >
            <div className="support-option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,120,64Zm32,0a8,8,0,0,0,8-8V24a8,8,0,0,0-16,0V56A8,8,0,0,0,152,64Zm96,56v8a40,40,0,0,1-37.51,39.95,96.59,96.59,0,0,1-27,40.09A8,8,0,0,1,176,208H32a8,8,0,0,1-7.5-10.55A96.59,96.59,0,0,1,51.51,167.9A40,40,0,0,1,14,128v-8a40,40,0,0,1,40-40H208A40,40,0,0,1,248,120ZM200,96H56a24,24,0,0,0-24,24v8a24,24,0,0,0,24,24H200a24,24,0,0,0,24-24v-8A24,24,0,0,0,200,96Z"/>
              </svg>
            </div>
            <div className="support-option-content">
              <h3 className="support-option-title">Buy Me Coffee</h3>
              <p className="support-option-desc">One-time support</p>
            </div>
          </a>
          
          <a 
            href="https://www.paypal.me/zakariatanani99"
            target="_blank" 
            rel="noopener noreferrer"
            className="support-option"
            onClick={() => handleDonationClick('PayPal')}
            aria-label="Support us via PayPal - opens in new tab"
          >
            <div className="support-option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,112a88,88,0,0,1-88,88H120a8,8,0,0,1-8-8V168a8,8,0,0,1,8-8h16a72,72,0,0,0,0-144H64a8,8,0,0,0-8,8V192a8,8,0,0,1-16,0V24A24,24,0,0,1,64,0h72a88,88,0,0,1,88,88Z"/>
              </svg>
            </div>
            <div className="support-option-content">
              <h3 className="support-option-title">PayPal</h3>
              <p className="support-option-desc">Secure donations</p>
            </div>
          </a>
          
          <a 
            href="https://www.patreon.com/theainews"
            target="_blank" 
            rel="noopener noreferrer"
            className="support-option"
            onClick={() => handleDonationClick('Patreon')}
            aria-label="Support us on Patreon - opens in new tab"
          >
            <div className="support-option-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28H112a8,8,0,0,1,0-16h28a12,12,0,0,0,0-24H112a28,28,0,0,1,0-56h28a8,8,0,0,1,0,16H112a12,12,0,0,0,0,24h28A28,28,0,0,1,168,148Z"/>
              </svg>
            </div>
            <div className="support-option-content">
              <h3 className="support-option-title">Patreon</h3>
              <p className="support-option-desc">Monthly support</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
} 