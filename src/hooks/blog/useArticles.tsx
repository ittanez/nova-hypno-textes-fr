
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { generateSummaryAndKeywords } from '@/utils/aiUtils';

export const useArticles = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getArticles = async (options = { published: true }) => {
    setLoading(true);
    try {
      let query = supabase.from('articles').select('*');
      
      if (options.published !== undefined) {
        query = query.eq('published', options.published);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer les articles',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getArticle = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer l\'article',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: any) => {
    setLoading(true);
    try {
      // Handle AI generation if content is available but excerpt is not
      if (articleData.content && !articleData.excerpt && articleData.generateAi) {
        try {
          const result = await generateSummaryAndKeywords(articleData.content);
          articleData.excerpt = result.excerpt;
        } catch (aiError) {
          console.error('Error generating AI content:', aiError);
          // Continue without AI generation
        }
      }

      const { data, error } = await supabase
        .from('articles')
        .insert(articleData)
        .select();
      
      if (error) throw error;
      
      return data?.[0] || null;
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer l\'article',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id: string, articleData: any) => {
    setLoading(true);
    try {
      // Handle AI generation if content is available but excerpt is not
      if (articleData.content && !articleData.excerpt && articleData.generateAi) {
        try {
          const result = await generateSummaryAndKeywords(articleData.content);
          articleData.excerpt = result.excerpt;
        } catch (aiError) {
          console.error('Error generating AI content:', aiError);
          // Continue without AI generation
        }
      }
      
      // Add updated_at timestamp
      articleData.updated_at = new Date().toISOString();
      
      // Use an alias to resolve the ambiguous column reference
      const { data, error } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', id)
        .select('*, articles.id as article_id');
      
      if (error) throw error;
      
      return data?.[0] || null;
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour l\'article',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'article',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedArticles = async (limit = 3) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getFeaturedArticles,
  };
};
