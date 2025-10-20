# Security Documentation - Salon 803 Application System

## Overview

This document outlines the security controls implemented in the Salon 803 job application system and provides guidance for security maintenance and key rotation.

## Security Controls

### 1. Input Validation & Sanitization

**Client-Side Validation:**
- Email: RFC-compliant email validation, max 255 characters
- Phone: 10-15 digit validation after removing non-numeric characters
- Name/Position: Max 100 characters, trimmed, non-empty
- Availability: Max 200 characters
- Experience: Max 1000 characters with character counter
- File uploads: Restricted to PDF, DOC, DOCX formats only, max 5MB

**Server-Side Validation:**
- All client-side validations are duplicated on the server
- Schema validation using strict type checking
- Unknown fields are rejected
- Request body size limited to 5MB total
- MIME type verification for uploaded files

### 2. File Upload Security

**Restrictions:**
- Allowed formats: PDF (.pdf), DOC (.doc), DOCX (.docx)
- Maximum size: 5MB per file
- File type validation: Both extension and MIME type checked
- Random filenames generated to prevent directory traversal attacks

**Storage:**
- Files stored in a private Google Drive folder (not publicly accessible)
- Only file IDs/URLs are stored in Google Sheets
- Service account has minimal permissions (write-only to specific folder)

### 3. Spam & Abuse Prevention

**CAPTCHA:**
- hCaptcha integration required for all submissions
- Server-side verification of CAPTCHA tokens
- CAPTCHA token is single-use and expires

**Rate Limiting:**
- 5 submissions per hour per IP address
- IP addresses are hashed with a server-side pepper before storage
- In-memory rate limiting (consider Redis for production scale)

**Honeypot:**
- Hidden fields can be added to detect bot submissions
- Submissions with honeypot data are silently rejected

### 4. Data Protection

**IP Address Handling:**
- IP addresses are never stored in plain text
- SHA-256 hash with server-side pepper (from `PEPPER` environment variable)
- Only hash is stored in Google Sheets for abuse detection

**PII Protection:**
- No PII logged to console or error logs
- Errors return generic messages to users
- Detailed errors logged server-side with correlation IDs
- Append-only writes to Google Sheets (no update/delete from application)

**Consent:**
- Explicit consent checkbox required
- Link to Privacy Policy provided
- Consent status recorded with each submission

### 5. API Security

**Authentication:**
- Google Service Account with minimal scopes:
  - `https://www.googleapis.com/auth/spreadsheets` (write to specific sheet)
  - `https://www.googleapis.com/auth/drive.file` (write to specific folder)
- JWT-based authentication with RS256 signing
- Access tokens expire after 1 hour

**CORS:**
- Allowlist only production origin (configured via `APP_BASE_URL`)
- Explicit allowed methods: POST, OPTIONS
- Credentials not allowed in cross-origin requests

**CSRF Protection:**
- If cookies/sessions are used in future, CSRF tokens should be implemented
- Currently stateless, so CSRF risk is minimal

### 6. Security Headers

All responses include comprehensive security headers:

