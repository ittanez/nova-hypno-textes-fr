import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '@/lib/types/blog';
import { getAllArticlesNoPagination } from '@/lib/services/blog/articleService';
import { logger } from '@/lib/logger';

interface RelatedArticlesProps {
  currentArticleId: string;
  currentArticleCategories?: string[];
  maxArticles?: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentArticleId,
  currentArticleCategories,
  maxArticles = 3
}) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        setIsLoading(true);
        const articles = await getAllArticlesNoPagination();

        // Ensure articles is an array
        const articlesArray = Array.isArray(articles) ? articles : (articles?.data || []);

        // Filter out current article and get related ones
        const filteredArticles = articlesArray.filter(article => article.id !== currentArticleId);

        // Priority: same category first, then by date
        const categorized = currentArticleCategories && currentArticleCategories.length > 0
          ? filteredArticles.filter(article =>
              article.categories?.some(cat => currentArticleCategories.includes(cat))
            )
          : [];

        const others = filteredArticles.filter(article =>
          !article.categories?.some(cat => currentArticleCategories?.includes(cat))
        );

        // Combine and limit results
        const combined = [...categorized, ...others].slice(0, maxArticles);

        setRelatedArticles(combined);
      } catch (error) {
        logger.error('Error fetching related articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId, currentArticleCategories, maxArticles]);

  if (isLoading) {
    return (
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-serif font-medium mb-4">Articles connexes</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) return null;

  return (
    <div className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border">
      <h3 className="text-xl font-serif font-medium mb-6 text-gray-800">
        📚 Articles connexes
      </h3>
      
      <div className="space-y-4">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/article/${article.slug}`}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
          >
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">
              {article.title}
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {article.categories?.[0] || 'Non classé'}
              </span>
              <span>
                {new Date(article.created_at).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          to="/blog"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          → Voir tous les articles
        </Link>
      </div>
    </div>
  );
};

export default RelatedArticles;