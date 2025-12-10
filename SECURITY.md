# Security Documentation

## 🔒 Current Security Status

### ⚠️ **IMPORTANT: API Keys Are Exposed in Client Bundle**

**Current Implementation:**
- Infobip API keys are stored in environment variables with `VITE_` prefix
- These variables are **bundled into the client-side JavaScript**
- Anyone can view your API keys by inspecting the browser's JavaScript bundle
- This is a **security risk** for production use

### ✅ **What's Protected:**

1. **Rate Limiting:**
   - Phone OTP resend limited to **2 attempts per phone number**
   - 1-hour cooldown period after limit reached
   - Prevents spam and reduces billing abuse

2. **Environment Variables:**
   - `.env` file is in `.gitignore` (not committed to repository)
   - Variables are not logged in production builds

3. **Input Validation:**
   - Phone numbers validated and formatted to E.164 standard
   - Email addresses validated before sending

4. **Session Storage:**
   - Verification codes stored in `sessionStorage` (cleared on browser close)
   - Rate limit tracking uses sessionStorage (per-browser, not persistent)

### ❌ **What's NOT Protected:**

1. **API Keys in Client Bundle:**
   - Infobip API key is visible in `dist/assets/*.js` files
   - Anyone can extract and use your API key
   - Could lead to unauthorized usage and billing charges

2. **No Server-Side Validation:**
   - All verification happens client-side
   - No backend validation of requests

## 🛡️ **Recommended Security Improvements**

### **Option 1: Backend Proxy (RECOMMENDED for Production)**

Create a simple backend API that:
- Stores API keys server-side (never exposed to client)
- Handles all Infobip API calls
- Validates requests before forwarding
- Implements additional rate limiting
- Logs usage for monitoring

**Example Architecture:**
```
Frontend → Your Backend API → Infobip API
         (API keys hidden)    (API keys used)
```

**Backend Options:**
- **Node.js/Express** - Simple REST API
- **Vercel Serverless Functions** - Easy deployment
- **Netlify Functions** - Serverless functions
- **AWS Lambda** - Scalable serverless
- **Firebase Functions** - Google Cloud

### **Option 2: Infobip IP Whitelisting**

1. Go to Infobip Portal → API Keys
2. Edit your API key
3. Add "Allowed IP addresses" - restrict to your server IPs only
4. This prevents unauthorized usage even if key is exposed

### **Option 3: Infobip API Key Restrictions**

1. Create a separate API key with minimal permissions
2. Only grant access to 2FA/SMS services
3. Set spending limits in Infobip account
4. Monitor usage regularly

## 📊 **Current Rate Limiting & Geo-Blocking**

### Phone OTP Resend Limits:
- **Maximum Attempts:** 2 per phone number
- **Time Window:** 1 hour
- **Reset:** After 1 hour, attempts reset
- **Tracking:** Stored in browser `sessionStorage` (per-browser)

### Geographic Restrictions:
- **Blocked Regions:** Asian countries (to prevent spam)
- **Blocked Countries Include:**
  - India (+91)
  - Pakistan (+92)
  - Bangladesh (+880)
  - China (+86)
  - And 20+ other Asian countries
- **User Experience:** Users from blocked countries are automatically prompted to use email verification instead
- **Customization:** Blocked country list can be easily modified in `src/utils/resumeVerification.ts`

### Email Verification:
- **No rate limiting** (EmailJS handles this)
- **No geographic restrictions** - available worldwide
- Consider adding rate limiting if you see abuse

## 🔍 **How to Check if Your Keys Are Exposed**

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Search for API key in build files:**
   ```bash
   # Windows PowerShell
   Select-String -Path "dist\assets\*.js" -Pattern "VITE_INFOBIP_API_KEY"
   
   # Or manually check
   # Open dist/assets/index-*.js in a text editor
   # Search for your API key
   ```

3. **If found:** Your keys are exposed. Use a backend proxy.

## 🚨 **Immediate Actions for Production**

1. **Set Infobip Spending Limits:**
   - Log into Infobip Portal
   - Go to Billing → Spending Limits
   - Set daily/monthly limits to prevent unexpected charges

2. **Enable Infobip Usage Alerts:**
   - Set up email alerts for unusual activity
   - Monitor your usage dashboard regularly

3. **Rotate API Keys Regularly:**
   - Create new API keys periodically
   - Revoke old keys that may be exposed

4. **Use IP Whitelisting:**
   - Restrict API key usage to specific IP addresses
   - Prevents unauthorized access even if key is leaked

## 📝 **Best Practices**

### ✅ **DO:**
- Keep `.env` file in `.gitignore`
- Use different API keys for development and production
- Monitor your Infobip usage dashboard
- Set spending limits
- Use backend proxy for production
- Rotate API keys regularly

### ❌ **DON'T:**
- Commit `.env` file to Git
- Share API keys in screenshots or documentation
- Use production API keys in development
- Ignore unusual usage patterns
- Leave API keys without spending limits

## 🔐 **For Production Deployment**

**Before going live, you MUST:**

1. ✅ Implement a backend proxy for API calls
2. ✅ Move API keys to server-side environment variables
3. ✅ Set Infobip spending limits
4. ✅ Enable usage monitoring and alerts
5. ✅ Test rate limiting works correctly
6. ✅ Remove all debug logging

## 📞 **If You Suspect Abuse**

1. **Immediately:**
   - Revoke the exposed API key in Infobip Portal
   - Create a new API key
   - Update your `.env` file

2. **Check Usage:**
   - Review Infobip usage logs
   - Identify suspicious activity
   - Contact Infobip support if needed

3. **Prevent Future Issues:**
   - Implement backend proxy
   - Add IP whitelisting
   - Set stricter rate limits

## 📚 **Additional Resources**

- [Infobip Security Best Practices](https://www.infobip.com/docs/essentials/manage-my-account/security-recommendations)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

**Last Updated:** 2025-01-XX
**Security Level:** ⚠️ Development/Testing Only (Not Production-Ready)

