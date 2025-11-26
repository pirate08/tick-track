'use client';

import React, { useState } from 'react';
import {
  MdLockOutline,
  MdLogout,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import { FiShield } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getCookie, deleteCookie } from 'cookies-next';
import axiosInstance from '@/lib/axios';

const SettingsUI = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //   --Handle the input change--
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   --Handle Submit function goes here--
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --Input Validation--
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error('All fields are required.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Confirm Password doesnot match New Password');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const token = getCookie('user_token');

    // --Api Call-
    try {
      const response = await axiosInstance.patch(
        '/auth/change-password',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Password changed successfully.', {
          duration: 2000,
        });
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        setTimeout(() => {
          deleteCookie('user_token');
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.log('Error in changing the password.', error);
      const errorMessage =
        error.response?.data?.message ||
        'Error in changing the password. Please try again';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //   --Handle logout function--
  const handleLogout = () => {
    // --Delete all the cookie--
    deleteCookie('user_token');

    router.push('/');
  };

  return (
    <div className='min-h-screen p-4 md:p-8 lg:p-10'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
            Settings
          </h1>
          <p className='text-gray-600'>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className='space-y-6'>
          {/* Change Password Section */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            {/* Section Header */}
            <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200'>
              <div className='flex items-center gap-3'>
                <div className='bg-gray-900 p-2 rounded-lg'>
                  <FiShield className='text-white text-xl' />
                </div>
                <div>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Change Password
                  </h2>
                  <p className='text-sm text-gray-600'>
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className='p-6 md:p-8'>
              <form className='space-y-5' onSubmit={handleSubmit}>
                {/* Current Password */}
                <div>
                  <label
                    htmlFor='currentPassword'
                    className='block text-sm font-medium text-gray-700 mb-2'>
                    Current Password *
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <MdLockOutline className='text-gray-400 text-xl' />
                    </div>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id='currentPassword'
                      name='currentPassword'
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder='Enter your current password'
                      className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                      {showCurrentPassword ? (
                        <MdVisibility className='text-gray-400 text-xl hover:text-gray-600 transition-colors' />
                      ) : (
                        <MdVisibilityOff className='text-gray-400 text-xl hover:text-gray-600 transition-colors' />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label
                    htmlFor='newPassword'
                    className='block text-sm font-medium text-gray-700 mb-2'>
                    New Password *
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <MdLockOutline className='text-gray-400 text-xl' />
                    </div>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id='newPassword'
                      name='newPassword'
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder='Enter your new password'
                      className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                      {showNewPassword ? (
                        <MdVisibility className='text-gray-400 text-xl hover:text-gray-600 transition-colors' />
                      ) : (
                        <MdVisibilityOff className='text-gray-400 text-xl hover:text-gray-600 transition-colors' />
                      )}
                    </button>
                  </div>
                  <p className='mt-2 text-xs text-gray-500'>
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium text-gray-700 mb-2'>
                    Confirm New Password *
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <MdLockOutline className='text-gray-400 text-xl' />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder='Confirm your new password'
                      className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all'
                    />
                    <button
                      type='button'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                      {showConfirmPassword ? (
                        <MdVisibility className='text-gray-400 text-xl hover:text-gray-600 transition-colors' />
                      ) : (
                        <MdVisibilityOff className='text-gray-400 text-xl hover:text-gray-600 transition-colors' />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                  <h3 className='text-sm font-semibold text-blue-900 mb-2'>
                    Password Requirements:
                  </h3>
                  <ul className='text-xs text-blue-800 space-y-1'>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full'></span>
                      At least 8 characters long
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full'></span>
                      Contains uppercase and lowercase letters
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full'></span>
                      Contains at least one number
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 bg-blue-600 rounded-full'></span>
                      Contains at least one special character
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className='pt-2'>
                  <button
                    type='submit'
                    className='w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer'>
                    <MdLockOutline className='text-xl' />
                    {loading ? 'Updating...' : 'Update password'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Logout Section */}
          <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
            {/* Section Header */}
            <div className='bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-red-100'>
              <div className='flex items-center gap-3'>
                <div className='bg-red-500 p-2 rounded-lg'>
                  <MdLogout className='text-white text-xl' />
                </div>
                <div>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Logout
                  </h2>
                  <p className='text-sm text-gray-600'>
                    Sign out of your account
                  </p>
                </div>
              </div>
            </div>

            {/* Logout Content */}
            <div className='p-6 md:p-8'>
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex-1'>
                  <p className='text-gray-700 mb-2'>
                    Ready to leave? You can always come back anytime.
                  </p>
                  <p className='text-sm text-gray-500'>
                    Make sure you've saved all your work before logging out.
                  </p>
                </div>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-sm hover:shadow flex items-center justify-center gap-2 md:whitespace-nowrap cursor-pointer'>
                  <MdLogout className='text-xl' />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6'>
            <div className='flex items-start gap-3'>
              <div className='bg-blue-500 p-2 rounded-lg flex-shrink-0'>
                <FiShield className='text-white text-xl' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 mb-1'>
                  Security Tip
                </h3>
                <p className='text-sm text-gray-700'>
                  For your security, we recommend changing your password
                  regularly and using a strong, unique password that you don't
                  use on other websites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsUI;
