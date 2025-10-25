# Security Documentation - Salon 803 Application System

## Overview

This document outlines the security controls implemented in the Salon 803 job application system using Google Apps Script, Google Sheets, Google Drive, and hCaptcha.

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
- SHA-256 hash with server-side pepper (stored in Apps Script properties)
- Only hash is stored in Google Sheets for abuse detection

**PII Protection:**
- No PII logged to console or error logs
- Errors return generic messages to users
- Detailed errors logged in Apps Script execution logs
- Append-only writes to Google Sheets (no programmatic updates/deletes)

**Consent:**
- Explicit consent checkbox required
- Link to Privacy Policy provided
- Consent status recorded with each submission

### 5. API Security

**Authentication:**
- Google Apps Script runs with your Google account permissions
- No service account JSON files to manage
- Leverages Google's built-in OAuth2 authentication
- Script accessible via unique deployment URL
- Deployment URL changes with each re-deployment for additional security

**CORS:**
- Allowlist only production origin (configured in Apps Script `ALLOWED_ORIGIN` property)
- Explicit allowed methods: POST, OPTIONS
- No credentials required in cross-origin requests

**CSRF Protection:**
- Apps Script deployment URLs are unique and unpredictable
- No cookies or sessions used (stateless)
- CSRF risk is minimal

### 6. Google Apps Script Security

**Script Properties Protection:**
- All sensitive data stored in Script Properties (not in code)
- Properties encrypted by Google at rest
- Only script owner can view/edit properties
- Properties survive script re-deployment

**Execution Controls:**
- Script runs with owner's Google account permissions
- Access to specific Sheet and Drive folder only
- No elevated privileges beyond Google account scope

**Deployment Security:**
- Unique deployment ID prevents URL guessing
- "Execute as: Me" ensures consistent permissions
- Can be re-deployed to rotate deployment URL

### 7. HTTPS & Transport Security

**Production Requirements:**
- HTTPS must be enforced for the frontend website
- Apps Script endpoints use HTTPS by default
- All data transmitted over encrypted connections

**Development:**
- Local development can use HTTP on localhost
- Never use production credentials in development

## Apps Script Configuration

All sensitive configuration is stored in Google Apps Script Properties. **Never commit these to version control.**

Required properties (configured in Apps Script Project Settings):

```
SHEET_ID=your-google-sheet-id
DRIVE_FOLDER_ID=your-drive-folder-id
CAPTCHA_SECRET=your-hcaptcha-secret
PEPPER=long-random-string-for-ip-hashing
ALLOWED_ORIGIN=https://yourdomain.com
NOTIFY_EMAIL=notifications@yourdomain.com (optional)
```

Frontend environment variables (in .env file):

```
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
VITE_HCAPTCHA_SITE_KEY=your-hcaptcha-site-key
```

## Key Rotation Procedures

### Apps Script Deployment Rotation

**Frequency:** Every 180 days or if deployment URL is exposed

**Steps:**
1. Go to your Apps Script project
2. Click "Deploy" → "Manage deployments"
3. Click "..." next to current deployment → "Archive"
4. Click "New deployment"
5. Configure same settings as before
6. Copy new deployment URL
7. Update `VITE_APPS_SCRIPT_URL` in frontend .env file
8. Deploy updated frontend
9. Test form submission
10. Document rotation in security log

### CAPTCHA Secret Rotation

**Frequency:** Every 180 days or if compromised

**Steps:**
1. Go to hCaptcha dashboard → Settings
2. Generate new secret key
3. Update `CAPTCHA_SECRET` environment variable
4. Test form submission
5. Revoke old secret key

### PEPPER Rotation

**Frequency:** Annually or if Apps Script properties are compromised

**Important:** Rotating the pepper will invalidate all existing IP hashes. Historical rate limiting data will be lost.

**Steps:**
1. Generate new cryptographically random string (min 32 characters): `openssl rand -base64 32`
2. Go to Apps Script → Project Settings → Script Properties
3. Update `PEPPER` property with new value
4. Click "Save"
5. Rate limiting will reset automatically
6. Document rotation in security log

### Email Notification Setup (Optional)

**If using Gmail via Apps Script:**
- No API keys needed - uses your Google account
- Configure `NOTIFY_EMAIL` in Script Properties
- Email sent via `MailApp.sendEmail()`
- Subject to Google's email sending quotas

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

### What is Logged (Apps Script Execution Logs)

- Submission timestamps
- Success/failure status
- Error messages (generic, no PII)
- CAPTCHA verification results
- Rate limit violations

**To view logs:**
1. Go to Apps Script project
2. Click "Executions" in sidebar
3. View detailed logs for each submission

### What is NOT Logged in Execution Logs

- Raw IP addresses (only hashes stored in Sheet)
- Full PII (only in Sheet, not logs)
- Stack traces containing sensitive data

### Monitoring Recommendations

- Review Apps Script executions weekly
- Monitor Google Sheet for patterns
- Set up email alerts for failed executions (Apps Script → Triggers)
- Track rate limit violations
- Monitor Google Drive storage usage

## Incident Response

### If Apps Script Properties are Compromised

1. **Immediately** rotate all Script Properties:
   - New PEPPER value
   - New CAPTCHA_SECRET
   - New ALLOWED_ORIGIN (if needed)
2. Archive old deployment and create new one
3. Review Apps Script execution logs for unauthorized access
4. Check Google Sheet and Drive for unauthorized changes
5. Update frontend with new deployment URL
6. Notify affected users if data was accessed
7. Document incident

### If Apps Script Deployment URL is Exposed

1. Archive the exposed deployment immediately
2. Create new deployment with different settings
3. Update frontend with new URL
4. Monitor old deployment's execution logs
5. Consider whether to revoke all properties and start fresh
6. Document incident

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

1. **Rate Limiting:** Uses Apps Script User Properties (per-user storage)
   - **Limitation:** Limited to 9KB total storage
   - **Recommendation:** Implement automated cleanup trigger (see SETUP.md)

2. **File Size:** Maximum 50MB per Apps Script execution
   - **Current Limit:** 5MB enforced in code
   - **Recommendation:** Consider Google Cloud Storage for larger files

3. **Email Sending:** Uses Google's MailApp (quota limits apply)
   - **Limitation:** ~100 emails/day for personal accounts
   - **Recommendation:** Use Google Workspace for higher quotas

4. **Manual Data Deletion:** No automated self-service deletion
   - **Recommendation:** Build admin dashboard for GDPR compliance

### Planned Improvements

- Set up automated rate limit cleanup trigger
- Implement Google Cloud Storage for large files
- Build admin dashboard with Google Apps Script HTML Service
- Add automated Sheet backups
- Implement email verification before submission

## Contact

For security concerns or to report vulnerabilities, contact:
- **Email:** security@salon803.com (if configured)
- **Google Sheet:** Direct access for authorized personnel only

**Responsible Disclosure:** We appreciate responsible disclosure of security vulnerabilities. Please allow 90 days for remediation before public disclosure.

---

*Last Updated: 2025-01-20*  
*Next Review Date: 2025-04-20*  
*Document Version: 1.0*
