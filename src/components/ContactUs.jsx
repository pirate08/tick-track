import Box from '@/ui/Box2';
import React from 'react';
import {
  MdOutlineMail,
  MdOutlinePhoneInTalk,
  MdOutlineLocationOn,
} from 'react-icons/md';

const ContactUs = () => {
  return (
    <div className='h-full px-4 py-10 md:py-18 flex flex-col justify-center items-center'>
      {/* --Title-- */}
      <h1 className='text-3xl md:text-4xl font-bold mb-4'>Contact Us</h1>
      {/* --Paragraph-- */}
      <p className='mb-10 md:mb-16 text-gray-600 text-md md:text-xl text-center'>
        Have questions? We'd love to hear from you. Get in touch with our team.
      </p>
      {/* --Box Part-- */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl px-4'>
        {/* --Box 1-- */}
        <Box
          icon={<MdOutlineMail />}
          title={'Email'}
          value={'devdosedaily@gmail.com'}
        />
        {/* --Box 2-- */}
        <Box
          icon={<MdOutlinePhoneInTalk />}
          title={'Phone'}
          value={'+1 (555) 123-4567'}
        />
        {/* --Box 3-- */}
        <Box
          icon={<MdOutlineLocationOn />}
          title={'Location'}
          value={'Mekhliganj, Coochbehar'}
        />
      </div>
      {/* --Form Section-- */}
      <div className='w-full max-w-4xl mt-10 bg-white p-6 md:p-10 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-6'>Send us a message</h2>
        <form className='space-y-6'>
          {/* Name & Email */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              type='text'
              placeholder='Your Name'
              className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='email'
              placeholder='Your Email'
              className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Subject */}
          <input
            type='text'
            placeholder='Subject'
            className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          {/* Message */}
          <textarea
            placeholder='Your Message'
            rows='5'
            className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></textarea>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-[#0d1321] text-white py-3 rounded-md font-semibold hover:bg-[#1c2230] transition-colors duration-300 cursor-pointer'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
