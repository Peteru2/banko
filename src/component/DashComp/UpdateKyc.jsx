import React, { useState } from 'react';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const UpdateKyc = () => {
  const [bvn, setBVN] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericRegex = /^\d+$/;

    if(bvn.length < 10 || bvn.length > 10){
        
            toast.error("Invalid BVN Pin", {
                position: "top-right",
              })
    }
    else if(!numericRegex.test(bvn)){
        
        toast.error("Invalid BVN Pin", {
            position: "top-right",
          })
    }
    else{
            try {
            // Send a request to update the BVN PIN
            const response = await api.put('/updatekyc', { bvn });
            toast.success("Invalid BVN Pin", {
                position: "top-right",
              })
              close()
            setSuccessMessage(response.data.message);
            setError(null);
            } catch (error) {
            setError(error.response.data.error);
            setSuccessMessage('');
            }   
  }
};

  return (
    <div>
      <h2 className='text-center font-bold'>Your BVN</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="bvn"
            value={bvn}
            onChange={(e) => setBVN(e.target.value)}
            required
            placeholder='Bank Verification Number'
            className='border-[1px] rounded-md px-2 py-2 my-2 border-gray  w-full rounded-md outline-none'
          />
        </div>
       
       
        <button className="text-center w-full bg-private text-white rounded-md py-2" type="submit ">Update</button>
      </form>

      <ToastContainer   />

    </div>
  );
};

export default UpdateKyc;
