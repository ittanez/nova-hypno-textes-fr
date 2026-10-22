import type { BreadcrumbItem } from '@/components/blog/Breadcrumbs';

// Helper functions pour générer des breadcrumbs automatiquement
export const generateArticleBreadcrumbs = (article?: { category?: string; title?: string } | null): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Accueil', url: '/', isHome: true }
  ];

  if (!article) return breadcrumbs;

  // Ajouter la catégorie si elle existe
  if (article.category && article.category !== 'Non classé') {
    breadcrumbs.push({
      name: article.category,
      url: `/?category=${encodeURIComponent(article.category)}`
    });
  }

  // Ajouter l'article actuel (pas de lien car c'est la page courante)
  if (article.title) {
    breadcrumbs.push({
      name: article.title
    });
  }

  return breadcrumbs;
};

export const generateCategoryBreadcrumbs = (categoryName: string): BreadcrumbItem[] => {
  return [
    { name: 'Accueil', url: '/', isHome: true },
    { name: categoryName }
  ];
};

export const generatePageBreadcrumbs = (pageName: string, pageUrl?: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Accueil', url: '/', isHome: true }
  ];

  if (pageUrl) {
    breadcrumbs.push({
      name: pageName,
      url: pageUrl
    });
  } else {
    breadcrumbs.push({
      name: pageName
    });
  }

  return breadcrumbs;
};
