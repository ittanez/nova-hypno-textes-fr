
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '@/hooks/blog/useCategories';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const BlogCategoryList = () => {
  const { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategories();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<{id: string, name: string, slug: string, description: string}|null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<{id: string, name: string}|null>(null);
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Générer un slug à partir du nom (pour la création et l'édition)
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Gestionnaire de changement de nom pour la création
  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewCategoryName(name);
    setNewCategorySlug(generateSlug(name));
  };

  // Gestionnaire de changement de nom pour l'édition
  const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCategoryToEdit(prev => prev ? {...prev, name, slug: generateSlug(name)} : null);
  };

  // Créer une nouvelle catégorie
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez spécifier un nom pour la catégorie",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { success, error } = await createCategory({
        name: newCategoryName.trim(),
        slug: newCategorySlug.trim() || generateSlug(newCategoryName.trim()),
        description: newCategoryDescription.trim()
      });

      if (success) {
        toast({
          title: "Catégorie créée",
          description: `La catégorie ${newCategoryName} a été créée avec succès`
        });
        setIsCreateDialogOpen(false);
        setNewCategoryName('');
        setNewCategorySlug('');
        setNewCategoryDescription('');
      } else {
        throw new Error(error);
      }
    } catch (err: any) {
      console.error("Erreur lors de la création de la catégorie:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la création de la catégorie",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mettre à jour une catégorie
  const handleUpdateCategory = async () => {
    if (!categoryToEdit || !categoryToEdit.name.trim()) {
      toast({
        title: "Erreur",
        description: "Données de catégorie invalides",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { success, error } = await updateCategory(categoryToEdit.id, {
        name: categoryToEdit.name.trim(),
        slug: categoryToEdit.slug.trim() || generateSlug(categoryToEdit.name.trim()),
        description: categoryToEdit.description.trim()
      });

      if (success) {
        toast({
          title: "Catégorie mise à jour",
          description: `La catégorie ${categoryToEdit.name} a été mise à jour avec succès`
        });
        setIsEditDialogOpen(false);
        setCategoryToEdit(null);
      } else {
        throw new Error(error);
      }
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour de la catégorie:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la mise à jour de la catégorie",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supprimer une catégorie
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    setIsSubmitting(true);
    
    try {
      const { success, error } = await deleteCategory(categoryToDelete.id);

      if (success) {
        toast({
          title: "Catégorie supprimée",
          description: `La catégorie ${categoryToDelete.name} a été supprimée avec succès`
        });
        setIsDeleteDialogOpen(false);
        setCategoryToDelete(null);
      } else {
        throw new Error(error);
      }
    } catch (err: any) {
      console.error("Erreur lors de la suppression de la catégorie:", err);
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue lors de la suppression de la catégorie",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestion des catégories | BlogHypnose</title>
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Catégories</h1>
            <p className="text-muted-foreground">Gestion des catégories du blog</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle catégorie
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-muted rounded-md p-8 text-center">
            <p className="text-muted-foreground mb-4">Aucune catégorie n'a été créée</p>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer une catégorie
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-md shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {category.description || <span className="text-muted-foreground italic">Pas de description</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCategoryToEdit({
                              id: category.id,
                              name: category.name,
                              slug: category.slug,
                              description: category.description || ''
                            });
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setCategoryToDelete({id: category.id, name: category.name});
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Dialogue de création de catégorie */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle catégorie à votre blog
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                placeholder="Nom de la catégorie"
                value={newCategoryName}
                onChange={handleNewNameChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="slug-de-la-categorie"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Le slug est utilisé dans les URL et est généré automatiquement
                à partir du nom. Vous pouvez le personnaliser si nécessaire.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description de la catégorie"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleCreateCategory}
              disabled={isSubmitting || !newCategoryName.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue d'édition de catégorie */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la catégorie
            </DialogDescription>
          </DialogHeader>
          {categoryToEdit && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom *</Label>
                <Input
                  id="edit-name"
                  placeholder="Nom de la catégorie"
                  value={categoryToEdit.name}
                  onChange={handleEditNameChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  placeholder="slug-de-la-categorie"
                  value={categoryToEdit.slug}
                  onChange={(e) => setCategoryToEdit({...categoryToEdit, slug: e.target.value})}
                />
                <p className="text-xs text-muted-foreground">
                  Le slug est utilisé dans les URL. Modifiez-le avec précaution.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Description de la catégorie"
                  value={categoryToEdit.description}
                  onChange={(e) => setCategoryToEdit({...categoryToEdit, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleUpdateCategory}
              disabled={isSubmitting || !categoryToEdit?.name.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Mettre à jour"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de confirmation de suppression */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La catégorie "{categoryToDelete?.name}" sera définitivement supprimée.
              Les articles associés à cette catégorie ne seront pas supprimés, mais ils perdront cette catégorie.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BlogCategoryList;
