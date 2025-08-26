
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import Payment from '../component/DashComp/Payment';
import AccDetails from '../component/DashComp/AccDetails';
import { useAuth } from '../component/AuthContext';

const Dashboard = () => {
 const {userData} = useAuth()
    return ( 
        <>
          {userData &&(
            <div className='w-full flex justify-center'>
             
              <div className=' w-[600px]'>
                <Navbar />
                <Payment />
                {/* <AccDetails userData={userData}  /> */}
                <SideBar />
            </div>
            </div>
             )}
        </>
     );
}
 
export default Dashboard;