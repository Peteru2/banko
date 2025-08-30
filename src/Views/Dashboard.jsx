
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import Payment from '../component/DashComp/Payment';
import Loader from '../component/DashComp/Loader';
import AccDetails from '../component/DashComp/AccDetails';
import { useAuth } from '../component/AuthContext';

const Dashboard = () => {
 const {userData, logout, setUserData} = useAuth()
    return ( 
        <>
          {userData &&(
            <div className='w-full flex justify-center'>
             
              <div className=' w-[600px]'>
                <Navbar userData={userData} />
                <Payment />
                {/* <Loader />  */}
                <AccDetails userData={userData} logout={logout}  />
                <SideBar  userData={userData} />
            </div>
            </div>
             )}
        </>
     );
}
 
export default Dashboard;