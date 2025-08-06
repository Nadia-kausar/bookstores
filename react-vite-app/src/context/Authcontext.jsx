import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On load, check if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token); // ✅ simple flag for authentication
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
