import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/blog/NewsletterForm";
import SEOHead from "@/components/blog/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Facebook from 'lucide-react/dist/esm/icons/facebook';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Link2 from 'lucide-react/dist/esm/icons/link-2';
import Share2 from 'lucide-react/dist/esm/icons/share-2';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Edit from 'lucide-react/dist/esm/icons/edit';
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Breadcrumb from "@/components/blog/Breadcrumb";
import { toast } from "@/hooks/use-toast";
import { getArticleBySlug, getAllArticlesNoPagination, getAllCategories } from "@/lib/services/blog/articleService";
import { Article, Category } from "@/lib/types/blog";
import { parseMarkdownToHtml } from "@/utils/markdownParser";
import { logger } from "@/lib/logger";

// ✅ FONCTION POUR OBTENIR LES ARTICLES ADJACENTS
const getAdjacentArticles = (currentArticle: Article, allArticles: Article[]) => {
  const publishedArticles = allArticles
    .filter(a => a.published)
    .sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
  
  const currentIndex = publishedArticles.findIndex(a => a.id === currentArticle.id);
  
  return {
    previousArticle: currentIndex > 0 ? publishedArticles[currentIndex - 1] : null,
    nextArticle: currentIndex < publishedArticles.length - 1 ? publishedArticles[currentIndex + 1] : null
  };
};

// Type pour les tags qui peuvent avoir différents formats
type TagInput = string | string[] | { name: string }[] | null | undefined;

