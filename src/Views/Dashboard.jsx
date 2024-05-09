
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../component/AuthContext';

const Dashboard = () => {
 const {userData,token, logout} = useAuth()
    return ( 
        <>
          {userData &&(
            <div>
              <SideBar logout={logout}/>
             
              <div className='ml-[220px] px-6'>
                <Navbar />
                <AccDetails userData={userData}  />
              </div>
            
            </div>
             )}
        </>
     );
}
 
export default Dashboard;