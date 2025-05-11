
// Types pour la base de données BlogHypnose
// Ces types seront générés automatiquement via supabase-cli
// Voici une version simplifiée pour commencer

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
      // Autres tables ajoutées au besoin...
    };
  };
}
