import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/" className="text-xl hover:text-gray-400">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/about" className="text-xl hover:text-gray-400">About</Link>
          </li>
          <li className="mb-4">
            <Link to="/contact" className="text-xl hover:text-gray-400">Contact</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;