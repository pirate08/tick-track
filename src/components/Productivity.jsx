import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

const Productivity = () => {
  return (
    <div className='bg-blue-100 p-6 sm:p-10 rounded-lg border-1 border-gray-300 shadow-md'>
      {/* --Title-- */}
      <h1 className='text-xl text-blue-900 sm:text-2xl md:text-3xl font-bold mb-6'>
        Ready to Transform Your Productivity? 🚀
      </h1>
      {/* --Paragraph-- */}
      <p className='text-base sm:text-lg text-blue-700 text-center max-w-2xl mx-auto mb-8 '>
        Join thousands of users who have already improved their daily workflow
        with our task management system.
      </p>
      {/* --Call to Action-- */}
      <Link href='/dashboard' className='no-underline flex justify-center'>
        <button className='flex items-center justify-center gap-1 bg-black text-white py-2 px-8 sm:px-9 w-full sm:w-auto cursor-pointer rounded-md text-base sm:text-lg hover:bg-gray-800 transition-colors duration-200'>
          Start Managing Tasks
          <span className='text-2xl'>
            <BiRightArrowAlt />
          </span>
        </button>
      </Link>
    </div>
  );
};

export default Productivity;
