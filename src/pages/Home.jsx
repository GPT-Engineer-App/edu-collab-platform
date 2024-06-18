import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Home Page</h1>
      <p className="text-xl mb-8">Welcome to the Home Page.</p>
      <Link to="/media-library" className="text-xl text-blue-500 hover:underline">Go to Media Library</Link>
    </div>
  );
};

export default Home;