
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useImages } from '@/hooks/blog/useImages';
import { BlogImage } from '@/types/blog';
import { Loader2, RefreshCcw, Trash2, Upload, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MediaLibraryProps {
  onImageSelect?: (imageUrl: string) => void;
  buttonText?: string;
}

export default function MediaLibrary({ onImageSelect, buttonText = "Ouvrir la bibliothèque" }: MediaLibraryProps) {
  const { toast } = useToast();
  const { images, loading, fetchImages, uploadImage, deleteImage } = useImages();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, refreshTrigger]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadName(file.name.split('.')[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier à téléverser",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const result = await uploadImage(selectedFile, uploadName, uploadDescription);
      if (result) {
        toast({
          title: "Téléversement réussi",
          description: "L'image a été ajoutée à la bibliothèque"
        });
        setSelectedFile(null);
        setUploadName('');
        setUploadDescription('');
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.error("Erreur lors du téléversement:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: BlogImage) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
      const success = await deleteImage(image.id, image.storage_path);
      if (success) {
        toast({
          title: "Image supprimée",
          description: "L'image a été supprimée avec succès"
        });
      }
    }
  };

  const handleImageSelect = (image: BlogImage) => {
    if (onImageSelect) {
      onImageSelect(image.public_url);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ImageIcon className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Bibliothèque Média</DialogTitle>
          <DialogDescription>
            Gérez vos images et sélectionnez-en une pour votre article
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Galerie d'images</TabsTrigger>
            <TabsTrigger value="upload">Téléverser</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="space-y-4">
            <div className="flex items-center justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fetchImages()}
                disabled={loading}
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Rafraîchir
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : images.length > 0 ? (
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                      <div 
                        className="relative aspect-square cursor-pointer"
                        onClick={() => handleImageSelect(image)}
                      >
                        <img 
                          src={image.public_url} 
                          alt={image.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6 rounded-full opacity-70 hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(image);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <CardFooter className="px-3 py-2 flex justify-between">
                        <div className="truncate text-xs">
                          {image.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {image.width}x{image.height}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground opacity-30 mb-4" />
                <p className="text-muted-foreground">Aucune image trouvée. Téléversez votre première image.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Téléverser une nouvelle image</CardTitle>
                <CardDescription>
                  Sélectionnez un fichier image à ajouter à votre bibliothèque
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="file">Fichier</Label>
                    <Input 
                      id="file" 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </div>
                  
                  {selectedFile && (
                    <>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input 
                          id="name" 
                          value={uploadName}
                          onChange={(e) => setUploadName(e.target.value)}
                          disabled={uploading}
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="description">Description (optionnel)</Label>
                        <Input 
                          id="description" 
                          value={uploadDescription}
                          onChange={(e) => setUploadDescription(e.target.value)}
                          disabled={uploading}
                        />
                      </div>
                      
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm font-medium mb-1">Aperçu du fichier</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Nom: {selectedFile.name}</p>
                          <p>Type: {selectedFile.type}</p>
                          <p>Taille: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleUpload}
                  disabled={!selectedFile || uploading}
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Téléversement en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Téléverser l'image
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-between flex flex-row sm:space-x-2">
          <Button 
            variant="secondary" 
            onClick={() => setOpen(false)} 
            className="flex-1"
          >
            Fermer
          </Button>
          
          {onImageSelect && (
            <Button 
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={loading}
              variant="default"
            >
              Annuler
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
