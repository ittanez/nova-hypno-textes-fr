import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/types/blog';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
        } : null 
      };
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      return { article: null };
    }
  };
  
  const fetchArticles = async (options = {}) => {
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

      setArticles(data || []);
    } catch (error: any) {
      setError(error);
      console.error("Error fetching articles:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: Article) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([articleData])
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

  const updateArticle = async (id: string, articleData: Article) => {
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

  return {
    articles,
    loading,
    error,
    fetchArticles,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
  };
}
