
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/blog/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowDown, ArrowUp, FileText, FolderOpen, Tag } from 'lucide-react';

const BlogHypnoseAdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalCategories: 0,
    totalTags: 0,
    articlesTrend: 0, // pourcentage de changement par rapport au mois précédent
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Récupérer le nombre total d'articles
        const { data: articlesData, error: articlesError } = await supabase
          .from('articles')
          .select('id, published, created_at');
        
        if (articlesError) throw articlesError;
        
        // Récupérer les catégories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id');
        
        if (categoriesError) throw categoriesError;
        
        // Récupérer les tags
        const { data: tagsData, error: tagsError } = await supabase
          .from('tags')
          .select('id');
        
        if (tagsError) throw tagsError;

        const totalArticles = articlesData?.length || 0;
        const publishedArticles = articlesData?.filter(article => article.published)?.length || 0;
        const draftArticles = articlesData?.filter(article => !article.published)?.length || 0;
        
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

    fetchStatistics();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tableau de bord | BlogHypnose Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, {user?.email}. Voici un aperçu de votre blog.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Accès Rapide</CardTitle>
              <CardDescription>Actions courantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a 
                  href="/bloghypnose-admin/articles/new"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Créer un nouvel article</div>
                  <div className="text-sm text-muted-foreground">Rédigez et publiez du nouveau contenu</div>
                </a>
                <a 
                  href="/bloghypnose-admin/categories"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Gérer les catégories</div>
                  <div className="text-sm text-muted-foreground">Organisez votre contenu</div>
                </a>
                <a 
                  href="/bloghypnose-admin/medias"
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Bibliothèque médias</div>
                  <div className="text-sm text-muted-foreground">Gérez vos images et fichiers</div>
                </a>
                <a 
                  href="/bloghypnose"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-medium">Voir le blog</div>
                  <div className="text-sm text-muted-foreground">Aperçu public de votre blog</div>
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Articles récents</CardTitle>
              <CardDescription>Derniers articles créés ou modifiés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Nous ajouterons ici la liste des articles récents dans une future mise à jour */}
                <p className="text-muted-foreground text-sm italic">
                  Les articles récemment créés ou modifiés apparaîtront ici.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BlogHypnoseAdminDashboard;
