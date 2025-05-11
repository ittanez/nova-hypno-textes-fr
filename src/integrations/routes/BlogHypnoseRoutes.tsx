
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import BlogHypnoseLayout from '@/components/bloghypnose/BlogHypnoseLayout';
import BlogHypnoseAdminLayout from '@/components/bloghypnose/admin/BlogHypnoseAdminLayout';
import PrivateBlogRoute from '@/components/bloghypnose/admin/PrivateBlogRoute';

// Import synchrone pour les composants essentiels
import BlogAdminLogin from '@/pages/bloghypnose/admin/BlogAdminLogin';

// Chargement asynchrone des autres pages pour optimiser le bundle
const BlogHypnoseIndex = lazy(() => import('@/pages/bloghypnose/BlogHypnoseIndex'));
const BlogHypnoseAdminDashboard = lazy(() => 
  import('@/pages/bloghypnose/admin/BlogHypnoseAdminDashboard')
);

// Composant pour le chargement asynchrone
const SuspenseLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="h-10 w-10 border-4 border-t-nova-blue rounded-full animate-spin"></div>
    </div>
  }>
    {children}
  </Suspense>
);

export const BlogHypnoseRoutes = (
  <>
    {/* Routes Blog Public */}
    <Route path="/bloghypnose" element={<BlogHypnoseLayout />}>
      <Route index element={
        <SuspenseLoader>
          <BlogHypnoseIndex />
        </SuspenseLoader>
      } />
      {/* Routes pour les articles, catégories, etc. seront ajoutées ici */}
    </Route>
  
    {/* Routes Admin - Utilisation de PrivateBlogRoute pour protéger les routes admin */}
    <Route path="/bloghypnose-admin" element={<BlogHypnoseAdminLayout />}>
      <Route index element={<BlogAdminLogin />} />
      <Route path="dashboard" element={
        <PrivateBlogRoute>
          <SuspenseLoader>
            <BlogHypnoseAdminDashboard />
          </SuspenseLoader>
        </PrivateBlogRoute>
      } />
      {/* Autres routes admin seront ajoutées ici */}
    </Route>
  </>
);

export default BlogHypnoseRoutes;
