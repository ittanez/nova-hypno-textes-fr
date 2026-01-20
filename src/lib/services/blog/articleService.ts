import { supabase } from '@/integrations/supabase/client';
import { Article, Category } from '@/lib/types/blog';
import { sanitizeData } from '@/lib/utils/textUtils';
import { notifySubscribersOfNewArticle } from './notificationService';
import { logger } from '@/lib/logger';

// Types pour les réponses d'API
interface ArticleResponse {
  data: Article | null;
  error: Error | null;
  redirect?: { from: string; to: string };
}

interface ArticlesResponse {
  data: Article[] | null;
  error: Error | null;
  count?: number;
}

interface CategoryResponse {
  data: Category | null;
  error: Error | null;
}

interface CategoriesResponse {
  data: Category[] | null;
  error: Error | null;
}

interface DeleteResponse {
  success: boolean;
  error: Error | null;
}

interface SlugResponse {
  slug: string | null;
  error: Error | null;
}

// Fonction pour synchroniser un article avec Firebase
const syncArticleToFirebase = async (article: Article): Promise<void> => {
  try {
    logger.debug('Déclenchement synchronisation Firebase pour article:', article.slug);

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      logger.warn('Variables Supabase non configurées pour Firebase sync');
      return;
    }

    // Appel de la nouvelle edge function to_firebase
    const response = await fetch(`${supabaseUrl}/functions/v1/to_firebase`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        article_id: article.id,
        // Données de fallback au cas où l'article ne serait pas trouvé
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || '',
        content: article.content || '',
        image_url: article.image_url || article.storage_image_url || '',
        published_at: article.created_at || new Date().toISOString(),
        read_time: article.read_time || 5,
        categories: article.categories || ['general'],
        tags: article.tags || [],
        author: article.author || 'Novahypnose',
        keywords: article.keywords || [],
        seo_description: article.seo_description || article.excerpt || '',
        featured: article.featured || false
      })
    });

    const result = await response.json() as { success?: boolean; message?: string; error?: string };

    if (response.ok && result.success) {
      logger.debug('Synchronisation Firebase réussie:', result.message);

      // Optionnel: Notification de succès
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('firebase-sync-success', {
          detail: { articleId: article.id, slug: article.slug, message: result.message }
        }));
      }
    } else {
      logger.warn('Échec synchronisation Firebase:', result.error || 'Erreur inconnue');

      // Optionnel: Notification d'erreur
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('firebase-sync-error', {
          detail: { articleId: article.id, error: result.error }
        }));
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    logger.warn('Erreur synchronisation Firebase:', errorMessage);

    // Ne pas faire échouer la sauvegarde si Firebase échoue
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('firebase-sync-error', {
        detail: { articleId: article.id, error: errorMessage }
      }));
    }
  }
};

