import React from 'react';

const Box = ({ title, value, description, icon }) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300 ease-in-out'>
      {/* --Title and Icon-- */}
      <div className='flex items-center justify-between'>
        <h1 className='text-gray-500 text-sm'>{title}</h1>
        <span className='text-sky-500 text-2xl'>{icon}</span>
      </div>
      {/* --Value-- */}
      <div>
        <h2 className='text-2xl font-bold text-gray-800'>{value}</h2>
      </div>
      {/* --Description-- */}
      <div>
        <p className='text-xs text-red-600'>{description}</p>
      </div>
    </div>
  );
};

export default Box;
