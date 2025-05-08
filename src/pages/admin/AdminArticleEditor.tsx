
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Save, Image, Calendar, Sparkles } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { generateSummaryAndKeywords } from '@/utils/aiUtils';

// Define schema for form validation
const formSchema = z.object({
  title: z.string().min(1, { message: 'Le titre est requis' }),
  slug: z.string().min(1, { message: 'Le slug est requis' }),
  excerpt: z.string().min(10, { message: 'Le résumé doit contenir au moins 10 caractères' }),
  content: z.string().min(50, { message: 'Le contenu doit contenir au moins 50 caractères' }),
  category: z.string().min(1, { message: 'La catégorie est requise' }),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.enum(['draft', 'published', 'scheduled']),
  metaDescription: z.string().max(160, { message: 'La méta description ne doit pas dépasser 160 caractères' }).optional(),
  keywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  name: string;
  slug: string;
}

const AdminArticleEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingInitialData, setLoadingInitialData] = useState(isEditing);
  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [savedArticles, setSavedArticles] = useState<FormValues[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      imageUrl: '',
      status: 'draft',
      metaDescription: '',
      keywords: '',
    },
  });

  useEffect(() => {
    // Retrieve saved articles from localStorage
    const storedArticles = localStorage.getItem('blog_articles');
    if (storedArticles) {
      setSavedArticles(JSON.parse(storedArticles));
    }

    // Fetch categories for the dropdown
    // In a real app, this would be an API call
    const fetchCategories = async () => {
      try {
        const mockCategories = [
          { id: '1', name: 'Hypnose Ericksonienne', slug: 'hypnose-ericksonienne' },
          { id: '2', name: 'Auto-hypnose', slug: 'auto-hypnose' },
          { id: '3', name: 'Gestion du stress', slug: 'gestion-du-stress' },
        ];
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les catégories',
          variant: 'destructive',
        });
      }
    };

    fetchCategories();

    // If editing, fetch the article data
    if (isEditing) {
      const fetchArticle = async () => {
        setLoadingInitialData(true);
        try {
          // In a real app, this would be an API call
          // For demo purposes, we'll use localStorage
          const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
          const article = articles.find((a: FormValues) => a.slug === id);

          if (article) {
            form.reset(article);
            setPreviewImage(article.imageUrl || null);
          } else if (id === '1') {
            const articleData = {
              title: "L'hypnose ericksonienne et les mécanismes du changement",
              slug: 'hypnose-ericksonienne-mecanismes-changement',
              excerpt: 'Découvrez les principes fondamentaux de l\'hypnose ericksonienne et comment elle active les mécanismes naturels du changement dans notre inconscient.',
              content: `
<h2>Les fondements de l'hypnose ericksonienne</h2>
<p>L'hypnose ericksonienne, développée par le psychiatre américain Milton H. Erickson, est une approche thérapeutique qui se distingue par sa souplesse et son respect de l'unicité de chaque individu. Contrairement aux formes plus directives d'hypnose, l'approche ericksonienne considère que chaque personne possède déjà en elle les ressources nécessaires pour résoudre ses problèmes.</p>

<p>Cette approche repose sur plusieurs principes fondamentaux :</p>

<ul>
<li>L'inconscient est un réservoir de ressources positives</li>
<li>Chaque personne est unique et nécessite une approche personnalisée</li>
<li>La résistance du patient est utilisée comme un levier thérapeutique plutôt qu'un obstacle</li>
<li>Le changement s'opère souvent de manière indirecte et métaphorique</li>
</ul>

<h2>La transe hypnotique : un état naturel</h2>

<p>Contrairement aux idées reçues, l'état de transe hypnotique n'est pas un état mystérieux ou surnaturel. Il s'agit d'un état modifié de conscience que nous expérimentons tous quotidiennement : lorsque nous sommes absorbés dans un livre, dans nos pensées en conduisant, ou lorsque nous nous perdons dans nos rêveries.</p>
              `,
              category: '1',
              tags: 'confiance en soi,anxiété',
              imageUrl: '/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png',
              status: 'published',
              metaDescription: 'Découvrez les principes fondamentaux de l\'hypnose ericksonienne et comment elle active les mécanismes naturels du changement dans notre inconscient.',
              keywords: 'hypnose, ericksonien, inconscient, thérapie, changement, milton erickson',
            } as FormValues;

            form.reset(articleData);
            setPreviewImage(articleData.imageUrl);
          } else {
            // Handle non-existent article
            toast({
              title: 'Article non trouvé',
              description: "L'article que vous essayez de modifier n'existe pas.",
              variant: 'destructive',
            });
            navigate('/admin-blog/dashboard');
          }
        } catch (error) {
          console.error('Error fetching article:', error);
          toast({
            title: 'Erreur',
            description: "Impossible de charger les données de l'article",
            variant: 'destructive',
          });
          navigate('/admin-blog/dashboard');
        } finally {
          setLoadingInitialData(false);
        }
      };

      fetchArticle();
    }
  }, [id, isEditing, navigate, toast, form]);

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would send data to an API
      console.log('Form values to submit:', values);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for demo purposes
      const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
      
      if (isEditing) {
        // Update existing article
        const updatedArticles = articles.map((article: FormValues) => 
          article.slug === id ? values : article
        );
        localStorage.setItem('blog_articles', JSON.stringify(updatedArticles));
      } else {
        // Add new article
        articles.push(values);
        localStorage.setItem('blog_articles', JSON.stringify(articles));
      }
      
      setSavedArticles(articles);
      
      toast({
        title: isEditing ? 'Article mis à jour' : 'Article créé',
        description: isEditing 
          ? "Les modifications ont été enregistrées avec succès"
          : "L'article a été créé avec succès",
      });
      
      // Navigate back to dashboard
      navigate('/admin-blog/dashboard');
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de l'enregistrement",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = () => {
    const title = form.getValues('title');
    if (!title) return;
    
    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')  // Remove special chars
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
      .trim();
    
    form.setValue('slug', slug);
  };

  const handleGenerateAI = async () => {
    const content = form.getValues('content');
    
    if (!content || content.length < 100) {
      toast({
        title: "Contenu insuffisant",
        description: "Veuillez ajouter plus de contenu pour générer un résumé et des mots-clés.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // In a real app, this would be an API call to an AI service
      // For demo purposes, we'll use a simple function
      const { excerpt, keywords } = generateSummaryAndKeywords(content);
      
      form.setValue('excerpt', excerpt);
      form.setValue('keywords', keywords);
      form.setValue('metaDescription', excerpt.substring(0, 155) + '...');
      
      toast({
        title: "Génération réussie",
        description: "Le résumé et les mots-clés ont été générés automatiquement"
      });
    } catch (error) {
      console.error('Error generating AI content:', error);
      toast({
        title: "Erreur de génération",
        description: "Impossible de générer le contenu automatiquement",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUploaded = (imageUrl: string) => {
    form.setValue('imageUrl', imageUrl);
    setPreviewImage(imageUrl);
  };

  if (loadingInitialData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isEditing ? "Modifier l'article" : "Nouvel article"} | NovaHypnose Blog Admin
        </title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin-blog/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <h1 className="text-3xl font-serif font-bold">
              {isEditing ? "Modifier l'article" : "Nouvel article"}
            </h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - article editor */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenu de l'article</CardTitle>
                    <CardDescription>
                      Saisissez les informations principales de votre article
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Titre de l'article"
                              {...field}
                              onBlur={() => {
                                if (!isEditing && !form.getValues('slug')) {
                                  generateSlug();
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug (URL)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-grow">
                              <Input placeholder="mon-article-slug" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={generateSlug}
                            >
                              Générer
                            </Button>
                          </div>
                          <FormDescription>
                            L'URL de votre article (ex: /blog/mon-article-slug)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Résumé</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-grow">
                              <Textarea 
                                placeholder="Un bref résumé de votre article (affiché sur la page d'accueil)"
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className="self-start"
                              onClick={handleGenerateAI}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            Un court extrait qui apparaîtra dans les listes d'articles
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contenu</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Contenu de l'article (HTML supporté)"
                              className="min-h-[400px] font-mono"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Vous pouvez utiliser du HTML pour formater votre contenu
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>SEO & Métadonnées</CardTitle>
                    <CardDescription>
                      Ces informations aident à optimiser votre article pour les moteurs de recherche
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Méta description</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-grow">
                              <Textarea 
                                placeholder="Une description concise de votre article (pour les moteurs de recherche)"
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className="self-start"
                              onClick={handleGenerateAI}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            Limitée à 160 caractères, cette description apparaît dans les résultats de recherche
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mots-clés</FormLabel>
                          <div className="flex gap-2">
                            <FormControl className="flex-grow">
                              <Input
                                placeholder="hypnose, ericksonien, thérapie, etc."
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleGenerateAI}
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            Séparés par des virgules (ex: hypnose, thérapie, bien-être)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                {/* Submit buttons at the bottom */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/admin-blog/dashboard')}
                  >
                    Annuler
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      type="submit"
                      disabled={isLoading}
                      onClick={() => form.setValue('status', 'draft')}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? "Enregistrement..." : "Enregistrer comme brouillon"}
                    </Button>
                    <Button 
                      type="submit"
                      variant="default"
                      disabled={isLoading}
                      onClick={() => form.setValue('status', 'published')}
                      className="bg-nova-blue hover:bg-nova-blue-dark"
                    >
                      {isLoading ? "Publication..." : "Publier l'article"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Sidebar - article settings */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Catégories & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="anxiété, sommeil, confiance"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Séparés par des virgules (ex: anxiété, sommeil, confiance)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Image principale</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader 
                  onImageUploaded={handleImageUploaded} 
                  currentImage={previewImage}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminArticleEditor;
