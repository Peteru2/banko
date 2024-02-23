
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import api from '../component/api.js'
import { useEffect, } from 'react';
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setUserData(response.data.token);
      } catch (error) {
        if (error.response.status === 401) {
          // Token expired, redirect to login page
          navigate('/login');
        } else {
          console.error('Failed to fetch user data:', error.response.data.error);
        }
      }
    };

    fetchData();
  }, []);


    return ( 
        <>
            <div>

              <SideBar />
              <div className='ml-[220px] px-6'>
                <Navbar />
                <AccDetails />
            </div>
                </div>
        </>
     );
}
 
export default Dashboard;