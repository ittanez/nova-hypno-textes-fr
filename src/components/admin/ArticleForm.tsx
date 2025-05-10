
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, Sparkles } from 'lucide-react';
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
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useCategories } from '@/hooks/blog/useCategories';
import { generateSummaryAndKeywords } from '@/utils/aiUtils';
import { Article, Category, Tag } from '@/types/blog';
import ArticleEditor from '@/components/admin/ArticleEditor';
import MediaLibrary from '@/components/admin/MediaLibrary';

// Define schema for form validation
const formSchema = z.object({
  title: z.string().min(1, { message: 'Le titre est requis' }),
  content: z.string().min(50, { message: 'Le contenu doit contenir au moins 50 caractères' }),
  excerpt: z.string().min(10, { message: 'Le résumé doit contenir au moins 10 caractères' }),
  author: z.string().optional(),
  image_url: z.string().optional(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  article?: Article;
  categories: Category[];
  tags: Tag[];
  isCreating: boolean;
  isPending: boolean;
  onSubmit: (values: FormValues, publish: boolean) => void;
}

export default function ArticleForm({
  article,
  categories,
  tags,
  isCreating,
  isPending,
  onSubmit,
}: ArticleFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(article?.image_url || null);

  // Default values for the form
  const defaultValues: FormValues = {
    title: article?.title || '',
    content: article?.content || '',
    excerpt: article?.excerpt || '',
    author: article?.author || '',
    image_url: article?.image_url || '',
    categories: article?.categories || [],
    tags: article?.tags || [],
    published: article?.published || false,
    featured: article?.featured || false,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

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
      // Attendre la résolution de la promesse
      const result = await generateSummaryAndKeywords(content);
      
      // Maintenant nous pouvons accéder aux propriétés
      form.setValue('excerpt', result.excerpt);
      
      // Assurons-nous que keywords est bien un tableau
      const keywordArray = Array.isArray(result.keywords) 
        ? result.keywords 
        : [result.keywords].filter(Boolean);
        
      form.setValue('tags', keywordArray);
      
      toast({
        title: "Génération réussie",
        description: "Le résumé et les mots-clés ont été générés automatiquement"
      });
    } catch (error: any) {
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

  const handleImageSelected = (imageUrl: string) => {
    form.setValue('image_url', imageUrl);
    setPreviewImage(imageUrl);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - article editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre de l'article" {...field} />
                      </FormControl>
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
                        <ArticleEditor
                          value={field.value}
                          onChange={field.onChange}
                          onGenerateAI={handleGenerateAI}
                          isGenerating={isGenerating}
                        />
                      </FormControl>
                      <FormDescription>
                        Utilisez l'éditeur pour formater votre contenu
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 space-y-6">
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
                            className="min-h-[100px]"
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
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auteur (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'auteur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar - article settings */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publié</FormLabel>
                        <FormDescription>
                          Rendre cet article visible sur le blog
                        </FormDescription>
                      </div>
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Mis en avant</FormLabel>
                        <FormDescription>
                          Mettre cet article en avant sur la page d'accueil
                        </FormDescription>
                      </div>
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégories</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange([value])}
                        value={field.value && field.value.length > 0 ? field.value[0] : undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        La catégorie principale de l'article
                      </FormDescription>
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
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <div
                            key={tag.id}
                            className={`
                              px-3 py-1 text-sm rounded-full cursor-pointer
                              ${field.value?.includes(tag.name) 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-secondary text-secondary-foreground'}
                            `}
                            onClick={() => {
                              const currentTags = field.value || [];
                              const isSelected = currentTags.includes(tag.name);
                              
                              field.onChange(
                                isSelected
                                  ? currentTags.filter(t => t !== tag.name)
                                  : [...currentTags, tag.name]
                              );
                            }}
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                      <FormDescription>
                        Sélectionnez un ou plusieurs tags pour votre article
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Image principale</FormLabel>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      {previewImage ? (
                        <div className="relative w-full">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="absolute bottom-2 right-2"
                            onClick={() => {
                              setPreviewImage(null);
                              form.setValue('image_url', '');
                            }}
                          >
                            Supprimer
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-40 rounded-md border-2 border-dashed p-4">
                          <p className="text-muted-foreground text-sm mb-2">
                            Aucune image sélectionnée
                          </p>
                          <MediaLibrary onImageSelect={handleImageSelected} />
                        </div>
                      )}
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="image_url"
                      render={({ field }) => (
                        <FormItem hidden>
                          <FormControl>
                            <Input type="hidden" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Submit buttons */}
            <div className="space-y-2">
              <Button
                type="button"
                className="w-full"
                disabled={isPending}
                onClick={form.handleSubmit((values) => onSubmit(values, false))}
              >
                <Save className="mr-2 h-4 w-4" />
                Enregistrer comme brouillon
              </Button>
              
              <Button
                type="button"
                variant="default"
                className="w-full bg-nova-blue hover:bg-nova-blue-dark"
                disabled={isPending}
                onClick={form.handleSubmit((values) => {
                  values.published = true;
                  onSubmit(values, true);
                })}
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isCreating ? "Publier l'article" : "Mettre à jour et publier"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
