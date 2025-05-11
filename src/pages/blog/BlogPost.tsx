import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useArticles } from '@/hooks/blog/useArticles';
import { Article } from '@/types/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchArticleBySlug } = useArticles();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      if (!slug) {
        navigate('/blog');
        return;
      }

      try {
        const { article: articleData } = await fetchArticleBySlug(slug);
        
        if (articleData) {
          setArticle(articleData);
          setLoading(false);
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/blog');
      }
    };

    fetchArticle();
  }, [slug, navigate, fetchArticleBySlug]);

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
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Article non trouvé</h2>
        <p className="text-muted-foreground mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
        <Button asChild>
          <Link to="/blog">Retour au blog</Link>
        </Button>
      </div>
    );
  }

  const getSlug = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | NovaHypnose</title>
        <meta name="description" content={article.excerpt || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        {article.image_url && <meta property="og:image" content={article.image_url} />}
        <link rel="canonical" href={`https://novahypnose.fr/blog/${getSlug(article.title)}`} />
      </Helmet>

      <article className="space-y-8">
        {/* Back button */}
        <div>
          <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
            <Link to="/blog" className="flex items-center text-muted-foreground">
              <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
              Retour aux articles
            </Link>
          </Button>
        </div>

        {/* Article header */}
        <div>
          {article.image_url && (
            <div className="relative w-full h-64 md:h-96 mb-6 overflow-hidden rounded-lg">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" aria-hidden="true" />
              <span>{formatDate(article.created_at)}</span>
            </div>
            
            {article.author && (
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" aria-hidden="true" />
                <span>{article.author}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-1">
              {article.categories.map((category, index) => (
                <Link 
                  key={`category-${index}`}
                  to={`/blog/category/${getSlug(category)}`}
                  className="bg-muted hover:bg-muted/80 rounded-full px-2.5 py-0.5 text-xs transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          {article.excerpt && (
            <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-nova-blue italic text-muted-foreground">
              {article.excerpt}
            </div>
          )}
        </div>

        <Separator />
        
        {/* Article content */}
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6">
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Link 
                  key={`tag-${index}`}
                  to={`/blog/tag/${getSlug(tag)}`}
                  className="bg-muted hover:bg-muted/80 rounded-full px-3 py-1 text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <Separator className="my-8" />
        
        {/* Related articles would go here */}
        
        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" asChild>
            <Link to="/blog" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Tous les articles
            </Link>
          </Button>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
