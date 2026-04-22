// Utility functions for resume download verification

export interface VerificationRequest {
  email?: string;
  phone?: string;
  type: 'email' | 'phone';
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
  code?: string;
  pinId?: string; // For Infobip phone verification
  rateLimitExceeded?: boolean; // Indicates rate limit was hit
  blockedCountry?: boolean; // Indicates country is blocked
}

// Generate a random 6-digit verification code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Format phone number to E.164 standard (required by Infobip)
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, assume it's a Serbian number and add +381
  if (!cleaned.startsWith('+')) {
    // Remove leading 381 if present (Serbia country code)
    if (cleaned.startsWith('381') && cleaned.length >= 12) {
      cleaned = cleaned.substring(3);
    }
    // Remove leading 0 if present (common in Serbian local format)
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
    cleaned = '+381' + cleaned;
  }
  
  return cleaned;
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  const formatted = formatPhoneNumber(phone);
  // E.164 format: + followed by 1-15 digits
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(formatted);
};

// Blocked Asian country codes (to prevent spam)
// Includes: India, Pakistan, Bangladesh, China, and other Asian countries
// NOTE: To modify this list, edit the BLOCKED_ASIAN_COUNTRY_CODES array below
const BLOCKED_ASIAN_COUNTRY_CODES = [
  '+91',  // India
  '+92',  // Pakistan
  '+880', // Bangladesh
  '+86',  // China
  '+62',  // Indonesia
  '+84',  // Vietnam
  '+66',  // Thailand
  '+60',  // Malaysia
  '+63',  // Philippines
  '+65',  // Singapore
  '+81',  // Japan
  '+82',  // South Korea
  '+852', // Hong Kong
  '+853', // Macau
  '+886', // Taiwan
  '+977', // Nepal
  '+94',  // Sri Lanka
  '+95',  // Myanmar
  '+855', // Cambodia
  '+856', // Laos
  '+673', // Brunei
  '+670', // East Timor
  '+976', // Mongolia
  '+998', // Uzbekistan
  '+996', // Kyrgyzstan
  '+992', // Tajikistan
  '+993', // Turkmenistan
  // Note: +7 is shared between Kazakhstan and Russia
  // Uncomment the line below if you want to block Kazakhstan (may also block some Russian numbers)
  // '+7',   // Kazakhstan/Russia
];

/**
 * Check if phone number is from a blocked Asian country
 * Returns true if blocked, false if allowed
 */
export const isBlockedAsianCountry = (phone: string): boolean => {
  const formatted = formatPhoneNumber(phone);
  
  // Check against blocked country codes
  for (const code of BLOCKED_ASIAN_COUNTRY_CODES) {
    if (formatted.startsWith(code)) {
      return true;
    }
  }
  
  return false;
};

/** Email OTP works if any of EmailJS, custom API, or Web3Forms+owner is configured. */
export const isEmailVerificationConfigured = (): boolean => {
  const emailjs =
    !!import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const api = !!import.meta.env.VITE_EMAIL_API_ENDPOINT;
  const web3 =
    !!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY &&
    !!import.meta.env.VITE_OWNER_EMAIL;
  return emailjs || api || web3;
};

/** SMS OTP requires full Infobip 2FA application + message template. */
export const isPhoneVerificationConfigured = (): boolean => {
  return (
    !!import.meta.env.VITE_INFOBIP_API_KEY &&
    !!import.meta.env.VITE_INFOBIP_APPLICATION_ID &&
    !!import.meta.env.VITE_INFOBIP_MESSAGE_ID
  );
};

const misconfiguredEmailMessage = (): string =>
  import.meta.env.DEV
    ? 'Email verification is not configured. Set VITE_EMAILJS_* (recommended), or VITE_EMAIL_API_ENDPOINT, or VITE_WEB3FORMS_ACCESS_KEY + VITE_OWNER_EMAIL in .env and restart the dev server.'
    : 'Email verification is temporarily unavailable. Please use the Contact page to reach out, or try again later.';

const misconfiguredPhoneMessage = (missing: string[]): string =>
  import.meta.env.DEV
    ? `Infobip is not configured. Missing: ${missing.join(', ')}. Add them to .env and restart.`
    : 'SMS verification is temporarily unavailable. Please use email verification instead, or use the Contact page.';

/**
 * Get the country name from country code (for error messages)
 */
const getCountryName = (phone: string): string => {
  const formatted = formatPhoneNumber(phone);
  
  const countryMap: Record<string, string> = {
    '+91': 'India',
    '+92': 'Pakistan',
    '+880': 'Bangladesh',
    '+86': 'China',
    '+62': 'Indonesia',
    '+84': 'Vietnam',
    '+66': 'Thailand',
    '+60': 'Malaysia',
    '+63': 'Philippines',
    '+65': 'Singapore',
    '+81': 'Japan',
    '+82': 'South Korea',
  };
  
  for (const [code, name] of Object.entries(countryMap)) {
    if (formatted.startsWith(code)) {
      return name;
    }
  }
  
  return 'this region';
};

