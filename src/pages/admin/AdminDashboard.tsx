
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';
import { LayoutDashboard, FileText, Tag, ListFilter, Plus, PlusSquare } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    categoriesCount: 0,
    tagsCount: 0,
    recentActivity: []
  });

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

    const fetchStats = async () => {
      try {
        // Get articles stats
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .select('id, title, published, created_at')
          .order('created_at', { ascending: false });

        if (articlesError) throw articlesError;

        // Get categories count
        const { count: categoriesCount, error: categoriesError } = await supabase
          .from('categories')
          .select('id', { count: 'exact', head: true });

        if (categoriesError) throw categoriesError;

        // Get tags count
        const { count: tagsCount, error: tagsError } = await supabase
          .from('tags')
          .select('id', { count: 'exact', head: true });

        if (tagsError) throw tagsError;

        // Calculate stats
        const publishedArticles = articles ? articles.filter(a => a.published).length : 0;
        const draftArticles = articles ? articles.filter(a => !a.published).length : 0;
        
        // Get recent activity (last 5 articles)
        const recentActivity = articles ? articles.slice(0, 5).map(article => ({
          id: article.id,
          title: article.title,
          status: article.published ? 'Publié' : 'Brouillon',
          date: new Date(article.created_at).toLocaleDateString('fr-FR')
        })) : [];

        setStats({
          totalArticles: articles ? articles.length : 0,
          publishedArticles,
          draftArticles,
          categoriesCount: categoriesCount || 0,
          tagsCount: tagsCount || 0,
          recentActivity
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les statistiques du blog",
          variant: "destructive"
        });
      }
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin, isLoading, navigate, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Tableau de bord | Administration NovaHypnose</title>
      </Helmet>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold flex items-center">
              <LayoutDashboard className="mr-2 h-8 w-8" />
              Tableau de bord
            </h1>
            <p className="text-muted-foreground">Gérez votre blog et ses contenus</p>
          </div>
        </div>
        
        {/* Actions rapides */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              onClick={() => navigate('/admin-blog/new-article')}
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
            >
              <PlusSquare className="h-6 w-6" />
              <span>Créer un nouvel article</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/admin-blog/articles')} 
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
            >
              <FileText className="h-6 w-6" />
              <span>Gérer les articles</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/admin-blog/categories')}
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
            >
              <ListFilter className="h-6 w-6" />
              <span>Gérer les catégories</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/admin-blog/tags')}
              variant="outline"
              className="h-auto py-6 flex flex-col items-center justify-center gap-2"
            >
              <Tag className="h-6 w-6" />
              <span>Gérer les tags</span>
            </Button>
          </div>
        </section>
        
        {/* Statistiques */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-lg">Total articles</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-3xl font-bold">{stats.totalArticles}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-lg">Articles publiés</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-3xl font-bold text-green-600">{stats.publishedArticles}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-lg">Brouillons</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-3xl font-bold text-amber-600">{stats.draftArticles}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-lg">Catégories</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-3xl font-bold text-blue-600">{stats.categoriesCount}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4 px-5">
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-5 pb-4">
                <p className="text-3xl font-bold text-purple-600">{stats.tagsCount}</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Activité récente */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <Card>
            <CardHeader>
              <CardTitle>Derniers articles</CardTitle>
              <CardDescription>Les 5 derniers articles créés ou modifiés</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((item: any) => (
                    <li key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'Publié' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-center py-4 text-muted-foreground">
                    Aucune activité récente
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
