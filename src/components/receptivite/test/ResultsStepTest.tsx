import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { getPopularArticles } from '@/lib/services/blog/articleService';
import { Article } from '@/lib/types/blog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type ResultsStepTestProps = {
  firstName: string;
};

export const ResultsStepTest = ({ firstName }: ResultsStepTestProps) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getPopularArticles(3).then(({ data }) => {
      if (data) setArticles(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      {/* Message de confirmation */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-10 text-center mb-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-nova-blue" />
        </div>

        <h1 className="text-2xl font-bold text-nova-blue-dark mb-4">
          Merci {firstName} !
        </h1>

        <p className="text-nova-neutral-dark text-lg leading-relaxed mb-8">
          Vos résultats personnalisés arrivent dans votre boîte mail dans quelques instants.
          Pensez à vérifier vos spams.
        </p>

        <Button
          onClick={() => window.location.href = 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris'}
          className="bg-nova-blue hover:bg-nova-blue-dark text-white px-8 py-3 text-base"
        >
          Prendre rendez-vous →
        </Button>
      </div>

      {/* Carrousel des 3 derniers articles */}
      {articles.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-nova-blue-dark text-center mb-6">
            En attendant, découvrez notre blog
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/article/${article.slug}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={article.image_url || article.storage_image_url || '/placeholder.svg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">
                    {format(new Date(article.published_at || article.created_at), 'd MMMM yyyy', { locale: fr })}
                  </p>
                  <h3 className="text-sm font-semibold text-nova-neutral-dark line-clamp-2 group-hover:text-nova-blue transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog" className="inline-flex items-center gap-1 text-nova-blue hover:underline text-sm font-medium">
              Voir tous les articles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
