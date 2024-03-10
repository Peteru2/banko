import { useEffect, useState } from "react";
import api from "../api";

const TransHistory = () => {
    const [transHis, setTransHis] = useState('')

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
            const response = await api.get('/trans-history');
            setTransHis(response.data.transferHistory);
            console.log(response.data.transferHistory)

          } catch (error) {
            console.error('Failed to fetch user data:');
          }

        }

        fetchData();
    }, [])

    return ( 
        <>
        <div className="flex justify-center">
          <div className="shadow-md justify-center w-[400px] px-4">
        <h2 className="text-center my-4 font-bold text-[19px]"> Transaction History</h2>
        
            {transHis && transHis.map(transaction => 
                <div className="text-sm my-3">
                
                    <p>
                      <div className="flex w-full">
                      <h2 className="font-bold text-xs">Money Sent</h2>
                      <h2 className="ml-auto font-bold">-₦{transaction.amount}.00</h2>
                      </div>
                      <div className="flex">
                      <h2 className="text-black text-opacity-60 text-[13px]"> {new Date(transaction.date).toLocaleString("en-US", option)}  {transaction.recipient.firstname} {transaction.recipient.lastname} </h2>
                        <h2 className="text-private ml-auto font-bold text-[13px]">{transaction.status}</h2>
                      </div>
                    </p>
                </div>
            )}
            </div>
            </div>
        </>
     );
}
 
export default TransHistory;