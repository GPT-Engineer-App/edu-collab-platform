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
    <div className="media-library" style={{ outline: 'none' }}>
      <input type="file" onChange={handleFileChange} aria-label="Upload media file" tabindex="0" />
      <button onClick={handleUpload} role="button" tabindex="0">Upload</button>
      <div className="media-list">
        {mediaList.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Media item ${index + 1}`} />
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

  .media-library button {
    background-color: #005a9e; /* High contrast background */
    color: #fff; /* High contrast text */
  }

  .media-library button:hover,
  .media-library button:focus {
    background-color: #004080; /* Darker shade for hover and focus */
  }
`}</style>