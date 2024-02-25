import { useState, useEffect } from 'react';
import api from '../../component/api.js'
const AccDetails = () => {
  const [userData, setUserData] = useState(null);
  const [transactionPin, setTransactionPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get('/');
            setUserData(response.data.user);

           if (response.data.user.transactionPin === 0) {  
            console.log("Things ")
            setShowPinInput(true)
            
          }
          } catch (error) {
            console.error('Failed to fetch user data:', error.response.data.error);
          }
        };
    
        fetchData();
      }, []);
  

      const handlePinInputChange = (e) => {
        setTransactionPin(e.target.value);
        
      };
    
      const numericRegex = /^\d+$/;

      const handleSubmitPin = async () => {
        if (!numericRegex.test(transactionPin)){
            console.log("Not a number format")
        }
        if(transactionPin.length < 3){
            console.log("Invalid ")
        }
        try {
         
           
          await api.put('/updateTransactionPin', { transactionPin });
          setShowPinInput(false); // Hide the pin input field after submitting
          // Optionally, you can fetch user data again to update the state with the latest data
        } catch (error) {
          console.error('Failed to update transaction pin:', error.response.data.error);
        }
      };
      return ( 
        <>
        {showPinInput && (
        <div >
          <input type="text" value={transactionPin} onChange={handlePinInputChange} className='border-2' />
          <button onClick={handleSubmitPin}>Submit</button>
        </div>
      )}
       <div className="flex items-center">
        <h4 className='bg-private text-[20px] mr-4 px-3 rounded-[2px]'>₦</h4>

        <div>       

             {userData && (
                    <div>
                    <p className="font-bold"> {userData.firstname + ' ' + userData.lastname}</p>
                    <p className='text-gray text-xs'>KYC LEVEL { userData.kycLevel } </p>
                    </div>
                )}
        </div>

        <div className='flex items-center bg-white shadow-md p-4 rounded-[10px] text-private ml-10'>
            <i className='fa fa-heart'></i> 
            <div className="mx-4">{userData?.kycLevel === 1 ? <h2>Upgrade to Level 2</h2> : <h2>Upgraded</h2>}</div>
            <span><i className='fa fa-sort-up rotate-90'></i></span>
        </div>

        <h2>{userData && userData.transactionPin}</h2>
       </div>

        </>
     );
}
 
export default AccDetails;