
import { useState } from 'react';
import { Tag } from '@/types/blog';

// Simplified placeholder hook with no actual functionality
export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    return [];
  };

  const createTag = async (tag: Partial<Tag>) => {
    return { error: null, data: null };
  };

  const deleteTag = async (id: string) => {
    return { error: null };
  };

  return {
    tags,
    loading,
    error,
    fetchTags,
    createTag,
    deleteTag
  };
};
