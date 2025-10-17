import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import notificationapi from "npm:notificationapi-node-server-sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, availability, social, about, resumeUrl, submittedAt } = await req.json();

    // ✅ Load credentials
    const CLIENT_ID = Deno.env.get("NOTIFICATIONAPI_CLIENT_ID");
    const CLIENT_SECRET = Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET");
    const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") || "marquisebuckley@gmail.com";

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Missing NotificationAPI credentials");
    }

    // ✅ Initialize NotificationAPI
    notificationapi.init(CLIENT_ID, CLIENT_SECRET);

    console.log(`📨 Sending application email for ${fullName}`);

    // ✅ 1. Send Email to Owner — using the NotificationAPI TEMPLATE
    const ownerResponse = await notificationapi.send({
      type: "salon803", // Must match Notification Type
      templateId: "salon803", // Must match the template name in NotificationAPI
      to: {
        id: OWNER_EMAIL,
        email: OWNER_EMAIL,
      },
      parameters: {
        full_name: fullName,
        email,
        phone,
        availability,
        social,
        about,
        resume_url: resumeUrl,
        submitted_at: submittedAt || new Date().toISOString(),
      },
    });

    console.log("✅ Owner notification sent:", ownerResponse.data);

    // ✅ 2. Send Thank-You Email to Applicant (optional)
    try {
      const applicantResponse = await notificationapi.send({
        type: "salon803",
        templateId: "thank_you_email",
        to: {
          id: email,
          email,
        },
        parameters: {
          full_name: fullName,
          email,
        },
      });
      console.log("✅ Applicant email sent:", applicantResponse.data);
    } catch (e) {
      console.warn("⚠️ Skipping applicant email (template may be missing):", e);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
