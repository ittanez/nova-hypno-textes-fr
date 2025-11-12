
import React from 'react';
import { TableHead } from '@/components/ui/table';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';

type SortField = 'title' | 'created_at' | 'published_at' | 'status';
type SortDirection = 'asc' | 'desc';

interface AdminArticlesSortableHeaderProps {
  field: SortField;
  children: React.ReactNode;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const AdminArticlesSortableHeader = ({ 
  field, 
  children, 
  sortField, 
  sortDirection, 
  onSort 
}: AdminArticlesSortableHeaderProps) => (
  <TableHead 
    className="cursor-pointer hover:bg-gray-50 select-none"
    onClick={() => onSort(field)}
  >
    <div className="flex items-center gap-1">
      {children}
      {sortField === field && (
        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
      )}
    </div>
  </TableHead>
);

export default AdminArticlesSortableHeader;
