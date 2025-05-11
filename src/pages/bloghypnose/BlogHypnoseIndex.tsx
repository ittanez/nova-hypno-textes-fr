
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { supabase } from "@/integrations/supabase/client";
import type { Article } from '@/types/blog';

const BlogHypnoseIndex = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');
  const searchQuery = searchParams.get('q');
  
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
          
        if (categoryFilter) {
          query = query.contains('categories', [categoryFilter]);
        }
        
        if (tagFilter) {
          query = query.contains('tags', [tagFilter]);
        }
        
        if (searchQuery) {
          query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        setArticles(data as Article[]);
      } catch (err: any) {
        console.error("Erreur lors du chargement des articles:", err);
        setError(err.message || "Une erreur est survenue lors du chargement des articles");
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [categoryFilter, tagFilter, searchQuery]);
  
  const renderFilters = () => {
    let filterText = '';
    
    if (categoryFilter) {
      filterText = `Catégorie: ${categoryFilter}`;
    } else if (tagFilter) {
      filterText = `Tag: ${tagFilter}`;
    } else if (searchQuery) {
      filterText = `Recherche: "${searchQuery}"`;
    }
    
    return filterText ? (
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Filtres actifs: <span className="font-semibold">{filterText}</span>
          </div>
          <Link to="/bloghypnose">
            <Button variant="outline" size="sm">
              Effacer les filtres
            </Button>
          </Link>
        </div>
      </div>
    ) : null;
  };

  return (
    <>
      <Helmet>
        <title>
          {categoryFilter ? `Catégorie: ${categoryFilter} | ` : 
           tagFilter ? `Tag: ${tagFilter} | ` : 
           searchQuery ? `Recherche: ${searchQuery} | ` : ''}
          BlogHypnose - NovaHypnose
        </title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="space-y-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {categoryFilter ? `Articles dans la catégorie "${categoryFilter}"` : 
             tagFilter ? `Articles avec le tag "${tagFilter}"` : 
             searchQuery ? `Résultats de recherche pour "${searchQuery}"` : 
             'Derniers articles'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos articles sur l'hypnose, la thérapie et le développement personnel
          </p>
        </div>
        
        {renderFilters()}
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Réessayer
            </Button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Aucun article trouvé</h2>
            <p className="text-muted-foreground mb-6">
              {categoryFilter || tagFilter || searchQuery ? 
                "Essayez un autre filtre ou terme de recherche." : 
                "Le blog sera bientôt rempli de contenu intéressant."}
            </p>
            
            {(categoryFilter || tagFilter || searchQuery) && (
              <Link to="/bloghypnose">
                <Button>Voir tous les articles</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="md:flex">
                  {article.image_url && (
                    <div className="md:w-1/3 h-56 md:h-auto">
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className={`${article.image_url ? 'md:w-2/3' : 'w-full'}`}>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-1" aria-hidden="true" />
                        <time dateTime={article.created_at}>
                          {format(new Date(article.created_at), 'dd MMMM yyyy', {locale: fr})}
                        </time>
                      </div>
                      
                      <CardTitle className="text-2xl">
                        <Link 
                          to={`/bloghypnose/article/${article.id}`}
                          className="hover:text-nova-blue transition-colors"
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      
                      <CardDescription className="line-clamp-2">
                        {article.excerpt || article.content.replace(/<[^>]*>/g, '').slice(0, 160) + '...'}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.categories?.map((category) => (
                          <Link 
                            key={category}
                            to={`/bloghypnose?category=${encodeURIComponent(category)}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full transition-colors"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Link 
                        to={`/bloghypnose/article/${article.id}`}
                        className="inline-flex items-center text-sm font-medium text-nova-blue hover:underline"
                      >
                        Lire l'article complet
                        <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogHypnoseIndex;
