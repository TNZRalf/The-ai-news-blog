# Login Troubleshooting Guide

## 🔍 Password Issue Debug Steps

**You said the correct password isn't working.** Let's figure out what's happening!

## Step 1: Check What Password Should Work

### Default Password
If you haven't set a custom password, the default is: **`admin123`**

### Custom Password Setup
If you want to set a custom password, create a `.env.local` file in your project root:

```bash
# For client-side access (REQUIRED for this setup)
NEXT_PUBLIC_ADMIN_PASSWORD=your-custom-password-here

# Note: ADMIN_PASSWORD (without NEXT_PUBLIC_) won't work for client-side auth
```

## Step 2: Debug in Browser

1. **Visit** `/admin` 
2. **Open browser console** (Press F12, go to Console tab)
3. **Try to login** with your password
4. **Look for debug messages** like:

```
🔍 Admin Password Debug:
- ADMIN_PASSWORD: [SET] or [NOT SET]
- NEXT_PUBLIC_ADMIN_PASSWORD: [SET] or [NOT SET]  
- Using password: DEFAULT (admin123) or CUSTOM
- Password length: 8

🔐 Login Debug:
- Entered password: yourpassword
- Expected password: admin123
- Passwords match: false
- Password lengths: {entered: 12, expected: 8}
```

## Step 3: What The Debug Info Tells You

### If you see "Using password: DEFAULT (admin123)"
- **Try password**: `admin123` (exactly as written)
- No custom password is set

### If you see "Using password: CUSTOM"  
- A custom password is set in your environment file
- Check your `.env.local` file to see what it should be

### If passwords don't match but look the same
- Check for extra spaces
- Check for different characters (copy/paste issues)
- Check password length

## Step 4: Quick Fixes

### Reset to Default
1. **Delete or rename** your `.env.local` file
2. **Restart** the development server: `npm run dev`
3. **Try password**: `admin123`

### Check Environment File
If you have `.env.local`:
```bash
# Show content (Windows PowerShell)
Get-Content .env.local

# Show content (Command Prompt)  
type .env.local
```

### Clear Browser Data
Sometimes browser cache causes issues:
```javascript
// Browser console (F12):
localStorage.clear();
location.reload();
```

## Step 5: Test Environment Variables

### Check in Browser Console
```javascript
// Check what the system thinks the password is:
console.log('Expected password:', process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123');
```

## Step 6: Create Working Environment File

If you want a custom password, create `.env.local`:

```bash
# Use NEXT_PUBLIC_ prefix for client-side access
NEXT_PUBLIC_ADMIN_PASSWORD=MySecurePassword123

# Rate limiting (optional)
MAX_LOGIN_ATTEMPTS=5
RATE_LIMIT_WINDOW_MS=900000
LOCKOUT_DURATION_MS=1800000

# Google Analytics (if needed)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important**: Restart your dev server after creating/editing `.env.local`!

## Common Issues & Solutions

### Issue: "admin123 doesn't work"
**Solution**: Check browser console debug info to see what password is actually expected

### Issue: "Custom password doesn't work"  
**Solution**: Make sure you're using `NEXT_PUBLIC_ADMIN_PASSWORD` (not just `ADMIN_PASSWORD`)
- ❌ `ADMIN_PASSWORD=mypassword` (won't work for client-side auth)
- ✅ `NEXT_PUBLIC_ADMIN_PASSWORD=mypassword` (works)

### Issue: "Still not working after changes"
**Solution**: Restart development server: Stop (Ctrl+C) then `npm run dev`

### Issue: "No debug info appears"
**Solution**: Make sure you're in development mode and browser console is open

## Final Test

1. **Delete** `.env.local` (if it exists)
2. **Restart** dev server: `npm run dev`  
3. **Visit** `/admin`
4. **Use password**: `admin123`
5. **Check console** for debug messages

This should work! If not, the debug info will tell us exactly what's wrong.

---

**Need immediate access?** The default password is `admin123` unless you've specifically changed it. 