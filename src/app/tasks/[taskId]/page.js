import TaskDetailPage from '@/components/TaskDetailPage';
import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div>
      {/* --Navbar-- */}
      <Navbar />
      {/* --Task Detail Page-- */}
      <TaskDetailPage />
      {/* --Footer-- */}
      <Footer />
    </div>
  );
};

export default page;
