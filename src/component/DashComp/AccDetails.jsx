import { useState, useEffect } from 'react';
import api from '../../component/api.js'
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import TransPinForm from './TransPinForm.jsx';
import UpdateKyc from './UpdateKyc.jsx';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import TransHistory from './TransHistory.jsx';
import TransactionForm from './TransactionForm.jsx';
import Loader from './Loader.jsx';


const socket = io.connect('http://localhost:8000');

const AccDetails = () => {
  const [userData, setUserData] = useState(null);
  const [bvn, setBvn] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false); 
  const [acctBalance, setAcctBalance] = useState(null)
  const [transacHis, setTransacHis] = useState(false)
  const [transfer, setTransfer] = useState(false)


  
    useEffect(() => {
      socket.on('welcome', message =>{
        console.log(message)
      })
        const fetchData = async () => {
          try {
            const userResponse = await api.get('/');
            setUserData(userResponse.data.user);
            
            const response = await api.get('/balance');
            console.log(response.data.balance)
            setAcctBalance(response.data.balance)

           if (userResponse.data.user.transactionPin == "0") {  
            setShowPinInput(true)  
          }

          } catch (error) {
            console.error('Failed to fetch user data:');
          }

          console.log(userData)

        };

        fetchData();

    }, []);
  
      const handleSubmitPin = async (pin) => {
        try {
        
          const response = await api.put('/updateTransactionPin', { pin });
          setShowPinInput(false); 
          toast.success("Transaction Pin updated", {
            position: "top-right",
          })
          console.log(response.data); 
        } catch (error) {
          console.error('Failed to update transaction pin:', error);
        }
      };
     
      const handleUpdateBvn = () =>{
          setBvn(true)
      } 
      const handleShowTransacHis = () =>{
        setTransacHis(his => !his);
      } 
      const handleTransfer = () =>{
        setTransfer(trans => !trans)
      }
      
      

      return ( 
        <>
          {userData && acctBalance ?(
        <div className="font-roboto">
          {userData.t}
        {/* {showPinInput && ( */}
        <form  onSubmit={handleSubmitPin} className={ `modal w-[300px]  font-roboto ${showPinInput? "modal-show":""}`}>
            <div className='bg-white p-4 rounded-[6px] '>
                <h2 className='text-19px text-center'>Set Your Transaction Pin</h2>
                <TransPinForm  onSubmit={handleSubmitPin} />
         </div>
        </form>
      {/* )} */}
       <div className="flex items-center ">
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
            <div className="mx-4">
              
                  <h2><button onClick={()=> handleUpdateBvn()}>Upgrade to Level 2</button></h2> 
                 
    </div>
            <span><i className='fa fa-sort-up rotate-90'></i></span>
        </div>
        
        <div>
              <div onClick={handleTransfer} className='bg-white shadow-md cursor-pointer rounded-[10px] text-private font-roboto mx-4 p-4'>
                <h2>Transfer Funds</h2>
              </div>

              <div  className={ `genModal font-roboto ${transfer? "modal-show w-full":""}`} >
                <h2 onClick={handleTransfer} className='absolute top-0 cursor-pointer'><i className="fa fa-arrow-left"> </i></h2>
        <TransactionForm  />
        </div>

        </div>
        
          <div onClick={handleShowTransacHis} className='bg-white shadow-md rounded-[10px] cursor-pointer text-private font-roboto mx-4 p-4'>
               <h2>Transfer History</h2>
              </div>

        <div  className={ `genModal font-roboto ${transacHis? "modal-show w-full":""}`} >
                <h2 onClick ={handleShowTransacHis} className='absolute top-0 cursor-pointer'><i className="fa fa-arrow-left"> </i></h2>
          <TransHistory />
        </div>
      
             
              
             
      
       </div>

       <div className='bg-private font-roboto mt-5 px-6 text-white h-[150px] flex items-center w-[500px] rounded-[20px] py-2'> 
          <div>
                <h2 className="text-white text-opacity-80 text-sm">Total Balance</h2>
                <h2 className="text-[20px]">  ₦{acctBalance && acctBalance.toLocaleString()}</h2>
          </div>
        </div>

<div  className={ `modal font-roboto ${bvn? "modal-show":""}`} >
           <UpdateKyc  onClose={() => setBvn(false)}  userData = {userData} socket={socket} setUserData={setUserData}/>
        </div>
    
                <div className={`${showPinInput || bvn?"overlay":""} `}></div>
                <ToastContainer />
                </div>
                ):(<>
                  <Loader />
              </>)}
        </>
     );
}
 
export default AccDetails;