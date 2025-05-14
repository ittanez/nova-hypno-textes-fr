
import { useState } from 'react';
import { Image } from '@/types/blog';

// Simplified placeholder hook with no actual functionality
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    return {
      url: '',
      error: null
    };
  };

  return {
    uploading,
    error,
    uploadImage
  };
};
