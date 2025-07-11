# Configuration Guide

## Environment Variables Setup

To enable full functionality of your AI News blog, you need to create a `.env.local` file in your project root with the following variables:

### EmailJS Configuration (Newsletter & Contact Forms)

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_jn4wsjb
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_newsletter_template_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
```

#### How to set up EmailJS:

1. **Create an EmailJS account** at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Add an email service** (Gmail, Outlook, etc.)
3. **Create TWO email templates:**

#### Newsletter Template Variables:
   - `{{to_email}}` - Your email address
   - `{{subscriber_email}}` - The subscriber's email
   - `{{from_name}}` - AI News Newsletter
   - `{{subject}}` - Email subject
   - `{{message}}` - Subscription message

#### Contact Form Template Variables:
   - `{{to_email}}` - Your email address
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Contact subject
   - `{{message}}` - Contact message
   - `{{reply_to}}` - Sender's email for replies

4. **Get your public key** from Account → API Keys

### Sample Email Templates for EmailJS:

#### Newsletter Template:
```
Subject: New Newsletter Subscription

You have a new newsletter subscription:

Email: {{subscriber_email}}
Source: {{from_name}}

Message: {{message}}
```

#### Contact Form Template:
```
Subject: Contact Form: {{subject}}

You have a new contact form submission:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

### Other Configuration Variables

```bash
# AdSense (for monetization)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-your_publisher_id

# Admin Panel
ADMIN_PASSWORD=your_secure_password
```

## Current Status

✅ **Newsletter backend implemented** - Ready for EmailJS configuration
✅ **Contact form backend implemented** - Ready for EmailJS configuration  
✅ **Legal pages created** - Privacy Policy and Terms of Service added
✅ **SEO essentials implemented** - robots.txt, sitemap.xml, custom error pages
✅ **Performance optimization** - Next.js config with image optimization, compression, security headers
⚠️ **Environment variables needed** - Create `.env.local` file with both template IDs
🔧 **EmailJS account required** - Sign up and configure two templates

## Recently Added Features

### Legal Compliance
- 📄 **Privacy Policy** at `/privacy` - Comprehensive privacy policy covering data collection and cookies
- 📄 **Terms of Service** at `/terms` - Complete terms covering usage, intellectual property, and liability
- 🔗 **Footer navigation** - Legal pages accessible from footer on all pages

### SEO & Performance
- 🤖 **robots.txt** - Search engine crawler guidance
- 🗺️ **sitemap.xml** - Dynamic sitemap including all pages and articles  
- 🚫 **Custom 404 page** - User-friendly not found page with navigation
- ⚠️ **Custom 500 page** - Professional server error page
- ⚡ **Next.js optimization** - Image optimization, compression, security headers
- 🔒 **Security headers** - XSS protection, content type sniffing prevention

## Next Steps

1. Create `.env.local` file with your EmailJS credentials (both templates)
2. Set up EmailJS account with newsletter + contact templates  
3. Test both newsletter signup and contact form functionality
4. Ready for production deployment! 🚀 