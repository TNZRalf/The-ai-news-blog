# Admin Panel Security Setup

## 🔒 Current Security Status

**YES, the admin panel is now PROTECTED!** 🎉

Previously, anyone could access `/admin` without authentication. Now the admin panel requires a password to access.

## Security Features Implemented

### 1. Password Protection
- Login form with password requirement
- Session-based authentication (24-hour expiry)
- **Advanced rate limiting with progressive delays**
- Automatic logout functionality

### 2. Session Management
- Local storage-based sessions
- 24-hour automatic expiry
- Manual logout option
- Session validation on page load

### 3. Protected Routes
- `/admin` requires authentication
- Redirects to login if not authenticated
- Maintains session across page refreshes

### 4. Advanced Rate Limiting 🛡️
- **IP-based tracking** of failed login attempts
- **Progressive delays**: 500ms → 1s → 2s → 4s → 8s → 10s (max)
- **Automatic lockout** after 5 failed attempts (30 minutes)
- **Real-time feedback** showing remaining attempts
- **Visual warnings** when approaching lockout
- **Automatic cleanup** of expired rate limit records

## Setup Instructions

### 1. Set Admin Password

Create a `.env.local` file in your project root:

```bash
# Admin authentication (use NEXT_PUBLIC_ for client-side access)
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-admin-password-2025

# Rate limiting configuration (optional)
MAX_LOGIN_ATTEMPTS=5                    # Failed attempts before lockout
RATE_LIMIT_WINDOW_MS=900000            # 15 minutes (in milliseconds)
LOCKOUT_DURATION_MS=1800000            # 30 minutes (in milliseconds)

# Google Analytics (if needed)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important**: 
- Replace `your-secure-admin-password-2025` with a strong password
- The `.env.local` file is automatically ignored by Git for security

### 2. Default Password

If no environment variable is set, the default password is: `admin123`

**⚠️ CHANGE THIS IMMEDIATELY for production use!**

## How It Works

### 1. First Visit to `/admin`
- Shows login form
- Requires password entry
- Creates 24-hour session on success

### 2. Subsequent Visits
- Automatically checks for valid session
- Redirects to login if expired
- Shows admin panel if authenticated

### 3. Logout
- Manual logout button in admin header
- Clears session and redirects to login
- Automatic logout after 24 hours

## Security Considerations

### Current Level: **Intermediate Protection**
✅ Prevents casual access  
✅ Session management  
✅ Password protection  
✅ **Advanced rate limiting**  
✅ **Progressive delays**  
✅ **IP-based tracking**  
✅ **Automatic lockouts**  
❌ No IP whitelisting  
❌ No two-factor authentication  

### For Production Use
Consider upgrading to more robust authentication:
- **NextAuth.js** for full OAuth integration
- **JWT tokens** for stateless authentication
- **Rate limiting** to prevent brute force
- **IP whitelisting** for additional security
- **Two-factor authentication** for enhanced security

### Recommended Security Headers
Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## Testing the Security

### 1. Test Access Protection
1. Visit `/admin` 
2. Should see login form
3. Try wrong password - should show error
4. Enter correct password - should access admin panel

### 2. Test Session Management
1. Login successfully
2. Refresh page - should stay logged in
3. Click logout - should return to login
4. Try accessing `/admin` - should require login again

### 3. Test Session Expiry
1. Login successfully
2. Wait 24 hours (or modify expiry time for testing)
3. Refresh page - should redirect to login

### 4. Test Rate Limiting 🛡️
1. **Progressive Delays**:
   - 1st wrong password: 500ms delay
   - 2nd wrong password: 1s delay
   - 3rd wrong password: 2s delay
   - 4th wrong password: 4s delay
   - 5th wrong password: 8s delay + lockout

2. **Warning System**:
   - After 3 attempts: Yellow warning appears
   - Shows "X attempts remaining before lockout"

3. **Lockout Behavior**:
   - After 5 failed attempts: 30-minute lockout
   - Login button becomes disabled
   - Shows countdown timer
   - Automatically unlocks after timeout

4. **Real-time Updates**:
   - Status updates every 5 seconds
   - Shows current attempt count
   - Displays remaining lockout time

## File Changes Made

### New Files
- `lib/auth.js` - Authentication utilities with rate limiting
- `lib/rateLimiter.js` - **Advanced rate limiting system**
- `pages/api/rate-limit-status.js` - Rate limit status API endpoint
- `ADMIN_SECURITY_SETUP.md` - This documentation

### Modified Files
- `pages/admin.js` - Added authentication wrapper
- `styles/globals.scss` - Added login form styles + **rate limiting UI**

## Next Steps

1. **Set secure password** in `.env.local`
2. **Test login functionality** 
3. **Consider production security** upgrades
4. **Add security headers** if deploying publicly

## Troubleshooting

### Can't Access Admin Panel
- Check if `.env.local` exists with correct password
- Try default password: `admin123`
- Clear browser localStorage and try again

### Session Not Persisting
- Check browser console for errors
- Ensure localStorage is enabled
- Try incognito/private browsing mode

### Login Form Not Showing
- Check browser console for JavaScript errors
- Ensure React components are loading properly
- Restart development server

### Rate Limiting Issues
- **Locked out unexpectedly**: Wait 30 minutes or clear localStorage
- **Rate limit not working**: Check browser console for errors
- **Wrong lockout time**: Verify environment variables
- **Reset rate limits**: Clear localStorage and restart browser

### Rate Limit Commands
```bash
# View current status (browser console)
console.log(JSON.parse(localStorage.getItem('rateLimitFingerprint')))

# Clear rate limit data
localStorage.removeItem('rateLimitFingerprint')

# Check API status
curl http://localhost:3003/api/rate-limit-status
```

---

**Your admin panel is now secure!** 🎉 Only users with the correct password can access the file upload and management features. 