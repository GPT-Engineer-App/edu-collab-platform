import React, { useState, useEffect } from 'react';
import { get, post, put, del } from '../services/api';
import { v4 as uuidv4 } from 'uuid';
import Chat from '../components/Chat';
import Comments from '../components/Comments';
import { sendEmailNotification, createInAppNotification } from '../services/notificationService';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);

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
    const newTask = {
      contentId: uuidv4(),
      name: taskName,
      description: taskDescription,
      assignee,
    };

    try {
      await post('/tasks', newTask);
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskDescription('');
      setAssignee('');
      await sendEmailNotification(assignee, 'New Task Assigned', `You have been assigned a new task: ${taskName}`);
      await createInAppNotification(newTask.contentId, `New task created: ${taskName}`);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (task) => {
    setEditTaskId(task.contentId);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setAssignee(task.assignee);
  };

  const handleUpdateTask = async () => {
    const updatedTask = {
      contentId: editTaskId,
      name: taskName,
      description: taskDescription,
      assignee,
    };

    try {
      await put(`/tasks/${editTaskId}`, updatedTask);
      setTasks(tasks.map(task => (task.contentId === editTaskId ? updatedTask : task)));
      setEditTaskId(null);
      setTaskName('');
      setTaskDescription('');
      setAssignee('');
      await sendEmailNotification(assignee, 'Task Updated', `The task has been updated: ${taskName}`);
      await createInAppNotification(updatedTask.contentId, `Task updated: ${taskName}`);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (contentId) => {
    try {
      await del(`/tasks/${contentId}`);
      setTasks(tasks.filter(task => task.contentId !== contentId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-4">{editTaskId ? 'Edit Task' : 'Create Task'}</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Task Name"
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Task Description"
        />
        <input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Assignee"
        />
        <div className="flex space-x-4">
          {editTaskId ? (
            <button onClick={handleUpdateTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Task
            </button>
          ) : (
            <button onClick={handleCreateTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Task
            </button>
          )}
          {editTaskId && (
            <button onClick={() => setEditTaskId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task.contentId} className="mb-4">
                <div className="p-4 bg-gray-200 rounded">
                  <h3 className="text-xl font-bold">{task.name}</h3>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
                  <p className="text-sm text-gray-600">Content ID: {task.contentId}</p>
                  <Chat contentId={task.contentId} />
                  <Comments contentId={task.contentId} />
                  <div className="flex space-x-4 mt-2">
                    <button onClick={() => handleEditTask(task)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTask(task.contentId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;