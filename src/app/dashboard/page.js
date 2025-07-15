import DashboardPage from '@/components/Dashboard';
import TimeAndDate from '@/ui/TimeAndDate';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='h-full py-6 px-4 md:py-10 md:px-32'>
      <div className='flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6'>
        {/* --Title and para -- */}
        <div>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>TickTrack</h1>
          <p className='text-gray-500 max-w-md'>
            Stay organized and productive with your daily tasks.
          </p>
        </div>

        {/* --Time and date-- */}
        <div className='text-right w-full md:w-auto'>
          <TimeAndDate />
        </div>
      </div>
      {/* --Dashboard-- */}
      <div className='mt-9'>
        <DashboardPage />
      </div>
    </div>
  );
};

export default Dashboard;
