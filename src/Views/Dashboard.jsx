
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import api from '../component/api.js'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Loader from '../component/DashComp/Loader.jsx';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState('')
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/');
        setUserData(response.data.user);
        console.log(response.data.user)
       
      } catch (error) {
        if (error && error.response && error.response.status === 401) {
          
          navigate('/login');
        } 
        
      }
    };
    fetchData();

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    },10 );

    // Clear the timeout if the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);


    return ( 
        <>
    {userData &&(
              <div>

              <SideBar />
              <div className='ml-[220px] px-6'>
                <Navbar />
                {isLoading ? (<Loader />) :  (
                <AccDetails />)}
            </div>

                </div>
                )}
        </>
     );
}
 
export default Dashboard;