import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  sendVerificationCode,
  sendPhoneOTP,
  verifyPhoneOTP,
  notifyOwnerOfDownload,
  generateVerificationCode,
  formatPhoneNumber,
  isValidPhoneNumber,
  isEmailVerificationConfigured,
  isPhoneVerificationConfigured,
} from '@/utils/resumeVerification';
import { Mail, Phone, Loader2 } from 'lucide-react';

interface ResumeDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: () => void;
}

type Step = 'contact' | 'verification';

const ResumeDownloadDialog = ({
  open,
  onOpenChange,
  onDownload,
}: ResumeDownloadDialogProps) => {
  const [step, setStep] = useState<Step>('contact');
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [storedCode, setStoredCode] = useState<string | null>(null);
  const [storedPinId, setStoredPinId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneRateLimitExceeded, setPhoneRateLimitExceeded] = useState(false);
  const [phoneBlocked, setPhoneBlocked] = useState(false);

  const emailOk = useMemo(() => isEmailVerificationConfigured(), []);
  const phoneOk = useMemo(() => isPhoneVerificationConfigured(), []);
  const verificationReady = emailOk || phoneOk;

  // Countdown timer for code expiration
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check for stored verification code
  useEffect(() => {
    if (open) {
      const stored = sessionStorage.getItem('resume_verification_code');
      const storedPinId = sessionStorage.getItem('resume_verification_pinId');
      const storedExpiry = sessionStorage.getItem('resume_verification_expiry');
      const storedEmail = sessionStorage.getItem('resume_verification_email');
      const storedPhone = sessionStorage.getItem('resume_verification_phone');

      if ((stored || storedPinId) && storedExpiry && parseInt(storedExpiry) > Date.now()) {
        if (stored) setStoredCode(stored);
        if (storedPinId) setStoredPinId(storedPinId);
        setStep('verification');
        if (storedEmail) {
          setEmail(storedEmail);
          setContactType('email');
        }
        if (storedPhone) {
          setPhone(storedPhone);
          setContactType('phone');
        }
        const remaining = Math.floor((parseInt(storedExpiry) - Date.now()) / 1000);
        setCountdown(remaining);
      }
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (emailOk && !phoneOk) setContactType('email');
    else if (!emailOk && phoneOk) setContactType('phone');
  }, [open, emailOk, phoneOk]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setStep('contact');
      setEmail('');
      setPhone('');
      setVerificationCode('');
      setError('');
      setStoredCode(null);
      setStoredPinId(null);
      setCountdown(0);
      setPhoneRateLimitExceeded(false);
      setPhoneBlocked(false);
    }
    onOpenChange(newOpen);
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (contactType === 'email') {
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }
    } else {
      // Validate phone number format
      if (!phone || !isValidPhoneNumber(phone)) {
        setError('Please enter a valid phone number with country code (e.g., +1 555 123 4567)');
        setIsLoading(false);
        return;
      }
    }

    try {
      const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

      if (contactType === 'email') {
        const code = generateVerificationCode();
        const result = await sendVerificationCode(email, code);
        if (result.success) {
          // Store code and expiry in sessionStorage
          sessionStorage.setItem('resume_verification_code', code);
          sessionStorage.setItem('resume_verification_expiry', expiry.toString());
          sessionStorage.setItem('resume_verification_email', email);
          sessionStorage.removeItem('resume_verification_phone');
          sessionStorage.removeItem('resume_verification_pinId');
          setStoredCode(code);
          setStoredPinId(null);
          setStep('verification');
          setCountdown(600); // 10 minutes
        } else {
          setError(result.message || 'Failed to send verification code');
        }
      } else {
        // Phone verification via Infobip
        const formattedPhone = formatPhoneNumber(phone);
        const result = await sendPhoneOTP(formattedPhone, true);
        if (result.success && result.pinId) {
          // Store pinId and expiry in sessionStorage
          sessionStorage.setItem('resume_verification_pinId', result.pinId);
          sessionStorage.setItem('resume_verification_expiry', expiry.toString());
          sessionStorage.setItem('resume_verification_phone', formattedPhone);
          sessionStorage.removeItem('resume_verification_code');
          sessionStorage.removeItem('resume_verification_email');
          setStoredPinId(result.pinId);
          setStoredCode(null);
          setPhoneRateLimitExceeded(false);
          setStep('verification');
          setCountdown(600); // 10 minutes
        } else {
          // Check if country is blocked
          if (result.blockedCountry) {
            setPhoneBlocked(true);
            setError(result.message || 'This country is not supported for phone verification. Please use email instead.');
          } else if (result.rateLimitExceeded) {
            // Check if rate limit was exceeded
            setPhoneRateLimitExceeded(true);
            setError(result.message || 'Maximum resend attempts reached. Please use email instead.');
          } else {
            setError(result.message || 'Failed to send verification code');
          }
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    const storedExpiry = sessionStorage.getItem('resume_verification_expiry');

    if (!storedExpiry) {
      setError('Verification code expired. Please request a new one.');
      setStep('contact');
      return;
    }

    if (parseInt(storedExpiry) < Date.now()) {
      setError('Verification code expired. Please request a new one.');
      sessionStorage.removeItem('resume_verification_code');
      sessionStorage.removeItem('resume_verification_pinId');
      sessionStorage.removeItem('resume_verification_expiry');
      sessionStorage.removeItem('resume_verification_email');
      sessionStorage.removeItem('resume_verification_phone');
      setStep('contact');
      return;
    }

    // Handle email verification (client-side code check)
    if (contactType === 'email') {
      const stored = sessionStorage.getItem('resume_verification_code');
      if (!stored) {
        setError('Verification code expired. Please request a new one.');
        setStep('contact');
        return;
      }

      if (verificationCode === stored) {
        // Code is correct - notify owner first, then download
        const storedEmail = sessionStorage.getItem('resume_verification_email');
        const userEmail = storedEmail || email;
        
        // Notify owner (don't wait for it to complete - download can proceed)
        notifyOwnerOfDownload(userEmail).catch(err => {
          if (import.meta.env.DEV) {
            console.error('Failed to notify owner:', err);
          }
        });

        // Clear stored data
        sessionStorage.removeItem('resume_verification_code');
        sessionStorage.removeItem('resume_verification_expiry');
        sessionStorage.removeItem('resume_verification_email');
        sessionStorage.removeItem('resume_verification_phone');
        sessionStorage.removeItem('resume_verification_pinId');

        // Close dialog and download immediately
        handleOpenChange(false);
        onDownload();
      } else {
        setError('Incorrect verification code. Please try again.');
        setVerificationCode('');
      }
    } else {
      // Handle phone verification (server-side via Infobip)
      const storedPinId = sessionStorage.getItem('resume_verification_pinId');
      if (!storedPinId) {
        setError('Verification session expired. Please request a new code.');
        setStep('contact');
        return;
      }

      setIsLoading(true);
      try {
        const result = await verifyPhoneOTP(storedPinId, verificationCode);
        
        if (result.success) {
          // Verification successful - notify owner first, then download
          const storedPhone = sessionStorage.getItem('resume_verification_phone');
          
          // Notify owner (don't wait for it to complete - download can proceed)
          notifyOwnerOfDownload(
            '', // No email for phone verification
            storedPhone || phone
          ).catch(err => {
            if (import.meta.env.DEV) {
              console.error('Failed to notify owner:', err);
            }
          });

          // Clear stored data
          sessionStorage.removeItem('resume_verification_code');
          sessionStorage.removeItem('resume_verification_pinId');
          sessionStorage.removeItem('resume_verification_expiry');
          sessionStorage.removeItem('resume_verification_email');
          sessionStorage.removeItem('resume_verification_phone');

          // Close dialog and download immediately
          handleOpenChange(false);
          onDownload();
        } else {
          setError(result.message || 'Incorrect verification code. Please try again.');
          setVerificationCode('');
        }
      } catch (error) {
        setError('An error occurred during verification. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);
    setVerificationCode('');

    try {
      const expiry = Date.now() + 10 * 60 * 1000;

      if (contactType === 'email' && email) {
        const code = generateVerificationCode();
        const result = await sendVerificationCode(email, code);
        if (result.success) {
          sessionStorage.setItem('resume_verification_code', code);
          sessionStorage.setItem('resume_verification_expiry', expiry.toString());
          sessionStorage.setItem('resume_verification_email', email);
          sessionStorage.removeItem('resume_verification_pinId');
          sessionStorage.removeItem('resume_verification_phone');
          setStoredCode(code);
          setStoredPinId(null);
          setCountdown(600);
          setError('');
        } else {
          setError(result.message || 'Failed to resend code');
        }
      } else if (contactType === 'phone' && phone) {
        const formattedPhone = formatPhoneNumber(phone);
        const result = await sendPhoneOTP(formattedPhone, true);
        if (result.success && result.pinId) {
          sessionStorage.setItem('resume_verification_pinId', result.pinId);
          sessionStorage.setItem('resume_verification_expiry', expiry.toString());
          sessionStorage.setItem('resume_verification_phone', formattedPhone);
          sessionStorage.removeItem('resume_verification_code');
          sessionStorage.removeItem('resume_verification_email');
          setStoredPinId(result.pinId);
          setStoredCode(null);
          setPhoneRateLimitExceeded(false);
          setCountdown(600);
          setError('');
          } else {
            // Check if country is blocked
            if (result.blockedCountry) {
              setPhoneBlocked(true);
              setError(result.message || 'This country is not supported for phone verification. Please use email instead.');
            } else if (result.rateLimitExceeded) {
              // Check if rate limit was exceeded
              setPhoneRateLimitExceeded(true);
              setError(result.message || 'Maximum resend attempts reached. Please use email instead.');
            } else {
              setError(result.message || 'Failed to resend code');
            }
          }
      }
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] sm:max-w-[425px] bg-terminal-dark border-terminal-accent/20 max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-terminal-light font-mono">
            {'>'} Resume Download
          </DialogTitle>
          <DialogDescription className="text-terminal-light/70 font-mono">
            {step === 'contact'
              ? `Please provide your ${contactType === 'email' ? 'email' : 'phone number'} to receive a verification code.`
              : `Enter the 6-digit verification code sent to your ${contactType === 'email' ? 'email' : 'phone'}.`}
          </DialogDescription>
        </DialogHeader>

        {!verificationReady && (
          <div
            className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-3 text-sm text-terminal-light font-mono"
            role="alert"
          >
            {import.meta.env.DEV ? (
              <>
                Resume verification is not configured (missing email and/or SMS env vars).{' '}
                <Link
                  to="/contact"
                  className="text-terminal-accent underline underline-offset-2 hover:text-terminal-accent/90"
                  onClick={() => handleOpenChange(false)}
                >
                  Contact page
                </Link>{' '}
                — or add <span className="text-terminal-light/80">VITE_EMAILJS_*</span> and/or{' '}
                <span className="text-terminal-light/80">VITE_INFOBIP_*</span> to{' '}
                <span className="text-terminal-light/80">.env</span> and restart Vite.
              </>
            ) : (
              <>
                Resume download verification is unavailable right now.{' '}
                <Link
                  to="/contact"
                  className="text-terminal-accent underline underline-offset-2 hover:text-terminal-accent/90"
                  onClick={() => handleOpenChange(false)}
                >
                  Use the Contact page
                </Link>{' '}
                to reach me.
              </>
            )}
          </div>
        )}

        {verificationReady && step === 'contact' && (
          <p className="text-xs text-terminal-light/60 font-mono -mt-1">
            {!phoneOk && emailOk && 'SMS verification is off — use email.'}
            {!emailOk && phoneOk && 'Email verification is off — use phone with country code (e.g. +381).'}
            {emailOk && phoneOk && 'Tip: include country code for phone (+381 Serbia, +44 UK, +49 Germany).'}
          </p>
        )}

        {step === 'contact' && !verificationReady ? (
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="font-mono border-terminal-accent/50 text-terminal-light w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        ) : step === 'contact' ? (
          <form onSubmit={handleSendCode}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant={contactType === 'email' ? 'default' : 'outline'}
                    onClick={() => emailOk && setContactType('email')}
                    disabled={!emailOk}
                    title={!emailOk ? 'Configure VITE_EMAILJS_* or other email env vars' : undefined}
                    className={`flex-1 font-mono border ${
                      contactType === 'email'
                        ? 'bg-terminal-accent text-terminal-dark border-terminal-accent shadow-[0_0_0_1px_rgba(0,255,0,0.12)]'
                        : 'border-terminal-accent/40 text-terminal-light bg-transparent hover:bg-terminal-accent/10 hover:text-terminal-light'
                    } ${!emailOk ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Mail
                      className={`w-4 h-4 mr-2 ${
                        contactType === 'email' ? 'text-terminal-dark' : 'text-terminal-light hover:text-terminal-light'
                      }`}
                    />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={contactType === 'phone' ? 'default' : 'outline'}
                    onClick={() => phoneOk && setContactType('phone')}
                    disabled={!phoneOk}
                    title={!phoneOk ? 'Configure VITE_INFOBIP_API_KEY, APPLICATION_ID, MESSAGE_ID' : undefined}
                    className={`flex-1 font-mono border ${
                      contactType === 'phone'
                        ? 'bg-terminal-accent text-terminal-dark border-terminal-accent shadow-[0_0_0_1px_rgba(0,255,0,0.12)]'
                        : 'border-terminal-accent/40 text-terminal-light bg-transparent hover:bg-terminal-accent/10 hover:text-terminal-light'
                    } ${!phoneOk ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Phone
                      className={`w-4 h-4 mr-2 ${
                        contactType === 'phone' ? 'text-terminal-dark' : 'text-terminal-light hover:text-terminal-light'
                      }`}
                    />
                    Phone
                  </Button>
                </div>
                {contactType === 'email' ? (
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="your.email@example.com"
                    className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono focus:border-terminal-accent"
                    autoFocus
                    disabled={isLoading}
                    required
                  />
                ) : (
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    placeholder="+381 60 123 4567"
                    className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono focus:border-terminal-accent"
                    autoFocus
                    disabled={isLoading}
                    required
                  />
                )}
                {contactType === 'phone' && (
                  <p className="text-sm text-terminal-light/70 font-mono">
                    Include country code (e.g., +381 for Serbia, +44 for UK, +49 for Germany)
                  </p>
                )}
                {error && (
                  <div className="space-y-2">
                    <p className="text-sm text-red-400 font-mono">{error}</p>
                    {(phoneRateLimitExceeded || phoneBlocked) && (
                      <div className="bg-terminal-accent/10 border border-terminal-accent/30 rounded p-3">
                        <p className="text-sm text-terminal-light font-mono mb-2">
                          💡 <strong>Tip:</strong> Switch to email verification to continue.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setContactType('email');
                            setPhoneRateLimitExceeded(false);
                            setPhoneBlocked(false);
                            setError('');
                          }}
                          className="w-full font-mono border-terminal-accent/50 text-terminal-accent bg-transparent hover:bg-terminal-accent/20"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Use Email Instead
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="min-h-11 w-full font-mono border-red-500/60 text-red-400 bg-terminal-dark/70 hover:bg-red-500/10 sm:w-auto"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="min-h-11 w-full bg-terminal-accent text-terminal-dark font-mono hover:bg-opacity-90 hover:text-white active:text-terminal-dark sm:w-auto"
                disabled={
                  !verificationReady ||
                  isLoading ||
                  (contactType === 'email' ? !email : !phone)
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Code'
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-terminal-light font-mono">
                  Verification Code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => {
                      setVerificationCode(value);
                      setError('');
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono" />
                      <InputOTPSlot index={1} className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono" />
                      <InputOTPSlot index={2} className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono" />
                      <InputOTPSlot index={3} className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono" />
                      <InputOTPSlot index={4} className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono" />
                      <InputOTPSlot index={5} className="bg-terminal-dark border-terminal-accent/30 text-terminal-light font-mono" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {error && (
                  <p className="text-sm text-red-400 font-mono text-center">{error}</p>
                )}
                {countdown > 0 && (
                  <p className="text-sm text-terminal-light/70 font-mono text-center">
                    Code expires in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </p>
                )}
                {contactType === 'email' && email && (
                  <p className="text-sm text-terminal-light/70 font-mono text-center">
                    Code sent to: {email}
                  </p>
                )}
                {contactType === 'phone' && phone && (
                  <p className="text-sm text-terminal-light/70 font-mono text-center">
                    Code sent to: {formatPhoneNumber(phone)}
                  </p>
                )}
                {contactType === 'phone' && phoneRateLimitExceeded ? (
                  <div className="bg-terminal-accent/10 border border-terminal-accent/30 rounded p-3">
                    <p className="text-sm text-terminal-light font-mono mb-2 text-center">
                      Maximum phone resend attempts (2) reached.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setContactType('email');
                        setPhoneRateLimitExceeded(false);
                        setStep('contact');
                        setVerificationCode('');
                        setError('');
                      }}
                      className="w-full font-mono border-terminal-accent/50 text-terminal-accent bg-transparent hover:bg-terminal-accent/20"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Switch to Email Verification
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendCode}
                    disabled={isLoading || countdown > 540 || phoneRateLimitExceeded}
                    className="font-mono text-sm border border-terminal-accent/40 text-terminal-accent bg-transparent hover:bg-terminal-accent/10"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      'Resend Code'
                    )}
                  </Button>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep('contact');
                  setVerificationCode('');
                  setError('');
                }}
                className="min-h-11 w-full font-mono border-red-500/60 text-red-400 bg-terminal-dark/70 hover:bg-red-500/10 sm:w-auto"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="min-h-11 w-full bg-terminal-accent text-terminal-dark font-mono hover:bg-opacity-90 hover:text-white active:text-terminal-dark sm:w-auto"
                disabled={isLoading || verificationCode.length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Download'
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDownloadDialog;
