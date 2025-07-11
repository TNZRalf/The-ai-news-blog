import React from "react";
import Image from "next/image";

export default function AdBlock({ 
  imageUrl = "https://images.unsplash.com/photo-1620712943543-2858200f7426?auto=format&fit=crop&w=800&q=80",
  label = "Advertisement",
  description = "Sponsored Content",
  buttonText = "Learn More",
  linkUrl = "#",
  alt = "Advertisement image"
}) {
  const handleAdClick = () => {
    if (linkUrl && linkUrl !== "#") {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('Ad clicked - no URL provided');
    }
  };

  return (
    <div className="ad-block" role="region" aria-label="Advertisement">
      {imageUrl && (
        <div className="ad-block-image-container">
          <Image
            className="ad-block-image"
            src={imageUrl}
            alt={alt}
            width={300}
            height={200}
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      )}
      
      <div className="ad-block-content">
        <div className="ad-block-info">
          <p className="ad-block-label">{label}</p>
          <p className="ad-block-desc">{description}</p>
        </div>
        
        <button 
          className="ad-block-btn"
          onClick={handleAdClick}
          aria-label={`${buttonText} - ${description}`}
          type="button"
        >
          <span>{buttonText}</span>
        </button>
      </div>
    </div>
  );
} 