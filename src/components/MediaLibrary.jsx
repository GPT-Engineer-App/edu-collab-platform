import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const MediaLibrary = () => {
  const [file, setFile] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const contentId = uuidv4();
    const storageRef = ref(storage, `media/${contentId}-${file.name}`);
    setLoading(true);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setMediaList([...mediaList, { url: downloadURL, contentId }]);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMediaList = async () => {
    const listRef = ref(storage, 'media/');
    setLoading(true);

    try {
      const res = await listAll(listRef);
      const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
      setMediaList(urls.map((url, index) => ({ url, contentId: res.items[index].name.split('-')[0] })));
    } catch (error) {
      console.error('Error fetching media list:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="media-library">
      <h1 className="text-3xl font-bold mb-4">Media Library</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <button onClick={fetchMediaList} disabled={loading} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
        {loading ? 'Loading...' : 'Fetch Media'}
      </button>
      <div className="media-list mt-4">
        {mediaList.map((media, index) => (
          <div key={index} className="media-item mb-4">
            <img src={media.url} alt={`media-${index}`} className="w-32 h-32 object-cover" />
            <p>Content ID: {media.contentId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;