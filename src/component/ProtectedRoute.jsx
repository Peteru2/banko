import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../component/api';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get('/');
        // Assuming your API returns a valid response if the token is valid
        setIsLoading(false);
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          // Token expired or invalid, redirect to login page
          navigate('/login');
        } else {
          // Handle other errors
        }
      }
    };

    verifyToken();
  }, [navigate]);

  return isLoading ? null : <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
