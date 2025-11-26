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
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

const AllTasks = ({ summary, refreshSummary }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // -- Sort Tasks Function --
  const sortTasks = (tasksArray) => {
    return tasksArray.sort((a, b) => {
      // Completed tasks go to the bottom
      if (a.status === 'Completed' && b.status !== 'Completed') {
        return 1; // a comes after b
      }
      if (a.status !== 'Completed' && b.status === 'Completed') {
        return -1; // a comes before b
      }
      // If both have the same completion status, maintain original order
      return 0;
    });
  };

  // -- Fetch All Tasks --
  const fetchTasks = async () => {
    const token = getCookie('user_token');
    try {
      const res = await axiosInstance.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const updatedTasks = res.data.map((task) => ({
          ...task,
          originalStatus: task.status === 'Completed' ? 'To-Do' : task.status,
        }));
        // Sort tasks after fetching
        const sortedTasks = sortTasks(updatedTasks);
        setTasks(sortedTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // -- Calculate Time Remaining --
  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);

    // Set both dates to start of day (12:00 AM) for day calculation
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const dueStart = new Date(due.getFullYear(), due.getMonth(), due.getDate());

    // Calculate difference in milliseconds
    const diffMs = dueStart - todayStart;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // If due date is today or in the past
    if (diffDays === 0) {
      // Calculate hours remaining until end of today (11:59:59 PM)
      const endOfToday = new Date(todayStart);
      endOfToday.setHours(23, 59, 59, 999);
      const hoursRemaining = Math.ceil((endOfToday - now) / (1000 * 60 * 60));

      if (hoursRemaining > 1) {
        return {
          text: `${hoursRemaining} hours`,
          color: 'text-orange-600',
          isOverdue: false,
        };
      } else if (hoursRemaining === 1) {
        return { text: '1 hour', color: 'text-orange-600', isOverdue: false };
      } else {
        const minutesRemaining = Math.ceil((endOfToday - now) / (1000 * 60));
        if (minutesRemaining > 0) {
          return {
            text: `${minutesRemaining} minutes`,
            color: 'text-red-600',
            isOverdue: false,
          };
        }
      }
    }

    // If due date has passed
    if (diffDays < 0) {
      const overdueDays = Math.abs(diffDays);
      if (overdueDays === 1) {
        return {
          text: '1 day overdue',
          color: 'text-red-600',
          isOverdue: true,
        };
      }
      return {
        text: `${overdueDays} days overdue`,
        color: 'text-red-600',
        isOverdue: true,
      };
    }

    // If due date is in the future
    if (diffDays === 1) {
      return { text: '1 day', color: 'text-yellow-600', isOverdue: false };
    }

    if (diffDays <= 3) {
      return {
        text: `${diffDays} days`,
        color: 'text-yellow-600',
        isOverdue: false,
      };
    }

    if (diffDays <= 7) {
      return {
        text: `${diffDays} days`,
        color: 'text-blue-600',
        isOverdue: false,
      };
    }

    return {
      text: `${diffDays} days`,
      color: 'text-gray-500',
      isOverdue: false,
    };
  };

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

    const token = getCookie('user_token');

    try {
      const res = await axiosInstance.put(
        `/tasks/${task._id}`,
        {
          ...task,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        // Update tasks and re-sort
        const updatedTasks = tasks.map((t) =>
          t._id === task._id ? { ...t, status: newStatus } : t
        );
        const sortedTasks = sortTasks(updatedTasks);
        setTasks(sortedTasks);

        toast.success(`Task marked as ${newStatus} ✅`);
        console.log('Task updated successfully:', res.data);
        refreshSummary();
      }
    } catch (error) {
      toast.error('Failed to update task ❌');
      console.error('Task update failed:', error.message);
    }
  };

  // --Delete the Completed Task--
  const handleDelete = async (taskId) => {
    const token = getCookie('user_token');
    try {
      const deleteTask = await axiosInstance.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (deleteTask.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        toast.success('Task deleted successfully ✅');
        console.log('Task deleted successfully:', deleteTask.data);
        refreshSummary();
      }
    } catch (error) {
      toast.error('Failed to delete task ❌');
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
              currentTasks.map((task) => {
                const timeRemaining = getTimeRemaining(task.dueDate);

                return (
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
                      <div className='flex-1'>
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
                        <div className='mt-2 flex justify-between items-center gap-5 flex-wrap'>
                          <p
                            className={`text-xs flex items-center gap-1 ${getPriorityTextColor(
                              task.priority
                            )}`}>
                            <span className='text-lg'>
                              <MdStarBorder />
                            </span>{' '}
                            {task.priority}
                          </p>
                          <p
                            className={`text-xs ${timeRemaining.color} flex items-center gap-1 font-medium`}>
                            {timeRemaining.isOverdue ? (
                              <>
                                <span>
                                  <MdOutlineCalendarToday />
                                </span>
                                {timeRemaining.text}
                              </>
                            ) : (
                              <>
                                Due in:
                                <span>
                                  <MdOutlineCalendarToday />
                                </span>{' '}
                                {timeRemaining.text}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      {task.status === 'Completed' ? (
                        <MdDeleteOutline
                          className='text-2xl text-red-500 opacity-100 cursor-pointer hover:scale-110 transition-transform'
                          onClick={() => handleDelete(task._id)}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                );
              })
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
