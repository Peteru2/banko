import { useState, useEffect } from 'react';
import api from '../../component/api.js'
  import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import TransPinForm from './TransPinForm.jsx';
import UpdateKyc from './UpdateKyc.jsx';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import TransHistory from './TransHistory.jsx';

const socket = io('http://localhost:8000');



const AccDetails = () => {
  const [userData, setUserData] = useState(null);
  const [bvn, setBvn] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false); 
  const [acctBalance, setAcctBalance] = useState(null)
  const [transacHis, setTransacHis] = useState(false)


    useEffect(() => {
      socket.on('welcome', message =>{
        console.log(message)
      })
        const fetchData = async () => {
          try {
            const response = await api.get('/');
            setUserData(response.data.user);

           if (response.data.user.transactionPin == "0") {  
            setShowPinInput(true)
            
          }
          } catch (error) {
            console.error('Failed to fetch user data:');
          }


          try{
            const response = await api.get('/balance');
            console.log(response.data.balance)
            setAcctBalance(response.data.balance)
          }
          catch (error) {
            console.error('Failed to fetch user data:');
          }
        };
    
        fetchData();

        socket.on('kycLevelUpdated', (data) => {
          setUserData(prevUserData => ({
            ...prevUserData,
            kycLevel: data.kycLevel
          }));
          console.log(userData.kycLevel)
        });

      return () => {
        socket.off('kycLevelUpdated');
      };

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
      return ( 
        <>
        <div className="font-roboto">
        {/* {showPinInput && ( */}
        <form  onSubmit={handleSubmitPin} className={ `modal font-roboto ${showPinInput? "modal-show":""}`}>
            <div>
                <h2 className='text-19px'>Set Your Transaction Pin</h2>
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
                {userData && userData.kycLevel === "1" ?
                  <h2><button onClick={handleUpdateBvn}>Upgrade to Level 2</button></h2> :
                  <h2>Upgraded</h2>
                }
    </div>
            <span><i className='fa fa-sort-up rotate-90'></i></span>
        </div>
        
        <Link to ={"/Transfer"}>
              <div className='bg-white shadow-md rounded-[10px] text-private font-roboto mx-4 p-4'>
                <h2>Transfer Funds</h2>
              </div>
        </Link>
      
        <div  className={ `genModal font-roboto ${transacHis? "modal-show w-full":""}`} >
                <h2 onClick ={handleShowTransacHis} className='absolute top-0'><i className="fa fa-arrow-left"> </i></h2>
          <TransHistory />
        </div>
      
             
              <div onClick={handleShowTransacHis} className='bg-white shadow-md rounded-[10px] text-private font-roboto mx-4 p-4'>
                <h2>Transfer History</h2>
              </div>
             
      
       </div>

       <div className='bg-private font-roboto mt-5 px-6 text-white h-[150px] flex items-center w-[500px] rounded-[20px] py-2'> 
          <div>
                <h2 className="text-white text-opacity-80 text-sm">Total Balance</h2>
                <h2 className="text-[20px]">  ₦{acctBalance && acctBalance.toLocaleString()}</h2>
          </div>
        </div>

<div  className={ `modal font-roboto ${bvn? "modal-show":""}`} >
           <UpdateKyc  onClose={() => setBvn(false)}  />
        </div>
    
                <div className={`${showPinInput || bvn?"overlay":""} `}></div>
                <ToastContainer />
                </div>
        </>
     );
}
 
export default AccDetails;