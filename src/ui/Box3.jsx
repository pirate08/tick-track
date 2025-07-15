import React from 'react';

const Box3 = ({ title, description, icon }) => {
  return (
    <div className='bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 hover:scale-105 transition-transform duration-300 ease-in-out'>
      {/* --Icon, title, description-- */}
      <div className='flex items-start gap-4 justify-between'>
        {/* --Icon-- */}
        <div>
          <span className='bg-gray-300 text-black rounded-md p-2 text-xl md:text-2xl inline-flex items-center justify-center'>
            {icon}
          </span>
        </div>
        {/* --Title and Description-- */}
        <div>
          <h1 className='text-lg mb-1'>{title}</h1>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Box3;
