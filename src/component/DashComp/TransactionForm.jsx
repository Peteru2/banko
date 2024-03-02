import React, { useState } from 'react';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TransactionForm = () => {
  const [recipientAccountNumber, setRecipientAcctNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [transPin, setTransPin] = useState('');
  const [trans, setTrans] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to transfer funds
      const response = await api.post('/transfer', {  recipientAccountNumber, amount, transPin });
      if(response.data.message=="Correct"){
        setTrans(true)
      }
      toast.success(response.data.message);
      // Clear the form after successful transaction
      // setRecipientAcctNumber('');
      // setAmount('');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="w-full flex mt-[50px] justify-center font-roboto">
      <div className='bg-white shadow-md rounded-[12px] p-8 w-[400px]'>
      <h2 className='text-center font-bold text-private'>Transfer Funds</h2>
      <form onSubmit={handleSubmit}>
        <div className='my-4'>
          <label htmlFor="recipientId" className='text-sm text-black text-opacity-50'>Recipient Account:</label>
          <div className='w-full'>
          <input
            type="number" // Set type to number
            id="recipientId"
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAcctNumber(e.target.value)}
            required
            className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
            placeholder='Acct No'
          />
          </div>
        </div>


        <div>
          <label htmlFor="amount"  className='text-sm text-black text-opacity-50'>Amount:</label>
          <div className=''>
          <input
            type="number" // Set type to number
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
            placeholder='Minimum 50'
          />
          </div>
        </div>

        <div className={ `modal font-roboto ${trans? "modal-show":""}`}>

            <div>
              <label className='text-sm text-black text-opacity-50'>Transaction Pin</label>
              <div className=''>
              <input
                type="number" 
                value={transPin}
                onChange={(e) => setTransPin(e.target.value)}
                className="border-[1px] w-full text-sm rounded-[8px] p-2 outline-none border-gray"
                placeholder='Your pin'
              />
              </div>
          </div>  
           <button type="submit" className='w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white'>Pay</button>

        </div>

        <button type="submit" className='w-full text-center bg-private mt-4 rounded-[8px] py-2 text-white'>Pay</button>
      </form>
    </div>
    <div className={`${trans?"overlay":""} `}></div>
    <ToastContainer />
    </div>
  );
};

export default TransactionForm;
