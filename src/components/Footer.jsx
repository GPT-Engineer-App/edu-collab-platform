import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4" role="contentinfo">
      <p className="text-center">Footer</p>
      <nav aria-label="Footer navigation">
        <ul className="flex justify-center space-x-4">
          <li>
            <a href="#home" className="text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500" tabindex="0">Home</a>
          </li>
          <li>
            <a href="#about" className="text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500" tabindex="0">About</a>
          </li>
          <li>
            <a href="#contact" className="text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500" tabindex="0">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="flex justify-center mt-4">
        <img src="logo.png" alt="Company Logo" className="focus:outline-none focus:ring-2 focus:ring-blue-500" tabindex="0" />
      </div>
    </footer>
  );
};

export default Footer;