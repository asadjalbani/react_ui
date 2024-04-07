import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Dashboard() {
  const [activePage, setActivePage] = useState('defaultPage');

  const handleItemClick = (page) => {
    setActivePage(page); // Update the activePage state based on the clicked sidebar item
  };

  return (
    <div>
      <Header />
      <Sidebar onItemClick={handleItemClick} />
      <MainContent activePage={activePage} />
    </div>
  );
}

export default Dashboard;
