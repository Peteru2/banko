import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

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

          {transHis && transHis.length === 0 ? (
            <div className="bg-white py-4">
              <h2 className="font-bold text-sm text-center ">
                No history found
              </h2>
            </div>

          ) : (
            trans &&
            trans.map((transaction) =>
              userData && userData._id === transaction.sender._id ? (
                <div className="text-sm my-3">
                  <p>
                    <div className="flex w-full">
                      <h2 className="font-bold text-xs">Money Sent</h2>
                      <h2 className="ml-auto font-bold">
                        -₦{transaction.amount}.00
                      </h2>
                    </div>
                    <div className="flex">
                      <h2 className="text-black text-opacity-60 text-[13px]">
                        {" "}
                        {new Date(transaction.date).toLocaleString(
                          "en-US",
                          option
                        )}{" "}
                        {transaction.recipient.firstname}{" "}
                        {transaction.recipient.lastname}{" "}
                      </h2>
                      <h2 className="text-private ml-auto font-bold text-[13px]">
                        {transaction.status}
                      </h2>
                    </div>
                  </p>
                </div>
              ) : (
                <div className="text-sm my-3">
                  <p>
                    <div className="flex w-full">
                      <h2 className="font-bold text-xs">Bank Deposit</h2>
                      <h2 className="ml-auto font-bold">
                        -₦{transaction.amount}.00
                      </h2>
                    </div>
                    <div className="flex">
                      <h2 className="text-black text-opacity-60 text-[13px]">
                        {" "}
                        {new Date(transaction.date).toLocaleString(
                          "en-US",
                          option
                        )}{" "}
                      </h2>
                      <h2 className="text-private ml-auto font-bold text-[13px]">
                        {transaction.status}
                      </h2>
                    </div>
                  </p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TransHistory;
