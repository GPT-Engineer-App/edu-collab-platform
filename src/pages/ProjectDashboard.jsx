import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import Chat from '../components/Chat';
import Comments from '../components/Comments';
import { get } from '../services/api';
import { getInAppNotifications } from '../services/notificationService';

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);

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

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getInAppNotifications();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Project Dashboard</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        {projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.contentId} className="mb-4">
                <div className="p-4 bg-gray-200 rounded">
                  <h2 className="text-xl font-bold">{project.name}</h2>
                  <p>{project.description}</p>
                  <p className="text-sm text-gray-600">Content ID: {project.contentId}</p>
                  <Chat contentId={project.contentId} />
                  <Comments contentId={project.contentId} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <div className="notifications">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="mb-4">
                <div className="p-4 bg-gray-200 rounded">
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-600">Content ID: {notification.contentId}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;