import { createClient } from "@/lib/supabase/client";

/**
 * Uploads a file to the specified Supabase bucket.
 * Automatically handles public URL generation.
 */
export async function uploadSpecimenImage(file: File, treeId: string) {
  const supabase = createClient();
  const filePath = `specimens/${treeId}/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("vriksh-rakshak-assets") // bucket name
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("STORAGE_UPLINK_FAILURE:", error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from("vriksh-rakshak-assets")
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteSpecimenImage(filePath: string) {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("vriksh-rakshak-assets")
    .remove([filePath]);

  if (error) {
    console.error("STORAGE_PURGE_FAILURE:", error);
    return false;
  }
  return true;
}
