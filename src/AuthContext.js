import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false, user: null });

  // Cargar el token desde localStorage al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user'); // Puedes almacenar el usuario en localStorage si es necesario
    if (token) {
      setAuth({ token, isAuthenticated: true, user: JSON.parse(user) });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, isAuthenticated: true, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({ token: null, isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
