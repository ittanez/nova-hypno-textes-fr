
export interface Article {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  excerpt?: string;
  author?: string;
  categories: string[];
  tags: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogImage {
  id: string;
  name: string;
  description?: string;
  storage_path: string;
  public_url: string;
  width?: number;
  height?: number;
  size?: number;
  mime_type?: string;
  uploaded_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

export type SortDirection = 'desc' | 'asc';

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  sortBy?: 'created_at' | 'title';
  sortDirection?: SortDirection;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
