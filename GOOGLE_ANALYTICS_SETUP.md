# Google Analytics 4 Setup Guide

## Quick Setup Steps

### 1. Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account name (e.g., "The AI NEWS")
5. Set up property:
   - Property name: "The AI NEWS"
   - Time zone: Your location
   - Currency: Your preference

### 2. Set up Data Stream
1. Choose "Web" platform
2. Enter your website URL: `https://ainews.com` (or your domain)
3. Stream name: "AI News Website"
4. Click "Create stream"
5. **Copy the Measurement ID** (format: G-XXXXXXXXXX)

### 3. Add to Environment Variables
Add this line to your `.env.local` file:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```
Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 4. Complete .env.local File
Your `.env.local` should contain:
```
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_jn4wsjb
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_47yrinp
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_48piq8a
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AKKx5n4W02g1HEfIp
NEXT_PUBLIC_CONTACT_EMAIL=the.ainews0@gmail.com

# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://ainews.com
NEXT_PUBLIC_SITE_NAME=The AI NEWS
```

## What's Already Implemented

✅ **Automatic Page Tracking**: All page views are tracked automatically
✅ **Route Change Tracking**: SPA navigation is tracked
✅ **Newsletter Signups**: Tracks successful newsletter subscriptions
✅ **Contact Form Submissions**: Tracks successful contact form submissions  
✅ **Article Views**: Tracks when users view specific articles

## Available Tracking Functions

The following tracking functions are available in `/lib/gtag.js`:

### Core Functions
- `pageview(url)` - Track page views (automatic)
- `event({ action, category, label, value })` - Track custom events

### Pre-built Tracking
- `trackNewsletterSignup(email)` - Track newsletter subscriptions ✅ Implemented
- `trackContactForm()` - Track contact form submissions ✅ Implemented  
- `trackArticleView(title, slug)` - Track article views ✅ Implemented
- `trackSupportClick(platform)` - Track donation button clicks
- `trackSocialClick(platform, context)` - Track social media clicks
- `trackSearch(query, resultsCount)` - Track search queries (for future use)

## Next Steps (Optional)

### 1. Add Support Link Tracking
Update support buttons to track clicks:
```javascript
import { trackSupportClick } from '../lib/gtag';

// In your support component
onClick={() => trackSupportClick('paypal')}
```

### 2. Add Social Media Tracking  
Update social links to track clicks:
```javascript
import { trackSocialClick } from '../lib/gtag';

// In your social components
onClick={() => trackSocialClick('twitter', 'footer')}
```

### 3. Set up Goals in GA4
1. Go to Admin → Events → Create Event
2. Set up conversion goals for:
   - Newsletter signups (`newsletter_signup`)
   - Contact form submissions (`contact_form_submit`)
   - Article engagement

### 4. Enable Enhanced Ecommerce (Future)
If you add paid subscriptions or merchandise:
- Set up ecommerce tracking
- Track purchase events
- Monitor revenue metrics

## Testing the Implementation

1. **Development Testing**:
   - Open browser developer tools
   - Go to Network tab
   - Visit your site and navigate around
   - Look for requests to `google-analytics.com` or `googletagmanager.com`

2. **Real-time Reports**:
   - Go to GA4 Reports → Real-time
   - Navigate your site in another tab
   - You should see activity in real-time

3. **Event Testing**:
   - Subscribe to newsletter
   - Submit contact form
   - Check GA4 Real-time Events

## Common Issues

**No data showing up?**
- Verify `NEXT_PUBLIC_GA_ID` is correct (starts with G-)
- Check browser console for errors
- Ensure ad blockers aren't blocking analytics
- GA4 data can take 24-48 hours to appear in reports

**Localhost tracking:**
- GA4 works on localhost by default
- You'll see local traffic in reports during development

## Privacy Considerations

The implementation:
- ✅ Only tracks anonymous usage data
- ✅ Doesn't collect personal information without consent
- ✅ Respects user privacy settings
- ✅ Compatible with cookie consent tools

Consider adding a privacy notice about analytics tracking in your privacy policy.

## Analytics Insights You'll Get

Once set up, you'll see:
- **User Behavior**: Page views, session duration, bounce rate
- **Content Performance**: Most popular articles, reading patterns
- **Engagement**: Newsletter signup rates, contact form completion
- **Acquisition**: How users find your site (search, social, direct)
- **Real-time Activity**: Live visitor tracking
- **Geographic Data**: Where your readers are located
- **Device/Browser Data**: Technical insights about your audience

Start with basic setup and add more advanced tracking as your site grows! 