import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { get, post, put, del } from '../services/api';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [editCourseId, setEditCourseId] = useState(null);
  const [modules, setModules] = useState([]);
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [editModuleId, setEditModuleId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await get('/courses');
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCreateCourse = async () => {
    const newCourse = {
      contentId: uuidv4(),
      name: courseName,
      description: courseDescription,
    };

    try {
      await post('/courses', newCourse);
      setCourses([...courses, newCourse]);
      setCourseName('');
      setCourseDescription('');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleEditCourse = async (course) => {
    setEditCourseId(course.contentId);
    setCourseName(course.name);
    setCourseDescription(course.description);
  };

  const handleUpdateCourse = async () => {
    const updatedCourse = {
      contentId: editCourseId,
      name: courseName,
      description: courseDescription,
    };

    try {
      await put(`/courses/${editCourseId}`, updatedCourse);
      setCourses(courses.map(course => (course.contentId === editCourseId ? updatedCourse : course)));
      setEditCourseId(null);
      setCourseName('');
      setCourseDescription('');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (contentId) => {
    try {
      await del(`/courses/${contentId}`);
      setCourses(courses.filter(course => course.contentId !== contentId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleCreateModule = async (courseId) => {
    const newModule = {
      contentId: uuidv4(),
      name: moduleName,
      description: moduleDescription,
      courseId,
    };

    try {
      await post('/modules', newModule);
      setModules([...modules, newModule]);
      setModuleName('');
      setModuleDescription('');
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleEditModule = async (module) => {
    setEditModuleId(module.contentId);
    setModuleName(module.name);
    setModuleDescription(module.description);
  };

  const handleUpdateModule = async () => {
    const updatedModule = {
      contentId: editModuleId,
      name: moduleName,
      description: moduleDescription,
    };

    try {
      await put(`/modules/${editModuleId}`, updatedModule);
      setModules(modules.map(module => (module.contentId === editModuleId ? updatedModule : module)));
      setEditModuleId(null);
      setModuleName('');
      setModuleDescription('');
    } catch (error) {
      console.error('Error updating module:', error);
    }
  };

  const handleDeleteModule = async (contentId) => {
    try {
      await del(`/modules/${contentId}`);
      setModules(modules.filter(module => module.contentId !== contentId));
    } catch (error) {
      console.error('Error deleting module:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Course Management</h1>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-4">{editCourseId ? 'Edit Course' : 'Create Course'}</h2>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Course Name"
        />
        <textarea
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Course Description"
        />
        <div className="flex space-x-4">
          {editCourseId ? (
            <button onClick={handleUpdateCourse} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Course
            </button>
          ) : (
            <button onClick={handleCreateCourse} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Course
            </button>
          )}
          {editCourseId && (
            <button onClick={() => setEditCourseId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-4xl bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course) => (
              <li key={course.contentId} className="mb-4">
                <div className="p-4 bg-gray-200 rounded">
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p>{course.description}</p>
                  <p className="text-sm text-gray-600">Content ID: {course.contentId}</p>
                  <div className="flex space-x-4 mt-2">
                    <button onClick={() => handleEditCourse(course)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCourse(course.contentId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2">Modules</h4>
                    <input
                      type="text"
                      value={moduleName}
                      onChange={(e) => setModuleName(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                      placeholder="Module Name"
                    />
                    <textarea
                      value={moduleDescription}
                      onChange={(e) => setModuleDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                      placeholder="Module Description"
                    />
                    <div className="flex space-x-4">
                      {editModuleId ? (
                        <button onClick={handleUpdateModule} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Update Module
                        </button>
                      ) : (
                        <button onClick={() => handleCreateModule(course.contentId)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Create Module
                        </button>
                      )}
                      {editModuleId && (
                        <button onClick={() => setEditModuleId(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                          Cancel
                        </button>
                      )}
                    </div>
                    <ul className="mt-4">
                      {modules.filter(module => module.courseId === course.contentId).map((module) => (
                        <li key={module.contentId} className="mb-2">
                          <div className="p-2 bg-gray-300 rounded">
                            <h5 className="text-lg font-bold">{module.name}</h5>
                            <p>{module.description}</p>
                            <p className="text-sm text-gray-600">Content ID: {module.contentId}</p>
                            <div className="flex space-x-4 mt-2">
                              <button onClick={() => handleEditModule(module)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                Edit
                              </button>
                              <button onClick={() => handleDeleteModule(module.contentId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;