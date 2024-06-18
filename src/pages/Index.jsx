import React from 'react';
import { FaPlus } from "react-icons/fa";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-xl mb-8">This is the first version of our amazing web application.</p>
      <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        <FaPlus className="mr-2" />
        Get Started
      </button>
    </div>
  );
};

export default Index;