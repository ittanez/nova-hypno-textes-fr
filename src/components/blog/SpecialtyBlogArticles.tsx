import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { publicSupabase } from '@/integrations/supabase/public-client';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

interface SpecialtyBlogArticlesProps {
  keywords: string[];
  categories?: string[];
  title?: string;
  accentColor?: string;
  maxArticles?: number;
}

interface ArticleSummary {
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  published_at: string | null;
  categories: string[];
  read_time: number;
}

async function fetchPublishedArticles(): Promise<ArticleSummary[]> {
  const { data, error } = await publicSupabase
    .from('articles')
    .select('title,slug,excerpt,image_url,published_at,categories,read_time')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

function filterArticles(
  articles: ArticleSummary[],
  keywords: string[],
  categories: string[],
  max: number
): ArticleSummary[] {
  const lowerKeywords = keywords.map(k => k.toLowerCase());

  const matches = articles.filter(article => {
    // Check category match
    const categoryMatch = categories.length > 0 &&
      article.categories?.some(cat => categories.includes(cat));
    if (categoryMatch) return true;

    // Check keyword match in title or excerpt
    const text = `${article.title} ${article.excerpt}`.toLowerCase();
    return lowerKeywords.some(kw => text.includes(kw));
  });

  return matches.slice(0, max);
}

const SpecialtyBlogArticles: React.FC<SpecialtyBlogArticlesProps> = ({
  keywords,
  categories = [],
  title = 'Approfondissez le sujet',
  accentColor = 'text-blue-600',
  maxArticles = 3,
}) => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['specialty-blog-articles'],
    queryFn: fetchPublishedArticles,
    staleTime: 10 * 60 * 1000,
  });

  const filtered = articles
    ? filterArticles(articles, keywords, categories, maxArticles)
    : [];

  if (!isLoading && filtered.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
            {title}
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Découvrez nos articles sur ce thème dans le blog Émergences
          </p>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg p-5 shadow-sm animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {filtered.map(article => (
                <Link
                  key={article.slug}
                  to={`/blog/article/${article.slug}`}
                  className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                >
                  <h3 className={`font-semibold mb-2 line-clamp-2 group-hover:${accentColor} transition-colors`}>
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString('fr-FR')
                        : ''}
                    </span>
                    {article.read_time > 0 && (
                      <span>{article.read_time} min</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 font-medium ${accentColor} hover:underline`}
            >
              Voir tous les articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtyBlogArticles;