// Fonction de parsing des tags robuste
const parseTagsForDisplay = (tags: TagInput): string[] => {
  if (!tags) return [];

  if (Array.isArray(tags) && tags.every(tag => typeof tag === 'string')) {
    return tags as string[];
  }

  if (Array.isArray(tags)) {
    return tags.map(tag => {
      if (typeof tag === 'string') return tag;
      if (tag && typeof tag === 'object' && 'name' in tag) return tag.name;
      return null;
    }).filter((tag): tag is string => tag !== null);
  }

  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map(tag => {
          if (typeof tag === 'string') return tag;
          if (tag && typeof tag === 'object' && tag !== null && 'name' in tag) return (tag as { name: string }).name;
          return null;
        }).filter((tag): tag is string => tag !== null);
      }
    } catch {
      return [tags];
    }
  }

  return [];
};

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ✅ DÉTECTION DU DOMAINE POUR GESTION DU CONTENU DUPLIQUÉ
  const isEmergencesDomain = window.location.hostname === 'emergences.novahypnose.fr';
  const canonicalBaseUrl = 'https://novahypnose.fr';

  // ✅ CONSTRUIRE L'URL CANONIQUE DE L'ARTICLE
  const getCanonicalUrl = (slug: string) => `${canonicalBaseUrl}/blog/article/${slug}`;

  // ✅ CHARGEMENT DE L'ARTICLE ET DE TOUS LES ARTICLES
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Charger l'article actuel, tous les articles et les catégories en parallèle
        const [articleResult, allResult, categoriesResult] = await Promise.all([
          getArticleBySlug(slug!),
          getAllArticlesNoPagination(),
          getAllCategories()
        ]);

        if (articleResult.data) {
          setArticle(articleResult.data);
        } else {
          setError("Article non trouvé");
        }

        if (allResult.data) {
          setAllArticles(allResult.data.filter(a => a.published));
        }

        if (categoriesResult.data) {
          setCategories(categoriesResult.data);
        }
      } catch (err) {
        logger.error("Erreur lors du chargement", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // ✅ OBTENIR LES ARTICLES PRÉCÉDENT ET SUIVANT
  const { previousArticle, nextArticle } = article ? getAdjacentArticles(article, allArticles) : { previousArticle: null, nextArticle: null };

  // ✅ AJOUT STRUCTURED DATA JSON-LD DANS LE HEAD
  useEffect(() => {
    if (!article) return;

    const authorName = article.author?.name || article.author || "Alain Zenatti";
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.seo_description || article.excerpt,
      "image": article.image_url || "",
      "datePublished": article.published_at || article.created_at,
      "dateModified": article.updated_at || article.created_at,
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": "https://novahypnose.fr"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NovaHypnose",
        "logo": {
          "@type": "ImageObject",
          "url": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://novahypnose.fr/blog/article/${article.slug}`
      },
      "keywords": Array.isArray(article.keywords) ? article.keywords.join(", ") : "",
      "articleSection": article.categories?.[0] || "Hypnose",
      "wordCount": article.content ? article.content.split(/\s+/).length : 0,
      "inLanguage": "fr-FR"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'article-structured-data';
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('article-structured-data');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p>Chargement de l'article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
            <p className="text-gray-600 mb-4">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link to="/blog" className="text-nova-700 hover:underline">
              Retour au blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const formattedDate = format(new Date(article.published_at || article.created_at), "d MMMM yyyy", { locale: fr });
  const formattedUpdateDate = article.updated_at !== article.created_at 
    ? format(new Date(article.updated_at), "d MMMM yyyy", { locale: fr })
    : null;
  
  // Utiliser l'auteur de l'article ou un nom par défaut
  const authorName = article.author?.name || article.author || "Alain Zenatti";
  
  // ✅ PARSER LES TAGS POUR L'AFFICHAGE
  const displayTags = parseTagsForDisplay(article.tags);
  
  // ✅ FONCTION DE PARTAGE AMÉLIORÉE AVEC RÉSUMÉ ET IMAGE
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = (article.title || '').replace(/['"]/g, '');
    const description = (article.seo_description || article.excerpt || '').replace(/['"]/g, '');
    const imageUrl = article.image_url || "";
    
    let shareUrl = "";
    let shareText = "";
    
    switch (platform) {
      case "facebook":
        shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
        break;
      case "linkedin":
        shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
        break;
      case "whatsapp":
        shareText = title + "\n\n" + description + "\n\n" + url;
        shareUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(shareText);
        break;
      case "copy":
        const copyText = title + "\n" + description + "\n" + url;
        navigator.clipboard.writeText(copyText);
        toast.success("Lien copié dans le presse-papier", {
          description: "Le titre, la description et le lien ont été copiés"
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={article.title}
        description={article.seo_description || article.excerpt}
        image={article.image_url}
        type="article"
        publishedTime={article.created_at}
        modifiedTime={article.updated_at}
        author={authorName}
        keywords={Array.isArray(article.keywords) ? article.keywords : []}
        // ✅ GESTION DU CONTENU DUPLIQUÉ
        // URL canonique pointe TOUJOURS vers novahypnose.fr (même si on est dessus)
        // Si on est sur emergences, on désindexe la page
        url={getCanonicalUrl(article.slug)}
        robots={isEmergencesDomain ? "noindex, nofollow" : "index, follow"}
      />

      <Header />

      <main className="flex-grow pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-4">
          <Breadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              (() => {
                if (article.categories?.[0]) {
                  const categoryName = article.categories[0];
                  const category = categories.find(c => c.name === categoryName);
                  return category
                    ? { label: categoryName, href: `/blog/categorie/${category.slug}` }
                    : { label: categoryName, href: '/blog' };
                }
                return { label: 'Articles', href: '/blog' };
              })(),
              { label: article.title }
            ]}
          />
        </div>

        {/* Article header with image */}
        <div className="w-full h-[40vh] relative">
          <img
            src={article.image_url || "/placeholder.svg"}
            alt={`Article hypnothérapie - ${article.title}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <div className="container mx-auto px-4 pb-8 text-white">
              <div className="max-w-3xl">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl md:text-4xl font-serif flex-1">{article.title}</h1>
                  {isAdmin && (
                    <Button
                      onClick={() => navigate(`/admin-blog/article/${article.id}/edit`)}
                      variant="secondary"
                      size="sm"
                      className="ml-4 flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Modifier
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap items-center text-sm">
                  <span>{authorName}</span>
                  <span className="mx-2">•</span>
                  <span>{formattedDate}</span>
                  <span className="mx-2">•</span>
                  <span>{article.read_time || 5} min de lecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              {/* ✅ TAGS CORRIGÉS */}
              {displayTags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {displayTags.map((tagName, index) => (
                    <Badge
                      key={tagName + "-" + index}
                      variant="outline"
                      className="text-xs bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    >
                      {tagName}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div
                className="article-hypnose"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownToHtml(article.content)
                }}
              />
              
              {/* ✅ ARTICLES CONNEXES */}
              <RelatedArticles
                currentArticleId={article.id}
                currentArticleCategories={article.categories}
                maxArticles={3}
              />
              
              {/* ✅ NAVIGATION PRÉCÉDENT/SUIVANT */}
              {(previousArticle || nextArticle) && (
                <div className="mt-12 border-t pt-8">
                  <h3 className="text-lg font-serif font-medium mb-6">Navigation entre les articles</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      {previousArticle && (
                        <Link
                          to={"/blog/article/" + previousArticle.slug}
                          className="group flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5 text-nova-600" />
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Article précédent</div>
                            <div className="font-medium group-hover:text-nova-700 transition-colors line-clamp-2">
                              {previousArticle.title}
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                    
                    <div className="mx-4">
                      <Link
                        to="/blog"
                        className="text-sm text-gray-500 hover:text-nova-700 transition-colors"
                      >
                        Tous les articles
                      </Link>
                    </div>
                    
                    <div className="flex-1 flex justify-end">
                      {nextArticle && (
                        <Link
                          to={"/blog/article/" + nextArticle.slug}
                          className="group flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-right"
                        >
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Article suivant</div>
                            <div className="font-medium group-hover:text-nova-700 transition-colors line-clamp-2">
                              {nextArticle.title}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-nova-600" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* ✅ DATES ET CATÉGORIES CORRIGÉES */}
              <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  {/* ✅ DATES DE CRÉATION ET MODIFICATION */}
                  <div className="mb-2">
                    <div>Publié le {formattedDate}</div>
                    {formattedUpdateDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Mis à jour le {formattedUpdateDate}
                      </div>
                    )}
                  </div>
                  
                  {/* ✅ CATÉGORIES AVEC LIENS VERS PAGE D'ACCUEIL FILTRÉE */}
                  {article.categories && article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span>Catégories: </span>
                      {article.categories.map((category, index) => (
                        <span key={category}>
                          <Link
                            to={"/blog?category=" + encodeURIComponent(category)}
                            className="text-nova-700 hover:underline"
                            title={"Voir tous les articles de la catégorie " + category}
                          >
                            {category}
                          </Link>
                          {index < article.categories.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Partager:</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleShare("facebook")}
                    aria-label="Partager sur Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleShare("linkedin")}
                    aria-label="Partager sur LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" aria-label="Plus d'options de partage">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare("copy")}>
                        <Link2 className="mr-2 h-4 w-4" />
                        <span>Copier le lien</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            
            <aside className="lg:w-1/3 space-y-8">
              <NewsletterForm />
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
