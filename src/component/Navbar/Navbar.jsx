// import ProImg from "./images/ProImg.svg"
import ProImg from "../../assets/image/ProImg.svg"

const Navbar = () => {

    return ( 
        <>
            <nav className="bg-white w-full h-16 flex items-center font-roboto px-6">
                <div>
                   <h2 className="text-[30px]">Wallet</h2>
                </div>
                <div className="ml-auto flex bg-gray rounded-md py-1 bg-opacity-40 justify-center items-center">
                        <div className="mx-4">
                            <i className="fa fa-bell font-bold text-black"></i>
                        </div>
                        <div className="">
                        <img src={ProImg} alt="profileImage"
                         className="fa fa-bell text-black mr-1 w-8 h-8  rounded-full"
                         />
                         <span>:</span>
                        </div>
                       
                </div>
            </nav>
        </>
     );
}

export default Navbar;