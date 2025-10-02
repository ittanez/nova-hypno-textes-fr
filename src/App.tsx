
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

import Index from "@/pages/Index";
import ContentLayout from "./components/layout/ContentLayout";
import PrivateRoute from "./components/auth/PrivateRoute";

// Lazy loading for less critical pages
const MentionsLegales = lazy(() => import("@/pages/MentionsLegales"));
const Maquette = lazy(() => import("@/pages/Maquette"));
const Custom404 = lazy(() => import("@/pages/Custom404"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminDirect = lazy(() => import("./pages/admin/AdminDirect"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

// Blog public pages
const BlogIndex = lazy(() => import("@/pages/blog/BlogIndex"));
const ArticlePage = lazy(() => import("@/pages/blog/ArticlePage"));
const CategoryPage = lazy(() => import("@/pages/blog/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/blog/CategoriesPage"));

// Blog admin pages
const AdminArticles = lazy(() => import("@/pages/admin/blog/AdminArticles"));
const AdminArticleEditor = lazy(() => import("@/pages/admin/blog/AdminArticleEditor"));
const AdminBlogLogin = lazy(() => import("@/pages/admin/blog/AdminLogin"));

// Composant pour forcer HTTPS en production et faire les redirections
function AppRedirects() {
  const location = useLocation();
  
  useEffect(() => {
    // En production seulement, rediriger HTTP vers HTTPS
    if (
      window.location.protocol === "http:" &&
      !window.location.href.includes("localhost") &&
      !window.location.href.includes("127.0.0.1")
    ) {
      window.location.replace(
        `https://${window.location.hostname}${window.location.pathname}${window.location.search}`
      );
    }
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRedirects />
        
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nova-blue"></div></div>}>
          <Routes>
            {/* Route principale */}
            <Route path="/" element={<Index />} />
            <Route path="/maquette" element={<Maquette />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />

            {/* Page d'erreur 404 personnalisée */}
            <Route path="/404" element={<Custom404 />} />

            {/* Routes Blog publiques */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/article/:slug" element={<ArticlePage />} />
            <Route path="/blog/categorie/:slug" element={<CategoryPage />} />
            <Route path="/blog/categories" element={<CategoriesPage />} />

            {/* Route de connexion admin blog */}
            <Route path="/admin-blog/login" element={<AdminBlogLogin />} />
            <Route path="/admin-blog" element={<Navigate to="/admin-blog/login" replace />} />

            {/* Routes admin générales */}
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

            {/* Routes admin blog */}
            <Route
              path="/admin-blog/articles"
              element={
                <PrivateRoute>
                  <AdminArticles />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-blog/article/new"
              element={
                <PrivateRoute>
                  <AdminArticleEditor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-blog/article/:id/edit"
              element={
                <PrivateRoute>
                  <AdminArticleEditor />
                </PrivateRoute>
              }
            />
            
            {/* Au lieu d'une route * vague, rediriger spécifiquement vers la page 404 */}
            <Route path="*" element={<Custom404 />} />
          </Routes>
        </Suspense>

        <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
