-- Create storage bucket for meal photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('meal-photos', 'meal-photos', false);

-- Set up storage policies for meal photos
CREATE POLICY "Users can upload their own meal photos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'meal-photos' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can view their own meal photos"
    ON storage.objects FOR SELECT
    USING (
        bucket_id = 'meal-photos' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can update their own meal photos"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'meal-photos' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Users can delete their own meal photos"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'meal-photos' AND
        (storage.foldername(name))[1] = auth.uid()::text
    ); 