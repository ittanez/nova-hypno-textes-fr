
import { useState } from 'react';
import { Category } from '@/types/blog';

// Simplified placeholder hook with no actual functionality
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simplified placeholder functions
  const fetchCategories = async () => {
    return [];
  };

  const createCategory = async (category: Partial<Category>) => {
    return { error: null, data: null };
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    return { error: null };
  };

  const deleteCategory = async (id: string) => {
    return { error: null };
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
