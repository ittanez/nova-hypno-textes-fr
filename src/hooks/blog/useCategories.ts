
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types/blog';

export function useCategories() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setCategories(data as Category[]);
    } catch (error: any) {
      console.error('Error fetching categories:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les catégories',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      
      await fetchCategories(); // Re-fetch to ensure we have the latest data
      return data;
    } catch (error: any) {
      console.error('Error creating category:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de créer la catégorie: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchCategories(); // Re-fetch to ensure we have the latest data
      return data;
    } catch (error: any) {
      console.error('Error updating category:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de mettre à jour la catégorie: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories(); // Re-fetch to ensure we have the latest data
      return true;
    } catch (error: any) {
      console.error('Error deleting category:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer la catégorie: ${error.message}`,
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
