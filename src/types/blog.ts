
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured: boolean | null;
  published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  author: string | null;
  categories: string[] | null;
  tags: string[] | null;
  image_url: string | null;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string | null;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string | null;
}

export interface BlogImage {
  id: string;
  name: string;
  public_url: string;
  storage_path: string;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  size: number | null;
  description: string | null;
  uploaded_at: string | null;
}

export interface AdminRequestForm {
  fullName: string;
  reason: string;
}

// Type alias for backward compatibility
export type Image = BlogImage;
