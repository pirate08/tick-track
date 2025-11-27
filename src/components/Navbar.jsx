'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiMail } from 'react-icons/ci';
import { MdDashboard } from 'react-icons/md';
import {
  IoIosInformationCircleOutline,
  IoMdSettings,
  IoMdLogIn,
  IoMdHome,
} from 'react-icons/io';
import { HiMenu, HiX } from 'react-icons/hi';

const Nav_Items = [
  { id: 1, icon: IoMdHome, name: 'Home', link: '/' },
  { id: 2, icon: MdDashboard, name: 'Dashboard', link: '/dashboard' },
  { id: 3, icon: CiMail, name: 'Contact Us', link: '/contact-us' },
  {
    id: 4,
    icon: IoIosInformationCircleOutline,
    name: 'About Us',
    link: '/about-us',
  },
  { id: 5, icon: IoMdSettings, name: 'Settings', link: '/settings' },
  { id: 6, icon: IoMdLogIn, name: 'Login', link: '/login' },
];

const Navbar = () => {
  const currentPath = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='bg-white shadow-sm h-18 py-2 px-4 md:px-24 flex justify-between items-center'>
      <Link href='/'>
        <h1 className='text-2xl font-bold text-black'>TickTrack</h1>
      </Link>

      <div className='md:hidden text-black'>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      <div className='hidden md:flex'>
        {Nav_Items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.link;

          return (
            <Link
              key={item.id}
              href={item.link}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors duration-200 mr-5 ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:text-black hover:bg-gray-100'
              }`}>
              <Icon />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-white border-t border-gray-200 md:hidden shadow-md'>
          <div className='flex flex-col p-4'>
            {Nav_Items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.link;

              return (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md mb-1 transition-colors duration-200 ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  }`}>
                  <Icon />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
