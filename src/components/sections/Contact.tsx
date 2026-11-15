import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  PhoneCall,
  Send,
  Check,
  Copy,
  MapPin,
  Clock,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import confetti from 'canvas-confetti';
import { SectionHeader } from '../common/SectionHeader';
import { portfolioData } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';
import {
  validateEmailComplete,
  validateEmailSyntax,
  validateDisposableDomain,
  validateDomainMxRecords,
  validateSpamProtection
} from '../../utils/emailValidator';

export const Contact: React.FC = () => {
  const { personal, contact } = portfolioData;

  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Strict email validation & bot protection states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isValidatingMx, setIsValidatingMx] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Bot detection timing tracking
  const formRenderTime = useRef(Date.now());
  const lastSubmissionTime = useRef(0);
  const validationDebounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    formRenderTime.current = Date.now();
  }, []);

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personal.phoneRaw || '8866365762');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  /**
   * Real-time email validation checking syntax, disposable domains, and DNS MX records.
   */
  const handleValidateEmailInput = async (emailValue: string) => {
    const trimmed = emailValue.trim();

    if (!trimmed) {
      setEmailError(null);
      setIsEmailVerified(false);
      setIsValidatingMx(false);
      return;
    }

    // 1. Strict RFC 5322 Syntax validation
    const syntaxCheck = validateEmailSyntax(trimmed);
    if (!syntaxCheck.valid) {
      setEmailError(syntaxCheck.error || 'Invalid email syntax.');
      setIsEmailVerified(false);
      setIsValidatingMx(false);
      return;
    }

    // 2. Disposable domain check
    const disposableCheck = validateDisposableDomain(trimmed);
    if (!disposableCheck.valid) {
      setEmailError(disposableCheck.error || 'Disposable email domains are not allowed.');
      setIsEmailVerified(false);
      setIsValidatingMx(false);
      return;
    }

    // 3. Live DNS MX Record Verification
    const domain = trimmed.slice(trimmed.lastIndexOf('@') + 1).trim();
    setIsValidatingMx(true);
    setEmailError(null);

    const mxCheck = await validateDomainMxRecords(domain);
    setIsValidatingMx(false);

    if (!mxCheck.valid) {
      setEmailError(mxCheck.error || `Domain '@${domain}' does not have active MX records.`);
      setIsEmailVerified(false);
    } else {
      setEmailError(null);
      setIsEmailVerified(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, email: val }));
    setIsEmailVerified(false);
    setEmailError(null);
    setGeneralError(null);

    if (validationDebounceTimer.current) {
      clearTimeout(validationDebounceTimer.current);
    }

    validationDebounceTimer.current = setTimeout(() => {
      if (val.includes('@') && val.includes('.')) {
        handleValidateEmailInput(val);
      }
    }, 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // 1. Bot & Spam Protection Checks
    const spamCheck = validateSpamProtection(
      honeypot,
      formRenderTime.current,
      lastSubmissionTime.current
    );
    if (spamCheck.isSpam) {
      setGeneralError(spamCheck.error || 'Security verification failed.');
      soundFx.playClick();
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setGeneralError('Please fill in all required fields.');
      return;
    }

    // 2. Strict Full Email Validation (Format, Disposable, MX Records)
    soundFx.playClick();
    setIsSubmitting(true);

    const emailValidation = await validateEmailComplete(formData.email);
    if (!emailValidation.valid) {
      setIsSubmitting(false);
      setEmailError(emailValidation.error || 'Please provide a valid email address with active mail server (MX) records.');
      setIsEmailVerified(false);
      soundFx.playClick();
      return;
    }

    setIsEmailVerified(true);
    setEmailError(null);

    // 3. Dispatch to Saad's email address
    try {
      await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || `New Contact Request from ${formData.name}`,
          message: formData.message.trim(),
          _subject: `⚡ Verified Portfolio Inquiry from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      lastSubmissionTime.current = Date.now();
      setIsSubmitting(false);
      setSubmitted(true);
      soundFx.playSuccess();

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#3b82f6', '#ffffff']
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsEmailVerified(false);
    } catch (err) {
      console.error('Email dispatch network error:', err);
      setIsSubmitting(false);
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      setSubmitted(true);
      soundFx.playSuccess();
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="07. Contact & Connect"
        title={contact.heading}
        subtitle={contact.subheading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Direct Channels & Information (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8">
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Connect Directly
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Open to internships, collaborative projects, technical discussions, or exploring modern engineering possibilities together.
            </p>

            {/* Location & Response Time */}
            <div className="space-y-2.5 font-mono text-xs mb-6">
              <div className="flex items-center gap-2.5 text-slate-300 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{contact.responseTime}</span>
              </div>
            </div>

            {/* Primary Email */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-3">
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Primary Email</span>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Mail className="w-3 h-3" /> Send Mail
                </a>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm text-slate-200 truncate font-medium">
                  {personal.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 cursor-pointer"
                  title="Copy Email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copied && (
                <span className="text-[11px] font-mono text-emerald-400 mt-2 block">
                  ✓ Email copied to clipboard!
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-6">
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Direct Mobile</span>
                <a
                  href={`tel:${personal.phoneRaw || '8866365762'}`}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <PhoneCall className="w-3 h-3" /> Call
                </a>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs sm:text-sm text-slate-200 truncate font-medium">
                  {personal.phone || '+91 88663 65762'}
                </span>
                <button
                  onClick={handleCopyPhone}
                  onMouseEnter={() => soundFx.playHover()}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0 cursor-pointer"
                  title="Copy Phone Number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedPhone && (
                <span className="text-[11px] font-mono text-emerald-400 mt-2 block">
                  ✓ Phone number copied to clipboard!
                </span>
              )}
            </div>

            {/* Social Channels */}
            <div className="space-y-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span className="font-mono text-xs">GitHub Profile</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors text-slate-300 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-slate-300" />
                  <span className="font-mono text-xs">LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs text-slate-400">
              <span className="text-white font-medium">Send a Message</span>
              <span className="text-slate-400">Routes to Inbox</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-display font-bold text-white">
                  Dispatched Directly to Saad's Email!
                </h4>
                <p className="text-sm text-slate-300 max-w-md font-mono leading-relaxed">
                  Thank you for connecting! Your details and message have been routed directly to <span className="text-indigo-300 font-medium">{personal.email}</span>. Ghanchi Saad will get back to your email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Anti-Bot & Spam Honeypot Trap */}
                <div
                  aria-hidden="true"
                  className="sr-only opacity-0 pointer-events-none absolute -left-[9999px]"
                  style={{ position: 'absolute', left: '-9999px' }}
                >
                  <label htmlFor="b_fax_shield">Leave this field empty</label>
                  <input
                    id="b_fax_shield"
                    type="text"
                    name="b_fax_shield"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (generalError) setGeneralError(null);
                      }}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:border-indigo-500 outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1.5">
                      Your Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleEmailChange}
                        onBlur={() => handleValidateEmailInput(formData.email)}
                        placeholder="e.g. alex@company.com"
                        className={`w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-900 border text-white font-mono text-sm outline-none transition-colors placeholder:text-slate-600 ${
                          emailError
                            ? 'border-rose-500 focus:border-rose-500'
                            : isEmailVerified
                            ? 'border-emerald-500 focus:border-emerald-500'
                            : isValidatingMx
                            ? 'border-indigo-500 focus:border-indigo-500'
                            : 'border-slate-800 focus:border-indigo-500'
                        }`}
                      />
                      {/* Status Icon */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {isValidatingMx ? (
                          <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                        ) : emailError ? (
                          <ShieldAlert className="w-4 h-4 text-rose-400" />
                        ) : isEmailVerified ? (
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        ) : null}
                      </div>
                    </div>

                    {/* Feedback Messages */}
                    {isValidatingMx && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-indigo-400">
                        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                        <span>Verifying mail server & MX records...</span>
                      </div>
                    )}

                    {!isValidatingMx && emailError && (
                      <div className="flex items-start gap-1.5 mt-1.5 text-[11px] font-mono text-rose-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{emailError}</span>
                      </div>
                    )}

                    {!isValidatingMx && !emailError && isEmailVerified && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Valid email & active MX records verified</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship Opportunity / Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:border-indigo-500 outline-none transition-colors placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (generalError) setGeneralError(null);
                    }}
                    placeholder="Share project details, inquiry, or discuss ideas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:border-indigo-500 outline-none transition-colors resize-none placeholder:text-slate-600"
                  />
                </div>

                {/* General Error Callout */}
                {generalError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{generalError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isValidatingMx}
                  onMouseEnter={() => soundFx.playHover()}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING TO INBOX...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>SEND MESSAGE DIRECTLY</span>
                    </>
                  )}
                </button>

                {/* Security Footer Note */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Instant syntax, disposable blocker & MX verification (No OTP needed)</span>
                  </div>
                  <div>
                    Routes to <span className="text-slate-300 font-medium">{personal.email}</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
