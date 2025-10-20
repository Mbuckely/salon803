/**
 * Google Apps Script Webhook for Salon 803 Job Applications
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Apps Script project: script.google.com
 * 2. Paste this code into Code.gs
 * 3. Set up the following script properties (Project Settings > Script Properties):
 *    - SHEET_ID: Your Google Sheet ID
 *    - DRIVE_FOLDER_ID: Your Google Drive folder ID for resumes
 *    - CAPTCHA_SECRET: Your hCaptcha secret key
 *    - PEPPER: Random string for IP hashing (min 32 chars)
 *    - ALLOWED_ORIGIN: Your website URL (e.g., https://yourdomain.com)
 * 4. Deploy as Web App:
 *    - Click Deploy > New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Copy the deployment URL
 * 5. Update VITE_APPS_SCRIPT_URL in your .env file with the deployment URL
 */

// Rate limiting store (properties service for persistence)
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const RATE_LIMIT_MAX = 5;

/**
 * Handle POST requests (form submissions)
 */
function doPost(e) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const allowedOrigin = scriptProperties.getProperty('ALLOWED_ORIGIN') || '*';
    
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Parse request body
    const data = JSON.parse(e.postData.contents);
    
    // Get client IP (hashed for privacy)
    const clientIP = e.parameter.userip || 'unknown';
    const ipHash = hashIP(clientIP);
    
    // Check rate limit
    if (!checkRateLimit(ipHash)) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Too many requests. Please try again later.'
      }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers)
        .setStatusCode(429);
    }
    
    // Validate required fields
    const validationError = validateData(data);
    if (validationError) {
      return ContentService.createTextOutput(JSON.stringify({
        error: validationError
      }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers)
        .setStatusCode(400);
    }
    
    // Verify CAPTCHA
    if (!data.captchaToken) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'CAPTCHA verification required'
      }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers)
        .setStatusCode(400);
    }
    
    const captchaValid = verifyCaptcha(data.captchaToken);
    if (!captchaValid) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'CAPTCHA verification failed'
      }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers)
        .setStatusCode(400);
    }
    
    // Upload resume to Google Drive (if provided)
    let fileUrl = '';
    if (data.resumeData && data.resumeName) {
      fileUrl = uploadResumeToDrive(data.resumeData, data.resumeName);
    }
    
    // Append to Google Sheet
    appendToSheet(data, fileUrl, ipHash, e.parameter.useragent || 'unknown');
    
    // Send notification email (optional)
    sendNotificationEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Application submitted successfully'
    }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    Logger.log('Error processing application: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      error: 'An error occurred. Please try again later.'
    }))
      .setMimeType(ContentService.MimeType.JSON)
      .setStatusCode(500);
  }
}

/**
 * Handle OPTIONS requests (CORS preflight)
 */
function doOptions(e) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const allowedOrigin = scriptProperties.getProperty('ALLOWED_ORIGIN') || '*';
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
}

/**
 * Validate form data
 */
function validateData(data) {
  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0 || data.name.length > 100) {
    return 'Invalid name';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email) || data.email.length > 255) {
    return 'Invalid email address';
  }
  
  // Phone validation
  const phoneDigits = (data.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return 'Invalid phone number';
  }
  
  // Position validation
  if (!data.position || typeof data.position !== 'string' || data.position.length > 100) {
    return 'Invalid position';
  }
  
  // Availability validation
  if (!data.availability || typeof data.availability !== 'string' || data.availability.length > 200) {
    return 'Invalid availability';
  }
  
  // Experience validation
  if (!data.experience || typeof data.experience !== 'string' || data.experience.length > 1000) {
    return 'Invalid experience description';
  }
  
  // Consent validation
  if (data.consent !== true) {
    return 'Consent is required';
  }
  
  return null;
}

/**
 * Verify hCaptcha token
 */
function verifyCaptcha(token) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const secret = scriptProperties.getProperty('CAPTCHA_SECRET');
  
  if (!secret) {
    Logger.log('CAPTCHA_SECRET not configured');
    return false;
  }
  
  try {
    const response = UrlFetchApp.fetch('https://hcaptcha.com/siteverify', {
      method: 'post',
      payload: {
        secret: secret,
        response: token
      }
    });
    
    const result = JSON.parse(response.getContentText());
    return result.success === true;
  } catch (error) {
    Logger.log('CAPTCHA verification error: ' + error.toString());
    return false;
  }
}

