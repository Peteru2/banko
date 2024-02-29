import mongoose from 'mongoose';

const { Schema } = mongoose;

const WalletSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 2000 },
   
  });
  
  const Wallet = mongoose.model('Wallet', WalletSchema);
  export { Wallet };