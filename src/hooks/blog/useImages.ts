
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BlogImage, PaginationState } from '@/types/blog';

export function useImages(initialPagination?: Partial<PaginationState>) {
  const { toast } = useToast();
  const [images, setImages] = useState<BlogImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPagination?.page || 1,
    pageSize: initialPagination?.pageSize || 20,
    total: initialPagination?.total || 0,
  });

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data: imageRecords, error, count } = await supabase
        .from('images')
        .select('*', { count: 'exact' })
        .order('uploaded_at', { ascending: false })
        .range(
          (pagination.page - 1) * pagination.pageSize,
          pagination.page * pagination.pageSize - 1
        );

      if (error) throw error;
      
      setImages(imageRecords as BlogImage[]);
      setPagination({ ...pagination, total: count || 0 });
    } catch (error: any) {
      console.error('Error fetching images:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les images',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, name?: string, description?: string) => {
    try {
      // 1. Upload file to storage
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = `${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error("Couldn't get public URL");
      }

      // 3. Create entry in images table
      const imageData: any = {
        name: name || file.name,
        description: description,
        storage_path: filePath,
        public_url: urlData.publicUrl,
        size: file.size,
        mime_type: file.type,
      };

      // If it's an image, try to get dimensions
      if (file.type.startsWith('image/')) {
        try {
          const dimensions = await getImageDimensions(file);
          imageData.width = dimensions.width;
          imageData.height = dimensions.height;
        } catch (err) {
          console.warn('Could not get image dimensions:', err);
        }
      }

      const { data: imageRecord, error: dbError } = await supabase
        .from('images')
        .insert(imageData)
        .select()
        .single();

      if (dbError) throw dbError;

      await fetchImages(); // Refresh the list
      return imageRecord as BlogImage;
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de téléverser l'image: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteImage = async (imageId: string, storagePath: string) => {
    try {
      // 1. Delete from storage
      const { error: storageError } = await supabase.storage
        .from('blog_images')
        .remove([storagePath]);
      
      if (storageError) throw storageError;

      // 2. Delete from images table
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      await fetchImages(); // Refresh the list
      return true;
    } catch (error: any) {
      console.error('Error deleting image:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer l'image: ${error.message}`,
        variant: 'destructive',
      });
      return false;
    }
  };

  const changePage = (page: number) => {
    setPagination({ ...pagination, page });
    fetchImages();
  };

  const changePageSize = (pageSize: number) => {
    setPagination({ ...pagination, pageSize, page: 1 });
    fetchImages();
  };

  // Utility function to get image dimensions
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
