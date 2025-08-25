import React from "react";
import TopUp from "../../assets/image/top-up.svg";
import MobilePayment from "../../assets/image/mobile-payment.svg";
import MakeAPayment from "../../assets/image/make-a-payment.svg";
import MoneyTranser from "../../assets/image/money-transfer.svg";

const paymentList = [
  {
    title1: "Money",
    title2: "Transfer",
    url: "/",
    img: MoneyTranser,
  },
  {
    title1: "Top Up",
    title2: "Payment",
    url: "/",
    img: TopUp,
  },

  {
    title1: "Make",
    title2: "Payment",
    url: "/",
    img: MakeAPayment,
  },
  {
    title1: "Mobile",
    title2: "Payment",
    url: "/",
    img: MobilePayment,
  },
];
const Payment = () => {
  return (
    <>
      <div className="flex w-full justify-center my-[15px] px-[13px]">
        {paymentList.map((item, index) => {
          return (
            <>
              <div className="flex cursor-pointer mx-[15px]  justify-center">
                <div className="flex flex-col items-center">
                  <div className="">
                    <img
                      src={item.img}
                      alt="profileImage"
                      className="fa fa-bell text-black  w-[60px] h-[60px]  rounded-full"
                    />
                  </div>
                  <div className="text-center text-[13px]">
                    <p>{item.title1}</p>
                    <p>{item.title2}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Payment;
