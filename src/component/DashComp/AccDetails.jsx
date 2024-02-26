import { useState, useEffect } from 'react';
import api from '../../component/api.js'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


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
            console.error('Failed to fetch user data:');
          }
        };
    
        fetchData();
      }, []);
  

      const handlePinInputChange = (e) => {
        setTransactionPin(e.target.value);
        
      };
    
      const numericRegex = /^\d+$/;

      const handleSubmitPin = async (e) => {
        e.preventDefault()
        if(transactionPin.trim()  === ''){
            console.log("NUmber must be filled")
            toast.error("No Pin was entered", {
                position: "top-right",
              })
        }
        else if (!numericRegex.test(transactionPin)){
            console.log("Not a number format")
            toast.error("Invalid Pin Format", {
                position: "top-right",
              })
        }
       else  if(transactionPin.length < 4){
            console.log("Invalid ")
            toast.error("Pin must not be less than four", {
                position: "top-right",
              })
        }
        else{
            console.log(transactionPin )
            try {
                const response = await api.put('/updateTransactionPin', { transactionPin });
                console.log(response);
            setShowPinInput(false); 
            toast.success("Transaction Pin updated", {
                position: "top-right",
              })
            } catch (error) {
            console.error('Failed to update transaction pin');
            }
    }
      };
      return ( 
        <>
        {/* {showPinInput && ( */}
        <form  onSubmit={handleSubmitPin} className={ `modal font-roboto ${showPinInput? "modal-show":""}`}>
            <div>
                <h2 className='text-19px'>Set Your Transaction Pin</h2>
          <input type="text" value={transactionPin} name="transactionPin" onChange={handlePinInputChange} placeholder='Enter Your Pin' className='border-[1px] border-gray rounded-md w-full py-1 px-2  my-2 ' />
          </div>
          <button className="bg-private rounded-md w-full text-center font-bold  py-2">Set</button>
        </form>
      {/* )} */}
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

        {/* <h2>{userData && userData.transactionPin}</h2> */}
       </div>
                <div className={`${showPinInput?"overlay":""} `}></div>
                <ToastContainer />
        </>
     );
}
 
export default AccDetails;