// Send verification code via email using a backend API endpoint
// For now, we'll use a simple approach with EmailJS or create a backend endpoint
export const sendVerificationCode = async (
  email: string,
  code: string
): Promise<VerificationResponse> => {
  try {
    // Option 1: Use EmailJS (requires setup at emailjs.com)
    const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
      return await sendViaEmailJS(email, code, emailjsServiceId, emailjsTemplateId, emailjsPublicKey);
    }

    // Option 2: Use a backend API endpoint (you'll need to create this)
    const apiEndpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT;
    if (apiEndpoint) {
      return await sendViaAPI(email, code, apiEndpoint);
    }

    // Fallback: Use Web3Forms but send to owner who forwards (not ideal)
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const ownerEmail = import.meta.env.VITE_OWNER_EMAIL;

    if (web3formsKey && ownerEmail) {
      // Send to owner who can manually forward (temporary solution)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Forward Verification Code to ${email}`,
          to_email: ownerEmail,
          from_email: email,
          message: `Please forward this verification code to ${email}:\n\nCode: ${code}`,
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Verification code will be sent shortly. Please check your email.',
          code: code,
        };
      }
    }

    return {
      success: false,
      message: misconfiguredEmailMessage(),
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error sending verification code:', error);
    }
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
};

// Send via EmailJS
const sendViaEmailJS = async (
  email: string,
  code: string,
  serviceId: string,
  templateId: string,
  publicKey: string
): Promise<VerificationResponse> => {
  try {
    // Load EmailJS if not already loaded
    if (!window.emailjs) {
      await loadEmailJSLibrary(publicKey);
    }

    const response = await window.emailjs.send(
      serviceId,
      templateId,
      {
        to_email: email,
        verification_code: code,
        message: `Your verification code is: ${code}. This code expires in 10 minutes.`,
      },
      publicKey
    );

    if (response.status === 200) {
      return {
        success: true,
        message: 'Verification code sent to your email!',
        code: code,
      };
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('EmailJS error:', error);
    }
  }
  return {
    success: false,
    message: 'Failed to send verification code. Please try again.',
  };
};

// Send via custom API endpoint
const sendViaAPI = async (
  email: string,
  code: string,
  endpoint: string
): Promise<VerificationResponse> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Verification code sent to your email!',
        code: code,
      };
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('API error:', error);
    }
  }
  return {
    success: false,
    message: 'Failed to send verification code. Please try again.',
  };
};

// Load EmailJS library dynamically
const loadEmailJSLibrary = (publicKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      window.emailjs.init(publicKey);
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      window.emailjs.init(publicKey);
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    emailjs?: {
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, string>,
        publicKey: string
      ) => Promise<{ status: number }>;
      init: (publicKey: string) => void;
    };
  }
}

// Notify owner when someone downloads the resume
export const notifyOwnerOfDownload = async (
  email: string,
  phone?: string
): Promise<void> => {
  try {
    const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const ownerEmail = import.meta.env.VITE_OWNER_EMAIL;

    if (!web3formsKey || !ownerEmail) {
      if (import.meta.env.DEV) {
        console.warn('Owner notification not configured');
      }
      return;
    }

    const clientIP = await getClientIP();

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: '📥 Resume Downloaded - ' + (email || phone || 'phone verification'),
        to_email: ownerEmail,
        from_name: 'Portfolio Notification',
        from_email: email || ownerEmail,
        message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📥 RESUME DOWNLOAD NOTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Someone has downloaded your resume!

${email ? `📧 User Email: ${email}\n` : ''}${phone ? `📱 Phone: ${phone}\n` : ''}
🕐 Download Time: ${new Date().toLocaleString()}
🌐 IP Address: ${clientIP}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim(),
      }),
    });

    if (!response.ok) {
      if (import.meta.env.DEV) {
        const errorText = await response.text();
        console.error('Failed to send notification:', errorText);
      }
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error notifying owner:', error);
    }
  }
};

// Get client IP (simplified - in production, use a proper IP detection service)
const getClientIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'Unknown';
  } catch {
    return 'Unknown';
  }
};

// ============================================================================
// PHONE OTP VERIFICATION VIA INFOBIP
// ============================================================================

/**
 * Send OTP via Infobip 2FA API
 * 
 * SECURITY WARNING: API keys are exposed in the client bundle.
 * For production, use a backend proxy to keep API keys server-side.
 * 
 * Rate limiting: Tracks attempts per phone number to prevent spam/abuse.
 */
