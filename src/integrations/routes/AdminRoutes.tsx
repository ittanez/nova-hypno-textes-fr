
import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminArticlesList from '@/pages/admin/AdminArticlesList';
import AdminArticleEditor from '@/pages/admin/AdminArticleEditor';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminTags from '@/pages/admin/AdminTags';
import AdminDirect from '@/pages/admin/AdminDirect';
import PrivateRoute from '@/components/auth/PrivateRoute';

const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/admin-blog/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/direct"
        element={
          <PrivateRoute>
            <AdminDirect />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/articles"
        element={
          <PrivateRoute>
            <AdminArticlesList />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/new-article"
        element={
          <PrivateRoute>
            <AdminArticleEditor />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/edit-article/:id"
        element={
          <PrivateRoute>
            <AdminArticleEditor />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/categories"
        element={
          <PrivateRoute>
            <AdminCategories />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/tags"
        element={
          <PrivateRoute>
            <AdminTags />
          </PrivateRoute>
        }
      />
    </>
  );
};

export default AdminRoutes;
