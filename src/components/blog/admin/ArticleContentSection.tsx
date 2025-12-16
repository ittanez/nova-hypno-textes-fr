
import { lazy, Suspense } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Article } from "@/lib/types/blog";

// Lazy load de TinyMCE pour réduire le bundle initial (~1.3MB → chargé à la demande)
const RichTextEditor = lazy(() => import("@/components/blog/RichTextEditor"));

// Fallback pendant le chargement de TinyMCE
const EditorLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md h-[500px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
    <div className="text-gray-500">Chargement de l'éditeur...</div>
  </div>
);

interface ArticleContentSectionProps {
  article: Partial<Article>;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (content: string) => void;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ArticleContentSection = ({
  article,
  onTitleChange,
  onContentChange,
  onFieldChange,
  onImageUpload,
}: ArticleContentSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre *</Label>
        <Input
          id="title"
          name="title"
          value={article.title || ''}
          onChange={onTitleChange}
          placeholder="Titre de l'article"
          required
          className="text-xl font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label>Contenu *</Label>
        <Suspense fallback={<EditorLoadingFallback />}>
          <RichTextEditor
            value={article.content || ""}
            onChange={onContentChange}
            height={500}
          />
        </Suspense>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extrait / Résumé</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={article.excerpt || ''}
          onChange={onFieldChange}
          placeholder="Bref résumé de l'article"
          className="min-h-[80px]"
        />
        <p className="text-xs text-gray-500">
          Affiché sur la page d'accueil. Si non renseigné, les premiers caractères du contenu seront utilisés.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image principale</Label>
        <div className="flex items-center gap-4">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="max-w-md"
          />
          {article.image_url && (
            <div className="w-16 h-16 rounded overflow-hidden">
              <img
                src={article.image_url}
                alt="Aperçu"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Format recommandé: 1200x630px
        </p>
      </div>
    </div>
  );
};

export default ArticleContentSection;
