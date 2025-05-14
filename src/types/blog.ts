
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
  image_url?: string; // Added to fix ArticleForm errors
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

export interface Image {
  id: string;
  name: string;
  url: string;
  created_at: string;
}
