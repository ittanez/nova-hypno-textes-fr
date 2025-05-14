
import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
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
  />
];

export default adminRoutes;
