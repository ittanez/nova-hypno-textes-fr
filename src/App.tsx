
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import Index from "@/pages/Index";
import MentionsLegales from "@/pages/MentionsLegales";
import ContentLayout from "./components/layout/ContentLayout";

// Routes admin
import AdminRoutes from "./integrations/routes/AdminRoutes";

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
    
    // Log 404 attempts but redirect to home
    if (location.pathname !== "/" && 
        location.pathname !== "/mentions-legales" && 
        !location.pathname.startsWith("/admin")) {
      console.error("Tentative d'accès à une page inexistante:", location.pathname);
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
        
        {/* Routes admin standard */}
        {AdminRoutes}
        
        {/* Au lieu d'une route 404, rediriger vers la page d'accueil */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
