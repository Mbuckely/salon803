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
    notificationapi.init(
      'tperykf9p25g8q8h6nxxhacz4h',
      '63iotd0a5e7ml2e1a4rb0n4ccts5o23cepx1xm455veoo94m02y8743fm8'
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
    
    // Send notification using SDK
    const response = await notificationapi.send({
      type: 'salon803',
      to: {
        id: 'marquisebuckley@gmail.com',
        email: 'marquisebuckley@gmail.com'
      },
      email: {
        subject: `New Job Application from ${fullName}`,
        html: emailHtml
      }
    });

    console.log('Notification sent successfully:', response.data);
    return new Response(JSON.stringify({ success: true, data: response.data }), {
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
