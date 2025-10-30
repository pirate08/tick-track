'use client';

import React, { useState, useEffect } from 'react';
import { MdDeleteOutline, MdModeEditOutline } from 'react-icons/md';
import axiosInstance from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TaskDetailPage = () => {
  const [singleTask, setSingleTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const taskId = params?.taskId;
  const router = useRouter();

  //   --Fetch Single Task--
  useEffect(() => {
    const fetchSingleTask = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`);
        if (response.status === 200) {
          setSingleTask(response.data);
          console.log('Fetched Task:', response.data);
        }
      } catch (error) {
        console.error('Error fetching task:', error.message);
      }
    };

    if (taskId) {
      fetchSingleTask();
    }
  }, [taskId]);

  if (!singleTask) {
    return <div className='h-screen p-10'>Loading...</div>;
  }

  // --Handle Change for Form Fields--
  const handleChange = (e) => {
    setSingleTask((prevtask) => ({
      ...prevtask,
      [e.target.name]: e.target.value,
    }));
  };

  // --Handle OnSubmit function--
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, singleTask);
      if (response.status === 200) {
        setIsEditing(false);
        toast.success('Task updated successfully ✅');
      }
    } catch (error) {
      toast.error('Failed to update task ❌');
      console.log('Error updating task', error.message);
    }
  };

  //   --Delete Task--
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/tasks/${taskId}`);
      if (res.status === 200) {
        toast.success('Task deleted successfully ✅');
        console.log('Task deleted successfully');
        // --Redirect to dashboard page--
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to delete task ❌');
      console.error('Error deleting task:', error.message);
    }
  };
  return (
    <div className='h-full md:h-screen p-6 md:p-10'>
      {/* --Upper Section-- */}
      <div className='flex flex-col md:flex-row justify-around items-start md:items-center mb-6'>
        {/* --Title goes here-- */}
        <div className='mb-4 md:mb-0'>
          <h1 className='text-xl md:text-2xl font-bold'>
            Task /{' '}
            <span className='text-gray-600 font-medium'>
              {singleTask.title}
            </span>
          </h1>
        </div>
        {/* --Edit and Delete Button goes here-- */}
        <div className='flex items-center gap-2'>
          <button
            className='bg-black text-white px-4 cursor-pointer py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors duration-300'
            onClick={() => setIsEditing(!isEditing)}>
            Edit
            <MdModeEditOutline className='text-lg' />
          </button>
          <button
            className='bg-sky-700 text-white px-4 cursor-pointer py-2 rounded-md flex items-center gap-2 hover:bg-red-600 transition-colors duration-300'
            onClick={() => handleDelete()}>
            Delete
            <MdDeleteOutline className='text-lg' />
          </button>
        </div>
      </div>
      {/* --Task Details-- */}
      <div>
        <div className='bg-white p-4 md:p-6 rounded-md w-full md:w-2/3 mx-auto shadow-md'>
          {isEditing ? (
            // --Form for Editing Task--
            <form onSubmit={onSubmit}>
              {/* --Text Field-- */}
              <input
                type='text'
                name='title'
                placeholder='Task Title (required)'
                value={singleTask.title}
                onChange={handleChange}
                className='border-gray-200 border-1 w-full p-2 rounded-md mb-4'
                required
              />
              {/* --Description Field-- */}
              <textarea
                placeholder='Description (required)'
                name='description'
                value={singleTask.description}
                onChange={handleChange}
                required
                cols='5'
                rows='4'
                className='border-gray-200 text-gray-700 border-1 w-full p-2 rounded-md mb-4'
              />
              {/* --Due and Status */}
              <div className='flex items-center flex-col md:flex-row gap-2 mb-4'>
                {/* --Due Date-- */}
                <div className='w-full md:w-1/2'>
                  <input
                    type='date'
                    name='dueDate'
                    value={singleTask.dueDate?.slice(0, 10)}
                    onChange={handleChange}
                    className='border-gray-200 border w-full text-gray-500 p-2 rounded-md cursor-pointer'
                  />
                </div>
                {/* --Status-- */}
                <div className='w-full md:w-1/2'>
                  <select
                    className='border-gray-200 text-gray-500 border w-full p-2 rounded-md cursor-pointer'
                    value={singleTask.status}
                    onChange={handleChange}
                    name='status'
                    required>
                    <option className='text-green-600'>To-Do</option>
                    <option className='text-yellow-600'>In Progress</option>
                    <option className='text-red-600'>Completed</option>
                  </select>
                </div>
              </div>
              {/* --Categories and Priority */}
              <div className='flex items-center flex-col md:flex-row gap-2 mb-8'>
                {/* --Categories-- */}
                <div className='w-full md:w-1/2'>
                  <select
                    className='border-gray-200 text-gray-500 border w-full p-2 rounded-md cursor-pointer'
                    value={singleTask.categories}
                    onChange={handleChange}
                    name='categories'
                    required>
                    <option className='text-blue-600'>Office</option>
                    <option className='text-violet-600'>Personal</option>
                    <option className='text-red-600'>Home</option>
                    <option className='text-sky-600'>Workout</option>
                  </select>
                </div>
                {/* --Priority-- */}
                <div className='w-full md:w-1/2'>
                  <select
                    className='border-gray-200 text-gray-500 border w-full p-2 rounded-md cursor-pointer'
                    value={singleTask.priority}
                    name='priority'
                    onChange={handleChange}
                    required>
                    <option className='text-green-600'>Low</option>
                    <option className='text-yellow-600'>Medium</option>
                    <option className='text-red-600'>High</option>
                  </select>
                </div>
              </div>
              {/* --Buttons-- */}
              <div className='w-full flex items-center flex-col md:flex-row gap-2'>
                {/* --Add Task-- */}
                <button
                  className='bg-black text-white p-2 rounded-md w-full md:w-1/2 cursor-pointer'
                  type='submit'>
                  Update Task
                </button>
                {/* --Cancel-- */}
                <button
                  className='bg-white text-black p-2 border-gray-400 border rounded-md w-full md:w-1/2 cursor-pointer'
                  onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // --Display Task Details--
            <div>
              <h2 className='text-2xl font-semibold mb-2'>
                {singleTask.title}
              </h2>
              <p className='text-gray-500 mb-2 text-lg'>
                {singleTask.description || 'No description provided.'}
              </p>
              <p className='text-gray-700 mb-2 text-md'>
                Due: {new Date(singleTask.dueDate).toLocaleDateString()}
              </p>
              <p className='text-green-600 mb-2 text-md'>
                Status: {singleTask.status}
              </p>
              <p className='text-yellow-600 mb-2 text-md'>
                Categories: {singleTask.categories}
              </p>
              <p className='text-red-600 mb-2 text-md'>
                Priority: {singleTask.priority}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
