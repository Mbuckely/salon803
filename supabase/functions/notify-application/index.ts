import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import notificationapi from 'npm:notificationapi-node-server-sdk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, availability, social, about, resumeUrl, submittedAt } = await req.json();

    // Initialize NotificationAPI SDK
    const CLIENT_ID = Deno.env.get('NOTIFICATIONAPI_CLIENT_ID');
    const CLIENT_SECRET = Deno.env.get('NOTIFICATIONAPI_CLIENT_SECRET');
    const OWNER_EMAIL = Deno.env.get('OWNER_EMAIL') || 'marquisebuckley@gmail.com';

    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error('Missing NotificationAPI credentials');
      return new Response(JSON.stringify({ success: false, error: 'Missing NotificationAPI credentials' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    notificationapi.init(
      CLIENT_ID,
      CLIENT_SECRET
    );

    console.log('Sending notification for application from:', email);
    
    // Build email HTML
    const emailHtml = `
      <h2>New Job Application - Salon 803</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Availability:</strong> ${availability || 'Not provided'}</p>
      <p><strong>Social Media:</strong> ${social || 'Not provided'}</p>
      <p><strong>About:</strong> ${about || 'Not provided'}</p>
      ${resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeUrl}">View Resume</a></p>` : ''}
      <p><strong>Submitted At:</strong> ${submittedAt || new Date().toISOString()}</p>
    `;
    
    // Send notification to owner
    const ownerResponse = await notificationapi.send({
      type: 'salon803',
      to: {
        id: OWNER_EMAIL,
        email: OWNER_EMAIL
      },
      email: {
        subject: `New Job Application from ${fullName}`,
        html: emailHtml
      }
    });

    console.log('Owner notification sent successfully:', ownerResponse.data);

    // Send thank you email to applicant
    const thankYouHtml = `
      <h2>Thank you for your application — Salon 803 Team</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for applying to join our team at Salon 803. We have received your application and will review it shortly.</p>
      <p>We appreciate your interest in working with us and will be in touch soon.</p>
      <p>Best regards,<br>The Salon 803 Team</p>
    `;

    const applicantResponse = await notificationapi.send({
      type: 'salon803',
      to: {
        id: email,
        email: email
      },
      email: {
        subject: 'Thank you for your application — Salon 803 Team',
        html: thankYouHtml
      }
    });

    console.log('Applicant thank you email sent successfully:', applicantResponse.data);
    return new Response(JSON.stringify({ success: true, owner: ownerResponse.data, applicant: applicantResponse.data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
});
