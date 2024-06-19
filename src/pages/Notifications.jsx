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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h1 id="notifications-heading" className="text-3xl font-bold mb-4">Notifications</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow" role="region" aria-labelledby="notifications-heading">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="mb-4" tabindex="0">
                <div className="p-4 bg-gray-300 rounded" role="alert">
                  <p>{notification.message}</p>
                  <p className="text-sm text-gray-700">Content ID: {notification.contentId}</p>
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

const styles = {
  ':focus': {
    outline: '2px solid #000',
    outlineOffset: '2px',
  },
};