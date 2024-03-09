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
        <h2>This is your transaction History</h2>
            {transHis && transHis.map(transaction => 
                <div >
                    <p>
                        {transaction.sender.firstname} {transaction.sender.lastname}  sent ₦{transaction.amount} to {transaction.recipient.firstname} {transaction.recipient.lastname} 
                    </p>
                </div>
            )}
        </>
     );
}
 
export default TransHistory;