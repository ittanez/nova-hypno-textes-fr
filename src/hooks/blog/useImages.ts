
import { useState, useCallback } from 'react';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { BlogImage } from '@/types/blog';
import { v4 as uuidv4 } from 'uuid';

export function useImages() {
  const [images, setImages] = useState<BlogImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Récupérer toutes les images
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseBlog
        .from('bloghypnose_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      const formattedImages = data.map(img => ({
        id: img.id,
        name: img.filename,
        url: img.public_url,
        storage_path: img.storage_path,
        public_url: img.public_url,
        size: img.size_bytes,
        created_at: img.created_at,
        width: img.width,
        height: img.height,
      }));

      setImages(formattedImages);
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Téléverser une image
  const uploadImage = async (file: File, name?: string, description?: string): Promise<BlogImage | null> => {
    try {
      setLoading(true);

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
        await new Promise<void>((resolve) => {
          img.onload = () => {
            width = img.width;
            height = img.height;
            resolve();
          };
        });
      } catch (error) {
        console.warn('Impossible d\'obtenir les dimensions de l\'image:', error);
      }

      // Enregistrer les métadonnées de l'image dans la base de données
      const { data, error: dbError } = await supabaseBlog
        .from('bloghypnose_images')
        .insert({
          filename: name || file.name,
          storage_path: storagePath,
          public_url: publicURL.publicUrl,
          alt_text: description || '',
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

      const newImage: BlogImage = {
        id: data.id,
        name: data.filename,
        url: data.public_url,
        storage_path: data.storage_path,
        public_url: data.public_url,
        size: data.size_bytes,
        created_at: data.created_at,
        width: data.width,
        height: data.height,
      };

      setImages(prev => [newImage, ...prev]);
      return newImage;
    } catch (error) {
      console.error('Erreur lors du téléversement de l\'image:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Supprimer une image
  const deleteImage = async (id: string, storagePath: string): Promise<boolean> => {
    try {
      // Supprimer d'abord de la base de données
      const { error: dbError } = await supabaseBlog
        .from('bloghypnose_images')
        .delete()
        .eq('id', id);

      if (dbError) {
        throw dbError;
      }

      // Puis supprimer du stockage
      const { error: storageError } = await supabaseBlog.storage
        .from('bloghypnose')
        .remove([storagePath]);

      if (storageError) {
        throw storageError;
      }

      // Mettre à jour la liste locale
      setImages(images.filter(img => img.id !== id));
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image:', error);
      return false;
    }
  };

  return {
    images,
    loading,
    fetchImages,
    deleteImage,
    uploadImage
  };
}
