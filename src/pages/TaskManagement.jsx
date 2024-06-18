import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { get, post, put, del } from '../services/api';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async () => {
    if (!taskName || !assignee) {
      setError('Task name and assignee are required');
      return;
    }

    const newTask = {
      contentId: uuidv4(),
      name: taskName,
      assignee,
    };

    try {
      await post('/tasks', newTask);
      setTasks([...tasks, newTask]);
      setTaskName('');
      setAssignee('');
      setError('');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (contentId, updatedTask) => {
    try {
      await put(`/tasks/${contentId}`, updatedTask);
      setTasks(tasks.map(task => (task.contentId === contentId ? updatedTask : task)));
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (contentId) => {
    try {
      await del(`/tasks/${contentId}`);
      setTasks(tasks.filter(task => task.contentId !== contentId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Task Management</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <div className="mb-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            placeholder="Task Name"
          />
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            placeholder="Assignee"
          />
          <button
            onClick={handleCreateTask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Task
          </button>
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.contentId} className="mb-4">
              <div className="p-4 bg-gray-200 rounded">
                <h2 className="text-xl font-bold">{task.name}</h2>
                <p>Assignee: {task.assignee}</p>
                <p className="text-sm text-gray-600">Content ID: {task.contentId}</p>
                <button
                  onClick={() => handleUpdateTask(task.contentId, { ...task, name: 'Updated Task Name' })}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Update Task
                </button>
                <button
                  onClick={() => handleDeleteTask(task.contentId)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
                >
                  Delete Task
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManagement;