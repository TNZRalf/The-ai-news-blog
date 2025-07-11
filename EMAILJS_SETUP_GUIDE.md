# EmailJS Setup Guide for AI News Blog

## 📧 Complete EmailJS Configuration

Follow this step-by-step guide to set up your newsletter and contact form backends.

## 🎨 Email Preview

Your professional email templates will look like this:

### Newsletter Email Features:
- 🎯 **Branded Header** with AI News signature gradient
- ✅ **Success indicator** with brand-colored accents
- 📊 **Organized subscriber information** in unified gray sections
- 📋 **Action items** with professional styling
- 📱 **Mobile-responsive** design for all devices

### Contact Form Email Features:
- 📧 **Professional header** with consistent branding
- 📨 **Message preview** with brand accent highlighting
- 👤 **Sender details** with branded clickable email links
- 💬 **Formatted message** content with clean styling
- 💡 **Reply button** in brand colors for quick responses

Both templates use **unified professional design** with consistent color schemes, modern typography, and corporate-level styling optimized for all email clients.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address
4. Log in to your EmailJS dashboard

## Step 2: Add Email Service

1. In your EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (Recommended - easiest setup)
   - **Outlook/Hotmail**
   - **Yahoo Mail**
   - **Custom SMTP**

### For Gmail Setup:
1. Select **"Gmail"**
2. Click **"Connect Account"**
3. Authorize EmailJS to access your Gmail
4. Your service will be created with an ID like `service_xxxxxxx`
5. **Copy this Service ID** - you'll need it later

## Step 3: Create Newsletter Template

1. Click **"Create New Template"**
2. Use these settings:

### Newsletter Template Configuration:
- **Template Name:** `AI News Newsletter Signup`
- **Subject:** `🎯 New Newsletter Subscription - AI News`

**IMPORTANT: Configure Recipients**
- In the template settings, find the **"To"** field
- Enter your email: `{{to_email}}` OR directly enter: `the.ainews0@gmail.com`
- This is crucial to fix the "recipients address is empty" error

