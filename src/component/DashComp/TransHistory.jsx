import { useEffect, useState } from "react";
import api from "../api";

const TransHistory = () => {
    const [transHis, setTransHis] = useState('')

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
        <h2 className="text-center my-4">This is your transaction History</h2>
        
            {transHis && transHis.map(transaction => 
                <div className="text-sm my-2">
                
                    <p>
                      <div className="flex w-full">
                      <h2 className="font-bold text-xs">Money Sent</h2>
                      <h2 className="ml-auto font-bold">-₦{transaction.amount}.00</h2>
                      </div>
                      <div className="flex">
                      <h2> {transaction.date} . {transaction.recipient.firstname} {transaction.recipient.lastname} </h2>
                        <h2 className="text-private ml-auto">{transaction.status}</h2>
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