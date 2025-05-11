
import { useState, useCallback } from 'react';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { BlogImage } from '@/types/blog';

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
      }));

      setImages(formattedImages);
    } catch (error) {
      console.error('Erreur lors du chargement des images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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
    deleteImage
  };
}
