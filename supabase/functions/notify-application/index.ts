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
      return new Response(JSON.stringify({ success: false, error: 'Missing credentials' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    notificationapi.init(CLIENT_ID, CLIENT_SECRET);

    console.log('Sending notification for application from:', email);
    
    // Send notification to owner
    const response = await notificationapi.send({
      type: 'salon803',
      to: {
        id: OWNER_EMAIL,
        email: OWNER_EMAIL
      },
      parameters: {
        full_name: fullName,
        email: email,
        phone: phone || 'Not provided',
        availability: availability || 'Not provided',
        '#if social': social ? 'true' : '',
        social: social || '',
        '/if': '',
        about: about || 'Not provided',
        '#if resume_url': resumeUrl ? 'true' : '',
        resume_url: resumeUrl || '',
        submitted_at: submittedAt || new Date().toISOString()
      },
      templateId: 'salon803'
    });

    console.log('Notification sent successfully:', response.data);
    
    return new Response(JSON.stringify({ success: true, data: response.data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
});
