
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminArticleEditor = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Article Editor</h1>
      <p>This feature has been removed.</p>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate('/admin-blog/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default AdminArticleEditor;
