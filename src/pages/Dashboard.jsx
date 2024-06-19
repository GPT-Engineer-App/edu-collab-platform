import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200" role="main">
      <h1 className="text-5xl font-bold mb-4 text-black">Dashboard</h1>
      <p className="text-xl mb-8 text-black">Welcome to your dashboard.</p>
      <img src="path/to/image.jpg" alt="Dashboard overview" className="mb-4" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400" tabindex="0" role="button">
        Click Me
      </button>
    </div>
  );
};

export default Dashboard;