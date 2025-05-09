
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, FileText, Folder, Tag, Users, LogOut } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { useAuth } from '@/hooks/blog/useAuth';
import { useArticles } from '@/hooks/blog/useArticles';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { articles, loading: articlesLoading, deleteArticle } = useArticles();
  const { categories, loading: categoriesLoading } = useCategories();
  const { tags, loading: tagsLoading } = useTags();
  
  const [isLoading, setIsLoading] = useState(true);
  const username = user?.email || 'Admin';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-blog');
      return;
    }

    // Une fois que toutes les données sont chargées
    setIsLoading(articlesLoading || categoriesLoading || tagsLoading);
  }, [articlesLoading, categoriesLoading, tagsLoading, isAdmin]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin-blog');
  };

  const handleDeleteArticle = async (id: string) => {
    await deleteArticle(id);
  };

  const formatDate = (dateString: string | null) => {
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

  return (
    <>
      <Helmet>
        <title>Tableau de Bord | NovaHypnose Blog Admin</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">Tableau de Bord</h1>
            <p className="text-muted-foreground">Bienvenue, {username}</p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button asChild>
              <Link to="/admin-blog/article/new" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Nouvel Article
              </Link>
            </Button>
            
            <Button variant="outline" onClick={handleLogout} className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Chargement du tableau de bord...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Articles</CardTitle>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{articles.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {articles.filter(a => a.published).length} publiés, {articles.filter(a => !a.published).length} brouillons
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Catégories</CardTitle>
                  <Folder className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{categories.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Catégories actives
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Tags</CardTitle>
                  <Tag className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{tags.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tags disponibles
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="hover:border-nova-blue transition-colors">
                <Link to="/admin-blog/article/new" className="block p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nova-blue-light p-3 rounded-full mb-4">
                      <Plus className="h-6 w-6 text-nova-blue" />
                    </div>
                    <CardTitle className="text-xl mb-2">Nouvel Article</CardTitle>
                    <CardDescription>Créer et publier un nouvel article pour votre blog</CardDescription>
                  </div>
                </Link>
              </Card>
              
              <Card className="hover:border-nova-blue transition-colors">
                <Link to="/admin-blog/categories" className="block p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nova-blue-light p-3 rounded-full mb-4">
                      <Folder className="h-6 w-6 text-nova-blue" />
                    </div>
                    <CardTitle className="text-xl mb-2">Catégories & Tags</CardTitle>
                    <CardDescription>Gérer les catégories et étiquettes de votre blog</CardDescription>
                  </div>
                </Link>
              </Card>
              
              <Card className="hover:border-nova-blue transition-colors">
                <Link to="/admin-blog/dashboard" className="block p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nova-blue-light p-3 rounded-full mb-4">
                      <Users className="h-6 w-6 text-nova-blue" />
                    </div>
                    <CardTitle className="text-xl mb-2">Médias</CardTitle>
                    <CardDescription>Gérer vos images et fichiers médias</CardDescription>
                  </div>
                </Link>
              </Card>
            </div>
            
            {/* Recent Articles Table */}
            <Card>
              <CardHeader>
                <CardTitle>Articles Récents</CardTitle>
                <CardDescription>
                  Gérez vos derniers articles publiés ou en brouillon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.length > 0 ? (
                      articles
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .slice(0, 10)
                        .map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium max-w-[300px] truncate">
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
                              {article.published 
                                ? formatDate(article.updated_at) 
                                : formatDate(article.created_at)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => navigate(`/admin-blog/article/edit/${article.id}`)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDeleteArticle(article.id)}
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
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Aucun article trouvé. Créez votre premier article !
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* External links */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Liens rapides</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link to="/blog" target="_blank">
                    Voir le blog
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/admin-blog/categories">
                    Gérer les catégories
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
