
import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminArticlesList from '@/pages/admin/AdminArticlesList';
import AdminArticleEditor from '@/pages/admin/AdminArticleEditor';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminTags from '@/pages/admin/AdminTags';
import AdminDirect from '@/pages/admin/AdminDirect';
import PrivateRoute from '@/components/auth/PrivateRoute';

// Instead of returning a component, we now export an array of routes
const adminRoutes = [
  <Route
    key="admin-dashboard"
    path="/admin-blog/dashboard"
    element={
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    }
  />,
  <Route
    key="admin-direct"
    path="/admin-blog/direct"
    element={
      <PrivateRoute>
        <AdminDirect />
      </PrivateRoute>
    }
  />,
  <Route
    key="admin-articles"
    path="/admin-blog/articles"
    element={
      <PrivateRoute>
        <AdminArticlesList />
      </PrivateRoute>
    }
  />,
  <Route
    key="admin-new-article"
    path="/admin-blog/new-article"
    element={
      <PrivateRoute>
        <AdminArticleEditor />
      </PrivateRoute>
    }
  />,
  <Route
    key="admin-edit-article"
    path="/admin-blog/edit-article/:id"
    element={
      <PrivateRoute>
        <AdminArticleEditor />
      </PrivateRoute>
    }
  />,
  <Route
    key="admin-categories"
    path="/admin-blog/categories"
    element={
      <PrivateRoute>
        <AdminCategories />
      </PrivateRoute>
    }
  />,
  <Route
    key="admin-tags"
    path="/admin-blog/tags"
    element={
      <PrivateRoute>
        <AdminTags />
      </PrivateRoute>
    }
  />
];

export default adminRoutes;
