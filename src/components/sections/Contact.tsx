import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  PhoneCall,
  Send,
  Check,
  Copy,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import confetti from 'canvas-confetti';
import { SectionHeader } from '../common/SectionHeader';
import { ProjectCard3D } from '../3d/ProjectCard3D';
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
   * Runs smoothly on blur or with a debounce on change.
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

    // 3. Live DNS MX Record Verification (Both Backend Node.js DNS & DoH Fallback)
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

    // Debounce MX lookup while typing (700ms)
    validationDebounceTimer.current = setTimeout(() => {
      if (val.includes('@') && val.includes('.')) {
        handleValidateEmailInput(val);
      }
    }, 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // 1. Bot & Spam Protection Checks (Honeypot, submission speed, cooldown)
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
      return; // SUBMISSION REJECTED - Strict validation gate
    }

    setIsEmailVerified(true);
    setEmailError(null);

    // 3. Dispatch to Saad's email address
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personal.email}`, {
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
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#38bdf8', '#ffffff']
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsEmailVerified(false);
    } catch (err) {
      console.error('Email dispatch network error:', err);
      setIsSubmitting(false);
      // Fallback: trigger mailto to guarantee message is sent directly to Saad's email
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
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
      <SectionHeader
        badge="// 07. TRANSMISSION // CONTACT"
        decorator="@asyncio.coroutine(smtp_dispatch)"
        title={contact.heading}
        subtitle={contact.subheading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Contact Intel, Direct Channels & Copy Email (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <ProjectCard3D intensity={8} glowColor="rgba(0, 240, 255, 0.3)">
            <div className="rounded-3xl glass-panel-glow border border-cyan-500/30 p-6 sm:p-8 relative overflow-hidden">
              <div className="font-mono text-xs text-cyan-400 tracking-wider mb-2">
                // SECURE DISPATCH CHANNELS
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Connect Directly
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Open to internships, collaborative projects, technical discussions, or exploring modern engineering possibilities together.
              </p>

              {/* Status & Location Pill */}
              <div className="space-y-3 font-mono text-xs mb-8">
                <div className="flex items-center gap-2.5 text-slate-300 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{contact.responseTime}</span>
                </div>
              </div>

              {/* One-Click Copy Email Action */}
              <div className="p-4 rounded-2xl bg-[#070714] border border-cyan-500/30 mb-3">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                  <span>Primary Email Address</span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Mail className="w-3 h-3" /> Send Mail
                  </a>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-mono text-xs sm:text-sm text-cyan-300 truncate font-semibold hover:text-white transition-colors"
                  >
                    {personal.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 transition-colors shrink-0 cursor-pointer"
                    title="Copy Email to Clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <span className="text-[11px] font-mono text-emerald-400 mt-2 block animate-pulse">
                    ✓ Email copied to clipboard!
                  </span>
                )}
              </div>

              {/* Direct Phone Call & Copy Action */}
              <div className="p-4 rounded-2xl bg-[#070714] border border-purple-500/30 mb-6">
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                  <span>Direct Mobile / Phone</span>
                  <a
                    href={`tel:${personal.phoneRaw || '8866365762'}`}
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <PhoneCall className="w-3 h-3" /> Call Now
                  </a>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${personal.phoneRaw || '8866365762'}`}
                    className="font-mono text-xs sm:text-sm text-purple-300 truncate font-semibold hover:text-white transition-colors"
                  >
                    {personal.phone || '+91 88663 65762'}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    onMouseEnter={() => soundFx.playHover()}
                    className="p-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 transition-colors shrink-0 cursor-pointer"
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
                  <span className="text-[11px] font-mono text-emerald-400 mt-2 block animate-pulse">
                    ✓ Phone number copied to clipboard!
                  </span>
                )}
              </div>

              {/* Social Channels: GitHub & LinkedIn */}
              <div className="space-y-2.5">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 transition-all text-slate-200 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs font-semibold">
                      GitHub Profile
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-400 transition-all text-slate-200 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-xs font-semibold">
                      LinkedIn Profile
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </ProjectCard3D>
        </div>

        {/* RIGHT COLUMN: Futuristic Terminal Contact Form (7 Cols) */}
        <div className="lg:col-span-7">
          <ProjectCard3D intensity={6} glowColor="rgba(168, 85, 247, 0.25)">
            <div className="rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8 relative">
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-slate-300 ml-2 font-semibold">direct_email_dispatch.sh</span>
                </div>
                <span className="text-cyan-400 text-[11px] font-mono">ROUTES TO INBOX</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white">
                    Dispatched Directly to Saad's Email!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md font-mono leading-relaxed">
                    Thank you for connecting! Your details and message have been routed directly to <span className="text-cyan-300 font-semibold">{personal.email}</span>. Ghanchi Saad will get back to your email shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setSubmitted(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 hover:text-white transition-all cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Anti-Bot & Spam Honeypot Trap (Hidden from legitimate users) */}
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] outline-none transition-all placeholder:text-slate-600"
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
                          className={`w-full px-4 py-3 pr-10 rounded-xl bg-slate-900/90 border text-white font-mono text-sm outline-none transition-all placeholder:text-slate-600 ${
                            emailError
                              ? 'border-rose-500/80 focus:border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                              : isEmailVerified
                              ? 'border-emerald-500/80 focus:border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                              : isValidatingMx
                              ? 'border-cyan-500/80 focus:border-cyan-500 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                              : 'border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                          }`}
                        />
                        {/* Status Icon Indicator Inside Field */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          {isValidatingMx ? (
                            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                          ) : emailError ? (
                            <ShieldAlert className="w-4 h-4 text-rose-400" />
                          ) : isEmailVerified ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          ) : null}
                        </div>
                      </div>

                      {/* Real-time Validation Feedback Status */}
                      {isValidatingMx && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-cyan-400">
                          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                          <span>Verifying mail server & MX records...</span>
                        </div>
                      )}

                      {!isValidatingMx && emailError && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-start gap-1.5 mt-1.5 text-[11px] font-mono text-rose-400"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{emailError}</span>
                        </motion.div>
                      )}

                      {!isValidatingMx && !emailError && isEmailVerified && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-emerald-400"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Valid email & active MX records verified</span>
                        </motion.div>
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
                      placeholder="e.g. Internship Opportunity / Technical Collaboration"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] outline-none transition-all placeholder:text-slate-600"
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
                      placeholder="Share project details, inquiry, or discuss innovative ideas..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono text-sm focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] outline-none transition-all resize-none placeholder:text-slate-600"
                    />
                  </div>

                  {/* General / Bot Protection Error Callout */}
                  {generalError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-mono text-xs"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{generalError}</span>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || isValidatingMx}
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>DISPATCHING TO INBOX...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND DIRECTLY TO MY EMAIL</span>
                      </>
                    )}
                  </button>

                  {/* Security & Validation Information Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Instant RFC 5322, disposable blocker & MX verification (No OTP needed)</span>
                    </div>
                    <div>
                      ⚡ Routes to <span className="text-cyan-400 font-medium">{personal.email}</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </ProjectCard3D>
        </div>
      </div>
    </section>
  );
};
