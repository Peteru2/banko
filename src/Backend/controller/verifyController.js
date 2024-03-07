//Post_login
import {User} from "../models/User.js";
import {Wallet} from "../models/Wallet.js"
import {Transaction} from "../models/Transaction.js"

import jwt from "jsonwebtoken";
const secretKey = 'your-secret-key';
import bcrypt from "bcryptjs"

const Post_signUp = async (req, res) =>{
    try {
        const { firstname, lastname, email, phoneNumber, password } = req.body;
        function generateAccountNumber() {
            let accountNumber = '';
            const digits = '0123456789';
        
            for (let i = 0; i < 10; i++) {
                const randomIndex = Math.floor(Math.random() * digits.length);
                accountNumber += digits[randomIndex];
            }
        
            return accountNumber;
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newAccountNumber = generateAccountNumber();
        const user = new User({
            firstname,
            lastname,
            email,
            phoneNumber,
            password: hashedPassword,
            accountBalance: 0,
            status: true,
            kycLevel: 1,
            transactionPin: 0, 
            bvn:0
        });
 
        const wallet = new Wallet({ 
            user: user._id,
            accountNumber: newAccountNumber, 
        });
        const check =  await User.findOne({email:email})
        const checkAccNum = await Wallet.findOne({accountNumber: newAccountNumber,})
       

        if (check){
            return res.status(401).json({error:"This email already exist"})
        }
        else if(checkAccNum){
            generateAccountNumber();
        }
        else{
            await user.save();   
            await wallet.save();
        }
        res.status(201).json({ message: 'Account successfully Created', user });
      
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the account' });
    }
}

const Post_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        
        if (!user) {
           return res.status(404).json({ error: ' User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
        res.status(200).json({ success: 'Exist', token: token, message: 'User logged In Succesfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

const Get_user = async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const UpdateTransPin = async (req, res) => { 
    try {
        const { pin } = req.body;
        const hashedPin = await bcrypt.hash(pin, 10);

       
        await User.findByIdAndUpdate(req.user.userId, { transactionPin: hashedPin });

        res.status(200).json({ message: 'Transaction pin updated successfully' });
    } catch (error) {
        console.error('Failed to update transaction pin:', error);
        res.status(500).json({ error: 'Failed to update transaction pin' });
    }
}

const UpdateKyc = async (req, res) => { 
    try {
        const { bvn } = req.body;
        const hashedPin = await bcrypt.hash(bvn, 10);

        await User.findByIdAndUpdate(req.user.userId, { bvn: hashedPin });

        const user = await User.findById(req.user.userId);
        if (user && user.bvn !== '0') {
            // Update the KYC level
            await User.findByIdAndUpdate(req.user.userId, { kycLevel: 2 });
        }

        res.status(200).json({ message: 'Transaction pin updated successfully' });
    } catch (error) {
        console.error('Failed to update transaction pin:', error);
        res.status(500).json({ error: 'Failed to update transaction pin' });
    }
}

const GetBalance = async (req, res) => {
        try {
          const wallet = await Wallet.findOne({ user: req.user.userId });
          if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
          }
          res.json({ balance: wallet.balance });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
     
}
    
const Check_transfer = async(req, res) =>{
    try {
      const { recipientAccountNumber, amount } = req.body;
      // Find sender's wallet
      const senderWallet = await Wallet.findOne({ user: req.user.userId });
      if (!senderWallet || senderWallet.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      if (amount < 50) {
        return res.status(400).json({ error: 'Minimum amount to transfer is 50' });
      }
      // Find recipient's wallet by account number
      const recipientWallet = await Wallet.findOne({ accountNumber: recipientAccountNumber });
      if (!recipientWallet) {
        return res.status(404).json({ error: 'Recipient wallet not found' });
      }
      res.json({ mes: 'success' });
      
    } catch (error) {
      console.error('Failed to transfer funds:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const Post_transfer = async(req, res) =>{
    try {
      const { recipientAccountNumber, amount, transPin } = req.body;
  
      // Find sender's wallet
      const senderWallet = await Wallet.findOne({ user: req.user.userId });
      if (!senderWallet || senderWallet.balance < amount) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }
  
      if (amount < 50) {
        return res.status(400).json({ error: 'Minimum amount transferable is 50' });
      }
      // Find recipient's wallet by account number
      const recipientWallet = await Wallet.findOne({ accountNumber: recipientAccountNumber });
      if (!recipientWallet) {
        return res.status(404).json({ error: 'Recipient wallet not found' });
      }
     
        const userTransPin = await User.findById( req.user.userId);
        console.log(userTransPin)

            if (!userTransPin) {
            return res.status(404).json({ error: 'Transaction Pin not found' });
 x            }

            const pinMatch = await bcrypt.compare(transPin, userTransPin.transactionPin);
            if (!pinMatch) {
            return res.status(400).json({ error: 'Transaction Pin Incorrect' });
            }
         
      // Update sender's balance
      senderWallet.balance -= amount;
      await senderWallet.save();
  
      // Update recipient's balance
      recipientWallet.balance += parseInt(amount);
      await recipientWallet.save();
  
      // Create transaction record
      const transaction = new Transaction({ sender: senderWallet._id, recipient: recipientWallet._id, amount });
      await transaction.save();
  
      res.json({ message: 'Funds transferred successfully' });
    } catch (error) {
      console.error('Failed to transfer funds:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  const Transfer_history = async( req, res) =>{

    try {

        const userID = req.user.userId;

        const transferHistory = await Transaction.find({
            $or: [{ sender: userID }, { recipient: userId }]
          }).populate('sender recipient', 'user');

          console.log(transferHistory)

        if (!transferHistory || transferHistory.length === 0) {
          return res.status(404).json({ error: 'No history found' });
        }
        res.json({ transferHistory });
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

    };

export default { 
    Post_signUp,
    Post_login,
    Get_user,
    UpdateTransPin,
    UpdateKyc,
    GetBalance,
    Check_transfer,
    Post_transfer,
    Transfer_history
}