# 🔑 EmailJS Credentials Template

Copy the content below into a new file named `.env.local` in your project root.

## 📋 Step-by-Step Setup:

1. **Copy this entire code block below**
2. **Create a new file** named `.env.local` in your project root
3. **Paste the content** into that file
4. **Replace all placeholder values** with your actual EmailJS credentials
5. **Save the file** and restart your development server

---

## 📄 .env.local File Content:

```bash
# =============================================================================
# EmailJS Configuration for AI News Blog
# =============================================================================
# Follow the EMAILJS_SETUP_GUIDE.md to get these values from your EmailJS dashboard

# 📧 EmailJS Service ID
# Get this from: EmailJS Dashboard → Email Services → Your Gmail Service
# Example: service_abc1234
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here

# 📰 Newsletter Template ID  
# Get this from: EmailJS Dashboard → Email Templates → Newsletter Template
# Example: template_newsletter123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_newsletter_template_id_here

# 📞 Contact Form Template ID
# Get this from: EmailJS Dashboard → Email Templates → Contact Form Template  
# Example: template_contact456
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id_here

# 🔑 EmailJS Public Key
# Get this from: EmailJS Dashboard → Account → General → Public Key
# Example: user_abcdefghij1234567890
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here

# 📮 Your Email Address
# The email where you want to receive newsletter signups and contact messages
# This should be the same email you used to set up EmailJS
NEXT_PUBLIC_CONTACT_EMAIL=your-email@gmail.com
```

---

## 🎯 Quick Reference Guide:

### Where to Get Each Credential:

| Credential | Location in EmailJS Dashboard | Example Format |
|------------|-------------------------------|----------------|
| **Service ID** | Email Services → Your Gmail Service | `service_abc1234` |
| **Newsletter Template ID** | Email Templates → Newsletter Template | `template_newsletter123` |
| **Contact Template ID** | Email Templates → Contact Form Template | `template_contact456` |
| **Public Key** | Account → General → Public Key | `user_abcdefghij1234567890` |
| **Your Email** | The email you used for EmailJS setup | `youremail@gmail.com` |

---

## ✅ Setup Checklist:

- [ ] Created `.env.local` file in project root
- [ ] Copied the template content above
- [ ] Replaced `your_service_id_here` with actual Service ID
- [ ] Replaced `your_newsletter_template_id_here` with Newsletter Template ID
- [ ] Replaced `your_contact_template_id_here` with Contact Template ID  
- [ ] Replaced `your_public_key_here` with actual Public Key
- [ ] Replaced `your-email@gmail.com` with your real email address
- [ ] Saved the file as `.env.local` (exactly this name)
- [ ] Restarted development server with `npm run dev`
- [ ] Tested newsletter signup at `/subscribe`
- [ ] Tested contact form at `/contact`

---

## 🚨 Important Notes:

1. **File Name:** Must be exactly `.env.local` (not `.env` or `.env.template`)
2. **Security:** This file is automatically ignored by git
3. **No Quotes:** Don't put quotes around the values
4. **Exact Names:** Use the exact variable names shown above
5. **Restart Required:** Restart your dev server after creating/changing this file

---

## 💡 Example (Don't Copy These - Get Your Own!):

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_newsletter456
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_contact789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abcdefghij1234567890
NEXT_PUBLIC_CONTACT_EMAIL=john@gmail.com
```

---

## 🔧 After Setup:

Once your `.env.local` file is configured:

1. **Test Newsletter:** Go to `http://localhost:3000/subscribe`
2. **Test Contact:** Go to `http://localhost:3000/contact`
3. **Check Email:** You should receive professional emails in your inbox
4. **Ready to Deploy:** Your forms will work in production!

---

**Need the EmailJS setup guide?** Check `EMAILJS_SETUP_GUIDE.md` for complete instructions with email template HTML code. 