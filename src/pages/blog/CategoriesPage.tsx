
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllArticlesNoPagination, getAllCategories } from "@/lib/services/blog/articleService";
import { Article } from "@/lib/types/blog";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesResponse, articlesResponse] = await Promise.all([
          getAllCategories(),
          getAllArticlesNoPagination()
        ]);
        setCategories(categoriesResponse.data || []);
        setArticles(articlesResponse.data || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Count articles in each category
  const categoryArticleCounts = categories.map(category => {
    const count = articles.filter(article => 
      article.categories && article.categories.includes(category.name)
    ).length;
    return { ...category, count };
  });
  
  return (
    <>
      <Helmet>
        <title>Catégories d'Articles - Blog Hypnose | NovaHypnose</title>
        <meta name="description" content="Explorez les catégories d'articles sur l'hypnose ericksonienne, le bien-être et la transformation personnelle. Trouvez les articles pertinents pour vos besoins." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto px-4 pt-24 pb-12">
          <div className="mb-12 text-center">
            <h1 className="font-serif mb-4">Catégories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez nos articles par thématique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticleCounts.map(category => (
            <Link to={`/category/${category.id}`} key={category.id} className="block group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="group-hover:text-nova-700 transition-colors">
                    {category.name}
                  </CardTitle>
                  <CardDescription>
                    {category.count} {category.count > 1 ? "articles" : "article"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default CategoriesPage;
