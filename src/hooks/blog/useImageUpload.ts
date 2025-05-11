
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { BlogImage } from '@/types/blog';

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File): Promise<BlogImage | null> => {
    try {
      setUploading(true);

      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const storagePath = `images/${fileName}`;

      // Téléverser l'image vers le stockage Supabase
      const { error: uploadError } = await supabaseBlog.storage
        .from('bloghypnose')
        .upload(storagePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obtenir l'URL publique
      const { data: publicURL } = supabaseBlog.storage
        .from('bloghypnose')
        .getPublicUrl(storagePath);

      if (!publicURL) {
        throw new Error('Impossible d\'obtenir l\'URL publique');
      }

      // Obtenir les métadonnées de l'image
      let width, height;
      try {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve) => {
          img.onload = () => {
            width = img.width;
            height = img.height;
            resolve(null);
          };
        });
      } catch (error) {
        console.warn('Impossible d\'obtenir les dimensions de l\'image:', error);
      }

      // Enregistrer les métadonnées de l'image dans la base de données
      const { data, error: dbError } = await supabaseBlog
        .from('bloghypnose_images')
        .insert({
          filename: file.name,
          storage_path: storagePath,
          public_url: publicURL.publicUrl,
          alt_text: '', // À remplir plus tard
          width,
          height,
          size_bytes: file.size,
          mime_type: file.type,
          uploaded_by_user_id: (await supabaseBlog.auth.getUser()).data.user?.id || '',
        })
        .select('*')
        .single();

      if (dbError) {
        throw dbError;
      }

      return {
        id: data.id,
        name: data.filename,
        url: data.public_url,
        storage_path: data.storage_path,
        public_url: data.public_url,
        size: data.size_bytes,
        created_at: data.created_at,
        width: data.width,
        height: data.height
      };
    } catch (error) {
      console.error('Erreur lors du téléversement de l\'image:', error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadImage,
    uploading,
  };
}
