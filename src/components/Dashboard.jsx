'use client';

import Box from '@/ui/Box';
import React, { useState, useEffect } from 'react';
import {
  MdTaskAlt,
  MdAccessTime,
  MdOutlineCalendarToday,
  MdAddCircle,
} from 'react-icons/md';
import axiosInstance from '@/lib/axios';
import AllTasks from './AllTasks';

const DashboardPage = () => {
  const [summary, setSummary] = useState({});

  const fetchSummary = async () => {
    try {
      const res = await axiosInstance.get('/tasks/summary');
      if (res.status === 200) {
        setSummary(res.data);
        console.log('Summary fetched successfully:', res.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div>
      {/* -- Summary Cards -- */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:mb-14'>
        <Box
          title='Completed Works'
          icon={<MdTaskAlt />}
          value={summary.completedTasks || '0'}
          description={`${summary.completedTasks || 0} of ${
            summary.totalTasks || 0
          } tasks done`}
        />
        <Box
          title='Pending Tasks'
          icon={<MdAccessTime />}
          value={summary.pendingTasks || '0'}
          description='Tasks remaining'
        />
        <Box
          title='High Priority'
          icon={<MdOutlineCalendarToday />}
          value={summary.highpriorityTasks || '0'}
          description='Urgent Tasks to focus on'
        />
        <Box
          title='Completion Rate'
          icon={<MdAddCircle />}
          value={`${summary?.completionRate ?? 0}%`}
          description="Today's progress"
        />
      </div>

      {/* --All tasks goes here-- */}
      <AllTasks summary={summary} refreshSummary={fetchSummary} />
    </div>
  );
};

export default DashboardPage;
