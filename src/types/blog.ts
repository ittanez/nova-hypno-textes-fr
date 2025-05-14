
// Minimal placeholder types to fix build errors
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories: string[];
  tags: string[];
  image_url?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogImage {
  id: string;
  name: string;
  storage_path: string;
  public_url: string;
  width?: number;
  height?: number;
  size?: number;
  mime_type?: string;
  description?: string;
}

// Use the same name as the simpler interface to avoid conflicts
export interface Image {
  id: string;
  name: string;
  url: string;
  public_url: string;
  width?: number;
  height?: number;
  storage_path: string;
  created_at: string;
}
