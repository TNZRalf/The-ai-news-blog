import React, { useEffect } from 'react';

// AdSense component for displaying ads
const AdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' },
  className = '',
  responsive = true 
}) => {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    // Only push ads if AdSense is loaded and we have a publisher ID
    if (typeof window !== 'undefined' && window.adsbygoogle && publisherId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [publisherId]);

  // Don't render if no publisher ID is set
  if (!publisherId) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

// Pre-configured ad sizes for common placements
export const BannerAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="horizontal"
    style={{ display: 'block', width: '100%', height: '280px' }}
    className={`banner-ad ${className}`}
  />
);

export const SidebarAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="vertical"
    style={{ display: 'block', width: '300px', height: '600px' }}
    className={`sidebar-ad ${className}`}
  />
);

export const ArticleAd = ({ adSlot, className = '' }) => (
  <AdSense
    adSlot={adSlot}
    adFormat="fluid"
    style={{ display: 'block', margin: '20px 0' }}
    className={`article-ad ${className}`}
  />
);

export default AdSense; 