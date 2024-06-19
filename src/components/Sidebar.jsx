import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <nav role="navigation" aria-label="Main Navigation">
        <ul>
          <li className="mb-4">
            <Link to="/" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/about" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">About</Link>
          </li>
          <li className="mb-4">
            <Link to="/contact" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Contact</Link>
          </li>
          <li className="mb-4">
            <Link to="/login" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Login</Link>
          </li>
          <li className="mb-4">
            <Link to="/register" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Register</Link>
          </li>
          <li className="mb-4">
            <Link to="/project-dashboard" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Project Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/media-library" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Media Library</Link>
          </li>
          <li className="mb-4">
            <Link to="/decision-logs" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Decision Logs</Link>
          </li>
          <li className="mb-4">
            <Link to="/data-management" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Data Management</Link>
          </li>
          <li className="mb-4">
            <Link to="/user-personas" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">User Personas</Link>
          </li>
          <li className="mb-4">
            <Link to="/experience-maps" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Experience Maps</Link>
          </li>
          <li className="mb-4">
            <Link to="/knowledge-base" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Knowledge Base</Link>
          </li>
          <li className="mb-4">
            <Link to="/kanban-board" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Kanban Board</Link>
          </li>
          <li className="mb-4">
            <Link to="/notifications" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Notifications</Link>
          </li>
          <li className="mb-4">
            <Link to="/notifications" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Notifications</Link>
          </li>
          <li className="mb-4">
            <Link to="/notifications" className="text-xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" tabindex="0">Notifications</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;