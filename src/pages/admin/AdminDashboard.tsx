
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

interface Article {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'scheduled';
  publishedAt: string | null;
  updatedAt: string;
}

interface StatsData {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  categories: number;
  tags: number;
  subscribers: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<StatsData>({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    categories: 0,
    tags: 0,
    subscribers: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem('admin_username') || 'Admin';

  useEffect(() => {
    // In a real app, these would be API calls
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock articles data
        const mockArticles: Article[] = [
          {
            id: '1',
            title: "L'hypnose ericksonienne et les mécanismes du changement",
            slug: 'hypnose-ericksonienne-mecanismes-changement',
            status: 'published',
            publishedAt: '2023-11-15T10:00:00Z',
            updatedAt: '2023-11-15T10:00:00Z'
          },
          {
            id: '2',
            title: 'Auto-hypnose : techniques simples pour améliorer votre sommeil',
            slug: 'auto-hypnose-techniques-ameliorer-sommeil',
            status: 'published',
            publishedAt: '2023-10-28T09:30:00Z',
            updatedAt: '2023-10-28T09:30:00Z'
          },
          {
            id: '3',
            title: 'Comment l\'hypnothérapie aide à surmonter les phobies',
            slug: 'hypnotherapie-aide-surmonter-phobies',
            status: 'published',
            publishedAt: '2023-10-10T14:15:00Z',
            updatedAt: '2023-10-10T14:15:00Z'
          },
          {
            id: '4',
            title: 'Les techniques de visualisation en auto-hypnose',
            slug: 'techniques-visualisation-auto-hypnose',
            status: 'draft',
            publishedAt: null,
            updatedAt: '2023-11-20T11:30:00Z'
          }
        ];
        
        // Mock stats data
        const mockStats: StatsData = {
          totalArticles: mockArticles.length,
          publishedArticles: mockArticles.filter(a => a.status === 'published').length,
          draftArticles: mockArticles.filter(a => a.status === 'draft').length,
          categories: 3,
          tags: 5,
          subscribers: 12
        };
        
        setArticles(mockArticles);
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin-blog');
  };

  const handleDeleteArticle = (id: string) => {
    // In a real app, this would be an API call
    setArticles(articles.filter(article => article.id !== id));
    
    // Update stats
    setStats({
      ...stats,
      totalArticles: stats.totalArticles - 1,
      publishedArticles: articles.find(a => a.id === id)?.status === 'published'
        ? stats.publishedArticles - 1
        : stats.publishedArticles,
      draftArticles: articles.find(a => a.id === id)?.status === 'draft'
        ? stats.draftArticles - 1
        : stats.draftArticles
    });
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
                  <p className="text-3xl font-bold">{stats.totalArticles}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.publishedArticles} publiés, {stats.draftArticles} brouillons
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Catégories</CardTitle>
                  <Folder className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.categories}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Catégories actives
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Abonnés</CardTitle>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stats.subscribers}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Personnes abonnées au blog
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
                <Link to="/admin-blog/subscribers" className="block p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-nova-blue-light p-3 rounded-full mb-4">
                      <Users className="h-6 w-6 text-nova-blue" />
                    </div>
                    <CardTitle className="text-xl mb-2">Abonnés</CardTitle>
                    <CardDescription>Gérer votre liste d'abonnés aux notifications</CardDescription>
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
                    {articles.map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium max-w-[300px] truncate">
                          {article.title}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : article.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}>
                            {article.status === 'published'
                              ? 'Publié'
                              : article.status === 'draft'
                                ? 'Brouillon'
                                : 'Programmé'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {article.status === 'published' 
                            ? formatDate(article.publishedAt) 
                            : formatDate(article.updatedAt)}
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
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* External links */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Liens rapides</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link to="/blog-temp" target="_blank">
                    Voir le blog (version temporaire)
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
