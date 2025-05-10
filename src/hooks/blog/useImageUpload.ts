
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BlogImage } from '@/types/blog';

export function useImageUpload() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File): Promise<BlogImage | null> => {
    try {
      setUploading(true);
      
      // 1. Valider le fichier
      if (!file || !file.type.startsWith('image/')) {
        toast({
          title: "Erreur",
          description: "Le fichier doit être une image",
          variant: "destructive",
        });
        return null;
      }
      
      // 2. Upload file to storage
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = `${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error("Erreur d'upload:", uploadError);
        throw uploadError;
      }

      // 3. Get public URL
      const { data: urlData } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error("Impossible d'obtenir l'URL publique");
      }

      // 4. Create entry in images table
      const imageData = {
        name: file.name,
        description: '',
        storage_path: filePath,
        public_url: urlData.publicUrl,
        size: file.size,
        mime_type: file.type,
      };

      // Si c'est une image, essayer d'obtenir les dimensions
      if (file.type.startsWith('image/')) {
        try {
          const dimensions = await getImageDimensions(file);
          imageData.width = dimensions.width;
          imageData.height = dimensions.height;
        } catch (err) {
          console.warn("Impossible d'obtenir les dimensions de l'image:", err);
        }
      }

      const { data: imageRecord, error: dbError } = await supabase
        .from('images')
        .insert(imageData)
        .select()
        .single();

      if (dbError) throw dbError;
      
      toast({
        title: "Succès",
        description: "Image téléversée avec succès",
      });
      
      return imageRecord as BlogImage;
    } catch (error: any) {
      console.error("Erreur lors du téléversement de l'image:", error.message);
      toast({
        title: "Erreur",
        description: `Impossible de téléverser l'image: ${error.message}`,
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
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
    uploadImage,
    uploading
  };
}
