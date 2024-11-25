'use client'
import { createContext, useContext, useState } from "react";

const FloatingButtonContext = createContext();

export const FloatingButtonProvider = ({ children }) => {
  const [state, setState] = useState({
    selectedCategory: '',
    isExpanded: false,
  });

  const toggleExpand = () => {
    setState((prevState) => ({
      ...prevState,
      isExpanded: !prevState.isExpanded,
    }));
  };

  const selectCategory = (category) => {
    setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
    }));
  };

  return (
    <FloatingButtonContext.Provider
      value={{ state, toggleExpand, selectCategory }}
    >
      {children}
    </FloatingButtonContext.Provider>
  );
};

export const useFloatingButton = () => useContext(FloatingButtonContext);
