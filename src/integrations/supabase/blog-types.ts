
// Types pour la base de données BlogHypnose
// Ces types sont basés sur le schéma que nous venons de créer

export interface BlogDatabase {
  public: {
    Tables: {
      bloghypnose_articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          featured_image_url: string | null;
          author_id: string;
          status: string;
          published_at: string | null;
          scheduled_for: string | null;
          created_at: string;
          updated_at: string;
          view_count: number | null;
          seo_title: string | null;
          seo_description: string | null;
          is_featured: boolean | null;
          reading_time_minutes: number | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          featured_image_url?: string | null;
          author_id: string;
          status?: string;
          published_at?: string | null;
          scheduled_for?: string | null;
          created_at?: string;
          updated_at?: string;
          view_count?: number | null;
          seo_title?: string | null;
          seo_description?: string | null;
          is_featured?: boolean | null;
          reading_time_minutes?: number | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          featured_image_url?: string | null;
          author_id?: string;
          status?: string;
          published_at?: string | null;
          scheduled_for?: string | null;
          created_at?: string;
          updated_at?: string;
          view_count?: number | null;
          seo_title?: string | null;
          seo_description?: string | null;
          is_featured?: boolean | null;
          reading_time_minutes?: number | null;
        };
      };
      bloghypnose_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          parent_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      bloghypnose_tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      bloghypnose_article_categories: {
        Row: {
          article_id: string;
          category_id: string;
        };
        Insert: {
          article_id: string;
          category_id: string;
        };
        Update: {
          article_id?: string;
          category_id?: string;
        };
      };
      bloghypnose_article_tags: {
        Row: {
          article_id: string;
          tag_id: string;
        };
        Insert: {
          article_id: string;
          tag_id: string;
        };
        Update: {
          article_id?: string;
          tag_id?: string;
        };
      };
      bloghypnose_images: {
        Row: {
          id: string;
          filename: string;
          storage_path: string;
          public_url: string;
          alt_text: string | null;
          width: number | null;
          height: number | null;
          size_bytes: number | null;
          mime_type: string | null;
          uploaded_by_user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          storage_path: string;
          public_url: string;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          size_bytes?: number | null;
          mime_type?: string | null;
          uploaded_by_user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          storage_path?: string;
          public_url?: string;
          alt_text?: string | null;
          width?: number | null;
          height?: number | null;
          size_bytes?: number | null;
          mime_type?: string | null;
          uploaded_by_user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      bloghypnose_article_images: {
        Row: {
          article_id: string;
          image_id: string;
        };
        Insert: {
          article_id: string;
          image_id: string;
        };
        Update: {
          article_id?: string;
          image_id?: string;
        };
      };
      bloghypnose_user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: string;
          created_at?: string;
        };
      };
    };
    Functions: {
      is_bloghypnose_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
    };
  };
};
