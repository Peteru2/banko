import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import { TransComp } from "./TransComp";

const TransHistory = () => {
  const [transHis, setTransHis] = useState(null);
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Adjust the time zone as needed
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/");
        const response = await api.get("/trans-history");

        setTransHis(response.data.transferHistory);
        setUserData(userResponse.data.user);
      } catch (error) {
        if (error.response.data.error == "No history found") {
          setTransHis([]);
          console.log(transHis);
        }
      }
    };

    fetchData();
  }, []);

  const trans = transHis && transHis.slice().reverse();
  const groupByDate = (transactions) => {
  return transactions.reduce((groups, tx) => {
    const date = new Date(tx.date).toDateString(); // e.g., "Thu Sep 4 2025"
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(tx);
    return groups;
  }, {});
};
const groupedTrans = groupByDate(trans);
  return (
    <>
     
          <div className="flex justify-center font-roboto">
        <div className="justify-center  w-full max-w-[600px] ">
          <div className="relative flex text my-2 text-black text-opacity-60  items-center h-[48px] text-[18px]">
            <h2
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <i className="fa fa-arrow-left"> </i>
              </h2>
            <h2 className="absolute left-1/2 transform -translate-x-1/2 text-black text-opacity-60">
            Transaction history
            </h2>
          </div>
           
      {Object.entries(groupedTrans).map(([date, txs]) => (
      <div key={date} className="mb-4">
        <h3 className="font-semibold text-black text-opacity-70">{date}</h3>
        {txs.map((tx, idx) => (
          <TransComp
            key={idx}
            transHis={transHis} // Pass single tx so TransComp can display it
            trans={[txs]}
            userData={userData}
            option={option}
          />
        ))}
         </div>
    ))}
      </div>
      </div>
    
     
    </>
  );
};

export default TransHistory;
