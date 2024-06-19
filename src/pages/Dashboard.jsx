import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200" role="main" tabIndex="0">
      <h1 className="text-5xl font-bold mb-4 text-black" tabIndex="0">Dashboard</h1>
      <p className="text-xl mb-8 text-black" tabIndex="0">Welcome to your dashboard.</p>
      <img src="path/to/image.jpg" alt="Dashboard overview" className="mb-4" tabIndex="0" />
      <button className="px-4 py-2 bg-blue-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" tabIndex="0" role="button" aria-pressed="false">
        Click Me
      </button>
    </div>
  );
};

export default Dashboard;