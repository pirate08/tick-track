import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Productivity from '@/components/Productivity';
import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

export default function Home() {
  return (
    <div>
      {/* --Navbar-- */}
      <div>
        <Navbar />
      </div>
      <main className='flex min-h-screen flex-col items-center px-6 py-12 md:px-24 md:py-24 text-center'>
        {/* --HeroText-- */}
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-6'>
          Welcome to Daily Task Keeper
        </h1>

        <p className='text-base sm:text-lg text-gray-500 max-w-xl mb-8'>
          Stay organized, boost productivity, and achieve your goals with our
          intuitive task management dashboard. Transform your daily routine into
          a success story.
        </p>

        {/* --Buttons-- */}
        <div className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'>
          <Link href='/dashboard' className='no-underline w-full sm:w-auto'>
            <button className='flex items-center justify-center gap-2 bg-black text-white py-2 px-8 sm:px-9 w-full sm:w-auto cursor-pointer rounded-md text-base sm:text-lg hover:bg-gray-800 transition-colors duration-200'>
              Get Started
              <span className='text-2xl'>
                <BiRightArrowAlt />
              </span>
            </button>
          </Link>

          <button className='bg-white text-black shadow-sm cursor-pointer py-2 px-8 sm:px-9 w-full sm:w-auto rounded-md text-base sm:text-lg hover:bg-gray-100 transition-colors duration-200'>
            Learn More
          </button>
        </div>
        {/* --HeroSection-- */}
        <div className='mt-28 md:mt-32 w-full'>
          <HeroSection />
        </div>
        {/* --Productivity-- */}
        <div className='mt-28 md:mt-32 w-full'>
          <Productivity />
        </div>
      </main>
      {/* --Footer-- */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
