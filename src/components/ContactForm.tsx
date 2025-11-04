import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `New Contact from ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`,
          message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📬 NEW CONTACT FORM SUBMISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${formData.name}

📧 Email: ${formData.email}

${formData.company ? `🏢 Company: ${formData.company}\n\n` : ''}💬 Message:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from: damirkranjcevic.com
          `.trim()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-terminal-dark border border-terminal-light/10">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-terminal-dark border-terminal-light/20 text-terminal-light placeholder:text-terminal-light/50"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-terminal-dark border-terminal-light/20 text-terminal-light placeholder:text-terminal-light/50"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="bg-terminal-dark border-terminal-light/20 text-terminal-light placeholder:text-terminal-light/50"
            />
          </div>
          <div>
            <Textarea
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="bg-terminal-dark border-terminal-light/20 text-terminal-light placeholder:text-terminal-light/50 min-h-[120px]"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              submitStatus === 'success' 
                ? 'bg-green-600 hover:bg-green-700' 
                : submitStatus === 'error'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-terminal-accent hover:bg-terminal-accent/90'
            } text-terminal-dark transition-colors`}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Sending...' : 
             submitStatus === 'success' ? 'Message Sent!' :
             submitStatus === 'error' ? 'Failed to Send' : 'Send Message'}
          </Button>
          
          {submitStatus === 'success' && (
            <p className="text-green-400 text-sm text-center mt-2">
              Thank you for your message! I'll get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-sm text-center mt-2">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
