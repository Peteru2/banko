// import ProImg from "./images/ProImg.svg"
import ProImg from "../../assets/image/ProImg.svg";
import { useState, useEffect } from "react";
import Notification from "../DashComp/Notification";
import api from "../../component/api";


const Navbar = ({ userData }) => {
  const [notice, setNotice] = useState(false);
  const [acctBalance, setAcctBalance] = useState(null);

  console.log(userData);
  const handleNotice = () => {
    setNotice((notice) => !notice);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/balance");
        setAcctBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch user data:");
      }

      console.log(userData);
    };

    fetchData();
  }, []);
  return (
    <>
      <nav className=" w-full h-12 justify-center  flex items-center font-roboto ">
        <div className=" flex w-[600px]  rounded-md rounded-b-[0px] border-b-[1px] border-gray py-1 px-2 bg-opacity-40 items-center">
          <div className="w-full flex items-center justify-between">
          <div className="">
            <img
              src={ProImg}
              alt="profileImage"
              className="fa fa-bell text-black mx-2 w-[22px] h-[22px]  rounded-full"
            />
          </div>
          <div>
            <p className="text-black text-[16px] text-opacity-70"> ₦{acctBalance && acctBalance.toLocaleString()}</p>
          </div>
          <div className="mx-2 relative cursor-pointer" onClick={handleNotice}>
            <i className="fa fa-bell font-bold text-black"></i>
            <span className="absolute left-[10px] top-[2px] bg-red w-1 h-1 rounded-full"></span>
          </div>
          </div>
        </div>
      </nav>

      <div  className={ `genModal font-roboto ${notice? "modal-show w-full":""}`} >
                 <h2 onClick ={handleNotice} className='absolute top-0 cursor-pointer'><i className="fa fa-arrow-left"> </i></h2>
           <Notification />
        </div>
    </>
  );
};

export default Navbar;
