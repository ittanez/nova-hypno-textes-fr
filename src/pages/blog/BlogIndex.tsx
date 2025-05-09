
import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useArticles } from '@/hooks/blog/useArticles';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import { Article, BlogFilters, SortDirection } from '@/types/blog';

const BlogIndex = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category: categoryParam, tag: tagParam } = useParams<{ category?: string, tag?: string }>();
  
  // Parse search query parameters
  const searchQuery = searchParams.get('q') || '';
  const sortBy = (searchParams.get('sortBy') || 'created_at') as 'created_at' | 'title';
  const sortDirection = (searchParams.get('sortDirection') || 'desc') as SortDirection;
  const currentPage = Number(searchParams.get('page') || '1');
  
  const [filters, setFilters] = useState<BlogFilters>({
    category: categoryParam,
    tag: tagParam,
    search: searchQuery,
    sortBy,
    sortDirection,
  });
  
  const { articles, loading, pagination, fetchArticles, changePage } = useArticles(filters, { page: currentPage, pageSize: 6 });
  const { categories, loading: loadingCategories } = useCategories();
  const { tags, loading: loadingTags } = useTags();
  
  // Set title based on filters
  let pageTitle = 'Blog';
  if (categoryParam) {
    pageTitle = `Catégorie: ${categoryParam}`;
  } else if (tagParam) {
    pageTitle = `Tag: ${tagParam}`;
  } else if (searchQuery) {
    pageTitle = `Recherche: ${searchQuery}`;
  }

  useEffect(() => {
    // Update filters when URL params change
    setFilters({
      category: categoryParam,
      tag: tagParam,
      search: searchQuery,
      sortBy,
      sortDirection,
    });
  }, [categoryParam, tagParam, searchQuery, sortBy, sortDirection]);

  // Formats the date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL params (this will trigger the useEffect)
    const newParams = new URLSearchParams();
    
    if (filters.search) newParams.set('q', filters.search);
    if (filters.sortBy) newParams.set('sortBy', filters.sortBy);
    if (filters.sortDirection) newParams.set('sortDirection', filters.sortDirection);
    newParams.set('page', '1'); // Reset to first page on new search
    
    setSearchParams(newParams);
  };
  
  const handleSortChange = (value: string) => {
    let newSortBy: 'created_at' | 'title' = 'created_at';
    let newSortDirection: SortDirection = 'desc';
    
    switch (value) {
      case 'newest':
        newSortBy = 'created_at';
        newSortDirection = 'desc';
        break;
      case 'oldest':
        newSortBy = 'created_at';
        newSortDirection = 'asc';
        break;
      case 'title_asc':
        newSortBy = 'title';
        newSortDirection = 'asc';
        break;
      case 'title_desc':
        newSortBy = 'title';
        newSortDirection = 'desc';
        break;
    }
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', newSortBy);
    newParams.set('sortDirection', newSortDirection);
    newParams.set('page', '1'); // Reset to first page on sort change
    setSearchParams(newParams);
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.total / pagination.pageSize + 1) return;
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    
    // Update pagination
    changePage(page);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Get current sort value for select
  const getCurrentSortValue = (): string => {
    if (sortBy === 'created_at' && sortDirection === 'desc') return 'newest';
    if (sortBy === 'created_at' && sortDirection === 'asc') return 'oldest';
    if (sortBy === 'title' && sortDirection === 'asc') return 'title_asc';
    if (sortBy === 'title' && sortDirection === 'desc') return 'title_desc';
    return 'newest'; // Default
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle} | NovaHypnose</title>
        <meta name="description" content="Blog professionnel sur l'hypnose, la thérapie et le bien-être - NovaHypnose" />
      </Helmet>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2">
            Découvrez nos articles sur l'hypnose, la thérapie et le bien-être
          </p>
        </div>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
            <Input
              placeholder="Rechercher dans les articles..."
              value={filters.search || ''}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="flex-1"
            />
            <Button type="submit">Rechercher</Button>
          </form>
          
          <div className="w-full md:w-48">
            <Select value={getCurrentSortValue()} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="oldest">Plus anciens</SelectItem>
                <SelectItem value="title_asc">Titre A-Z</SelectItem>
                <SelectItem value="title_desc">Titre Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active filters */}
        {(categoryParam || tagParam || searchQuery) && (
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span>Filtres actifs:</span>
            {categoryParam && (
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1 flex items-center">
                <span>Catégorie: {categoryParam}</span>
                <Link to="/blog" className="ml-2 hover:text-primary/70">×</Link>
              </div>
            )}
            {tagParam && (
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1 flex items-center">
                <span>Tag: {tagParam}</span>
                <Link to="/blog" className="ml-2 hover:text-primary/70">×</Link>
              </div>
            )}
            {searchQuery && (
              <div className="bg-primary/10 text-primary rounded-full px-3 py-1 flex items-center">
                <span>Recherche: {searchQuery}</span>
                <Link 
                  to={`/blog${categoryParam ? `/category/${categoryParam}` : ''}${tagParam ? `/tag/${tagParam}` : ''}`} 
                  className="ml-2 hover:text-primary/70"
                >
                  ×
                </Link>
              </div>
            )}
            {(categoryParam || tagParam || searchQuery) && (
              <Link 
                to="/blog" 
                className="text-muted-foreground hover:text-primary text-sm underline"
              >
                Effacer tous les filtres
              </Link>
            )}
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          </div>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article: Article) => (
                <Card key={article.id} className="flex flex-col h-full">
                  <CardHeader className="pb-3">
                    {article.image_url && (
                      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
                        <img 
                          src={article.image_url} 
                          alt={article.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardTitle className="font-serif">
                      <Link to={`/blog/${article.id}`} className="hover:text-nova-blue transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex flex-wrap gap-1 mt-2">
                      {article.categories.map((category, index) => (
                        <Link 
                          key={`${article.id}-category-${index}`}
                          to={`/blog/category/${category}`}
                          className="text-xs bg-muted hover:bg-muted/80 rounded-full px-2 py-1 transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 flex-grow">
                    <p className="text-muted-foreground">
                      {article.excerpt || article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3 border-t text-xs text-muted-foreground">
                    <div>
                      {formatDate(article.created_at)}
                      {article.author && ` · ${article.author}`}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <Link 
                          key={`${article.id}-tag-${index}`}
                          to={`/blog/tag/${tag}`}
                          className="hover:text-primary hover:underline"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {pagination.total > pagination.pageSize && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {/* Generate page numbers */}
                  {Array.from(
                    { length: Math.min(5, Math.ceil(pagination.total / pagination.pageSize)) },
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            isActive={currentPage === pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                  )}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={currentPage >= Math.ceil(pagination.total / pagination.pageSize) ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Aucun article ne correspond à vos critères de recherche.
            </p>
            <Button asChild>
              <Link to="/blog">Voir tous les articles</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogIndex;
