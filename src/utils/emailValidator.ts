import { isDisposableDomain } from './disposableDomains';

export interface EmailValidationResult {
  valid: boolean;
  error?: string;
  stage?: 'syntax' | 'disposable' | 'mx' | 'security';
}

/**
 * Validates the strict syntactic structure of an email according to RFC 5322 specifications.
 */
export function validateEmailSyntax(email: string): EmailValidationResult {
  if (!email || typeof email !== 'string') {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Please enter an email address.'
    };
  }

  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Please enter an email address.'
    };
  }

  if (trimmed.length > 254) {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Email address exceeds maximum allowed length of 254 characters.'
    };
  }

  // Check for forbidden whitespace characters
  if (/\s/.test(trimmed)) {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Email address cannot contain spaces.'
    };
  }

  // Ensure exactly one '@' character
  const atParts = trimmed.split('@');
  if (atParts.length < 2) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Missing '@' symbol in email address."
    };
  }
  if (atParts.length > 2) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Email cannot contain more than one '@' symbol."
    };
  }

  const [localPart, domainPart] = atParts;

  // Local-part checks (before @)
  if (!localPart || localPart.length === 0) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Missing username before the '@' symbol."
    };
  }

  if (localPart.length > 64) {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Email username cannot exceed 64 characters.'
    };
  }

  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Email username cannot begin or end with a dot ('.')."
    };
  }

  if (localPart.includes('..')) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Email username cannot contain consecutive dots ('..')."
    };
  }

  // Allowed characters in local-part: letters, numbers, and standard characters !#$%&'*+-/=?^_`{|}~.
  const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  if (!localPartRegex.test(localPart)) {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Email username contains invalid characters.'
    };
  }

  // Domain-part checks (after @)
  if (!domainPart || domainPart.length === 0) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Missing domain name after the '@' symbol."
    };
  }

  if (domainPart.length > 253) {
    return {
      valid: false,
      stage: 'syntax',
      error: 'Domain name cannot exceed 253 characters.'
    };
  }

  if (!domainPart.includes('.')) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Domain name must include a valid extension (e.g., '@gmail.com', '@university.edu')."
    };
  }

  if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Domain name cannot begin or end with a dot ('.')."
    };
  }

  if (domainPart.includes('..')) {
    return {
      valid: false,
      stage: 'syntax',
      error: "Domain name cannot contain consecutive dots ('..')."
    };
  }

  // Validate each domain label
  const labels = domainPart.split('.');
  for (const label of labels) {
    if (label.length === 0) {
      return {
        valid: false,
        stage: 'syntax',
        error: 'Domain contains an empty label.'
      };
    }
    if (label.length > 63) {
      return {
        valid: false,
        stage: 'syntax',
        error: `Domain label '${label}' exceeds maximum length of 63 characters.`
      };
    }
    if (label.startsWith('-') || label.endsWith('-')) {
      return {
        valid: false,
        stage: 'syntax',
        error: `Domain label '${label}' cannot start or end with a hyphen.`
      };
    }
    if (!/^[a-zA-Z0-9-]+$/.test(label)) {
      return {
        valid: false,
        stage: 'syntax',
        error: `Domain label '${label}' contains invalid characters.`
      };
    }
  }

  // Top-Level Domain (TLD) checks
  const tld = labels[labels.length - 1];
  if (!/^[a-zA-Z]{2,24}$/.test(tld)) {
    return {
      valid: false,
      stage: 'syntax',
      error: `Invalid domain extension '.${tld}'. Top-level domain must contain at least 2 letters.`
    };
  }

  // Disallow common invalid test TLDs
  const forbiddenTlds = new Set(['local', 'invalid', 'test', 'example', 'localhost', 'internal']);
  if (forbiddenTlds.has(tld.toLowerCase())) {
    return {
      valid: false,
      stage: 'syntax',
      error: `Domain extension '.${tld}' is a reserved internal/test domain and cannot receive external email.`
    };
  }

  return { valid: true };
}

/**
 * Checks if the email domain is a known burner / disposable service.
 */
export function validateDisposableDomain(email: string): EmailValidationResult {
  const atIndex = email.lastIndexOf('@');
  if (atIndex === -1) {
    return { valid: false, stage: 'disposable', error: "Invalid email: Missing '@' symbol." };
  }
  const domain = email.slice(atIndex + 1).trim().toLowerCase();

  if (isDisposableDomain(domain)) {
    return {
      valid: false,
      stage: 'disposable',
      error: `Temporary and disposable email addresses (@${domain}) are blocked. Please use a permanent email address.`
    };
  }

  return { valid: true };
}

