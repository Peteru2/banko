
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../component/auth'

const Dashboard = () => {
  const {userData} = useAuth()

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
              )}
        </>
     );
}
 
export default Dashboard;