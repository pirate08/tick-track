import Box3 from '@/ui/Box3';
import React from 'react';
import { RiFocus2Fill } from 'react-icons/ri';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { GoLightBulb } from 'react-icons/go';
import { FaRegHeart } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className='h-full px-4 py-10 md:py-18 flex flex-col justify-start items-center'>
      {/* --Title-- */}
      <h1 className='text-3xl md:text-4xl font-bold mb-4'>About Us</h1>
      {/* --Paragraph-- */}
      <p className='mb-10 md:mb-16 text-gray-600 text-md md:text-xl text-center'>
        Learn more about our mission and the team behind Daily Task Keeper
      </p>
      {/* --Big Box-- */}
      <div className='bg-white p-5 md:py-8 md:px-8 w-full max-w-4xl shadow-md rounded-md mb-10'>
        {/* --Starting Title-- */}
        <h1 className='text-2xl font-bold mb-4'>Our Story</h1>
        {/* --First Paragraph-- */}
        <p className='text-gray-600 text-md  mb-5'>
          Daily Task Keeper was born out of a simple observation: too many
          people struggle with staying organized and managing their daily tasks
          effectively. We saw how productivity tools were either too complex for
          everyday use or too simple to be truly useful.
        </p>
        {/* --First Paragraph-- */}
        <p className='text-gray-600 text-md  mb-5'>
          Our team set out to create a solution that strikes the perfect balance
          - powerful enough to handle complex workflows, yet simple enough for
          anyone to use from day one. We believe that great task management
          shouldn't require a learning curve.
        </p>
        {/* --First Paragraph-- */}
        <p className='text-gray-600 text-md '>
          Today, we're proud to help thousands of users stay organized, meet
          their deadlines, and achieve their goals through our intuitive
          dashboard and comprehensive feature set.
        </p>
      </div>
      {/* --Our Values-- */}
      <div className='mt-10'>
        {/* --Title-- */}
        <h1 className='text-2xl font-bold mb-8 text-center'>Our Values</h1>
        {/* --Box section-- */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-4 mx-auto'>
          {/* --First Box-- */}
          <Box3
            icon={<RiFocus2Fill />}
            title={'Focus on Results'}
            description={
              'We believe in helping you achieve your goals through effective task management.'
            }
          />
          {/* --Second Box-- */}
          <Box3
            icon={<AiOutlineUsergroupDelete />}
            title={'User-Centric Design'}
            description={
              'Every feature is designed with user experience and productivity in mind.'
            }
          />
          {/* --Third Box-- */}
          <Box3
            icon={<GoLightBulb />}
            title={'Innovation'}
            description={
              'We continuously improve and add new features to enhance your workflow.'
            }
          />
          {/* --Fourth Box-- */}
          <Box3
            icon={<FaRegHeart />}
            title={'Passion for Productivity'}
            description={
              'We are passionate about helping people become more organized and efficient.'
            }
          />
        </div>
      </div>
      {/* --Join our Community-- */}
      <div className='bg-blue-100 p-6 sm:p-10 rounded-lg border-1 border-gray-300 shadow-md mt-10 w-full max-w-4xl'>
        {/* --Title-- */}
        <h1 className='text-xl text-blue-900 sm:text-xl text-center md:text-2xl font-bold mb-6'>
          Join Our Community
        </h1>
        {/* --Paragraph-- */}
        <p className='text-base sm:text-md text-blue-700 text-center max-w-4xl mx-auto mb-8 '>
          Be part of a growing community of productive individuals who have
          transformed their daily workflows with Daily Task Keeper.
        </p>
        {/* --Demo data-- */}
        <div className='flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16'>
          {/* --Active Users-- */}
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-blue-900'>
              10K+
            </h2>
            <p className='text-blue-700 text-sm sm:text-md mt-1'>
              Active Users
            </p>
          </div>
          {/* --Tasks Completed-- */}
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-blue-900'>
              50K+
            </h2>
            <p className='text-blue-700 text-sm sm:text-md mt-1'>
              Tasks Completed
            </p>
          </div>
          {/* --Satisfaction Rate-- */}
          <div className='text-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-blue-900'>
              98%
            </h2>
            <p className='text-blue-700 text-sm sm:text-md mt-1'>
              Satisfaction Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