/**
 * Verifies that the email domain has valid Mail Exchange (MX) records.
 * First tries the local backend API (/api/validate-email).
 * If the backend is unavailable or running as a static export, falls back to
 * secure Google DNS-over-HTTPS (DoH) API.
 */
export async function validateDomainMxRecords(domain: string): Promise<EmailValidationResult> {
  const cleanDomain = domain.trim().toLowerCase();

  // 1. Try local backend validation endpoint first
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const backendRes = await fetch('/api/validate-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: `verify@${cleanDomain}`, mode: 'mx' }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (backendRes.ok) {
      const data = await backendRes.json();
      if (typeof data.valid === 'boolean') {
        if (!data.valid) {
          return {
            valid: false,
            stage: 'mx',
            error: data.error || `The domain '@${cleanDomain}' does not have valid mail server (MX) records.`
          };
        }
        return { valid: true };
      }
    }
  } catch {
    // Backend API not reachable or timeout — gracefully proceed to DNS-over-HTTPS fallback
  }

  // 2. DNS-over-HTTPS fallback (Google Public DNS & Cloudflare DNS)
  try {
    const dohController = new AbortController();
    const dohTimeout = setTimeout(() => dohController.abort(), 4000);

    // Query MX records via Google DoH
    const dohUrl = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=MX`;
    const response = await fetch(dohUrl, {
      headers: { Accept: 'application/dns-json' },
      signal: dohController.signal
    });
    clearTimeout(dohTimeout);

    if (response.ok) {
      const data = await response.json();

      // Status 3 is NXDOMAIN (domain does not exist)
      if (data.Status === 3) {
        return {
          valid: false,
          stage: 'mx',
          error: `Domain '@${cleanDomain}' does not exist on global DNS servers.`
        };
      }

      // Check for MX answers (Type 15 is MX)
      const hasMx = Array.isArray(data.Answer) && data.Answer.some((ans: { type: number }) => ans.type === 15);
      if (hasMx) {
        return { valid: true };
      }

      // RFC 5321 fallback: If no MX, check if an A record (Type 1) exists as implicit mail exchanger
      const hasA = Array.isArray(data.Answer) && data.Answer.some((ans: { type: number }) => ans.type === 1);
      if (hasA) {
        return { valid: true };
      }

      // Neither MX nor A record found
      return {
        valid: false,
        stage: 'mx',
        error: `The domain '@${cleanDomain}' does not have active mail server (MX) records to receive emails.`
      };
    }
  } catch (dohErr) {
    console.warn('DNS lookup fallback error:', dohErr);
    // If the client network has blocked DoH, do not block genuine users if syntax & disposable passed
  }

  return { valid: true };
}

/**
 * Full end-to-end email validation:
 * 1. Syntax check
 * 2. Disposable domain check
 * 3. Live DNS MX record check
 */
export async function validateEmailComplete(email: string): Promise<EmailValidationResult> {
  // Step 1: Format & Syntax
  const syntaxCheck = validateEmailSyntax(email);
  if (!syntaxCheck.valid) return syntaxCheck;

  // Step 2: Disposable Domain Check
  const disposableCheck = validateDisposableDomain(email);
  if (!disposableCheck.valid) return disposableCheck;

  // Step 3: Domain MX Records Verification
  const domain = email.slice(email.lastIndexOf('@') + 1).trim();
  const mxCheck = await validateDomainMxRecords(domain);
  if (!mxCheck.valid) return mxCheck;

  return { valid: true };
}

/**
 * Bot and spam protection validation.
 * Verifies that the honeypot is empty and human interaction time threshold is met.
 */
export function validateSpamProtection(
  honeypot: string,
  formRenderTime: number,
  lastSubmissionTime: number
): { isSpam: boolean; error?: string } {
  // 1. Honeypot check: Bots usually autofill hidden fields
  if (honeypot && honeypot.trim().length > 0) {
    return {
      isSpam: true,
      error: 'Security protocol: Automated submission detected.'
    };
  }

  // 2. Submission speed check: Submissions under 1.5 seconds are typical of scripted bots
  const elapsed = Date.now() - formRenderTime;
  if (elapsed < 1500) {
    return {
      isSpam: true,
      error: 'Security verification: Submission occurred too rapidly. Please take a moment to review your message.'
    };
  }

  // 3. Cooldown rate limiter: Prevent rapid spam bursts (10s minimum between submissions)
  if (lastSubmissionTime > 0) {
    const timeSinceLast = Date.now() - lastSubmissionTime;
    if (timeSinceLast < 10000) {
      const waitSeconds = Math.ceil((10000 - timeSinceLast) / 1000);
      return {
        isSpam: true,
        error: `Rate limit: Please wait ${waitSeconds} seconds before sending another message.`
      };
    }
  }

  return { isSpam: false };
}
