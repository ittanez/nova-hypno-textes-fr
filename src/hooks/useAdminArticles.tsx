import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Article } from "@/lib/types/blog";
import { getAllArticlesNoPagination, getAllCategories, deleteArticle } from "@/lib/services/blog/articleService";
import { logger } from '@/lib/logger';

type SortField = 'title' | 'created_at' | 'published_at' | 'status';
type SortDirection = 'asc' | 'desc';

export const useAdminArticles = () => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filters, setFilters] = useState({ search: '', category: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const articlesPerPage = 10;

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await getAllCategories();
        if (error) throw error;
        if (data) {
          setCategories(data);
        }
      } catch (error: unknown) {
        logger.error("Erreur lors de la recuperation des categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Charger TOUS les articles (pas de pagination côté serveur)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        logger.debug("Recuperation de tous les articles pour l'admin...");

        // Charger TOUS les articles sans pagination (y compris brouillons)
        const { data, error } = await getAllArticlesNoPagination(false);

        if (error) {
          logger.error("Erreur lors de la recuperation des articles:", error);
          throw error;
        }

        logger.debug("Articles recuperes pour l'admin:", data?.length || 0);

        if (data) {
          setAllArticles(data);
          setTotalCount(data.length);
        } else {
          setAllArticles([]);
          setTotalCount(0);
        }
      } catch (error: unknown) {
        logger.error("Erreur lors de la recuperation des articles:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les articles",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrer et trier les articles côté client
  useEffect(() => {
    let filtered = allArticles;

    // Filtrage par recherche
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(query))
      );
    }

    // Filtrage par catégorie
    if (filters.category) {
      filtered = filtered.filter(article =>
        article.categories && article.categories.includes(filters.category)
      );
    }

    // Tri
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'published_at': {
          const dateA = a.published_at ? new Date(a.published_at).getTime() : 0;
          const dateB = b.published_at ? new Date(b.published_at).getTime() : 0;
          comparison = dateA - dateB;
          break;
        }
        case 'status': {
          // Ordre: Programmé > Brouillon > Publié
          const getStatus = (article: Article) => {
            if (article.scheduled_for && new Date(article.scheduled_for) > new Date()) return 0;
            if (!article.published) return 1;
            return 2;
          };
          comparison = getStatus(a) - getStatus(b);
          break;
        }
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setArticles(sorted);
    setTotalPages(Math.ceil(sorted.length / articlesPerPage));
  }, [allArticles, filters, sortField, sortDirection, articlesPerPage]);

  const handleFiltersChange = (newFilters: { search: string; category: string }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to desc for dates, asc for title
      setSortField(field);
      setSortDirection(field === 'title' ? 'asc' : 'desc');
    }
    setCurrentPage(1);
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedArticle) return;

    try {
      setIsLoading(true);
      logger.debug("Suppression de l'article:", selectedArticle.id);

      // Appeler la fonction de suppression de la base de données
      const { success, error } = await deleteArticle(selectedArticle.id);

      if (error || !success) {
        throw error || new Error("Échec de la suppression");
      }

      // Retirer l'article de l'état local après suppression réussie
      setAllArticles(allArticles.filter(a => a.id !== selectedArticle.id));

      toast({
        title: "Succès",
        description: "Article supprimé avec succès"
      });

    } catch (error: unknown) {
      logger.error("Erreur lors de la suppression de l'article:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedArticle(null);
      setIsLoading(false);
    }
  };

  // Obtenir les articles de la page actuelle
  const getPaginatedArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return articles.slice(startIndex, endIndex);
  };

  return {
    articles: getPaginatedArticles(),
    allArticlesCount: articles.length,
    categories,
    isLoading,
    deleteDialogOpen,
    selectedArticle,
    filters,
    currentPage,
    totalPages,
    totalCount,
    sortField,
    sortDirection,
    articlesPerPage,
    setDeleteDialogOpen,
    handleFiltersChange,
    handlePageChange,
    handleSort,
    handleDeleteClick,
    confirmDelete
  };
};
