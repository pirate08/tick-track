'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';

const RegisterUI = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Top Blob */}
        <div className='absolute -top-20 -right-20 opacity-30 hidden lg:block'>
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
              Create Account
            </h1>
            <p className='text-sm sm:text-base text-gray-600'>
              Join TickTrack to manage your tasks
            </p>
          </div>

          {/* Error Message Placeholder */}
          {error && (
            <div className='mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs sm:text-sm'>
              {error}
            </div>
          )}

          {/* Form */}
          <div className='space-y-4 sm:space-y-5'>
            {/* Name Field */}
            <div>
              <label
                htmlFor='name'
                className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiUser className='text-gray-400' size={18} />
                </div>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  className='w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='John Doe'
                />
              </div>
            </div>

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
                  className='w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='john@example.com'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='text-gray-400' size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  className='w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {showPassword ? (
                    <FiEyeOff
                      className='text-gray-400 hover:text-gray-600'
                      size={18}
                    />
                  ) : (
                    <FiEye
                      className='text-gray-400 hover:text-gray-600'
                      size={18}
                    />
                  )}
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
                className='block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='text-gray-400' size={18} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  name='confirmPassword'
                  className='w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {showConfirmPassword ? (
                    <FiEyeOff
                      className='text-gray-400 hover:text-gray-600'
                      size={18}
                    />
                  ) : (
                    <FiEye
                      className='text-gray-400 hover:text-gray-600'
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4 sm:mt-6'>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>

          {/* Divider */}
          <div className='relative my-5 sm:my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-xs sm:text-sm'>
              <span className='px-3 sm:px-4 bg-white text-gray-500'>
                Already have an account?
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className='text-center'>
            <Link
              href='/signin'
              className='text-sm sm:text-base text-black font-medium hover:underline transition-all'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUI;