// Fonction pour récupérer tous les articles avec pagination
export const getAllArticles = async (page: number = 1, pageSize: number = 10): Promise<ArticlesResponse & { count: number }> => {
  const startIndex = (page - 1) * pageSize;

  try {
    const { data, error, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + pageSize - 1);

    if (error) {
      throw error;
    }

    // Nettoyer les données avant de les retourner
    const sanitizedData = data ? data.map(article => sanitizeData(article) as Article) : null;
    return { data: sanitizedData, error: null, count: count || 0 };
  } catch (error) {
    logger.error("Erreur lors de la récupération des articles:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue'), count: 0 };
  }
};

// Fonction pour récupérer tous les articles sans pagination
export const getAllArticlesNoPagination = async (publishedOnly: boolean = true): Promise<ArticlesResponse> => {
  try {
    let query = supabase
      .from('articles')
      .select('id, title, slug, excerpt, image_url, storage_image_url, published_at, created_at, read_time, categories, tags, author, featured, published, scheduled_for, updated_at');

    // Filtrer seulement les articles publiés si demandé (pour le front)
    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { data: data as Article[], error: null };
  } catch (error) {
    logger.error("Erreur lors de la récupération des articles:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour récupérer un article par son ID
export const getArticleById = async (id: string): Promise<ArticleResponse> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return { data: data as Article, error: null };
  } catch (error) {
    logger.error("Erreur lors de la récupération de l'article:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour récupérer un article par son slug
export const getArticleBySlug = async (slug: string): Promise<ArticleResponse> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      // Vérifier si l'erreur est due à une redirection
      if (error.message.includes('redirect')) {
        const redirectSlug = error.message.split('redirect:')[1]?.trim();
        if (redirectSlug) {
          return { data: null, error: null, redirect: { from: slug, to: redirectSlug } };
        }
      }
      throw error;
    }

    return { data: data as Article, error: null };
  } catch (error) {
    logger.error("Erreur lors de la récupération de l'article:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour récupérer les articles populaires (par exemple, les plus récents)
export const getPopularArticles = async (limit: number = 3): Promise<ArticlesResponse> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return { data: data as Article[], error: null };
  } catch (error) {
    logger.error("Erreur lors de la récupération des articles populaires:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour récupérer les articles similaires (basé sur les tags ou catégories)
export const getRelatedArticles = async (articleId: string, limit: number = 3): Promise<ArticlesResponse> => {
  try {
    // Récupérer l'article actuel pour obtenir ses tags ou catégories
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('tags, categories')
      .eq('id', articleId)
      .single();

    if (articleError) {
      throw articleError;
    }

    if (!article) {
      return { data: [], error: null }; // Retourner un tableau vide si l'article n'est pas trouvé
    }

    // Utiliser les tags ou catégories de l'article actuel pour trouver des articles similaires
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .neq('id', articleId) // Exclure l'article actuel
      .overlaps('tags', article.tags || []) // Filtrer par tags similaires
      .limit(limit);

    if (error) {
      throw error;
    }

    return { data: data as Article[], error: null };
  } catch (error) {
    logger.error("Erreur lors de la récupération des articles similaires:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Helper pour notifier Google Search Console
const notifyGoogleSearchConsole = async (): Promise<void> => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    logger.warn('Variables Supabase non configurées pour Google notification');
    return;
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/notify-google-sitemap`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json() as { success?: boolean; message?: string };
    if (result.success) {
      logger.debug('Google Search Console notifié avec succès');
    } else {
      logger.warn('Google Search Console non notifié:', result.message);
    }
  } catch (error) {
    logger.warn('Erreur notification Google (non bloquant):', error);
  }
};

// Fonction pour sauvegarder un article (création ou mise à jour)
export const saveArticle = async (article: Partial<Article>): Promise<ArticleResponse> => {
  try {
    if (article.id) {
      // Mise à jour d'un article existant
      const { data, error } = await supabase
        .from('articles')
        .update({
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          image_url: article.image_url,
          published: article.published,
          tags: article.tags,
          keywords: article.keywords,
          seo_description: article.seo_description,
          meta_description: article.meta_description,
          read_time: article.read_time,
          author: article.author,
          featured: article.featured,
          storage_image_url: article.storage_image_url,
          categories: article.categories,
          scheduled_for: article.scheduled_for,
        })
        .eq('id', article.id)
        .select()
        .single();

      if (error) throw error;

      // Synchroniser avec Firebase si l'article est publié
      if (data && article.published) {
        await syncArticleToFirebase(data as Article);

        // Notifier les abonnés de la mise à jour si passage de brouillon à publié
        logger.debug('Vérification si notification nécessaire...');
        await notifySubscribersOfNewArticle(
          data.id,
          data.title,
          data.slug,
          data.excerpt
        );

        // Notifier Google Search Console du nouveau contenu
        logger.debug('Notification Google Search Console...');
        await notifyGoogleSearchConsole();
      }

      return { data: data as Article, error: null };
    } else {
      // Création d'un nouvel article
      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: article.title,
          slug: article.slug,
          content: article.content,
          excerpt: article.excerpt,
          image_url: article.image_url,
          published: article.published,
          tags: article.tags,
          keywords: article.keywords,
          seo_description: article.seo_description,
          meta_description: article.meta_description,
          read_time: article.read_time,
          author: article.author,
          featured: article.featured,
          storage_image_url: article.storage_image_url,
          categories: article.categories,
          scheduled_for: article.scheduled_for,
        })
        .select()
        .single();

      if (error) throw error;

      // Synchroniser avec Firebase et notifier si l'article est publié
      if (data && article.published) {
        await syncArticleToFirebase(data as Article);

        // Notifier les abonnés du nouvel article
        logger.debug('Notification des abonnés pour le nouvel article...');
        await notifySubscribersOfNewArticle(
          data.id,
          data.title,
          data.slug,
          data.excerpt
        );

        // Notifier Google Search Console du nouveau contenu
        logger.debug('Notification Google Search Console...');
        await notifyGoogleSearchConsole();
      }

      return { data: data as Article, error: null };
    }
  } catch (error) {
    logger.error('Erreur lors de la sauvegarde de l\'article:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour supprimer un article
export const deleteArticle = async (articleId: string): Promise<DeleteResponse> => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    logger.error('Erreur lors de la suppression de l\'article:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour générer un slug unique
export const generateUniqueSlug = async (title: string, existingId?: string): Promise<SlugResponse> => {
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  let count = 0;
  const originalSlug = slug;

  try {
    while (true) {
      const { data, error } = await supabase
        .from('articles')
        .select('id', { count: 'exact' })
        .eq('slug', slug);

      if (error) {
        logger.error("Erreur lors de la vérification du slug:", error);
        return { slug: null, error };
      }

      if (data && data.length === 0) {
        return { slug, error: null };
      }

      if (existingId && data && data.length === 1 && data[0].id === existingId) {
        return { slug, error: null };
      }

      count++;
      slug = `${originalSlug}-${count}`;
    }
  } catch (error) {
    logger.error("Erreur lors de la génération du slug unique:", error);
    return { slug: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction pour récupérer toutes les catégories
export const getAllCategories = async (): Promise<CategoriesResponse> => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      throw error;
    }

    return { data: data as Category[], error: null };
  } catch (error) {
    logger.error("Erreur lors de la récupération des catégories:", error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction saveCategory
export const saveCategory = async (category: Partial<Category>): Promise<CategoryResponse> => {
  try {
    if (category.id) {
      // Mise à jour d'une catégorie existante
      const { data, error } = await supabase
        .from('categories')
        .update({
          name: category.name,
          slug: category.slug,
          description: category.description,
          parent_id: category.parent_id
        })
        .eq('id', category.id)
        .select()
        .single();

      if (error) throw error;
      return { data: data as Category, error: null };
    } else {
      // Création d'une nouvelle catégorie
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: category.name,
          slug: category.slug,
          description: category.description,
          parent_id: category.parent_id
        })
        .select()
        .single();

      if (error) throw error;
      return { data: data as Category, error: null };
    }
  } catch (error) {
    logger.error('Erreur lors de la sauvegarde de la catégorie:', error);
    return { data: null, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};

// Fonction deleteCategory
export const deleteCategory = async (categoryId: string): Promise<DeleteResponse> => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) throw error;
    return { success: true, error: null };
  } catch (error) {
    logger.error('Erreur lors de la suppression de la catégorie:', error);
    return { success: false, error: error instanceof Error ? error : new Error('Erreur inconnue') };
  }
};
