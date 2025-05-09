
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Article, BlogFilters, PaginationState } from '@/types/blog';

export function useArticles(filters?: BlogFilters, initialPagination?: Partial<PaginationState>) {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPagination?.page || 1,
    pageSize: initialPagination?.pageSize || 10,
    total: initialPagination?.total || 0,
  });

  useEffect(() => {
    fetchArticles();
  }, [pagination.page, pagination.pageSize, filters]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      // Base query
      let query = supabase
        .from('articles')
        .select('*', { count: 'exact' });
      
      // Add filters
      if (filters) {
        if (filters.category) {
          query = query.contains('categories', [filters.category]);
        }
        
        if (filters.tag) {
          query = query.contains('tags', [filters.tag]);
        }
        
        if (filters.search) {
          query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
        }
      }

      // Add sorting
      const sortBy = filters?.sortBy || 'created_at';
      const sortDirection = filters?.sortDirection || 'desc';
      query = query.order(sortBy, { ascending: sortDirection === 'asc' });
      
      // Add pagination
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;
      
      setArticles(data as Article[]);
      setPagination({ ...pagination, total: count || 0 });
    } catch (error: any) {
      console.error('Error fetching articles:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les articles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      
      setArticles([data as Article, ...articles]);
      return data;
    } catch (error: any) {
      console.error('Error creating article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de créer l'article: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateArticle = async (id: string, article: Partial<Article>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update(article)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setArticles(articles.map(a => a.id === id ? { ...a, ...data } as Article : a));
      return data;
    } catch (error: any) {
      console.error('Error updating article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de mettre à jour l'article: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setArticles(articles.filter(a => a.id !== id));
      return true;
    } catch (error: any) {
      console.error('Error deleting article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer l'article: ${error.message}`,
        variant: 'destructive',
      });
      return false;
    }
  };

  const getArticle = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Article;
    } catch (error: any) {
      console.error('Error fetching article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de charger l'article: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const getArticleBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('title', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    } catch (error: any) {
      console.error('Error fetching article by slug:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de charger l'article: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const changePage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  const changePageSize = (pageSize: number) => {
    setPagination({ ...pagination, pageSize, page: 1 });
  };

  return {
    articles,
    loading,
    pagination,
    fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle,
    getArticleBySlug,
    changePage,
    changePageSize,
  };
}