```
Content-Security-Policy: default-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**CSP Directive Explanations:**
- `default-src 'self'`: Only load resources from same origin
- `form-action 'self'`: Forms can only submit to same origin
- `frame-ancestors 'none'`: Prevent clickjacking
- `base-uri 'self'`: Prevent base tag injection

### 7. HTTPS & Transport Security

**Production Requirements:**
- HTTPS must be enforced (redirect HTTP to HTTPS)
- HSTS header ensures browsers always use HTTPS
- Certificate must be valid and up-to-date

**Development:**
- In local development, use localhost over HTTP
- Never commit production credentials to repository

## Environment Variables

All sensitive configuration must be provided via environment variables. **Never commit these to version control.**

Required variables (see `.env.example`):

```
GOOGLE_SA_JSON={"type":"service_account",...}
GOOGLE_SHEETS_ID=your-sheet-id
GOOGLE_DRIVE_FOLDER_ID=your-folder-id
CAPTCHA_SITE_KEY=your-hcaptcha-site-key
CAPTCHA_SECRET=your-hcaptcha-secret
INTERNAL_NOTIFY_EMAIL=notifications@yourdomain.com
APP_BASE_URL=https://yourdomain.com
PEPPER=long-random-string-for-ip-hashing
RESEND_API_KEY=re_your_resend_key (optional)
```

## Key Rotation Procedures

### Google Service Account Key Rotation

**Frequency:** Every 90 days or immediately if compromised

**Steps:**
1. Go to Google Cloud Console → IAM & Admin → Service Accounts
2. Select your service account
3. Click "Keys" tab → "Add Key" → "Create new key" → JSON
4. Download the new key file
5. Update `GOOGLE_SA_JSON` environment variable with new key content
6. Verify application works with new key
7. Delete old key from Google Cloud Console
8. Update key rotation date in your security log

### CAPTCHA Secret Rotation

**Frequency:** Every 180 days or if compromised

**Steps:**
1. Go to hCaptcha dashboard → Settings
2. Generate new secret key
3. Update `CAPTCHA_SECRET` environment variable
4. Test form submission
5. Revoke old secret key

### PEPPER Rotation

**Frequency:** Annually or if server compromise suspected

**Important:** Rotating the pepper will invalidate all existing IP hashes. Historical rate limiting data will be lost.

**Steps:**
1. Generate new cryptographically random string (min 32 characters)
2. Update `PEPPER` environment variable
3. Clear rate limiting store (or wait for natural expiration)
4. Document rotation in security log

### Resend API Key Rotation (if used)

**Frequency:** Every 180 days

**Steps:**
1. Go to Resend dashboard → API Keys
2. Create new API key
3. Update `RESEND_API_KEY` environment variable
4. Test email sending
5. Delete old API key

## Data Deletion Requests

Users may request deletion of their application data under privacy regulations (GDPR, CCPA, etc.).

**Process:**
1. Verify identity of requester (email confirmation)
2. Locate row in Google Sheet by email/name/timestamp
3. Manually delete row from Google Sheet
4. Locate file in Google Drive by file ID (from deleted row)
5. Delete file from Google Drive
6. Send confirmation to requester
7. Log deletion request with date and requester info

**Automation Note:** This process is currently manual. For high volumes, consider implementing an admin dashboard with delete functionality.

## Logging & Monitoring

### What is Logged (Server-Side Only)

- Submission timestamps
- IP hash (not raw IP)
- User agent string
- Error types (generic, no PII)
- CAPTCHA verification failures
- Rate limit violations

### What is NOT Logged

- Raw IP addresses
- Email addresses
- Phone numbers
- Resume content
- Any personally identifiable information
- Stack traces in production responses

### Monitoring Recommendations

- Set up alerts for rate limit violations (potential abuse)
- Monitor failed CAPTCHA verifications
- Track Google API errors
- Monitor file upload sizes and types
- Alert on repeated errors from same IP hash

## Incident Response

### If Service Account Key is Compromised

1. **Immediately** delete the compromised key in Google Cloud Console
2. Generate new service account key
3. Update environment variable
4. Review Google Sheets and Drive for unauthorized access
5. Notify affected users if data was accessed
6. Document incident and lessons learned

### If CAPTCHA Secret is Exposed

1. Immediately generate new secret in hCaptcha dashboard
2. Update environment variable
3. Revoke old secret
4. Monitor for spam submissions during transition
5. Consider temporarily increasing rate limits if legitimate users affected

### If Data Breach Occurs

1. Determine scope: What data was accessed? How many users affected?
2. Contain breach: Rotate all keys, review access logs
3. Notify affected individuals within 72 hours (GDPR requirement)
4. File breach report with relevant authorities if required
5. Review and improve security controls
6. Document timeline and response actions

## Security Best Practices

1. **Principle of Least Privilege:** Service accounts have only necessary permissions
2. **Defense in Depth:** Multiple layers of validation (client + server)
3. **Fail Securely:** Errors fail closed, returning generic messages
4. **Security by Design:** Security considered from initial architecture
5. **Regular Updates:** Keep dependencies updated for security patches
6. **Code Reviews:** All security-related code should be reviewed
7. **Penetration Testing:** Consider annual security audit

## Limitations & Future Improvements

### Current Limitations

1. **Rate Limiting:** In-memory store won't scale across multiple instances
   - **Recommendation:** Implement Redis for distributed rate limiting

2. **CSRF:** Not implemented as system is currently stateless
   - **Recommendation:** Add if cookies/sessions are introduced

3. **Manual Data Deletion:** No automated self-service deletion
   - **Recommendation:** Build admin panel for GDPR compliance

4. **Email Sending:** Optional, relies on third-party service
   - **Fallback:** Administrators can manually check Google Sheets

### Planned Improvements

- Implement automated backup of Google Sheets data
- Add email verification step before submission
- Build admin dashboard for application management
- Implement automated security scanning in CI/CD
- Add comprehensive integration tests for security controls

## Contact

For security concerns or to report vulnerabilities, contact:
- **Email:** security@salon803.com (if configured)
- **Google Sheet:** Direct access for authorized personnel only

**Responsible Disclosure:** We appreciate responsible disclosure of security vulnerabilities. Please allow 90 days for remediation before public disclosure.

---

*Last Updated: 2025-01-20*  
*Next Review Date: 2025-04-20*  
*Document Version: 1.0*
