import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { get, put } from '../services/api';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await get('/tasks');
      const todo = data.filter(task => task.status === 'todo');
      const inProgress = data.filter(task => task.status === 'inProgress');
      const done = data.filter(task => task.status === 'done');
      setTasks({ todo, inProgress, done });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });

    try {
      await put(`/tasks/${movedTask.contentId}`, { ...movedTask, status: destination.droppableId });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-4">Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {['todo', 'inProgress', 'done'].map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-64 bg-white p-4 rounded shadow"
                  role="region"
                  aria-labelledby={`${columnId}-heading`}
                >
                  <h2 id={`${columnId}-heading`} className="text-xl font-bold mb-4">{columnId.replace(/([A-Z])/g, ' $1')}</h2>
                  {tasks[columnId].map((task, index) => (
                    <Draggable key={task.contentId} draggableId={task.contentId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 bg-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          tabIndex="0"
                          role="button"
                          aria-labelledby={`${task.contentId}-name`}
                          aria-describedby={`${task.contentId}-description ${task.contentId}-assignee`}
                        >
                          <h3 id={`${task.contentId}-name`} className="text-lg font-bold">{task.name}</h3>
                          <p id={`${task.contentId}-description`}>{task.description}</p>
                          <p id={`${task.contentId}-assignee`} className="text-sm text-gray-700">Assignee: {task.assignee}</p>
                          <p className="text-sm text-gray-700">Content ID: {task.contentId}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;