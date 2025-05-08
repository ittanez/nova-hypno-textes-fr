
import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Tag } from "lucide-react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  metaDescription: string;
  keywords: string[];
  relatedArticles: {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
  }[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we're in /blog or /blog-temp
  const basePath = location.pathname.startsWith('/blog-temp') ? '/blog-temp' : '/blog';
  
  useEffect(() => {
    // In a real app, this would be an API call to fetch the article by slug
    const fetchArticle = async () => {
      setLoading(true);
      try {
        console.log("Fetching article with slug:", slug);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // First, try to find the article in localStorage
        const storedArticles = localStorage.getItem('blog_articles');
        if (storedArticles) {
          const parsedArticles = JSON.parse(storedArticles);
          const storedArticle = parsedArticles.find((article: any) => article.slug === slug);
          
          if (storedArticle) {
            console.log("Found stored article:", storedArticle);
            // Transform stored article to Article format
            const mockArticle: Article = {
              id: storedArticle.id || `stored-${Date.now()}`,
              title: storedArticle.title,
              slug: storedArticle.slug,
              content: storedArticle.content || "<p>Contenu non disponible</p>",
              author: "Alain Zenatti",
              publishedAt: new Date().toISOString(),
              readTime: "5 min",
              imageUrl: storedArticle.imageUrl || "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png",
              categories: storedArticle.category ? [{
                id: storedArticle.category,
                name: getCategoryNameById(storedArticle.category),
                slug: getCategorySlugById(storedArticle.category)
              }] : [],
              tags: storedArticle.tags ? storedArticle.tags.split(',').map((tag: string, i: number) => ({
                id: `tag-${i}`,
                name: tag.trim(),
                slug: tag.trim().toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
              })) : [],
              metaDescription: storedArticle.metaDescription || storedArticle.excerpt || "",
              keywords: storedArticle.keywords ? storedArticle.keywords.split(',').map((k: string) => k.trim()) : [],
              relatedArticles: []
            };
            
            setArticle(mockArticle);
            setLoading(false);
            return;
          }
        }
        
        // For demo purposes, if not found in localStorage, use hardcoded mock data
        if (slug === "hypnose-ericksonienne-mecanismes-changement") {
          const mockArticle: Article = {
            id: "1",
            title: "L'hypnose ericksonienne et les mécanismes du changement",
            slug: "hypnose-ericksonienne-mecanismes-changement",
            content: `
              <h2>Les fondements de l'hypnose ericksonienne</h2>
              <p>L'hypnose ericksonienne, développée par le psychiatre américain Milton H. Erickson, est une approche thérapeutique qui se distingue par sa souplesse et son respect de l'unicité de chaque individu. Contrairement aux formes plus directives d'hypnose, l'approche ericksonienne considère que chaque personne possède déjà en elle les ressources nécessaires pour résoudre ses problèmes.</p>
              
              <p>Cette approche repose sur plusieurs principes fondamentaux :</p>
              
              <ul>
                <li>L'inconscient est un réservoir de ressources positives</li>
                <li>Chaque personne est unique et nécessite une approche personnalisée</li>
                <li>La résistance du patient est utilisée comme un levier thérapeutique plutôt qu'un obstacle</li>
                <li>Le changement s'opère souvent de manière indirecte et métaphorique</li>
              </ul>
              
              <h2>La transe hypnotique : un état naturel</h2>
              
              <p>Contrairement aux idées reçues, l'état de transe hypnotique n'est pas un état mystérieux ou surnaturel. Il s'agit d'un état modifié de conscience que nous expérimentons tous quotidiennement : lorsque nous sommes absorbés dans un livre, dans nos pensées en conduisant, ou lorsque nous nous perdons dans nos rêveries.</p>
              
              <p>Cet état naturel est simplement amplifié et utilisé de manière thérapeutique dans le cadre de l'hypnose ericksonienne. Le patient reste toujours conscient et garde le contrôle, contrairement à certaines représentations populaires de l'hypnose.</p>
              
              <h2>Le langage hypnotique : l'art de la suggestion indirecte</h2>
              
              <p>L'une des innovations majeures d'Erickson fut l'utilisation du langage hypnotique indirect. Plutôt que d'utiliser des suggestions directes comme "Vous allez vous sentir détendu", l'approche ericksonienne privilégie des formulations comme "Certaines personnes peuvent commencer à remarquer une sensation de détente qui se développe progressivement".</p>
              
              <p>Cette approche indirecte permet de contourner les résistances conscientes et d'offrir au patient la liberté d'intégrer les suggestions à son propre rythme, selon ses besoins spécifiques.</p>
              
              <h2>Le processus de changement en hypnose ericksonienne</h2>
              
              <p>Dans l'hypnose ericksonienne, le changement s'opère souvent de manière subtile et progressive. Le processus thérapeutique vise à :</p>
              
              <ol>
                <li>Établir un rapport de confiance solide avec le patient</li>
                <li>Accéder à l'inconscient par l'induction d'un état de transe léger à moyen</li>
                <li>Faciliter la mobilisation des ressources internes du patient</li>
                <li>Encourager de nouveaux apprentissages et perspectives</li>
                <li>Permettre l'intégration de ces nouvelles ressources dans la vie quotidienne</li>
              </ol>
              
              <h2>Applications thérapeutiques</h2>
              
              <p>L'hypnose ericksonienne s'est révélée efficace dans le traitement de nombreuses problématiques :</p>
              
              <ul>
                <li>Gestion du stress et de l'anxiété</li>
                <li>Traitement des phobies et des traumatismes</li>
                <li>Amélioration des troubles du sommeil</li>
                <li>Soulagement des douleurs chroniques</li>
                <li>Renforcement de la confiance en soi</li>
                <li>Accompagnement dans les transitions de vie</li>
              </ul>
              
              <h2>Conclusion</h2>
              
              <p>L'hypnose ericksonienne offre une approche respectueuse et personnalisée du changement thérapeutique. En s'appuyant sur les ressources naturelles de l'individu et en utilisant des techniques de communication sophistiquées, elle permet d'activer les mécanismes profonds du changement, souvent de manière douce et durable.</p>
              
              <p>N'hésitez pas à me contacter pour découvrir comment l'hypnose ericksonienne pourrait vous accompagner dans votre parcours de transformation personnelle.</p>
            `,
            author: "Alain Zenatti",
            publishedAt: "2023-11-15T10:00:00Z",
            readTime: "5 min",
            imageUrl: "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png",
            categories: [{ id: "1", name: "Hypnose Ericksonienne", slug: "hypnose-ericksonienne" }],
            tags: [
              { id: "2", name: "Confiance en soi", slug: "confiance-en-soi" },
              { id: "3", name: "Anxiété", slug: "anxiete" }
            ],
            metaDescription: "Découvrez les principes fondamentaux de l'hypnose ericksonienne et comment elle active les mécanismes naturels du changement dans notre inconscient.",
            keywords: ["hypnose", "ericksonien", "inconscient", "thérapie", "changement", "milton erickson"],
            relatedArticles: [
              {
                id: "2",
                title: "Auto-hypnose : techniques simples pour améliorer votre sommeil",
                slug: "auto-hypnose-techniques-ameliorer-sommeil",
                imageUrl: "/lovable-uploads/ac75f7ce-64fa-4285-9d09-3c372d3efde5.png"
              },
              {
                id: "3",
                title: "Comment l'hypnothérapie aide à surmonter les phobies",
                slug: "hypnotherapie-aide-surmonter-phobies",
                imageUrl: "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png"
              }
            ]
          };
          setArticle(mockArticle);
        } else if (slug === "auto-hypnose-techniques-ameliorer-sommeil") {
          // Mockup for another article would be here
          const mockArticle: Article = {
            id: "2",
            title: "Auto-hypnose : techniques simples pour améliorer votre sommeil",
            slug: "auto-hypnose-techniques-ameliorer-sommeil",
            content: `<h2>Qu'est-ce que l'auto-hypnose ?</h2><p>L'auto-hypnose est une technique qui permet d'induire soi-même un état hypnotique et de pratiquer des suggestions positives pour atteindre différents objectifs, notamment améliorer son sommeil.</p><p>Cette pratique, basée sur les mêmes principes que l'hypnose thérapeutique, vous donne l'autonomie nécessaire pour utiliser ces techniques bénéfiques quand vous en avez besoin.</p><h2>Pourquoi l'auto-hypnose est efficace pour le sommeil</h2><p>Les troubles du sommeil sont souvent liés au stress, à l'anxiété et à l'hyperactivité mentale. L'auto-hypnose agit précisément sur ces facteurs en :</p><ul><li>Réduisant l'activité du système nerveux sympathique (responsable de la réponse au stress)</li><li>Favorisant la production d'ondes cérébrales associées à la relaxation profonde</li><li>Réorientant l'attention loin des pensées perturbatrices</li><li>Renforçant les associations positives avec le sommeil</li></ul>`,
            author: "Alain Zenatti",
            publishedAt: "2023-10-28T09:30:00Z",
            readTime: "7 min",
            imageUrl: "/lovable-uploads/ac75f7ce-64fa-4285-9d09-3c372d3efde5.png",
            categories: [{ id: "2", name: "Auto-hypnose", slug: "auto-hypnose" }],
            tags: [{ id: "1", name: "Sommeil", slug: "sommeil" }],
            metaDescription: "Découvrez comment l'auto-hypnose peut vous aider à retrouver un sommeil réparateur naturellement grâce à des techniques simples et efficaces.",
            keywords: ["auto-hypnose", "sommeil", "insomnie", "relaxation", "techniques"],
            relatedArticles: []
          };
          setArticle(mockArticle);
        } else {
          console.log("Article not found in hardcoded samples, checking stored articles one more time...");
          
          // If we get here, it's not one of our hard-coded articles
          const storedArticles = localStorage.getItem('blog_articles');
          if (storedArticles) {
            try {
              const parsedArticles = JSON.parse(storedArticles);
              console.log("All stored articles:", parsedArticles);
              
              const foundArticle = parsedArticles.find((article: any) => 
                article.slug === slug
              );
              
              if (foundArticle) {
                console.log("Found article in second check:", foundArticle);
                // Transform stored article to Article format
                const transformedArticle: Article = {
                  id: foundArticle.id || `stored-${Date.now()}`,
                  title: foundArticle.title,
                  slug: foundArticle.slug,
                  content: foundArticle.content || "<p>Contenu non disponible</p>",
                  author: "Alain Zenatti",
                  publishedAt: new Date().toISOString(),
                  readTime: "5 min",
                  imageUrl: foundArticle.imageUrl || "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png",
                  categories: foundArticle.category ? [{
                    id: foundArticle.category,
                    name: getCategoryNameById(foundArticle.category),
                    slug: getCategorySlugById(foundArticle.category)
                  }] : [],
                  tags: foundArticle.tags ? foundArticle.tags.split(',').map((tag: string, i: number) => ({
                    id: `tag-${i}`,
                    name: tag.trim(),
                    slug: tag.trim().toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                  })) : [],
                  metaDescription: foundArticle.metaDescription || foundArticle.excerpt || "",
                  keywords: foundArticle.keywords ? foundArticle.keywords.split(',').map((k: string) => k.trim()) : [],
                  relatedArticles: []
                };
                
                setArticle(transformedArticle);
              } else {
                // If slug doesn't match any known article, redirect to blog index
                console.log("No article found with slug:", slug);
                navigate(basePath);
              }
            } catch (error) {
              console.error("Error parsing stored articles:", error);
              navigate(basePath);
            }
          } else {
            // If no stored articles and no match in hard-coded, redirect to blog index
            console.log("No stored articles found and slug doesn't match hardcoded articles");
            navigate(basePath);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate(basePath);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticle();
  }, [slug, navigate, basePath]);
  
  // Function to get category name by ID
  const getCategoryNameById = (id: string): string => {
    const categories = [
      { id: '1', name: 'Hypnose Ericksonienne', slug: 'hypnose-ericksonienne' },
      { id: '2', name: 'Auto-hypnose', slug: 'auto-hypnose' },
      { id: '3', name: 'Gestion du stress', slug: 'gestion-du-stress' },
    ];
    
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : 'Catégorie';
  };
  
  // Function to get category slug by ID
  const getCategorySlugById = (id: string): string => {
    const categories = [
      { id: '1', name: 'Hypnose Ericksonienne', slug: 'hypnose-ericksonienne' },
      { id: '2', name: 'Auto-hypnose', slug: 'auto-hypnose' },
      { id: '3', name: 'Gestion du stress', slug: 'gestion-du-stress' },
    ];
    
    const category = categories.find(cat => cat.id === id);
    return category ? category.slug : 'categorie';
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Chargement de l'article...</p>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Article non trouvé</h2>
        <p className="mb-6 text-muted-foreground">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button asChild>
          <Link to={basePath}>Retour aux articles</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{article.title} | NovaHypnose - Blog</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={Array.isArray(article.keywords) ? article.keywords.join(", ") : article.keywords} />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:author" content={article.author} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={article.imageUrl} />
      </Helmet>
      
      <article className="max-w-4xl mx-auto">
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="mb-4"
        >
          <Link to={basePath} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>
        
        {/* Article header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.categories.map(category => (
              <Link key={category.id} to={`${basePath}/category/${category.slug}`}>
                <Badge className="bg-nova-blue text-white hover:bg-nova-blue-dark">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
          
          {/* Featured image */}
          <div className="rounded-xl overflow-hidden mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-auto"
            />
          </div>
        </header>
        
        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {article.tags.map(tag => (
            <Link key={tag.id} to={`${basePath}/tag/${tag.slug}`}>
              <Badge variant="outline" className="hover:bg-muted">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
        
        {/* Related articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <>
            <Separator className="my-8" />
            <div className="mb-8">
              <h3 className="text-xl font-serif font-semibold mb-4">Articles similaires</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {article.relatedArticles.map(related => (
                  <Link 
                    key={related.id}
                    to={`${basePath}/${related.slug}`}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 p-4 rounded-lg border hover:border-nova-blue transition-colors">
                      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                        <img 
                          src={related.imageUrl} 
                          alt={related.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-nova-blue transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default BlogPost;
