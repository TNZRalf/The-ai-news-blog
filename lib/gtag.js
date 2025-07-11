// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track newsletter signup
export const trackNewsletterSignup = (email) => {
  event({
    action: 'newsletter_signup',
    category: 'engagement',
    label: 'newsletter',
  });
};

// Track contact form submission
export const trackContactForm = () => {
  event({
    action: 'contact_form_submit',
    category: 'engagement',
    label: 'contact',
  });
};

// Track article views
export const trackArticleView = (articleTitle, articleSlug) => {
  event({
    action: 'article_view',
    category: 'content',
    label: articleSlug,
  });
};

// Track support link clicks
export const trackSupportClick = (platform) => {
  event({
    action: 'support_click',
    category: 'monetization',
    label: platform, // 'paypal', 'buymeacoffee'
  });
};

// Track social media clicks
export const trackSocialClick = (platform, context = 'header') => {
  event({
    action: 'social_click',
    category: 'engagement',
    label: `${platform}_${context}`,
  });
};

// Track search queries (for future search functionality)
export const trackSearch = (query, resultsCount = 0) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
    value: resultsCount,
  });
};

// Track donation button clicks
export const trackDonation = (platform) => {
  gtag('event', 'donation_click', {
    event_category: 'Donation',
    event_label: platform, // 'paypal', 'buymeacoffee'
    value: 1
  });
}; 