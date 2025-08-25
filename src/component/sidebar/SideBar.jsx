import React from "react";
import Logo from "../../assets/image/Logo.png";
// import Logout from '../Logout';

import { Link, useLocation } from "react-router-dom";
const SideBar = ({ logout }) => {
  const navSideList = [
    {
      title: "Dashboard",
      url: "/",
      icon1: "fa fa-home",
    },
    {
      title: "Activity",
      url: "/Pending",
      icon1: "p",
    },
    {
      title: "Wallet",
      url: "/Pend-Deliveries",
      icon1: "p",
    },
    {
      title: "Products",
      url: "/Awaiting-Feedback",
      icon1: "p",
    },
    {
      title: "Referrals",
      url: "/Closed-Deliveries",
      icon1: "p",
    },
  ];
  const location = useLocation();

  // const logout = () => {
  //     navigate('/login');
  //     localStorage.removeItem('token');

  //   };

  return (
    <>
    <div className="justify-center items-center flex w-full">
      <aside className="bg-white w-[600px] fixed  bottom-0 rounded-tr-[10px] rounded-tl-[10px]">
        {/* <div className="p-4  flex h-16 justify-center">
          <h2 className="text-[26px] text-private font-bold  flex  font-playfair">
            <img src={Logo} className="w-8 mr-2" alt="banko Logo" />
            Banko.
          </h2>
        </div> */}

        <div className=" text-black w-full items-center px-12 justify-between flex  text-opacity-50 ">
          {navSideList.map((item, index) => {
            const isActive = location.pathname === item.url;
            return (
              <div
                key={index}
                className={` text-sm py-4 flex justify-between cursor-pointer  ${location.pathname === item.url ? " text-public" : ""} `}
              >
                <Link to={item.url} className="text-center items-center outline-none">
                  <p className="font-normal text-[16px]">
                    <i className={item.icon1}></i>
                  </p>
                  <p
                    className={`
                      text-[13px]  ${location.pathname === item.url ? " text-public " : ""}
                    `}
                  >
                    {item.title}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
        {/* <div className=" text-black text-opacity-50 logout  py-6">
          <button className="text-sm ml-6" onClick={logout}>
            <i className="fa fa-sign-out mr-5 "></i>{" "}
            <span className="">Logout</span>
          </button>
        </div> */}
      </aside>
      </div>
    </>
  );
};

export default SideBar;
