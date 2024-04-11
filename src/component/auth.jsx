import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState('')
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setUserData(response.data.user);
        setIsAuthenticated(true)
        console.log(response.data.user)
       
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login');
          setIsAuthenticated(false);
        } 
        
      }
    };
    fetchData();
  }, []);

const login = () => {
    setIsAuthenticated(true);
    setUserData("")
};

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData  }}>
      {children}
    </AuthContext.Provider>
  );
};

 export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;