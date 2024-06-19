import React from 'react';
import { FaPlus } from "react-icons/fa";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-500" role="main" tabIndex="0">
      <h1 className="text-5xl font-bold mb-4" role="heading" aria-level="1">Welcome to Our Website</h1>
      <p className="text-xl mb-8" role="contentinfo">This is the first version of our amazing web application.</p>
      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500" tabIndex="0" aria-label="Get Started" role="button">
        <FaPlus className="mr-2" aria-hidden="true" />
        Get Started
      </button>
    </div>
  );
};

export default Index;