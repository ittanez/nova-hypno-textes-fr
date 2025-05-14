
// Basic blog related types

export interface Article {
  id: string;
  title: string;
  content: string;
  slug?: string;
  status?: 'draft' | 'published';
  excerpt?: string;
  author?: string;
  featured_image_url?: string;
  categories?: string[];
  tags?: string[];
  published?: boolean;
  featured?: boolean;
  created_at: string;
  updated_at?: string;
  scheduled_for?: string;
}

export interface ArticleWithRelations extends Article {
  categoryObjects?: Category[];
  tagObjects?: Tag[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogImage {
  id: string;
  name: string;
  url: string;
  public_url: string;
  storage_path: string;
  size: number;
  width?: number;
  height?: number;
  created_at?: string;
}
