// import ProImg from "./images/ProImg.svg"
import ProImg from "../../assets/image/ProImg.svg"
import { useState } from "react"
import Notification from "../DashComp/Notification"

const Navbar = () => {
    const [notice, setNotice] = useState(false)

    const handleNotice = () =>{
            setNotice(notice => !notice);
    }
    return ( 
        <>
            <nav className="bg-white w-full h-16 flex items-center font-roboto ">
                <div>
                   <h2 className="text-[30px]">Wallet</h2>
                </div>
                <div className="ml-auto flex bg-gray rounded-md py-1 px-2 bg-opacity-40 justify-center items-center">

                        <div className="mx-2 relative cursor-pointer" onClick={handleNotice}>
                            <i className="fa fa-bell font-bold text-black"></i>
                            <span className="absolute left-[10px] top-[2px] bg-red w-1 h-1 rounded-full"></span>
                        </div>
                        <div className="">
                        <img src={ProImg} alt="profileImage"
                         className="fa fa-bell text-black mx-2 w-8 h-8  rounded-full"
                         />
                        
                        </div>
                        <span className="mx-2"><i className="fa fa-ellipsis-v"></i></span>
                </div>
            </nav>

            <div  className={ `genModal font-roboto ${notice? "modal-show w-full":""}`} >
                <h2 onClick ={handleNotice} className='absolute top-0 cursor-pointer'><i className="fa fa-arrow-left"> </i></h2>
          <Notification />
        </div>
        </>
     );
}

export default Navbar;