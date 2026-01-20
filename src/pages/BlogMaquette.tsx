import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Article, Category } from "@/lib/types/blog";
import ContentLayout from "@/components/layout/ContentLayout";
import Search from 'lucide-react/dist/esm/icons/search';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Tag from 'lucide-react/dist/esm/icons/tag';
import Clock from 'lucide-react/dist/esm/icons/clock';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import { getAllArticlesNoPagination, getAllCategories } from "@/lib/services/blog/articleService";
import NewsletterForm from "@/components/blog/NewsletterForm";
import { logger } from "@/lib/logger";

const ARTICLES_PER_PAGE = 9;

const BlogMaquette = () => {
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [articlesResult, categoriesResult] = await Promise.all([
          getAllArticlesNoPagination(),
          getAllCategories()
        ]);

        if (articlesResult.data) {
          setArticles(articlesResult.data);
        }

        if (categoriesResult.data) {
          setCategories(categoriesResult.data);
        }
      } catch (error) {
        logger.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const categoriesWithCount = useMemo(() => {
    if (!articles.length) return [];

    const categoryCount: Record<string, number> = {};

    articles.forEach(article => {
      if (article.categories && Array.isArray(article.categories)) {
        article.categories.forEach(category => {
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });
      }
    });

    return Object.entries(categoryCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [articles]);

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.meta_description?.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(article =>
        article.categories && article.categories.includes(selectedCategory)
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.published_at || b.created_at).getTime() -
               new Date(a.published_at || a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.published_at || a.created_at).getTime() -
               new Date(b.published_at || b.created_at).getTime();
      }
      return 0;
    });

    return filtered;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <ContentLayout>
      {/* Hero Section */}
      <section className="relative bg-nova-blue-dark text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Émergences, le blog de l'hypnose et du bien-être
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Plongez dans l'univers fascinant de l'hypnose ericksonienne à travers des articles approfondis,
              des témoignages inspirants et des conseils pratiques. Découvrez comment mobiliser vos ressources
              intérieures pour transformer votre vie, gérer vos émotions et atteindre vos objectifs.
              Un espace de réflexion et d'apprentissage guidé par Alain Zenatti, Maître Hypnologue à Paris.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-white shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === ""
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous les articles ({articles.length})
            </button>

            {categoriesWithCount.map(({ name, count }) => (
              <button
                key={name}
                onClick={() => {
                  setSelectedCategory(name);
                  setCurrentPage(1);
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === name
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {name} ({count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Sort */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length > 1 ? 's' : ''} trouvé{filteredAndSortedArticles.length > 1 ? 's' : ''}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
            </select>
          </div>

          {/* Articles */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : paginatedArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Aucun article trouvé</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/article/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      {article.categories && article.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.categories.slice(0, 2).map((category, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium"
                            >
                              <Tag size={12} />
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      {article.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            {new Date(article.published_at || article.created_at).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {article.reading_time && (
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{article.reading_time} min</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                        Lire l'article
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-nova-blue-dark">
        <div className="container mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </ContentLayout>
  );
};

export default BlogMaquette;
