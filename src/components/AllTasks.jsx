'use client';

import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import axiosInstance from '@/lib/axios';
import { MdOutlineCalendarToday, MdStarBorder } from 'react-icons/md';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import DailyProgressCard from '@/ui/DailyProgress';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import Link from 'next/link';

const AllTasks = ({ summary, refreshSummary }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // -- Fetch All Tasks --
  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get('/tasks');
      if (res.status === 200) {
        const updatedTasks = res.data.map((task) => ({
          ...task,
          originalStatus: task.status === 'Completed' ? 'To-Do' : task.status,
        }));
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // -- Pagination Calculations --
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // -- Priority Color Logic --
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'border-l-5 border-red-500 bg-red-50';
      case 'Medium':
        return 'border-l-5 border-yellow-500 bg-yellow-50';
      case 'Low':
        return 'border-l-5 border-green-500 bg-green-50';
      default:
        return '';
    }
  };

  const getPriorityTextColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // -- Handle Click on Task --
  const handleClick = async (task) => {
    const newStatus =
      task.status === 'Completed' ? task.originalStatus : 'Completed';

    try {
      const res = await axiosInstance.put(`/tasks/${task._id}`, {
        ...task,
        status: newStatus,
      });

      if (res.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === task._id ? { ...t, status: newStatus } : t
          )
        );
        console.log('Task updated successfully:', res.data);
        refreshSummary();
      }
    } catch (error) {
      console.error('Task update failed:', error.message);
    }
  };

  // --Delete the Completed Task--
  const handleDelete = async (taskId) => {
    try {
      const deleteTask = await axiosInstance.delete(`/tasks/${taskId}`);
      if (deleteTask.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        console.log('Task deleted successfully:', deleteTask.data);
        refreshSummary();
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div>
      {/* --Title-- */}
      <h1 className='text-2xl font-semibold mb-4'>All Tasks</h1>

      {/* --Main Section-- */}
      <div className='flex gap-8 flex-col md:flex-row'>
        {/* --Left Side-- */}
        <div className='w-full md:w-2/3'>
          <div className='mb-6'>
            <AddTaskForm
              refreshTasks={fetchTasks}
              refreshSummary={refreshSummary}
            />
          </div>

          {/* --Tasks List-- */}
          <div>
            {currentTasks.length > 0 ? (
              currentTasks.map((task) => (
                <div
                  key={task._id}
                  className={`p-4 rounded-md flex items-center justify-between shadow-md mb-4 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer ${getPriorityColor(
                    task.priority
                  )} ${task.status === 'Completed' ? 'opacity-50' : ''}`}>
                  <div className='flex gap-2 items-start w-full'>
                    <div>
                      <span
                        onClick={() => handleClick(task)}
                        className='cursor-pointer'>
                        {task.status === 'Completed' ? (
                          <FaCheckCircle className='text-2xl text-green-500' />
                        ) : (
                          <FaRegCircle className='text-2xl text-gray-300' />
                        )}
                      </span>
                    </div>
                    <div>
                      <h2
                        className={`text-md font-semibold ${
                          task.status === 'Completed'
                            ? 'line-through text-gray-400'
                            : ''
                        }`}>
                        <Link href={`/tasks/${task._id}`}>{task.title}</Link>
                      </h2>
                      <p
                        className={`text-sm ${
                          task.status === 'Completed'
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}>
                        {task.description.length > 120
                          ? task.description.substring(0, 120) + '...'
                          : task.description}
                      </p>
                      <div className='mt-2 flex justify-between items-center gap-1'>
                        <p
                          className={`text-xs flex items-center gap-1 ${getPriorityTextColor(
                            task.priority
                          )}`}>
                          <span className='text-lg'>
                            <MdStarBorder />
                          </span>{' '}
                          {task.priority}
                        </p>
                        <p className='text-xs text-gray-500 flex items-center gap-1'>
                          <span>
                            <MdOutlineCalendarToday />
                          </span>{' '}
                          {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {task.status === 'Completed' ? (
                      <MdDeleteOutline
                        className='text-2xl text-red-500 opacity-100'
                        onClick={() => handleDelete(task._id)}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1 className='text-red-600'>No tasks available.</h1>
              </div>
            )}

            {/* --Pagination Buttons-- */}
            {tasks.length > tasksPerPage && (
              <div className='flex justify-between mt-6'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className='px-4 py-1 bg-gray-300 text-2xl rounded-md disabled:opacity-50 cursor-pointer'>
                  <BiLeftArrow />
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className='px-4 py-1 bg-gray-300 text-2xl rounded-md disabled:opacity-50  cursor-pointer'>
                  <BiRightArrow />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --Right Side-- */}
        <div>
          <DailyProgressCard summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
