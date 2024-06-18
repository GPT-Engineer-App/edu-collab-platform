import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const MediaLibrary = () => {
  const [file, setFile] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, `media/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log('File available at', downloadURL);
    fetchMediaList();
  };

  const fetchMediaList = async () => {
    const listRef = ref(storage, 'media/');
    const res = await listAll(listRef);
    const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
    setMediaList(urls);
  };

  return (
    <div className="media-library">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div className="media-list">
        {mediaList.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`media-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;