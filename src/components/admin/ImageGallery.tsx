
import { useState, useEffect } from 'react';
import { useImages } from '@/hooks/blog/useImages';
import { useImageUpload } from '@/hooks/blog/useImageUpload';
import { BlogImage } from '@/types/blog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (imageUrl: string, alt?: string) => void;
}

export default function ImageGallery({ open, onOpenChange, onSelectImage }: ImageGalleryProps) {
  const { images, fetchImages, deleteImage, loading } = useImages();
  const { uploadImage, uploading } = useImageUpload();
  const [selectedImage, setSelectedImage] = useState<BlogImage | null>(null);
  const [altText, setAltText] = useState('');
  
  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const uploadedImage = await uploadImage(file);
    
    if (uploadedImage) {
      setSelectedImage(uploadedImage);
      fetchImages(); // Rafraîchir la galerie
    }
  };

  const handleSelectImage = () => {
    if (selectedImage) {
      onSelectImage(selectedImage.public_url, altText);
      onOpenChange(false);
    }
  };

  const handleDeleteImage = async (image: BlogImage) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'image "${image.name}" ?`)) {
      const success = await deleteImage(image.id, image.storage_path);
      if (success && selectedImage?.id === image.id) {
        setSelectedImage(null);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Galerie d'images</DialogTitle>
          <DialogDescription>
            Sélectionnez une image ou téléversez-en une nouvelle
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="flex gap-4 items-center">
            <Label 
              htmlFor="image-upload" 
              className="flex-1 cursor-pointer border-2 border-dashed p-4 text-center rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex flex-col items-center gap-1">
                <Upload className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <span>Cliquez pour téléverser une image</span>
                <span className="text-xs text-muted-foreground">JPG, PNG, GIF, WebP (max 10Mo)</span>
              </div>
              <Input 
                id="image-upload" 
                type="file" 
                accept="image/*"
                className="sr-only" 
                onChange={handleUpload} 
                disabled={uploading}
              />
            </Label>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {images.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" aria-hidden="true" />
                <p>Aucune image disponible</p>
                <p className="text-sm">Téléversez votre première image</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                {images.map((image) => (
                  <div 
                    key={image.id}
                    className={`relative group aspect-square border rounded-md overflow-hidden ${
                      selectedImage?.id === image.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image.public_url} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image);
                        }}
                      >
                        <Trash className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {selectedImage && (
          <div className="border rounded-md p-4 mt-4">
            <h3 className="font-semibold mb-2">Image sélectionnée: {selectedImage.name}</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 h-24 w-24 overflow-hidden rounded-md">
                <img 
                  src={selectedImage.public_url} 
                  alt={selectedImage.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="space-y-2">
                  <Label htmlFor="alt-text">Texte alternatif</Label>
                  <Input 
                    id="alt-text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Description de l'image pour l'accessibilité"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSelectImage} disabled={!selectedImage}>
            Insérer l'image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
