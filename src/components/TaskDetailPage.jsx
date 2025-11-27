'use client';

import React, { useState, useEffect } from 'react';
import { MdDeleteOutline, MdModeEditOutline, MdClose } from 'react-icons/md';
import { FaArrowLeft, FaCalendar, FaFlag } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axiosInstance from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

const TaskDetailPage = () => {
  const [singleTask, setSingleTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const taskId = params?.taskId;
  const router = useRouter();

  // Fetch Single Task
  useEffect(() => {
    const fetchSingleTask = async () => {
      const token = getCookie('user_token');
      try {
        const response = await axiosInstance.get(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading task...</p>
        </div>
      </div>
    );
  }

  // Handle Change for Form Fields
  const handleChange = (e) => {
    setSingleTask((prevtask) => ({
      ...prevtask,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle OnSubmit function
  const onSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie('user_token');
    try {
      const response = await axiosInstance.put(`/tasks/${taskId}`, singleTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setIsEditing(false);
        toast.success('Task updated successfully ✅');
      }
    } catch (error) {
      toast.error('Failed to update task ❌');
      console.log('Error updating task', error.message);
    }
  };

  // Delete Task
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    const token = getCookie('user_token');
    try {
      const res = await axiosInstance.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.success('Task deleted successfully ✅');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to delete task ❌');
      console.error('Error deleting task:', error.message);
    }
  };

  // Go back button function
  const goBack = () => {
    router.push('/dashboard');
  };

  // Helper functions for styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'To-Do':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Office':
        return 'bg-blue-100 text-blue-800';
      case 'Personal':
        return 'bg-purple-100 text-purple-800';
      case 'Home':
        return 'bg-pink-100 text-pink-800';
      case 'Workout':
        return 'bg-cyan-100 text-cyan-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='min-h-screen  p-4 md:p-8 lg:p-10'>
      <div className='max-w-5xl mx-auto'>
        {/* Back Button */}
        <button
          onClick={goBack}
          className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 group cursor-pointer'>
          <FaArrowLeft className='group-hover:-translate-x-1 transition-transform duration-200' />
          <span className='font-medium'>Back to tasks</span>
        </button>

        {/* Main Card */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='flex-1'>
                <p className='text-sm text-gray-500 mb-1'>Task Details</p>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 break-words'>
                  {singleTask.title}
                </h1>
              </div>

              {/* Action Buttons */}
              {!isEditing && (
                <div className='flex items-center gap-2 flex-shrink-0'>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow cursor-pointer'>
                    <MdModeEditOutline className='text-lg' />
                    <span className='hidden sm:inline'>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow cursor-pointer'>
                    <MdDeleteOutline className='text-lg' />
                    <span className='hidden sm:inline'>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className='p-6 md:p-8'>
            {isEditing ? (
              /* Edit Form */
              <form onSubmit={onSubmit} className='space-y-6'>
                {/* Close Edit Button */}
                <div className='flex justify-end'>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='text-gray-400 hover:text-gray-600 transition-colors'>
                    <MdClose className='text-2xl' />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Task Title *
                  </label>
                  <input
                    type='text'
                    name='title'
                    placeholder='Enter task title'
                    value={singleTask.title}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Description *
                  </label>
                  <textarea
                    name='description'
                    placeholder='Enter task description'
                    value={singleTask.description}
                    onChange={handleChange}
                    required
                    rows='5'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none'
                  />
                </div>

                {/* Grid for fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Due Date */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Due Date
                    </label>
                    <input
                      type='date'
                      name='dueDate'
                      value={singleTask.dueDate?.slice(0, 10)}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Status *
                    </label>
                    <select
                      name='status'
                      value={singleTask.status}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all cursor-pointer'>
                      <option>To-Do</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Category *
                    </label>
                    <select
                      name='categories'
                      value={singleTask.categories}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all cursor-pointer'>
                      <option>Office</option>
                      <option>Personal</option>
                      <option>Home</option>
                      <option>Workout</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Priority *
                    </label>
                    <select
                      name='priority'
                      value={singleTask.priority}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all cursor-pointer'>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                  <button
                    type='submit'
                    className='flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm hover:shadow'>
                    Update Task
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsEditing(false)}
                    className='flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium'>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Display View */
              <div className='space-y-6'>
                {/* Description */}
                <div>
                  <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2'>
                    Description
                  </h3>
                  <p className='text-gray-700 text-lg leading-relaxed'>
                    {singleTask.description || 'No description provided.'}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
                  {/* Due Date */}
                  <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaCalendar className='text-gray-400' />
                      <span className='text-sm font-medium text-gray-500'>
                        Due Date
                      </span>
                    </div>
                    <p className='text-gray-900 font-semibold'>
                      {new Date(singleTask.dueDate).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </p>
                  </div>

                  {/* Status */}
                  <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    <div className='flex items-center gap-2 mb-2'>
                      <AiOutlineCheckCircle className='text-gray-400' />
                      <span className='text-sm font-medium text-gray-500'>
                        Status
                      </span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        singleTask.status
                      )}`}>
                      {singleTask.status}
                    </span>
                  </div>

                  {/* Category */}
                  <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    <div className='flex items-center gap-2 mb-2'>
                      <BiCategory className='text-gray-400' />
                      <span className='text-sm font-medium text-gray-500'>
                        Category
                      </span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                        singleTask.categories
                      )}`}>
                      {singleTask.categories}
                    </span>
                  </div>

                  {/* Priority */}
                  <div className='bg-gray-50 rounded-lg p-4 border border-gray-200'>
                    <div className='flex items-center gap-2 mb-2'>
                      <FaFlag className='text-gray-400' />
                      <span className='text-sm font-medium text-gray-500'>
                        Priority
                      </span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(
                        singleTask.priority
                      )}`}>
                      {singleTask.priority}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
