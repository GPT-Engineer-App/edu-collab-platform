import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const MediaLibrary = () => {
  const [file, setFile] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [contentId, setContentId] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileId = uuidv4();
    const fileRef = ref(storage, `media/${fileId}`);
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);

    setMediaFiles([...mediaFiles, { id: fileId, url: fileURL, contentId }]);
    setFile(null);
    setContentId('');
  };

  const fetchMediaFiles = async () => {
    const listRef = ref(storage, 'media/');
    const res = await listAll(listRef);
    const files = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { id: itemRef.name, url };
      })
    );
    setMediaFiles(files);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Media Library</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <input
        type="text"
        value={contentId}
        onChange={(e) => setContentId(e.target.value)}
        placeholder="Content ID"
        className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Upload
      </button>
      <button onClick={fetchMediaFiles} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
        Fetch Media Files
      </button>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
        <ul>
          {mediaFiles.map((file) => (
            <li key={file.id} className="mb-4">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {file.id}
              </a>
              <p>Content ID: {file.contentId}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MediaLibrary;