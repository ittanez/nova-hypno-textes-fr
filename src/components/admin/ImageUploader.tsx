
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, ImagePlus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string | null;
}

const ImageUploader = ({ onImageUploaded, currentImage }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes('image/')) {
      toast({
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner une image (jpg, png, gif, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5 Mo",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a mock upload process (in a real app, this would be an API call)
      // For demo purposes, we'll use FileReader to create a data URL
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageUploaded(result);
        
        setIsUploading(false);
        toast({
          title: "Image téléchargée",
          description: "L'image a été téléchargée avec succès",
        });
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur s'est produite lors du téléchargement de l'image",
        variant: "destructive"
      });
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button 
          type="button" 
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          {isUploading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
              Téléchargement...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Télécharger une image
            </>
          )}
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      {/* Image preview */}
      <div className="mt-4 border rounded-md p-4 bg-muted/20">
        {preview ? (
          <div className="relative aspect-video">
            <img
              src={preview}
              alt="Aperçu de l'image"
              className="w-full h-full object-cover rounded"
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-muted rounded">
            <div className="text-center text-muted-foreground">
              <ImagePlus className="mx-auto h-10 w-10 opacity-50" />
              <p className="mt-2">Aucune image sélectionnée</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
