
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import MentionsLegales from "./pages/MentionsLegales";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";
import AdminLogin from "./pages/admin/AdminLogin";
import BlogLayout from "./components/blog/BlogLayout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDirect from "./pages/admin/AdminDirect"; 
import SimpleBlogAdmin from "./pages/admin/SimpleBlogAdmin";
import adminRoutes from "./integrations/routes/AdminRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // Check if we're in development or the URL includes "blog-temp"
  const isBlogAccessible = () => {
    return import.meta.env.DEV || window.location.href.includes("blog-temp");
  };

  // Redirect HTTP to HTTPS in production - using useEffect to avoid issues during hydration
  useEffect(() => {
    if (typeof window !== 'undefined' && 
        location.protocol === 'http:' && 
        location.hostname !== 'localhost') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            
            {/* Blog routes */}
            <Route path="/blog" element={<BlogLayout />}>
              <Route index element={<BlogIndex />} />
              <Route path=":slug" element={<BlogPost />} />
              <Route path="category/:category" element={<BlogIndex />} />
              <Route path="tag/:tag" element={<BlogIndex />} />
            </Route>
            
            {/* Admin routes - protected */}
            <Route path="/admin-blog" element={<AdminLayout />}>
              <Route index element={<AdminLogin />} />
              {/* Spread the admin routes array here instead of using the component */}
              {adminRoutes}
            </Route>
            
            {/* Previous direct admin route */}
            <Route path="/admin-direct" element={<AdminDirect />} />
            
            {/* NEW simplified admin route - no layout, direct access */}
            <Route path="/admin-simple" element={<SimpleBlogAdmin />} />
            <Route path="/admin-simple/edit/:articleId" element={<SimpleBlogAdmin />} />
            
            {/* Redirect all other routes to the home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
