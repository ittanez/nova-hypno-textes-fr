
// Hook de gestion des articles avec pagination et optimisations
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabaseBlog } from '@/integrations/supabase/blog-client';

// Types
export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_id: string;
  status: string;
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  view_count: number | null;
  is_featured: boolean | null;
  reading_time_minutes: number | null;
  categories?: string[];
  tags?: string[];
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  status?: 'published' | 'draft' | 'scheduled';
  sortBy?: keyof BlogArticle;
  sortDirection?: 'asc' | 'desc';
}

export interface BlogPaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export function useBlogArticles(filters?: BlogFilters, initialPagination?: Partial<BlogPaginationState>) {
  const { toast } = useToast();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<BlogPaginationState>({
    page: initialPagination?.page || 1,
    pageSize: initialPagination?.pageSize || 10,
    total: initialPagination?.total || 0,
  });

  // Utilisation de useEffect pour charger les articles lorsque les filtres ou la pagination changent
  useEffect(() => {
    fetchArticles();
  }, [
    pagination.page, 
    pagination.pageSize, 
    filters?.category, 
    filters?.tag, 
    filters?.search, 
    filters?.status,
    filters?.sortBy,
    filters?.sortDirection
  ]);

  // Fonction pour récupérer les articles avec pagination et filtres
  const fetchArticles = async () => {
    setLoading(true);
    try {
      // Construction de la requête de base
      let query = supabaseBlog
        .from('bloghypnose_articles')
        .select('*', { count: 'exact' });
      
      // Application des filtres
      if (filters) {
        // Filtre par catégorie
        if (filters.category) {
          const { data: categoryArticles } = await supabaseBlog
            .from('bloghypnose_article_categories')
            .select('article_id')
            .eq('category_id', filters.category);
          
          if (categoryArticles && categoryArticles.length > 0) {
            const articleIds = categoryArticles.map(item => item.article_id);
            query = query.in('id', articleIds);
          } else {
            // Aucun article dans cette catégorie
            setArticles([]);
            setPagination({ ...pagination, total: 0 });
            setLoading(false);
            return;
          }
        }
        
        // Filtre par tag
        if (filters.tag) {
          const { data: tagArticles } = await supabaseBlog
            .from('bloghypnose_article_tags')
            .select('article_id')
            .eq('tag_id', filters.tag);
          
          if (tagArticles && tagArticles.length > 0) {
            const articleIds = tagArticles.map(item => item.article_id);
            query = query.in('id', articleIds);
          } else {
            // Aucun article avec ce tag
            setArticles([]);
            setPagination({ ...pagination, total: 0 });
            setLoading(false);
            return;
          }
        }
        
        // Filtre par recherche textuelle
        if (filters.search) {
          // Utilisation de l'API de recherche plein texte
          query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
        }
        
        // Filtre par statut
        if (filters.status) {
          query = query.eq('status', filters.status);
          
          // Si le statut est "published", s'assurer que la date de publication est passée
          if (filters.status === 'published') {
            query = query.or('published_at.is.null,published_at.lte.now()');
          }
          
          // Si le statut est "scheduled", s'assurer que la date de publication est future
          if (filters.status === 'scheduled') {
            query = query.gt('scheduled_for', new Date().toISOString());
          }
        }
      }

      // Tri par défaut ou selon les filtres
      const sortBy = filters?.sortBy || 'created_at';
      const sortDirection = filters?.sortDirection || 'desc';
      query = query.order(sortBy, { ascending: sortDirection === 'asc' });
      
      // Pagination optimisée - utiliser des plages pour éviter les problèmes de performance avec offset
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);

      // Exécution de la requête
      const { data, error, count } = await query;

      if (error) throw error;
      
      // Mise à jour du state avec les articles récupérés
      setArticles(data as BlogArticle[]);
      setPagination({ ...pagination, total: count || 0 });
    } catch (error: any) {
      console.error('Erreur lors du chargement des articles:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les articles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer un article par son ID
  const getArticle = async (id: string): Promise<BlogArticle | null> => {
    try {
      // Récupération de l'article
      const { data: article, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      // Récupération des catégories associées
      const { data: categories } = await supabaseBlog
        .from('bloghypnose_article_categories')
        .select('category_id')
        .eq('article_id', id);
      
      // Récupération des tags associés
      const { data: tags } = await supabaseBlog
        .from('bloghypnose_article_tags')
        .select('tag_id')
        .eq('article_id', id);
      
      // Retourne l'article enrichi avec ses catégories et tags
      return {
        ...article,
        categories: categories?.map(c => c.category_id) || [],
        tags: tags?.map(t => t.tag_id) || []
      } as BlogArticle;
    } catch (error: any) {
      console.error('Erreur lors du chargement de l\'article:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger l\'article',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Fonction pour récupérer un article par son slug (pour l'interface publique)
  const getArticleBySlug = async (slug: string): Promise<BlogArticle | null> => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .or('published_at.is.null,published_at.lte.now()')
        .maybeSingle();

      if (error) throw error;
      
      if (!data) return null;
      
      // Incrémenter le compteur de vues
      await supabaseBlog
        .from('bloghypnose_articles')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
      
      return data as BlogArticle;
    } catch (error: any) {
      console.error('Erreur lors du chargement de l\'article:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger l\'article',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Fonction pour créer un nouvel article
  const createArticle = async (article: Omit<BlogArticle, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Ajout de l'article dans la base de données
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      
      // Mise à jour de la liste des articles
      setArticles([data as BlogArticle, ...articles]);
      
      // Notification de succès
      toast({
        title: 'Article créé',
        description: 'L\'article a été créé avec succès',
      });
      
      return data;
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de créer l'article: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  // Fonction pour mettre à jour un article existant
  const updateArticle = async (id: string, article: Partial<BlogArticle>) => {
    try {
      // Mise à jour de l'article dans la base de données
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .update(article)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      // Mise à jour de la liste des articles
      setArticles(articles.map(a => a.id === id ? { ...a, ...data } as BlogArticle : a));
      
      // Notification de succès
      toast({
        title: 'Article mis à jour',
        description: 'L\'article a été mis à jour avec succès',
      });
      
      return data;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de l\'article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de mettre à jour l'article: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  // Fonction pour supprimer un article
  const deleteArticle = async (id: string) => {
    try {
      // Suppression de l'article de la base de données
      const { error } = await supabaseBlog
        .from('bloghypnose_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Mise à jour de la liste des articles
      setArticles(articles.filter(a => a.id !== id));
      
      // Notification de succès
      toast({
        title: 'Article supprimé',
        description: 'L\'article a été supprimé avec succès',
      });
      
      return true;
    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'article:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer l'article: ${error.message}`,
        variant: 'destructive',
      });
      return false;
    }
  };

  // Fonction pour changer de page
  const changePage = (page: number) => {
    setPagination({ ...pagination, page });
  };

  // Fonction pour changer le nombre d'éléments par page
  const changePageSize = (pageSize: number) => {
    setPagination({ ...pagination, pageSize, page: 1 });
  };

  // Fonction pour récupérer les articles en vedette (pour la page d'accueil)
  const getFeaturedArticles = async (limit = 3) => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_articles')
        .select('*')
        .eq('status', 'published')
        .eq('is_featured', true)
        .or('published_at.is.null,published_at.lte.now()')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data as BlogArticle[];
    } catch (error) {
      console.error('Erreur lors du chargement des articles en vedette:', error);
      return [];
    }
  };

  return {
    articles,
    loading,
    pagination,
    fetchArticles,
    getArticle,
    getArticleBySlug,
    createArticle,
    updateArticle,
    deleteArticle,
    changePage,
    changePageSize,
    getFeaturedArticles
  };
}
