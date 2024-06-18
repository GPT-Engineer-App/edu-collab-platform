import React, { useState, useEffect } from 'react';
import { getDecisionLogs } from '../services/decisionLogService';

const DecisionLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getDecisionLogs();
      setLogs(logs);
    };

    fetchLogs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Decision Logs</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        {logs.length > 0 ? (
          <ul>
            {logs.map(log => (
              <li key={log.id} className="mb-4">
                <div className="p-4 bg-gray-200 rounded">
                  <p>{log.description}</p>
                  <p className="text-sm text-gray-600">Timestamp: {log.timestamp.toDate().toString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No decision logs found.</p>
        )}
      </div>
    </div>
  );
};

export default DecisionLogs;