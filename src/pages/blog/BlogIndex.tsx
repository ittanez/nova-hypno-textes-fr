import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Search, ChevronsDown } from 'lucide-react';
import { useArticles } from '@/hooks/blog/useArticles';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import { Article, BlogFilters } from '@/types/blog';

const BlogIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { articles, loading, error, fetchArticles } = useArticles();
  const { categories, loading: categoriesLoading } = useCategories();
  const { tags, loading: tagsLoading } = useTags();
  
  const [filters, setFilters] = useState<BlogFilters>({
    category: undefined,
    tag: undefined,
    search: '',
    // Remove sortBy and sortDirection from here if they're not in the BlogFilters interface
  });
  
  useEffect(() => {
    fetchArticles({
      category: filters.category,
      tag: filters.tag,
      // Include sortBy and sortDirection in the options if they're supported by fetchArticles
    });
  }, [filters, fetchArticles]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const getSlug = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };
  
  // Replace pagination related code with simpler approach
  const handlePageChange = (page: number) => {
    // Implement custom pagination logic if needed
    // Since useArticles doesn't have pagination support built-in
  };
  
  const handleCategoryChange = (categoryId: string | undefined) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: categoryId,
    }));
  };
  
  const handleTagChange = (tagId: string | undefined) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      tag: tagId,
    }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilters(prevFilters => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };
  
  // Update sorting related code to match your implementation
  const handleSortChange = (sortBy: string) => {
    // Implement custom sorting logic if needed
  };
  
  return (
    <>
      <Helmet>
        <title>Blog | NovaHypnose</title>
        <meta name="description" content="Découvrez les articles de blog de NovaHypnose sur l'hypnose, le développement personnel et le bien-être." />
        <meta property="og:title" content="Blog | NovaHypnose" />
        <meta property="og:description" content="Explorez nos articles sur l'hypnose, le développement personnel et le bien-être." />
        <link rel="canonical" href="https://novahypnose.fr/blog" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-serif mb-4">Bienvenue sur le blog</h1>
          <p className="text-muted-foreground">
            Découvrez nos articles sur l'hypnose, le développement personnel et le bien-être.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input 
              type="search"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Catégories" />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <SelectItem value="">Chargement...</SelectItem>
                ) : (
                  <>
                    <SelectItem value="">Toutes les catégories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
            
            <Select onValueChange={handleTagChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tags" />
              </SelectTrigger>
              <SelectContent>
                {tagsLoading ? (
                  <SelectItem value="">Chargement...</SelectItem>
                ) : (
                  <>
                    <SelectItem value="">Tous les tags</SelectItem>
                    {tags.map(tag => (
                      <SelectItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        
        {/* Articles Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Erreur</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <Card key={article.id} className="bg-card text-card-foreground shadow-md overflow-hidden">
                {article.featured_image_url && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img 
                      src={article.featured_image_url} 
                      alt={article.title} 
                      className="object-cover w-full h-full rounded-t-md"
                    />
                  </div>
                )}
                
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt || article.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" aria-hidden="true" />
                      <span>{formatDate(article.created_at)}</span>
                    </div>
                    
                    {article.author && (
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" aria-hidden="true" />
                        <span>{article.author}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button asChild variant="secondary" className="w-full mt-4">
                    <Link to={`/blog/${getSlug(article.title)}`}>
                      Lire l'article
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={true}
          >
            Première page
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={true}
          >
            Page précédente
          </Button>
          
          <span>Page 1 sur 1</span>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={true}
          >
            Page suivante
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={true}
          >
            Dernière page
          </Button>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
