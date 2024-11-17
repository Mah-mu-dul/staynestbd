import React from 'react';
import { Link } from 'react-router-dom';
import { MdError } from 'react-icons/md';

export default function Error() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <MdError className="mx-auto h-24 w-24 text-red-500" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">404</h1>
          <h2 className="mt-2 text-2xl font-semibold text-primary">Page Not Found</h2>
          <p className="mt-4 text-gray-600">
            Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go back home
          </Link>
          
          <div className="flex justify-center space-x-4">
            <Link
              to="/search-results"
              className="text-secondary hover:text-secondary/80 font-medium"
            >
              Browse properties
            </Link>
            <Link
              to="/dashboard"
              className="text-accent hover:text-accent/80 font-medium"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
