import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setIsAuthenticated(true)
        console.log(response.data.user)
       
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          setIsAuthenticated(false);
        } 
        
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    // navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData, setIsAuthenticated, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


 export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;