import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 focus:outline-none focus:ring-4 focus:ring-yellow-500" role="banner">
      <h1 className="text-3xl" role="heading" aria-level="1">Header</h1>
      <nav role="navigation" aria-label="Main Navigation">
        <ul className="flex space-x-4">
          <li>
            <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-yellow-500" tabIndex="0" role="link">Home</a>
          </li>
          <li>
            <a href="#about" className="focus:outline-none focus:ring-2 focus:ring-yellow-500" tabIndex="0" role="link">About</a>
          </li>
          <li>
            <a href="#contact" className="focus:outline-none focus:ring-2 focus:ring-yellow-500" tabIndex="0" role="link">Contact</a>
          </li>
        </ul>
      </nav>
      <img src="logo.png" alt="Company Logo" className="mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500" role="img" />
    </header>
  );
};

export default Header;