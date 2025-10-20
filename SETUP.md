# Salon 803 Application System - Setup Guide

This guide will walk you through setting up the secure job application system using Google Apps Script, Google Sheets, and Google Drive.

## Overview

The application system uses:
- **Google Apps Script**: Webhook endpoint for form submissions
- **Google Sheets**: Storage for application data
- **Google Drive**: Private storage for resume files
- **hCaptcha**: Spam prevention
- **React Frontend**: User-facing application form

## Prerequisites

- Google account
- hCaptcha account (free tier available)
- Access to your website domain

## Step 1: Set Up Google Sheet

1. **Create a new Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "Blank" to create a new spreadsheet
   - Name it "Salon 803 Applications"

2. **Create the applications worksheet:**
   - Rename "Sheet1" to "applications"
   - Add the following column headers in row 1:
     - A1: `timestamp`
     - B1: `name`
     - C1: `email`
     - D1: `phone`
     - E1: `position`
     - F1: `availability`
     - G1: `experience`
     - H1: `file_url`
     - I1: `consent`
     - J1: `ip_hash`
     - K1: `user_agent`

3. **Get the Sheet ID:**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Copy the `YOUR_SHEET_ID` part
   - Save this for later

## Step 2: Set Up Google Drive Folder

1. **Create a private folder:**
   - Go to [Google Drive](https://drive.google.com)
   - Click "New" → "Folder"
   - Name it "Salon 803 Resumes"
   - **Important:** Do NOT share this folder publicly

2. **Get the Folder ID:**
   - Open the folder
   - Look at the URL: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`
   - Copy the `YOUR_FOLDER_ID` part
   - Save this for later

## Step 3: Set Up hCaptcha

1. **Create an hCaptcha account:**
   - Go to [hCaptcha](https://www.hcaptcha.com/)
   - Sign up for a free account

2. **Create a new site:**
   - Go to your [hCaptcha Dashboard](https://dashboard.hcaptcha.com/)
   - Click "New Site"
   - Enter your website domain
   - Click "Save"

3. **Get your keys:**
   - **Site Key** (public): Copy this - it's safe to expose in frontend code
   - **Secret Key** (private): Copy this - keep it secret!

## Step 4: Generate Security Pepper

1. **On macOS/Linux:**
   ```bash
   openssl rand -base64 32
   ```

2. **On Windows (PowerShell):**
   ```powershell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

3. Save this random string - it's your `PEPPER` value

## Step 5: Create Google Apps Script

1. **Create new Apps Script project:**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"
   - Name it "Salon 803 Application Webhook"

2. **Add the code:**
   - Delete any existing code
   - Copy the entire contents of `google-apps-script/Code.gs` from this project
   - Paste it into the Apps Script editor
   - Click "Save" (💾 icon)

3. **Configure Script Properties:**
   - Click "Project Settings" (⚙️ icon) in the left sidebar
   - Scroll down to "Script Properties"
   - Click "Add script property" for each of the following:

   | Property Name | Value | Example |
   |--------------|-------|---------|
   | `SHEET_ID` | Your Google Sheet ID from Step 1 | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` |
   | `DRIVE_FOLDER_ID` | Your Drive folder ID from Step 2 | `1dyC0eBa0p5VQcH9GkSfT5NGrmHXwvLLv` |
   | `CAPTCHA_SECRET` | Your hCaptcha Secret Key from Step 3 | `0x0000000000000000000000000000000000000000` |
   | `PEPPER` | Your random string from Step 4 | `dGhpc2lzYXJhbmRvbXN0cmluZ2Zvcmhhc2hpbmc=` |
   | `ALLOWED_ORIGIN` | Your website URL | `https://salon803.com` |
   | `NOTIFY_EMAIL` | (Optional) Email for notifications | `hr@salon803.com` |

4. **Deploy as Web App:**
   - Click "Deploy" → "New deployment"
   - Click the "Select type" gear icon → "Web app"
   - Fill in:
     - **Description:** "Application webhook v1"
     - **Execute as:** Me (your Google account email)
     - **Who has access:** Anyone
   - Click "Deploy"
   - **Important:** Copy the "Web app URL" - this is your webhook URL
   - Click "Done"

5. **Authorize the script:**
   - Google will ask you to authorize the script
   - Click "Review permissions"
   - Select your Google account
   - Click "Advanced" → "Go to Salon 803 Application Webhook (unsafe)"
   - Click "Allow"

## Step 6: Configure Frontend Environment

1. **Create .env file:**
   - Copy `.env.example` to `.env` in your project root
   - Fill in the values:

   ```env
   # Google Apps Script webhook URL from Step 5
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   
   # hCaptcha site key (public) from Step 3
   VITE_HCAPTCHA_SITE_KEY=your-site-key-here
   ```

2. **Verify .env is in .gitignore:**
   - Ensure `.env` is listed in `.gitignore`
   - NEVER commit `.env` to version control

## Step 7: Test the Application

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the application page:**
   - Go to `http://localhost:5173/apply`

3. **Fill out and submit a test application:**
   - Fill in all required fields
   - Upload a test PDF resume (under 5MB)
   - Check the consent box
   - Complete the CAPTCHA
   - Click "Submit Application"

4. **Verify the submission:**
   - **Check Google Sheet:** A new row should appear in your "applications" worksheet
   - **Check Google Drive:** The resume file should be uploaded to your folder
   - **Check Email:** If you configured `NOTIFY_EMAIL`, you should receive a notification

## Step 8: Production Deployment

1. **Update Apps Script ALLOWED_ORIGIN:**
   - Go back to your Apps Script project
   - Click "Project Settings"
   - Update the `ALLOWED_ORIGIN` property to your production domain
   - Example: `https://www.salon803.com`

2. **Update frontend .env:**
   - Update `VITE_APPS_SCRIPT_URL` if using a different deployment for production
   - Ensure `VITE_HCAPTCHA_SITE_KEY` is correct

3. **Deploy your website:**
   - Build your production bundle
   - Deploy to your hosting provider

## Troubleshooting

### "CAPTCHA verification failed"
- Double-check your hCaptcha secret key in Apps Script properties
- Ensure you're using the correct site key in frontend .env
- Verify the CAPTCHA is visible and interactive on the form

### "SHEET_ID not configured"
- Verify the Sheet ID is correct in Apps Script properties
- Ensure you copied the ID from the URL, not the sheet name

### "Permission denied" errors
- Re-authorize the Apps Script (Deploy → Manage deployments → Edit → Deploy again)
- Ensure the script is set to "Execute as: Me"

### Form submission fails with CORS error
- Check `ALLOWED_ORIGIN` in Apps Script matches your website URL
- Ensure you're using HTTPS in production
- Clear browser cache and try again

### Resume not uploading
- Check file size is under 5MB
- Verify file type is PDF, DOC, or DOCX
- Check Drive folder ID is correct
- Ensure the folder is not deleted or moved

### No email notifications
- Verify `NOTIFY_EMAIL` is set in Apps Script properties
- Check your email spam folder
- Review Apps Script execution logs (View → Executions)

## Monitoring & Maintenance

### View Submission Logs

1. **Apps Script Executions:**
   - Go to your Apps Script project
   - Click "Executions" in left sidebar
   - View success/failure logs for each submission

2. **Google Sheet:**
   - Review submissions directly in the applications worksheet
   - Create charts/reports as needed

### Rate Limit Cleanup

The rate limiting uses temporary storage that can fill up over time.

**Set up a cleanup trigger:**
1. In Apps Script, click "Triggers" (⏰ icon)
2. Click "+ Add Trigger"
3. Function: `cleanupRateLimits`
4. Event source: Time-driven
5. Type: Day timer
6. Time of day: Pick any time (e.g., 2am)
7. Click "Save"

This will automatically clean up expired rate limit data daily.

### Security Maintenance

- **Rotate PEPPER:** Every 12 months (see SECURITY.md)
- **Rotate hCaptcha keys:** Every 6 months
- **Review Sheet access:** Monthly
- **Check Drive folder permissions:** Monthly
- **Monitor execution logs:** Weekly

## Advanced Configuration

### Custom Email Templates

Edit the `sendNotificationEmail` function in Code.gs to customize:
- Email subject line
- Email body format
- Additional recipients (CC/BCC)

### Custom Validation Rules

Edit the `validateData` function in Code.gs to add:
- Custom field requirements
- Additional format validation
- Business logic rules

### Rate Limit Adjustments

In Code.gs, modify these constants:
```javascript
const RATE_LIMIT_WINDOW = 3600000; // 1 hour (in milliseconds)
const RATE_LIMIT_MAX = 5;          // 5 submissions per window
```

## Support

For issues or questions:
- Review SECURITY.md for security best practices
- Review PRIVACY.md for data handling policies
- Check Apps Script execution logs for errors
- Contact: info@salon803.com

---

**Setup Complete!** 🎉

Your secure job application system is now ready to receive submissions.
