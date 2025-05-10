
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  CalendarIcon, 
  Trash, 
  Edit, 
  Eye, 
  Code, 
  Pencil, 
  Plus, 
  Save, 
  CircleX,
  Sparkles,
  FileText
} from 'lucide-react';
import ArticleEditor from '@/components/admin/ArticleEditor';
import { generateSummaryAndKeywords } from '@/utils/aiUtils';

// Types pour notre interface
type Article = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url?: string;
  categories: string[];
  tags: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  author?: string;
  scheduled_for?: string;
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

type AuthUser = {
  id: string;
  email: string | null;
};

const SimpleBlogAdmin = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTab, setActiveTab] = useState('articles');
  
  // États pour la gestion des articles
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [articleContent, setArticleContent] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleCategories, setArticleCategories] = useState<string[]>([]);
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [articlePublished, setArticlePublished] = useState(false);
  const [articleFeatured, setArticleFeatured] = useState(false);
  const [articleScheduledDate, setArticleScheduledDate] = useState<Date | undefined>(undefined);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  
  // États pour la gestion des catégories et tags
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [newTag, setNewTag] = useState({ name: '', slug: '' });

  // Initialiser au chargement
  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  // Vérifier l'authentification
  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Non autorisé",
          description: "Vous devez vous connecter pour accéder à cette page",
          variant: "destructive",
        });
        return;
      }
      
      setUser({
        id: session.user.id,
        email: session.user.email
      });
      
      // Vérifier si l'utilisateur est admin (a.zenatti@gmail.com)
      if (session.user.email === 'a.zenatti@gmail.com') {
        setIsAdmin(true);
      } else {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits d'administrateur",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      toast({
        title: "Erreur",
        description: "Impossible de vérifier votre statut d'administrateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Charger les données
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charger les articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (articlesError) throw articlesError;
      setArticles(articlesData || []);
      
      // Charger les catégories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);
      
      // Charger les tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('tags')
        .select('*')
        .order('name');
      
      if (tagsError) throw tagsError;
      setTags(tagsData || []);
    } catch (error) {
      console.error("Erreur de chargement des données:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      toast({
        title: "Déconnecté",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Impossible de vous déconnecter",
        variant: "destructive",
      });
    }
  };

  // Fonction pour générer un slug à partir d'un texte
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Formater la date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'd MMMM yyyy à HH:mm', { locale: fr });
  };

  // Initialiser le formulaire pour un nouvel article
  const initNewArticleForm = () => {
    setEditingArticle(null);
    setArticleTitle('');
    setArticleContent('');
    setArticleExcerpt('');
    setArticleCategories([]);
    setArticleTags([]);
    setArticlePublished(false);
    setArticleFeatured(false);
    setArticleScheduledDate(undefined);
    setShowArticleForm(true);
  };

  // Éditer un article existant
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleTitle(article.title);
    setArticleContent(article.content);
    setArticleExcerpt(article.excerpt || '');
    setArticleCategories(article.categories || []);
    setArticleTags(article.tags || []);
    setArticlePublished(article.published || false);
    setArticleFeatured(article.featured || false);
    setArticleScheduledDate(article.scheduled_for ? new Date(article.scheduled_for) : undefined);
    setShowArticleForm(true);
  };

  // Sauvegarder un article (nouveau ou existant)
  const handleSaveArticle = async (asDraft: boolean = false) => {
    try {
      const now = new Date().toISOString();
      const isScheduled = articleScheduledDate && new Date(articleScheduledDate) > new Date();
      
      // Déterminer le statut de publication
      let isPublished = articlePublished;
      if (asDraft) {
        isPublished = false;
      }
      
      const articleData = {
        title: articleTitle,
        content: articleContent,
        excerpt: articleExcerpt,
        categories: articleCategories,
        tags: articleTags,
        published: isScheduled ? false : isPublished,
        featured: articleFeatured,
        scheduled_for: isScheduled ? articleScheduledDate?.toISOString() : null,
        updated_at: now,
        author: user?.email || 'Admin'
      };
      
      let result;
      
      if (editingArticle) {
        // Mise à jour d'un article existant
        const { data, error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id)
          .select();
        
        if (error) throw error;
        result = data;
        toast({
          title: "Article mis à jour",
          description: `L'article a été ${asDraft ? 'enregistré comme brouillon' : (isScheduled ? 'programmé' : 'mis à jour')}`
        });
      } else {
        // Création d'un nouvel article
        const { data, error } = await supabase
          .from('articles')
          .insert({
            ...articleData,
            created_at: now
          })
          .select();
        
        if (error) throw error;
        result = data;
        toast({
          title: "Article créé",
          description: `L'article a été ${asDraft ? 'enregistré comme brouillon' : (isScheduled ? 'programmé' : 'créé')}`
        });
      }
      
      // Recharger les articles et fermer le formulaire
      await loadData();
      setShowArticleForm(false);
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'article:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'article",
        variant: "destructive",
      });
    }
  };

  // Supprimer un article
  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès"
      });
      
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      });
    }
  };

  // Créer une nouvelle catégorie
  const handleCreateCategory = async () => {
    try {
      // Générer un slug si non fourni
      const slug = newCategory.slug || generateSlug(newCategory.name);
      
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: newCategory.name,
          slug: slug,
          description: newCategory.description
        })
        .select();
      
      if (error) throw error;
      
      setNewCategory({ name: '', slug: '', description: '' });
      toast({
        title: "Catégorie créée",
        description: "La nouvelle catégorie a été créée avec succès"
      });
      
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la catégorie",
        variant: "destructive",
      });
    }
  };

  // Créer un nouveau tag
  const handleCreateTag = async () => {
    try {
      // Générer un slug si non fourni
      const slug = newTag.slug || generateSlug(newTag.name);
      
      const { data, error } = await supabase
        .from('tags')
        .insert({
          name: newTag.name,
          slug: slug
        })
        .select();
      
      if (error) throw error;
      
      setNewTag({ name: '', slug: '' });
      toast({
        title: "Tag créé",
        description: "Le nouveau tag a été créé avec succès"
      });
      
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la création du tag:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le tag",
        variant: "destructive",
      });
    }
  };

  // Supprimer une catégorie
  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès"
      });
      
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
    }
  };

  // Supprimer un tag
  const handleDeleteTag = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce tag ?")) return;
    
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Tag supprimé",
        description: "Le tag a été supprimé avec succès"
      });
      
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le tag",
        variant: "destructive",
      });
    }
  };

  // Gérer la génération automatique de résumé avec l'IA
  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const { excerpt, keywords } = await generateSummaryAndKeywords(articleContent);
      setArticleExcerpt(excerpt);
      
      // Traiter les mots clés pour les transformer en tags
      const keywordArray = keywords
        .split(',')
        .map(k => k.trim())
        .filter(k => k);
      
      setArticleTags([...new Set([...articleTags, ...keywordArray])]);
      
      toast({
        title: "Génération réussie",
        description: "Le résumé et les mots-clés ont été générés automatiquement"
      });
    } catch (error) {
      console.error("Erreur lors de la génération IA:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le résumé automatiquement",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Basculer le statut publié/brouillon d'un article
  const toggleArticleStatus = async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({
          published: !article.published,
          scheduled_for: null // Annuler toute programmation si présente
        })
        .eq('id', article.id);
      
      if (error) throw error;
      
      toast({
        title: "Statut mis à jour",
        description: `L'article est maintenant ${!article.published ? 'publié' : 'en brouillon'}`
      });
      
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  // Si chargement en cours
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si utilisateur non authentifié ou non admin
  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
        <p className="text-muted-foreground mb-6">
          Vous devez être connecté avec des droits administrateur pour accéder à cette page.
        </p>
        <Button className="px-4 py-2" onClick={() => window.location.href = '/admin-blog'}>
          Aller à la page de connexion
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Administration simplifiée | NovaHypnose Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">Administration du Blog</h1>
            <p className="text-muted-foreground">Connecté en tant que {user?.email}</p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour au site
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Formulaire d'article (s'affiche uniquement lorsque showArticleForm est vrai) */}
        {showArticleForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingArticle ? 'Modifier l\'article' : 'Nouvel article'}</CardTitle>
              <CardDescription>
                {editingArticle 
                  ? 'Modifier les détails de l\'article existant' 
                  : 'Créer un nouvel article pour le blog'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Titre de l'article */}
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input 
                  id="title"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="mt-1"
                  placeholder="Titre de l'article"
                />
              </div>

              {/* Contenu avec éditeur HTML et aperçu */}
              <div>
                <Label>Contenu</Label>
                <ArticleEditor
                  value={articleContent}
                  onChange={setArticleContent}
                  onGenerateAI={handleGenerateAI}
                  isGenerating={isGeneratingAI}
                />
              </div>

              {/* Extrait/résumé */}
              <div>
                <Label htmlFor="excerpt">Extrait</Label>
                <div className="flex space-x-2">
                  <Textarea 
                    id="excerpt"
                    value={articleExcerpt}
                    onChange={(e) => setArticleExcerpt(e.target.value)}
                    className="mt-1 flex-grow"
                    placeholder="Court résumé de l'article"
                    rows={3}
                  />
                  <Button 
                    variant="outline" 
                    className="mt-1" 
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI || !articleContent}
                  >
                    {isGeneratingAI ? (
                      <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Cet extrait sera affiché dans les listes d'articles
                </p>
              </div>

              {/* Catégories (sélection multiple) */}
              <div>
                <Label>Catégorie</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                  {categories.map((category) => (
                    <div 
                      key={category.id}
                      className={`
                        px-3 py-2 border rounded-md cursor-pointer text-center
                        ${articleCategories.includes(category.name) 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-background text-muted-foreground border-input hover:bg-accent'}
                      `}
                      onClick={() => {
                        if (articleCategories.includes(category.name)) {
                          setArticleCategories(articleCategories.filter(c => c !== category.name));
                        } else {
                          setArticleCategories([...articleCategories, category.name]);
                        }
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
                {categories.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Aucune catégorie disponible. Créez-en une dans l'onglet "Catégories".
                  </p>
                )}
              </div>

              {/* Tags (sélection multiple) */}
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <div 
                      key={tag.id}
                      className={`
                        px-3 py-1 rounded-full text-sm cursor-pointer
                        ${articleTags.includes(tag.name) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}
                      `}
                      onClick={() => {
                        if (articleTags.includes(tag.name)) {
                          setArticleTags(articleTags.filter(t => t !== tag.name));
                        } else {
                          setArticleTags([...articleTags, tag.name]);
                        }
                      }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
                {tags.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Aucun tag disponible. Créez-en un dans l'onglet "Tags".
                  </p>
                )}
              </div>

              {/* Options de publication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Options de publication</h3>
                  
                  {/* Checkbox pour Publié */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={articlePublished}
                      onChange={() => setArticlePublished(!articlePublished)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="published">Publié</Label>
                  </div>
                  
                  {/* Checkbox pour Mis en avant */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={articleFeatured}
                      onChange={() => setArticleFeatured(!articleFeatured)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="featured">Mis en avant</Label>
                  </div>
                </div>
                
                {/* Programmation de publication */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Programmation</h3>
                  <div className="flex flex-col space-y-2">
                    <Label>Date de publication</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {articleScheduledDate ? (
                            format(articleScheduledDate, "PPP à HH:mm", { locale: fr })
                          ) : (
                            <span>Choisir une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={articleScheduledDate}
                          onSelect={setArticleScheduledDate}
                          initialFocus
                        />
                        {articleScheduledDate && (
                          <div className="p-3 border-t">
                            <Input
                              type="time"
                              value={articleScheduledDate ? format(articleScheduledDate, "HH:mm") : ""}
                              onChange={(e) => {
                                if (articleScheduledDate) {
                                  const [hours, minutes] = e.target.value.split(':');
                                  const newDate = new Date(articleScheduledDate);
                                  newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                                  setArticleScheduledDate(newDate);
                                }
                              }}
                            />
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                    {articleScheduledDate && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setArticleScheduledDate(undefined)}
                      >
                        <CircleX className="mr-1 h-4 w-4" /> Annuler la programmation
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSaveArticle(true)}
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer comme brouillon
              </Button>
              <Button 
                onClick={() => handleSaveArticle(false)}
              >
                {articleScheduledDate && new Date(articleScheduledDate) > new Date() ? (
                  <>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Programmer pour le {format(articleScheduledDate, "d MMMM à HH:mm", { locale: fr })}
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    {editingArticle ? "Mettre à jour" : "Publier"}
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="ml-auto" 
                onClick={() => setShowArticleForm(false)}
              >
                Annuler
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Navigation principale */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>
          
          {/* ARTICLES */}
          <TabsContent value="articles">
            {!showArticleForm && (
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-medium">Gestion des articles</h2>
                <Button onClick={initNewArticleForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvel article
                </Button>
              </div>
            )}
            
            {!showArticleForm && (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Titre</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.length > 0 ? (
                        articles.map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">
                              {article.title}
                            </TableCell>
                            <TableCell>
                              {article.scheduled_for && new Date(article.scheduled_for) > new Date() ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Programmé
                                </span>
                              ) : article.published ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Publié
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Brouillon
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              {article.scheduled_for && new Date(article.scheduled_for) > new Date()
                                ? `Programmé pour le ${formatDate(article.scheduled_for)}`
                                : formatDate(article.updated_at || article.created_at)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditArticle(article)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
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
                                  size="sm"
                                  className="text-red-500" 
                                  onClick={() => handleDeleteArticle(article.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            Aucun article trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* CATÉGORIES */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Formulaire de création de catégorie */}
              <Card>
                <CardHeader>
                  <CardTitle>Nouvelle catégorie</CardTitle>
                  <CardDescription>
                    Créer une nouvelle catégorie pour le blog
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">Nom</Label>
                    <Input 
                      id="category-name"
                      value={newCategory.name} 
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      className="mb-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category-slug">Slug (URL)</Label>
                    <Input 
                      id="category-slug"
                      value={newCategory.slug} 
                      onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                      className="mb-2"
                      placeholder="généré-automatiquement"
                    />
                    <p className="text-sm text-muted-foreground">
                      Le slug est utilisé dans l'URL (ex: /blog/category/mon-slug)
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea 
                      id="category-description"
                      value={newCategory.description} 
                      onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                      className="mb-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleCreateCategory} 
                    disabled={!newCategory.name}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Créer la catégorie
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Liste des catégories */}
              <Card>
                <CardHeader>
                  <CardTitle>Catégories ({categories.length})</CardTitle>
                  <CardDescription>
                    Gérer les catégories existantes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell className="font-medium">
                              {category.name}
                            </TableCell>
                            <TableCell>{category.slug}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500" 
                                onClick={() => handleDeleteCategory(category.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                            Aucune catégorie trouvée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* TAGS */}
          <TabsContent value="tags">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Formulaire de création de tag */}
              <Card>
                <CardHeader>
                  <CardTitle>Nouveau tag</CardTitle>
                  <CardDescription>
                    Créer un nouveau tag pour le blog
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="tag-name">Nom</Label>
                    <Input 
                      id="tag-name"
                      value={newTag.name} 
                      onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                      className="mb-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tag-slug">Slug (URL)</Label>
                    <Input 
                      id="tag-slug"
                      value={newTag.slug} 
                      onChange={(e) => setNewTag({...newTag, slug: e.target.value})}
                      className="mb-2"
                      placeholder="généré-automatiquement"
                    />
                    <p className="text-sm text-muted-foreground">
                      Le slug est utilisé dans l'URL (ex: /blog/tag/mon-slug)
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleCreateTag} 
                    disabled={!newTag.name}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Créer le tag
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Liste des tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags ({tags.length})</CardTitle>
                  <CardDescription>
                    Gérer les tags existants
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tags.length > 0 ? (
                        tags.map((tag) => (
                          <TableRow key={tag.id}>
                            <TableCell className="font-medium">
                              {tag.name}
                            </TableCell>
                            <TableCell>{tag.slug}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500" 
                                onClick={() => handleDeleteTag(tag.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                            Aucun tag trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Liens utiles */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Liens rapides</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={() => window.open('/blog-temp', '_blank')}>
              Voir le blog (version temporaire)
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour au site principal
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleBlogAdmin;