export const sendPhoneOTP = async (
  phone: string,
  checkRateLimit: boolean = true
): Promise<VerificationResponse> => {
  try {
    const infobipApiKey = import.meta.env.VITE_INFOBIP_API_KEY;
    const infobipBaseUrl = import.meta.env.VITE_INFOBIP_BASE_URL || 'https://api.infobip.com';
    const infobipApplicationId = import.meta.env.VITE_INFOBIP_APPLICATION_ID;
    const infobipMessageId = import.meta.env.VITE_INFOBIP_MESSAGE_ID;

    // SECURITY: Never log API keys or sensitive data, even in development
    // Debug logging removed for security

    if (!infobipApiKey || !infobipApplicationId || !infobipMessageId) {
      const missing = [];
      if (!infobipApiKey) missing.push('VITE_INFOBIP_API_KEY');
      if (!infobipApplicationId) missing.push('VITE_INFOBIP_APPLICATION_ID');
      if (!infobipMessageId) missing.push('VITE_INFOBIP_MESSAGE_ID');
      
      // Only log in development
      if (import.meta.env.DEV) {
        console.error('Missing Infobip environment variables:', missing);
      }
      return {
        success: false,
        message: misconfiguredPhoneMessage(missing),
      };
    }

    // Format phone number to E.164
    const formattedPhone = formatPhoneNumber(phone);
    
    if (!isValidPhoneNumber(formattedPhone)) {
      return {
        success: false,
        message: 'Invalid phone number format. Please include country code (e.g., +381 for Serbia).',
      };
    }

    // Check if phone number is from a blocked Asian country
    if (isBlockedAsianCountry(formattedPhone)) {
      const countryName = getCountryName(formattedPhone);
      return {
        success: false,
        message: `Phone verification is not available for ${countryName}. Please use email verification instead.`,
        blockedCountry: true,
      };
    }

    // Rate limiting: Check if phone number has exceeded max attempts (2)
    if (checkRateLimit) {
      const rateLimitKey = `phone_otp_attempts_${formattedPhone}`;
      const attemptsData = sessionStorage.getItem(rateLimitKey);
      
      if (attemptsData) {
        const { count, timestamp } = JSON.parse(attemptsData);
        const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hour window
        
        // Reset if older than 1 hour
        if (timestamp < oneHourAgo) {
          sessionStorage.removeItem(rateLimitKey);
        } else if (count >= 2) {
          return {
            success: false,
            message: 'Maximum resend attempts (2) reached for this phone number. Please use email verification instead, or try again in 1 hour.',
            rateLimitExceeded: true,
          };
        }
      }
    }

    // Send OTP via Infobip 2FA API
    const response = await fetch(`${infobipBaseUrl}/2fa/2/pin`, {
      method: 'POST',
      headers: {
        'Authorization': `App ${infobipApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        applicationId: infobipApplicationId,
        messageId: infobipMessageId,
        to: formattedPhone,
      }),
    });

    const data = await response.json();

    if (response.ok && data.pinId) {
      // Track successful send for rate limiting
      if (checkRateLimit) {
        const rateLimitKey = `phone_otp_attempts_${formattedPhone}`;
        const attemptsData = sessionStorage.getItem(rateLimitKey);
        const count = attemptsData ? JSON.parse(attemptsData).count + 1 : 1;
        sessionStorage.setItem(rateLimitKey, JSON.stringify({
          count,
          timestamp: Date.now(),
        }));
      }

      return {
        success: true,
        message: 'Verification code sent to your phone!',
        pinId: data.pinId,
      };
    } else {
      // Handle Infobip error responses
      const errorMessage = data.requestError?.serviceException?.text || 
                          data.requestError?.validationErrors?.[0]?.message ||
                          'Failed to send verification code. Please try again.';
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error) {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('Infobip error:', error);
    }
    return {
      success: false,
      message: 'An error occurred while sending the verification code. Please try again.',
    };
  }
};

/**
 * Verify OTP via Infobip 2FA API
 */
export const verifyPhoneOTP = async (
  pinId: string,
  pin: string
): Promise<VerificationResponse> => {
  try {
    const infobipApiKey = import.meta.env.VITE_INFOBIP_API_KEY;
    const infobipBaseUrl = import.meta.env.VITE_INFOBIP_BASE_URL || 'https://api.infobip.com';

    if (!infobipApiKey) {
      return {
        success: false,
        message: misconfiguredPhoneMessage(['VITE_INFOBIP_API_KEY']),
      };
    }

    // Verify OTP via Infobip 2FA API
    const response = await fetch(`${infobipBaseUrl}/2fa/2/pin/${pinId}/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `App ${infobipApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        pin: pin,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Check if verification was successful
      if (data.verified === true || data.attemptsRemaining !== undefined) {
        return {
          success: true,
          message: 'Phone number verified successfully!',
        };
      } else {
        return {
          success: false,
          message: data.requestError?.serviceException?.text || 'Invalid verification code.',
        };
      }
    } else {
      // Handle verification errors
      const errorMessage = data.requestError?.serviceException?.text || 
                          'Verification failed. Please try again.';
      
      return {
        success: false,
        message: errorMessage,
      };
    }
  } catch (error) {
    // Only log in development
    if (import.meta.env.DEV) {
      console.error('Infobip verification error:', error);
    }
    return {
      success: false,
      message: 'An error occurred during verification. Please try again.',
    };
  }
};

