
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sparkles, Eye, Code, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateSummaryAndKeywords } from '@/utils/aiUtils';
import ImageGallery from './ImageGallery';

interface ArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
  onGenerateAI?: () => void;
  isGenerating?: boolean;
}

export default function ArticleEditor({ 
  value, 
  onChange, 
  onGenerateAI,
  isGenerating = false 
}: ArticleEditorProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('write');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  
  const handleGenerateAI = () => {
    if (!value || value.length < 100) {
      toast({
        title: "Contenu insuffisant",
        description: "Veuillez ajouter plus de contenu pour générer un résumé et des mots-clés.",
        variant: "destructive"
      });
      return;
    }
    
    if (onGenerateAI) {
      onGenerateAI();
    }
  };

  const insertHTML = (tag: string) => {
    if (!editorRef.current) return;
    
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const text = value;
    const selectedText = text.substring(start, end);
    
    let replacement = '';
    
    switch (tag) {
      case 'h2':
        replacement = `<h2>${selectedText || 'Titre de section'}</h2>`;
        break;
      case 'h3':
        replacement = `<h3>${selectedText || 'Sous-titre'}</h3>`;
        break;
      case 'p':
        replacement = `<p>${selectedText || 'Nouveau paragraphe'}</p>`;
        break;
      case 'strong':
        replacement = `<strong>${selectedText || 'texte en gras'}</strong>`;
        break;
      case 'em':
        replacement = `<em>${selectedText || 'texte en italique'}</em>`;
        break;
      case 'ul':
        replacement = `<ul>
  <li>${selectedText || 'Élément de liste'}</li>
  <li>Second élément</li>
  <li>Troisième élément</li>
</ul>`;
        break;
      case 'ol':
        replacement = `<ol>
  <li>${selectedText || 'Premier élément'}</li>
  <li>Second élément</li>
  <li>Troisième élément</li>
</ol>`;
        break;
      case 'blockquote':
        replacement = `<blockquote>
  ${selectedText || 'Citation importante'}
</blockquote>`;
        break;
      case 'img':
        setImageGalleryOpen(true);
        return;
      case 'a':
        replacement = `<a href="URL_DU_LIEN" target="_blank">${selectedText || 'Texte du lien'}</a>`;
        break;
      default:
        return;
    }
    
    const newText = text.substring(0, start) + replacement + text.substring(end);
    onChange(newText);
    
    // Focus back to editor after insertion and place cursor at the right position
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        const newPosition = start + replacement.length;
        editorRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  const handleInsertImage = (imageUrl: string, altText?: string) => {
    if (!editorRef.current) return;
    
    const imgHtml = `<img src="${imageUrl}" alt="${altText || ''}" class="img-fluid" />`;
    
    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const text = value;
    
    const newText = text.substring(0, start) + imgHtml + text.substring(end);
    onChange(newText);
    
    // Focus back to editor after insertion
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        const newPosition = start + imgHtml.length;
        editorRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('h2')}>Titre H2</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('h3')}>Titre H3</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('p')}>Paragraphe</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('strong')}>Gras</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('em')}>Italique</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('ul')}>Liste à puces</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('ol')}>Liste numérotée</Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('blockquote')}>Citation</Button>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => insertHTML('img')}
          className="flex items-center gap-1"
        >
          <ImageIcon className="h-4 w-4" /> Image
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => insertHTML('a')}>Lien</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="write" className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            Éditeur HTML
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </TabsTrigger>
          <TabsTrigger value="generate" className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2" />
            Générer AI
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="write">
          <Textarea
            ref={editorRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[500px] font-mono"
            placeholder="Entrez le contenu HTML de votre article ici..."
          />
        </TabsContent>
        
        <TabsContent value="preview">
          <Card className="p-4 min-h-[500px] overflow-auto">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="generate">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cliquez sur le bouton ci-dessous pour générer automatiquement un résumé et des mots-clés basés sur le contenu de votre article.
            </p>
            
            <Button
              onClick={handleGenerateAI}
              disabled={isGenerating || !value}
              className="w-full"
            >
              {isGenerating ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2"></div>
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              Générer résumé et mots-clés
            </Button>
            
            <div className="bg-muted rounded p-4">
              <h4 className="text-sm font-semibold mb-2">Comment ça fonctionne</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• L'outil analyse le contenu de votre article</li>
                <li>• Il extrait les passages les plus pertinents pour le résumé</li>
                <li>• Il identifie les mots-clés les plus importants</li>
                <li>• Les champs résumé et mots-clés sont automatiquement remplis</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <ImageGallery 
        open={imageGalleryOpen} 
        onOpenChange={setImageGalleryOpen} 
        onSelectImage={handleInsertImage} 
      />
    </div>
  );
}
