import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Plus from 'lucide-react/dist/esm/icons/plus';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import type { ArticleFaqItem } from '@/lib/types/blog';

interface ArticleFAQSectionProps {
  faqItems: ArticleFaqItem[];
  onFaqChange: (items: ArticleFaqItem[]) => void;
}

const ArticleFAQSection: React.FC<ArticleFAQSectionProps> = ({
  faqItems,
  onFaqChange,
}) => {
  const addItem = () => {
    onFaqChange([...faqItems, { question: '', answer: '' }]);
  };

  const removeItem = (index: number) => {
    onFaqChange(faqItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = faqItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onFaqChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">FAQ de l'article</h3>
          <p className="text-xs text-gray-500 mt-1">
            Questions-reponses indexees par les moteurs de recherche et les IA (schema.org FAQPage)
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addItem} className="flex items-center gap-2">
          <Plus size={16} />
          Ajouter une question
        </Button>
      </div>

      {faqItems.length === 0 && (
        <p className="text-sm text-gray-400 italic">
          Aucune FAQ pour cet article. Cliquez sur "Ajouter une question" pour commencer.
        </p>
      )}

      {faqItems.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3 relative">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Question {index + 1}
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeItem(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <Input
            value={item.question}
            onChange={(e) => updateItem(index, 'question', e.target.value)}
            placeholder="Ex: Combien de seances sont necessaires ?"
          />

          <Label className="text-sm text-gray-500">Reponse</Label>
          <Textarea
            value={item.answer}
            onChange={(e) => updateItem(index, 'answer', e.target.value)}
            placeholder="Reponse detaillee..."
            className="min-h-[100px]"
          />
        </div>
      ))}
    </div>
  );
};

export default ArticleFAQSection;
