
// Hook optimisé pour la gestion des images
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabaseBlog } from '@/integrations/supabase/blog-client';

// Type pour les images
export interface BlogImage {
  id: string;
  filename: string;
  storage_path: string;
  public_url: string;
  alt_text?: string | null;
  width?: number | null;
  height?: number | null;
  size_bytes?: number | null;
  mime_type?: string | null;
  uploaded_by_user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ImagePaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export function useBlogImages(initialPagination?: Partial<ImagePaginationState>) {
  const { toast } = useToast();
  const [images, setImages] = useState<BlogImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<ImagePaginationState>({
    page: initialPagination?.page || 1,
    pageSize: initialPagination?.pageSize || 20,
    total: initialPagination?.total || 0,
  });

  // Fonction pour récupérer les images avec pagination
  const fetchImages = async () => {
    setLoading(true);
    try {
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      
      const { data: imageRecords, error, count } = await supabaseBlog
        .from('bloghypnose_images')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      
      setImages(imageRecords as BlogImage[]);
      setPagination({ ...pagination, total: count || 0 });
    } catch (error: any) {
      console.error('Erreur lors du chargement des images:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les images',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour téléverser une image avec compression
  const uploadImage = async (file: File, altText: string = '', compressOptions = { maxWidth: 1200, quality: 0.8 }) => {
    try {
      // Vérifier si le fichier est une image
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Type de fichier non supporté',
          description: 'Veuillez sélectionner un fichier image valide',
          variant: 'destructive',
        });
        return null;
      }

      // Compresser l'image si nécessaire
      const compressedFile = await compressImage(file, compressOptions);
      
      // Générer un nom de fichier unique
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = `blog/${fileName}`;
      
      // Téléverser l'image vers le stockage Supabase
      const { data: uploadData, error: uploadError } = await supabaseBlog.storage
        .from('blog_images')
        .upload(filePath, compressedFile);
      
      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data: urlData } = supabaseBlog.storage
        .from('blog_images')
        .getPublicUrl(filePath);
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error("Impossible d'obtenir l'URL publique");
      }

      // Obtenir les dimensions de l'image
      const dimensions = await getImageDimensions(compressedFile);

      // Créer l'entrée dans la table des images
      const imageData = {
        filename: file.name,
        storage_path: filePath,
        public_url: urlData.publicUrl,
        alt_text: altText,
        width: dimensions.width,
        height: dimensions.height,
        size_bytes: compressedFile.size,
        mime_type: file.type,
        uploaded_by_user_id: (await supabaseBlog.auth.getSession()).data.session?.user.id
      };

      const { data: imageRecord, error: dbError } = await supabaseBlog
        .from('bloghypnose_images')
        .insert(imageData)
        .select()
        .single();

      if (dbError) throw dbError;
      
      // Rafraîchir la liste des images
      await fetchImages();
      
      // Notification de succès
      toast({
        title: 'Image téléversée',
        description: 'L\'image a été téléversée avec succès',
      });
      
      return imageRecord as BlogImage;
    } catch (error: any) {
      console.error('Erreur lors du téléversement de l\'image:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de téléverser l'image: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  // Fonction pour supprimer une image
  const deleteImage = async (imageId: string, storagePath: string) => {
    try {
      // Vérifier si l'image est utilisée dans des articles
      const { data: usedImages, error: checkError } = await supabaseBlog
        .from('bloghypnose_article_images')
        .select('article_id')
        .eq('image_id', imageId);
      
      if (checkError) throw checkError;
      
      // Vérifier également si l'image est utilisée comme image à la une
      const { data: featuredImages, error: featuredCheckError } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('id')
        .eq('featured_image_url', imageId);
      
      if (featuredCheckError) throw featuredCheckError;
      
      // Si l'image est utilisée, empêcher sa suppression
      if ((usedImages && usedImages.length > 0) || (featuredImages && featuredImages.length > 0)) {
        toast({
          title: 'Suppression impossible',
          description: 'Cette image est utilisée dans un ou plusieurs articles',
          variant: 'destructive',
        });
        return false;
      }
      
      // Supprimer l'image du stockage
      const { error: storageError } = await supabaseBlog.storage
        .from('blog_images')
        .remove([storagePath]);
      
      if (storageError) throw storageError;

      // Supprimer l'entrée de la base de données
      const { error: dbError } = await supabaseBlog
        .from('bloghypnose_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      // Rafraîchir la liste des images
      await fetchImages();
      
      // Notification de succès
      toast({
        title: 'Image supprimée',
        description: 'L\'image a été supprimée avec succès',
      });
      
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'image:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer l'image: ${error.message}`,
        variant: 'destructive',
      });
      return false;
    }
  };

  // Fonctions de gestion de la pagination
  const changePage = (page: number) => {
    setPagination({ ...pagination, page });
    fetchImages();
  };

  const changePageSize = (pageSize: number) => {
    setPagination({ ...pagination, pageSize, page: 1 });
    fetchImages();
  };

  // Fonction utilitaire pour comprimer l'image avant téléversement
  const compressImage = async (file: File, options = { maxWidth: 1200, quality: 0.8 }): Promise<File> => {
    return new Promise((resolve) => {
      // Créer un élément d'image pour le redimensionnement
      const img = new Image();
      img.onload = () => {
        // Créer un canvas pour la compression
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Redimensionner si nécessaire
        if (width > options.maxWidth) {
          height = Math.round((height * options.maxWidth) / width);
          width = options.maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Dessiner l'image redimensionnée sur le canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convertir le canvas en blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // Créer un nouveau fichier à partir du blob
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                // En cas d'échec, utiliser le fichier original
                resolve(file);
              }
            },
            file.type,
            options.quality
          );
        } else {
          // En cas d'échec, utiliser le fichier original
          resolve(file);
        }
      };
      
      // En cas d'erreur, utiliser le fichier original
      img.onerror = () => resolve(file);
      
      // Charger l'image
      img.src = URL.createObjectURL(file);
    });
  };

  // Fonction utilitaire pour obtenir les dimensions de l'image
  const getImageDimensions = (file: File): Promise<{width: number, height: number}> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  return {
    images,
    loading,
    pagination,
    fetchImages,
    uploadImage,
    deleteImage,
    changePage,
    changePageSize,
  };
}
