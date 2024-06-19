import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200" role="main">
      <h1 className="text-5xl font-bold mb-4 text-black" role="heading" aria-level="1">About Page</h1>
      <p className="text-xl mb-8 text-black">Learn more about us on this page.</p>
      <img src="/path/to/image.jpg" alt="Description of image" className="mb-4" role="img" />
      <button className="focus:outline-none focus:ring-4 focus:ring-blue-700 focus:ring-offset-2" tabIndex="0" role="button" aria-pressed="false">
        Learn More
      </button>
    </div>
  );
};

export default About;