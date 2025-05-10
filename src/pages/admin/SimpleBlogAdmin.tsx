import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useArticles } from '@/hooks/blog/useArticles';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pencil,
  Trash,
  Eye,
  Plus,
  Check,
  ArrowLeft,
  FileText
} from 'lucide-react';
import ArticleEditor from '@/components/admin/ArticleEditor';
import { generateSummaryAndKeywords } from '@/utils/aiUtils';

// Types pour notre interface
type Article = {
  id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  published: boolean;
  featured: boolean;
  categories: string[];
  tags: string[];
  author?: string;
  created_at?: string;
  updated_at?: string;
  image_url?: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

type Tag = {
  id: string;
  name: string;
  slug: string;
};

type ConfirmDialogState = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmAction: () => void;
};

const SimpleBlogAdmin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { articleId } = useParams<{ articleId: string }>();
  
  // Accéder aux hooks
  const {
    articles,
    loading: articlesLoading,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle
  } = useArticles();
  
  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();
  
  const {
    tags,
    loading: tagsLoading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag
  } = useTags();

  // États pour l'interface
  const [activeTab, setActiveTab] = useState('articles');
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<Article> | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({ name: '', slug: '', description: '' });
  const [newTag, setNewTag] = useState<Partial<Tag>>({ name: '', slug: '' });
  const [generatingAI, setGeneratingAI] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    confirmAction: () => {}
  });

  // Charger les données initiales
  useEffect(() => {
    fetchArticles();
    fetchCategories();
    fetchTags();
  }, []);

  // Gérer la navigation vers l'édition d'un article spécifique
  useEffect(() => {
    if (articleId) {
      loadArticleForEditing(articleId);
      setEditMode(true);
    }
  }, [articleId]);

  // Fonction pour charger un article à éditer
  const loadArticleForEditing = async (id: string) => {
    const article = await getArticle(id);
    if (article) {
      setCurrentArticle(article);
      setActiveTab('editor');
    } else {
      toast({
        title: "Erreur",
        description: "Article introuvable",
        variant: "destructive"
      });
      navigate('/admin-simple');
    }
  };

  // Fonction pour générer le slug à partir d'un titre
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Fonctions pour la gestion des articles
  const handleCreateArticle = () => {
    setCurrentArticle({
      title: '',
      content: '',
      excerpt: '',
      published: false,
      featured: false,
      categories: [],
      tags: []
    });
    setActiveTab('editor');
    setEditMode(false);
  };

  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setActiveTab('editor');
    setEditMode(true);
  };

  const handleSaveArticle = async () => {
    if (!currentArticle?.title || !currentArticle?.content) {
      toast({
        title: "Données incomplètes",
        description: "Le titre et le contenu sont requis",
        variant: "destructive"
      });
      return;
    }

    try {
      const articleToSave = { ...currentArticle };
      
      // Générer le slug s'il n'existe pas
      if (!articleToSave.slug && articleToSave.title) {
        articleToSave.slug = generateSlug(articleToSave.title);
      }
      
      if (editMode && currentArticle.id) {
        const updated = await updateArticle(currentArticle.id, articleToSave);
        
        if (updated) {
          toast({
            title: "Article mis à jour",
            description: "L'article a été enregistré avec succès"
          });
        }
      } else {
        const created = await createArticle(articleToSave as any);
        
        if (created) {
          toast({
            title: "Article créé",
            description: "L'article a été créé avec succès"
          });
        }
      }
      
      setCurrentArticle(null);
      setActiveTab('articles');
      fetchArticles(); // Rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement",
        variant: "destructive"
      });
    }
  };

  const handleDeleteArticleConfirm = (article: Article) => {
    setConfirmDialog({
      isOpen: true,
      title: "Supprimer l'article",
      message: `Êtes-vous sûr de vouloir supprimer l'article "${article.title}" ? Cette action est irréversible.`,
      confirmAction: () => handleDeleteArticle(article.id)
    });
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      const success = await deleteArticle(id);
      
      if (success) {
        toast({
          title: "Article supprimé",
          description: "L'article a été supprimé avec succès"
        });
        fetchArticles(); // Rafraîchir la liste
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression",
        variant: "destructive"
      });
    } finally {
      setConfirmDialog({...confirmDialog, isOpen: false});
    }
  };

  const toggleArticleStatus = async (article: Article) => {
    try {
      const success = await updateArticle(article.id, {
        published: !article.published
      });
      
      if (success) {
        toast({
          title: article.published ? "Article dépublié" : "Article publié",
          description: `L'article est maintenant ${article.published ? "en brouillon" : "publié"}`
        });
        fetchArticles(); // Rafraîchir la liste
      }
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du changement de statut",
        variant: "destructive"
      });
    }
  };

  // Fonctions pour la gestion des catégories
  const handleCreateCategory = async () => {
    if (!newCategory.name) {
      toast({
        title: "Nom requis",
        description: "Le nom de la catégorie est requis",
        variant: "destructive"
      });
      return;
    }

    try {
      const slug = newCategory.slug || generateSlug(newCategory.name);
      
      const created = await createCategory({
        name: newCategory.name,
        slug,
        description: newCategory.description
      });
      
      if (created) {
        toast({
          title: "Catégorie créée",
          description: "La catégorie a été créée avec succès"
        });
        setNewCategory({ name: '', slug: '', description: '' });
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création de la catégorie",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCategoryConfirm = (category: Category) => {
    setConfirmDialog({
      isOpen: true,
      title: "Supprimer la catégorie",
      message: `Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? Cette action est irréversible.`,
      confirmAction: () => handleDeleteCategory(category.id)
    });
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const success = await deleteCategory(id);
      
      if (success) {
        toast({
          title: "Catégorie supprimée",
          description: "La catégorie a été supprimée avec succès"
        });
        fetchCategories(); // Rafraîchir la liste
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression de la catégorie",
        variant: "destructive"
      });
    } finally {
      setConfirmDialog({...confirmDialog, isOpen: false});
    }
  };

  // Fonctions pour la gestion des tags
  const handleCreateTag = async () => {
    if (!newTag.name) {
      toast({
        title: "Nom requis",
        description: "Le nom du tag est requis",
        variant: "destructive"
      });
      return;
    }

    try {
      const slug = newTag.slug || generateSlug(newTag.name);
      
      const created = await createTag({
        name: newTag.name,
        slug
      });
      
      if (created) {
        toast({
          title: "Tag créé",
          description: "Le tag a été créé avec succès"
        });
        setNewTag({ name: '', slug: '' });
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création du tag",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTagConfirm = (tag: Tag) => {
    setConfirmDialog({
      isOpen: true,
      title: "Supprimer le tag",
      message: `Êtes-vous sûr de vouloir supprimer le tag "${tag.name}" ? Cette action est irréversible.`,
      confirmAction: () => handleDeleteTag(tag.id)
    });
  };

  const handleDeleteTag = async (id: string) => {
    try {
      const success = await deleteTag(id);
      
      if (success) {
        toast({
          title: "Tag supprimé",
          description: "Le tag a été supprimé avec succès"
        });
        fetchTags(); // Rafraîchir la liste
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression du tag",
        variant: "destructive"
      });
    } finally {
      setConfirmDialog({...confirmDialog, isOpen: false});
    }
  };

  // Fonction pour la génération AI
  const handleGenerateAI = async () => {
    if (!currentArticle?.content || currentArticle.content.length < 100) {
      toast({
        title: "Contenu insuffisant",
        description: "Le contenu de l'article est insuffisant pour générer un résumé et des mots-clés",
        variant: "destructive"
      });
      return;
    }
    
    setGeneratingAI(true);
    try {
      const result = await generateSummaryAndKeywords(currentArticle.content);
      
      if (result) {
        setCurrentArticle({
          ...currentArticle,
          excerpt: result.excerpt,
          tags: [...(currentArticle.tags || []), ...result.keywords.filter(keyword => 
            !currentArticle.tags?.includes(keyword)
          )]
        });
        
        toast({
          title: "Génération réussie",
          description: "Le résumé et les mots-clés ont été générés avec succès"
        });
      }
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération du résumé et des mots-clés",
        variant: "destructive"
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  // Formater la date pour l'affichage
  const formatDate = (date: string | undefined): string => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Administration Simple du Blog | Nova Hypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold">Administration du Blog</h1>
          <p className="text-muted-foreground">Gérez facilement le contenu de votre blog</p>
        </header>

        {activeTab === 'editor' ? (
          // Interface d'édition d'article
          <div className="space-y-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveTab('articles');
                setCurrentArticle(null);
                navigate('/admin-simple');
              }} 
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Retour</span>
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>{editMode ? "Modifier l'article" : "Créer un article"}</CardTitle>
                <CardDescription>
                  {editMode ? "Modifiez les détails de votre article" : "Créez un nouvel article pour votre blog"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={currentArticle?.title || ''}
                    onChange={(e) => setCurrentArticle({...currentArticle!, title: e.target.value})}
                    placeholder="Titre de l'article"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={currentArticle?.slug || ''}
                    onChange={(e) => setCurrentArticle({...currentArticle!, slug: e.target.value})}
                    placeholder="Généré automatiquement si laissé vide"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Résumé</Label>
                  <Textarea
                    id="excerpt"
                    value={currentArticle?.excerpt || ''}
                    onChange={(e) => setCurrentArticle({...currentArticle!, excerpt: e.target.value})}
                    placeholder="Un court résumé de l'article"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Contenu</Label>
                  <ArticleEditor
                    value={currentArticle?.content || ''}
                    onChange={(value) => setCurrentArticle({...currentArticle!, content: value})}
                    onGenerateAI={handleGenerateAI}
                    isGenerating={generatingAI}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="categories">Catégories</Label>
                    <Select
                      value={currentArticle?.categories?.[0] || ""}
                      onValueChange={(value) => {
                        setCurrentArticle({
                          ...currentArticle!, 
                          categories: value ? [value] : []
                        });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px]">
                      {currentArticle?.tags?.map((tagId) => {
                        const tag = tags.find(t => t.id === tagId);
                        return tag ? (
                          <div 
                            key={tag.id} 
                            className="bg-muted text-sm px-3 py-1 rounded-full flex items-center gap-1"
                          >
                            {tag.name}
                            <button 
                              type="button"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => {
                                setCurrentArticle({
                                  ...currentArticle!, 
                                  tags: currentArticle.tags?.filter(t => t !== tag.id) || []
                                });
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ) : null;
                      })}
                      
                      {(currentArticle?.tags?.length || 0) === 0 && (
                        <span className="text-muted-foreground text-sm">Aucun tag sélectionné</span>
                      )}
                    </div>
                    <Select
                      value=""
                      onValueChange={(value) => {
                        if (!value) return;
                        if (!currentArticle?.tags?.includes(value)) {
                          setCurrentArticle({
                            ...currentArticle!, 
                            tags: [...(currentArticle?.tags || []), value]
                          });
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ajouter un tag" />
                      </SelectTrigger>
                      <SelectContent>
                        {tags.map((tag) => (
                          <SelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="published"
                      checked={currentArticle?.published || false}
                      onCheckedChange={(checked) => 
                        setCurrentArticle({...currentArticle!, published: !!checked})
                      }
                    />
                    <Label htmlFor="published">Publier l'article</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={currentArticle?.featured || false}
                      onCheckedChange={(checked) => 
                        setCurrentArticle({...currentArticle!, featured: !!checked})
                      }
                    />
                    <Label htmlFor="featured">Article à la une</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setActiveTab('articles');
                    setCurrentArticle(null);
                    navigate('/admin-simple');
                  }}
                >
                  Annuler
                </Button>
                <Button onClick={handleSaveArticle}>
                  {editMode ? "Mettre à jour" : "Créer"} l'article
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          // Interface principale avec les onglets
          <Tabs defaultValue="articles" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid grid-cols-3">
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="categories">Catégories</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
            </TabsList>
            
            {/* Onglet Articles */}
            <TabsContent value="articles">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Liste des articles</h2>
                <Button onClick={handleCreateArticle} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Nouvel article</span>
                </Button>
              </div>
              
              {articlesLoading ? (
                <div className="flex justify-center py-12">
                  <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {articles.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" aria-hidden="true" />
                      <h3 className="text-lg font-medium mb-1">Aucun article</h3>
                      <p className="text-muted-foreground">Commencez à créer du contenu pour votre blog</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titre</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Date de création</TableHead>
                          <TableHead className="w-[160px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {articles.map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">
                              {article.title}
                            </TableCell>
                            <TableCell>
                              <span 
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  article.published 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {article.published ? 'Publié' : 'Brouillon'}
                              </span>
                            </TableCell>
                            <TableCell>
                              {formatDate(article.created_at)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleArticleStatus(article)}
                                >
                                  {article.published ? (
                                    <Eye className="h-4 w-4 text-gray-500" aria-label="Mettre en brouillon" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-green-500" aria-label="Publier" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditArticle(article)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => handleDeleteArticleConfirm(article)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}
            </TabsContent>
            
            {/* Onglet Catégories */}
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nouvelle catégorie</CardTitle>
                      <CardDescription>
                        Créez une nouvelle catégorie pour organiser vos articles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cat-name">Nom</Label>
                        <Input
                          id="cat-name"
                          value={newCategory.name || ''}
                          onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                          placeholder="Nom de la catégorie"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cat-slug">Slug (URL)</Label>
                        <Input
                          id="cat-slug"
                          value={newCategory.slug || ''}
                          onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                          placeholder="Généré automatiquement si vide"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cat-desc">Description</Label>
                        <Textarea
                          id="cat-desc"
                          value={newCategory.description || ''}
                          onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                          placeholder="Description de la catégorie (optionnel)"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleCreateCategory} 
                        className="w-full"
                        disabled={!newCategory.name}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Créer la catégorie
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Catégories ({categories.length})</CardTitle>
                      <CardDescription>
                        Gérez les catégories de votre blog
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {categoriesLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <>
                          {categories.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">Aucune catégorie trouvée</p>
                              <p className="text-sm text-muted-foreground">Créez votre première catégorie</p>
                            </div>
                          ) : (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Nom</TableHead>
                                  <TableHead>Slug</TableHead>
                                  <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {categories.map((category) => (
                                  <TableRow key={category.id}>
                                    <TableCell className="font-medium">
                                      {category.name}
                                    </TableCell>
                                    <TableCell>
                                      {category.slug}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => handleDeleteCategoryConfirm(category)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Onglet Tags */}
            <TabsContent value="tags">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nouveau tag</CardTitle>
                      <CardDescription>
                        Créez un nouveau tag pour classifier vos articles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="tag-name">Nom</Label>
                        <Input
                          id="tag-name"
                          value={newTag.name || ''}
                          onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                          placeholder="Nom du tag"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tag-slug">Slug (URL)</Label>
                        <Input
                          id="tag-slug"
                          value={newTag.slug || ''}
                          onChange={(e) => setNewTag({...newTag, slug: e.target.value})}
                          placeholder="Généré automatiquement si vide"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={handleCreateTag} 
                        className="w-full"
                        disabled={!newTag.name}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Créer le tag
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tags ({tags.length})</CardTitle>
                      <CardDescription>
                        Gérez les tags de votre blog
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {tagsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <>
                          {tags.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">Aucun tag trouvé</p>
                              <p className="text-sm text-muted-foreground">Créez votre premier tag</p>
                            </div>
                          ) : (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Nom</TableHead>
                                  <TableHead>Slug</TableHead>
                                  <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {tags.map((tag) => (
                                  <TableRow key={tag.id}>
                                    <TableCell className="font-medium">
                                      {tag.name}
                                    </TableCell>
                                    <TableCell>
                                      {tag.slug}
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => handleDeleteTagConfirm(tag)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Boîte de dialogue de confirmation */}
      <Dialog open={confirmDialog.isOpen} onOpenChange={(open) => setConfirmDialog({...confirmDialog, isOpen: open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
            <DialogDescription>{confirmDialog.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={() => confirmDialog.confirmAction()}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SimpleBlogAdmin;
