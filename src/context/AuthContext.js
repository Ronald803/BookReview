// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [bookSelected, setBookSelected] = useState(null);
  const login = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userEmail,
        bookSelected,
        setBookSelected,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
