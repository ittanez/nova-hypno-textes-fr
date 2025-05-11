import { useState } from 'react';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { Article } from '@/types/blog';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (options?: {
    status?: 'published' | 'draft' | 'all';
    category?: string;
    tag?: string;
    limit?: number;
    featured?: boolean;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabaseBlog
        .from('bloghypnose_articles')
        .select('*');

      // Filtrer par statut si spécifié
      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      // Filtrer par article en vedette
      if (options?.featured) {
        query = query.eq('is_featured', true);
      }

      // Limiter le nombre de résultats
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      // Trier par date de publication ou de création
      query = query.order('published_at', { ascending: false })
                   .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      // Filtrer les résultats par catégorie ou tag si nécessaire
      // Cela est fait côté client car les relations many-to-many nécessitent des requêtes supplémentaires
      let filteredData = data || [];
      
      // Convertir le résultat pour correspondre au type Article
      const formattedArticles: Article[] = filteredData.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: item.content,
        excerpt: item.excerpt || undefined,
        author: undefined, // À ajouter si implémenté
        status: item.status as 'published' | 'draft' | 'scheduled',
        published_at: item.published_at || undefined,
        scheduled_for: item.scheduled_for || undefined,
        created_at: item.created_at,
        updated_at: item.updated_at,
        featured_image_url: item.featured_image_url || undefined,
        is_featured: item.is_featured,
        view_count: item.view_count
      }));

      setArticles(formattedArticles);
    } catch (err: any) {
      console.error('Erreur lors du chargement des articles:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleBySlug = async (slug: string): Promise<{ article: Article | null; error: string | null }> => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (error) throw error;
      
      if (!data) return { article: null, error: 'Article non trouvé' };

      const article: Article = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || undefined,
        author: undefined, // À implémenter si nécessaire
        status: data.status as 'published' | 'draft' | 'scheduled',
        published_at: data.published_at || undefined,
        scheduled_for: data.scheduled_for || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at,
        featured_image_url: data.featured_image_url || undefined,
        is_featured: data.is_featured,
        view_count: data.view_count
      };
      
      return { article, error: null };
    } catch (err: any) {
      console.error('Erreur lors du chargement de l\'article:', err);
      return { article: null, error: err.message || 'Une erreur est survenue' };
    }
  };

  const getArticle = async (id: string): Promise<Article | null> => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (!data) return null;
      
      // Convert to Article type
      const article: Article = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || undefined,
        author: data.author || undefined,
        status: data.status as 'published' | 'draft' | 'scheduled',
        published_at: data.published_at || undefined,
        scheduled_for: data.scheduled_for || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at,
        featured_image_url: data.featured_image_url || undefined,
        is_featured: data.is_featured || false,
        view_count: data.view_count,
        published: data.status === 'published',
        featured: data.is_featured || false,
        image_url: data.featured_image_url,
        categories: data.categories || [],
        tags: data.tags || []
      };
      
      return article;
    } catch (err) {
      console.error('Erreur lors du chargement de l\'article:', err);
      return null;
    }
  };

  const fetchArticleById = async (id: string): Promise<{ article: Article | null; error: string | null }> => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (!data) return { article: null, error: 'Article non trouvé' };

      const article: Article = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || undefined,
        author: undefined, // À implémenter si nécessaire
        status: data.status as 'published' | 'draft' | 'scheduled',
        published_at: data.published_at || undefined,
        scheduled_for: data.scheduled_for || undefined,
        created_at: data.created_at,
        updated_at: data.updated_at,
        featured_image_url: data.featured_image_url || undefined,
        is_featured: data.is_featured,
        view_count: data.view_count
      };
      
      return { article, error: null };
    } catch (err: any) {
      console.error('Erreur lors du chargement de l\'article:', err);
      return { article: null, error: err.message || 'Une erreur est survenue' };
    }
  };

  const createArticle = async (articleData: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .insert({
          title: articleData.title,
          slug: articleData.slug,
          content: articleData.content,
          excerpt: articleData.excerpt || null,
          status: articleData.status,
          published_at: articleData.published_at || null,
          scheduled_for: articleData.scheduled_for || null,
          featured_image_url: articleData.featured_image_url || null,
          is_featured: articleData.is_featured || false,
          // La valeur author_id sera remplacée par l'ID de l'utilisateur connecté
          author_id: (await supabaseBlog.auth.getUser()).data.user?.id || '',
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Mettre à jour la liste des articles si nécessaire
      return { success: true, data };
    } catch (err: any) {
      console.error('Erreur lors de la création de l\'article:', err);
      return { success: false, error: err.message };
    }
  };

  const updateArticle = async (id: string, articleData: Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      // Préparation des données à mettre à jour
      const updateData = {
        ...articleData,
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return { success: true, data };
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour de l\'article:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabaseBlog
        .from('bloghypnose_articles')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Mettre à jour la liste locale des articles
      setArticles(articles.filter(article => article.id !== id));
      
      return { success: true };
    } catch (err: any) {
      console.error('Erreur lors de la suppression de l\'article:', err);
      return { success: false, error: err.message };
    }
  };

  // Fonction pour générer un slug à partir d'un titre
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return {
    articles,
    loading,
    error,
    fetchArticles,
    fetchArticleBySlug,
    fetchArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    generateSlug,
    getArticle
  };
}
