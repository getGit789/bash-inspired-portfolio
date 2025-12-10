# Welcome to my portfolio  project

## Project info

**URL**: https://damirkranjcevic.com

## How can I edit this code?


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Resume Download Verification System

The resume download feature uses email or phone verification to track who downloads your resume. Users must provide their email or phone number and verify it with a code before downloading.

### Setup Instructions:

#### Option 1: EmailJS (Recommended - Free & Easy)

1. **Sign up for EmailJS** (free tier available):
   - Visit [EmailJS](https://www.emailjs.com/)
   - Create a free account
   - Verify your email

2. **Set up Email Service**:
   - Go to Email Services → Add New Service
   - Choose Gmail, Outlook, or any email service
   - Connect your email account

3. **Create Email Template**:
   - Go to Email Templates → Create New Template
   - Template ID: `resume_verification` (or any name)
   - Subject: `Resume Download Verification Code`
   - Content:
     ```
     Your verification code is: {{verification_code}}
     
     Enter this code in the download dialog to access the resume.
     This code expires in 10 minutes.
     ```
   - To Email: `{{to_email}}`
   - Save the template

4. **Get your credentials**:
   - Service ID: Found in Email Services
   - Template ID: Found in Email Templates
   - Public Key: Found in Account → API Keys

5. **Add to `.env` file**:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   
   # For download notifications (using Web3Forms)
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key
   VITE_OWNER_EMAIL=your.email@example.com
   ```

#### Option 2: Custom API Endpoint

If you have your own backend API:
```
VITE_EMAIL_API_ENDPOINT=https://your-api.com/send-verification-code
```

6. Restart the development server for changes to take effect

#### Option 3: Phone Verification with Infobip (SMS OTP)

1. **Set up Infobip Account**:
   - Log in to [Infobip Portal](https://portal.infobip.com/homepage)
   - Navigate to **API Key Management** to create a new API key
   - Note your **Base URL** (typically `https://[your-region].api.infobip.com` or `https://api.infobip.com`)

2. **Create a 2FA Application**:
   - In Infobip Portal, go to **2FA** → **Applications** → **Create Application**
   - Configure settings:
     - **PIN Attempts**: 3-5 (number of verification attempts allowed)
     - **PIN Time to Live**: 600 seconds (10 minutes)
     - **Verify PIN Limit**: 3-5 (rate limiting)
   - Save and note your **Application ID**

3. **Create a Message Template**:
   - Go to **2FA** → **Message Templates** → **Create Template**
   - **Template Name**: `Resume Verification` (or any name)
   - **Message Text**: `Your verification code is {{pin}}. This code expires in 10 minutes.`
   - **PIN Type**: Numeric
   - **PIN Length**: 6
   - Save and note your **Message ID**

4. **Add to `.env` file**:
   ```
   # Infobip Configuration (for phone OTP)
   VITE_INFOBIP_API_KEY=your_infobip_api_key
   VITE_INFOBIP_BASE_URL=https://api.infobip.com
   VITE_INFOBIP_APPLICATION_ID=your_application_id
   VITE_INFOBIP_MESSAGE_ID=your_message_id
   ```

5. **Security Note**: 
   - ⚠️ **For production**, consider using a backend proxy to keep API keys secure
   - The current implementation works but exposes API keys in the client bundle
   - Infobip API keys should ideally be stored server-side

6. Restart the development server for changes to take effect

### How It Works:

**Email Verification:**
1. User clicks "Download Resume"
2. User selects "Email" and enters their email address
3. A 6-digit verification code is sent to their email
4. User enters the code to verify
5. Resume downloads automatically

**Phone Verification:**
1. User clicks "Download Resume"
2. User selects "Phone" and enters their phone number (with country code, e.g., +381 60 123 4567)
3. A 6-digit OTP is sent via SMS to their phone via Infobip
4. User enters the code to verify
5. Resume downloads automatically

**Notifications:**
- You receive an email notification with:
  - The user's email/phone number
  - Timestamp of download
  - IP address (if available)

### Features:

- ✅ Email verification with 6-digit code (via EmailJS)
- ✅ Phone verification with SMS OTP (via Infobip 2FA API)
- ✅ Code expiration (10 minutes)
- ✅ Resend code functionality
- ✅ Download tracking and notifications
- ✅ Phone number formatting (E.164 standard)
- ✅ Automatic country code detection for Serbian/European numbers (defaults to +381)

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

