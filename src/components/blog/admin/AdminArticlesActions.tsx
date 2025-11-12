
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MoreHorizontal from 'lucide-react/dist/esm/icons/more-horizontal';
import Eye from 'lucide-react/dist/esm/icons/eye';
import Edit from 'lucide-react/dist/esm/icons/edit';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import Send from 'lucide-react/dist/esm/icons/send';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';
import { useToast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  slug: string;
  published: boolean;
}

interface AdminArticlesActionsProps {
  article: Article;
  isDeleting: boolean;
  onView: (article: Article) => void;
  onEdit: (articleId: string) => void;
  onDelete: (article: Article) => void;
  onShare: (article: Article) => void;
}

const AdminArticlesActions = ({
  article,
  isDeleting,
  onView,
  onEdit,
  onDelete,
  onShare
}: AdminArticlesActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onView(article)}>
          <Eye className="h-4 w-4 mr-2" />
          Voir
          {article.published && <ExternalLink className="h-3 w-3 ml-1" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(article.id)}>
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </DropdownMenuItem>
        {article.published && (
          <DropdownMenuItem onClick={() => onShare(article)}>
            <Send className="h-4 w-4 mr-2" />
            Partager
          </DropdownMenuItem>
        )}
        <DropdownMenuItem 
          className="text-red-600"
          onClick={() => onDelete(article)}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? 'Suppression...' : 'Supprimer'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminArticlesActions;
