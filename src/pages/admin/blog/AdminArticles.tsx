import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Plus from 'lucide-react/dist/esm/icons/plus';
import ArrowUpDown from 'lucide-react/dist/esm/icons/arrow-up-down';
import ArrowUp from 'lucide-react/dist/esm/icons/arrow-up';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Article } from '@/lib/types/blog';
import { useAdminArticles } from '@/hooks/useAdminArticles';
import { logger } from '@/lib/logger';
import '@/styles/preview-charte.css';

const getArticleStatus = (article: Article) => {
  if (article.scheduled_for && new Date(article.scheduled_for) > new Date()) return 'scheduled';
  if (article.published) return 'published';
  return 'draft';
};

const AdminArticles = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const {
    articles, allArticlesCount, isLoading,
    deleteDialogOpen, selectedArticle,
    currentPage, totalPages, sortField, sortDirection, articlesPerPage,
    setDeleteDialogOpen, handleDeleteClick, confirmDelete,
    handleFiltersChange, handlePageChange, handleSort
  } = useAdminArticles();

  const handleNewArticle = () => {
    logger.debug('Navigation vers nouvel article...');
    navigate('/admin-blog/article/new');
  };

  const handleViewArticle = (slug: string) => window.open(`/blog/article/${slug}`, '_blank');
  const handleEditArticle = (articleId: string) => navigate(`/admin-blog/article/${articleId}/edit`);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateString));
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1 opacity-30" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />;
  };

  const renderStatusBadge = (article: Article) => {
    const status = getArticleStatus(article);
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" style={{ background: 'rgba(43,75,160,.08)', color: '#2B4BA0', borderColor: 'rgba(43,75,160,.25)', fontSize: '11px' }}>🕐 Programmé</Badge>;
      case 'published':
        return <Badge variant="outline" style={{ background: 'rgba(242,161,46,.1)', color: '#1C2B4A', borderColor: 'rgba(242,161,46,.4)', fontSize: '11px' }}>✓ Publié</Badge>;
      case 'draft':
        return <Badge variant="secondary" style={{ background: 'rgba(138,155,184,.15)', color: '#8A9BB8', fontSize: '11px' }}>📝 Brouillon</Badge>;
    }
  };

  const startIndex = (currentPage - 1) * articlesPerPage + 1;
  const endIndex = Math.min(currentPage * articlesPerPage, allArticlesCount);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '20px', color: '#8A9BB8', fontStyle: 'italic' }}>Chargement…</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F0ECE3' }} className="cz">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Header />

      <main style={{ flexGrow: 1, padding: '100px 0 60px' }}>
        <div className="container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="section-tag">Administration</div>
              <h1 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 300, color: '#1C2B4A', margin: 0, letterSpacing: '-0.02em' }}>
                Gestion des <em style={{ fontStyle: 'italic', color: '#2B4BA0' }}>articles</em>
              </h1>
              {allArticlesCount > 0 && (
                <p style={{ color: '#8A9BB8', fontSize: '13px', marginTop: '6px' }}>
                  Affichage de <strong style={{ color: '#1C2B4A' }}>{startIndex}</strong> à <strong style={{ color: '#1C2B4A' }}>{endIndex}</strong> sur <strong style={{ color: '#1C2B4A' }}>{allArticlesCount}</strong> article{allArticlesCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <button onClick={handleNewArticle} className="btn btn--amber" style={{ flexShrink: 0 }}>
              <Plus size={16} /> Nouvel article
            </button>
          </div>

          {/* Recherche */}
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Rechercher par titre…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); handleFiltersChange({ search: e.target.value, category: '' }); }}
              style={{ width: '100%', maxWidth: '400px', padding: '11px 16px', borderRadius: '10px', border: '1px solid rgba(43,75,160,.2)', background: 'rgba(255,255,255,.85)', fontSize: '14px', outline: 'none', color: '#1C2B4A' }}
            />
          </div>

          {/* Tableau */}
          <div style={{ background: 'rgba(255,255,255,.85)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(28,43,74,.07)', border: '1px solid rgba(43,75,160,.08)' }}>
            <Table>
              <TableHeader>
                <TableRow style={{ background: 'rgba(240,236,227,.8)' }}>
                  {[
                    { field: 'title', label: 'Titre' },
                    { field: 'created_at', label: 'Date de création' },
                    { field: 'published_at', label: 'Date de publication' },
                    { field: 'status', label: 'Statut' },
                  ].map(({ field, label }) => (
                    <TableHead key={field}
                      style={{ cursor: 'pointer', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500, userSelect: 'none' }}
                      onClick={() => handleSort(field)}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>{label}{renderSortIcon(field)}</div>
                    </TableHead>
                  ))}
                  <TableHead style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500 }}>Catégories</TableHead>
                  <TableHead style={{ fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A9BB8', fontWeight: 500 }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id} style={{ borderBottom: '1px solid rgba(43,75,160,.06)', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(240,236,227,.5)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <TableCell style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '15px', fontWeight: 400, color: '#1C2B4A', maxWidth: '280px' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={article.title}>
                        {article.title}
                      </div>
                    </TableCell>
                    <TableCell style={{ fontSize: '13px', color: '#8A9BB8' }}>{formatDate(article.created_at)}</TableCell>
                    <TableCell style={{ fontSize: '13px', color: '#8A9BB8' }}>
                      {article.scheduled_for && new Date(article.scheduled_for) > new Date() ? (
                        <span style={{ color: '#2B4BA0' }}>🕐 {formatDate(article.scheduled_for)}</span>
                      ) : article.published ? formatDate(article.published_at) : '-'}
                    </TableCell>
                    <TableCell>{renderStatusBadge(article)}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {article.categories?.slice(0, 2).map((category: string) => (
                          <Badge key={category} variant="outline" style={{ fontSize: '11px', borderColor: 'rgba(43,75,160,.2)', color: '#2B4BA0', background: 'rgba(43,75,160,.05)' }}>{category}</Badge>
                        ))}
                        {(article.categories?.length || 0) > 2 && (
                          <Badge variant="outline" style={{ fontSize: '11px' }}>+{(article.categories?.length || 0) - 2}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => handleViewArticle(article.slug)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#2B4BA0', fontFamily: 'inherit', padding: 0, textDecoration: 'underline' }}>
                          Voir
                        </button>
                        <button onClick={() => handleEditArticle(article.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#F2A12E', fontFamily: 'inherit', padding: 0, textDecoration: 'underline' }}>
                          Éditer
                        </button>
                        <button onClick={() => handleDeleteClick(article)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#c0392b', fontFamily: 'inherit', padding: 0, textDecoration: 'underline' }}>
                          Supprimer
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(43,75,160,.1)', paddingTop: '20px' }}>
              <p style={{ fontSize: '13px', color: '#8A9BB8' }}>Page {currentPage} sur {totalPages}</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                  style={{ borderColor: 'rgba(43,75,160,.2)', color: '#2B4BA0', background: 'transparent' }}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
                </Button>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    return (
                      <button key={pageNum} onClick={() => handlePageChange(pageNum)}
                        style={{ width: '36px', height: '36px', borderRadius: '8px', border: currentPage === pageNum ? 'none' : '1px solid rgba(43,75,160,.2)', background: currentPage === pageNum ? '#2B4BA0' : 'transparent', color: currentPage === pageNum ? '#F0ECE3' : '#2B4BA0', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}>
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
                  style={{ borderColor: 'rgba(43,75,160,.2)', color: '#2B4BA0', background: 'transparent' }}>
                  Suivant <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {articles.length === 0 && !isLoading && (
            <div style={{ textAlign: 'center', padding: '60px 24px', background: 'rgba(255,255,255,.6)', borderRadius: '16px', marginTop: '16px' }}>
              <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '20px', color: '#8A9BB8', fontStyle: 'italic', marginBottom: '8px' }}>Aucun article trouvé</p>
              <p style={{ fontSize: '13px', color: '#8A9BB8' }}>Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal de suppression */}
      {deleteDialogOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(28,43,74,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' }}>
          <div style={{ background: '#F0ECE3', borderRadius: '20px', padding: '32px', maxWidth: '440px', width: '100%', boxShadow: '0 24px 60px rgba(28,43,74,.2)' }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '22px', fontWeight: 400, color: '#1C2B4A', marginBottom: '12px' }}>
              Confirmer la suppression
            </h3>
            <p style={{ color: '#8A9BB8', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              Êtes-vous sûr de vouloir supprimer l'article <strong style={{ color: '#1C2B4A' }}>"{selectedArticle?.title}"</strong> ?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteDialogOpen(false)} className="btn btn--ghost">Annuler</button>
              <button onClick={confirmDelete}
                style={{ padding: '11px 22px', borderRadius: '999px', background: '#c0392b', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, fontFamily: 'inherit', boxShadow: '3px 3px 0 rgba(192,57,43,.3)' }}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminArticles;
