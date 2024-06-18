import React from 'react';
import { FaSmile, FaFrown, FaMeh } from 'react-icons/fa';

const stages = [
  {
    role: 'Student',
    stages: [
      {
        stage: 'Login',
        emotion: <FaSmile className="text-green-500" />,
        thought: 'Excited to start learning',
        action: 'Logs in using credentials',
      },
      {
        stage: 'Course Management',
        emotion: <FaMeh className="text-yellow-500" />,
        thought: 'Curious about course content',
        action: 'Browses available courses',
      },
      {
        stage: 'Task Management',
        emotion: <FaFrown className="text-red-500" />,
        thought: 'Overwhelmed by tasks',
        action: 'Checks assigned tasks and deadlines',
      },
      {
        stage: 'Content Editor',
        emotion: <FaSmile className="text-green-500" />,
        thought: 'Engaged in creating content',
        action: 'Creates and edits content',
      },
      {
        stage: 'Notifications',
        emotion: <FaMeh className="text-yellow-500" />,
        thought: 'Notices new updates',
        action: 'Reads notifications',
      },
    ],
  },
  {
    role: 'Teacher',
    stages: [
      {
        stage: 'Login',
        emotion: <FaSmile className="text-green-500" />,
        thought: 'Ready to teach',
        action: 'Logs in using credentials',
      },
      {
        stage: 'Course Management',
        emotion: <FaSmile className="text-green-500" />,
        thought: 'Organized and prepared',
        action: 'Manages course content',
      },
      {
        stage: 'Task Management',
        emotion: <FaMeh className="text-yellow-500" />,
        thought: 'Monitors student progress',
        action: 'Assigns and reviews tasks',
      },
      {
        stage: 'Content Editor',
        emotion: <FaSmile className="text-green-500" />,
        thought: 'Creative and productive',
        action: 'Creates and edits teaching materials',
      },
      {
        stage: 'Notifications',
        emotion: <FaMeh className="text-yellow-500" />,
        thought: 'Keeps up with updates',
        action: 'Reads notifications',
      },
    ],
  },
];

const ExperienceMaps = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Experience Maps</h1>
      {stages.map((user, index) => (
        <div key={index} className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-bold mb-2">{user.role}</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Stage</th>
                <th className="px-4 py-2">Emotion</th>
                <th className="px-4 py-2">Thought</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {user.stages.map((stage, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border px-4 py-2">{stage.stage}</td>
                  <td className="border px-4 py-2">{stage.emotion}</td>
                  <td className="border px-4 py-2">{stage.thought}</td>
                  <td className="border px-4 py-2">{stage.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ExperienceMaps;