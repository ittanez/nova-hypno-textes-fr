
import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Calendar, User, Clock, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
}

const ARTICLES_PER_PAGE = 6;

const BlogIndex = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  const { category, tag } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const querySearchTerm = searchParams.get("search");
  
  // Determine if we're in /blog or /blog-temp
  const basePath = location.pathname.startsWith('/blog-temp') ? '/blog-temp' : '/blog';
  
  useEffect(() => {
    if (querySearchTerm) {
      setSearchTerm(querySearchTerm);
    }
  }, [querySearchTerm]);
  
  useEffect(() => {
    // In a real app, this would be an API call with filters for category, tag, search
    // For now, we'll use localStorage and mock data
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Try to get articles from localStorage first (for new articles created in admin)
        const storedArticles = localStorage.getItem('blog_articles');
        let allArticles: Article[] = [];
        
        if (storedArticles) {
          const parsedArticles = JSON.parse(storedArticles);
          // Transform from form values format to Article format
          const transformedArticles = parsedArticles.map((article: any, index: number) => ({
            id: `stored-${index}`,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || "Extrait de l'article non disponible",
            author: "Alain Zenatti",
            publishedAt: new Date().toISOString(),
            readTime: "5 min",
            imageUrl: article.imageUrl || "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png",
            categories: article.category ? [{ 
              id: article.category, 
              name: getCategoryNameById(article.category), 
              slug: getCategorySlugById(article.category) 
            }] : [],
            tags: article.tags ? article.tags.split(',').map((tag: string, i: number) => ({
              id: `tag-${i}`,
              name: tag.trim(),
              slug: tag.trim().toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            })) : []
          }));
          
          allArticles = [...transformedArticles];
        }
        
        // Add mock articles if we don't have enough
        if (allArticles.length < 3) {
          const mockArticles: Article[] = [
            {
              id: "1",
              title: "L'hypnose ericksonienne et les mécanismes du changement",
              slug: "hypnose-ericksonienne-mecanismes-changement",
              excerpt: "Découvrez les principes fondamentaux de l'hypnose ericksonienne et comment elle active les mécanismes naturels du changement dans notre inconscient.",
              author: "Alain Zenatti",
              publishedAt: "2023-11-15T10:00:00Z",
              readTime: "5 min",
              imageUrl: "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png",
              categories: [{ id: "1", name: "Hypnose Ericksonienne", slug: "hypnose-ericksonienne" }],
              tags: [
                { id: "2", name: "Confiance en soi", slug: "confiance-en-soi" },
                { id: "3", name: "Anxiété", slug: "anxiete" }
              ]
            },
            {
              id: "2",
              title: "Auto-hypnose : techniques simples pour améliorer votre sommeil",
              slug: "auto-hypnose-techniques-ameliorer-sommeil",
              excerpt: "Les problèmes de sommeil touchent de nombreuses personnes. Découvrez comment l'auto-hypnose peut vous aider à retrouver un sommeil réparateur naturellement.",
              author: "Alain Zenatti",
              publishedAt: "2023-10-28T09:30:00Z",
              readTime: "7 min",
              imageUrl: "/lovable-uploads/ac75f7ce-64fa-4285-9d09-3c372d3efde5.png",
              categories: [{ id: "2", name: "Auto-hypnose", slug: "auto-hypnose" }],
              tags: [
                { id: "1", name: "Sommeil", slug: "sommeil" }
              ]
            },
            {
              id: "3",
              title: "Comment l'hypnothérapie aide à surmonter les phobies",
              slug: "hypnotherapie-aide-surmonter-phobies",
              excerpt: "Les phobies peuvent limiter considérablement votre vie quotidienne. Explorez comment l'hypnothérapie offre une approche efficace pour les traiter en profondeur.",
              author: "Alain Zenatti",
              publishedAt: "2023-10-10T14:15:00Z",
              readTime: "6 min",
              imageUrl: "/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png",
              categories: [{ id: "3", name: "Gestion du stress", slug: "gestion-du-stress" }],
              tags: [
                { id: "3", name: "Anxiété", slug: "anxiete" }
              ]
            },
          ];
          
          // Add mock articles not already in allArticles
          mockArticles.forEach(mockArticle => {
            if (!allArticles.some(a => a.slug === mockArticle.slug)) {
              allArticles.push(mockArticle);
            }
          });
        }
        
        setArticles(allArticles);
        
        // Apply filters and search
        applyFiltersAndSearch(allArticles, category, tag, searchTerm, sortBy);
        
      } catch (error) {
        console.error("Error fetching articles:", error);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [category, tag, searchTerm, sortBy]);
  
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
  
  // Function to apply filters and search
  const applyFiltersAndSearch = (
    allArticles: Article[],
    categoryFilter: string | undefined,
    tagFilter: string | undefined,
    search: string,
    sort: string
  ) => {
    let filtered = [...allArticles];
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(article => 
        article.categories.some(cat => cat.slug === categoryFilter)
      );
    }
    
    // Apply tag filter
    if (tagFilter) {
      filtered = filtered.filter(article => 
        article.tags.some(t => t.slug === tagFilter)
      );
    }
    
    // Apply search filter
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sort === "oldest") {
      filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sort === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredArticles(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE)));
    
    // Reset to page 1 if the filters change
    setCurrentPage(1);
  };
  
  const getPageTitle = () => {
    if (searchTerm) {
      return `Résultats pour "${searchTerm}"`;
    } else if (category) {
      return `Catégorie : ${category.replace(/-/g, ' ')}`;
    } else if (tag) {
      return `Tag : ${tag.replace(/-/g, ' ')}`;
    } else {
      return "Articles récents";
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameter
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('search', searchTerm);
      navigate(`${basePath}?${params.toString()}`);
    } else {
      navigate(basePath);
    }
  };
  
  // Get current page of articles
  const getCurrentArticles = () => {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  };
  
  const currentArticles = getCurrentArticles();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Chargement des articles...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold">{getPageTitle()}</h1>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex w-full md:w-auto">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
              className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          {/* Sort dropdown */}
          <div className="flex items-center">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Trier par</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent</SelectItem>
                <SelectItem value="oldest">Plus ancien</SelectItem>
                <SelectItem value="title-asc">Titre (A-Z)</SelectItem>
                <SelectItem value="title-desc">Titre (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="bg-muted p-6 rounded-lg text-center">
          <h2 className="text-xl mb-2">Aucun article trouvé</h2>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? "Aucun article ne correspond à votre recherche. Essayez avec d'autres termes."
              : category || tag 
                ? "Aucun article n'est disponible dans cette catégorie pour le moment."
                : "Aucun article n'est disponible pour le moment."}
          </p>
          <Button asChild>
            <Link to={basePath}>Voir tous les articles</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {currentArticles.map(article => (
              <Card key={article.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl">
                    <Link 
                      to={`${basePath}/${article.slug}`}
                      className="hover:text-nova-blue transition-colors"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.publishedAt)}
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map(tag => (
                      <Link key={tag.id} to={`${basePath}/tag/${tag.slug}`}>
                        <Badge variant="outline" className="hover:bg-muted">
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">{article.author}</span>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`${basePath}/${article.slug}`}>
                        Lire plus
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }} 
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(i + 1);
                      }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default BlogIndex;
