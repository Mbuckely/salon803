-- Make applications bucket public so resume URLs work in emails
UPDATE storage.buckets 
SET public = true 
WHERE id = 'applications';