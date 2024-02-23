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
       <div className="flex items-center">
        <h4 className='bg-private text-[20px] mr-4 px-3 rounded-[2px]'>₦</h4>

        <div>        
             {userData && (
                    <div>
                    <p className="font-bold"> {userData.firstname + ' '+ userData.lastname}</p>
                    <p className='text-gray text-xs'>KYC LEVEL {userData.kycLevel} </p>
                    </div>
                )}
                
        </div>
       </div>

        </>
     );
}
 
export default AccDetails;