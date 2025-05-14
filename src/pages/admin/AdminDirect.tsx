
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDirect = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion directe</h1>
        <Link 
          to="/admin-blog/dashboard"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Retour au tableau de bord
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-bold text-xl mb-4">Bienvenue dans l'interface de gestion directe</h2>
        <p className="mb-4">
          Cette section vous permet de gérer directement les éléments importants du site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Statistiques</h3>
          <p>Consultez les statistiques générales du site.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="font-bold text-lg mb-2">Configuration</h3>
          <p>Paramètres généraux de configuration.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDirect;
