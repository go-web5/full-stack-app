"use client"

import { useState, useContext, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginBoolean, setLoginBoolean] = useState(false);

  return (
    <AuthContext.Provider value={[loginBoolean, setLoginBoolean]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
