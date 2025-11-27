'use client';

import DashboardPage from '@/components/Dashboard';
import TimeAndDate from '@/ui/TimeAndDate';
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const router = useRouter();
  const hasShownToast = useRef(false); // Prevent double toast

  useEffect(() => {
    const token = getCookie('user_token');

    if (!token && !hasShownToast.current) {
      hasShownToast.current = true; // block next render
      toast.error('Please sign in first to visit the dashboard page.');
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <Navbar />

      <div className='h-full py-6 px-4 md:py-10 md:px-32'>
        <div className='flex flex-col-reverse md:flex-row justify-between items-start md:items-center gap-6'>
          {/* Title */}
          <div>
            <h1 className='text-2xl md:text-3xl font-bold mb-2'>TickTrack</h1>
            <p className='text-gray-500 max-w-md'>
              Stay organized and productive with your daily tasks.
            </p>
          </div>

          {/* Time and date */}
          <div className='text-right w-full md:w-auto'>
            <TimeAndDate />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className='mt-9'>
          <DashboardPage />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
