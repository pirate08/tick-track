'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';

const LoginUI = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  //   --Handle change function goes here--
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Top Blob */}
        <div className='absolute -top-20 -left-20 opacity-30 hidden lg:block'>
          <Image
            src='/blob.svg'
            height={400}
            width={400}
            alt='Decorative blob'
          />
        </div>

        {/* Bottom Wave */}
        <div className='absolute -bottom-10 left-0 right-0 opacity-20 hidden md:block'>
          <Image
            src='/wave.svg'
            height={300}
            width={1200}
            alt='Decorative wave'
            className='w-full object-cover'
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className='w-full max-w-md relative z-10'>
        {/* Card */}
        <div className='bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10'>
          {/* Header */}
          <div className='text-center mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
              Welcome Back
            </h1>
            <p className='text-sm sm:text-base text-gray-600'>
              Sign in to continue to TickTrack
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs sm:text-sm'>
              {error}
            </div>
          )}

          {/* Form */}
          <div className='space-y-4 sm:space-y-5'>
            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiMail className='text-gray-400' size={18} />
                </div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='john@example.com'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className=' mb-1.5 sm:mb-2'>
                <label
                  htmlFor='password'
                  className='block text-xs sm:text-sm font-medium text-gray-700'>
                  Password
                </label>
              </div>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='text-gray-400' size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  onChange={handleChange}
                  value={formData.password}
                  className='w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {showPassword ? (
                    <FiEye
                      className='text-gray-400 hover:text-gray-600'
                      size={18}
                    />
                  ) : (
                    <FiEyeOff
                      className='text-gray-400 hover:text-gray-600'
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className='flex items-center'>
              <input
                id='remember'
                name='remember'
                type='checkbox'
                className='h-4 w-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer'
              />
              <label
                htmlFor='remember'
                className='ml-2 block text-xs sm:text-sm text-gray-700 cursor-pointer'>
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4 sm:mt-6'>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          {/* Divider */}
          <div className='relative my-5 sm:my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-xs sm:text-sm'>
              <span className='px-3 sm:px-4 bg-white text-gray-500'>
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className='text-center'>
            <Link
              href='/register'
              className='text-sm sm:text-base text-black font-medium hover:underline transition-all'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;
