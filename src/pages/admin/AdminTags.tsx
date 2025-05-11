
import { useState, useEffect, FormEvent } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/hooks/blog/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Save,
  Tag,
  X,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TagType = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

const initialFormState = {
  name: '',
  slug: '',
};

const AdminTags = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading } = useAuth();

  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [articleCounts, setArticleCounts] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive"
      });
      navigate('/admin-blog');
      return;
    }

    const fetchTags = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tags')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        setTags(data || []);
        
        // Récupérer le nombre d'articles par tag
        const { data: articles } = await supabase
          .from('articles')
          .select('tags');
        
        if (articles) {
          const counts: Record<string, number> = {};
          
          articles.forEach(article => {
            if (article.tags) {
              article.tags.forEach((slug: string) => {
                counts[slug] = (counts[slug] || 0) + 1;
              });
            }
          });
          
          setArticleCounts(counts);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des tags:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les tags",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchTags();
    }
  }, [isAdmin, isLoading, navigate, toast]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      // Génère un slug automatiquement si le slug est vide ou si on est en mode création
      slug: (!prev.slug || !editingId) ? generateSlug(name) : prev.slug
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.slug) {
      toast({
        title: "Champs requis",
        description: "Le nom et le slug sont obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (editingId) {
        // Mise à jour
        const { error } = await supabase
          .from('tags')
          .update({
            name: formData.name,
            slug: formData.slug
          })
          .eq('id', editingId);
        
        if (error) throw error;
        
        setTags(tags.map(tag => 
          tag.id === editingId ? { ...tag, ...formData } : tag
        ));
        
        toast({
          title: "Tag mis à jour",
          description: "Le tag a été modifié avec succès"
        });
      } else {
        // Création
        const { data, error } = await supabase
          .from('tags')
          .insert({
            name: formData.name,
            slug: formData.slug
          })
          .select();
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setTags([...tags, data[0]]);
          
          toast({
            title: "Tag créé",
            description: "Le tag a été créé avec succès"
          });
        }
      }
      
      // Réinitialiser le formulaire
      resetForm();
    } catch (error: any) {
      console.error('Erreur lors de l\'enregistrement:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'enregistrer le tag",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (tag: TagType) => {
    setFormData({
      name: tag.name,
      slug: tag.slug,
    });
    setEditingId(tag.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setTags(tags.filter(tag => tag.id !== id));
      
      toast({
        title: "Tag supprimé",
        description: "Le tag a été supprimé avec succès"
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le tag",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
  };

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading || loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Chargement des tags...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion des tags | Administration NovaHypnose</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin-blog/dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold flex items-center">
              <Tag className="mr-2 h-8 w-8" />
              Gestion des tags
            </h1>
            <p className="text-muted-foreground">
              {tags.length} tag{tags.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire de création/édition */}
          <Card className="lg:col-span-1">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{editingId ? 'Modifier le tag' : 'Ajouter un tag'}</CardTitle>
                <CardDescription>
                  {editingId 
                    ? 'Modifiez les détails du tag existant.' 
                    : 'Créez un nouveau tag pour vos articles.'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Nom du tag"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="slug" className="text-sm font-medium">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="slug-du-tag"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    L'identifiant unique utilisé dans l'URL (généré automatiquement)
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {editingId ? (
                  <>
                    <Button variant="outline" type="button" onClick={resetForm}>
                      <X className="mr-2 h-4 w-4" />
                      Annuler
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Mettre à jour
                    </Button>
                  </>
                ) : (
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter le tag
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
          
          {/* Liste des tags */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Liste des tags</CardTitle>
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Articles</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTags.length > 0 ? (
                      filteredTags.map(tag => (
                        <TableRow key={tag.id}>
                          <TableCell className="font-medium">
                            {tag.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {tag.slug}
                          </TableCell>
                          <TableCell>
                            {articleCounts[tag.slug] || 0}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(tag)}
                              >
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Modifier</span>
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Supprimer</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Êtes-vous sûr de vouloir supprimer ce tag?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      La suppression de ce tag le retirera de tous les articles associés.
                                      Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDelete(tag.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                          {searchTerm ? (
                            <p>Aucun tag ne correspond à votre recherche</p>
                          ) : (
                            <p>Aucun tag n'a encore été créé</p>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTags;
