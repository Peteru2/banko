
import SideBar from '../component/sidebar/SideBar';
import Navbar from '../component/Navbar/Navbar';
import AccDetails from '../component/DashComp/AccDetails';
const Dashboard = () => {

    return ( 
        <>
            <div>

              <SideBar />
              <div className='ml-[220px]'>
                <Navbar />
                <AccDetails />
                </div>
                </div>
        </>
     );
}
 
export default Dashboard;