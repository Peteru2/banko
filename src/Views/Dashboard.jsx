
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import api from '../component/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../component/authenticate'

const Dashboard = () => {
  const [userData, setUserData] = useState('')
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setUserData(response.data.user);
        
        console.log(response.data.user)
        console.log("We are getting there")
       
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          navigate('/login');
          
        } 
        
      }
    };
    fetchData();
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