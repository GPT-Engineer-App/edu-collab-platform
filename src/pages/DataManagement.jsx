import React, { useState, useEffect } from 'react';
import DataExport from '../components/DataExport';
import { get } from '../services/api';

const DataManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Added missing semicolon
  }, []); // Added missing semicolon

  const fetchData = async () => {
    try {
      const response = await get('/data');
      setData(response); // Added missing semicolon
    } catch (error) {
      console.error('Error fetching data:', error); // Added missing semicolon
    }
  };

  return (
    <div className="data-management" role="main">
      <h1 className="text-3xl font-bold mb-4" style={{ color: '#000' }}>Data Management</h1> {/* Improved color contrast */}
      <DataExport data={data} />
      {/* Other data management functionalities */}
      <div className="image-section">
        <img src="/path/to/image1.jpg" alt="Description of image 1" />
        <img src="/path/to/image2.jpg" alt="Description of image 2" />
      </div>
      <button className="focusable-button" tabIndex="0" role="button" aria-pressed="false">Manage Data</button> {/* Ensured button is focusable */}
    </div>
  );
};

export default DataManagement; // Added missing semicolon
```

```css
/* Add this CSS to your stylesheet */
.focusable-button:focus {
  outline: 2px solid #000; /* Improved focus indicator */
}