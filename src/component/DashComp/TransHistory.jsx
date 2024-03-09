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
            {transHis && transHis.map((transaction, index) => (
                <div key={index}>
                    <p>
                        {transaction.sender}  sent {transaction.amount} to {transaction.recipient} 
                    </p>
                </div>
            ))}
        </>
     );
}
 
export default TransHistory;