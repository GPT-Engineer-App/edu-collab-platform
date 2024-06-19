import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebaseConfig';

import { v4 as uuidv4 } from 'uuid';

const MediaLibrary = () => {
  useEffect(() => {
    fetchMediaList();
  }, []);
  const [file, setFile] = useState(null);
  const [mediaList, setMediaList] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const contentId = uuidv4();
    const storageRef = ref(storage, `media/${contentId}-${file.name}`);
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
    <div className="media-library" style={{ outline: 'none' }} role="region" aria-label="Media Library">
      <input type="file" onChange={handleFileChange} aria-label="Upload media file" tabIndex="0" />
      <button onClick={handleUpload} role="button" tabIndex="0">Upload</button>
      <div className="media-list">
        {mediaList.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Media item ${index + 1}`} tabIndex="0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;

<style jsx>{`
  .media-library input[type="file"]:focus,
  .media-library button:focus {
    outline: 2px solid #000; /* High contrast outline */
    outline-offset: 2px;
  }

  .media-library button,
  .media-library input[type="file"] {
    background-color: #005a9e; /* High contrast background */
    color: #fff; /* High contrast text */
    border: 2px solid #000; /* High contrast border */
  }

  .media-library button:hover,
  .media-library button:focus,
  .media-library input[type="file"]:hover,
  .media-library input[type="file"]:focus {
    background-color: #004080; /* Darker shade for hover and focus */
    outline: 2px solid #ff0; /* High contrast outline */
    outline-offset: 2px;
  }
`}</style>