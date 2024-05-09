import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  useEffect(() => {
    if(!token){
     navigate('/login');
    }
  }, [token]);
  useEffect(() => {
    const fetchData = async () => {
      
      try {
     
            const response = await api.get('/');
            if(response.data.user){
              setIsAuthenticated(true)
              setUserData(response.data.user)
              console.log(response.data.user)
          }
          else{
            navigate('/login');
          }
          }

       catch (error) {
        if (error && error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          navigate('/login');
         
        } 
        
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, userData, setIsAuthenticated, setUserData, token }}>
      {children}
    </AuthContext.Provider>
  );
};


 export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;