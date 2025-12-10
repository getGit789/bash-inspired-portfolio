# Infobip Phone OTP Setup Guide

## ✅ Credentials You Already Have

- **API Key**: `e0529c7664809773d9bf1531ec89f7d5-87a1bebe-9fa8-4469-afab-60e82f09281b`
- **Base URL**: `5585mj.api.infobip.com` (will use as `https://5585mj.api.infobip.com`)

## 🚀 Quick Setup: Create via API (Recommended - Fastest Method)

Since you already have your API credentials, you can create both the Application and Message Template programmatically using the Infobip API. This is the fastest method!

### Option A: Using cURL (Terminal/Command Line)

**1. Create 2FA Application:**

```bash
curl -X POST "https://5585mj.api.infobip.com/2fa/2/applications" \
  -H "Authorization: App e0529c7664809773d9bf1531ec89f7d5-87a1bebe-9fa8-4469-afab-60e82f09281b" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Resume Download OTP",
    "enabled": true,
    "configuration": {
      "pinAttempts": 5,
      "pinTimeToLive": "600s",
      "verifyPinLimit": "5/1d",
      "sendPinPerApplicationLimit": "50/1d",
      "sendPinPerPhoneNumberLimit": "3/1d"
    }
  }'
```

**Copy the `applicationId` from the response!**

**2. Create Message Template (replace `YOUR_APPLICATION_ID` with the ID from step 1):**

```bash
curl -X POST "https://5585mj.api.infobip.com/2fa/2/applications/YOUR_APPLICATION_ID/messages" \
  -H "Authorization: App e0529c7664809773d9bf1531ec89f7d5-87a1bebe-9fa8-4469-afab-60e82f09281b" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "language": "en",
    "messageText": "Your verification code is {{pin}}. This code expires in 10 minutes.",
    "pinType": "NUMERIC",
    "pinLength": 6,
    "pinPlaceholder": "{{pin}}",
    "regional": {
      "indiaDlt": {
        "principalEntityId": "",
        "contentTemplateId": ""
      }
    }
  }'
```

**Copy the `messageId` from the response!**

### Option B: Using Node.js Script

Create a file `setup-infobip.js` in your project root:

