
import { useState } from 'react';
import { Article } from '@/types/blog';

// Simplified placeholder hook with no actual functionality
export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Simplified placeholder functions
  const fetchArticles = async () => {
    return [] as Article[];
  };
  
  const getArticle = async (id: string) => {
    return null;
  };
  
  const createArticle = async (article: Partial<Article>) => {
    return { error: null };
  };
  
  const updateArticle = async (id: string, article: Partial<Article>) => {
    return { error: null };
  };
  
  const deleteArticle = async (id: string) => {
    return { error: null };
  };
  
  return {
    articles,
    loading,
    error,
    fetchArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
  };
};
