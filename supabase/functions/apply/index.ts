// supabase/functions/apply/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl  = Deno.env.get("SUPABASE_URL")!;
const serviceKey   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ownerEmail   = Deno.env.get("OWNER_EMAIL")!;      // you@example.com
const resendApiKey = Deno.env.get("RESEND_API_KEY")!;   // from https://resend.com

const sb = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

function cors(res: Response) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "authorization, x-client-info, apikey, content-type");
  return res;
}
function escape(s: string) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]!));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return cors(new Response("ok"));
  if (req.method !== "POST")   return cors(new Response("Method not allowed", { status: 405 }));

  try {
    const form = await req.formData();

    // Honeypot
    if (String(form.get("website") || "").trim() !== "") {
      return cors(new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" }}));
    }

    const fullName     = String(form.get("fullName") || "");
    const email        = String(form.get("email") || "");
    const phone        = String(form.get("phone") || "");
    const availability = String(form.get("availability") || "");
    const social       = String(form.get("social") || "");
    const message      = String(form.get("message") || "");
    const file         = form.get("resumeFile") as File | null;

    console.log("Processing application from:", fullName, email);

    // 1) Upload PDF to private storage
    let resumePath: string | null = null;
    if (file && file.size > 0) {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        return cors(new Response(JSON.stringify({ ok:false, error:"Only PDF allowed" }), { status:400, headers:{ "Content-Type":"application/json" }}));
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      const filename = `${crypto.randomUUID()}.pdf`;
      console.log("Uploading resume:", filename);
      const up = await sb.storage.from("applications").upload(`resumes/${filename}`, bytes, {
        contentType: "application/pdf", upsert: false,
      });
      if (up.error) {
        console.error("Storage upload error:", up.error);
        throw up.error;
      }
      resumePath = up.data.path; // e.g., resumes/<uuid>.pdf
      console.log("Resume uploaded successfully:", resumePath);
    }

    // 2) Insert DB row
    console.log("Inserting application to database");
    const ins = await sb.from("applications").insert({
      full_name: fullName, email, phone, availability, social, message, resume_path: resumePath
    }).select("id").single();
    if (ins.error) {
      console.error("Database insert error:", ins.error);
      throw ins.error;
    }
    console.log("Application inserted with ID:", ins.data.id);

    // 3) Email YOU (owner)
    const ownerHtml = `
      <h3>New application</h3>
      <p><b>Name:</b> ${escape(fullName)}<br>
         <b>Email:</b> ${escape(email)}<br>
         <b>Phone:</b> ${escape(phone)}<br>
         <b>Availability:</b> ${escape(availability)}<br>
         <b>Social:</b> ${escape(social)}</p>
      <p><b>Message:</b><br>${escape(message).replace(/\n/g,"<br>")}</p>
      <p><b>Resume path:</b> ${resumePath ? escape(resumePath) : "none uploaded"}</p>
    `;
    console.log("Sending notification email to owner");
    const ownerEmailResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Salon 803 <no-reply@yourdomain.com>",
        to: [ownerEmail],
        subject: `New application – ${fullName || "Unknown"}`,
        html: ownerHtml
      })
    });
    if (!ownerEmailResp.ok) {
      console.error("Owner email failed:", await ownerEmailResp.text());
    }

    // 4) Auto-reply to APPLICANT
    if (email) {
      console.log("Sending confirmation email to applicant");
      const applicantEmailResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Salon 803 <no-reply@yourdomain.com>",
          to: [email],
          subject: "We received your application",
          html: `<p>Thanks for applying to Salon 803${fullName ? ", " + escape(fullName) : ""}! We've received your application and will be in touch soon.</p>`
        })
      });
      if (!applicantEmailResp.ok) {
        console.error("Applicant email failed:", await applicantEmailResp.text());
      }
    }

    console.log("Application processed successfully");
    return cors(new Response(JSON.stringify({ ok:true }), { headers: { "Content-Type":"application/json" }}));
  } catch (e) {
    console.error("Application processing error:", e);
    return cors(new Response(JSON.stringify({ ok:false, error:String(e) }), {
      status: 500, headers: { "Content-Type":"application/json" }
    }));
  }
});
