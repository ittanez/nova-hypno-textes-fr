
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/blog/useAuth';
import { useArticles } from '@/hooks/blog/useArticles';
import { useCategories } from '@/hooks/blog/useCategories';
import { useTags } from '@/hooks/blog/useTags';
import ArticleForm from '@/components/admin/ArticleForm';

const AdminArticleEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const { getArticle, createArticle, updateArticle } = useArticles();
  const { categories } = useCategories();
  const { tags } = useTags();
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(isEditing);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-blog');
      return;
    }

    if (isEditing && id) {
      const fetchArticle = async () => {
        setLoading(true);
        const articleData = await getArticle(id);
        
        if (articleData) {
          setArticle(articleData);
        } else {
          toast({
            title: 'Erreur',
            description: "L'article demandé n'a pas été trouvé",
            variant: 'destructive',
          });
          navigate('/admin-blog/dashboard');
        }
        setLoading(false);
      };
      
      fetchArticle();
    } else {
      setLoading(false);
    }
  }, [id, isEditing, navigate, isAdmin]);

  const handleSubmit = async (formData: any, publish: boolean) => {
    setIsPending(true);
    
    try {
      if (publish) {
        formData.published = true;
      }
      
      let result;
      
      if (isEditing && id) {
        result = await updateArticle(id, formData);
      } else {
        result = await createArticle(formData);
      }
      
      if (result) {
        toast({
          title: isEditing ? 'Article mis à jour' : 'Article créé',
          description: isEditing 
            ? "Les modifications ont été enregistrées avec succès"
            : "L'article a été créé avec succès",
        });
        
        navigate('/admin-blog/dashboard');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: 'Erreur',
        description: "Une erreur s'est produite lors de l'enregistrement",
        variant: 'destructive',
      });
    } finally {
      setIsPending(false);
    }
  };

  if (loading) {
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
        
        <ArticleForm 
          article={article}
          categories={categories}
          tags={tags}
          isCreating={!isEditing}
          isPending={isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default AdminArticleEditor;
