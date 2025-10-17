import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

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
    const { fullName, email, phone } = await req.json();

    const clientId = Deno.env.get('NOTIFICATIONAPI_CLIENT_ID') as string;
    const clientSecret = Deno.env.get('NOTIFICATIONAPI_CLIENT_SECRET') as string;

    console.log('Sending notification for application from:', email);
    
    // Call NotificationAPI REST API
    const response = await fetch('https://api.notificationapi.com/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: JSON.stringify({
        type: 'salon803',
        to: {
          id: 'marquisebuckley@gmail.com',
          email: 'marquisebuckley@gmail.com'
        },
        email: {
          subject: `New Application from ${fullName}`,
          html: `
            <h2>New Job Application Received</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p>View full application details in your backend.</p>
          `
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NotificationAPI error: ${response.status} - ${errorText}`);
    }

    console.log('Notification sent successfully');
    return new Response(JSON.stringify({ success: true }), {
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