```javascript
const API_KEY = 'e0529c7664809773d9bf1531ec89f7d5-87a1bebe-9fa8-4469-afab-60e82f09281b';
const BASE_URL = 'https://5585mj.api.infobip.com';

async function setupInfobip() {
  try {
    // Step 1: Create 2FA Application
    console.log('Creating 2FA Application...');
    const appResponse = await fetch(`${BASE_URL}/2fa/2/applications`, {
      method: 'POST',
      headers: {
        'Authorization': `App ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: 'Resume Download OTP',
        enabled: true,
        configuration: {
          pinAttempts: 5,
          pinTimeToLive: '600s',
          verifyPinLimit: '5/1d',
          sendPinPerApplicationLimit: '50/1d',
          sendPinPerPhoneNumberLimit: '3/1d',
        },
      }),
    });

    const appData = await appResponse.json();
    
    if (!appResponse.ok) {
      throw new Error(`Failed to create application: ${JSON.stringify(appData)}`);
    }

    const applicationId = appData.applicationId;
    console.log('✅ Application created!');
    console.log(`Application ID: ${applicationId}`);

    // Step 2: Create Message Template
    console.log('\nCreating Message Template...');
    const messageResponse = await fetch(`${BASE_URL}/2fa/2/applications/${applicationId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `App ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        language: 'en',
        messageText: 'Your verification code is {{pin}}. This code expires in 10 minutes.',
        pinType: 'NUMERIC',
        pinLength: 6,
        pinPlaceholder: '{{pin}}',
      }),
    });

    const messageData = await messageResponse.json();
    
    if (!messageResponse.ok) {
      throw new Error(`Failed to create message template: ${JSON.stringify(messageData)}`);
    }

    const messageId = messageData.messageId;
    console.log('✅ Message Template created!');
    console.log(`Message ID: ${messageId}`);

    // Step 3: Display final configuration
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Setup Complete! Add these to your .env file:');
    console.log('='.repeat(60));
    console.log(`VITE_INFOBIP_APPLICATION_ID=${applicationId}`);
    console.log(`VITE_INFOBIP_MESSAGE_ID=${messageId}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupInfobip();
```

**Run the script:**
```bash
node setup-infobip.js
```

## 📋 Alternative: Create via Portal UI (Manual Method)

If you prefer using the web interface:

### Step 1: Create 2FA Application

1. **Log in to Infobip Portal**
   - Go to: https://portal.infobip.com/homepage

2. **Navigate to 2FA Applications**
   - In the left sidebar, click on **"2FA"** (or search for "2FA")
   - Click on **"Applications"** in the submenu
   - Click the **"Create Application"** button (usually top right)

3. **Configure Application Settings**
   - **Application Name**: `Resume Download OTP` (or any name you prefer)
   - **PIN Attempts**: `5` (number of times user can try entering the code)
   - **PIN Time to Live**: `600` seconds (10 minutes - code expires after this)
   - **Verify PIN Limit**: `5` (rate limiting - max verification attempts)
   - **Language**: Select your preferred language (English recommended)

4. **Save and Copy Application ID**
   - Click **"Save"** or **"Create"**
   - After creation, you'll see the **Application ID** (looks like: `12345678-1234-1234-1234-123456789abc`)
   - **Copy this ID** - you'll need it for the `.env` file

### Step 2: Create Message Template

1. **Navigate to Message Templates**
   - Still in the **"2FA"** section
   - Click on **"Message Templates"** in the submenu
   - Click the **"Create Template"** button

2. **Configure Template Settings**
   - **Template Name**: `Resume Verification OTP` (or any name)
   - **Message Text**: 
     ```
     Your verification code is {{pin}}. This code expires in 10 minutes.
     ```
     (The `{{pin}}` is a placeholder that Infobip will replace with the actual 6-digit code)
   
   - **PIN Type**: Select **"Numeric"**
   - **PIN Length**: `6`
   - **Language**: Match the language you selected for the Application

3. **Save and Copy Message ID**
   - Click **"Save"** or **"Create"**
   - After creation, you'll see the **Message ID** (looks like: `87654321-4321-4321-4321-cba987654321`)
   - **Copy this ID** - you'll need it for the `.env` file

## 🔧 Create Your `.env` File

Create a file named `.env` in your project root directory (same level as `package.json`) with the following content:

```env
# EmailJS Configuration (for email verification)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Web3Forms Configuration (for download notifications)
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
VITE_OWNER_EMAIL=your.email@example.com

# Infobip Configuration (for phone OTP)
VITE_INFOBIP_API_KEY=e0529c7664809773d9bf1531ec89f7d5-87a1bebe-9fa8-4469-afab-60e82f09281b
VITE_INFOBIP_BASE_URL=https://5585mj.api.infobip.com
VITE_INFOBIP_APPLICATION_ID=your_application_id_here
VITE_INFOBIP_MESSAGE_ID=your_message_id_here
```

**Replace:**
- `your_application_id_here` → The Application ID you copied from Step 4 above
- `your_message_id_here` → The Message ID you copied from Step 3 above

## ✅ Final Checklist

- [ ] Created 2FA Application (via API or Portal)
- [ ] Copied Application ID
- [ ] Created Message Template (via API or Portal)
- [ ] Copied Message ID
- [ ] Created `.env` file in project root
- [ ] Added all Infobip credentials to `.env` file
- [ ] Replaced `your_application_id_here` with actual Application ID
- [ ] Replaced `your_message_id_here` with actual Message ID

## 🚀 Test It Out

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Test the phone verification:**
   - Click "Download Resume" on your website
   - Select "Phone" option
   - Enter a test phone number (e.g., `+381 60 123 4567`)
   - You should receive an SMS with a 6-digit code
   - Enter the code to verify and download

## 🆘 Troubleshooting

**If you can't find "2FA" in the sidebar:**
- Look for "Two-Factor Authentication" or "2FA Service"
- It might be under "Platform" or "Services" section
- Use the search bar in the portal to find "2FA"

**If you get authentication errors:**
- Double-check your API Key is correct (no extra spaces)
- Verify Base URL includes `https://` prefix
- Make sure Application ID and Message ID are correct

**If SMS doesn't arrive:**
- Check that your Infobip account has SMS credits/balance
- Verify the phone number is in E.164 format (+381...)
- Check the Infobip portal logs for delivery status

## 🔧 Tech Stack Used

**Current Implementation:**
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **API Client**: Native Fetch API (no SDK needed)
- **Authentication**: Infobip REST API with `Authorization: App {API_KEY}` header

**Why This Approach:**
- ✅ No additional dependencies required
- ✅ Lightweight and fast
- ✅ Works directly in the browser
- ✅ Easy to debug and maintain
- ✅ Follows Infobip's official REST API documentation

**Note**: For production, consider moving API calls to a backend proxy to keep API keys secure.

## 📚 Additional Resources

- [Infobip 2FA API Documentation](https://www.infobip.com/docs/api/channels/sms/2fa/2fa-configuration/create-2fa-application)
- [Infobip 2FA Service Overview](https://www.infobip.com/docs/2fa-service)
- [Infobip API Reference](https://www.infobip.com/docs/api)
- [Infobip Support](https://www.infobip.com/support)

