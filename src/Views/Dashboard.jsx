
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import Payment from '../component/DashComp/Payment';
import AccDetails from '../component/DashComp/AccDetails';
import { useAuth } from '../component/AuthContext';

const Dashboard = () => {
 const {userData, logout} = useAuth()
    return ( 
        <>
          {userData &&(
            <div className='w-full flex justify-center'>
             
              <div className='w-[600px]'>
                <Navbar />
                <Payment />
                <AccDetails userData={userData}  />
                <SideBar logout={logout}/>
            </div>
            </div>
             )}
        </>
     );
}
 
export default Dashboard;