import React from 'react';

const Box = ({ title, value, icon }) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300 ease-in-out'>
      {/* --Icon-- */}
      <div className='flex items-center justify-center'>
        <span className='text-sky-500 text-3xl md:text-4xl'>{icon}</span>
      </div>
      {/* --Title-- */}
      <div>
        <h2 className='text-xl text-center font-semibold text-gray-800'>
          {title}
        </h2>
      </div>
      {/* --Value-- */}
      <div>
        <p className='text-md text-gray-600 text-center'>{value}</p>
      </div>
    </div>
  );
};

export default Box;
