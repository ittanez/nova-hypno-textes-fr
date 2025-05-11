
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/blog/useAuth";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import MentionsLegales from "@/pages/MentionsLegales";
import NotFound from "@/pages/NotFound";
import ContentLayout from "./components/layout/ContentLayout";
import BlogLayout from "./components/blog/BlogLayout";

// Routes blog admin
import AdminRoutes from "./integrations/routes/AdminRoutes";
import BlogHypnoseRoutes from "./integrations/routes/BlogHypnoseRoutes";

// Import des pages blog
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPost from "./pages/blog/BlogPost";

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
    <BrowserRouter>
      <AppRedirects />
      
      <Routes>
        {/* Route principale */}
        <Route path="/" element={<ContentLayout><Index /></ContentLayout>} />
        <Route path="/mentions-legales" element={<ContentLayout><MentionsLegales /></ContentLayout>} />
        
        {/* Routes blog standard */}
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogIndex />} />
          <Route path=":articleId" element={<BlogPost />} />
        </Route>
        
        {/* Routes admin blog standard */}
        {AdminRoutes}
        
        {/* Routes pour le nouveau BlogHypnose */}
        {BlogHypnoseRoutes}
        
        {/* Route 404 */}
        <Route path="*" element={<ContentLayout><NotFound /></ContentLayout>} />
      </Routes>
      
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
