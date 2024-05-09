
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import api from '../component/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../component/AuthContext';


const Dashboard = () => {
  const navigate = useNavigate(); 
  const{userData, token} = useAuth()

  useEffect(() => {
    if(!token){
      navigate('/login');
    }
  }, [token]);

    return ( 
        <>
         {userData && (
            <div>
              <SideBar />
             
              <div className='ml-[220px] px-6'>
                <Navbar />
                <AccDetails />
              </div>
            
            </div>
               )
              //  :(<>
              //   <h2>Loading</h2>
              //  </>)
               } 
        </>
     );
}
 
export default Dashboard;