
import { useState, useEffect, useCallback } from 'react';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { Category } from '@/types/blog';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setCategories(data || []);
    } catch (err: any) {
      console.error('Erreur lors du chargement des catégories:', err);
      setError(err.message || 'Erreur lors du chargement des catégories');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_categories')
        .insert(category)
        .select()
        .single();
        
      if (error) throw error;
      
      setCategories([...categories, data]);
      return { success: true, data };
    } catch (err: any) {
      console.error('Erreur lors de la création de la catégorie:', err);
      return { success: false, error: err.message };
    }
  };

  const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setCategories(categories.map(c => c.id === id ? data : c));
      return { success: true, data };
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour de la catégorie:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabaseBlog
        .from('bloghypnose_categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setCategories(categories.filter(c => c.id !== id));
      return { success: true };
    } catch (err: any) {
      console.error('Erreur lors de la suppression de la catégorie:', err);
      return { success: false, error: err.message };
    }
  };

  // Charger les catégories au montage du composant
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
}
