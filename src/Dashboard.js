import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Dashboard() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <MainContent />
    </div>
  );
}

export default Dashboard;