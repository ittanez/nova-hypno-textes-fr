
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Tag, Folder } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
}

const BlogSidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const location = useLocation();
  
  // Determine if we're in /blog or /blog-temp
  const basePath = location.pathname.startsWith('/blog-temp') ? '/blog-temp' : '/blog';
  
  useEffect(() => {
    // In a real app, these would come from an API
    // For now, we'll use mock data
    setCategories([
      { id: '1', name: 'Hypnose Ericksonienne', slug: 'hypnose-ericksonienne', articleCount: 5 },
      { id: '2', name: 'Auto-hypnose', slug: 'auto-hypnose', articleCount: 3 },
      { id: '3', name: 'Gestion du stress', slug: 'gestion-du-stress', articleCount: 2 },
    ]);
    
    setTags([
      { id: '1', name: 'Sommeil', slug: 'sommeil', articleCount: 4 },
      { id: '2', name: 'Confiance en soi', slug: 'confiance-en-soi', articleCount: 3 },
      { id: '3', name: 'Anxiété', slug: 'anxiete', articleCount: 2 },
      { id: '4', name: 'Addictions', slug: 'addictions', articleCount: 1 },
    ]);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${basePath}?search=${encodeURIComponent(searchQuery)}`;
    }
  };
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscribeMessage('Veuillez entrer une adresse email valide.');
      return;
    }
    
    setIsSubscribing(true);
    
    // In a real app, this would be an API call
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeMessage('Merci de votre inscription ! Veuillez confirmer votre email.');
      setEmail('');
    } catch (error) {
      setSubscribeMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubscribing(false);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Rechercher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" variant="default">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Folder className="mr-2 h-5 w-5" />
            Catégories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category.id} className="flex items-center justify-between">
                <Link 
                  to={`${basePath}/category/${category.slug}`} 
                  className="hover:text-nova-blue transition-colors"
                >
                  {category.name}
                </Link>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {category.articleCount}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link 
                key={tag.id}
                to={`${basePath}/tag/${tag.slug}`}
                className="bg-muted hover:bg-nova-blue-light hover:text-nova-blue-dark transition-colors px-3 py-1 rounded-full text-sm"
              >
                {tag.name} ({tag.articleCount})
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Subscribe */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">S'abonner au blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {subscribeMessage && (
                <p className={`text-sm ${subscribeMessage.includes('Merci') ? 'text-green-600' : 'text-red-600'}`}>
                  {subscribeMessage}
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-nova-blue hover:bg-nova-blue-dark"
              disabled={isSubscribing}
            >
              {isSubscribing ? 'En cours...' : 'S\'abonner'}
            </Button>
            <p className="text-xs text-muted-foreground">
              En vous abonnant, vous recevrez un email pour chaque nouvel article publié.
              Vous pourrez vous désabonner à tout moment.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSidebar;
