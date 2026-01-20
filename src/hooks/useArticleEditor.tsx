import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Article } from "@/lib/types/blog";
import { saveArticle, generateUniqueSlug, getArticleById } from "@/lib/services/blog/articleService";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

type PublishMode = "draft" | "publish" | "schedule";

export const useArticleEditor = () => {
  const { id } = useParams();
  const location = useLocation();
  const isNewArticle = location.pathname.includes('/article/new');
  const isEditing = !isNewArticle && !!id;
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  logger.debug('useArticleEditor - id:', { id, isNewArticle, isEditing });

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [article, setArticle] = useState<Partial<Article>>({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    published: false,
    categories: [],
    slug: "",
    tags: [],
    keywords: [],
    seo_description: "",
    meta_description: "",
    read_time: 1,
    author: "",
    featured: false,
    storage_image_url: "",
  });
  const [publishMode, setPublishMode] = useState<PublishMode>("draft");

  useEffect(() => {
    if (isAdmin === false) {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!isEditing || !id) {
        logger.debug('fetchArticle: pas d\'édition ou pas d\'ID', { isEditing, id });
        return;
      }

      try {
        logger.debug('fetchArticle: début du chargement pour ID:', id);
        setIsLoading(true);

        const { data, error } = await getArticleById(id);

        logger.debug('getArticleById résultat:', { hasData: !!data, error: error?.message });

        if (error) {
          logger.error('Erreur Supabase:', error);
          throw error;
        }

        if (!data) {
          logger.error('Article non trouvé pour ID:', id);
          throw new Error(`Article non trouvé pour l'ID: ${id}`);
        }

        logger.debug("Article récupéré:", data.title);
        setArticle(data);

        if (data.scheduled_for) {
          setPublishMode("schedule");
          setScheduledDate(new Date(data.scheduled_for));
        } else if (data.published) {
          setPublishMode("publish");
        } else {
          setPublishMode("draft");
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        logger.error("Erreur lors de la récupération de l'article:", error);
        toast({
          title: "Erreur de chargement",
          description: errorMessage || "Impossible de charger l'article. Vérifiez que l'ID est correct.",
          variant: "destructive"
        });
        // Redirection après 2 secondes pour laisser le temps de voir l'erreur
        setTimeout(() => navigate('/admin-blog/articles'), 2000);
      } finally {
        logger.debug('fetchArticle: fin du chargement');
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, isEditing, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setArticle(prev => ({ ...prev, content }));

    if (!article.excerpt || article.excerpt === "") {
      const plainText = content.replace(/<[^>]*>/g, '');
      const excerpt = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      setArticle(prev => ({ ...prev, excerpt }));
    }

    if (!article.seo_description || article.seo_description === "") {
      const plainText = content.replace(/<[^>]*>/g, '');
      const seoDescription = plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
      setArticle(prev => ({ ...prev, seo_description: seoDescription }));
    }

    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    setArticle(prev => ({ ...prev, read_time: readTime }));

    if (!article.keywords || article.keywords.length === 0) {
      const plainText = content.replace(/<[^>]*>/g, '');
      const words = plainText.toLowerCase().split(/\s+/);
      const commonWords = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'et', 'ou', 'mais', 'donc', 'car', 'de', 'à', 'au', 'aux', 'en', 'dans', 'sur', 'pour', 'par', 'avec', 'sans']);
      const frequency: Record<string, number> = {};

      words.forEach(word => {
        if (word.length > 3 && !commonWords.has(word)) {
          frequency[word] = (frequency[word] || 0) + 1;
        }
      });

      const potentialKeywords = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);

      if (potentialKeywords.length > 0) {
        setArticle(prev => ({ ...prev, keywords: potentialKeywords }));
      }
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setArticle(prev => ({ ...prev, tags }));
  };

  const handleKeywordsChange = (keywords: string[]) => {
    setArticle(prev => ({ ...prev, keywords }));
  };

  const handlePublishModeChange = (mode: PublishMode) => {
    logger.debug("Changement de mode de publication:", mode);
    setPublishMode(mode);

    if (mode === "publish") {
      setArticle(prev => ({
        ...prev,
        published: true,
        scheduled_for: undefined
      }));
    } else if (mode === "draft") {
      setArticle(prev => ({
        ...prev,
        published: false,
        scheduled_for: undefined
      }));
    } else if (mode === "schedule") {
      setArticle(prev => ({
        ...prev,
        published: false,
        scheduled_for: scheduledDate ? scheduledDate.toISOString() : undefined
      }));
    }
  };

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setArticle(prev => ({ ...prev, title: newTitle }));

    if (!article.slug || article.slug === "") {
      const { slug: newSlug } = await generateUniqueSlug(newTitle, article.id);
      if (newSlug) {
        setArticle(prev => ({ ...prev, slug: newSlug }));
      }
    }
  };

  const handleCategoriesChange = (categories: string[]) => {
    logger.debug("Nouvelles catégories sélectionnées:", categories);
    setArticle(prev => ({ ...prev, categories }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "L'image ne peut pas dépasser 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploadingImage(true);

    try {
      logger.debug('Upload vers Supabase Storage...');

      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);

      const baseName = article.title
        ? article.title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 30)
        : 'article';

      const fileName = `${baseName}-${timestamp}-${random}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from('blog_images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        logger.error('Erreur upload:', uploadError);
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('blog_images')
        .getPublicUrl(fileName);

      logger.debug('Image uploadée:', urlData.publicUrl);

      setArticle(prev => ({
        ...prev,
        image_url: urlData.publicUrl,
        storage_image_url: urlData.publicUrl
      }));

      if (isEditing && article.id) {
        try {
          const { error: updateError } = await supabase
            .from('articles')
            .update({
              image_url: urlData.publicUrl,
              storage_image_url: urlData.publicUrl
            })
            .eq('id', article.id);

          if (updateError) {
            logger.warn('Erreur mise à jour DB (non critique):', updateError);
          } else {
            logger.debug('Base de données mise à jour');
          }
        } catch (dbError) {
          logger.warn('Erreur DB non critique:', dbError);
        }
      }

      toast({
        title: "Succès",
        description: "Image uploadée avec succès"
      });

    } catch (error) {
      logger.error('Erreur handleImageUpload:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de l'image",
        variant: "destructive"
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleScheduledDateChange = (date: Date | undefined) => {
    setScheduledDate(date);
    if (date && publishMode === "schedule") {
      setArticle(prev => ({
        ...prev,
        scheduled_for: date.toISOString()
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!article.title || !article.content) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);

      const articleToSave: Partial<Article> = {
        ...article,
        meta_description: article.seo_description || article.meta_description || "",
        author: article.author || user?.email || 'Admin',
        featured: article.featured || false,
        read_time: article.read_time || 1,
        storage_image_url: article.storage_image_url || article.image_url || "",
      };

      if (publishMode === "schedule" && scheduledDate) {
        articleToSave.scheduled_for = scheduledDate.toISOString();
        articleToSave.published = false;
      } else if (publishMode === "publish") {
        articleToSave.published = true;
        articleToSave.scheduled_for = undefined;
      } else {
        articleToSave.published = false;
        articleToSave.scheduled_for = undefined;
      }

      logger.debug("Sauvegarde de l'article avec mode:", publishMode);
      logger.debug("Article à sauvegarder:", articleToSave);

      const { data, error } = await saveArticle(articleToSave);

      if (error) throw error;
      if (!data) throw new Error("Aucune donnée n'a été retournée lors de l'enregistrement");

      let successMessage = "";
      let description = "";

      if (publishMode === "draft") {
        successMessage = "Article enregistré comme brouillon";
        description = "L'article a été sauvegardé et pourra être publié plus tard.";
      } else if (publishMode === "schedule") {
        successMessage = "Article programmé avec succès";
        description = `L'article sera publié automatiquement le ${scheduledDate?.toLocaleDateString()}.`;
      } else {
        successMessage = "Article publié avec succès";
        description = "L'article est maintenant visible publiquement.";
      }

      toast({
        title: successMessage,
        description
      });

      navigate('/admin-blog/articles');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      logger.error("Erreur lors de la sauvegarde de l'article:", error);
      toast({
        title: "Erreur",
        description: errorMessage || "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getTagsForPreview = (): string[] => {
    return article.tags || [];
  };

  return {
    isEditing,
    isLoading,
    isSaving,
    showPreview,
    setShowPreview,
    scheduledDate,
    article,
    publishMode,
    isUploadingImage,
    handleChange,
    handleContentChange,
    handleTagsChange,
    handleKeywordsChange,
    handlePublishModeChange,
    handleTitleChange,
    handleCategoriesChange,
    handleImageUpload,
    handleScheduledDateChange,
    handleSubmit,
    getTagsForPreview,
  };
};
