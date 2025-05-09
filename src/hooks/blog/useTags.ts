
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tag } from '@/types/blog';

export function useTags() {
  const { toast } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setTags(data as Tag[]);
    } catch (error: any) {
      console.error('Error fetching tags:', error.message);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les tags',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createTag = async (tag: { name: string; slug: string }) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert(tag)
        .select()
        .single();

      if (error) throw error;
      
      await fetchTags(); // Re-fetch to ensure we have the latest data
      return data;
    } catch (error: any) {
      console.error('Error creating tag:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de créer le tag: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateTag = async (id: string, tag: Partial<Tag>) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .update(tag)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchTags(); // Re-fetch to ensure we have the latest data
      return data;
    } catch (error: any) {
      console.error('Error updating tag:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de mettre à jour le tag: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteTag = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchTags(); // Re-fetch to ensure we have the latest data
      return true;
    } catch (error: any) {
      console.error('Error deleting tag:', error.message);
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer le tag: ${error.message}`,
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    tags,
    loading,
    fetchTags,
    createTag,
    updateTag,
    deleteTag,
  };
}
