import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Plus, Edit, Trash2, Folder, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
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
  DialogClose,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import { Category, Tag as TagType } from '@/types/blog';

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  slug: z.string().min(1, { message: 'Le slug est requis' }),
  description: z.string().optional(),
});

const tagSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  slug: z.string().min(1, { message: 'Le slug est requis' }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;
type TagFormValues = z.infer<typeof tagSchema>;

const AdminCategories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const { categories, loading: categoriesLoading, createCategory, updateCategory, deleteCategory } = useCategories();
  const { tags, loading: tagsLoading, createTag, updateTag, deleteTag } = useTags();
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTag, setSelectedTag] = useState<TagType | null>(null);
  const [dialogType, setDialogType] = useState<'add' | 'edit'>('add');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');

  const categoryForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
    },
  });

  const tagForm = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-blog');
      return;
    }

    // Once all data is loaded
    setIsLoading(categoriesLoading || tagsLoading);
  }, [categoriesLoading, tagsLoading, isAdmin, navigate]);

  const generateSlug = (name: string) => {
    if (!name) return '';
    
    // Create slug from name
    return name
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^\w\s]/gi, '')  // Remove special chars
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
      .trim();
  };

  const handleCategoryEdit = (category: Category) => {
    setSelectedCategory(category);
    categoryForm.reset({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    setDialogType('edit');
    setIsOpen(true);
  };

  const handleTagEdit = (tag: TagType) => {
    setSelectedTag(tag);
    tagForm.reset({
      name: tag.name,
      slug: tag.slug,
    });
    setDialogType('edit');
    setIsOpen(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    categoryForm.reset({
      name: '',
      slug: '',
      description: '',
    });
    setDialogType('add');
    setIsOpen(true);
  };

  const handleAddTag = () => {
    setSelectedTag(null);
    tagForm.reset({
      name: '',
      slug: '',
    });
    setDialogType('add');
    setIsOpen(true);
  };

  const onSubmitCategory = async (values: CategoryFormValues) => {
    try {
      if (dialogType === 'edit' && selectedCategory) {
        // Update existing category
        await updateCategory(selectedCategory.id, values);
        
        toast({
          title: 'Succès',
          description: 'Catégorie mise à jour avec succès',
        });
      } else {
        // Add new category - ensure name is required
        const categoryToCreate = {
          name: values.name,
          slug: values.slug,
          description: values.description,
        };
        
        await createCategory(categoryToCreate);
        
        toast({
          title: 'Succès',
          description: 'Nouvelle catégorie ajoutée avec succès',
        });
      }
      
      // Close dialog and reset form
      setIsOpen(false);
      categoryForm.reset();
    } catch (error: any) {
      console.error('Error saving category:', error.message);
      toast({
        title: 'Erreur',
        description: `Une erreur s'est produite: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const onSubmitTag = async (values: TagFormValues) => {
    try {
      if (dialogType === 'edit' && selectedTag) {
        // Update existing tag
        await updateTag(selectedTag.id, values);
        
        toast({
          title: 'Succès',
          description: 'Tag mis à jour avec succès',
        });
      } else {
        // Add new tag - ensure name is required
        const tagToCreate = {
          name: values.name,
          slug: values.slug,
        };
        
        await createTag(tagToCreate);
        
        toast({
          title: 'Succès',
          description: 'Nouveau tag ajouté avec succès',
        });
      }
      
      // Close dialog and reset form
      setIsOpen(false);
      tagForm.reset();
    } catch (error: any) {
      console.error('Error saving tag:', error.message);
      toast({
        title: 'Erreur',
        description: `Une erreur s'est produite: ${error.message}`,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const success = await deleteCategory(id);
    
    if (success) {
      toast({
        title: 'Catégorie supprimée',
        description: 'La catégorie a été supprimée avec succès',
      });
    }
  };

  const handleDeleteTag = async (id: string) => {
    const success = await deleteTag(id);
    
    if (success) {
      toast({
        title: 'Tag supprimé',
        description: 'Le tag a été supprimé avec succès',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des catégories et tags | NovaHypnose Blog Admin</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin-blog/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <h1 className="text-3xl font-serif font-bold">
              Catégories & Tags
            </h1>
          </div>
        </div>
        
        <Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="categories" className="flex items-center">
              <Folder className="mr-2 h-4 w-4" />
              Catégories
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Catégories</CardTitle>
                  <CardDescription>
                    Gérez les catégories principales de votre blog
                  </CardDescription>
                </div>
                <Button onClick={handleAddCategory}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une catégorie
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                    <p className="mt-4 text-sm text-muted-foreground">Chargement des catégories...</p>
                  </div>
                ) : categories.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleCategoryEdit(category)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteCategory(category.id)}
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
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Folder className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">Aucune catégorie</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Commencez par ajouter une catégorie à votre blog
                    </p>
                    <Button onClick={handleAddCategory} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter une catégorie
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Category Dialog */}
            <Dialog open={isOpen && activeTab === 'categories'} onOpenChange={setIsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {dialogType === 'add' ? 'Ajouter une catégorie' : 'Modifier la catégorie'}
                  </DialogTitle>
                  <DialogDescription>
                    {dialogType === 'add' 
                      ? 'Créer une nouvelle catégorie pour votre blog' 
                      : 'Modifier les détails de la catégorie'}
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...categoryForm}>
                  <form onSubmit={categoryForm.handleSubmit(onSubmitCategory)} className="space-y-6">
                    <FormField
                      control={categoryForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nom de la catégorie" 
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (dialogType === 'add') {
                                  categoryForm.setValue('slug', generateSlug(e.target.value));
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={categoryForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug (URL)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-grow">
                              <Input 
                                placeholder="slug-de-categorie"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const name = categoryForm.getValues('name');
                                categoryForm.setValue('slug', generateSlug(name));
                              }}
                            >
                              Générer
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={categoryForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optionnel)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Description de la catégorie"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button type="submit">
                        {dialogType === 'add' ? 'Ajouter' : 'Enregistrer'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </TabsContent>
          
          <TabsContent value="tags">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>
                    Gérez les étiquettes (tags) de votre blog
                  </CardDescription>
                </div>
                <Button onClick={handleAddTag}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un tag
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                    <p className="mt-4 text-sm text-muted-foreground">Chargement des tags...</p>
                  </div>
                ) : tags.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tags.map((tag) => (
                        <TableRow key={tag.id}>
                          <TableCell className="font-medium">{tag.name}</TableCell>
                          <TableCell className="font-mono text-sm">{tag.slug}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleTagEdit(tag)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer ce tag ? Cette action est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteTag(tag.id)}
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
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Tag className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">Aucun tag</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Commencez par ajouter un tag à votre blog
                    </p>
                    <Button onClick={handleAddTag} className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter un tag
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Tag Dialog */}
            <Dialog open={isOpen && activeTab === 'tags'} onOpenChange={setIsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {dialogType === 'add' ? 'Ajouter un tag' : 'Modifier le tag'}
                  </DialogTitle>
                  <DialogDescription>
                    {dialogType === 'add' 
                      ? 'Créer une nouvelle étiquette pour votre blog' 
                      : 'Modifier les détails du tag'}
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...tagForm}>
                  <form onSubmit={tagForm.handleSubmit(onSubmitTag)} className="space-y-6">
                    <FormField
                      control={tagForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nom du tag" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                if (dialogType === 'add') {
                                  tagForm.setValue('slug', generateSlug(e.target.value));
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={tagForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug (URL)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-grow">
                              <Input 
                                placeholder="slug-de-tag"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                const name = tagForm.getValues('name');
                                tagForm.setValue('slug', generateSlug(name));
                              }}
                            >
                              Générer
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button type="submit">
                        {dialogType === 'add' ? 'Ajouter' : 'Enregistrer'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminCategories;
