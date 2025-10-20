import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("APP_BASE_URL") || "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-csrf-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": "default-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'",
};

// Rate limiting store (in-memory, consider Redis for production)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const RATE_LIMIT_MAX = 5;

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  position: string;
  availability: string;
  experience: string;
  consent: boolean;
  captchaToken: string;
  resumeData?: string;
  resumeName?: string;
}

// Validation schemas
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 255;
};

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

const validateString = (str: string, maxLength: number): boolean => {
  return typeof str === 'string' && str.trim().length > 0 && str.length <= maxLength;
};

const hashIP = async (ip: string): Promise<string> => {
  const pepper = Deno.env.get("PEPPER") || "default-pepper-change-me";
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + pepper);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
};

const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);
  
  if (!record || now > record.resetAt) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
};

const verifyCaptcha = async (token: string): Promise<boolean> => {
  const secret = Deno.env.get("CAPTCHA_SECRET");
  if (!secret) {
    console.error("CAPTCHA_SECRET not configured");
    return false;
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("CAPTCHA verification error:", error);
    return false;
  }
};

const appendToGoogleSheet = async (data: ApplicationData, ipHash: string, userAgent: string) => {
  const serviceAccountJson = Deno.env.get("GOOGLE_SA_JSON");
  const sheetId = Deno.env.get("GOOGLE_SHEETS_ID");
  
  if (!serviceAccountJson || !sheetId) {
    throw new Error("Google Sheets configuration missing");
  }

  const serviceAccount = JSON.parse(serviceAccountJson);
  
  // Create JWT for Google API authentication
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  // Import key for signing
  const encoder = new TextEncoder();
  const keyData = serviceAccount.private_key.replace(/\\n/g, '\n');
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = keyData.substring(pemHeader.length, keyData.length - pemFooter.length).trim();
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const jwtInput = `${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(claim))}`;
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(jwtInput)
  );
  
  const jwt = `${jwtInput}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;

  // Get access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const { access_token } = await tokenResponse.json();

  // Upload file to Google Drive if present
  let fileUrl = "";
  if (data.resumeData && data.resumeName) {
    const driveFolderId = Deno.env.get("GOOGLE_DRIVE_FOLDER_ID");
    const base64Data = data.resumeData.split(",")[1];
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    const randomName = `resume_${Date.now()}_${crypto.randomUUID()}.${data.resumeName.split('.').pop()}`;
    
    const metadata = {
      name: randomName,
      parents: [driveFolderId],
    };

    const formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    formData.append("file", new Blob([binaryData]));

    const uploadResponse = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${access_token}` },
        body: formData,
      }
    );

    const fileData = await uploadResponse.json();
    fileUrl = `https://drive.google.com/file/d/${fileData.id}/view`;
  }

  // Append to Google Sheet
  const row = [
    new Date().toISOString(),
    data.name,
    data.email,
    data.phone,
    data.position,
    data.availability,
    data.experience,
    fileUrl,
    data.consent ? "Yes" : "No",
    ipHash,
    userAgent,
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/applications:append?valueInputOption=RAW`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    }
  );

  return fileUrl;
};

const sendNotificationEmail = async (data: ApplicationData) => {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notifyEmail = Deno.env.get("INTERNAL_NOTIFY_EMAIL");
  
  if (!resendApiKey || !notifyEmail) {
    console.warn("Email notification not configured");
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Salon 803 Applications <onboarding@resend.dev>",
        to: [notifyEmail],
        subject: `New Application: ${data.name}`,
        html: `
          <h2>New Job Application Received</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Position:</strong> ${data.position}</p>
          <p><strong>Availability:</strong> ${data.availability}</p>
          <p><strong>Experience:</strong> ${data.experience}</p>
        `,
      }),
    });
  } catch (error) {
    console.error("Failed to send notification email:", error);
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check content length (200KB + file allowance = ~5.2MB total)
    const contentLength = parseInt(req.headers.get("content-length") || "0");
    if (contentLength > 5242880) { // 5MB
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const ipHash = await hashIP(clientIP);
    
    if (!checkRateLimit(ipHash)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data: ApplicationData = await req.json();

    // Validate required fields
    if (!validateString(data.name, 100)) {
      return new Response(JSON.stringify({ error: "Invalid name" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validateEmail(data.email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validatePhone(data.phone)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validateString(data.position, 100)) {
      return new Response(JSON.stringify({ error: "Invalid position" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validateString(data.availability, 200)) {
      return new Response(JSON.stringify({ error: "Invalid availability" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validateString(data.experience, 1000)) {
      return new Response(JSON.stringify({ error: "Invalid experience description" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (data.consent !== true) {
      return new Response(JSON.stringify({ error: "Consent required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify CAPTCHA
    if (!data.captchaToken) {
      return new Response(JSON.stringify({ error: "CAPTCHA required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const captchaValid = await verifyCaptcha(data.captchaToken);
    if (!captchaValid) {
      return new Response(JSON.stringify({ error: "CAPTCHA verification failed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate file if present
    if (data.resumeData) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileExtension = data.resumeName?.toLowerCase().match(/\.\w+$/)?.[0];
      
      if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        return new Response(JSON.stringify({ error: "Invalid file type. Only PDF, DOC, DOCX allowed." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check file size (base64 encoded is ~33% larger than original)
      const base64Data = data.resumeData.split(",")[1];
      const sizeInBytes = (base64Data.length * 3) / 4;
      if (sizeInBytes > 5242880) { // 5MB
        return new Response(JSON.stringify({ error: "File too large. Maximum 5MB." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const userAgent = req.headers.get("user-agent") || "unknown";

    // Save to Google Sheets and Drive
    await appendToGoogleSheet(data, ipHash, userAgent);

    // Send notification email (non-blocking)
    sendNotificationEmail(data).catch(console.error);

    return new Response(
      JSON.stringify({ success: true, message: "Application submitted successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Application submission error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
