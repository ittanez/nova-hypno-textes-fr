
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord administrateur</h1>
      
      {user && (
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="font-medium mb-2">Utilisateur connecté</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-bold text-xl mb-4">Application principale</h2>
          <p className="mb-4">Accéder à l'application principale du site.</p>
          <Link 
            to="/"
            className="inline-block px-4 py-2 bg-nova-blue text-white rounded hover:bg-nova-blue-dark"
          >
            Voir le site
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-bold text-xl mb-4">Gestion directe</h2>
          <p className="mb-4">Accéder à l'interface de gestion directe.</p>
          <Link 
            to="/admin-blog/direct"
            className="inline-block px-4 py-2 bg-nova-green text-white rounded hover:bg-nova-green-dark"
          >
            Gestion directe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
