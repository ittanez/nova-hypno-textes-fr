
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/types/blog';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticleById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, categories(*), tags(*)')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return { 
        article: data ? {
          ...data,
          categoryObjects: data.categories,
          tagObjects: data.tags
        } as ArticleWithRelations : null 
      };
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      return { article: null };
    }
  };
  
  const fetchArticles = async (options: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('articles').select('*');
      
      query = query.order('created_at', { 
        ascending: false
      });

      if (options.range) {
        const { from, to } = options.range;
        query = query.range(from, to);
      }

      if (options.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value) {
            query = query.eq(key, value);
          }
        });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Ensure data is compatible with Article type by adding required fields if missing
      const formattedArticles: Article[] = (data || []).map(item => ({
        ...item,
        slug: item.slug || '',
        status: item.status || (item.published ? 'published' : 'draft')
      })) as Article[];

      setArticles(formattedArticles);
      return { articles: formattedArticles };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred while fetching articles';
      setError(errorMessage);
      console.error("Error fetching articles:", errorMessage);
      return { articles: [] };
    } finally {
      setLoading(false);
    }
  };

  const getArticle = async (id: string) => {
    return fetchArticleById(id);
  };

  const createArticle = async (articleData: Partial<Article>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          ...articleData,
          slug: articleData.slug || generateSlug(articleData.title || ''),
          status: articleData.status || 'draft'
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  };

  const updateArticle = async (id: string, articleData: Partial<Article>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  };

  // Helper function to generate slugs from titles
  const generateSlug = (title: string) => {
    return title
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  return {
    articles,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    getArticle, // Add this function to fix SimpleBlogAdmin's errors
    createArticle,
    updateArticle,
    deleteArticle,
    generateSlug
  };
}
