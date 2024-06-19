import React, { useState } from 'react';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';

const Home = () => {
  const [statement, setStatement] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-5xl font-bold mb-4">Home Page</h1>
      <p className="text-xl mb-8">Welcome to the Home Page.</p>
      <div className="statement-input">
        <input
          type="text"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          placeholder="Enter your statement"
          className="input-field"
          tabindex="0"
          aria-label="Statement input field"
        />
        <button onClick={() => setStatement(statement)} className="submit-button" tabindex="0" role="button">
          Submit
        </button>
      </div>
      {statement && <Slider statement={statement} />}
      <Link to="/media-library" className="text-xl text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">Go to Media Library</Link>
    </div>
  );
};

export default Home;