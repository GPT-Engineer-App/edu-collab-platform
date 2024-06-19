import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4" role="banner">
      <h1 className="text-3xl">Header</h1>
      <nav role="navigation">
        <ul className="flex space-x-4">
          <li>
            <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Home</a>
          </li>
          <li>
            <a href="#about" className="focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">About</a>
          </li>
          <li>
            <a href="#contact" className="focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Contact</a>
          </li>
        </ul>
      </nav>
      <img src="logo.png" alt="Company Logo" className="mt-4" />
    </header>
  );
};

export default Header;