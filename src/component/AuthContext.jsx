import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api"

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
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
              setUserData(response.data.user)
              console.log(response.data.user)
          }
          else{
            navigate('/login');
          }
          }

       catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login');
        } 
        } 
        
      
    };
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{  logout, userData, setUserData, token }}>
      {children}
    </AuthContext.Provider>
  );
};


 export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;