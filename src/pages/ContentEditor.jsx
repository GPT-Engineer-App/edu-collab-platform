import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ContentEditor = () => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Save content to local storage or send to backend
    localStorage.setItem('content', content);
    alert('Content saved!');
  };

  const handleLoad = () => {
    // Load content from local storage or fetch from backend
    const savedContent = localStorage.getItem('content');
    if (savedContent) {
      setContent(savedContent);
    } else {
      alert('No content found!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Content Editor</h1>
      <ReactQuill value={content} onChange={setContent} className="mb-4 w-full max-w-4xl" />
      <div className="flex space-x-4">
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
        <button onClick={handleLoad} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Load
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;