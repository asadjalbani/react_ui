// context.jsx

import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context for managing modal state
const ViewsContext = createContext();

// Custom hook to access modal context
export const useViewContext = () => useContext(ViewsContext);

// ModalProvider component to manage modal state
export const ViewsProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [tokens, setTokens] = useState(0);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const setAuthToken = (newToken) => {
    setToken(newToken);
  };
  const openUpgradeModal = () => setUpgradeModal(true);
  const closeUpgradeModal = () => setUpgradeModal(false);
  const setTokenCount = (value) => setTokens(value);
  return (
    <ViewsContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        token,
        setAuthToken,
        upgradeModal,
        openUpgradeModal,
        closeUpgradeModal,
        setTokenCount,
        tokens,
      }}
    >
      {children}
    </ViewsContext.Provider>
  );
};
