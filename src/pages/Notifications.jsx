import React, { useState, useEffect } from 'react';
import { getInAppNotifications } from '../services/notificationService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getInAppNotifications();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
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

export default Notifications;