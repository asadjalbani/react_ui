import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { ViewsProvider } from "./context/ViewsContext";

function Dashboard() {
  const [activePage, setActivePage] = useState("accounts");

  const handleItemClick = (page) => {
    setActivePage(page); // Update the activePage state based on the clicked sidebar item
  };

  return (
    <div>
      <ViewsProvider>
        <Header />
        <Sidebar onItemClick={handleItemClick} />
        <MainContent activePage={activePage} />
      </ViewsProvider>
    </div>
  );
}

export default Dashboard;
