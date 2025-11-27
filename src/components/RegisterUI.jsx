'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

const RegisterUI = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // --Form Submission--
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // --Input Validation--
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    // --API Call--
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        toast.success('Account created successfully ✅');
        console.log('Registration successful:', response.data);

        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        router.push('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage =
        error.response?.data?.message ||
        'Failed to create account. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs sm:text-sm'>
              {error}
            </div>
          )}

          {/* Form */}
          <form className='space-y-4 sm:space-y-5' onSubmit={handleSubmit}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              {/* ✅ IMPROVED: Only show message when user has typed something */}
              {formData.password && (
                <p
                  className={`mt-2 text-xs ${
                    formData.password.length >= 6
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                  {formData.password.length < 6
                    ? 'Must be at least 6 characters'
                    : 'Looks good!'}
                </p>
              )}
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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none'
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {showConfirmPassword ? (
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
              {/* ✅ IMPROVED: Only show when both fields have values */}
              {formData.password && formData.confirmPassword && (
                <p className='mt-2 text-xs text-red-500'>
                  {formData.password !== formData.confirmPassword
                    ? 'Passwords do not match'
                    : ''}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-black text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4 sm:mt-6 cursor-pointer'>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

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
              href='/login'
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
