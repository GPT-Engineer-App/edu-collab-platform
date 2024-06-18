import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { get, post } from '../services/api';

const ContentEditor = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [metaTags, setMetaTags] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    handleLoad();
  }, []);

  const handleSave = async () => {
    await post('/save-content', { content, tags, metaTags, description, keywords });
    alert('Content and SEO data saved!');
  };

  const handleLoad = async () => {
    const savedData = await get('/load-content');
    if (savedData) {
      setContent(savedData.content);
      setTags(savedData.tags);
      setMetaTags(savedData.metaTags);
      setDescription(savedData.description);
      setKeywords(savedData.keywords);
    } else {
      alert('No content found!');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Content Editor</h1>
      <ReactQuill value={content} onChange={setContent} className="mb-4 w-full max-w-4xl" />
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Add a tag"
        />
        <button onClick={handleAddTag} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Tag
        </button>
      </div>
      <div className="flex flex-wrap mb-4">
        {tags.map((tag, index) => (
          <div key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
            <span>{tag}</span>
            <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-red-500 hover:text-red-700">
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col mb-4 w-full max-w-4xl">
        <input
          type="text"
          value={metaTags}
          onChange={(e) => setMetaTags(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Meta Tags"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Description"
        />
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Keywords"
        />
      </div>
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