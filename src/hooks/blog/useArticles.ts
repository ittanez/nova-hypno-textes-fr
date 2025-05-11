
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Article, ArticleWithRelations, Category, Tag } from '@/types/blog';

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
      
      // Make sure we're handling the data properly
      if (!data) return { article: null };

      // Create a safe base article with required fields
      const baseArticle: Article = {
        ...data as any,
        id: data.id,
        title: data.title || '',
        content: data.content || '',
        created_at: data.created_at,
        updated_at: data.updated_at || data.created_at,
        slug: (data as any).slug || '',
        status: (data as any).status || (data.published ? 'published' : 'draft')
      };
      
      // Safely handle relations for ArticleWithRelations
      const articleWithRelations: ArticleWithRelations = {
        ...baseArticle,
        // Handle the relations safely with type assertions when we know the structure
        categoryObjects: Array.isArray(data.categories) 
          ? (data.categories as unknown as Category[]) 
          : [],
        tagObjects: Array.isArray(data.tags) 
          ? (data.tags as unknown as Tag[]) 
          : []
      };
      
      return { article: articleWithRelations };
    } catch (error) {
      console.error('Error fetching article by ID:', error);
      return { article: null };
    }
  };
  
  // Define FetchOptions interface explicitly to avoid infinite type instantiation
  interface FetchOptions {
    range?: {
      from: number;
      to: number;
    };
    filters?: Record<string, any>;
    sort?: {
      field: string;
      direction: 'asc' | 'desc';
    };
  }
  
  const fetchArticles = async (options: FetchOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('articles').select('*');
      
      // Apply default sorting or custom sorting if provided
      const sortField = options.sort?.field || 'created_at';
      const sortDirection = options.sort?.direction || 'desc';
      query = query.order(sortField, { ascending: sortDirection === 'asc' });

      if (options.range) {
        const { from, to } = options.range;
        query = query.range(from, to);
      }

      // Simplify filter handling to avoid deep type nesting
      if (options.filters) {
        const filterKeys = Object.keys(options.filters);
        for (let i = 0; i < filterKeys.length; i++) {
          const key = filterKeys[i];
          const value = options.filters[key];
          if (value !== undefined && value !== null && value !== '') {
            query = query.eq(key, value);
          }
        }
      }

      // Execute the query
      const result = await query;
      
      // Handle error explicitly
      if (result.error) {
        throw result.error;
      }
      
      // Use type assertion to avoid deep type inference
      const rawData = result.data as any[] || [];

      // Map the raw data to our Article type with explicit construction
      const formattedArticles: Article[] = rawData.map(item => {
        const article: Article = {
          id: item.id,
          title: item.title || '',
          content: item.content || '',
          created_at: item.created_at,
          updated_at: item.updated_at || item.created_at,
          slug: item.slug || '',
          status: item.status || (item.published ? 'published' : 'draft'),
          excerpt: item.excerpt,
          author: item.author,
          featured_image_url: item.image_url,
          categories: item.categories,
          tags: item.tags,
          published: item.published,
          featured: item.featured
        };
        return article;
      });

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
      // Ensure we have the required fields for the database schema
      const dataToInsert = {
        ...articleData,
        title: articleData.title || '',
        content: articleData.content || '',
        slug: articleData.slug || generateSlug(articleData.title || ''),
        status: articleData.status || 'draft'
      };

      const { data, error } = await supabase
        .from('articles')
        .insert([dataToInsert])
        .select();

      if (error) {
        throw error;
      }

      return data?.[0];
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
        .select();

      if (error) {
        throw error;
      }

      return data?.[0];
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
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    generateSlug
  };
}
