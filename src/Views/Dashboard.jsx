

import { useState, useEffect } from 'react';
import api from '../component/api'; // Assuming you've saved the axios instance as api

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setUserData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data:', error.response.data.error);
      }
    };

    fetchData();
  }, []);

    return ( 
        <>
            <div>
                <h2>Dashboard</h2>
                {userData && (
                    <div>
                    <p>Name: {userData.firstname + ' '+ userData.lastname}</p>
                    <p>Email: {userData.email}</p>
                    </div>
                )}
                </div>
        </>
     );
}
 
export default Dashboard;