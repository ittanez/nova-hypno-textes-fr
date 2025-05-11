import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';
import { useArticles } from '@/hooks/blog/useArticles';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import { Article } from '@/types/blog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const SimpleBlogAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading } = useAuth();
  const { fetchArticles, fetchArticleById, createArticle, updateArticle, deleteArticle } = useArticles();
  const { categories, fetchCategories } = useCategories();
  const { tags, fetchTags } = useTags();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast({
        title: "Accès non autorisé",
        description: "Vous devez être administrateur pour accéder à cette page",
        variant: "destructive"
      });
      navigate('/admin-blog');
      return;
    }

    const loadArticles = async () => {
      setLoading(true);
      const { articles: fetchedArticles } = await fetchArticles();
      setArticles(fetchedArticles || []);
      setLoading(false);
    };

    if (isAdmin) {
      loadArticles();
      fetchCategories();
      fetchTags();
    }
  }, [isAdmin, isLoading, navigate, toast, fetchArticles, fetchCategories, fetchTags]);

  const handleCreateArticle = () => {
    setEditingArticle(null);
    setShowArticleForm(true);
  };

  const handleEditArticle = async (id: string) => {
    const { article } = await fetchArticleById(id);
  
    if (article) {
      setEditingArticle(article);
      setShowArticleForm(true);
    } else {
      toast({
        title: "Erreur",
        description: "L'article demandé n'a pas été trouvé",
        variant: "destructive",
      });
    }
  };

  const handlePublishArticle = async (id: string) => {
    setIsPublishing(true);
    try {
      const articleToPublish = articles.find(article => article.id === id);
      if (!articleToPublish) {
        throw new Error("Article not found");
      }
  
      // Optimistically update the UI
      setArticles(articles.map(article =>
        article.id === id ? { ...article, published: true } : article
      ));
  
      // Update the article in the database
      await updateArticle(id, { published: true });
  
      toast({
        title: "Article publié",
        description: "L'article a été publié avec succès.",
      });
    } catch (error: any) {
      console.error("Error publishing article:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la publication de l'article.",
        variant: "destructive",
      });
      // Revert the UI update in case of failure
      setArticles(articles.map(article =>
        article.id === id ? { ...article, published: false } : article
      ));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublishArticle = async (id: string) => {
    setIsUnpublishing(true);
    try {
      const articleToUnpublish = articles.find(article => article.id === id);
      if (!articleToUnpublish) {
        throw new Error("Article not found");
      }
  
      // Optimistically update the UI
      setArticles(articles.map(article =>
        article.id === id ? { ...article, published: false } : article
      ));
  
      // Update the article in the database
      await updateArticle(id, { published: false });
  
      toast({
        title: "Article retiré",
        description: "L'article a été retiré de la publication avec succès.",
      });
    } catch (error: any) {
      console.error("Error unpublishing article:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors du retrait de la publication de l'article.",
        variant: "destructive",
      });
      // Revert the UI update in case of failure
      setArticles(articles.map(article =>
        article.id === id ? { ...article, published: true } : article
      ));
    } finally {
      setIsUnpublishing(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    setIsDeleting(true);
    try {
      // Optimistically update the UI
      setArticles(articles.filter(article => article.id !== id));
  
      // Delete the article from the database
      await deleteArticle(id);
  
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès.",
      });
    } catch (error: any) {
      console.error("Error deleting article:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'article.",
        variant: "destructive",
      });
      // Revert the UI update in case of failure
      const { article: restoredArticle } = await fetchArticleById(id);
      if (restoredArticle) {
        setArticles([...articles, restoredArticle]);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleArticleFormClose = () => {
    setShowArticleForm(false);
    setEditingArticle(null);
  };

  const handleArticleSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (editingArticle) {
        // Update existing article
        await updateArticle(editingArticle.id, data);
        setArticles(articles.map(article => article.id === editingArticle.id ? { ...article, ...data } : article));
        toast({
          title: "Article mis à jour",
          description: "L'article a été mis à jour avec succès.",
        });
      } else {
        // Create new article
        const { data: newArticle } = await createArticle(data);
        if (newArticle) {
          setArticles([...articles, newArticle]);
          toast({
            title: "Article créé",
            description: "L'article a été créé avec succès.",
          });
        }
      }
      handleArticleFormClose();
    } catch (error: any) {
      console.error("Error submitting article:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la soumission de l'article.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="h-12 w-12 border-4 border-t-nova-blue rounded-full animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion des articles | Administration NovaHypnose</title>
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold">Gestion des articles</h1>
            <p className="text-muted-foreground">Gérez vos articles de blog</p>
          </div>
          <Button onClick={handleCreateArticle}>Créer un nouvel article</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Titre</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.published ? 'Publié' : 'Brouillon'}</TableCell>
                  <TableCell>{new Date(article.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEditArticle(article.id)}
                      className="mr-2"
                    >
                      Modifier
                    </Button>
                    {article.published ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleUnpublishArticle(article.id)}
                        disabled={isUnpublishing}
                      >
                        {isUnpublishing ? 'Dépublication...' : 'Dépublier'}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublishArticle(article.id)}
                        disabled={isPublishing}
                      >
                        {isPublishing ? 'Publication...' : 'Publier'}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteArticle(article.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <ArticleFormDialog
          open={showArticleForm}
          onClose={handleArticleFormClose}
          onSubmit={handleArticleSubmit}
          article={editingArticle}
          categories={categories}
          tags={tags}
        />
      </div>
    </>
  );
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  content: z.string().min(10, {
    message: "Le contenu doit contenir au moins 10 caractères.",
  }),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false).optional(),
  scheduled_for: z.date().optional(),
});

interface ArticleFormValues extends z.infer<typeof formSchema> {}

interface ArticleFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ArticleFormValues) => void;
  article?: Article | null;
  categories: any[];
  tags: any[];
}

const ArticleFormDialog: React.FC<ArticleFormDialogProps> = ({ open, onClose, onSubmit, article, categories, tags }) => {
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      excerpt: article?.excerpt || "",
      category: article?.categories?.[0] || "",
      tags: article?.tags || [],
      published: article?.published || false,
      scheduled_for: article?.scheduled_for ? new Date(article.scheduled_for) : undefined,
    },
  });

  const handleFormSubmit = (values: ArticleFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{article ? "Modifier l'article" : "Créer un article"}</DialogTitle>
          <DialogDescription>
            {article ? "Modifiez les détails de votre article." : "Créez un nouvel article pour votre blog."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
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
                    <Textarea placeholder="Contenu de l'article" {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extrait</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Petit résumé de l'article"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
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
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <div key={tag.id} className="space-x-2 flex items-center">
                        <Checkbox
                          id={tag.id}
                          checked={field.value?.includes(tag.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), tag.id])
                            } else {
                              field.onChange(field.value?.filter((value) => value !== tag.id))
                            }
                          }}
                        />
                        <label
                          htmlFor={tag.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publié</FormLabel>
                    <FormDescription>
                      Activer pour publier l'article immédiatement.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduled_for"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de publication planifiée</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Choisir une date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Soumettre</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleBlogAdmin;
