import mongoose from 'mongoose';

const { Schema } = mongoose;

 const TransactionSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    amount: { type: Number, required: true },
   
  });

  const Transaction = mongoose.model('Transaction', TransactionSchema);
export { Transaction };