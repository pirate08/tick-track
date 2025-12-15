'use client';

import axiosInstance from '@/lib/axios';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const AddTaskForm = ({ refreshTasks, refreshSummary }) => {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To-Do',
    categories: 'Office',
    priority: 'Low',
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getCookie('user_token');
    try {
      const send = await axiosInstance.post('/tasks', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (send.status === 200 || send.status === 201) {
        toast.success('Task added successfully ✅');
        setShowForm(false);
        router.refresh();
        setFormData({
          title: '',
          description: '',
          dueDate: '',
          status: 'To-Do',
          categories: 'Office',
          priority: 'Low',
        });
        if (refreshTasks) refreshTasks();
        if (refreshSummary) refreshSummary();
      }
    } catch (error) {
      toast.error(`Failed to add task ❌`);
      console.log('Error to send data..', error.message);
    }
  };

  return (
    <div>
      {/* --Form open text-- */}
      <div className='border-2 relative border-dashed border-gray-300 rounded-md px-4 py-3 flex items-center cursor-pointer hover:bg-gray-50 transition'>
        <AiOutlinePlus className='text-xl mr-2' />
        <span
          className='text-sm font-medium text-black'
          onClick={() => setShowForm(!showForm)}>
          Add new task
        </span>
      </div>
      {/* --Form-- */}
      {showForm ? (
        <div className='bg-white rounded-md border-gray-300 border-1 p-4 md:p-7 absolute w-[344px] md:w-[845px] z-50 mt-1'>
          {/* --Title-- */}
          <h1 className='text-md md:text-xl font-bold'>Add New Task</h1>
          {/* --Form-- */}
          <form className='mt-4' onSubmit={handleSubmit}>
            {/* --Text Field-- */}
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Task Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                placeholder='Task Title (required)'
                value={formData.title}
                onChange={handleChange}
                className='border-gray-200 border-1 w-full p-2 rounded-md'
                required
              />
            </div>
            {/* --Description Field-- */}
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Description
              </label>
              <textarea
                id='description'
                placeholder='Description (required)'
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                cols='5'
                rows='4'
                className='border-gray-200 border-1 w-full p-2 rounded-md'
              />
            </div>
            {/* --Due and Status */}
            <div className='flex items-center flex-col md:flex-row gap-2 mb-4'>
              {/* --Due Date-- */}
              <div className='w-full md:w-1/2'>
                <label
                  htmlFor='dueDate'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Due Date
                </label>
                <input
                  type='date'
                  id='dueDate'
                  name='dueDate'
                  value={formData.dueDate}
                  onChange={handleChange}
                  className='border-gray-200 border w-full text-gray-500 p-2 rounded-md cursor-pointer'
                />
              </div>
              {/* --Status-- */}
              <div className='w-full md:w-1/2'>
                <label
                  htmlFor='status'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Status
                </label>
                <select
                  id='status'
                  className='border-gray-200 text-gray-500 border w-full p-2 rounded-md cursor-pointer'
                  value={formData.status}
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
                <label
                  htmlFor='categories'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Categories
                </label>
                <select
                  id='categories'
                  className='border-gray-200 text-gray-500 border w-full p-2 rounded-md cursor-pointer'
                  value={formData.categories}
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
                <label
                  htmlFor='priority'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Priority
                </label>
                <select
                  id='priority'
                  className='border-gray-200 text-gray-500 border w-full p-2 rounded-md cursor-pointer'
                  value={formData.priority}
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
                Add Task
              </button>
              {/* --Cancel-- */}
              <button
                type='button'
                className='bg-white text-black p-2 border-gray-400 border rounded-md w-full md:w-1/2 cursor-pointer'
                onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default AddTaskForm;
