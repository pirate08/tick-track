import AboutUs from '@/components/AboutUs';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* --Navbar-- */}
      <Navbar />
      {/* --About Us goes here-- */}
      <AboutUs />
      {/* --Footer-- */}
      <Footer />
    </div>
  );
};

export default page;
