
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useBlogAuth } from "@/hooks/bloghypnose/useBlogAuth";

interface PrivateBlogRouteProps {
  children: React.ReactNode;
}

const PrivateBlogRoute = ({ children }: PrivateBlogRouteProps) => {
  const { isAdmin, loading, session } = useBlogAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Journalisation pour le débogage
    console.log("PrivateBlogRoute - État d'authentification:", { 
      isAdmin, 
      loading, 
      hasSession: !!session 
    });
  }, [isAdmin, loading, session]);
  
  // Afficher un indicateur de chargement pendant la vérification
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-8 w-8 border-4 border-t-nova-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Si non authentifié (pas de session), rediriger vers la connexion
  if (!session) {
    console.log("PrivateBlogRoute - Pas de session, redirection vers la connexion");
    return <Navigate to="/bloghypnose-admin" replace />;
  }
  
  // Si authentifié mais pas admin, afficher un message d'erreur
  if (!isAdmin) {
    console.log("PrivateBlogRoute - Non admin, affichage du message d'erreur");
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Accès non autorisé</h1>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas les droits administrateur nécessaires pour accéder à cette section.
        </p>
        <button 
          className="px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => navigate("/bloghypnose-admin", { replace: true })}
        >
          Retour à la page de connexion
        </button>
      </div>
    );
  }
  
  // Si authentifié en tant qu'admin, rendre le contenu protégé
  console.log("PrivateBlogRoute - Accès admin accordé");
  return <>{children}</>;
};

export default PrivateBlogRoute;