/**
 * Upload resume to Google Drive
 */
function uploadResumeToDrive(resumeData, resumeName) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const folderId = scriptProperties.getProperty('DRIVE_FOLDER_ID');
  
  if (!folderId) {
    throw new Error('DRIVE_FOLDER_ID not configured');
  }
  
  try {
    // Extract base64 data
    const base64Data = resumeData.split(',')[1];
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      MimeType.PDF, // Default to PDF, adjust if needed
      resumeName
    );
    
    // Generate random filename
    const extension = resumeName.split('.').pop();
    const randomName = 'resume_' + new Date().getTime() + '_' + Utilities.getUuid() + '.' + extension;
    
    // Upload to Drive
    const folder = DriveApp.getFolderById(folderId);
    const file = folder.createFile(blob);
    file.setName(randomName);
    
    // Set file to private (remove public access)
    file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.NONE);
    
    return file.getUrl();
  } catch (error) {
    Logger.log('Error uploading file to Drive: ' + error.toString());
    throw error;
  }
}

/**
 * Append application data to Google Sheet
 */
function appendToSheet(data, fileUrl, ipHash, userAgent) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const sheetId = scriptProperties.getProperty('SHEET_ID');
  
  if (!sheetId) {
    throw new Error('SHEET_ID not configured');
  }
  
  try {
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('applications');
    
    if (!sheet) {
      throw new Error('Sheet "applications" not found');
    }
    
    const row = [
      new Date(),                    // timestamp
      data.name,                     // name
      data.email,                    // email
      data.phone,                    // phone
      data.position,                 // position
      data.availability,             // availability
      data.experience,               // experience
      fileUrl,                       // file_url
      data.consent ? 'Yes' : 'No',   // consent
      ipHash,                        // ip_hash
      userAgent                      // user_agent
    ];
    
    sheet.appendRow(row);
  } catch (error) {
    Logger.log('Error appending to sheet: ' + error.toString());
    throw error;
  }
}

/**
 * Send notification email (optional)
 */
function sendNotificationEmail(data) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const notifyEmail = scriptProperties.getProperty('NOTIFY_EMAIL');
    
    if (!notifyEmail) {
      return; // Email notifications not configured
    }
    
    const subject = 'New Job Application: ' + data.name;
    const body = `
New Job Application Received

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Position: ${data.position}
Availability: ${data.availability}

Experience:
${data.experience}

Check the applications spreadsheet for the full details and resume.
    `;
    
    MailApp.sendEmail({
      to: notifyEmail,
      subject: subject,
      body: body
    });
  } catch (error) {
    Logger.log('Error sending notification email: ' + error.toString());
    // Don't throw - email is optional
  }
}

/**
 * Hash IP address for privacy
 */
function hashIP(ip) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const pepper = scriptProperties.getProperty('PEPPER') || 'default-pepper-change-me';
  
  const signature = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    ip + pepper
  );
  
  return signature.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

/**
 * Check rate limit for IP
 */
function checkRateLimit(ipHash) {
  const userProperties = PropertiesService.getUserProperties();
  const key = 'rate_limit_' + ipHash;
  const now = new Date().getTime();
  
  const recordStr = userProperties.getProperty(key);
  
  if (!recordStr) {
    // First request from this IP
    userProperties.setProperty(key, JSON.stringify({
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW
    }));
    return true;
  }
  
  const record = JSON.parse(recordStr);
  
  // Check if window has expired
  if (now > record.resetAt) {
    userProperties.setProperty(key, JSON.stringify({
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW
    }));
    return true;
  }
  
  // Check if limit exceeded
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  // Increment count
  record.count++;
  userProperties.setProperty(key, JSON.stringify(record));
  return true;
}

/**
 * Clean up old rate limit records (run this on a timer trigger)
 */
function cleanupRateLimits() {
  const userProperties = PropertiesService.getUserProperties();
  const allKeys = userProperties.getKeys();
  const now = new Date().getTime();
  
  allKeys.forEach(function(key) {
    if (key.startsWith('rate_limit_')) {
      try {
        const record = JSON.parse(userProperties.getProperty(key));
        if (now > record.resetAt) {
          userProperties.deleteProperty(key);
        }
      } catch (e) {
        // Invalid record, delete it
        userProperties.deleteProperty(key);
      }
    }
  });
}
