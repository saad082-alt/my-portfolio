import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dns from 'node:dns';

/**
 * Backend Email Validation Middleware Plugin
 * Implements server-side email format, disposable domain, and DNS MX record verification.
 */
function emailValidatorBackendPlugin(): Plugin {
  return {
    name: 'backend-email-validator',
    configureServer(server) {
      server.middlewares.use('/api/validate-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ valid: false, error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}');
            const email = (payload.email || '').trim();

            if (!email) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ valid: false, error: 'Please enter an email address.' }));
              return;
            }

            // 1. Syntax check
            const atIndex = email.lastIndexOf('@');
            if (atIndex <= 0 || atIndex === email.length - 1) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ valid: false, error: "Invalid email syntax: Missing or malformed '@' symbol." }));
              return;
            }

            const domain = email.slice(atIndex + 1).toLowerCase();
            if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ valid: false, error: "Invalid domain name: Missing valid domain extension (e.g. '.com', '.org')." }));
              return;
            }

            // 2. Disposable domain check
            const disposableKeywords = [
              'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
              'yopmail.com', 'trashmail.com', 'temp-mail.org', 'dispostable.com',
              'sharklasers.com', 'burnermail.io', 'getairmail.com', 'inboxkitten.com',
              'maildrop.cc', 'tempmailo.com', 'emailondeck.com', 'nada.ltd', 'mohmal.com',
              'crazymailing.com', 'fakemailgenerator.com', 'mytemp.email', 'dropmail.me'
            ];

            const isDisposable = disposableKeywords.some(d => domain === d || domain.endsWith('.' + d));
            if (isDisposable) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                valid: false,
                error: `Temporary and disposable email addresses (@${domain}) are blocked. Please use a permanent email.`
              }));
              return;
            }

            // 3. DNS MX Record Verification via Node.js
            try {
              const mxRecords = await dns.promises.resolveMx(domain);
              if (Array.isArray(mxRecords) && mxRecords.length > 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ valid: true, mxCount: mxRecords.length }));
                return;
              }
            } catch (mxErr: any) {
              // RFC 5321 fallback: Check if root A record exists
              try {
                const aRecords = await dns.promises.resolve4(domain);
                if (Array.isArray(aRecords) && aRecords.length > 0) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ valid: true, aRecordFallback: true }));
                  return;
                }
              } catch {
                // Neither MX nor A record exists
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  valid: false,
                  error: `The domain '@${domain}' does not have valid mail server (MX) records and cannot receive emails.`
                }));
                return;
              }
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ valid: true }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ valid: false, error: 'Server validation error occurred.' }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react(), tailwindcss(), emailValidatorBackendPlugin()],
  server: {
    port: 3000,
  },
});
