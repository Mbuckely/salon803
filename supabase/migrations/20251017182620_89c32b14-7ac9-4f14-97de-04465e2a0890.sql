-- Drop the restrictive policy that blocks all inserts
DROP POLICY IF EXISTS "no_client_insert" ON public.applications;

-- Allow anyone to submit applications (public form)
CREATE POLICY "Anyone can submit application" 
ON public.applications 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow service role to view all applications (for admin access)
CREATE POLICY "Service role can view all applications" 
ON public.applications 
FOR SELECT 
TO service_role
USING (true);

-- Storage policies for resume uploads
CREATE POLICY "Anyone can upload resumes" 
ON storage.objects 
FOR INSERT 
TO anon, authenticated
WITH CHECK (bucket_id = 'applications');

CREATE POLICY "Service role can view resumes" 
ON storage.objects 
FOR SELECT 
TO service_role
USING (bucket_id = 'applications');