
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  FileText,
  Eye,
  ArrowUpDown,
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
import { Badge } from '@/components/ui/badge';

const AdminArticlesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading } = useAuth();

  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  
  // Tri
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');

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

    const fetchData = async () => {
      setLoading(true);
      try {
        // Récupérer les articles
        let query = supabase
          .from('articles')
          .select('*')
          .order(sortField, { ascending: sortDirection === 'asc' });

        // Appliquer les filtres
        if (statusFilter === 'published') {
          query = query.eq('published', true);
        } else if (statusFilter === 'draft') {
          query = query.eq('published', false);
        }

        const { data: articlesData, error: articlesError } = await query;
        
        if (articlesError) throw articlesError;
        
        // Récupérer les catégories et tags pour les filtres
        const { data: categoriesData } = await supabase.from('categories').select('*');
        const { data: tagsData } = await supabase.from('tags').select('*');
        
        setArticles(articlesData || []);
        setCategories(categoriesData || []);
        setTags(tagsData || []);
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les articles",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, isLoading, navigate, toast, sortField, sortDirection, statusFilter]);

  const handleDeleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setArticles(articles.filter(article => article.id !== id));
      
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès",
      });
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'article",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (article: any) => {
    try {
      const newStatus = !article.published;
      
      const { error } = await supabase
        .from('articles')
        .update({
          published: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', article.id);
      
      if (error) throw error;
      
      // Mettre à jour l'état local
      setArticles(articles.map(a => 
        a.id === article.id ? {...a, published: newStatus} : a
      ));
      
      toast({
        title: `Article ${newStatus ? 'publié' : 'mis en brouillon'}`,
        description: `Le statut de l'article a été modifié avec succès`,
      });
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de l'article",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filtrer les articles basés sur la recherche
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || 
                           (article.categories && article.categories.includes(categoryFilter));
    
    const matchesTag = !tagFilter || 
                      (article.tags && article.tags.includes(tagFilter));
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  if (isLoading || loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion des articles | Administration NovaHypnose</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
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
                <FileText className="mr-2 h-8 w-8" />
                Gestion des articles
              </h1>
              <p className="text-muted-foreground">
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <Button onClick={() => navigate('/admin-blog/new-article')}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel article
          </Button>
        </div>
        
        {/* Filtres et recherche */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <Input 
            placeholder="Rechercher un article..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="published">Publiés</SelectItem>
              <SelectItem value="draft">Brouillons</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={categoryFilter} 
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les catégories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={tagFilter} 
            onValueChange={setTagFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les tags</SelectItem>
              {tags.map(tag => (
                <SelectItem key={tag.id} value={tag.slug}>
                  {tag.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Liste des articles */}
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">
                  <div className="flex items-center cursor-pointer" onClick={() => toggleSort('title')}>
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => toggleSort('created_at')}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Catégories</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-xs truncate">{article.title}</div>
                    </TableCell>
                    <TableCell>
                      {article.published ? (
                        <Badge variant="default" className="bg-green-600">Publié</Badge>
                      ) : (
                        <Badge variant="outline">Brouillon</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDate(article.updated_at || article.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {article.categories && article.categories.map((slug: string, index: number) => {
                          const category = categories.find(c => c.slug === slug);
                          return (
                            <Badge key={index} variant="secondary" className="mr-1">
                              {category ? category.name : slug}
                            </Badge>
                          );
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/blog/${article.id}`)}
                          className="h-8 px-2 text-blue-600"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/admin-blog/edit-article/${article.id}`)}
                          className="h-8 px-2"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Éditer</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleStatus(article)}
                          className="h-8 px-2"
                        >
                          {article.published ? 'Brouillon' : 'Publier'}
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action supprimera définitivement l'article "{article.title}".
                                Cette action ne peut pas être annulée.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteArticle(article.id)} className="bg-red-600">
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
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    {loading ? (
                      <div className="flex flex-col items-center">
                        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
                        <p className="mt-4">Chargement des articles...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FileText className="h-12 w-12 mb-2 text-muted-foreground/50" />
                        <p className="mb-2">Aucun article trouvé</p>
                        {searchTerm || categoryFilter || tagFilter || statusFilter !== 'all' ? (
                          <p className="text-sm">Essayez de modifier vos filtres</p>
                        ) : (
                          <Button onClick={() => navigate('/admin-blog/new-article')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Créer un article
                          </Button>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdminArticlesList;
