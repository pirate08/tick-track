import React from 'react';
import {
  MdTaskAlt,
  MdAccessTime,
  MdOutlineCalendarToday,
  MdStarBorder,
} from 'react-icons/md';

const HeroSection = () => {
  return (
    <div>
      {/* --HeroText-- */}
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold mb-6'>
        Everything You Need to Stay Productive
      </h1>
      {/* --Paragraph-- */}
      <p className='text-base sm:text-lg text-gray-500 text-center max-w-2xl mx-auto mb-8 md:mb-16'>
        Our comprehensive dashboard provides all the tools you need to manage
        your tasks effectively
      </p>
      {/* --Box Section-- */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        <div className='bg-white shadow-md p-6 rounded-lg text-center hover:scale-105 transition-transform duration-200'>
          <span className='text-3xl text-black mb-4 inline-block bg-gray-300 p-2 rounded-full'>
            <MdTaskAlt />
          </span>
          <h2 className='text-lg font-semibold mb-2'>Task Management</h2>
          <p className='text-gray-500 text-sm'>
            Organize and track your daily tasks with ease
          </p>
        </div>
        <div className='bg-white shadow-md p-6 rounded-lg text-center hover:scale-105 transition-transform duration-200'>
          <span className='text-3xl text-black mb-4 inline-block bg-gray-300 p-2 rounded-full'>
            <MdAccessTime />
          </span>
          <h2 className='text-lg font-semibold mb-2'>Time Tracking</h2>
          <p className='text-gray-500 text-sm'>
            Monitor your productivity and stay on schedule
          </p>
        </div>
        <div className='bg-white shadow-md p-6 rounded-lg text-center hover:scale-105 transition-transform duration-200'>
          <span className='text-3xl text-black mb-4 inline-block bg-gray-300 p-2 rounded-full'>
            <MdOutlineCalendarToday />
          </span>
          <h2 className='text-lg font-semibold mb-2'>Priority Setting</h2>
          <p className='text-gray-500 text-sm'>
            Focus on what matters most with priority levels
          </p>
        </div>
        <div className='bg-white shadow-md p-6 rounded-lg text-center hover:scale-105 transition-transform duration-200'>
          <span className='text-3xl text-black mb-4 inline-block bg-gray-300 p-2 rounded-full'>
            <MdStarBorder />
          </span>
          <h2 className='text-lg font-semibold mb-2'>Progress Tracking</h2>
          <p className='text-gray-500 text-sm'>
            Visualize your daily achievements and progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
