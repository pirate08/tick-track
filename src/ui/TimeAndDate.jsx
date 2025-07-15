'use client';

import React, { useState, useEffect } from 'react';

const TimeAndDate = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const actualTime = `${formattedHours < 10 ? '0' : ''}${formattedHours}:${
        minutes < 10 ? '0' : ''
      }${minutes} ${ampm}`;

      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      };
      const actualDate = now.toLocaleDateString(undefined, options);

      setCurrentTime(actualTime);
      setCurrentDate(actualDate);
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className='text-black text-xl sm:text-2xl md:text-3xl'>
        {currentTime}
      </h1>
      <p className='text-gray-500 text-sm sm:text-base text-right md:text-right'>
        {currentDate}
      </p>
    </div>
  );
};

export default TimeAndDate;
