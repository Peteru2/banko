import { useState, useEffect } from 'react';
import api from '../../component/api.js'
const AccDetails = () => {
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
       
                {userData && (
                    <div>
                    <p>Name: {userData.firstname + ' '+ userData.lastname}</p>
                    <p>Email: {userData.email}</p>
                    </div>
                )}
                
        </>
     );
}
 
export default AccDetails;