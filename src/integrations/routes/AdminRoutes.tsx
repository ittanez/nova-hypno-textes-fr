
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
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/direct"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminDirect />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/articles"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminArticlesList />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/new-article"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminArticleEditor />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/edit-article/:id"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminArticleEditor />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/categories"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin-blog/tags"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminTags />
            </AdminLayout>
          </PrivateRoute>
        }
      />
    </>
  );
};

export default AdminRoutes;
