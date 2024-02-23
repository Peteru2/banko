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
                    <p className="font-bold"> {userData.firstname + ' ' + userData.lastname}</p>
                    <p className='text-gray text-xs'>KYC LEVEL { userData.kycLevel } </p>
                    </div>
                )}
        </div>

        <div className='flex items-center bg-white shadow-md p-4 rounded-[10px] text-private ml-10'>
            <i className='fa fa-heart'></i> 
            <div className="mx-4">{userData?.kycLevel === 1 ? <h2>Upgrade to Level 2</h2> : <h2>Upgraded</h2>}</div>
            <span><i className='fa fa-sort-up rotate-90'></i></span>
        </div>
       </div>

        </>
     );
}
 
export default AccDetails;