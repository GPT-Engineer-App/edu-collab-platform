import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { jsonToCSV } from 'react-papaparse';

const DataExport = ({ data }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv');

  const handleExport = () => {
    if (selectedFormat === 'csv') {
      const csv = jsonToCSV(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'data.csv');
    } else if (selectedFormat === 'json') {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
      saveAs(blob, 'data.json');
    }
  };

  return (
    <div className="data-export">
      <label htmlFor="format">Select Format:</label>
      <select id="format" value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
      </select>
      <button onClick={handleExport} className="export-button">Export</button>
    </div>
  );
};

export default DataExport;