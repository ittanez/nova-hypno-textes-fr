
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useBlogArticles, BlogArticle } from '@/hooks/bloghypnose/useBlogArticles';
import ImageOptimized from '@/components/bloghypnose/ImageOptimized';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BlogHypnoseIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Configurer les filtres avec le terme de recherche
  const filters = debouncedSearch ? { search: debouncedSearch, status: 'published' as const } : { status: 'published' as const };
  
  // Utiliser le hook personnalisé pour récupérer les articles
  const { 
    articles, 
    loading, 
    pagination, 
    changePage, 
    getFeaturedArticles 
  } = useBlogArticles(filters, { pageSize: 9 });
  
  const [featuredArticles, setFeaturedArticles] = useState<BlogArticle[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  
  // Effet pour débouncer la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Charger les articles en vedette au chargement de la page
  useEffect(() => {
    const loadFeaturedArticles = async () => {
      setLoadingFeatured(true);
      const featured = await getFeaturedArticles(3);
      setFeaturedArticles(featured);
      setLoadingFeatured(false);
    };
    
    loadFeaturedArticles();
  }, []);
  
  // Formater la date pour l'affichage
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Générer le nombre de pages pour la pagination
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const pageNumbers = [];
  
  // Limiter le nombre de pages affichées dans la pagination
  const maxPageButtons = 5;
  let startPage = Math.max(1, pagination.page - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <>
      <Helmet>
        <title>BlogHypnose - Explorer l'hypnose et le bien-être</title>
        <meta name="description" content="Découvrez des articles, conseils et techniques sur l'hypnose, la méditation et le développement personnel." />
      </Helmet>
      
      {/* En-tête avec recherche */}
      <div className="mb-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            BlogHypnose
          </h1>
          <p className="text-xl text-gray-600">
            Explorer les chemins de l'hypnose, de la méditation et du bien-être
          </p>
        </div>
        
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6"
          />
        </div>
      </div>
      
      {/* Articles en vedette */}
      {!debouncedSearch && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Articles en vedette</h2>
          
          {loadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <Card key={`featured-skeleton-${index}`} className="h-80 animate-pulse">
                  <div className="bg-gray-200 h-40"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <Link to={`/bloghypnose/${article.slug}`} className="block">
                    <div className="h-40 overflow-hidden">
                      <ImageOptimized
                        src={article.featured_image_url || '/placeholder.svg'}
                        alt={article.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {formatDate(article.created_at)}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {article.excerpt || article.content.substring(0, 120) + '...'}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Aucun article en vedette disponible</p>
          )}
        </section>
      )}
      
      {/* Liste des articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {debouncedSearch 
            ? `Résultats pour "${debouncedSearch}" (${pagination.total})` 
            : 'Articles récents'}
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="h-80 animate-pulse">
                <div className="bg-gray-200 h-40"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                <Link to={`/bloghypnose/${article.slug}`} className="block">
                  <div className="h-40 overflow-hidden">
                    <ImageOptimized
                      src={article.featured_image_url || '/placeholder.svg'}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(article.created_at)}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {article.excerpt || article.content.substring(0, 120) + '...'}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">
              {debouncedSearch 
                ? `Aucun résultat trouvé pour "${debouncedSearch}"` 
                : "Aucun article disponible pour le moment"}
            </p>
            {debouncedSearch && (
              <p className="text-gray-600">
                Essayez avec d'autres termes ou parcourez nos catégories
              </p>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {!loading && articles.length > 0 && totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => changePage(Math.max(1, pagination.page - 1))}
                  className={pagination.page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => changePage(1)}>1</PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && (
                    <PaginationItem>
                      <span className="px-4">...</span>
                    </PaginationItem>
                  )}
                </>
              )}
              
              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={page === pagination.page}
                    onClick={() => changePage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <PaginationItem>
                      <span className="px-4">...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink onClick={() => changePage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => changePage(Math.min(totalPages, pagination.page + 1))}
                  className={pagination.page === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </>
  );
};

export default BlogHypnoseIndex;
