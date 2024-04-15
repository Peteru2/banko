
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import api from '../component/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../component/AuthContext';

const Dashboard = () => {
  // const [userData, setUserData] = useState('')
  const navigate = useNavigate(); 
  const{isAuthenticated, userData} = useAuth()

  useEffect(() => {
    if(isAuthenticated === false){
      navigate('/login');

    }
    // const fetchData = async () => {
    //   try {
    //     // const response = await api.get('/');
    //     // setUserData(response.data.user);
    
       
    //   } catch (error) {
    //     if (error && error.response && error.response.status === 401) {
    //       navigate('/login');
          
    //     } 
        
    //   }
    // };
    // fetchData();
  }, []);


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