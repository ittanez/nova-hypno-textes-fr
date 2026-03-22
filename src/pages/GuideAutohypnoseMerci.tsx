import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Clock from 'lucide-react/dist/esm/icons/clock';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { getPopularArticles } from '@/lib/services/blog/articleService';
import { Article } from '@/lib/types/blog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

/* ─────────────────────────────────────────────
   Thank You page — après soumission du formulaire
   guide "L'Autohypnose au Quotidien"
   Page isolée (pas de Header / Footer)
   ───────────────────────────────────────────── */

const GuideAutohypnoseMerci: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prenom = (location.state as { prenom?: string })?.prenom || '';
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getPopularArticles(3).then(({ data }) => {
      if (data) setArticles(data);
    });
  }, []);

  // Redirect if accessed directly without form submission
  useEffect(() => {
    if (!location.state) {
      navigate('/guide-autohypnose', { replace: true });
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <>
      <Helmet>
        <title>Merci ! Guide Autohypnose au Quotidien envoyé — NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* ═══════════ CONFIRMATION HERO ═══════════ */}
      <section className="bg-gradient-to-br from-white via-nova-neutral to-nova-blue-light/30 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={44} />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-nova-blue-dark leading-snug mb-4">
            {prenom ? `Merci ${prenom} !` : 'Merci !'}
          </h1>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-lg mx-auto mb-6">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-10 h-10 bg-nova-blue-light/30 rounded-full flex items-center justify-center">
                <Mail className="text-nova-blue" size={20} />
              </div>
              <div>
                <p className="font-semibold text-nova-blue-dark text-lg mb-1">
                  Votre guide « Reprenez la main sur votre bien-être » arrive par email
                </p>
                <p className="text-gray-500 text-[0.95rem] leading-relaxed">
                  Vérifiez votre boîte de réception (et vos spams) dans les prochaines minutes.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
              <Clock size={14} />
              <span>Délai de réception : environ 7 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ARTICLES DU BLOG ═══════════ */}
      {articles.length > 0 && (
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-xl font-bold text-nova-blue-dark text-center mb-6">
              En attendant, découvrez notre blog
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/article/${article.slug}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={article.image_url || article.storage_image_url || '/placeholder.svg'}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {format(new Date(article.published_at || article.created_at), 'd MMMM yyyy', { locale: fr })}
                    </p>
                    <h3 className="text-sm font-semibold text-nova-blue-dark line-clamp-2 group-hover:text-nova-blue transition-colors">
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
        </section>
      )}

      {/* ═══════════ MINI FOOTER ═══════════ */}
      <div className="bg-nova-blue-dark text-white/50 text-xs text-center py-5 px-4">
        <p className="mb-1 flex items-center justify-center gap-1.5">
          <MapPin size={12} />
          16 rue Saint-Antoine, 75004 Paris
        </p>
        <p className="mb-0">
          &copy; {new Date().getFullYear()} NovaHypnose &middot; Alain Zenatti &middot; Hypnothérapeute Paris 4e
          <br />
          Conformément au RGPD — Désabonnement libre à tout moment.
        </p>
      </div>
    </>
  );
};

export default GuideAutohypnoseMerci;
