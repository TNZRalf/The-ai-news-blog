import React from 'react';

const SocialShare = ({ articleUrl, title }) => {
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  const openShareWindow = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleFacebookShare = () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
  };

  const handleTwitterShare = () => {
    openShareWindow(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`);
  };

  const handleLinkedInShare = () => {
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl).then(() => {
      alert('Link copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <section className="social-share">
      <h4 className="social-share-title">Share this article:</h4>
      <div className="social-share-buttons">
        <button 
          className="social-share-btn social-share-btn--facebook" 
          onClick={handleFacebookShare} 
          aria-label="Share on Facebook"
        >
          <span className="social-share-btn-text">Facebook</span>
        </button>
        <button 
          className="social-share-btn social-share-btn--twitter" 
          onClick={handleTwitterShare} 
          aria-label="Share on Twitter"
        >
          <span className="social-share-btn-text">Twitter</span>
        </button>
        <button 
          className="social-share-btn social-share-btn--linkedin" 
          onClick={handleLinkedInShare} 
          aria-label="Share on LinkedIn"
        >
          <span className="social-share-btn-text">LinkedIn</span>
        </button>
        <button 
          className="social-share-btn social-share-btn--copy" 
          onClick={handleCopyLink} 
          aria-label="Copy article link"
        >
          <span className="social-share-btn-text">Copy Link</span>
        </button>
      </div>
    </section>
  );
};

export default SocialShare;