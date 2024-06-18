import React, { useEffect, useState } from 'react';
import { get } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Project Dashboard</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        {projects.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Content ID</th>
                <th className="py-2">Project Name</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.contentId}>
                  <td className="py-2">{project.contentId}</td>
                  <td className="py-2">{project.name}</td>
                  <td className="py-2">{project.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;