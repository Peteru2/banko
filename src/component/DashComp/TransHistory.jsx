import { useEffect, useState } from "react";
import api from "../api";

const TransHistory = () => {
    const [transHis, setTransHis] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get('/trans-history');
            setTransHis(response.data.transferHistory);
            console.log(transHis + "This is super story")

          } catch (error) {
            console.error('Failed to fetch user data:');
          }

        }

        fetchData();
    }, [])

    return ( 
        <>
          <h2>This is the your transaction History</h2>
          <h2>{transHis.recipient}
</h2>
        </>
     );
}
 
export default TransHistory;