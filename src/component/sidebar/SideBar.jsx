import React from "react";
import DashboardActive from "../../assets/image/dashboard-active.svg";
import DashboardInActive from "../../assets/image/dashboard-inactive.svg";
import DepositActive from "../../assets/image/deposits-active.svg";
import DepositInActive from "../../assets/image/deposits-inactive.svg";
import LoanActive from "../../assets/image/loans-active.svg";
import LoanInActive from "../../assets/image/loans-inactive.svg";
import NotificationActive from "../../assets/image/notification-active.svg";
import NotificationInActive from "../../assets/image/notification-inactive.svg";
import MoreActive from "../../assets/image/more-active.svg";
import MoreInActive from "../../assets/image/more-inactive.svg";




import { Link, useLocation } from "react-router-dom";
const SideBar = ({ logout }) => {
  const navSideList = [
    {
      title: "Dashboard",
      url: "/",
      active : DashboardActive,
      inactive : DashboardInActive

    },
    {
      title: "Deposits",
      url: "/Deposits",
      active : DepositActive,
      inactive : DepositInActive

    },
    {
      title: "Loans",
      url: "/Pend-Deliveries",
      active : LoanActive,
      inactive : LoanInActive
    },
    {
      title: "History",
      url: "/History",
      active : NotificationActive,
      inactive : NotificationInActive
    },
    {
      title: "More",
      url: "/Closed-Deliveries",
      active : MoreActive,
      inactive : MoreInActive
    },
  ];
  const location = useLocation();

  return (
    <>
    <div className="justify-center items-center flex ">
      <aside className="bg-white fixed  md:w-[600px] w-[400px]  bottom-0 rounded-tr-[10px] rounded-tl-[10px]">

        <div className=" text-black w-full items-center px-12 justify-between flex  text-opacity-50 ">
          {navSideList.map((item, index) => {
            const isActive = location.pathname === item.url;
            return (
              <div
                key={index}
                className={` text-sm py-4 flex justify-between cursor-pointer  ${location.pathname === item.url ? " text-public" : ""} `}
              >
                <Link to={item.url} className="text-center items-center justify-center outline-none flex">
                <div className="flex flex-col items-center">
                   <div className=" ">
                    <img
                      src={location.pathname === item.url? item.active : item.inactive}
                      alt="Image"
                      className="   w-[23px] h-[23px] "
                    />
                  </div>
                  <p
                    className={`
                      text-[11px] text-black text-opacity-80 font-400 ${location.pathname === item.url ? " text-public " : ""}
                    `}
                  >
                    {item.title}
                  </p>
                  </div>
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
