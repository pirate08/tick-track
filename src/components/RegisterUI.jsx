import React from 'react';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterUI = () => {
  return (
    <div className='min-h-screen  flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Create Account
            </h1>
            <p className='text-gray-600'>Join TickTrack to manage your tasks</p>
          </div>

          {/* Error Message Placeholder (Conditionally Rendered) */}
          {/* Replace {error && ...} with static structure for design representation */}
          <div className='mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm'>
            This is an error message placeholder.
          </div>

          {/* Form */}
          <form className='space-y-5'>
            {/* Name Field */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiUser className='text-gray-400' size={20} />
                </div>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='John Doe'
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiMail className='text-gray-400' size={20} />
                </div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='john@example.com'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='text-gray-400' size={20} />
                </div>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {/* Placeholder for the toggle icon */}
                  <FiEye
                    className='text-gray-400 hover:text-gray-600'
                    size={20}
                  />
                </button>
              </div>
              <p className='mt-1 text-xs text-gray-500'>
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='text-gray-400' size={20} />
                </div>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {/* Placeholder for the toggle icon */}
                  <FiEye
                    className='text-gray-400 hover:text-gray-600'
                    size={20}
                  />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-6'>
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className='text-center'>
            <Link
              href='/signin'
              className='text-black font-medium hover:underline transition-all'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