### Newsletter Template Content:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Newsletter Subscription - AI News</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ffa61e 0%, #f59e0b 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">
                The AI News
            </h1>
            <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 400;">
                Newsletter Subscription Alert
            </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background: #f8fafc; border: 2px solid #ffa61e; border-radius: 50%; width: 64px; height: 64px; line-height: 60px; font-size: 24px; margin-bottom: 16px; color: #ffa61e;">
                    ✅
                </div>
                <h2 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 600; line-height: 1.3;">
                    New Newsletter Subscription
                </h2>
                <p style="margin: 8px 0 0 0; color: #64748b; font-size: 16px;">
                    A new user has subscribed to your AI News newsletter
                </p>
            </div>
            
            <!-- Subscriber Details -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                    📧 Subscriber Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 30%;">Email:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">{{subscriber_email}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Source:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">{{from_name}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Date:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">{{date}}</td>
                    </tr>
                </table>
            </div>
            
            <!-- Additional Details -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #ffa61e; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                    📝 Subscription Details
                </h4>
                <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                    {{message}}
                </p>
            </div>
            
            <!-- Action Items -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
                <h4 style="margin: 0 0 16px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                    📋 Recommended Actions
                </h4>
                <ul style="margin: 0; padding-left: 20px; color: #64748b;">
                    <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">Add <strong style="color: #ffa61e;">{{subscriber_email}}</strong> to your mailing list</li>
                    <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">Send a welcome email to confirm subscription</li>
                    <li style="margin-bottom: 0; font-size: 14px; line-height: 1.5;">Update your subscriber analytics dashboard</li>
                </ul>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">
                This notification was sent from your AI News website
            </p>
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Powered by The AI News Newsletter System
            </p>
        </div>
    </div>
</body>
</html>
```

### Template Variables (Add these in the Settings tab):
- `to_email` → Your email address
- `subscriber_email` → Subscriber's email
- `from_name` → AI News Newsletter
- `message` → Subscription message
- `date` → Current date

4. **Save the template** and copy the Template ID (like `template_xxxxxxx`)

## Step 4: Create Contact Form Template

1. Click **"Create New Template"** again
2. Use these settings:

### Contact Form Template Configuration:
- **Template Name:** `AI News Contact Form`
- **Subject:** `Contact Form: {{subject}}`

**IMPORTANT: Configure Recipients**
- In the template settings, find the **"To"** field
- Enter your email: `{{to_email}}` OR directly enter: `the.ainews0@gmail.com`
- This is crucial to fix the "recipients address is empty" error

### Contact Form Template Content:
```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - AI News</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ffa61e 0%, #f59e0b 100%); padding: 40px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">
                    The AI News
                </h1>
                <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 400;">
                    Contact Form Submission
                </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="display: inline-block; background: #f8fafc; border: 2px solid #ffa61e; border-radius: 50%; width: 64px; height: 64px; line-height: 60px; font-size: 24px; margin-bottom: 16px; color: #ffa61e;">
                        📨
                    </div>
                    <h2 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 600; line-height: 1.3;">
                        New Contact Message
                    </h2>
                    <p style="margin: 8px 0 0 0; color: #64748b; font-size: 16px;">
                        Someone has sent you a message through your website
                    </p>
                </div>
                
                <!-- Message Subject -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #ffa61e; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
                    <h3 style="margin: 0; color: #1e293b; font-size: 20px; font-weight: 600;">
                        📬 "{{subject}}"
                    </h3>
                </div>
                
                <!-- Sender Information -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">
                        👤 Sender Information
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: 500; width: 25%;">Name:</td>
                            <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">{{from_name}}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
                            <td style="padding: 8px 0;">
                                <a href="mailto:{{from_email}}" style="color: #ffa61e; text-decoration: none; font-weight: 600;">{{from_email}}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Date:</td>
                            <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">{{date}}</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Message Content -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                    <h4 style="margin: 0 0 16px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                        💬 Message Content
                    </h4>
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; white-space: pre-wrap; color: #374151; font-size: 14px; line-height: 1.6;">{{message}}</div>
                </div>
                
                <!-- Quick Reply Section -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center;">
                    <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                        💡 Quick Reply
                    </h4>
                    <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">
                        Click the button below to reply directly to this message
                    </p>
                    <a href="mailto:{{reply_to}}?subject=Re: {{subject}}" style="display: inline-block; background: #ffa61e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; transition: background-color 0.3s ease;">
                        Reply to {{from_name}}
                    </a>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">
                    This message was sent from your AI News website contact form
                </p>
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                    Powered by The AI News Contact System
                </p>
            </div>
        </div>
    </body>
    </html>
```

### Template Variables (Add these in the Settings tab):
- `to_email` → Your email address
- `from_name` → Sender's name
- `from_email` → Sender's email
- `subject` → Contact subject
- `message` → Contact message
- `reply_to` → Sender's email for replies
- `date` → Current date

4. **Save the template** and copy the Template ID (like `template_xxxxxxx`)

## Step 5: Get Your Public Key

1. Go to **"Account"** → **"General"** 
2. Find **"Public Key"** section
3. **Copy your Public Key** (like `user_xxxxxxxxxxxxxxx`)

## Step 6: Configure Environment Variables

Create a `.env.local` file in your project root with these values:

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_newsletter_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_contact_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_xxxxxxxxxxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@gmail.com
```

### Replace with your actual values:
- `service_xxxxxxx` → Your Email Service ID
- `template_newsletter_id` → Your Newsletter Template ID  
- `template_contact_id` → Your Contact Form Template ID
- `user_xxxxxxxxxxxxxxx` → Your Public Key
- `your-email@gmail.com` → Your email address

## Step 7: Test Your Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test Newsletter Signup:**
   - Go to `http://localhost:3000/subscribe`
   - Enter a test email
   - Check if you receive the email

3. **Test Contact Form:**
   - Go to `http://localhost:3000/contact`
   - Fill out the form
   - Check if you receive the email

## 🎯 Quick Setup Checklist

- [ ] EmailJS account created
- [ ] Email service connected (Gmail recommended)
- [ ] Newsletter template created with proper variables
- [ ] Contact form template created with proper variables
- [ ] Public key copied
- [ ] `.env.local` file created with all IDs
- [ ] Newsletter signup tested
- [ ] Contact form tested
- [ ] Both emails received successfully

## 🚨 Troubleshooting

### Common Issues:

1. **"Template not found" error:**
   - Double-check Template IDs in `.env.local`
   - Make sure templates are saved and published

2. **"Service not found" error:**
   - Verify Service ID in `.env.local`
   - Ensure email service is properly connected

3. **Emails not sending:**
   - Check spam folder
   - Verify Public Key is correct
   - Ensure Gmail account is properly authorized

4. **"Demo mode" message:**
   - This means environment variables aren't set
   - Create `.env.local` file with proper values
   - Restart your development server

### Test Email Values:
Use these in your templates for testing:
- **Newsletter Test:** Use your own email as subscriber
- **Contact Test:** Fill all form fields with test data

## 🎨 Email Design Features

Your email templates now include:

### Professional Design Elements:
- **Modern Typography:** Inter font family for clean, corporate appearance
- **Unified Color Scheme:** Consistent neutral grays with brand orange accents
- **Brand Identity:** AI News gradient header with signature orange (#ffa61e)
- **Mobile Responsive:** Optimized for all devices and email clients
- **Visual Hierarchy:** Clean sections with professional gray backgrounds
- **Subtle Shadows:** Professional depth with card-like appearance

### Contact Form Enhancements:
- **📨 Brand-Colored Icon:** Professional message indicator
- **Subject Highlighting:** Clean display with brand accent border
- **Branded Email Links:** Orange-colored mailto links for consistency
- **Professional Reply Button:** Brand-colored CTA with smooth transitions
- **Unified Styling:** Consistent gray sections throughout

### Newsletter Features:
- **✅ Brand-Accented Icon:** Orange-bordered success indicator
- **Unified Sections:** Consistent light gray backgrounds
- **Orange Accents:** Strategic use of brand color for highlights
- **Professional Layout:** Corporate-level information organization

## 🎉 Success!

Once everything is working:
- Your newsletter will collect real email subscriptions
- Contact form will send inquiries directly to your email
- You can deploy to production with confidence!
- **Professional emails** that match your brand quality

## 💡 Pro Tips

1. **Email Management:** Consider using a dedicated email like `ai-news@yourname.com`
2. **Spam Prevention:** EmailJS includes built-in rate limiting
3. **Analytics:** Track form submissions in your email analytics
4. **Backup:** Save your EmailJS configuration details securely
5. **Email Testing:** Send test emails to check formatting across devices
6. **Brand Consistency:** The templates match your website's professional design

## 📱 Email Client Compatibility

These templates are optimized for:
- ✅ Gmail (Web & Mobile)
- ✅ Outlook (Desktop & Web)
- ✅ Apple Mail (macOS & iOS)
- ✅ Thunderbird
- ✅ Mobile email apps
- ✅ Dark mode support

**Need Help?** Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or contact support. 

---

## 🚨 Troubleshooting: 422 Error "Recipients address is empty"

If you're getting this error, it means the EmailJS template isn't configured with a recipient email:

### Quick Fix:
1. Go to your EmailJS dashboard → Email Templates
2. Edit both templates (Newsletter & Contact)
3. In each template's settings, find the **"To"** field
4. Enter: `{{to_email}}` or directly: `the.ainews0@gmail.com`
5. **Save the template**
6. Try the newsletter signup again

### Alternative Fix:
If the issue persists, you can hardcode the recipient email directly in the template settings instead of using the `{{to_email}}` variable.

---

## 📧 Template Variable Reference

### Newsletter Template Variables:
- `to_email` → Your email address (recipient)
- `subscriber_email` → Subscriber's email
- `from_name` → AI News Newsletter
- `message` → Subscription message
- `date` → Current date

### Contact Form Template Variables:
- `to_email` → Your email address (recipient)
- `from_name` → Sender's name
- `from_email` → Sender's email
- `subject` → Contact subject
- `message` → Contact message
- `reply_to` → Sender's email for replies
- `date` → Current date 