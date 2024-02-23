import React from 'react'
import Logo from "../../assets/image/Logo.png"


import { Link, useLocation } from "react-router-dom";
const SideBar = () => {
    const navSideList = [
        {
            title: "Dashboard",
            url: "/",
            icon1: 'p',
        },
        {
            title: "Activity",
            url: "/Pending",
            icon1: 'p'
            
        },
        {
            title: "Wallet",
            url: "/Pend-Deliveries",
            icon1: 'p'
            
        },
        {
            title: "Products",
            url: "/Awaiting-Feedback",
            icon1: 'p'
           
        },
        {
            title: "Referrals",
            url: "/Closed-Deliveries",
            icon1: 'p'
            
        },
         

    ]
    const location = useLocation()

    const handleLogout = () =>{
       logout()
    }
    
    return ( 
        <>
            <aside className="bg-white sideBar border-r-2 border-gray">
                    <div className="p-4  flex h-16 justify-center">
                    <h2 className="text-[26px] text-private font-bold  flex  font-playfair">
                                <img src={Logo} className="w-8 mr-2" alt="banko Logo" />
                                Banko.</h2>
                       
                    </div>

            <div>
                <div className=" text-black text-opacity-30 mt-12">

                    {navSideList.map((item,index) =>{
                        const isActive = location.pathname === item.url;
                        return(
                    <div key={index} className={`flex text-sm pl-12 mr-[40px] my-6 py-4 cursor-pointer  ${location.pathname === item.url ? "Sidebar-border text-public" :""} `}>
                      <Link to={item.url} className="flex items-center outline-none"> 
                      <p className='mr-5 items-center'>{item.icon1}</p>
                      <p className={location.pathname === item.url ? "text-vintage" :"red"}>{item.title}</p></Link>
                    </div>

                    )
                })
                }

                </div>
            </div>
            <div className=" text-gray logout  py-6">
                   
             <button className="text-sm ml-6" onClick={handleLogout}>
               <i className="fa fa-sign-out mr-5 "></i> <span className="">Help Center</span>
             </button>
            </div>
            </aside>
        </>
     );
}
 
export default SideBar;