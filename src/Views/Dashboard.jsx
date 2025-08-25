
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
import { useAuth } from '../component/AuthContext';

const Dashboard = () => {
 const {userData, logout} = useAuth()
    return ( 
        <>
          {userData &&(
            <div>
             
              
                <Navbar />
                <AccDetails userData={userData}  />
                <SideBar logout={logout}/>
            
            </div>
             )}
        </>
     );
}
 
export default Dashboard;