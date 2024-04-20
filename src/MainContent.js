import React from "react";
import TokenDataTable from "./TokenDataTable";
import Accounts from "./sidebar/Accounts";
import Groups from "./sidebar/Groups";
import Archive from "./sidebar/Archive";
import Proxies from "./sidebar/Proxy";

function MainContent({ activePage }) {
  // Conditionally render content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case "accounts":
        return (
          <>
            <TokenDataTable /> <Accounts />
          </>
        );
      case "groups":
        return <Groups />;
      case "archive":
        return <Archive />;
      case "proxies":
        return <Proxies />;
      default:
        return <div>Select an option from the sidebar</div>; // Default content
    }
  };

  return (
    <div
      style={{
        marginLeft: "350px",
        padding: "20px",
        width: "calc(100% - 250px)",
        position: "fixed",
        top: "64px",
        bottom: "0",
        right: "0",
        overflowY: "scroll",
      }}
    >
      {renderContent()}
    </div>
  );
}

export default MainContent;
