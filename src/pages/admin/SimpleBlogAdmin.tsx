
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define types for our component state
type UserState = {
  id: string;
  email: string | null;
} | null;

type Article = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
  featured: boolean;
  categories: string[];
  tags: string[];
  author?: string;
  created_at: string;
  updated_at?: string;
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

type LoginFormState = {
  email: string;
  password: string;
  isLoading: boolean;
};

const SimpleBlogAdmin = () => {
  // Authentication and general state
  const { toast } = useToast();
  const [user, setUser] = useState<UserState>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: '',
    password: '',
    isLoading: false
  });

  // Content state
  const [activeTab, setActiveTab] = useState<string>('articles');
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  
  // Editor state
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    published: false,
    featured: false,
    categories: [],
    tags: []
  });
  const [newCategory, setNewCategory] = useState<Partial<Category>>({ 
    name: '', 
    slug: '', 
    description: '' 
  });
  const [newTag, setNewTag] = useState<Partial<Tag>>({ 
    name: '', 
    slug: '' 
  });

  // Initialize on component load
  useEffect(() => {
    checkAuth();
  }, []);

  // Load content after authenticated
  useEffect(() => {
    if (isAdmin) {
      loadContent();
    }
  }, [isAdmin]);

  // Authentication functions
  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }
      
      // Store user data
      setUser({
        id: session.user.id,
        email: session.user.email
      });
      
      // Check if this is our admin user
      if (session.user.email === 'a.zenatti@gmail.com') {
        setIsAdmin(true);
        setLoading(false);
        return;
      }
      
      // Fallback to database check
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) throw error;
      
      setIsAdmin(!!data);
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Erreur d'authentification",
        description: "Impossible de vérifier votre statut d'administrateur",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoginForm(prev => ({ ...prev, isLoading: true }));
      
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      
      if (error) throw error;
      
      // Auth state will be updated by the Supabase listener
      await checkAuth();
      
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoginForm(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      toast({
        title: "Déconnecté",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast({
        title: "Erreur",
        description: "Impossible de vous déconnecter",
        variant: "destructive",
      });
    }
  };

  // Content loading functions
  const loadContent = async () => {
    setLoading(true);
    try {
      // Load articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (articlesError) throw articlesError;
      setArticles(articlesData || []);
      
      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);
      
      // Load tags
      const { data: tagsData, error: tagsError } = await supabase
        .from('tags')
        .select('*')
        .order('name');
      
      if (tagsError) throw tagsError;
      setTags(tagsData || []);
    } catch (error) {
      console.error("Error loading content:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Article management
  const handleEditArticle = (article: Article) => {
    setEditingArticle({
      ...article,
      categories: article.categories || [],
      tags: article.tags || []
    });
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    try {
      const { error } = await supabase
        .from('articles')
        .update({
          title: editingArticle.title,
          content: editingArticle.content,
          excerpt: editingArticle.excerpt,
          published: editingArticle.published,
          featured: editingArticle.featured,
          categories: editingArticle.categories,
          tags: editingArticle.tags,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingArticle.id);
      
      if (error) throw error;
      
      // Update local state
      setArticles(articles.map(article => 
        article.id === editingArticle.id ? { ...article, ...editingArticle } : article
      ));
      
      setEditingArticle(null);
      toast({
        title: "Succès",
        description: "L'article a été mis à jour",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour l'article",
        variant: "destructive",
      });
    }
  };

  const handleCreateArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: newArticle.title || '',
          content: newArticle.content || '',
          excerpt: newArticle.excerpt,
          published: !!newArticle.published,
          featured: !!newArticle.featured,
          categories: newArticle.categories || [],
          tags: newArticle.tags || [],
          author: user?.email || 'Admin'
        })
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setArticles([data[0], ...articles]);
        setNewArticle({
          title: '',
          content: '',
          excerpt: '',
          published: false,
          featured: false,
          categories: [],
          tags: []
        });
        
        toast({
          title: "Succès",
          description: "Nouvel article créé",
        });
      }
    } catch (error) {
      console.error("Creation error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer l'article",
        variant: "destructive",
      });
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setArticles(articles.filter(article => article.id !== id));
      toast({
        title: "Succès",
        description: "L'article a été supprimé",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive",
      });
    }
  };

  // Category management
  const handleCreateCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: newCategory.name || '',
          slug: newCategory.slug || (newCategory.name || '').toLowerCase().replace(/\s+/g, '-'),
          description: newCategory.description
        })
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setCategories([...categories, data[0]]);
        setNewCategory({ name: '', slug: '', description: '' });
        
        toast({
          title: "Succès",
          description: "Nouvelle catégorie créée",
        });
      }
    } catch (error) {
      console.error("Category creation error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la catégorie",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCategories(categories.filter(category => category.id !== id));
      toast({
        title: "Succès",
        description: "La catégorie a été supprimée",
      });
    } catch (error) {
      console.error("Category deletion error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
    }
  };

  // Tag management
  const handleCreateTag = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert({
          name: newTag.name || '',
          slug: newTag.slug || (newTag.name || '').toLowerCase().replace(/\s+/g, '-')
        })
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTags([...tags, data[0]]);
        setNewTag({ name: '', slug: '' });
        
        toast({
          title: "Succès",
          description: "Nouveau tag créé",
        });
      }
    } catch (error) {
      console.error("Tag creation error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le tag",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce tag ?")) return;
    
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setTags(tags.filter(tag => tag.id !== id));
      toast({
        title: "Succès",
        description: "Le tag a été supprimé",
      });
    } catch (error) {
      console.error("Tag deletion error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le tag",
        variant: "destructive",
      });
    }
  };

  // Utility functions
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // Login form for non-authenticated users
  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Helmet>
          <title>Administration Blog | Nova Hypnose</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Administration Blog</CardTitle>
            <CardDescription>
              Connectez-vous pour gérer les articles du blog
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginForm.isLoading}
                >
                  {loginForm.isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button 
              variant="link" 
              onClick={() => window.location.href = '/'}
            >
              Retour au site principal
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Admin dashboard (authenticated & admin user)
  return (
    <>
      <Helmet>
        <title>Administration Blog | Nova Hypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">Administration Blog</h1>
            <p className="text-muted-foreground">Connecté en tant que {user.email}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Site principal
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/blog'}>
              Voir le blog
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
        
        {/* Main tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>
          
          {/* ARTICLES TAB */}
          <TabsContent value="articles">
            {/* Article edit form */}
            {editingArticle && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Modifier l'article</CardTitle>
                  <CardDescription>
                    Modification de l'article: {editingArticle.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Titre</Label>
                    <Input 
                      id="edit-title"
                      value={editingArticle.title} 
                      onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                      className="mb-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-excerpt">Extrait</Label>
                    <Textarea 
                      id="edit-excerpt"
                      value={editingArticle.excerpt || ''} 
                      onChange={(e) => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                      className="mb-2"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-content">Contenu</Label>
                    <Textarea 
                      id="edit-content"
                      value={editingArticle.content} 
                      onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                      className="mb-2"
                      rows={10}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-published" 
                      checked={!!editingArticle.published} 
                      onCheckedChange={(checked) => 
                        setEditingArticle({...editingArticle, published: !!checked})
                      }
                    />
                    <Label htmlFor="edit-published">Publié</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-featured" 
                      checked={!!editingArticle.featured} 
                      onCheckedChange={(checked) => 
                        setEditingArticle({...editingArticle, featured: !!checked})
                      }
                    />
                    <Label htmlFor="edit-featured">Mis en avant</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button onClick={handleUpdateArticle}>Enregistrer</Button>
                  <Button variant="outline" onClick={() => setEditingArticle(null)}>Annuler</Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Article creation form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Nouvel article</CardTitle>
                <CardDescription>
                  Créer un nouvel article pour le blog
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title"
                    value={newArticle.title} 
                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                    className="mb-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Extrait</Label>
                  <Textarea 
                    id="excerpt"
                    value={newArticle.excerpt} 
                    onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                    className="mb-2"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Contenu</Label>
                  <Textarea 
                    id="content"
                    value={newArticle.content} 
                    onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                    className="mb-2"
                    rows={10}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="published" 
                    checked={!!newArticle.published}
                    onCheckedChange={(checked) => 
                      setNewArticle({...newArticle, published: !!checked})
                    }
                  />
                  <Label htmlFor="published">Publié</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured" 
                    checked={!!newArticle.featured}
                    onCheckedChange={(checked) => 
                      setNewArticle({...newArticle, featured: !!checked})
                    }
                  />
                  <Label htmlFor="featured">Mis en avant</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCreateArticle} 
                  disabled={!newArticle.title || !newArticle.content}
                >
                  Créer l'article
                </Button>
              </CardFooter>
            </Card>
            
            {/* Articles list */}
            <Card>
              <CardHeader>
                <CardTitle>Articles ({articles.length})</CardTitle>
                <CardDescription>
                  Gérer les articles existants du blog
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                          <TableCell className="font-medium truncate">
                            {article.title}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              article.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {article.published ? 'Publié' : 'Brouillon'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {formatDate(article.updated_at || article.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditArticle(article)}
                              >
                                Éditer
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500" 
                                onClick={() => handleDeleteArticle(article.id)}
                              >
                                Supprimer
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
          </TabsContent>
          
          {/* CATEGORIES TAB */}
          <TabsContent value="categories">
            {/* Category creation form */}
            <Card className="mb-8">
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
                >
                  Créer la catégorie
                </Button>
              </CardFooter>
            </Card>
            
            {/* Categories list */}
            <Card>
              <CardHeader>
                <CardTitle>Catégories ({categories.length})</CardTitle>
                <CardDescription>
                  Gérer les catégories existantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Description</TableHead>
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
                          <TableCell className="truncate max-w-[300px]">
                            {category.description || '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500" 
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Aucune catégorie trouvée
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* TAGS TAB */}
          <TabsContent value="tags">
            {/* Tag creation form */}
            <Card className="mb-8">
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
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCreateTag} 
                  disabled={!newTag.name}
                >
                  Créer le tag
                </Button>
              </CardFooter>
            </Card>
            
            {/* Tags list */}
            <Card>
              <CardHeader>
                <CardTitle>Tags ({tags.length})</CardTitle>
                <CardDescription>
                  Gérer les tags existants
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                              Supprimer
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default SimpleBlogAdmin;
