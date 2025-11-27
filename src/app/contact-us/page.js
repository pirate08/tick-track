import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* --Navbar-- */}
      <Navbar />
      {/* --Contact Us-- */}
      <ContactUs />
      {/* --Footer-- */}
      <Footer />
    </div>
  );
};

export default page;
