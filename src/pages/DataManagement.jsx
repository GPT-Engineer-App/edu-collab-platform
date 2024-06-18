import React, { useState, useEffect } from 'react';
import DataExport from '../components/DataExport';
import { get } from '../services/api';

const DataManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await get('/data');
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="data-management">
      <h1 className="text-3xl font-bold mb-4">Data Management</h1>
      <DataExport data={data} />
      {/* Other data management functionalities */}
    </div>
  );
};

export default DataManagement;