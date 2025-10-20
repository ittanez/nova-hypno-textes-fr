
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "@/lib/types/blog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/blog/ArticleCard";
import SEOHead from "@/components/blog/SEOHead";
import Breadcrumb from "@/components/blog/Breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllArticlesNoPagination, getAllCategories } from "@/lib/services/blog/articleService";
import { useQuery } from "@tanstack/react-query";

const sortOptions = [
  { value: "newest", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "az", label: "A-Z" },
  { value: "za", label: "Z-A" }
];

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("newest");

  // Utiliser React Query pour récupérer les articles (avec cache partagé)
  const { data: articlesData, isLoading: articlesLoading } = useQuery({
    queryKey: ['blog-articles'],
    queryFn: async () => {
      const result = await getAllArticlesNoPagination();
      return result.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Utiliser React Query pour récupérer les catégories (avec cache partagé)
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: async () => {
      const result = await getAllCategories();
      return result.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const articles = articlesData || [];
  const categories = categoriesData || [];
  const isLoading = articlesLoading || categoriesLoading;

  // Find the category by slug
  const category = categories.find(cat => cat.slug === slug);
  
  // Filter articles by category
  const filteredArticles = articles.filter(article => 
    article.categories && article.categories.includes(category?.name || "")
  );
  
  // Sort articles based on the selected option
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime();
      case "oldest":
        return new Date(a.published_at || a.created_at).getTime() - new Date(b.published_at || b.created_at).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  
  // Handle case where category is not found
  useEffect(() => {
    if (!isLoading && !category) {
      navigate("/blog");
    }
  }, [category, navigate, isLoading]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  if (isLoading || !category) {
    return null;
  }

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": category.name,
    "description": category.description,
    "url": `https://novahypnose.fr/blog/categorie/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": sortedArticles.map((article, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://novahypnose.fr/blog/article/${article.slug}`
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://novahypnose.fr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://novahypnose.fr/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://novahypnose.fr/blog/categorie/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${category.name} - Blog NovaHypnose`}
        description={category.description || `Découvrez tous nos articles sur ${category.name} - Hypnose ericksonienne et bien-être par Alain Zenatti`}
        type="website"
        url={`https://novahypnose.fr/blog/categorie/${slug}`}
        structuredData={[categorySchema, breadcrumbSchema]}
      />

      <Header />

      <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/blog' },
            { label: category.name }
          ]}
        />

        <div className="mb-12 mt-8">
          <h1 className="font-serif mb-2 text-center text-4xl md:text-5xl">{category.name}</h1>
          {category.description && (
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>
        
        {/* Sorting and results count */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-medium mb-4 sm:mb-0">
            Articles <span className="text-gray-500 font-normal">({filteredArticles.length})</span>
          </h2>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Trier par:</span>
            <Select onValueChange={handleSortChange} defaultValue={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Articles grid */}
        {sortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">Aucun article trouvé dans cette catégorie</h3>
            <p className="mt-2 text-gray-500">
              Revenez plus tard pour découvrir de nouveaux articles.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
