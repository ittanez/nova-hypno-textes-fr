
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBlogAuth } from '@/hooks/bloghypnose/useBlogAuth';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, FileText, FolderOpen, Tag, LayoutDashboard, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogHypnoseAdminDashboard = () => {
  const { user } = useBlogAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalCategories: 0,
    totalTags: 0,
    articlesTrend: 0, // pourcentage de changement par rapport au mois précédent
  });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  // Charger les statistiques du dashboard
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Récupérer le nombre total d'articles
        const { data: articlesData, error: articlesError } = await supabaseBlog
          .from('bloghypnose_articles')
          .select('id, status, created_at, published_at');
        
        if (articlesError) throw articlesError;
        
        // Récupérer les catégories
        const { data: categoriesData, error: categoriesError } = await supabaseBlog
          .from('bloghypnose_categories')
          .select('id');
        
        if (categoriesError) throw categoriesError;
        
        // Récupérer les tags
        const { data: tagsData, error: tagsError } = await supabaseBlog
          .from('bloghypnose_tags')
          .select('id');
        
        if (tagsError) throw tagsError;

        const totalArticles = articlesData?.length || 0;
        const publishedArticles = articlesData?.filter(article => article.status === 'published')?.length || 0;
        const draftArticles = articlesData?.filter(article => article.status === 'draft')?.length || 0;
        
        // Calcul de la tendance (articles créés ce mois-ci vs le mois précédent)
        const now = new Date();
        const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        
        const articlesThisMonth = articlesData?.filter(article => {
          const createdAt = new Date(article.created_at);
          return createdAt >= firstDayThisMonth;
        }).length || 0;
        
        const articlesLastMonth = articlesData?.filter(article => {
          const createdAt = new Date(article.created_at);
          return createdAt >= firstDayLastMonth && createdAt < firstDayThisMonth;
        }).length || 0;
        
        // Calculer la tendance en pourcentage
        let articlesTrend = 0;
        if (articlesLastMonth > 0) {
          articlesTrend = Math.round(((articlesThisMonth - articlesLastMonth) / articlesLastMonth) * 100);
        } else if (articlesThisMonth > 0) {
          articlesTrend = 100; // Si aucun article le mois dernier mais des articles ce mois-ci
        }
        
        setStats({
          totalArticles,
          publishedArticles,
          draftArticles,
          totalCategories: categoriesData?.length || 0,
          totalTags: tagsData?.length || 0,
          articlesTrend,
        });
        
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
      }
    };

    // Récupérer les articles récents
    const fetchRecentArticles = async () => {
      setLoadingRecent(true);
      try {
        const { data, error } = await supabaseBlog
          .from('bloghypnose_articles')
          .select('id, title, status, created_at, updated_at, slug')
          .order('updated_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        setRecentArticles(data || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles récents:", error);
        setRecentArticles([]);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchStatistics();
    fetchRecentArticles();
  }, []);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Définir la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Helmet>
        <title>Tableau de bord | BlogHypnose Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue, {user?.email}. Voici un aperçu de votre blog.
            </p>
          </div>
          
          <Button onClick={() => navigate('/bloghypnose-admin/articles/new')} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel article
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Articles</CardTitle>
              <CardDescription>Tous les articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{stats.totalArticles}</span>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div className="mt-2 flex items-center text-sm">
                {stats.articlesTrend > 0 ? (
                  <>
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+{stats.articlesTrend}%</span>
                  </>
                ) : stats.articlesTrend < 0 ? (
                  <>
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500">{stats.articlesTrend}%</span>
                  </>
                ) : (
                  <span className="text-gray-500">Stable</span>
                )}
                <span className="ml-1 text-muted-foreground">ce mois-ci</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Articles Publiés</CardTitle>
              <CardDescription>Articles visibles sur le blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{stats.publishedArticles}</span>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {Math.round((stats.publishedArticles / stats.totalArticles) * 100) || 0}% de tous les articles
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Catégories</CardTitle>
              <CardDescription>Organisation du contenu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{stats.totalCategories}</span>
                <FolderOpen className="h-8 w-8 text-blue-500" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Pour regrouper vos articles
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Tags</CardTitle>
              <CardDescription>Mots-clés des articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{stats.totalTags}</span>
                <Tag className="h-8 w-8 text-purple-500" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Pour améliorer la découvrabilité
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Accès Rapide</CardTitle>
              <CardDescription>Actions courantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline"
                  className="flex w-full items-center justify-between p-3 hover:bg-gray-100"
                  onClick={() => navigate('/bloghypnose-admin/articles/new')}
                >
                  <div className="text-left">
                    <div className="font-medium">Créer un nouvel article</div>
                    <div className="text-sm text-muted-foreground">Rédigez et publiez du nouveau contenu</div>
                  </div>
                  <Plus className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex w-full items-center justify-between p-3 hover:bg-gray-100"
                  onClick={() => navigate('/bloghypnose-admin/categories')}
                >
                  <div className="text-left">
                    <div className="font-medium">Gérer les catégories</div>
                    <div className="text-sm text-muted-foreground">Organisez votre contenu</div>
                  </div>
                  <FolderOpen className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex w-full items-center justify-between p-3 hover:bg-gray-100"
                  onClick={() => navigate('/bloghypnose-admin/medias')}
                >
                  <div className="text-left">
                    <div className="font-medium">Bibliothèque médias</div>
                    <div className="text-sm text-muted-foreground">Gérez vos images et fichiers</div>
                  </div>
                  <FileText className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex w-full items-center justify-between p-3 hover:bg-gray-100"
                  onClick={() => window.open('/bloghypnose', '_blank')}
                >
                  <div className="text-left">
                    <div className="font-medium">Voir le blog</div>
                    <div className="text-sm text-muted-foreground">Aperçu public de votre blog</div>
                  </div>
                  <LayoutDashboard className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Articles récents</CardTitle>
              <CardDescription>Derniers articles créés ou modifiés</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRecent ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex justify-between p-3 border rounded-lg">
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : recentArticles.length > 0 ? (
                <div className="space-y-2">
                  {recentArticles.map(article => (
                    <Button 
                      key={article.id} 
                      variant="outline"
                      className="flex w-full items-center justify-between p-3 hover:bg-gray-100"
                      onClick={() => navigate(`/bloghypnose-admin/articles/${article.id}`)}
                    >
                      <div className="text-left overflow-hidden">
                        <div className="font-medium truncate">{article.title}</div>
                        <div className="text-xs text-muted-foreground">
                          Modifié le {formatDate(article.updated_at)}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(article.status)}`}>
                        {article.status === 'published' ? 'Publié' : 
                         article.status === 'draft' ? 'Brouillon' : 
                         article.status === 'scheduled' ? 'Programmé' : article.status}
                      </span>
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm italic">
                  Aucun article récent.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BlogHypnoseAdminDashboard;
