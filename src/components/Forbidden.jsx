import React from 'react';
import { Link } from 'react-router';
import { Ban } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-200 text-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Ban className="text-red-500 w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-2">403 Forbidden</h1>
        <p className="text-gray-700 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
