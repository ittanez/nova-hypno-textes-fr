
import { useState } from 'react';
import { BlogImage } from '@/types/blog';

// Simplified placeholder hook with no actual functionality
export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, name?: string, description?: string) => {
    // Return a mock BlogImage object to satisfy TypeScript
    const mockImage: BlogImage = {
      id: 'mock-id-' + Date.now(),
      name: name || file.name,
      storage_path: 'mock-path/' + file.name,
      public_url: URL.createObjectURL(file),
      width: 800,
      height: 600,
      size: file.size,
      mime_type: file.type,
      description: description,
      uploaded_at: new Date().toISOString()
    };
    return mockImage;
  };

  return {
    uploading,
    error,
    uploadImage
  };
};
