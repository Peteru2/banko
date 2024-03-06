import { useEffect, useState } from "react";

const TransHistory = () => {
    const [transHIs, setTransHis] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get('/trans-history');
            setTransHis(response.data.transferHistory);

        //    if (response.data.user.transactionPin == "0") {  
        //     setShowPinInput(true)
            
        //   }
          } catch (error) {
            console.error('Failed to fetch user data:');
          }

        }
    })

    return ( 
        <>

        </>
     );
}
 
export default TransHistory;