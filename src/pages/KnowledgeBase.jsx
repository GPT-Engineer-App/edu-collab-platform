import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [editDocumentId, setEditDocumentId] = useState(null);

  const handleAddDocument = () => {
    const newDocument = {
      contentId: uuidv4(),
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    setDocuments([...documents, newDocument]);
    setTitle('');
    setContent('');
    setTags('');
  };

  const handleEditDocument = (document) => {
    setEditDocumentId(document.contentId);
    setTitle(document.title);
    setContent(document.content);
    setTags(document.tags.join(', '));
  };

  const handleUpdateDocument = () => {
    const updatedDocument = {
      contentId: editDocumentId,
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    setDocuments(documents.map(doc => (doc.contentId === editDocumentId ? updatedDocument : doc)));
    setEditDocumentId(null);
    setTitle('');
    setContent('');
    setTags('');
  };

  const handleDeleteDocument = (contentId) => {
    setDocuments(documents.filter(doc => doc.contentId !== contentId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4" role="main">
      <h1 className="text-3xl font-bold mb-4">Knowledge Base</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4" role="region" aria-labelledby="document-form-title">
        <h2 id="document-form-title" className="text-xl font-bold mb-4">{editDocumentId ? 'Edit Document' : 'Add Document'}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Title"
          aria-label="Document Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Content"
          aria-label="Document Content"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Tags (comma separated)"
          aria-label="Document Tags"
        />
        <div className="flex space-x-4">
          {editDocumentId ? (
            <button onClick={handleUpdateDocument} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" tabIndex="0" aria-label="Update Document">
              Update Document
            </button>
          ) : (
            <button onClick={handleAddDocument} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" tabIndex="0" aria-label="Add Document">
              Add Document
            </button>
          )}
          {editDocumentId && (
            <button onClick={() => setEditDocumentId(null)} className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" tabIndex="0" aria-label="Cancel Edit">
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow" role="region" aria-labelledby="documents-list-title">
        <h2 id="documents-list-title" className="text-xl font-bold mb-4">Documents</h2>
        {documents.length > 0 ? (
          <ul>
            {documents.map((document) => (
              <li key={document.contentId} className="mb-4">
                <div className="p-4 bg-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <h3 className="text-xl font-bold">{document.title}</h3>
                  <p>{document.content}</p>
                  <p className="text-sm text-gray-700">Tags: {document.tags.join(', ')}</p>
                  <p className="text-sm text-gray-700">Content ID: {document.contentId}</p>
                  <div className="flex space-x-4 mt-2">
                    <button onClick={() => handleEditDocument(document)} className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" tabIndex="0" aria-label="Edit Document">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteDocument(document.contentId)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" tabIndex="0" aria-label="Delete Document">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;