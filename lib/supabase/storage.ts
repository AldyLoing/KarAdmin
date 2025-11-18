import { supabase } from './client';

export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<{ data: { path: string } | null; error: Error | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return { data: null, error };
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { data: { path: publicUrl }, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ error: Error | null }> {
  try {
    const urlPath = new URL(path).pathname;
    const filePath = urlPath.split(`/storage/v1/object/public/${bucket}/`)[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      return { error };
    }

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}
