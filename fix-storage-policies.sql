-- Fix Storage Policies untuk Supabase Storage
-- Run di SQL Editor Supabase

-- Enable storage untuk bucket photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Enable storage untuk bucket documents  
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow authenticated users to upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete photos" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete documents" ON storage.objects;

-- Create storage policies for photos bucket
CREATE POLICY "Allow authenticated upload to photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Allow public read from photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');

CREATE POLICY "Allow authenticated delete from photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'photos');

CREATE POLICY "Allow authenticated update photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'photos');

-- Create storage policies for documents bucket
CREATE POLICY "Allow authenticated upload to documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow public read from documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');

CREATE POLICY "Allow authenticated delete from documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents');

CREATE POLICY "Allow authenticated update documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documents');
