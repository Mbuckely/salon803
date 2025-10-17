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
    
    // Send notification to owner using template
    const ownerResponse = await notificationapi.send({
      notificationId: 'salon803_owner_notification',
      user: {
        id: OWNER_EMAIL,
        email: OWNER_EMAIL
      },
      mergeTags: {
        fullName: fullName,
        email: email,
        phone: phone || 'Not provided',
        availability: availability || 'Not provided',
        social: social || 'Not provided',
        about: about || 'Not provided',
        resumeUrl: resumeUrl || 'No resume uploaded',
        submittedAt: submittedAt || new Date().toISOString()
      }
    });

    console.log('Owner notification sent successfully:', ownerResponse.data);

    // Send thank you email to applicant using template
    const applicantResponse = await notificationapi.send({
      notificationId: 'salon803_applicant_thankyou',
      user: {
        id: email,
        email: email
      },
      mergeTags: {
        fullName: fullName
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
