// 'use client';
// import React, { useState, useEffect } from 'react';
// import axiosInstance from '@/lib/axios';
import React from 'react';

const DailyProgressCard = ({ summary }) => {
  // const [summary, setSummary] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const res = await axiosInstance.get('/tasks/summary');
  //     if (res.status === 200) {
  //       setSummary(res.data);
  //       console.log('Summary fetched successfully:', res.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching summary:', error);
  //   }
  // };

  // // -- Calling the fetchData function on component mount --
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className='flex flex-col gap-8'>
      {/* --Daily Progress-- */}
      <div className='bg-white rounded-lg shadow-md p-6 w-full md:w-96'>
        <h2 className='text-xl font-semibold mb-4'>Daily Progress</h2>

        {/* Circle UI */}
        <div className='flex flex-col items-center justify-center'>
          <div className='relative w-24 h-24 mb-4'>
            <svg
              className='w-full h-full transform -rotate-90'
              viewBox='0 0 100 100'>
              <circle
                cx='50'
                cy='50'
                r='45'
                stroke='#f3f4f6'
                strokeWidth='10'
                fill='none'
              />
              <circle
                cx='50'
                cy='50'
                r='45'
                stroke='#111827'
                strokeWidth='10'
                fill='none'
                strokeDasharray='283'
                strokeDashoffset={
                  summary.completionRate
                    ? 283 - (summary.completionRate / 100) * 283
                    : 283
                }
                strokeLinecap='round'
              />
            </svg>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-xl font-bold'>
                {summary.completionRate}%
              </span>
              <span className='text-sm text-gray-500'>Complete</span>
            </div>
          </div>

          {/* Completed & Remaining */}
          <p className='text-gray-600 text-sm'>
            {summary.completedTasks} completed, {summary.pendingTasks} remaining
          </p>
        </div>
      </div>
      {/* --Quick Overview-- */}
      <div className='bg-white rounded-lg shadow-md p-6 w-full md:w-96'>
        <h2 className='text-xl font-semibold mb-4'>Quick Overview</h2>
        <div className='flex flex-col gap-4'>
          {/* --Total Tasks-- */}
          <div className='flex justify-between items-center'>
            <h6 className='text-gray-500 text-sm'>Total Tasks</h6>
            <span>{summary.totalTasks}</span>
          </div>
          {/* --Completed-- */}
          <div className='flex justify-between items-center'>
            <h6 className='text-gray-500 text-sm'>Completed</h6>
            <span className='text-green-500'>{summary.completedTasks}</span>
          </div>
          {/* --High Priority-- */}
          <div className='flex justify-between items-center'>
            <h6 className='text-gray-500 text-sm'>High Priority</h6>
            <span className='text-red-500'>{summary.highpriorityTasks}</span>
          </div>
          {/* --Success Rate-- */}
          <div className='flex justify-between items-center'>
            <h6 className='text-gray-500 text-sm'>Success Rate</h6>
            <span className='text-blue-500'>{summary.completionRate}%</span>
          </div>
        </div>
      </div>
      {/* --Motivational Quote-- */}
      <div className='bg-blue-100 rounded-lg shadow-md p-6 w-full md:w-96 text-center'>
        <h1 className='text-blue-800 font-bold mb-2'>Keep Going! 💪</h1>
        <p className='text-sm text-blue-700'>
          Every task completed is a step forward. You've got this!
        </p>
      </div>
    </div>
  );
};

export default DailyProgressCard;
