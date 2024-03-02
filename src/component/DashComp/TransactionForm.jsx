import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const TransactionForm = () => {
  const [recipientAccountNumber, setRecipientAcctNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to transfer funds
      const response = await api.post('/transfer', {  recipientAccountNumber, amount });
      toast.success(response.data.message);
      // Clear the form after successful transaction
      setRecipientAcctNumber('');
      setAmount('');
    } catch (error) {
      // toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Transfer Funds</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipientId">Account Number:</label>
          <input
            type="number" // Set type to number
            id="recipientId"
            value={recipientAccountNumber}
            onChange={(e) => setRecipientAcctNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number" // Set type to number
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default TransactionForm;
