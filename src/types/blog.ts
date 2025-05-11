
export interface BlogImage {
  id: string;
  name: string;
  url: string;
  storage_path: string;
  public_url: string;
  size?: number;
  created_at: string;
  width?: number;
  height?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author?: string;
  status: 'published' | 'draft' | 'scheduled';
  published_at?: string;
  scheduled_for?: string;
  created_at: string;
  updated_at: string;
  featured_image_url?: string;
  categories?: string[];
  tags?: string[];
  view_count?: number;
  is_featured?: boolean;
  image_url?: string;
  published?: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ArticleWithRelations extends Article {
  categoryObjects?: Category[];
  tagObjects?: Tag[];
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  author?: string;
}

export type SortDirection = 'asc' | 'desc';
