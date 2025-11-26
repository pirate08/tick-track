import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SettingsUI from '@/components/SettingsUI';
import React from 'react';

const Settings = () => {
  return (
    <div>
      {/* --Navbar goes here-- */}
      <Navbar />
      {/* --Main content goes here-- */}
      <SettingsUI />
      {/* --Footer goes here-- */}
      <Footer />
    </div>
  );
};

export default Settings;
