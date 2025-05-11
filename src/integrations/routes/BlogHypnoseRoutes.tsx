
import React from 'react';
import { Route } from 'react-router-dom';
import BlogHypnoseLayout from '@/components/bloghypnose/BlogHypnoseLayout';
import BlogHypnoseAdminLayout from '@/components/bloghypnose/admin/BlogHypnoseAdminLayout';
import BlogHypnoseIndex from '@/pages/bloghypnose/BlogHypnoseIndex';
import BlogHypnoseAdminLogin from '@/pages/bloghypnose/admin/BlogHypnoseAdminLogin';
import BlogHypnoseAdminDashboard from '@/pages/bloghypnose/admin/BlogHypnoseAdminDashboard';
import PrivateRouteBlogHypnose from '@/components/bloghypnose/admin/PrivateRouteBlogHypnose';

export const BlogHypnoseRoutes = (
  <>
    {/* Routes Blog Public */}
    <Route path="/bloghypnose" element={<BlogHypnoseLayout />}>
      <Route index element={<BlogHypnoseIndex />} />
      {/* Routes pour les articles, catégories, etc. seront ajoutées ici */}
    </Route>
  
    {/* Routes Admin */}
    <Route path="/bloghypnose-admin" element={<BlogHypnoseAdminLayout />}>
      <Route index element={<BlogHypnoseAdminLogin />} />
      <Route path="dashboard" element={
        <PrivateRouteBlogHypnose>
          <BlogHypnoseAdminDashboard />
        </PrivateRouteBlogHypnose>
      } />
      {/* Autres routes admin seront ajoutées ici */}
    </Route>
  </>
);

export default BlogHypnoseRoutes;
