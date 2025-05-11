
import { useState, useEffect, useCallback } from 'react';
import { supabaseBlog } from '@/integrations/supabase/blog-client';
import { Tag } from '@/types/blog';

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_tags')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setTags(data || []);
    } catch (err: any) {
      console.error('Erreur lors du chargement des tags:', err);
      setError(err.message || 'Erreur lors du chargement des tags');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTag = async (tag: Omit<Tag, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_tags')
        .insert(tag)
        .select()
        .single();
        
      if (error) throw error;
      
      setTags([...tags, data]);
      return { success: true, data };
    } catch (err: any) {
      console.error('Erreur lors de la création du tag:', err);
      return { success: false, error: err.message };
    }
  };

  const updateTag = async (id: string, tag: Partial<Omit<Tag, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { data, error } = await supabaseBlog
        .from('bloghypnose_tags')
        .update(tag)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setTags(tags.map(t => t.id === id ? data : t));
      return { success: true, data };
    } catch (err: any) {
      console.error('Erreur lors de la mise à jour du tag:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteTag = async (id: string) => {
    try {
      const { error } = await supabaseBlog
        .from('bloghypnose_tags')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setTags(tags.filter(t => t.id !== id));
      return { success: true };
    } catch (err: any) {
      console.error('Erreur lors de la suppression du tag:', err);
      return { success: false, error: err.message };
    }
  };

  // Charger les tags au montage du composant
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return {
    tags,
    loading,
    error,
    fetchTags,
    createTag,
    updateTag,
    deleteTag
  };
}
