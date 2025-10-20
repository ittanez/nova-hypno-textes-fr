
import { useRef, useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Editor } from '@tinymce/tinymce-react';
import { Textarea } from "@/components/ui/textarea";

// Types pour TinyMCE
interface TinyMCEEditor {
  getContent: () => string;
  setContent: (content: string) => void;
  focus: () => void;
}

interface BlobInfo {
  blob: () => Blob;
  filename: () => string;
}

interface UploadHandler {
  (blobInfo: BlobInfo, progress: (percent: number) => void): Promise<string>;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  height?: number;
}

const RichTextEditor = ({ value, onChange, label, height = 500 }: RichTextEditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Timeout après 10 secondes si TinyMCE ne charge pas
  useEffect(() => {
    console.log('🔄 RichTextEditor: Démarrage du timeout (10s)');
    const timer = setTimeout(() => {
      if (!isReady) {
        console.warn('⚠️ TinyMCE n\'a pas chargé après 10s - Basculement sur textarea');
        setLoadingTimeout(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isReady]);

  return (
    <div className="space-y-2">
      {label && <Label htmlFor="content">{label}</Label>}

      {/* Fallback : Textarea si TinyMCE ne charge pas */}
      {loadingTimeout && !isReady && (
        <div className="space-y-2">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
            ⚠️ L'éditeur visuel n'a pas pu se charger. Vous pouvez utiliser cet éditeur texte basique (Markdown supporté).
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono text-sm"
            style={{ minHeight: `${height}px` }}
            placeholder="Écrivez votre contenu ici (Markdown supporté)..."
          />
        </div>
      )}

      {/* Message de chargement */}
      {!isReady && !loadingTimeout && (
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-md" style={{ height: `${height}px` }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
          <div className="text-gray-500">Chargement de l'éditeur...</div>
          <div className="text-xs text-gray-400 mt-2">Si le chargement dure plus de 10s, un éditeur de secours s'affichera</div>
        </div>
      )}

      {/* TinyMCE Editor */}
      <div style={{ display: isReady ? 'block' : 'none' }}>
        <Editor
          apiKey="6q2l0qo2d981lsmsnugf2o15m593samljjw043nc4ol1ao8t"
          onInit={(evt: Event, editor: TinyMCEEditor) => {
            console.log('✅ TinyMCE chargé avec succès');
            editorRef.current = editor;
            setIsReady(true);
          }}
          initialValue={value}
          value={value}
          onEditorChange={(newContent: string) => onChange(newContent)}
          init={{
            height,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media | removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            image_advtab: true,
            images_upload_handler: (blobInfo: BlobInfo, progress: (percent: number) => void) => {
              return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  if (e.target?.result) {
                    resolve(e.target.result as string);
                  } else {
                    reject('Erreur lors de la lecture du fichier');
                  }
                };
                reader.readAsDataURL(blobInfo.blob());
              });
            },
            language: 'fr_FR',
            language_url: 'https://cdn.tiny.cloud/1/6q2l0qo2d981lsmsnugf2o15m593samljjw043nc4ol1ao8t/tinymce/6/langs/fr_FR.js',
            skin: "oxide",
            branding: false,
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
