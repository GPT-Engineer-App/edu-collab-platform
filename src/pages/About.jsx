import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-5xl font-bold mb-4" role="heading" aria-level="1">About Page</h1>
      <p className="text-xl mb-8">Learn more about us on this page.</p>
      <img src="/path/to/image.jpg" alt="Description of image" className="mb-4" />
      <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" tabindex="0" role="button">
        Learn More
      </button>
    </div>
  );
};

export default About;