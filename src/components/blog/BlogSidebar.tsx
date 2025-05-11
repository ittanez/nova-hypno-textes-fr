import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import { useArticles } from '@/hooks/blog/useArticles';

const BlogSidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { categories } = useCategories();
  const { tags, loading: tagsLoading } = useTags();
  const { articles, loading: loadingArticles } = useArticles({ sortBy: 'created_at', sortDirection: 'desc' });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    window.location.href = `/blog?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <aside className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">Go</Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Catégories</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          {categoriesLoading ? (
            <div className="animate-pulse space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-muted rounded"></div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/blog/category/${category.name}`}
                className="text-muted-foreground hover:text-foreground transition-colors flex justify-between"
              >
                <span>{category.name}</span>
                {/* Count would be dynamic in a real app */}
                <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                  {articles.filter(a => a.categories.includes(category.name)).length}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Aucune catégorie disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Articles récents</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {loadingArticles ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            articles
              .filter(article => article.published)
              .slice(0, 5)
              .map((article) => (
                <div key={article.id} className="group">
                  <Link
                    to={`/blog/${article.id}`}
                    className="font-medium group-hover:text-primary transition-colors"
                  >
                    {article.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              ))
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tagsLoading ? (
              <div className="animate-pulse flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-7 w-16 bg-muted rounded-full"></div>
                ))}
              </div>
            ) : (
              tags.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/blog/tag/${tag.name}`}
                  className="bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full px-3 py-1 text-sm transition-colors"
                >
                  #{tag.name}
                </Link>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Abonnez-vous pour recevoir nos derniers articles et actualités sur l'hypnose.
          </p>
          <form className="space-y-2">
            <Input placeholder="Votre email" type="email" />
            <Button className="w-full">S'abonner</Button>
          </form>
          <p className="text-xs text-muted-foreground">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
};

export default BlogSidebar;
