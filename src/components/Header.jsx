import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl">Header</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/experience-maps" className="text-xl hover:text-gray-400">Experience Maps</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <a href="/kanban-board" className="text-white ml-4">Kanban Board</a>
      </nav>
    </header>
  );
};

export default Header;